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
const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [detailMessage,setDetailMessage] = useState('');
    const navigation = useNavigation();

    // Add your registration logic here

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://10.0.2.2:8000/register', { password, confirmPassword, username, email });
            console.log(res.data.status);

            if (res.data.status === 'success') {
                console.log('Register success');
                setDetailMessage('Register success');
                navigation.navigate('Login');
            } else if (res.data.status === 'mismatch') {
                setDetailMessage('The passwords do not match');
            } else if (res.data.status === 'short_password') {
                setDetailMessage('Short password (min 6 chars)');
            } else if (res.data.status === 'invalid_email') {
                setDetailMessage('Invalid email format');
            } else if (res.data.status === 'email_already_registered') {
                setDetailMessage('Email is already registered');
            } else if (res.data.status === 'empty_fields') {
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
                source={require('./2b.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <Image source={require('./gelogo.png')} style={styles.logo} />

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
                    style={styles.input}
                    placeholder="Enter your Email"
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
                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput
                    style={styles.input}
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
        </View>
    );
};


export default Register;
