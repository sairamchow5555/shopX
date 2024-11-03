import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  Text,
  Image,
} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';

const LoginScreen = (props: any) => {
  const bg1 = require('./images/bg1.jpg');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    console.log(username, 'username');
    console.log(password, 'password');

    if (username === 'demo' && password === 'demo') {
      props.navigation.navigate('home');
    } else {
      setErrorMessage('enter valid username and password');
      setVisible(true);
    }
  };

  return (
    <ImageBackground source={bg1} style={styles.background}>
      {' '}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>SHOPX</Text>

          {/* Username input */}
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            autoCapitalize="none"
            textColor="black"
            left={<TextInput.Icon icon={'account'} color="#4CAF50" />}
            style={styles.input}
          />

          {/* Password input */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            mode="outlined"
            autoCapitalize="none"
            textColor="black"
            left={<TextInput.Icon icon="lock" color="#4CAF50" />}
            right={
              <TextInput.Icon
                onPress={() => setShowPassword(!showPassword)}
                icon={showPassword ? 'eye' : 'eye-off'}
              />
            }
            style={styles.input}
          />

          {/* Login button */}
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            <Text>Login</Text>
          </Button>
        </View>

        {/* Snackbar for displaying error messages */}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'Close',
            onPress: () => {
              setVisible(false);
            },
          }}
          duration={Snackbar.DURATION_SHORT}
          style={styles.snackbar}>
          <Text style={{color: 'white'}}>{errorMessage}</Text>
        </Snackbar>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    width: '73%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 36, // Increased size for more emphasis
    fontWeight: '900', // Bold weight for more impact
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50', // Change color for uniqueness
    letterSpacing: 2, // Add spacing for modern look
    textShadowColor: '#aaa', // Shadow color
    textShadowOffset: {width: 1, height: 1}, // Shadow offset
    textShadowRadius: 2, // Shadow radius
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
  },
  snackbar: {
    backgroundColor: '#d32f2f', // Red background to indicate error
  },
});
