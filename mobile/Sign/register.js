import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput, ImageBackground,
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {styles} from "./login";
import axios from "axios";
import Modal from 'react-native-modal'; // Import the modal component


const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [detailMessage,setDetailMessage] = useState('');
    const navigation = useNavigation();
    const [emailBorder, setEmailBorder] = useState('#2a7312');
    const [passwordBorder, setPasswordBorder] = useState('#2a7312');
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false); // State to control the visibility of the success modal



    const navigateToLogin = () => {
        navigation.navigate('Login');
        setDetailMessage('')
    };

    const handleRegister = async () => {
        try {
            setEmailBorder('#2a7312')
            setPasswordBorder('#2a7312')

            const res = await axios.post('http://10.0.2.2:8000/register', { password, confirmPassword, username, email });
            console.log(res.data.status);

            if (res.data.status === 'success') {
                setDetailMessage('')
                setSuccessModalVisible(true); // Show the success modal
                console.log('Register success');
                //navigation.navigate('Login');
            }

            else if (res.data.status === 'invalid_email') {
                setEmailBorder('red')
                setDetailMessage('Invalid email format');
            }

            else if (res.data.status === 'email_already_registered') {
                setEmailBorder('red')
                setDetailMessage('Email is already registered');
            }

            else if (res.data.status === 'mismatch') {
                setPasswordBorder('red')
                setDetailMessage('The passwords do not match');
            }

            else if (res.data.status === 'short_password') {
                setPasswordBorder('red')
                setDetailMessage('Short password (min 6 chars)');
            }

            else if (res.data.status === 'empty_fields') {
                setDetailMessage('All fields must be filled');
            } else {
                // Handle other cases if needed
                console.log('Registration failed: ', res.data.message);
                setDetailMessage('Registration fail');
            }
        } catch (error) {
            // Handle error, e.g., network issues, server not reachable
            console.error('Error during registration:', error);
        }
    };



    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../images/2b.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <Image source={require('../images/gelogo.png')} style={styles.logo} />

            <View style={styles.form}>
                <Text style={styles.loginheader}>Register</Text>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Name"
                    value={username}
                    onChangeText={setUserName}
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={[styles.input, { borderColor: emailBorder}]}
                    placeholder="Enter your Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={[styles.input, { borderColor: passwordBorder}]}
                    placeholder="Enter your password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput
                    style={[styles.input, { borderColor: passwordBorder}]}
                    placeholder="Enter your password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity style={styles.loginbutton} onPress={handleRegister}>
                    <Text style={styles.buttonText1}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.details} >{detailMessage} </Text>

                <View style={styles.rowContainer}>
                    <Text>A user?</Text>
                    <TouchableOpacity onPress={navigateToLogin}>
                        <Text style={styles.click}> Click here</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={isSuccessModalVisible} style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Registration Successful!</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={navigateToLogin}>
                        <Text style={styles.modalButtonText}>Let's login</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    );
};



export default Register;
