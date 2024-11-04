import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import CartItemsScreen from './src/CartItemsScreen';
import ItemDetailsScreen from './src/ItemDetailsScreen';
import {CartProvider} from './src/CartProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
                backgroundColor: '#4CAF50', // Customize background color
              },
              headerTitleStyle: {
                color: '#ffffff', // Set title color to white
              },
              headerTintColor: '#ffffff', // Set back button color to white
              headerRight: () => (
                <Ionicons
                  name="cart-outline" // Cart icon
                  size={24}
                  color="#ffffff" // Icon color to match header
                  onPress={() => navigation.navigate('cartItems')}
                  style={{marginRight: 15}} // Add padding for alignment
                />
              ),
            })}
          />
          <Stack.Screen
            name="cartItems"
            component={CartItemsScreen}
            options={{
              title: 'CART ITEMS',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#4CAF50', // Choose your preferred background color
              },
              headerTitleStyle: {
                color: '#ffffff', // Set text color to contrast with background
              },
              headerTintColor: '#ffffff', // Set back button color to white
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
