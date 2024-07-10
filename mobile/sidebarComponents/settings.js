import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Sidebar from "../Sidebar";
import {fetchUserData} from "../userUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Logo from "../Home/logo";


const Settings = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [cameraUrl,setCameraUrl] = useState('');
    const [detailMessage,setDetailMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [colorDetails, setColorDetails] = useState('red');



    const [oldPassword,setOldPassword] = useState(null);
    const [emailBorder, setEmailBorder] = useState('#2a7312');
    const [cameraUrlBorder,setCameraUrlBorder] = useState('#2a7312');
    const [passwordBorder, setPasswordBorder] = useState('#2a7312');
    const [newPasswordBorder, setNewPasswordBorder] = useState('#2a7312');



    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData();
            setUser(userData);

            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);

            // Set the input fields with user details
            if (userData) {
                setUsername(userData.username || '');
                setEmail(userData.email || '');
                setCameraUrl(userData.cameraUrl || '');
            }
        };

        getUserData();
    }, []);


    async function handleSubmit() {
        setEmailBorder('#2a7312');
        setPasswordBorder('#2a7312');
        setNewPasswordBorder('#2a7312');
        setDetailMessage('');
        setColorDetails('red');
        // const res = await axios.post('https://backend-greeneye.onrender.com/changeDetails',{token,username
        // ,email,oldPassword,newPassword,cameraUrl});
        const res = await axios.post('http://10.0.2.2:8000/changeDetails',{token,username
            ,email,oldPassword,newPassword,cameraUrl});

        console.log(res.data.status);

        if (res.data.status === 'success') {
            setUser(res.data.user);
            setOldPassword(null);
            setNewPassword(null);
            await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
            setUser(res.data.user);
            setColorDetails('#2a7312');
            setDetailMessage('Details change successfully');
            //setSuccessModalVisible(true); // Show the success modal
            console.log('change details success');
        }

        else if (res.data.status === 'invalid_email') {
            setEmailBorder('red')
            setDetailMessage('Invalid email format');
        }

        else if (res.data.status === 'email_already_registered') {
            setEmailBorder('red')
            setDetailMessage('Email is already registered');
        }

        else if (res.data.status === 'short_password') {
            setNewPasswordBorder('red')
            setDetailMessage('Short password (min 6 chars)');
        }

        else if (res.data.status === 'empty_fields') {
            setDetailMessage('All fields must be filled');
        }

        else if (res.data.status === 'wrong_old_password') {
            setPasswordBorder('red')
            setDetailMessage('Wrong old password');
        }



    }

    return(
        <View style={styles.container}>
            <Logo/>
            <Sidebar/>
            <View style={styles.form}>
                <Text style={styles.settingsHeader}>Settings</Text>
                <Text style={styles.label}>Change username:</Text>
                <TextInput
                    style={styles.input}
                    //placeholder={user? user.username : null}
                    value={username}
                    onChangeText={setUsername}
                />
                <Text style={styles.label}>Change email:</Text>
                <TextInput
                    style={[styles.input, { borderColor: emailBorder}]}
                    //placeholder={user? user.email : null}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Enter old password:</Text>
                <TextInput
                    style={[styles.input, { borderColor: passwordBorder}]}
                    placeholder="Old password"
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <Text style={styles.label}>Enter new Password:</Text>
                <TextInput
                    style={[styles.input, { borderColor: newPasswordBorder}]}
                    placeholder="New password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <Text style={styles.label}>Change camera url:</Text>
                <TextInput
                    style={[styles.input, { borderColor: cameraUrlBorder}]}
                    value={cameraUrl}
                    //placeholder={user? user.cameraUrl : null}
                    onChangeText={setCameraUrl}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>

                <Text style={[styles.details, {color: colorDetails}]} >{detailMessage} </Text>

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
    settingsHeader: {
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
    submitButton: {
        alignItems: 'center',
        backgroundColor: '#2a7312', // Set your desired background color
        borderRadius: 50, // Set your desired border radius
        borderWidth: 2, // Set the border width
        borderColor: '#2a7312', // Set the border color
        paddingVertical: 5, // Set the vertical padding
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    submitText: {
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
        fontSize: 16,

    },
    approveDetails:{
        color: '#2a7312',
        textAlign: 'center',

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
