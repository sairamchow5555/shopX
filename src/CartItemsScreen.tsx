import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CartItem} from './CartProvider';

interface CartItemsScreenProps {
  route: {
    params: {
      cartItems: CartItem[];
    };
  };
  navigation: any; // Consider typing this based on your navigation structure
}

const CartItemsScreen: React.FC<CartItemsScreenProps> = props => {
  const cartItems = props.route.params?.cartItems || [];

  // Calculate total quantity and price
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate('home')}>
          <AntDesign name="back" size={26} style={styles.cartIcon} />
        </TouchableOpacity>
        <Text style={styles.main}>Cart Details</Text>
      </View>

      {cartItems.length > 0 ? (
        <>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.tableheader} style={{flex: 3}}>
                <Text style={styles.headerText}>Product Name</Text>
              </DataTable.Title>
              <DataTable.Title textStyle={styles.tableheader} style={{flex: 1}}>
                <Text style={styles.headerText}>Qty</Text>
              </DataTable.Title>
              <DataTable.Title textStyle={styles.tableheader} style={{flex: 1}}>
                <Text style={styles.headerText}>Price</Text>
              </DataTable.Title>
            </DataTable.Header>

            {cartItems.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{flex: 3}}>
                  <Text>{item.product.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}}>
                  <Text>{item.quantity}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}}>
                  <Text>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Row />

            <DataTable.Row>
              <DataTable.Cell textStyle={styles.totalCell} style={{flex: 3}}>
                <Text style={styles.totalText}>Total Amount</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>
                <Text>{totalQuantity}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>
                <Text>${totalPrice.toFixed(2)}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          <View>
            <TouchableOpacity
              style={styles.button}
              // onPress={() => props.navigation.navigate('Checkout')}
            >
              <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </View>
  );
};

export default CartItemsScreen;

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
  table: {
    marginTop: 10,
  },
  tableheader: {
    justifyContent: 'flex-start', // Ensure header titles are left aligned
  },
  headerText: {
    fontSize: 18, // Increase header text size
    fontWeight: 'bold',
    textAlign: 'center', // Center align header text
  },
  totalCell: {
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 18, // Bold total text
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50', // Green background
    borderRadius: 25, // Round corners
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 30, // Horizontal padding
    elevation: 5, // Add shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 2, // Shadow radius
  },
  buttonText: {
    color: 'white', // White text
    fontSize: 18, // Increase font size
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Center text
  },
});
