import React from 'react';
import {Text, View, StyleSheet,Image} from "react-native";
import Logo from "../Home/logo";
import Sidebar from "../Sidebar";

const Feedback = () =>{

    return(
        <View style={styles.container}>
            <Logo/>
            <Sidebar/>
            <View style={styles.form}>
                <Text style={styles.aboutHeader}>Feedback</Text>
                <Text style={styles.text}>
                    For leaving feedback you can email us at:{'\n'}
                    <Text style={styles.email}>GreenEye@gmail.com</Text>
                </Text>

            </View>
        </View>
    );
};

export default Feedback;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    form: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:40,

    },
    aboutHeader: {
        fontSize: 35,
        textAlign: 'center',
        marginBottom: 15,
        color: '#2a7312',
    },

    image:{
        width: 150,
        height:150,
        borderRadius: 75,
        marginTop:20,

    },
    text:{
        fontSize:20,
    },
    email: {
        fontSize: 20,
        color: '#2a7312',
        textDecorationLine: 'underline',
    },

});
