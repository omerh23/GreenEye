import {Image, TouchableOpacity, View,StyleSheet} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";


const Logo = () => {
    const navigation = useNavigation();

    function handleLogo() {
        navigation.navigate('Home');
    }

    return(
        <View style={styles.logo}>
            <TouchableOpacity onPress={handleLogo}>
                <Image source={require('../images/gelogo.png')} style={styles.logo} />
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    logo: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 80, // Adjust the size of your logo
        height: 80, // Adjust the size of your logo
    },

});

export default Logo
