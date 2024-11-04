import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Snackbar} from 'react-native-paper';
import {useCart} from './CartProvider';

const CheckOutScreen = (props: any) => {
  const {cartItems, setCartItems} = useCart();
  const [name, setName] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Snackbar state
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);

  // Function to calculate total amount and total items
  const calculateTotals = () => {
    let totalItems = 0;
    let totalAmount = 0;

    cartItems.forEach(item => {
      totalItems += item.quantity;
      totalAmount += item.product.price * item.quantity;
    });

    return {totalItems, totalAmount};
  };

  const {totalItems, totalAmount} = calculateTotals();

  // Function to validate form
  const validateForm = () => {
    if (!name || !addressLine || !city || !state || !postalCode) {
      setSnackbarMessage('Fill your address details!');
      setSnackbarVisible(true);
      return false;
    }
    return true;
  };

  // Function to handle order confirmation
  const handleConfirmOrder = () => {
    if (validateForm()) {
      // Show the modal
      setModalVisible(true);
    }
  };

  const onDismissSnackbar = () => setSnackbarVisible(false);

  const handleModalConfirm = () => {
    setModalVisible(false);
    // Clear the cart
    setCartItems([]);
    props.navigation.navigate('home');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Address Line"
            value={addressLine}
            onChangeText={setAddressLine}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="City"
            value={city}
            onChangeText={setCity}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="State"
            value={state}
            onChangeText={setState}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Postal Code"
            value={postalCode}
            keyboardType="numeric"
            onChangeText={setPostalCode}
            style={styles.input}
            mode="outlined"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Items:</Text>
            <Text style={styles.value}>{totalItems}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Amount:</Text>
            <Text style={styles.value}>RM {totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.codText}>Cash on Delivery (COD)</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmOrder}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>

      {/* Snackbar Container */}
      <View style={styles.snackbarContainer}>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackbar}
          duration={2000} // Snackbar visibility duration
          style={styles.snackbar} // Custom style for Snackbar
          action={{
            label: 'OK',
            onPress: () => {
              onDismissSnackbar();
            },
          }}>
          {snackbarMessage}
        </Snackbar>
      </View>

      {/* Modal for Order Confirmation */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Confirmation</Text>
            <Text style={styles.modalMessage}>
              Your order has been placed successfully!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalConfirm}>
              <Text style={styles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  codText: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
    fontWeight: '600',
  },
  input: {
    marginBottom: 3,
    fontSize: 14,
    color: '#333',
  },
  confirmButton: {
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
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  snackbarContainer: {
    position: 'absolute',
    bottom: 80, // Adjusted position to be above the button
    left: 20,
    right: 20,
    zIndex: 1, // Ensure it is above other components
  },
  snackbar: {
    backgroundColor: '#323232', // Custom background color
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
