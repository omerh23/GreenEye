import React from 'react';
import {Text, View, StyleSheet,Image} from "react-native";
import Logo from "../Home/logo";
import Sidebar from "../Sidebar";

const About = () =>{

    return(
        <View style={styles.container}>
            <Logo/>
            <Sidebar/>
            <View style={styles.form}>
                <Text style={styles.aboutHeader}>About us</Text>
                <Text style={styles.text}>
                    Hello, we are Omer Halfon and Guy Shabtay, the creators of this app.{'\n'}
                    {'\n'}
                    We believe in the power of collaboration, continuous learning, and staying at the forefront of industry trends. Our values include integrity, excellence, and a commitment to customer satisfaction.{'\n'}
                </Text>
                <Image source={require('../images/omer.jpg')} style={styles.image}/>
                <Text>Omer Halfon</Text>
                <Image source={require('../images/guy.jpg')} style={styles.image}/>
                <Text>Guy Shabtay</Text>
            </View>
        </View>
    );
};

export default About;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    form: {
        // backgroundColor: 'rgba(255, 255, 255, 0.7)',
        // padding: 25,
        // shadowColor: 'black',
        // shadowOffset: {
        //     width: 1,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
        // borderRadius: 10,
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
    }

});
