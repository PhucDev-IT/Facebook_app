import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { React, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { firebase } from "../../config.js";

import Spinner from "react-native-loading-spinner-overlay";
import { UserContext } from "../../UserContext.js";
import { useEffect } from "react";
import color from "../../color/color.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserCurrent } = useContext(UserContext);
  handlerCreate = () => {
    navigation.navigate("Infor_SignUp");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const DangNhap = async (email, password) => {
    try {
      setIsLoading(true);

      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const userID = userCredential.user.uid;

      const userDocRef = await firebase
        .firestore()
        .collection("users")
        .doc(userID);
      userDocRef
        .get()
        .then((doc) => {
          if (doc.exists) {
         
            const userData = doc.data();
            setIsLoading(false);
            setUserCurrent(userData); 
              console.log('nhay vào đay')
            navigation.navigate("BottomTabNavigate");
          } else {
            // Người dùng không tồn tại trong Firestore
            alert("Người dùng không tồn tại");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          return;
          console.error("Lỗi khi truy vấn dữ liệu người dùng:", error);
        });
    } catch (error) {
      setIsLoading(false); 
      alert("Tài khoản hoặc mật khẩu không chính xác");
      return;
      throw error; 
    }
  };
  const [hienthi, setHienthi] = useState(true);
  const [eye, setEys] = useState(false);
  const anhien = () => {
    setHienthi(!hienthi);
  };
  return (
    <View style={styles.container}>
      <View style={styles.Body}>
        <FontAwesome5 name="facebook" size={74} color="blue" />
      </View>
      <View style={styles.Nhap}>
        <TextInput
          onChangeText={(email) => {
            setEmail(email);
          }}
          value={email}
          placeholderTextColor={"#BBBBBB"}
          placeholder="Nhập email"
          style={styles.txtName}
        ></TextInput>

        <View style={[styles.txtName, styles.txtview]}>
          <TextInput
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              if (password != "") {
                setEys(true);
              } else {
                setEys(false);
              }
            }}
            secureTextEntry={hienthi}
            placeholderTextColor={"#BBBBBB"}
            placeholder="Password"
            style={{ width: "85%" }}
          ></TextInput>
          {eye == true && (
            <TouchableOpacity onPress={anhien}>
              <Ionicons
                name={hienthi ? "eye-off" : "eye"}
                size={30}
                color="black"
                style={styles.eye}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => DangNhap(email.trim(), password.trim())}
          style={styles.button}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 17 }}>Bạn quên mật khẩu ư?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.botm}>
        <TouchableOpacity onPress={handlerCreate} style={styles.CreateA}>
          <Text style={{ color: "#0066FF", fontSize: 18 }}>
            Tạo Tài Khoản Mới
          </Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "800", color: "#555555", marginTop: 30 }}>
          FaceBook_Chat
        </Text>
      </View>
      {isLoading ? <Loading_Animation /> : null}
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
    width: "100%",
    height: 200,
    alignItems: "center",
  },
  Nhap: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: 300,
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
    backgroundColor: "#0033FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  botm: {
    marginTop: 40,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  CreateA: {
    width: "85%",
    height: 50,
    borderColor: "#0033FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
  },
  txtview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
