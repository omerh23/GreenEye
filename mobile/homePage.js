import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import Sidebar from "./Sidebar";
import axios from "axios";
import HomeButtons from "./homeButtons";
import LiveCameraScreen from "./liveCamera";
// const Button = ({text, onPress}) => (
//     <TouchableOpacity style={styles.button} onPress={onPress}>
//       <Text style={styles.buttonText}>{text}</Text>
//     </TouchableOpacity>
// );


const HomePage = ({ route }) => {
  const [user, setUser] = useState(route.params?.user || null);
  const username = user ? user.username : 'NULL';
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect( () => {
    console.log('username: ',username)
  },[]);

  const navigation = useNavigation();


  const sendNotification = (buttonIndex) => {
    if (sidebarVisible){
      setSidebarVisible(false)
    }
    else{
      PushNotification.localNotification({
        channelId: "1",
        title: "Button Pressed",
        message: `Button ${buttonIndex} was pressed!`,
        playSound: true,
        soundName: 'default',
      }   );
    }
  };

  async function handleHistory() {

    navigation.navigate('History', {user});
  }


  return (
      <View style={styles.container}>
        <ImageBackground
            source={require('./images/2b.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        />

        <Image source={require('./images/gelogo.png')} style={styles.logo} />
        <View style={styles.userName}>
          <Text>Welcome, {username} !</Text>
          <Sidebar/>

        </View>

        <HomeButtons
                Live = {() => navigation.navigate('LiveCamera', { user })}
                History = {handleHistory}

        />


      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 80, // Adjust the size of your logo
    height: 80, // Adjust the size of your logo
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },

  userName: {
    position: 'absolute',
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    zIndex:1,
  },
  logoutButton: {
    position: 'absolute',
    top: 35, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  toggleButtonImage: {
    // styles for your image button
    width: 30,
    height: 30,
    resizeMode: 'contain', // Adjust the image content mode as needed
  },
  sidebar: {
    flex: 1,
    padding: 22,
    position: 'absolute',
    right: 0,
    top: 80,
    //bottom: 450,
    width: 105,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    alignItems: 'center',

  },

});

export default HomePage;
