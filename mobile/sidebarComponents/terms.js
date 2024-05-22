import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar, View,
} from 'react-native';
import Logo from "../Home/logo";
import Sidebar from "../Sidebar";

const Terms = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Logo />
            <Sidebar />
            <ScrollView style={styles.scrollView}>
                <View style={styles.form}>
                    <Text style={styles.aboutHeader}>Terms and Policy</Text>
                    <Text style={styles.sectionHeader}>Introduction</Text>
                    <Text style={styles.text}>
                        Welcome to our application. By accessing or using our app, you agree to be bound by these terms and conditions.
                    </Text>

                    <Text style={styles.sectionHeader}>User Responsibilities</Text>
                    <Text style={styles.text}>
                        Users are responsible for ensuring that their use of the app complies with all applicable laws and regulations. You agree not to misuse the app in any way that could harm the app or other users.
                    </Text>

                    <Text style={styles.sectionHeader}>Privacy Policy</Text>
                    <Text style={styles.text}>
                        We value your privacy and are committed to protecting your personal information. Our privacy policy explains how we collect, use, and disclose information about you.
                    </Text>

                    <Text style={styles.sectionHeader}>Data Collection</Text>
                    <Text style={styles.text}>
                        We may collect personal information such as your name, email address, and usage data to improve our services. We do not share your personal information with third parties without your consent.
                    </Text>

                    <Text style={styles.sectionHeader}>Cookies</Text>
                    <Text style={styles.text}>
                        Our app uses cookies to enhance user experience. Cookies help us understand how you use the app and enable us to personalize your experience.
                    </Text>

                    <Text style={styles.sectionHeader}>Changes to Terms</Text>
                    <Text style={styles.text}>
                        We reserve the right to modify these terms at any time. Any changes will be posted on this page, and it is your responsibility to review these terms periodically.
                    </Text>

                    <Text style={styles.sectionHeader}>Contact Us</Text>
                    <Text style={styles.text}>
                        If you have any questions or concerns about these terms or our privacy policy, please contact us at:
                        {'\n'}
                        <Text style={styles.email}>GreenEyeSupport@gmail.com</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
    },
    scrollView: {
        marginHorizontal: 20,
        marginTop:100,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 20,
        marginBottom: 10,
        color: '#2a7312',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'justify',
    },
    email: {
        fontSize: 16,
        color: '#2a7312',
        textDecorationLine: 'underline',
    },
});

export default Terms;
