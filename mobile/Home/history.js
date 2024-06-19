import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator} from "react-native";
import Sidebar from "../Sidebar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchUserData} from "../userUtils";
import {useNavigation} from "@react-navigation/native";
import Logo from "./logo";

const History = () => {
    const [user, setUser] = useState(null);
    const [data,setData] = useState([]);

    // States for each button
    const [allHistoryButton, setAllHistoryButton] = useState(false);
    const [manualDetectionButton, setManualDetectionButton] = useState(false);
    const [historyAutomaticDetectionButton, setHistoryAutomaticDetectionButton] = useState(false);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData();
            setUser(userData);
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        };

        getUserData();

    }, []);

    useEffect(() => {
        if (token) {
            HandleLatestHistory();
        }
    }, [token]);

    //ask from server all images in database
    async function HandleLatestHistory(){
        try{
            setAllHistoryButton(!allHistoryButton);
            setManualDetectionButton(false);
            setHistoryAutomaticDetectionButton(false);
            setIsLoading(true);

            const res = await axios.post('http://10.0.2.2:8000/latestHistory', {token});
            //const res = await axios.post('https://backend-greeneye.onrender.com/latestHistory', {token});
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
            setAllHistoryButton(false);
            setHistoryAutomaticDetectionButton(false);
            setIsLoading(true);
            //const res = await axios.post('https://backend-greeneye.onrender.com/manualDetectionHistory', {token});
            const res = await axios.post('http://10.0.2.2:8000/manualDetectionHistory', {token});

            setData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function HandleAutomaticDetectionHistory(){
        try{
            setHistoryAutomaticDetectionButton(!historyAutomaticDetectionButton);
            setAllHistoryButton(false);
            setManualDetectionButton(false);
            setIsLoading(true);
            // const res = await axios.post('https://backend-greeneye.onrender.com/automaticDetectionHistory', {token});
            const res = await axios.post('http://10.0.2.2:8000/automaticDetectionHistory', {token});

            setData(res.data);
        }catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }




    return (
        <View style={styles.container}>
            {/*<Text>  Hi, {user ? user.username : 'NULL'}</Text>*/}
            <Logo/>

            <Sidebar />
            <View style={styles.historyMenu}>
                <TouchableOpacity
                    style={[styles.historyButtons, allHistoryButton && styles.buttonPressed]}
                    onPress={HandleLatestHistory}>
                    <Text style={styles.historyButton}>All History </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.historyButtons, manualDetectionButton && styles.buttonPressed]}
                    onPress={HandleManualDetection}>
                    <Text style={styles.historyButton}>Manual Detection </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.historyButtons, historyAutomaticDetectionButton && styles.buttonPressed]}
                    onPress={HandleAutomaticDetectionHistory}>
                    <Text style={styles.historyButton}>Auto Detection</Text>
                </TouchableOpacity>
            </View>


            {isLoading ? (
                    <View style={{top:100}}>
                        <ActivityIndicator size="large" color="black" />

                    </View>
            ) : (
                <View style={styles.historyDetails}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {(allHistoryButton || manualDetectionButton || historyAutomaticDetectionButton) && (
                            <>
                                {allHistoryButton && (
                                    <Text style={styles.buttonsInfo}>
                                        These images are the last 30 detections that have been found in the plants with more than 50 percent accuracy.
                                    </Text>
                                )}
                                {manualDetectionButton && (
                                    <Text style={styles.buttonsInfo}>
                                        These images are the manual detections from broadcast camera and smartphone camera
                                    </Text>
                                )}
                                {historyAutomaticDetectionButton && (
                                    <Text style={styles.buttonsInfo}>
                                        These images are the automatic detections from broadcast camera
                                    </Text>
                                )}
                                {data.map((item, index) => (
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
                                ))}
                            </>
                        )}
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
        left: 10,
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
    logo: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 80, // Adjust the size of your logo
        height: 80, // Adjust the size of your logo
    },
    buttonsInfo: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#98ff98',
        paddingHorizontal: 5, // Add padding to control the background width
        paddingVertical: 2,   // Add padding to control the background height
        alignSelf: 'flex-start', // Ensure the background doesn't extend full width
        borderRadius: 5,
    },


});

export default History;
