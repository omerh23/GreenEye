import React, {useRef, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const CameraView = () => {
    const camera = useRef(null);
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('front');
    const navigation = useNavigation();
    const [imageSource, setImageSource] =useState('');
    useEffect(() => {
        const initializeCamera = async () => {
            try {
                await requestPermission();
                if (hasPermission) {
                    console.log('Has permission');
                }
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
        const photo = await camera.current.takePhoto()
        setImageSource(`file://${photo.path}`);
        console.log("Photo:",photo);
        console.log("Photo path:",photo.path);

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
                {/*<Text style={styles.result}>{imageDetails}</Text>*/}
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


});

export default CameraView;
