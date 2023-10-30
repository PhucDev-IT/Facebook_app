import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './Authentication/Login.js';
import Infor_SignUp from './Authentication/Infor_SignUp.js';
import InputAccount_SignUp from './Authentication/InputAccount_SignUp.js'
import SignUpCompleted from './Authentication/SignUpCompleted.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigate from './BottomTabNavigate.js';
import TestScreen from './TestScreen.js';
import SearchFriends from '../Screen/Banbe/SearchFriends.js';
import SplashScreen from './SplashScreen.js';
import MyFriendScreen from './Banbe/MyFriendScreen.js';
import ChatDetails from './Chat/ChatDetails.js';
const Navigeta_Screen = (props) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer style={{
      flex: 1
    }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
        />
        <Stack.Screen
          initialParams={{ data: props.params }}
          name='SearchFriends'
          component={SearchFriends}
        />

        <Stack.Screen
          initialParams={{ data: props.params }}
          name='MyFriendScreen'
          component={MyFriendScreen}
        />

        <Stack.Screen
          initialParams={{ data: props.params }}
          name='ChatDetails'
          component={ChatDetails}
        />

        <Stack.Screen
          name='Login'
          component={Login}
        />
        <Stack.Screen
          name='Infor_SignUp'
          component={Infor_SignUp}
        />
        <Stack.Screen
          name='InputAccount_SignUp'
          component={InputAccount_SignUp}
        />

        <Stack.Screen
          name='SignUpCompleted'
          component={SignUpCompleted}
        />

        <Stack.Screen
          name='TestScreen'
          component={TestScreen}
        />
        <Stack.Screen
          name='BottomTabNavigate'
          component={BottomTabNavigate}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigeta_Screen;
const styles = StyleSheet.create({})