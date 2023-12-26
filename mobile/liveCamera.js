import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { useNavigation } from "@react-navigation/native";
import EntypoIcon from "react-native-vector-icons/Entypo";

const LiveCameraScreen = () => {
    const vlcPlayerRef = useRef(null);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [snapshotUri, setSnapshotUri] = useState(null);

    const handleClose = () => {
        navigation.goBack();
    };

    const handleOnPlaying = () => {
        setIsLoading(false);
    };

    const handleOnPaused = () => {
        setIsLoading(true);
    };

    const handleCaptureSnapshot = async () => {
        try {
            const uri = await vlcPlayerRef.current.snapshot();
            setSnapshotUri(uri);
        } catch (error) {
            console.error('Error capturing snapshot:', error);
        }
    };

    return (
        <View style={styles.container}>
            <VLCPlayer
                ref={vlcPlayerRef}
                style={styles.video}
                source={{ uri: 'rtsp://admin:GreenEye7070@greeneyeservices.ddns.net:663/h264Preview_01_sub' }}
                autoplay={true}
                initType={2} // Use 2 for RTSP streams
                hwDecoderEnabled={true}
                resizeMode="contain"
                onPlaying={handleOnPlaying}
                onPaused={handleOnPaused}
            />
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )}
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <EntypoIcon name="cross" size={40} color="green" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.captureButton} onPress={handleCaptureSnapshot}>
                    <EntypoIcon name="camera" size={40} color="green" />
                </TouchableOpacity>
            {snapshotUri && (
                <View style={styles.snapshotContainer}>
                    <Image source={{ uri: snapshotUri }} style={styles.snapshotImage} />
                </View>
            )}
        </View>
    );
};

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
});

export default LiveCameraScreen;
