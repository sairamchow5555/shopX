import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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
      'Madina Minyak Goreng Sawit is a high-quality cooking oil made from palm oil. It is ideal for frying, sautéing, and baking. This oil has a high smoke point, which means it can withstand high temperatures without breaking down. It is also rich in antioxidants, which can help protect your cells from damage. Madina Minyak Goreng Sawit is a great choice for those who are looking for a healthy and affordable cooking oil.',
  },
  {
    id: '2',
    name: 'Fresh Day Soap',
    price: 19,
    image: require('./images/freshday_soap.jpg'),
    description:
      'Fresh Day Soap is a gentle and effective soap that is perfect for everyday use. It is made with natural ingredients that are gentle on your skin. Fresh Day Soap helps to remove dirt and impurities without stripping away your skins natural moisture. It leaves your skin feeling soft, smooth, and refreshed.',
  },
  {
    id: '3',
    name: 'Juliet Shampoo',
    price: 39,
    image: require('./images/juliet_shampoo.jpg'),
    description:
      'Juliet Shampoo is a luxurious shampoo that will leave your hair feeling soft, shiny, and healthy. It is formulated with a blend of natural ingredients that help to nourish and protect your hair. Juliet Shampoo helps to remove dirt, oil, and product buildup from your hair. It also helps to add moisture and shine to your hair. Juliet Shampoo is perfect for all hair types.',
  },
  {
    id: '4',
    name: 'Avena and Madina',
    price: 59,
    image: require('./images/madina_avena.jpg'),
    description:
      'Avena and Madina is a popular brand of cooking oil in Indonesia. It is made from a blend of palm oil and soybean oil. This oil is ideal for frying, sautéing, and baking. It has a high smoke point, which means it can withstand high temperatures without breaking down. Avena and Madina is also a good source of vitamin E, which is an antioxidant that can help protect your cells from damage.',
  },
  {
    id: '5',
    name: 'Madina Oil',
    price: 12,
    image: require('./images/madina_oil.jpg'),
    description:
      'Madina Oil is a versatile cooking oil that can be used for a variety of purposes. It is ideal for frying, sautéing, and baking. This oil has a high smoke point, which means it can withstand high temperatures without breaking down. Madina Oil is also a good source of vitamin E, which is an antioxidant that can help protect your cells from damage.',
  },
  {
    id: '6',
    name: 'Meditwist Handwash',
    price: 11,
    image: require('./images/meditwist_handwash.jpg'),
    description:
      'Meditwist Handwash is a gentle and effective hand soap that is perfect for everyday use. It is made with natural ingredients that are gentle on your skin. Meditwist Handwash helps to remove dirt, germs, and bacteria from your hands. It leaves your hands feeling clean, soft, and refreshed.',
  },
  {
    id: '7',
    name: 'Milgro Familia Milk Powder',
    price: 71,
    image: require('./images/milgro_familia_milk_powder.jpg'),
    description:
      'Milgro Familia Milk Powder is a nutritious and delicious milk powder that is perfect for the whole family. It is made with high-quality milk that is rich in protein, calcium, and other essential nutrients. Milgro Familia Milk Powder is easy to prepare and can be enjoyed hot or cold. It is a great way to start your day or to enjoy as a snack.',
  },
  {
    id: '8',
    name: 'Milgro Full Cream Milk Powder',
    price: 18,
    image: require('./images/milgro_instant_cream_milk_powder.jpg'),
    description:
      'Milgro Full Cream Milk Powder is a rich and creamy milk powder that is perfect for adding to your coffee or tea. It is made with high-quality milk that is rich in protein, calcium, and other essential nutrients. Milgro Full Cream Milk Powder is easy to prepare and can be enjoyed hot or cold. It is a great way to start your day or to enjoy as a snack.',
  },
  {
    id: '9',
    name: 'Saba Floral Detergent',
    price: 33,
    image: require('./images/saba_floral_detergent.jpg'),
    description:
      'Saba Floral Detergent is a powerful detergent that will leave your clothes clean and fresh. It is formulated with a special blend of enzymes that help to remove tough stains. Saba Floral Detergent also has a pleasant floral scent that will make your laundry smell great. It is safe to use on all types of fabrics, including delicates.',
  },
  {
    id: '10',
    name: 'Saba Multipurpose Liquid Detergent',
    price: 46,
    image: require('./images/saba_multipurpose_liquid_detergent.jpg'),
    description:
      'Saba Multipurpose Liquid Detergent is a versatile detergent that can be used to clean a variety of surfaces. It is effective on laundry, dishes, and hard surfaces. Saba Multipurpose Liquid Detergent is formulated with a special blend of enzymes that help to remove tough stains. It also has a pleasant scent that will leave your home smelling fresh.',
  },
  {
    id: '11',
    name: 'Soft Silk Beauty Soap',
    price: 17,
    image: require('./images/softsilk_beauty_soap.jpg'),
    description:
      'Soft Silk Beauty Soap is a gentle and effective soap that is perfect for everyday use. It is made with natural ingredients that are gentle on your skin. Soft Silk Beauty Soap helps to remove dirt and impurities without stripping away your skins natural moisture. It leaves your skin feeling soft, smooth, and refreshed.',
  },
  {
    id: '12',
    name: 'Milgro Lait Concentre Sucre',
    price: 15,
    image: require('./images/Sweetened_condensed_filled_milk.jpg'),
    description:
      'Milgro Lait Concentre Sucre is a rich and creamy sweetened condensed milk that is perfect for adding to your coffee, tea, or desserts. It is made with high-quality milk and sugar. Milgro Lait Concentre Sucre is easy to use and can be enjoyed hot or cold. It is a great way to add sweetness and flavor to your favorite foods and drinks.',
  },
  {
    id: '13',
    name: 'Zenta Detergent Powder',
    price: 11,
    image: require('./images/zenta_detergent_powder.jpg'),
    description:
      'Zenta Detergent Powder is a powerful detergent that will leave your clothes clean and fresh. It is formulated with a special blend of enzymes that help to remove tough stains. Zenta Detergent Powder also has a pleasant scent that will make your laundry smell great. It is safe to use on all types of fabrics, including delicates.',
  },
  {
    id: '14',
    name: 'Zenta Multipurpose Soap',
    price: 13,
    image: require('./images/zenta_multipurpose_soap.jpg'),
    description:
      'Zenta Multipurpose Soap is a versatile soap that can be used to clean a variety of surfaces. It is effective on laundry, dishes, and hard surfaces. Zenta Multipurpose Soap is formulated with a special blend of ingredients that help to remove dirt, grease, and grime. It also has a pleasant scent that will leave your home smelling fresh.',
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

  const renderProductRow = (item: Product) => {
    const quantity = getCartItemQuantity(item.id);
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('itemdetails', {productDetails: item})
        }
        style={styles.row}
        key={item.id}>
        <Image source={item.image} style={styles.rowImage} />
        <View style={styles.rowDetails}>
          <Text style={styles.rowProductName}>{item.name}</Text>
          <Text style={styles.rowProductPrice}>RM {item.price}</Text>
        </View>
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
      </TouchableOpacity>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.noResults}>No products found</Text>
    </View>
  );

  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

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
            <View style={styles.cartIconContainer}>
              <MaterialIcons
                name="shopping-cart"
                size={26}
                style={styles.cartIcon}
              />
              {getTotalItemsInCart() > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{getTotalItemsInCart()}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <Searchbar
          placeholder="Search"
          onChangeText={onSearchQueryChange}
          value={searchQuery}
          style={styles.searchbar}
        />

        <View style={styles.table}>
          <ScrollView>
            {filteredProducts.length > 0
              ? filteredProducts.map(renderProductRow)
              : renderEmptyList()}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  cartIconContainer: {
    position: 'relative',
    marginRight: 10,
  },
  cartIcon: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 3,
    color: 'white',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFA500',
    fontWeight: 'bold',
    fontSize: 12,
    // backgroundColor: '#FFA500',
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
  table: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  rowImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  rowDetails: {
    flex: 1,
  },
  rowProductName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowProductPrice: {
    fontSize: 14,
    color: '#888',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
  },
  cartQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  addToCartButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFA500',
    borderRadius: 20,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default HomeScreen;