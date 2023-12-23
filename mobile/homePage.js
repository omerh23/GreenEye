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
const Button = ({text, onPress}) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);


const HomePage = ({ route }) => {
  const [user, setUser] = useState(route.params?.user || null);
  const username = user ? user.username : 'NULL';
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect( () => {
    console.log('username: ',username)
  },[]);

  const navigation = useNavigation();
  const buttonsData = [
    'Button ',
    'Button ',
    'Button ',
    'Button ',
    'Button ',
    'Button ',
  ];

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

  const renderButtons = () => {
    return buttonsData.map((buttonText, index) => (
        <Button
            key={index}
            text={`${buttonText} ${index + 1}`}
            onPress={() => sendNotification(index + 1)}
        />
    ));
  };

  function handleLogout() {
    setUser(null);
    navigation.navigate('Login');
  }
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

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
      </View>

      <Sidebar
          isVisible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
          Logout={handleLogout}

      />
      <TouchableOpacity
          style={styles.logoutButton}

          onPress={toggleSidebar}
      >
        <Image
            source={require('./images/sidebarIcon.png')}
            style={styles.toggleButtonImage}
        />
      </TouchableOpacity>


      <View style={styles.buttonContainer}>{renderButtons()}</View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow buttons to wrap to the next row
    marginTop: 10, // Add some margin to separate rows
    width: '80%',
  },
  button: {
    marginVertical: 10,
    width: '30%', // Adjust the width based on the number of buttons per row
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  userName: {
    position: 'absolute',
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
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
});

export default HomePage;
