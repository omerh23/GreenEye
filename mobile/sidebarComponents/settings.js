import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Sidebar from "../Sidebar";
import {fetchUserData} from "../userUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Settings = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [username,setUsername] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [emailBorder, setEmailBorder] = useState('#2a7312');
    const [passwordBorder, setPasswordBorder] = useState('#2a7312');
    const [confirmPassword, setConfirmPassword] = useState('');


    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData();
            setUser(userData);
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        };

        getUserData();
    }, []);

    return(
        <View style={styles.container}>
            <Sidebar/>
            <View style={styles.form}>
                <Text style={styles.loginheader}>Settings</Text>
                <Text style={styles.label}>Change username:</Text>
                <TextInput
                    style={styles.input}
                    // placeholder={"Enter your Name"}
                    value={user? user.username : null}
                    onChangeText={setUsername}
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={[styles.input, { borderColor: emailBorder}]}
                    // placeholder="Enter your Email"
                    value={user? user.email : null}
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


                {/*<Text style={styles.details} >{detailMessage} </Text>*/}

            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        padding: 20,
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
        marginTop: 100,

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

export default Settings;
