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

import React, { useEffect, useState, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FlatItem from "./FlatItem.js";
import { Entypo } from "@expo/vector-icons";
import { firebase } from "../../config.js";
import { UserContext } from '../../UserContext';
import color from "../../color/color.js";

const SeeDeTail = ({ route, navigation }) => {
  const { userCurrent } = useContext(UserContext);
  const BackTrangHome = () => {
    navigation.navigate("Home");
  };
  const [dataRoute, setDataRote] = useState(route.params);

  // ket noi firebase
  const [Post, setPost] = useState([]);

  // onpressmes
  const NavigateMess = () => {
    navigation.navigate("PesionChat", dataRoute);
  };
  //--------------------- XỬ LÝ KẾT BẠN ------------------------

  const [statusFriend, setStatusFriend] = useState('Thêm bạn bè');

  useEffect(() => {
    const checkIsFriend = async () => {
      await firebase.firestore().collection('Friends').doc(userCurrent.userID).collection('userFriends')
        .doc(dataRoute.userID).get().then((doc) => {

          if (doc.exists) {
            setStatusFriend('Bạn bè')
          } else {
            setStatusFriend('Thêm bạn bè')
          }
        })
    }
    checkIsFriend();
  }, [])

    const handleFriend = async ()=>{
      if(statusFriend == 'Thêm bạn bè'){
        handleAddFriend();
      }else if(statusFriend == "Chờ xác nhận"){
        cancelRequestAddFriend();
      }
    }

  const handleAddFriend = async () => {
    try {
      //Kiểm tra xem đã gửi yêu cầu hay chưa?
      const query = await firebase.firestore().collection("friendRequests").where('userSend.userID', '==', userCurrent.userID)
        .where('idReceiver', '==', dataRoute.userID).get();

      if (query.size > 0) {
        setStatusFriend('Chờ xác nhận')
      } else {
        await firebase.firestore().collection('friendRequests').add({
          userSend: userCurrent, //Truyền đẩy đủ 1 obj
          idReceiver: dataRoute.userID,
          status: 'pending',
          date: new Date(),
        }).then(() => {
          // Xử lý khi thành công
          setStatusFriend('Chờ xác nhận')
          alert('Đã gửi yêu cầu kết bạn')
        }).catch((error) => {
          alert('Có lỗi xảy ra: ' + error);
          console.log('Lỗi: ' + error);
        });
      }
    } catch (error) {
      console.log('Lỗi yêu cầu kb: ' + error);
    }
  }

  const cancelRequestAddFriend = async () => {
    try {
      const query = await firebase.firestore().collection('friendRequests').where('userSend.userID', '==', userCurrent.userID)
        .where('idReceiver', '==', dataRoute.userID).get();

      query.forEach((doc) => {
        doc.ref.delete();
        setStatusFriend('Thêm bạn bè')
      })
    } catch (error) {
      console.log("Lỗi: " + error);
    }

  }


  //---------------------Gưi tin nhắn
  const inforRoom = async () => {
    //Lấy tất cả tin nhắn của người dùng hiện tại, sau đó lọc xem có tin nhắn nào đã được tạo với user kia chưa
    const queryRoom = await firebase.firestore().collection('chats')
      .where('user', 'array-contains', userCurrent.userID)
      .get();
    let roomId = null;
    queryRoom.forEach((doc) => {
      const data = doc.data();
      for (const item of data.user) {
        if (item === dataRoute.userID) {
          roomId = doc.id;
        }
      }
    })
    if (roomId == null) {
      roomId = dataRoute.userID > userCurrent.userID ? `${dataRoute.userID + '-' + userCurrent.userID}` : `${userCurrent.userID + '-' + dataRoute.userID}`;
    }

    return roomId;
  };


  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsRef = firebase.firestore().collection("posts"); // Thay 'posts' bằng tên collection của bạn
        const querySnapshot = await postsRef
          .where("userID", "==", dataRoute.userID)
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
          backgroundColor: color.background,
          paddingBottom: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            elevation: 8,
            backgroundColor: color.white,
            marginBottom: 5
          }}
        >
          <TouchableOpacity onPress={BackTrangHome}>
            <Ionicons name="md-arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ backgroundColor: color.white }}>
            <Image
              source={{ uri: dataRoute.avatar }}
              style={{
                width: "100%",
                height: 250,
                borderWidth: 2,

              }}
            ></Image>
            <Text
              style={{
                fontSize: 30,
                marginLeft: 20,
                fontWeight: "500",
                color: "black",
              }}
            >
              {dataRoute.DisplayName}
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
              color: "#888888",
              fontWeight: "500",
            }}
          >
            842 Flower{" "}
          </Text>
          <Text
            style={{
              color: "#888888",
              fontWeight: "500",
            }}
          >
            {dataRoute.like} Likes
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
            <Text style={{ color: "black" }}>Xem thiệu chung...</Text>
          </TouchableOpacity>
        </View>
        {SeeIF && (
          <View style={styles.thongtin}>
            <Text style={styles.txtx}>Ngày sinh: {dataRoute.BirthOfDate}</Text>
            <Text style={styles.txtx}>
              Giới tính {dataRoute.Gender == 1 ? "Nam" : "Nữ"}
            </Text>
            <Text style={styles.txtx}>Email {dataRoute.UserName}</Text>
            <Text style={styles.txtx}>
              Địa chỉ: {dataRoute.address ? dataRoute.address : "Không có"}
            </Text>
            <Text style={styles.txtx}>
              Trường học: {dataRoute.school ? dataRoute.school : "Không có"}
            </Text>
            <Text style={styles.txtx}>
              Nghề nghiệp: {dataRoute.occupation ? dataRoute.occupation : "Không có"}
            </Text>
            <Text style={styles.txtx}>
              Mối quan hệ:{" "}
              {dataRoute.relationshipStatus ? dataRoute.relationshipStatus : "Không có"}
            </Text>
          </View>
        )}
        <View
          style={styles.view1}
        >
          <TouchableOpacity
            onPress={async () => {
              const roomId = await inforRoom();
              navigation.navigate("ChatDetails", { roomId: roomId, FriendChat: dataRoute });
            }}
            style={styles.meM}
          >
            <Text style={{ color: "white" }}>Nhắn tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFriend}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 140,
              height: 40,
              backgroundColor: '#AAAAAA',
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <Entypo
              name={statusFriend == "Thêm bạn bè" ? "add-user" : "users"}
              size={24}
              color="black"
            />
            <Text style={{ marginLeft: 4, }}>
              {statusFriend}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toucj1}
          >
            <Entypo name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>

      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#EEEEEE',
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
export default SeeDeTail;
const styles = StyleSheet.create({
  thongtin: {
    padding: 10,
  },
  txtx: {
    color: 'black'
  },
  meM: {
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 40,
    backgroundColor: "#FF9999",
    borderRadius: 10,
  }, toucj1: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
    backgroundColor: "#333333",
    borderRadius: 10,
  },
  view1: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginTop: 3,
    justifyContent: "space-between",
    alignItems: "center",
  }
});
