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
import { React, useState, useEffect, useContext, memo, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import FlatItem from "./FlatItem.js";
import { firebase } from "../../config.js";
import { UserContext } from '../../UserContext';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Item_Story_Home from "./Item_Story_Home.js";
const Home = ({ navigation }) => {
  const { userCurrent } = useContext(UserContext);
  const [user, setUser] = useState(userCurrent);
  const [stories,setStories] = useState([]);
  const handlerAdd_articles = () => {
    navigation.navigate("Add_articles", user);
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    const getPosts = async () => {
      try {
        const postsRef = firebase.firestore().collection("posts"); // Thay 'posts' bằng tên collection của bạn
        const querySnapshot = await postsRef.get();

        const posts = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          posts.push({ id: doc.id, ...data });
        });
        setData_articles(posts);
        // console.log('Danh sách bài viết:', posts);
        return posts;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
        return [];
      }
    };
    getPosts();

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [data_Articles, setData_articles] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsRef = firebase.firestore().collection("posts"); // Thay 'posts' bằng tên collection của bạn
        const querySnapshot = await postsRef.get();

        const posts = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          posts.push({ id: doc.id, ...data });
        });
        setData_articles(posts);
        // console.log('Danh sách bài viết:', posts);
        return posts;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
        return [];
      }
    };
    getPosts();
  }, []);


  //Lấy story của người dùng
  const getMyStories = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection('stories').doc(userCurrent.userID).collection("itemstories").get();
      let listStory = [];
      querySnapshot.forEach((doc) => {
        listStory.push({
          poster: {
            id: userCurrent.userID,
            DisplayName: userCurrent.DisplayName,
            avatar: userCurrent.avatar,
          },
          idStory: doc.id,
          data: doc.data(),
        });            
      });
      return listStory;
    } catch (error) {
      console.log("Error getting documents: ", error);
      return [];
    }
  }
  
  const getStoriesMyFriends = async () => {
    try {
      let listStory = [];
      const querySnapshot = await firebase.firestore().collection('Friends').doc(userCurrent.userID).collection('userFriends').get();
      for (const doc of querySnapshot.docs) {
        const query = await firebase.firestore().collection('stories').doc(doc.data().MyFriend.userID).collection('itemstories').get();
        query.forEach((docRef) => {
       
          listStory.push({
            poster: {
              id: doc.data().MyFriend.userID,
              DisplayName: doc.data().MyFriend.DisplayName,
              avatar: doc.data().MyFriend.avatar,
            },
            idStory: docRef.id,
            data: docRef.data(),
          });
        });   
      }
      return listStory;
    } catch (error) {
      console.log("Error getting documents: ", error);
      return [];
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myStories = await getMyStories();
        const friendsStories = await getStoriesMyFriends();
        const updatedStories = stories.concat(myStories, friendsStories);
        setStories(updatedStories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  //Đăng story
  const ChooseVideoPushStory = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,

      });
      let path = null;
      if (!result.canceled) {
        path = result.assets[0].uri;
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          path,
          {
            time: 1500,
          }
        );
        console.log(uri);
        navigation.navigate('PreviewStory', { videoPath: path, thumbnailPath: uri, user: user });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const DefaultAddStory = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          ChooseVideoPushStory()
        }}
        style={styles.creteTin}
      >
        <Image
          style={{
            width: "100%",
            flex: 0.7,
            height: "70%",
          }}
          source={{ uri: user.avatar }}
        ></Image>
        <View style={styles.tintuc}>
          <Text style={{ alignItems: "center" }}>+</Text>
        </View>
        <View style={styles.thantin}>
          <Text style={{ alignItems: "center", marginTop: 10 }}> Tạo tin </Text>
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
              <Feather name="bell" size={30} color="white" />
              <Feather name="search" size={30} color="white" />
            </View>
          </View>
          <View style={styles.thanhngang}></View>
          <View style={styles.thanhbar}>
            <View style={styles.thanhbar1}>
              <Image
                style={styles.thanhbar1}
                source={{ uri: user.avatar }}
              ></Image>
            </View>
            <TouchableOpacity
              style={styles.trangthai}
              onPress={handlerAdd_articles}
            >
              <Text style={{ color: "white" }}>Trạng thái của bạn</Text>
            </TouchableOpacity>
            <Ionicons name="images-outline" size={30} color="green" />
          </View>
          <View></View>
        </View>
        <View style={{flexDirection:'row'}}>
        {DefaultAddStory()}
          <FlatList
          data={stories}
            horizontal
            keyExtractor={(item, index) => index.toString()} // Assuming each document has a unique "id" field
            renderItem={({ item, index }) => {
              return <Item_Story_Home item={item} />;
            }}
          />
        </View>

      </View>
    );
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data_Articles}
        ListHeaderComponent={FlatStory}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true}
        renderItem={({ item, index }) => {
          return (
            <FlatItem
              item={item}
              index={index}
              userDn={user.userID}
              navigation={navigation} />
          );
        }}
        refreshControl=
        {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >

      </FlatList>
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
