import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ActivityIndicator, Image, Text, Dimensions} from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { useNavigation } from "@react-navigation/native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from 'react-native-fs';
import ViewShot from "react-native-view-shot";
import {fetchUserData} from "../userUtils";
import axiosInstance from '../axiosConfig';


const LiveCameraScreen = () => {
    const vlcPlayerRef = useRef(null);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [imageDetails, setImageDetails] = useState("");
    const [token, setToken] = useState(null);
    const [cameraUrl, setCameraUrl] = useState('')
    const [imageSource, setImageSource] = useState('');
    const viewShot = useRef(null);
    const [uri, setUri] = useState("");
    const [detailMessage,setDetailMessage] = useState('Loading please wait..');
    const cameraRef = useRef(null);

    
    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await fetchUserData();
                const storedToken = await AsyncStorage.getItem('token');
                setToken(storedToken);
                if (userData) {
                    setCameraUrl(userData.cameraUrl);
                    //console.log("Camera url:", userData.cameraUrl);
                }
            } catch (error) {
                console.error('Error fetching and setting user data', error);
            }
        };

        getUserData();
    }, []);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        let timeout;

        const handleTimeout = async () => {
            timeout = setTimeout(async () => {
                if (isLoading) {
                    setDetailMessage('Timeout: Bad internet connection');
                    await sleep(3000);
                    navigation.navigate('Home');
                }
            }, 60000);
        };

        if (isLoading) {
            handleTimeout();
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isLoading, navigation]);


    //user capture image from broadcast camera
    async function captureScreen(){
        try {
            setImageDetails('');
            setImageSource('');
            setImageDetails('Waiting for results..');
            const uri = await viewShot.current.capture();
            await setUri(uri);
            const token = await AsyncStorage.getItem('token');
            const base64Image = await RNFS.readFile(uri, 'base64');
            const broadcastCamera = true;
            const response = await axiosInstance.post('/selfCamera', { base64Image, token,broadcastCamera });

            console.log('Image uploaded successfully from broadcast camera');
            const { label, confidence, image } = response.data;
            const detailString = `Result: ${label}, Confidence: ${confidence}%`;
            setImageDetails(detailString);

            if (image) {
                setImageSource(`data:image/jpeg;base64,${image}`);
            }

            console.log(detailString);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    
    };
    
    const handleClose = () => {
        navigation.goBack();
    };

    const handleOnPlaying = () => {
        setIsLoading(false);
    };

    const handleOnPaused = () => {
        setIsLoading(true);
    };


    function closeCapture() {
        setUri("");
        setImageSource('');
        setImageDetails("");
    }

    return (
        <View style={styles.container}>
            {/*{console.log(user.cameraUrl)}*/}
            <ViewShot ref={viewShot} style={styles.viewShot}>
                <VLCPlayer
                    ref={vlcPlayerRef}
                    style={styles.video}
                    source={{ uri: cameraUrl }}
                    autoplay={true}
                    initType={2} // Use 2 for RTSP streams
                    hwDecoderEnabled={true}
                    resizeMode="contain"
                    onPlaying={handleOnPlaying}
                    onPaused={handleOnPaused}
                />
            </ViewShot>

            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="black" />
                    <Text style={styles.result} >{detailMessage}</Text>
                </View>
            )}
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <EntypoIcon name="arrow-long-right" size={40} color="#2a7312" />
                    <Text style={styles.buttonText2}>Home</Text>
                </TouchableOpacity>
            {!isLoading && (
                <TouchableOpacity style={styles.captureButton} onPress={captureScreen}>
                    <EntypoIcon name="camera" size={40} color="#2a7312" />
                    <Text style={styles.buttonText2}>Take Photo </Text>
                    <Text style={styles.result}>{imageDetails}</Text>
                </TouchableOpacity>
            )}
            {uri ? (
                <View style={styles.previewContainer}>
                    <Text style={styles.buttonText2}>Preview</Text>
                    <Image
                        source={imageSource ? { uri: imageSource } : { uri: uri }}
                        style={styles.previewImage}
                        resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.CloseCaptureButton} onPress={closeCapture}>
                        <EntypoIcon name="cross" size={40} color="#2a7312" />
                    </TouchableOpacity>
                </View>
            ) : null}

        </View>
    );
};
const SCREEN_WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    video: {
        flex: 1,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    captureButton: {
        alignItems: 'center',
        position: 'relative',
        color: 'green',
        marginTop:10,
    },
    buttonText2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2a7312',
    },
    previewContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop:10,
    },
    viewShot: {
        width: SCREEN_WIDTH,
        height: 280,

    },
    previewImage: {
        width: 300,
        height: 250,
        borderRadius: 10,
        },
    CloseCaptureButton: {
            alignItems: 'center',
            position: 'absolute',
            top: 20,
    },
    result: {
        marginTop: 30,
        fontSize: 20,
        color: "green",


    }
});

export default LiveCameraScreen;
