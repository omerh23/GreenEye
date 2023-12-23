// Sidebar.js
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from "react";
import { Icon } from 'react-native-elements'
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Sidebar = ({ isVisible, onClose,Logout }) => {
    if (!isVisible) return null;

    return (
        <View style={styles.container}>
            {/*<TouchableOpacity style={styles.closeButton} onPress={onClose}>*/}
            {/*    <EntypoIcon name="cross" size={30} color="black" />*/}
            {/*</TouchableOpacity>*/}

        <View style={styles.sidebarbuttons}>
            <TouchableOpacity style={styles.sidebarbuttons} onPress={Logout}>
                <EntypoIcon name="login" size={35} color="black" />
                <Text>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarbuttons} onPress={Logout}>
                <EntypoIcon name="book" size={35} color="black" />
                <Text>Guide</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarbuttons} onPress={Logout}>
                <EntypoIcon name="cog" size={35} color="black" />
                <Text>Setting</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarbuttons} onPress={Logout}>
                <EntypoIcon name="layers" size={35} color="black" />
                <Text>T&P</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarbuttons} onPress={Logout}>
                <EntypoIcon name="megaphone" size={35} color="black" />
                <Text>Feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarbuttons} onPress={Logout}>
                <EntypoIcon name="slideshare" size={35} color="black" />
                <Text>About us</Text>
            </TouchableOpacity>

        </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
        position: 'absolute',
        right: 0,
        top: 80,
        //bottom: 450,
        width: 105,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        alignItems: 'center',

    },
    closeButton: {
        bottom: 0,
    },

    sidebarbuttons: {
        marginBottom: 20,
        alignItems: 'center',

    }
});

export default Sidebar;
