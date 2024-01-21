import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Sign/login';
import HomePage from "./Home/homePage";
import Register from "./Sign/register";
import LiveCameraScreen from "./Home/liveCamera";
import History from "./Home/history";
import Settings from "./sidebarComponents/settings";
import CameraView from "./Home/cameraView";

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="LiveCamera" component={LiveCameraScreen} />
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Camera" component={CameraView} />

            </Stack.Navigator>
        </NavigationContainer>
    );

};

export default App;
