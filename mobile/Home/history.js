import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator} from "react-native";
import Sidebar from "../Sidebar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchUserData} from "../userUtils";

const History = () => {
    const [user, setUser] = useState(null);
    const [data,setData] = useState([]);

    // States for each button
    const [latestHistoryButton, setLatestHistoryButton] = useState(false);
    const [manualDetectionButton, setManualDetectionButton] = useState(false);
    const [historyDetectionButton, setHistoryDetectionButton] = useState(false);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData();
            setUser(userData);
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        };

        getUserData();
    }, );


    async function HandleLatestHistory(){
        try{
            setLatestHistoryButton(!latestHistoryButton);
            setManualDetectionButton(false);
            setHistoryDetectionButton(false);
            setIsLoading(true);
            const res = await axios.post('http://10.0.2.2:8000/latestHistory', {token});
            setData(res.data);
        }catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); // Stop loading regardless of success or error
        }


    }

    async function HandleManualDetection() {
        try {
            setManualDetectionButton(!manualDetectionButton);
            setLatestHistoryButton(false);
            setHistoryDetectionButton(false);
            setIsLoading(true);
            const res = await axios.post('http://10.0.2.2:8000/manualDetection', {token});
            setData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function HandleDetectionHistory(){
        try{
            setHistoryDetectionButton(!historyDetectionButton);
            setLatestHistoryButton(false);
            setManualDetectionButton(false);
            setIsLoading(true);
            const res = await axios.post('http://10.0.2.2:8000/detectionHistory', {token});
            setData(res.data);
        }catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <View style={styles.container}>
            <Text>Hi, {user ? user.username : 'NULL'}</Text>
            <Sidebar />
            <View style={styles.historyMenu}>
                <TouchableOpacity
                    style={[styles.historyButtons, latestHistoryButton && styles.buttonPressed]}
                    onPress={HandleLatestHistory}>
                    <Text style={styles.historyButton}>Latest History </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.historyButtons, manualDetectionButton && styles.buttonPressed]}
                    onPress={HandleManualDetection}>
                    <Text style={styles.historyButton}>Manual Detection</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.historyButtons, historyDetectionButton && styles.buttonPressed]}
                    onPress={HandleDetectionHistory}>
                    <Text style={styles.historyButton}>Detection History</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                    <View style={{top:100}}>
                        <ActivityIndicator size="large" color="black" />

                    </View>
            ) : (
                <View style={styles.historyDetails}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {(latestHistoryButton || manualDetectionButton || historyDetectionButton) &&
                            data.map((item, index) => (
                                <View key={index} style={styles.itemContainer}>
                                    <Text style={styles.historyText}> {item.description}</Text>
                                    <Text style={styles.historyText}>Uploaded: {item.uploaded}</Text>
                                    <Image
                                        source={{ uri: item.url }}
                                        style={{
                                            width: 250,
                                            height: 250,
                                            borderWidth: 2,
                                            borderColor: 'black',
                                            borderRadius: 10,
                                            marginBottom: 15,
                                            marginTop: 10,
                                            resizeMode: 'stretch',
                                        }}
                                    />
                                    {index < data.length - 1 && <View style={styles.separator} />}
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            )}



        </View> //mainView
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
    historyButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 5,

    },
    historyButton: {
        fontSize: 14,
        fontWeight: 'bold',

    },

    buttonPressed: {
        backgroundColor: '#2a7312', // Different color when pressed
    },

    historyDetails: {
        left: 15,
    },
    separator: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    itemContainer: {
        marginBottom: 15,
        marginTop: 10,
    },
    scrollViewContent: {
        paddingBottom: 200, // or any suitable value
    },

    historyText: {
      fontSize: 16,
      fontWeight: 'bold',

    },

});

export default History;
