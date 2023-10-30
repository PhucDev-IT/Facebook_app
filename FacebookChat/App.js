import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Navigate_Screen from './Screen/Navigate_Screen';
import React, { useState, useEffect } from "react";
import { firebase } from './config'
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [initializeApp, setInitializeApp] = useState(true);
  const [user, setUser] = useState(null);
  const [hidden, setHidden] = useState(false);
  
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializeApp) setInitializeApp(false);
  }

  useEffect(() => {
    const subcriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subcriber;
  }, []);

  if (initializeApp) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="black"
        hidden={hidden}
      />
      {user ? <Navigate_Screen screen={"BottomTabNavigate"} /> : <Navigate_Screen screen={"Login"} />}
    </SafeAreaView>
  )

}
