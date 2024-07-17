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
                <Image source={require('../images/nlogo.png')} style={styles.logo} />
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    logo: {
        position: 'absolute',
        top: 5,
        left: 5,
        width: 90, // Adjust the size of your logo
        height: 90, // Adjust the size of your logo
    },

});

export default Logo
