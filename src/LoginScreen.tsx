import {Alert, Box, Button, Center, StatusBar, VStack} from 'native-base';
import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  BounceIn,
  FadeIn,
  FadeInLeft,
  FlipInXUp,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = (props: any) => {
  const [username, setUserName] = useState<string>('demo');
  const [password, setPassword] = useState<string>('demo');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const logo = require('./images/logo1.png');
  const bgImage = require('./images/bg3.jpg');

  function AlertBox() {
    return (
      <Center>
        <Animated.View entering={FadeIn.duration(400)}>
          <VStack space={5} maxW="400">
            <Alert w="100%" status="error" style={{borderRadius: 15}}>
              <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                <Alert.Icon size="5xl" />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: 'coolGray.800',
                  }}>
                  Wrong Credentials!
                </Text>
                <Box
                  _text={{
                    textAlign: 'center',
                  }}
                  _dark={{
                    _text: {
                      color: 'coolGray.600',
                    },
                  }}>
                  Enter correct username and password
                </Box>
                <Button
                  onPress={() => setShowAlert(false)}
                  style={{marginTop: 20, backgroundColor: '#004282'}}>
                  Okay
                </Button>
              </VStack>
            </Alert>
          </VStack>
        </Animated.View>
      </Center>
    );
  }

  const handleLogin = () => {
    setLoading(true);
    // Check if the username or password fields are empty
    if (!username || !password) {
      setLoading(false);
      setShowAlert(true);
    }
    // Validate credentials
    if (username === 'demo' && password === 'demo') {
      setLoading(false);
      setUserName('');
      setPassword('');
      props.navigation.navigate('home');
    } else {
      setLoading(false);
      setShowAlert(true); // Show alert for incorrect credentials
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView style={styles.container}>
        {showAlert ? (
          <Center flex={1} px="3">
            <AlertBox />
          </Center>
        ) : (
          <View style={styles.innerContainer}>
            <View style={styles.formContainer}>
              <Animated.Image
                entering={FadeInLeft.duration(1000)
                  .springify()
                  .damping(10)
                  .delay(500)}
                source={logo}
                style={styles.logo}
              />
              <Animated.View
                entering={BounceIn.duration(1000).delay(700)}
                style={styles.inputView}>
                <View style={styles.inputIcon}>
                  <Text style={styles.icon}>👤</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUserName}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor="#aaaaaa"
                />
              </Animated.View>
              <Animated.View
                entering={FlipInXUp.duration(1000).delay(700)}
                style={styles.inputView}>
                <View style={styles.inputIcon}>
                  <Text style={styles.icon}>🔑</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor="#aaaaaa"
                />
                <Pressable onPress={toggleShowPassword}>
                  <Text style={styles.showPasswordButton}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </Pressable>
              </Animated.View>
              <Animated.View
                entering={FlipInXUp.duration(1000).delay(700)}
                style={styles.buttonView}>
                <Button
                  style={styles.button}
                  onPress={handleLogin}
                  isLoading={loading}
                  _loading={{
                    bg: 'muted.100',
                    _text: {color: 'white'},
                  }}
                  _spinner={{color: 'white'}}
                  isLoadingText="Logging in"
                  _text={{fontSize: 18, fontWeight: 'bold', color: '#FFA500'}}>
                  LOGIN
                </Button>
              </Animated.View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    borderRadius: 20,
    padding: 25,
    width: '90%',
    alignItems: 'center',
    maxHeight: 500, // Set a max height to prevent it from growing
    overflow: 'hidden', // This will hide anything that overflows
    borderWidth: 2, // Set border width
    borderColor: '#FFA500', // Orange border color
  },
  logo: {
    width: '80%', // Adjust this as needed
    height: 250, // Increased height for a bigger logo
    resizeMode: 'contain',
    marginTop: -100,
    marginBottom: -70,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 15,
    color: '#ffffff',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2, // Set the bottom border width
    borderBottomColor: '#FFA500', // Orange bottom border color
  },
  inputIcon: {
    marginRight: 10,
  },
  icon: {
    fontSize: 18,
    color: '#ffffff',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000000', // Text color set to black
  },
  showPasswordButton: {
    color: '#000',
    fontSize: 16,
    marginLeft: 5,
  },
  buttonView: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFA500',
    backgroundColor: '#f8f8f8',
  },
  alertBox: {
    borderRadius: 15,
    backgroundColor: '#d9534f',
  },
  alertTextTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertTextBox: {
    textAlign: 'center',
    color: '#f5f5f5',
  },
  alertButton: {
    marginTop: 15,
    backgroundColor: '#004282',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
