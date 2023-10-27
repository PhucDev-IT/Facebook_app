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
  TouchableWithoutFeedback,
  Modal,
  BackHandler,
  Alert,
  RefreshControl,
} from "react-native";
import { React, useState, useEffect, useRef, memo, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import FlatItem from "./FlatItem.js";

const Home = ({ navigation, route }) => {
  
 const [user, setUser] = useState(route.params.data);
  //console.log(JSON.stringify(user)+'dtaa')
  const handlerAdd_articles = () => {
    navigation.navigate("Add_articles",user);
  }
  const str = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("bhdshbh");
        }}
        style={styles.creteTin}
      >
        {/* <Image
        style={{
          width: "100%",
          flex: 0.7,
          height: "70%",
        }}
        source={{ uri: user.Avatar }}
      ></Image> */}
        <View style={styles.tintuc}>
          <Text style={{ alignItems: "center" }}>+</Text>
        </View>
        <View style={styles.thantin}>
          <Text style={{ alignItems: "center", marginTop: 10 }}>Tạo Tin </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const FlatStory = memo(() => {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.topter}>
            <Text style={{ color: "white", fontSize: 25, fontWeight: "700" }}>
              FaceBook
            </Text>
            <View style={styles.add}>
              <Ionicons name="add-circle" size={30} color="white" />
              <Feather name="search" size={30} color="white" />
            </View>
          </View>
          <View style={styles.thanhngang}></View>
          <View style={styles.thanhbar}>
            <View style={styles.thanhbar1}></View>
            <TouchableOpacity style={styles.trangthai}
               onPress={ handlerAdd_articles}
            >
              <Text style={{ color: "white" }}>Trạng thái của bạn</Text>
            </TouchableOpacity>
            <Ionicons name="images-outline" size={30} color="green" />
          </View>
          <View></View>
        </View>
        <FlatList
          horizontal
          // keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={str}
          renderItem={({ item }) => {
            return (
              <View>
                <Text
                  style={{
                    bottom: 4,
                    marginHorizontal: 5,
                    color: "white",
                    position: "absolute",
                  }}
                ></Text>
              </View>
            );
          }}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={FlatStory}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true}
        renderItem={({ item, index }) => {
          return <FlatItem />;
        }}
      ></FlatList>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
  tintuc: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "white",
    position: "absolute",
    bottom: 30,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  topter: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  thantin: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: 80,
    alignItems: "center",
  },
  thanhngang: {
    width: "100%",
    backgroundColor: "white",
    height: 2,
    marginTop: 10,
  },
  thanhbar1: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "green",
  },
  thanhbar: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 80,
    marginTop: -5,
  },
  trangthai: {
    width: 220,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  creteTin: {
    width: 100,
    height: 150,
    padding: 4,
    borderWidth: 1,
    borderRadius: 13,
    position: "relative",
    marginHorizontal: 6,
    backgroundColor: "white",
  },
});
