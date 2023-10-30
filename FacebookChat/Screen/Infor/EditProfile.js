import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  BackHandler,
  Alert,
  PermissionsAndroid,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import { React, useState, useEffect, useRef, memo } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { firebase } from "../../config.js"
import { useFocusEffect } from '@react-navigation/native';
const EditProfile = ({ navigation, route }) => {
    let user = route.params;
     
  const [selectedImages, setSelectedImages] = useState(user.avatar);
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
     
      delete result.cancelled;
    if (!result.canceled) {
        setSelectedImages(result.assets[0].uri)
    }
    };
    const [displayName, setName] = useState("")
  
    const updateProfile = async (userID, imageUrl) => {
      try {
          await firebase.firestore()
              .collection('users')
              .doc(userID)
          .update({ avatar: imageUrl });
        console.log('thanh cong')
      } catch (error) {
          console.error('Lỗi khi cập nhật avatar:', error);
      }
  };
  console.log(selectedImages)
  return (
    <View style={styles.container}>
      <View style={styles.backbr}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Infor")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="arrow-back" size={26} color="white" />
          <Text style={{ color: "white" }}> Edit Profile</Text>
        </TouchableOpacity>
              <TouchableOpacity
          onPress={() => {
            updateProfile(user.userID,selectedImages)
                   }}
                  style={styles.save}>
          <Text  >Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.thanhngang}></View>
      <View style={styles.imguser}>
        <Image style={styles.imges} source={{ uri: selectedImages }}></Image>
        <TouchableOpacity onPress={pickImages} style={styles.btnEdit}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.thanhngang}></View>

      <View style={styles.thongtin}>
        <Text style={styles.txt}>Ngày sinh: {user.BirthOfDate}</Text>
        <Text style={styles.txt}>
          Giới tính: {user.Gender == 1 ? "Nam" : "Nữ"}
        </Text>
        <Text style={styles.txt}>Email: {user.UserName}</Text>
        <TouchableOpacity style={styles.btnEdit}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.thanhngang}></View>
    </View>
  );
};
export default EditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808080",
  },
  backbr: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  save: {
    width: 60,
    height: 35,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  imguser: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imges: {
    width: "50%",
    height: "85%",
    borderRadius: 100,
  },
  btnEdit: {
    width: 60,
    height: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 3,
  },
  thongtin: {
    padding: 10,

    position: "relative",
  },
  txt: {
    fontSize: 20,
    color: "white",
    fontWeight: "300",
  },
  thanhngang: {
    width: "100%",
    height: 4,
    backgroundColor: "white",
    marginVertical: 10,
  },
});
