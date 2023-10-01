
import { StyleSheet, Text, View,SafeAreaView,StatusBar,} from 'react-native';
import Navigeta_Screen from './Screen/Navigeta_Screen';
import React, {  useState, useEffect } from "react";
const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];
export default function App() {
  const [hidden, setHidden] = useState(false);
const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
const [statusBarTransition, setStatusBarTransition] = useState();
  TRANSITIONS[0]
  return (
    <SafeAreaView style={{ flex: 1 }}>
         <StatusBar
            animated={true}
            backgroundColor="black"
            hidden={hidden}
           />
        <Navigeta_Screen/>
        </SafeAreaView>
  );
}

