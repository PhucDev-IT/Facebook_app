import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { firebase } from "../config";
const SplashScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userID, setUserID] = useState();
  useEffect(() => {
    const checkUserLoginStatus = async () => {
      // Đợi Firebase khởi tạo
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          setIsLogin(true)
          setUserID(uid)
          //User chưa đăng nhập
        } else {
          setIsLogin(false);
        }

        // Sau 2 giây, điều hướng đến màn hình chính hoặc màn hình khác
        setTimeout(() => {
          { isLogin ? navigation.navigate("BottomTabNavigate",userID) : navigation.navigate("Login") }
        }, 2000); // 2000ms = 2 giây
      });
    };

    checkUserLoginStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/facebook.png')}></Image>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})