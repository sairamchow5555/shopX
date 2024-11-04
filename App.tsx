import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import CartItemsScreen from './src/CartItemsScreen';
import ItemDetailsScreen from './src/ItemDetailsScreen';
import {CartProvider} from './src/CartProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

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
                backgroundColor: '#FFA500', // Customize background color
              },
              headerTitleStyle: {
                color: '#ffffff', // Set title color to white
              },
              headerTintColor: '#ffffff', // Set back button color to white
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.iconContainer}>
                  <Ionicons
                    name="chevron-back" // Back icon
                    size={25}
                    color="#ffffff"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <MaterialIcons
                  name="shopping-cart" // Cart icon
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
            options={({navigation}) => ({
              headerStyle: {
                backgroundColor: '#FFA500', // Choose your preferred background color
              },
              headerTintColor: '#ffffff', // Set back button color to white
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.iconContainer}>
                  <Ionicons
                    name="chevron-back" // Back icon
                    size={25}
                    color="#ffffff"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              ),
              headerTitle: () => (
                <View style={styles.headerTitleContainer}>
                  <MaterialIcons
                    name="shopping-cart"
                    size={25}
                    color="#ffffff"
                    style={styles.icon}
                  />
                  <Text style={styles.headerTitleText}>SimiCart</Text>
                </View>
              ),
              headerTitleAlign: 'center', // Center the title
              headerBackVisible: false, // Disable default back button
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 0, // Add some margin for spacing between icons
  },
  iconContainer: {
    padding: 10, // Padding for better touch feedback
    flexDirection: 'row', // Ensures icon is in line with the title
    alignItems: 'center', // Centers the icon vertically with the text
  },
  headerTitleContainer: {
    flexDirection: 'row', // Align title and cart icon in a row
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
  },
  headerTitleText: {
    color: '#ffffff',
    fontSize: 20, // Adjust font size as needed
    fontWeight: 'bold',
  },
});
