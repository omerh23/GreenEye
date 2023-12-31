import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import Sidebar from "./Sidebar";

const Histroy = ({ route }) =>{
    const [user, setUser] = useState(route.params?.user || null);
    const username = user ? user.username : 'NULL';
    //console.log(user);
    return(
        <View style={styles.container}>
            <Text>Hi, {username}</Text>
            <Sidebar/>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       justifyContent: 'center',
        //alignItems: 'center',
    },

});

export default Histroy;
