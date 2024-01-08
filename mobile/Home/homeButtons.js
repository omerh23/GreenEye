// Sidebar.js
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from "react";
import { Icon } from 'react-native-elements'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const HomeButtons = ({Live, History}) => {

    return (
        <View style={styles.buttonContainer1}>
            <TouchableOpacity style={styles.button1} onPress={Live}>
                <FontAwesomeIcon name="video-camera" size={35} color="black" />
                <Text style={styles.buttonTextt}>Live</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={History}>
                <FontAwesomeIcon name="file-text" size={35} color="black" />
                <Text style={styles.buttonTextt}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1}>
                {/*<EntypoIcon name="login" size={35} color="black" />*/}
                <Text style={styles.buttonTextt}>Button 3</Text>
            </TouchableOpacity>
        </View>
    );
};

 const styles = StyleSheet.create({
     buttonTextt: {
         fontSize: 16,
         fontWeight: 'bold',
         color: '#000',
     },
     button1: {
         marginVertical: 10,
         width: '30%', // Adjust the width based on the number of buttons per row
         height: 100,
         backgroundColor: 'rgba(255, 255, 255, 0.7)',
         borderRadius: 10,
         justifyContent: 'center',
         alignItems: 'center',
     },
     buttonContainer1: {
         flexDirection: 'row',
         justifyContent: 'space-around',
         alignItems: 'center',
         flexWrap: 'wrap', // Allow buttons to wrap to the next row
         marginTop: 10, // Add some margin to separate rows
         width: '80%',
     },
 });

export default HomeButtons;
