// Sidebar.js
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = ({ isVisible, onClose,Logout }) => {
    if (!isVisible) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={Logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
            {/* Add more menu items as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 250,
        zIndex: 1000,
    },
    closeButton: {
        marginBottom: 20,
    },
    menuItem: {
        marginBottom: 15,
    },
});

export default Sidebar;
