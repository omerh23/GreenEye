import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './login';
import HomePage from "./homePage";
import Register from "./register";
import LiveCameraScreen from "./liveCamera";

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="LiveCamera" component={LiveCameraScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

};

export default App;
