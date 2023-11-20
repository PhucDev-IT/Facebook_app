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
import { React, useState, useCallback, useEffect, useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import FlatItem from "../Home/FlatItem.js";
import { firebase } from "../../config.js";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from '../../UserContext';
const Infor = ({ navigation }) => {
  const { userCurrent } = useContext(UserContext);
  const [user, setUser] = useState(userCurrent);

  const [image, setImage] = useState(user.avatar);
  useFocusEffect(
    useCallback(() => {
      const Selectuser = async () => {
        const userReSelectuserf = await firebase
          .firestore()
          .collection("users")
          .doc(user.userID);
        await userReSelectuserf.get().then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUser(userData);
          } else {
          }
        });
      };
      Selectuser();
    }, [user.userID])
  );
  // selectfirebase có dk

  // const selec_Aticle = () => {
  //   firebase.firestore().collection('posts')
  // .where('user', '==', 'userIDCuaUser') // Điều kiện truy vấn
  // .get()
  // .then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     const data = doc.data();
  //     console.log(data);
  //   });
  // })
  // .catch((error) => {
  //   console.error('Lỗi khi truy vấn dữ liệu:', error);
  // });
  // }
  const [Post, setPost] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        console.log(user.userID);
        const postsRef = firebase.firestore().collection("posts"); // Thay 'posts' bằng tên collection của bạn
        const querySnapshot = await postsRef
          .where("userID", "==", user.userID)
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
      <View>
        <View style={styles.avatar}>
          <Image style={styles.imges} source={{ uri: image }}></Image>
        </View>
        <View style={styles.usercnhan}>
          <Text style={styles.txt}>{user.DisplayName}</Text>
        </View>
        <View style={styles.view4}>
          <TouchableOpacity style={styles.btn1}>
            <Text style={styles.txt1}>+ Add to story</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile", user);
            }}
            style={styles.btn1}
          >
            <Text style={styles.txt1}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2}>
            <Text style={styles.txt1}>...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view5}>
          <Text style={{ fontSize: 18 }}>166 friend</Text>
          <TouchableOpacity onPress={setSeeInfor}>
            <Text style={{ color: "#222222", fontSize: 20 }}>
              Giới thiệu chung
            </Text>
          </TouchableOpacity>
        </View>
        {SeeIF && (
          <View style={styles.thongtin}>
            <Text style={styles.txtx}>Ngày sinh: {user.BirthOfDate}</Text>
            <Text style={styles.txtx}>
              Giới tính {user.Gender == 1 ? "Nam" : "Nữ"}
            </Text>
            <Text style={styles.txtx}>Email {user.UserName}</Text>
            <Text style={styles.txtx}>
              Địa chỉ: {user.address ? user.address : "Không có"}
            </Text>
            <Text style={styles.txtx}>
              Trường học: {user.school ? user.school : "Không có"}
            </Text>
            <Text style={styles.txtx}>
              Nghề nghiệp: {user.occupation ? user.occupation : "Không có"}
            </Text>
            <Text style={styles.txtx}>
              Mối quan hệ:{" "}
              {user.relationshipStatus ? user.relationshipStatus : "Không có"}
            </Text>
          </View>
        )}
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "black",
            marginTop: 2,
          }}
        ></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
    padding: 15,
  },
  avatar: {
    width: "100%",
    height: 249,

    backgroundColor: "#333333",
  },
  usercnhan: {
    justifyContent: "space-around",
    width: "70%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
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
  },
  imges: {
    width: "100%",
    height: 250,
    borderWidth: 2,
    borderColor: "red",
  },
  avata: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: "#333333",
  }, txtx: {
    color: 'black',
    fontSize: 18,
      fontWeight:'500',
  }
});
