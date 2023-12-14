import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./2b.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Image source={require('./gelogo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Text style={styles.loginheader}>Login</Text>
        <Text style={styles.label}>UserName:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUserName}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginbutton}>
          <Text style={styles.buttonText1}>Signin</Text>
        </TouchableOpacity>
        <Text>Not a user? click here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 80, // Adjust the size of your logo
    height: 80, // Adjust the size of your logo
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 25,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  loginheader: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    color: '#2a7312',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#2a7312',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  loginbutton: {
    alignItems: 'center',
    backgroundColor: '#2a7312', // Set your desired background color
    borderRadius: 50, // Set your desired border radius
    borderWidth: 2, // Set the border width
    borderColor: '#2a7312', // Set the border color
    paddingVertical: 5, // Set the vertical padding
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonText1: {
    color: 'white', // Set the text color
    fontSize: 16, // Set the font size
    fontWeight: 'bold', // Set the font weight
  },
});

export default Login;
