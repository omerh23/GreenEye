// userUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserData = async () => {
    try {
        const userDataString = await AsyncStorage.getItem('userData');
        return userDataString ? JSON.parse(userDataString) : null;
    } catch (error) {
        console.error('Error retrieving the user data', error);
        return null;
    }
};
