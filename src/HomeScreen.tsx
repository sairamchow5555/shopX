import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Searchbar} from 'react-native-paper';
import {useCart} from './CartProvider';

interface Product {
  id: string;
  name: string;
  price: number;
  image: any; // Keep this type if using require
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Sample Products
const products: Product[] = [
  {
    id: '1',
    name: 'Madina Minyak Goreng Sawit',
    price: 29,
    image: require('./images/avena.jpg'),
    description:
      'Elevate your computing experience with this precision mouse. Its ergonomic design ensures comfort during long hours of work or play. The high-resolution sensor delivers accurate cursor control, while the customizable buttons offer efficient workflow.',
  },
  {
    id: '2',
    name: 'Fresh Day Soap',
    price: 19,
    image: require('./images/freshday_soap.jpg'),
    description:
      'Immerse yourself in your favorite music or podcasts with these high-quality earbuds. The crystal-clear sound and noise-cancellation technology provide an exceptional listening experience. The ergonomic design ensures a comfortable fit, even during extended use.',
  },
  {
    id: '3',
    name: 'Juliet Shampoo',
    price: 39,
    image: require('./images/juliet_shampoo.jpg'),
    description:
      'Power up your devices quickly and efficiently with this fast-charging charger. Its advanced technology delivers rapid charging speeds, saving you time and hassle. The compact and portable design makes it perfect for on-the-go use.',
  },
  {
    id: '4',
    name: 'Avena and Madina',
    price: 59,
    image: require('./images/madina_avena.jpg'),
    description:
      'Protect your eyes from harmful UV rays in style with these fashionable sunglasses. The polarized lenses reduce glare and enhance visual clarity, while the sleek frame adds a touch of sophistication to any outfit.',
  },
  {
    id: '5',
    name: 'Madina Oil',
    price: 12,
    image: require('./images/madina_oil.jpg'),
    description:
      'Experience ultimate comfort and support with these stylish sneakers. The breathable mesh upper keeps your feet cool and dry, while the cushioned insole provides all-day comfort. Perfect for casual wear or athletic activities.',
  },
  {
    id: '6',
    name: 'Meditwist Handwash',
    price: 11,
    image: require('./images/meditwist_handwash.jpg'),
    description:
      'Turn heads with this elegant dress, designed to flatter your figure and enhance your style. The flowing fabric and intricate details create a timeless look, making it perfect for any special occasion.',
  },
  {
    id: '7',
    name: 'Milgro Familia Milk Powder',
    price: 71,
    image: require('./images/milgro_familia_milk_powder.jpg'),
    description:
      'Experience ultimate performance and portability with this powerful laptop. The sleek design and lightweight build make it easy to carry, while the high-resolution display and fast processor deliver a seamless user experience.',
  },
  {
    id: '8',
    name: 'Milgro Full Cream Milk Powder',
    price: 18,
    image: require('./images/milgro_instant_cream_milk_powder.jpg'),
    description:
      'Stay connected and active with this feature-packed smartwatch. Track your fitness goals, receive notifications, and make calls, all from your wrist. The stylish design and long-lasting battery make it the perfect companion for your busy lifestyle.',
  },
  {
    id: '9',
    name: 'Saba Floral Detergent',
    price: 33,
    image: require('./images/saba_floral_detergent.jpg'),
    description:
      'Immerse yourself in the world of gaming with this high-performance console. Experience stunning graphics, lightning-fast load times, and immersive sound. With a vast library of games, endless entertainment awaits.',
  },
  {
    id: '10',
    name: 'Saba Multipurpose Liquid Detergent',
    price: 46,
    image: require('./images/saba_multipurpose_liquid_detergent.jpg'),
    description:
      'Immerse yourself in the world of gaming with this high-performance console. Experience stunning graphics, lightning-fast load times, and immersive sound. With a vast library of games, endless entertainment awaits.',
  },
  {
    id: '11',
    name: 'Soft Silk Beauty Soap',
    price: 17,
    image: require('./images/softsilk_beauty_soap.jpg'),
    description:
      'Immerse yourself in the world of gaming with this high-performance console. Experience stunning graphics, lightning-fast load times, and immersive sound. With a vast library of games, endless entertainment awaits.',
  },
  {
    id: '12',
    name: 'Milgro Lait Concentre Sucre',
    price: 15,
    image: require('./images/Sweetened_condensed_filled_milk.jpg'),
    description:
      'Immerse yourself in the world of gaming with this high-performance console. Experience stunning graphics, lightning-fast load times, and immersive sound. With a vast library of games, endless entertainment awaits.',
  },
  {
    id: '13',
    name: 'Zenta Detergent Powder',
    price: 11,
    image: require('./images/zenta_detergent_powder.jpg'),
    description:
      'Immerse yourself in the world of gaming with this high-performance console. Experience stunning graphics, lightning-fast load times, and immersive sound. With a vast library of games, endless entertainment awaits.',
  },
  {
    id: '14',
    name: 'Zenta Multipurpose Soap',
    price: 13,
    image: require('./images/zenta_multipurpose_soap.jpg'),
    description:
      'Immerse yourself in the world of gaming with this high-performance console. Experience stunning graphics, lightning-fast load times, and immersive sound. With a vast library of games, endless entertainment awaits.',
  },
];

const HomeScreen = (props: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {cartItems, setCartItems} = useCart();

  const onSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToCart = (item: Product) => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(
        cartItem => cartItem.product.id === item.id,
      );
      if (existingItem) {
        // Increase quantity if item is already in cart
        return prevCartItems.map(cartItem =>
          cartItem.product.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem,
        );
      }
      // Otherwise, add new item to cart
      return [...prevCartItems, {product: item, quantity: 1}];
    });
  };

  const handleIncreaseQuantity = (item: Product) => {
    handleAddToCart(item); // Reuse the add function to handle increase
  };

  const handleDecreaseQuantity = (item: Product) => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(
        cartItem => cartItem.product.id === item.id,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If quantity is greater than 1, just decrease it
          return prevCartItems.map(cartItem =>
            cartItem.product.id === item.id
              ? {...cartItem, quantity: cartItem.quantity - 1}
              : cartItem,
          );
        } else {
          // If quantity is 1, remove it from the cart
          return prevCartItems.filter(
            cartItem => cartItem.product.id !== item.id,
          );
        }
      }
      return prevCartItems; // Return unchanged cart if the item wasn't found
    });
  };

  const getCartItemQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0; // Return quantity or 0 if not found
  };

  const renderProductCard = ({item}: {item: Product}) => {
    const quantity = getCartItemQuantity(item.id);
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.touchable}
          activeOpacity={0.7}
          onPress={() =>
            props.navigation.navigate('itemdetails', {
              productDetails: item,
              // addToCart: handleAddToCart, // Pass the function here
              cartItems: cartItems, // Pass the cart items
              setCartItems: setCartItems, // Pass the set function
            })
          }>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>$ {item.price}</Text>
        </TouchableOpacity>
        <View style={styles.cartControls}>
          {quantity > 0 ? (
            <>
              <TouchableOpacity
                onPress={() => handleDecreaseQuantity(item)}
                style={styles.quantityButton}>
                <Text style={styles.cartQuantity}>-</Text>
              </TouchableOpacity>

              <Text style={styles.cartQuantity}>{quantity}</Text>

              <TouchableOpacity
                onPress={() => handleIncreaseQuantity(item)}
                style={styles.quantityButton}>
                <Text style={styles.cartQuantity}>+</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.noResults}>No products found</Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={styles.header}>
          <Text style={styles.title}>ShopX</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('cartItems', {cartItems})}>
            <MaterialIcons name="shopping-cart" size={26} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>

        <Searchbar
          placeholder="Search"
          onChangeText={onSearchQueryChange}
          value={searchQuery}
          style={styles.searchbar}
        />

        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={item => item.id}
          numColumns={2} // Display cards in two columns
          contentContainerStyle={styles.list}
          ListEmptyComponent={renderEmptyList} // Use ListEmptyComponent here
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartIcon: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 7,
    color: 'white',
  },
  searchbar: {
    marginBottom: 10,
    borderRadius: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
    marginTop: 20,
  },
  list: {
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center all items horizontally
    marginTop: 10,
  },
  quantityButton: {
    padding: 20,
  },
  cartQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  addToCartButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
  },
});
