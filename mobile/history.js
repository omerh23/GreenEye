import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Sidebar from "./Sidebar";

const Histroy = ({ route }) => {
    const [user, setUser] = useState(route.params?.user || null);
    const username = user ? user.username : 'NULL';

    // States for each button
    const [buttonPressed1, setButtonPressed1] = useState(false);
    const [buttonPressed2, setButtonPressed2] = useState(false);
    const [buttonPressed3, setButtonPressed3] = useState(false);

    return (
        <View style={styles.container}>
            <Text>Hi, {username}</Text>
            <Sidebar />
            <View style={styles.historyMenu}>
                <TouchableOpacity
                    style={[styles.historyButton, buttonPressed1 && styles.buttonPressed]}
                    onPress={() => setButtonPressed1(!buttonPressed1)}>
                    <Text >Latest History 1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.historyButton, buttonPressed2 && styles.buttonPressed]}
                    onPress={() => setButtonPressed2(!buttonPressed2)}>
                    <Text>Latest History 2</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.historyButton, buttonPressed3 && styles.buttonPressed]}
                    onPress={() => setButtonPressed3(!buttonPressed3)}>
                    <Text>Latest History 3</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    historyMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 100,
    },
    historyButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 5,
        margin: 5,
        fontWeight: 'bold',

    },
    buttonPressed: {
        backgroundColor: '#2a7312', // Different color when pressed
    },
});

export default Histroy;
