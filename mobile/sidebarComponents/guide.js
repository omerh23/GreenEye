import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import Logo from '../Home/logo';
import Sidebar from '../Sidebar';

const Guide = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Logo />
            <Sidebar />
            <ScrollView style={styles.scrollView}>
                <View style={styles.form}>
                    <Text style={styles.aboutHeader}>App Guide</Text>
                    <Text style={styles.text}>
                        <Text style={styles.sectionHeader}>1. Setup Camera URL</Text>{'\n'}
                        Click on the toolbar, then on settings, and enter the camera URL you received from us.{'\n'}
                        {'\n'}
                        <Text style={styles.sectionHeader}>2. Watch Live Cameras</Text>{'\n'}
                        After setting up the URL, you can watch live footage of the greenhouse. To enter the cameras, go to the home screen and click on the LIVE button.{'\n'}
                        {'\n'}
                        <Text style={styles.sectionHeader}>3. Manual Photo and Analysis</Text>{'\n'}
                        You can take a manual photo and receive an analysis using our system. Use the Camera button on the home page to take a picture of the plant and receive an analysis.{'\n'}
                        {'\n'}
                        <Text style={styles.sectionHeader}>4. View Analysis History</Text>{'\n'}
                        In the History section on the home page, you can view all the analyses of the photos taken.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollView: {
        marginHorizontal: 20,
        marginTop: 100,
    },
    form: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    aboutHeader: {
        fontSize: 35,
        textAlign: 'center',
        marginBottom: 15,
        color: '#2a7312',
    },
    sectionHeader: {
        fontSize: 25,
        color: '#2a7312',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'justify',
    },
});

export default Guide;
