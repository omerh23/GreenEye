import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../axiosConfig';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [detailMessage,setDetailMessage] = useState('');
  const [user,setUser] = useState();
  const [colorDetails, setColorDetails] = useState('red');


  const handleSignIn = async () => {
    try {
      setDetailMessage('');
      setColorDetails('#2a7312');
      setDetailMessage('Loading please wait..');
      
      const res = await axiosInstance.post('/login',
          { email,
            password
          },
          {timeout:50000});

      if (res.data.status === 'success') {
        setDetailMessage('');
        setColorDetails('#2a7312');
        setDetailMessage('Login success..')
        const token = res.data.token;
        await AsyncStorage.setItem('token', token);
        setUser(res.data.user);
        setDetailMessage('');
      }
      else{
        setColorDetails('red');
        if (res.data.status === 'empty_fields') {
          setDetailMessage('All fields must be filled');
        }
        else if (res.data.status === 'incorrect_details') {
          setDetailMessage('incorrect details');
        }


        else {
          // Handle other cases if needed
          setDetailMessage('Login failed');
          //console.log('Login failed: ', res.data.message);
        }
      }


    } catch (error) {
      if (error.message === 'Network Error') {
        //console.error('Request timed out. Please try again.');
        setColorDetails('red');
        setDetailMessage('No response from server');
        //console.error(error);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      // Store user details
      const storeUserData = async () => {
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(user));
          navigation.navigate('Home');
        } catch (error) {
          // Handle errors here
          console.error('Error storing the user data', error);
        }
      };

      storeUserData();
    }
  }, [user, navigation]);

  const navigateToRegister = () => {
    navigation.navigate('Register');
    setDetailMessage('')
  };
  // @ts-ignore
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/2b.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.logo}>
            <TouchableOpacity>
                <Image source={require('../images/nlogo.png')} style={styles.logo} />
            </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.loginheader}>Login</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginbutton} onPress={handleSignIn}>
          <Text style={styles.buttonText1}>Login</Text>
        </TouchableOpacity>
        <Text style={[styles.details, {color: colorDetails}]} >{detailMessage} </Text>
        {/*<Text style={{textAlign: 'center'}} > {approveMessage} </Text>*/}
        <View style={styles.rowContainer}>
          <Text>Not a user?</Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.click}> Click here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
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
    width: 220,
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  click:{
    color:'#2a7312',
  },
  details: {
    textAlign: 'center',
    color: 'red',

  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center', // Center content horizontally
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#2a7312',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default Login;
