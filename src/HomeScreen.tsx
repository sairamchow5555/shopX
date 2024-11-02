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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Searchbar} from 'react-native-paper';

const products = [
  {
    id: '1',
    name: 'Mouse',
    price: '$10',
    image: require('./images/bg1.jpg'),
  },
  {
    id: '2',
    name: 'Ear buds',
    price: '$20',
    image: require('./images/bg1.jpg'),
  },
  {
    id: '3',
    name: 'Charger',
    price: '$30',
    image: require('./images/bg1.jpg'),
  },
  {
    id: '4',
    name: 'Stylish Sunglasses',
    price: '$40',
    image: require('./images/bg1.jpg'),
  },
  {
    id: '5',
    name: 'Comfortable Sneakers',
    price: '$50',
    image: require('./images/bg1.jpg'),
  },
  {
    id: '6',
    name: 'Elegant Dress',
    price: '$60',
    image: require('./images/bg1.jpg'),
  },
  {
    id: '7',
    name: 'Modern Laptop',
    price: '$700',
    image: require('./images/bg1.jpg'),
  },
  {
    id: '8',
    name: 'Smartwatch',
    price: '$80',
    image: require('./images/bg1.jpg'),
  },
  {
    id: '9',
    name: 'Gaming Console',
    price: '$300',
    image: require('./images/bg1.jpg'),
  },
];

const HomeScreen = (props: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderProductCard = ({item}: any) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.touchable} activeOpacity={0.7}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </TouchableOpacity>
    </View>
  );

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
            onPress={() => props.navigation.navigate('cartItems')}>
            <AntDesign name="shoppingcart" size={26} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>

        {/* Searchbar */}
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
    marginHorizontal: 10,
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
    backgroundColor: '#222222',
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
    color: '#4CAF50',
  },
});
