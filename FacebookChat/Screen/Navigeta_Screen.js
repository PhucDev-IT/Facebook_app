 import { StyleSheet, Text, View } from 'react-native'
 import React from 'react'
import Login from './Authentication/Login.js';
import DangKy from './Authentication/DangKy.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Navigeta_Screen=()=>{
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
            name='Login'
            component={Login}
            />
          <Stack.Screen
            name='DangKy'
            component={DangKy}
          />
        </Stack.Navigator>
      </NavigationContainer>
   )
 }
export default Navigeta_Screen;
 const styles = StyleSheet.create({})