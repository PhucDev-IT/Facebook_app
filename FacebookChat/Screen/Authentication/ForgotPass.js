import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,Alert
} from "react-native";

import { React, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../config.js";
const ForgotPass = ({ navigation }) => {
    const [tokenId, setid] = useState("")
    const [email, setEmail] = useState('');
    const [randomPassword, setRandomPassword] = useState('');
  
    const generateRandomPassword = () => {
        const min = 100000;
        const max = 999999;
        const randomPassword = Math.floor(min + Math.random() * (max - min + 1));
        return randomPassword.toString();
      };
    
    const handlePassForgot = async () => {
        //    console.log(email)
        // try {
        //   const userDocRef = firebase.firestore().collection('users').where('email', '==', email);
        //   const snapshot = await userDocRef.get();
    
        //   if (snapshot.empty) {
          
        //     alert('Thông báo', 'Email không tồn tại');
        //   } else {
        //     const randomPassword = generateRandomPassword();
        //       navigation.navigate("ChangePass", randomPassword, email)
        //       console.log('tontain')
        //   }
        // } catch (error) {
        //   Alert.alert('Thông báo', 'Đã xảy ra lỗi, vui lòng thử lại sau');
        //   console.error('Lỗi:', error);
        // }
        navigation.navigate("ChangePass", email)
      };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.text}>
        <Text style={{ fontSize: 30, fontWeight: "700" }}>
          Find your acount
        </Text>
        <Text style={{ fontSize: 18 }}>Enter your email</Text>
      </View>
      <View style={styles.input}>
              <TextInput
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                    style={styles.inputext}
        ></TextInput>
      </View>
      <Text style={{margin:10}}> you may reciver notification</Text>
      <View style={styles.btn}>
              <TouchableOpacity
                  onPress={handlePassForgot}
                  style={styles.button}>
          <Text style={{color:'white',fontWeight:"500"}}>Find account</Text>
        </TouchableOpacity>
        <Text style={{marginTop:10}}> search by Phone number</Text>
      </View>
    </View>
  );
};
export default ForgotPass;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  back: {
    padding: 10,
  },
  
  text: {
    marginLeft: 8,
  },
  input: {
    marginHorizontal: 10,
      borderWidth: 1,
      borderRadius: 10,
      width: '90%',
      marginTop:20,
  
  },
    inputext: {
        height: 50,
        paddingHorizontal:20
    }, btn: {
        marginTop: 10,
       
        justifyContent: 'center',
        alignItems:'center',
    }, button: {
        marginTop:10,
        borderWidth: 1,
      borderRadius: 20,
         width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'blue',
  }
});
