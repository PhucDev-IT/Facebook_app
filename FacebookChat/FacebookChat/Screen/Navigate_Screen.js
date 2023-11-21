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
import EditProfile from './Infor/EditProfile.js';
import Add_articles from './Home/Add_articles.js'
import PreviewStory from './Story/PreviewStory.js';
import DisplayStories from './Story/DisplayStories.js';
import DetailsStory from './Story/DetailsStory.js';
import SeeDetail from '../Screen/Home/SeeDeTail.js'
const Navigeta_Screen = (props) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer style={{
      flex: 1
    }}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >

        <Stack.Screen
          name='TestScreen'
          component={TestScreen}
        />

        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
        />
        <Stack.Screen
          name='SearchFriends'
          component={SearchFriends}
        />

        <Stack.Screen
          name='MyFriendScreen'
          component={MyFriendScreen}
        />

        <Stack.Screen
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
          name='PreviewStory'
          component={PreviewStory}
        />


        <Stack.Screen
          name='BottomTabNavigate'
          component={BottomTabNavigate}
        />
        <Stack.Screen
          name='EditProfile'
          component={EditProfile}
        />
        <Stack.Screen
          name='Add_articles'
          component={Add_articles}
        />

        <Stack.Screen
          name='DisplayStories'
          component={DisplayStories}
        />
        <Stack.Screen
          name='DetailsStory'
          component={DetailsStory}
        />
         <Stack.Screen
          name='SeeDetail'
          component={SeeDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigeta_Screen;
const styles = StyleSheet.create({})