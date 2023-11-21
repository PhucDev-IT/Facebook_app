import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    StatusBar,
  } from "react-native";
  
  import React, { useEffect, useContext,useState } from "react";
  import { Feather } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import FlatItem from "./FlatItem.js";
  import { Entypo } from "@expo/vector-icons";
  import { firebase } from "../../config.js";
  import { UserContext } from '../../UserContext';
  const SeeDeTails = ({ route, navigation }) => {

    const { userCurrent } = useContext(UserContext);

    const BackTrangHome = () => {
      navigation.navigate("Home");
    };
    
    
  
    // ket noi firebase
    const [Post, setPost] = useState([]);
  
    // onpressmes
    const NavigateMess = () => {
      navigation.navigate("PesionChat", userCurrent);
    };
    //  nhấn vào them hoặc bor ban be
    const [isFriend, setIsFriend] = useState(false);
    let handlePress = () => {
      setIsFriend((prevState) => !prevState);
    };
  
    useEffect(() => {
      const getPosts = async () => {
        try {
          console.log(userCurrent.userID);
          const postsRef = firebase.firestore().collection("posts"); // Thay 'posts' bằng tên collection của bạn
          const querySnapshot = await postsRef
            .where("userID", "==", userCurrent.userID)
            .get();
          const posts = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            posts.push({ id: doc.id, ...data });
          });
          setPost(posts);
          return posts;
        } catch (error) {
          console.error("Lỗi khi lấy danh sách bài viết:", error);
          return [];
        }
      };
      getPosts();
    }, []);
    const [SeeIF, setSeeIF] = useState(false);
    const setSeeInfor = () => {
      setSeeIF(!SeeIF);
    };
    const InforHeader = () => {
      return (
        <View
          style={{
            flex: 0.3,
            backgroundColor: "#444444",
            paddingBottom: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={BackTrangHome}>
              <Ionicons name="md-arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 300,
                backgroundColor: "white",
                marginRight: 15,
                marginVertical: 10,
                borderRadius: 40,
                padding: 8,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text> nhập tìm kiếm </Text>
              <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <View style={{}}>
              <Image
                source={{ uri: userCurrent.avatar }}
                style={{
                  width: "100%",
                  height: 250,
                  borderWidth: 2,
                  borderColor: "red",
                }}
              ></Image>
              <Text
                style={{
                  fontSize: 40,
                  marginLeft: 20,
                  fontWeight: "800",
                  color: "white",
                }}
              >
                {userCurrent.DisplayName}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: "row",
              width: 200,
  
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "500",
              }}
            >
              842 flower{" "}
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "500",
              }}
            >
              {userCurrent.like} Likes
            </Text>
          </View>
          <View
            style={{
              width: 400,
              height: 30,
              backgroundColor: "#333333",
              marginTop: 3,
            }}
          >
            <TouchableOpacity onPress={setSeeInfor}>
              <Text style={{ color: "white" }}>Xem thiệu chung...</Text>
            </TouchableOpacity>
          </View>
          {SeeIF && (
            <View style={styles.thongtin}>
              <Text style={styles.txtx}>Ngày sinh {userCurrent.BirthOfDate}</Text>
              <Text style={styles.txtx}>Giới tính {userCurrent.Gender == 1 ? "Nam" : "Nữ"}</Text>
              <Text style={styles.txtx}>Email {userCurrent.UserName}</Text>
            </View>
          )}
          <View
            style={styles.view1}
          >
            <TouchableOpacity
              onPress={() => {
                NavigateMess();
              }}
              style={styles.meM}
            >
              <Text style={{ color: "white" }}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 140,
                height: 40,
                backgroundColor: isFriend ? "pink" : "green",
                borderRadius: 10,
                flexDirection: "row",
              }}
            >
              <Entypo
                name={isFriend ? "users" : "add-user"}
                size={24}
                color={isFriend ? "green" : "blue"}
              />
              <Text style={{ color: isFriend ? "green" : "blue" }}>
                {isFriend ? "Bạn bè" : "Thêm b bè"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toucj1}
            >
              <Entypo name="menu" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontSize: 24 }}>Detail</Text>
          </View>
        </View>
      );
    };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "pink",
        }}
      >
        <FlatList
          ListHeaderComponent={InforHeader}
          keyExtractor={(item, index) => index.toString()}
          data={Post}
          renderItem={({ item, index }) => {
            return <FlatItem item={item} navigation={navigation} />;
          }}
        />
      </View>
    );
  };
  export default SeeDeTails;
  const styles = StyleSheet.create({
    thongtin: {
      padding: 10,
    }, txtx: {
      color: 'white'
    }, meM: {
      justifyContent: "center",
      alignItems: "center",
      width: 140,
      height: 40,
      backgroundColor: "#333333",
      borderRadius: 10,
    }, toucj1: {
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 40,
      backgroundColor: "#333333",
      borderRadius: 10,
    }, view1: {
      marginHorizontal: 20,
      flexDirection: "row",
      marginTop: 3,
      justifyContent: "space-between",
      alignItems: "center",
    }
  });
  