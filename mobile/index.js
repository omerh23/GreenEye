import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async remoteMessage => {
    PushNotification.localNotification({
        channelId: "1",
        title: "Identify alert",
        message: remoteMessage.notification.body,
        playSound: true,
        soundName: 'default',
        priority: 'high',
        popInitialNotification: true,

    });
});
AppRegistry.registerComponent(appName, () => App);

PushNotification.createChannel(
    {
        channelId: "1", // same as the one used in your localNotification
        channelName: "My channel", // channel name
        channelDescription: "A channel to categorize your notifications", // channel description
        soundName: "default", // make sure this sound is present in your app bundle
        importance: 4, // (optional) set importance for notifications
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);


PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification here
    },
    // Android only: (optional) Called when Registered Action is pressed and invokeApp is false
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
        // process the action
    },
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will be requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});
