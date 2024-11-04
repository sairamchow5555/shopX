import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import {CartContext} from './CartProvider';
import {Snackbar} from 'react-native-paper'; // Import Snackbar

const getCartItemQuantity = (cartItems, productId) => {
  const item = cartItems.find(item => item.product.id === productId);
  return item ? item.quantity : 0;
};

const ItemDetailsScreen = ({route}) => {
  const {productDetails} = route.params;
  const {cartItems, setCartItems} = useContext(CartContext);

  const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar state

  const handleAddToCart = () => {
    const existingItem = cartItems.find(
      item => item.product.id === productDetails.id,
    );
    if (existingItem) {
      setSnackbarVisible(true); // Show Snackbar if the item is already in the cart
    } else {
      setCartItems(prev => [...prev, {product: productDetails, quantity: 1}]);
    }
  };

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const descriptionPoints = productDetails.description
    ? productDetails.description
        .split(/[.\n]/)
        .filter(point => point.trim() !== '')
    : [];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={productDetails.image} style={styles.image} />
        <View style={styles.titlePriceContainer}>
          <Text style={styles.title}>{productDetails.name}</Text>
          <Text style={styles.price}>$ {productDetails.price.toFixed(2)}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          {descriptionPoints.map((point, index) => (
            <View key={index} style={styles.pointItem}>
              <Text style={styles.bullet}>{'\u2192'}</Text>
              <Text style={styles.pointText}>{point.trim()}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
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
            This product is already in your cart!
          </Snackbar>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  snackbarContainer: {
    position: 'absolute',
    bottom: 70, // Adjusted position to be above the button
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it is above other components
  },
  snackbar: {
    backgroundColor: '#323232', // Custom background color
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007bff',
  },
  descriptionContainer: {
    width: '90%',
    marginTop: 10,
  },
  pointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#555',
  },
  pointText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  bottomContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50', // Green color similar to Checkout button
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ItemDetailsScreen;
