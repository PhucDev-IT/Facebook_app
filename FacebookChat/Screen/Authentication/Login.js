import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const Login = ({ navigation }) => {
    handlerCreate = () => {
        navigation.navigate("DangKy");
      }
  return (
    <View style={styles.container}>
      <View style={styles.topBack}>
        <TouchableOpacity>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.Body}>
        <FontAwesome5 name="facebook" size={74} color="blue" />
      </View>
      <View style={styles.Nhap}>
        <TextInput
          placeholderTextColor={"#BBBBBB"}
          placeholder="Nhập email hoặc số điện thoại"
          style={styles.txtName}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          placeholderTextColor={"#BBBBBB"}
          placeholder="Nhập mật khẩu"
          style={styles.txtName}
              ></TextInput>
              <TouchableOpacity style={styles.button}>
                  <Text style={{ color:'white',fontSize:20}}>Đăng Nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style={{ fontSize:17}}>Bạn quyên mật khẩu ư?</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.botm}>
              <TouchableOpacity
                  onPress={handlerCreate}
                  style={styles.CreateA}>
                  <Text style={{ color:'#0066FF',fontSize:18}}>Tạo Tài Khoản Mới</Text>
              </TouchableOpacity>
              <Text style={{fontWeight:'800',color:'#555555',marginTop:30}}>
                   FaceBook_Chat
              </Text>
          </View>
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCCCCC",
  },
  topBack: {
    marginTop: 10,
    marginLeft: 20,
  },
  Body: {
    justifyContent: "center",
    flex: 0.35,
    alignItems: "center",
  },
  Nhap: {
    justifyContent: "space-around",
    flex: 0.4,
    alignItems: "center",
    flexDirection: "column",
  },
  txtName: {
    width: "85%",
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "white",
    paddingHorizontal: 15,
    },
    button: {
        width: "84%",
        height: 60, 
        backgroundColor: '#0033FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    botm: {
        marginTop:40,
        flex: 0.25,
        bottom: 0,
        justifyContent: 'center',
        alignItems:'center',
    },
    CreateA: {
        width: "85%",
        height: 50, 
        borderColor:'#0033FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderRadius: 30,
    }
});
