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
const ChangePass = ({ navigation, route }) => {
    console.log(route.params);
    
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("ForgotPass")}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.mapss}>
        <Text>Nhập vào mã password: </Text>
        <Text style={{ fontWeight: "700", fontSize: 18 }}>{}</Text>
      </View>

      <View style={styles.viewbag}>
        <TextInput style={styles.input} keyboardType="numeric" maxLength={1} />
        <TextInput style={styles.input} keyboardType="numeric" maxLength={1} />
        <TextInput style={styles.input} keyboardType="numeric" maxLength={1} />
        <TextInput style={styles.input} keyboardType="numeric" maxLength={1} />
        <TextInput style={styles.input} keyboardType="numeric" maxLength={1} />
        <TextInput style={styles.input} keyboardType="numeric" maxLength={1} />
      </View>

      <View style={styles.inputa}>
        <TextInput
          placeholder="Enter pass"
          keyboardType=""
          style={styles.inputext}
        ></TextInput>
          </View>
          <View style={styles.btn}>
              <TouchableOpacity
                  
                  style={styles.button}>
          <Text style={{color:'white',fontWeight:"500"}}>Update</Text>
        </TouchableOpacity>
        <Text style={{marginTop:10}}> search by Phone number</Text>
      </View>
    </View>
  );
};
export default ChangePass;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  back: {
    padding: 10,
  },
  mapss: {
    width: "100%",
    height: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  viewbag: {
    flexDirection: "row", // Sắp xếp theo chiều ngang
    justifyContent: "space-between", // Canh đều các ô TextInput
    alignItems: "center", // Canh ô TextInput theo trục dọc
    paddingHorizontal: 20, // Padding ngang để cách mép
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "15%", // Định kích thước của mỗi ô TextInput
    // Bạn có thể điều chỉnh các thuộc tính khác tùy theo ý muốn của bạn
  },
  inputa: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    marginTop: 20,
  },
  inputext: {
    height: 40,
    paddingHorizontal: 20,
  },btn: {
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
    backgroundColor:'blue'
}
});
