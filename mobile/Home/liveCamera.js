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
import Logo from "./logo";


const LiveCameraScreen = () => {
    const vlcPlayerRef = useRef(null);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [imageDetails, setImageDetails] = useState("");
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [cameraUrl, setCameraUrl] = useState('')

    const viewShot = useRef(null);
    const [uri, setUri] = useState("");

    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData();
            setUser(userData);
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
            if (user){
                setCameraUrl(user.cameraUrl);
                console.log("Camera url:", user.cameraUrl);
            }

        };
        getUserData();
    }, []);

    const captureScreen = () => {
        viewShot.current.capture().then(async (uri) => {
            setUri(uri);
            setImageDetails('');
            //const token = await AsyncStorage.getItem('token');
            // Convert image to base64
            RNFS.readFile(uri, 'base64')
                .then(base64String => {
                    // Send the base64 string to the server
                     axios.post('http://10.0.2.2:8000/manualCapture', {
                        imageUri: `data:image/png;base64,${base64String}`,
                        token:token
                    })
                        .then(response => {
                            console.log('Image uploaded successfully:', response.data);
                            setUri("");
                            const { Result: className, confidence } = response.data;
                            const detailString = `Result: ${className}, Confidence: ${confidence}%`;
                            setImageDetails(detailString);
                        })
                        .catch(error => {
                            console.error('Error uploading image:', error);
                        });
                })
                .catch(error => {
                    console.error('Error converting image to base64:', error);
                });
        });
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
    }

    return (
        <View style={styles.container}>
            {/*{console.log(user.cameraUrl)}*/}
            <ViewShot ref={viewShot} style={styles.viewShot}>
                <VLCPlayer
                    ref={vlcPlayerRef}
                    style={styles.video}
                    //source={{ uri: 'rtsp://admin:GreenEye7070@greeneyeservices.ddns.net:663/h264Preview_01_sub' }}
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
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.result} >Loading please wait..</Text>
                </View>
            )}
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <EntypoIcon name="cross" size={40} color="#2a7312" />
                </TouchableOpacity>
            {!isLoading && (
                <TouchableOpacity style={styles.captureButton} onPress={captureScreen}>
                    <EntypoIcon name="camera" size={40} color="#2a7312" />
                    <Text style={styles.buttonText2}>Take screenshot </Text>
                    <Text style={styles.result}>{imageDetails}</Text>
                </TouchableOpacity>
            )}
            {uri ? (
                <View style={styles.previewContainer}>
                    <Text>Preview</Text>
                    <Image
                        source={{ uri: uri }}
                        style={styles.previewImage}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.captureButton} onPress={closeCapture}>
                        <EntypoIcon name="cross" size={40} color="white" />
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
        backgroundColor: 'black',
    },
    video: {
        flex: 1,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    },

    snapshotContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    snapshotImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    buttonText2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2a7312',
    },
    previewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    viewShot: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
    },
    previewImage: { width: 200, height: 200, backgroundColor: "#fff" },
    result: {
        marginTop: 30,
        fontSize: 20,
        color: "white",
    }
});

export default LiveCameraScreen;
