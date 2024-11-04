import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import CartItemsScreen from './src/CartItemsScreen';
import ItemDetailsScreen from './src/ItemDetailsScreen';
import {CartProvider, useCart} from './src/CartProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

const CartIcon = (props: any) => {
  const {cartItems} = useCart();
  const itemCount = cartItems.length;

  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('cartItems')}
      style={styles.iconContainer}>
      <View style={styles.cartIconContainer}>
        <MaterialIcons name="shopping-cart" size={24} color="#ffffff" />
        {itemCount > 0 && (
          <View style={styles.cartCountContainer}>
            <Text style={styles.cartCountText}>{itemCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="itemdetails"
              component={ItemDetailsScreen}
              options={({navigation}) => ({
                title: 'PRODUCT DETAILS',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#FFA500',
                },
                headerTitleStyle: {
                  color: '#ffffff',
                },
                headerTintColor: '#ffffff',
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconContainer}>
                    <Ionicons name="chevron-back" size={25} color="#ffffff" />
                  </TouchableOpacity>
                ),
                headerRight: () => <CartIcon navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="cartItems"
              component={CartItemsScreen}
              options={({navigation}) => ({
                headerStyle: {
                  backgroundColor: '#FFA500',
                },
                headerTintColor: '#ffffff',
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconContainer}>
                    <Ionicons name="chevron-back" size={25} color="#ffffff" />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <View style={styles.headerTitleContainer}>
                    <MaterialIcons
                      name="shopping-cart"
                      size={25}
                      color="#ffffff"
                    />
                    <Text style={styles.headerTitleText}>SimiCart</Text>
                  </View>
                ),
                headerTitleAlign: 'center',
                headerBackVisible: false,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIconContainer: {
    position: 'relative',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartCountContainer: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartCountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default App;
