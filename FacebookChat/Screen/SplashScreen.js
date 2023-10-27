import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { firebase } from "../config";
const SplashScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    const checkUserLoginStatus = async () => {
      // Đợi Firebase khởi tạo
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          setIsLogin(true)
          //Lấy thông tin người dùng
          firebase.firestore().collection('users').doc(uid).get()
            .then((doc) => {
              if (doc.exists) {
                const userData = doc.data();
                setUser(userData)
              } else {
                //Người dùng không có trong firestore
                alert("Có lỗi xảy ra!");
              }
            })
            .catch((error) => {
              console.log('Lỗi lấy thông tin người dùng: ' + error)
            })

          //User chưa đăng nhập
        } else {
          setIsLogin(false);
        }

        // Sau 2 giây, điều hướng đến màn hình chính hoặc màn hình khác
        setTimeout(() => {
          { isLogin ? navigation.navigate("Bottomnavigate", userData) : navigation.navigate("Login") }
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