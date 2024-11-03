import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CartContext, CartItem} from './CartProvider';

const getCartItemQuantity = (cartItems: CartItem[], productId: string) => {
  const item = cartItems.find(item => item.product.id === productId);
  return item ? item.quantity : 0;
};

const ItemDetailsScreen: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {productDetails} = route.params; // Get product details from route params
  const {cartItems, setCartItems} = useContext(CartContext); // Use CartContext

  const [quantity, setQuantity] = useState(
    getCartItemQuantity(cartItems, productDetails.id),
  );

  useEffect(() => {
    setQuantity(getCartItemQuantity(cartItems, productDetails.id));
  }, [cartItems]);

  const handleAddToCart = () => {
    setCartItems(prev => {
      const existingItem = prev.find(
        item => item.product.id === productDetails.id,
      );
      if (existingItem) {
        return prev.map(item =>
          item.product.id === productDetails.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }
      return [...prev, {product: productDetails, quantity: 1}];
    });
    setQuantity(quantity + 1);
    const updatedCartItems = [
      ...cartItems,
      {product: productDetails, quantity: 1},
    ];
    navigation.navigate('cartItems', {cartItems: updatedCartItems});
  };

  const handleIncreaseQuantity = () => {
    setCartItems(prev => {
      const updatedItems = prev.map(item =>
        item.product.id === productDetails.id
          ? {...item, quantity: item.quantity + 1}
          : item,
      );
      setQuantity(getCartItemQuantity(updatedItems, productDetails.id));
      return updatedItems;
    });
  };

  const handleDecreaseQuantity = () => {
    setCartItems(prev => {
      const existingItem = prev.find(
        item => item.product.id === productDetails.id,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          const updatedItems = prev.map(item =>
            item.product.id === productDetails.id
              ? {...item, quantity: item.quantity - 1}
              : item,
          );
          setQuantity(getCartItemQuantity(updatedItems, productDetails.id));
          return updatedItems;
        }
        const updatedItems = prev.filter(
          item => item.product.id !== productDetails.id,
        );
        setQuantity(0);
        return updatedItems;
      }
      return prev;
    });
  };

  const handleNavigateToCart = () => {
    navigation.navigate('cartItems', {cartItems});
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={26} style={styles.cartIcon} />
        </TouchableOpacity>
        <Text style={styles.main}>Product Details</Text>
        <TouchableOpacity onPress={handleNavigateToCart}>
          <AntDesign name="shoppingcart" size={26} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>

      <Image source={productDetails.image} style={styles.image} />
      <View style={styles.titlePriceContainer}>
        <Text style={styles.title}>{productDetails.name}</Text>
        <Text style={styles.price}>$ {productDetails.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.description}>{productDetails.description}</Text>

      {quantity > 0 ? (
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecreaseQuantity}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncreaseQuantity}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  main: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartIcon: {
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 7,
    color: 'white',
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 15,
    marginBottom: 16,
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', // Full width
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
    width: '90%',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  quantityButton: {
    fontSize: 24,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ItemDetailsScreen;
