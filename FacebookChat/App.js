import { StyleSheet, Text, View, SafeAreaView, StatusBar, Alert } from 'react-native';
import Navigate_Screen from './Screen/Navigate_Screen';
import React, { useState, useEffect } from "react";
import { firebase } from './config'
import { AppState } from 'react-native';
import { UserProvider } from './UserContext';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [initializeApp, setInitializeApp] = useState(true);
  const [user, setUser] = useState(null);


  //--------------THIẾT LẬP CẤP QUYỀN CHO ANDROID VÀ IOS -------------
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     //Trả về token của thiết bị
  //     messaging().getToken().then(token => {
  //       console.log(token);
  //     })
  //   } else {
  //     console.log('Lỗi token: ', authStatus)
  //   }

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });

  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, [])

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializeApp) setInitializeApp(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const subcriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subcriber;
    }
    fetchData();
  }, []);

  if (initializeApp) return null;


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle="#ffffff"
      />
      <UserProvider>
        {user ? <Navigate_Screen screen={"BottomTabNavigate"} /> : <Navigate_Screen screen={"Login"} />}
      </UserProvider>

    </SafeAreaView>
  )

}
