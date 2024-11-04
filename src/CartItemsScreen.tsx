import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {CartItem, useCart} from './CartProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CartItemsScreenProps {
  route: {
    params: {
      cartItems: CartItem[];
    };
  };
  navigation: any;
}

const CartItemsScreen: React.FC<CartItemsScreenProps> = props => {
  const {cartItems, setCartItems} = useCart();
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleIncrement = (index: number) => {
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity += 1;
      return updatedItems;
    });
  };

  const handleDecrement = (index: number) => {
    const item = cartItems[index];
    if (item.quantity === 1) {
      setItemToDelete(index);
      setModalVisible(true);
    } else {
      setCartItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems[index].quantity -= 1;
        return updatedItems;
      });
    }
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      setCartItems(prevItems => prevItems.filter((_, i) => i !== itemToDelete));
      setItemToDelete(null);
    }
    setModalVisible(false);
  };

  const handleDelete = (index: number) => {
    setItemToDelete(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {cartItems.length > 0 ? (
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            {cartItems.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.deleteButtonTop}
                  onPress={() => handleDelete(index)}>
                  <FontAwesome5 name="times" size={16} color="#fff" />
                </TouchableOpacity>
                <Image
                  source={
                    typeof item.product.image === 'string'
                      ? {uri: item.product.image}
                      : item.product.image
                  }
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.productName}>{item.product.name}</Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleDecrement(index)}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleIncrement(index)}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Displaying individual price, quantity, and subtotal */}
                  <View style={styles.itemPriceContainer}>
                    <Text style={styles.itemPrice}>
                      RM {item.product.price.toFixed(2)}
                      {'   '}
                      Each
                    </Text>
                    <Text style={styles.itemPrice}>
                      RM {(item.product.price * item.quantity).toFixed(2)}
                      {'   '}
                      Subtotal
                    </Text>
                  </View>
                </View>
              </View>
            ))}
            {/* Total Section */}
            <View style={styles.totalContainer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Quantity:</Text>
                <Text style={styles.totalValue}>{totalQuantity}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalValue}>
                  RM {totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <TouchableOpacity
            style={{flexDirection: 'column', alignItems: 'center'}}
            onPress={() => props.navigation.navigate('home')}>
            <FontAwesome6 name="cart-plus" size={40} color="#FFA500" />
            <Text style={styles.emptyCartText}>your cart is empty.</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => props.navigation.navigate('checkout')}>
          <MaterialIcons
            name="shopping-cart-checkout"
            size={23}
            color="#ffffff"
          />
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      )}

      {/* Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Remove this item from the cart?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmDelete}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 80,
  },
  scrollView: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 13,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  deleteButtonTop: {
    position: 'absolute',
    top: -10,
    right: 0,
    zIndex: 1,
    backgroundColor: '#FFA500',
    width: 22, // Width of the button
    height: 22, // Height of the button
    borderRadius: 15, // Make it circular
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 25,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  itemPriceContainer: {
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFA500',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8, // Space between icon and text
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  deleteButton: {
    backgroundColor: '#FFA500',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
