import React, {useRef, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import RNFS from "react-native-fs";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CameraView = () => {
    const camera = useRef(null);
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('front');
    const navigation = useNavigation();
    const [imageSource, setImageSource] =useState('');
    const [token, setToken] = useState(null);
    const [imageDetails, setImageDetails] = useState("");

    useEffect(() => {
        const initializeCamera = async () => {
            try {
                await requestPermission();
                if (hasPermission) {
                    console.log('Has permission');

                }
                const storedToken = await AsyncStorage.getItem('token');
                setToken(storedToken);
            } catch (error) {
                console.error('Error initializing camera:', error);
            }
        };
        initializeCamera();
    }, []);

    const handleClose = () => {
        navigation.goBack();
    };

    async function HandlePhoto() {

        try {
            setImageDetails('');

            const photo = await camera.current.takePhoto()

            setImageSource(`file://${photo.path}`);

            const base64Image = await RNFS.readFile(photo.path, 'base64');
            const response = await axios.post('http://10.0.2.2:8000/selfCamera', {base64Image,token});
            console.log('Image uploaded successfully:', response.data);
            setImageSource("");
            const { Result: className, confidence } = response.data;
            const detailString = `Result: ${className}, Confidence: ${confidence}%`;
            setImageDetails(detailString);
        }
        catch (e){
            console.error('Error fetching data:', e);
        }
    }

    function closeCapture() {
        setImageSource('');
    }

    return (
        <View style={styles.container}>


            <View style={styles.cameraContainer}>
                <Camera
                    ref={camera}
                   style={styles.cameraStyle}
                    device={device}
                    isActive={true}
                    photo={true}

                />
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <EntypoIcon name="cross" size={40} color="#2a7312" />
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.captureButton} onPress={HandlePhoto}>
                <EntypoIcon name="camera" size={40} color="#2a7312" />
                <Text style={styles.buttonText2}>Take screenshot </Text>
                <Text style={styles.result}>{imageDetails}</Text>
            </TouchableOpacity>
            {imageSource ? (
                <View style={styles.previewContainer}>
                    <Text style={styles.buttonText2}>Preview</Text>
                    <Image
                        source={{ uri: imageSource }}
                        style={[styles.previewImage, { transform: [{ rotate: '-90deg' }] }]}
                        resizeMode="cover"
                    />

                    <TouchableOpacity style={styles.captureButton} onPress={closeCapture}>
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
        alignItems: 'center',
    },
    cameraContainer: {
        width: SCREEN_WIDTH,
        height: 400,
        //overflow: 'hidden', // This ensures the camera feed does not spill outside the container

    },
    cameraStyle: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    previewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    previewImage: { width: 200, height: 200 },
    buttonText2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2a7312',
    },
    captureButton: {
        alignItems: 'center',
        position: 'relative',
        color: 'green',
        marginTop: 10,
    },
    result: {
        marginTop: 20,
        fontSize: 16,
        color: "black",
    }


});

export default CameraView;
