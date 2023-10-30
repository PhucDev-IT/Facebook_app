import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import { React, useState,useCallback, useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import FlatItem from "../Home/FlatItem.js";
import { firebase } from "../../config.js"
import { useFocusEffect } from '@react-navigation/native';
const Infor = ({ navigation, route }) => {
  
      const[user,setUser]=useState(route.params.data)
  const [image, setImage] = useState(user.avatar)
  useFocusEffect(useCallback(() => {
    const Selectuser = async () => {
      const userReSelectuserf = await firebase.firestore().collection("users").doc(user.userID)
      await userReSelectuserf.get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUser(userData)
          } else {

          }
        })
    }
    Selectuser();
  }, [user.userID]));
  const InforHeader = () => {
    return (
      <View style={styles.view1}>
        <View style={styles.usercnhan}>
          <View style={styles.avatar}>
            <Image
              style={styles.imges}
              source={{ uri:image }}
            ></Image>
          </View>
          <View style={styles.view2}>
            <View style={styles.titleName}>
              <Text style={styles.txt}>{user.DisplayName}</Text>
            </View>
          </View>
          <View style={styles.view4}>
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.txt1}>+ Add to story</Text>
            </TouchableOpacity>
            <TouchableOpacity  
              onPress={() => {
                   navigation.navigate("EditProfile",user)
              }}
              style={styles.btn1}>
              <Text style={styles.txt1}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2}>
              <Text style={styles.txt1}>...</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.view5}>
          <Text> friend</Text>
          <Text style={styles.txt3}>Thông tin</Text>
        </View>

        <View style={styles.thongtin}>
          <Text>Ngày sinh {user.BirthOfDate}</Text>
          <Text>Giới tính {user.Gender == 1 ? "Nam" : "Nữ"}</Text>
          <Text>Email {user.UserName}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList ListHeaderComponent={InforHeader}></FlatList>
    </View>
  );
};
export default Infor;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  view1: {
    width: "100%",
    height: 400,
    justifyContent: "center",
  },
  txt: {
    fontWeight: "600",
    fontSize: 30,
  },
  touchcs: {
    width: 150,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
  thongtin: {
    padding: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: "#333333",
  },
  usercnhan: {
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    height: 260,
  },
  btn1: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: 45,
    borderRadius: 10,
  },
  txt1: {
    color: "white",
    fontWeight: "600",
  },
  view4: {
    flexDirection: "row",
    width: "100%",
    padding: 5,
    justifyContent: "space-around",
  },
  btn2: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    backgroundColor: "blue",
  },
  view5: {
    paddingHorizontal: 20,
  },
  txt3: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  }, imges: {
   
      width: "100%",
      flex: 1,
      height: "70%",
      borderRadius: 100,
   
  }
});
