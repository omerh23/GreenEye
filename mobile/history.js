import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image,ScrollView  } from "react-native";
import Sidebar from "./Sidebar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const History = ({ route }) => {
    const [user, setUser] = useState(route.params?.user || null);
    const username = user ? user.username : 'NULL';
    const [data,setData] = useState([]);

    // States for each button
    const [latestHistoryButton, setLatestHistoryButton] = useState(false);
    const [manualDetectionButton, setManualDetectionButton] = useState(false);
    const [historyDetectionButton, setHistoryDetectionButton] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        (async () => {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        })();
    }, []);

    async function HandleLatestHistory(){
        setLatestHistoryButton(!latestHistoryButton);
        setManualDetectionButton(false);
        setHistoryDetectionButton(false);
        //const res = await axios.post('http://10.0.2.2:8000/latestHistory', {token});
        const res = await axios.post('http://10.0.2.2:8000/latestHistory');
        setData(res.data);
        //console.log(res.data);
    }

    function HandleManualDetection(){
        setManualDetectionButton(!manualDetectionButton);
        setLatestHistoryButton(false);
        setHistoryDetectionButton(false);
    }

    function HandleHistoryDetection(){
        setManualDetectionButton(!manualDetectionButton);
        setLatestHistoryButton(false);
        setHistoryDetectionButton(false);
    }


    return (
        <View style={styles.container}>
            <Text>Hi, {username}</Text>
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
                    onPress={() => {setHistoryDetectionButton(!historyDetectionButton)
                        setLatestHistoryButton(false);
                        setManualDetectionButton(false);

                    }}>
                    <Text style={styles.historyButton}>Detection History</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.historyDetails}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {latestHistoryButton &&
                        data.map((item, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <Text style={styles.historyText}>Description: {item.description}</Text>
                                <Text style={styles.historyText}>Uploaded: {item.uploaded}</Text>
                                <Image
                                    source={require('./images/2b.jpg')}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        borderWidth: 2,
                                        borderColor: 'black',
                                        borderRadius: 10,
                                        marginBottom: 15,
                                        marginTop: 10,
                                    }}
                                    onError={(error) =>
                                        console.error(`Error loading image: ${error.nativeEvent.error}`)
                                    }
                                />
                                {index < data.length - 1 && <View style={styles.separator} />}
                            </View>
                        ))
                    }
                </ScrollView>
            </View>


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
