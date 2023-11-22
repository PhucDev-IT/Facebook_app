import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { React, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { firebase } from "../../config.js";
import Loading_Animation from "../../component/Loading_Animation.js";

import { UserContext } from '../../UserContext.js';
import { useEffect } from "react";
import color from "../../color/color.js";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
const Login = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false);
  const { setUserCurrent } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [user,setUser] = useState();
  handlerCreate = () => {
    navigation.navigate("Infor_SignUp");
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  //Chặn quay về màn hình trước đó
  useEffect(() => {
    const handleBackButton = () => true;
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButton
      );
    };
  }, []);
  //--------------------------------------------------

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const DangNhap = async (email, password) => {
    try {
      setIsLoading(true);

      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword('a@gmail.com', '123456');

      const userID = userCredential.user.uid;
      // Đăng nhập thành công, user chứa thông tin người dùng đã đăng nhập
      const userDocRef = await firebase.firestore().collection("users").doc(userID);
      userDocRef.get().then((doc) => {
        if (doc.exists) {
          // Dữ liệu người dùng được tìm thấy
          const userData = doc.data();
          setIsLoading(false)
           setUserCurrent(userData);
          navigation.navigate("BottomTabNavigate");
        } else {
          // Người dùng không tồn tại trong Firestore
          alert("Người dùng không tồn tại");
        }
      })
        .catch((error) => {
          setIsLoading(false)
          console.error("Lỗi khi truy vấn dữ liệu người dùng:", error);
        });

    } catch (error) {
      setIsLoading(false)
      alert("Tài khoản hoặc mật khẩu không chính xác")
      console.error("Lỗi khi đăng nhập:", error);
      throw error; // Xử lý lỗi hoặc trả về lỗi
    }

    
  };

  return (
    <View  style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="facebook" size={74} color="blue" />
      </View>
      <View style={styles.body}>
        <TextInput
          label="Email"
          value={email}
          mode='outlined'
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          style={styles.inputText}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
          </TouchableOpacity>
        </View>


        <TouchableOpacity
          onPress={() => DangNhap(email.trim(), password.trim())}
          style={styles.btnLogin}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: 'bold' }}>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 16, marginTop: 15, color: '#333333' }}>Bạn quên mật khẩu ư?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.botm}>
        <TouchableOpacity onPress={handlerCreate} style={styles.CreateA}>
          <Text style={{ color: "#0066FF", fontSize: 18, }}>
            Tạo Tài Khoản Mới
          </Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "800", color: "#555555", marginTop: 30 }}>
          FaceBook_Chat
        </Text>
      </View>
      {isLoading ? <Loading_Animation /> : null}
    </View >
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  topBack: {
    marginTop: 10,
    marginLeft: 20,
  },
  header: {
    flex:1,
    justifyContent: "center",
    height: 200,
    alignItems: "center",


  },
  body: {
    flex:1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    width: '100%',


  },
  inputText: {
    width: '80%',
    height: 55,
    backgroundColor: color.white,
    elevation: 6,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC'
  },
  btnLogin: {
    width: "80%",
    height: 50,
    backgroundColor: "#0033FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20
  },
  botm: {
    flex: 1,
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

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
});