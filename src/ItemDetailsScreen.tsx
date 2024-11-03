import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Helper function to get the quantity of a specific product in the cart
const getCartItemQuantity = (cartItems, productId) => {
  const item = cartItems.find(item => item.product.id === productId);
  return item ? item.quantity : 0;
};

const ItemDetailsScreen = (props: any) => {
  const {productDetails, cartItems, setCartItems} = props.route.params;

  // Use local state to track quantity
  const [quantity, setQuantity] = useState(
    getCartItemQuantity(cartItems, productDetails.id),
  );

  // Update local quantity state when cart items change
  useEffect(() => {
    setQuantity(getCartItemQuantity(cartItems, productDetails.id));
  }, [cartItems]); // Rerun when cartItems changes

  // Function to add a product to the cart
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
    props.navigation.navigate('cartItems', {cartItems});
  };

  // Function to increase the quantity of a product
  const handleIncreaseQuantity = () => {
    setCartItems(prev => {
      const updatedItems = prev.map(item =>
        item.product.id === productDetails.id
          ? {...item, quantity: item.quantity + 1}
          : item,
      );
      const newQuantity = getCartItemQuantity(updatedItems, productDetails.id);
      console.log('New quantity after increase:', newQuantity); // Debugging log
      setQuantity(newQuantity);
      return updatedItems;
    });
  };

  // Function to decrease the quantity of a product
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
          const newQuantity = getCartItemQuantity(
            updatedItems,
            productDetails.id,
          );
          console.log('New quantity after decrease:', newQuantity); // Debugging log
          setQuantity(newQuantity);
          return updatedItems;
        }
        const updatedItems = prev.filter(
          item => item.product.id !== productDetails.id,
        );
        const newQuantity = getCartItemQuantity(
          updatedItems,
          productDetails.id,
        );
        console.log('Removed item. New quantity:', newQuantity); // Debugging log
        setQuantity(newQuantity);
        return updatedItems;
      }
      return prev; // If the item is not in the cart, return the current state
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <AntDesign name="back" size={26} style={styles.cartIcon} />
        </TouchableOpacity>
        <Text style={styles.main}>Product Details</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('cartItems', {cartItems})}>
          <AntDesign name="shoppingcart" size={26} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>

      <Image source={productDetails.image} style={styles.image} />
      <View style={styles.titlePriceContainer}>
        <Text style={styles.title}>{productDetails.name}</Text>
        <Text style={styles.price}>{productDetails.price}</Text>
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
