import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Linking, Alert} from "react-native";
import Logo from "../Home/logo";
import Sidebar from "../Sidebar";
import { WebView } from 'react-native-webview';
import Modal from "react-native-modal";
import EntypoIcon from "react-native-vector-icons/Entypo";


const About = () =>{
    const [modalVisible, setModalVisible] = React.useState(false);
    const [uri, setUri] = useState('');
     function handleGuy() {
        setModalVisible(true);
        setUri('https://www.linkedin.com/in/guy-shabtay/');
    }

    function handleOmer() {
        setModalVisible(true);
        setUri('https://www.linkedin.com/in/omer-halfon-ab0b51235/');
    }



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
                <TouchableOpacity onPress={handleOmer}>
                    <Image source={require('../images/omer.jpg')} style={styles.image} />
                </TouchableOpacity>
                <Text>Omer Halfon</Text>
                <TouchableOpacity onPress={handleGuy}>
                    <Image source={require('../images/guy.jpg')} style={styles.image} />
                </TouchableOpacity>
                <Text>Guy Shabtay</Text>
            </View>

            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide"
            >
                <WebView source={{ uri: uri }} />
            </Modal>
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
