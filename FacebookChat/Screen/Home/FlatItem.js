import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Button,
  PanResponder,
  Share,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Coment from "./Comment.js";
import React, { useEffect, useState, useContext,memo} from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import { firebase } from "../../config.js";
import TimeAgo from "react-native-timeago";
import color from "../../color/color.js";
import { UserContext } from '../../UserContext.js';
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const FlatItem = memo((props) => {
  const navigation = useNavigation();
  const data = props.item;
  const [User, setUser] = useState();
  const { userCurrent } = useContext(UserContext);
  const handleUser = async (id) => {
    const userRef = firebase.firestore().collection("users").doc(id);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      return userData;
    } else {
      console.log("Không tìm thấy người dùng.");
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await handleUser(data.userID);
      if (userData) {
        setUser(userData);
      }
    };
    fetchData();
  }, []);

  const [selectImage, setImageUpload] = useState(data.images);
  const [isLiked, setIsLiked] = useState(false);
  const [arrlike, setArrlike] = useState(1);
  const [numberLike, setNumber] = useState(data.quantityLike);
  const [userLike, setUserLike] = useState(false);
  const index = 1;
  let soluongTim = numberLike;

  const handleLike = async () => {
    let Liked = !isLiked;
    setIsLiked(Liked);
    if (isLiked == false) {
      soluongTim = soluongTim + 1;
      setNumber(soluongTim);
    } else if (isLiked == true) {
      if (soluongTim > 0) {
        soluongTim = soluongTim - 1;
        setNumber(soluongTim);
      }
    }
    try {
      const postRef = await firebase
        .firestore()
        .collection("posts")
        .doc(data.id);
      const postDoc = await postRef.get();
      const postData = postDoc.data();
      const existingLike = await postData.ArrUserlike.find(
        (like) => like.userID == props.userDn
      );
      console.log(existingLike);
      if (existingLike) {
        existingLike.trangthai = Liked;
        await postRef.update({
          ArrUserlike: postData.ArrUserlike,
          quantityLike: soluongTim,
        });
      } else if (!existingLike) {
        const newUserLike = {
          userID: props.userDn,
          trangthai: Liked, 
        };
        postData.ArrUserlike.push(newUserLike);
        await postRef.update({
          ArrUserlike: postData.ArrUserlike,
          quantityLike: soluongTim,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tym = async () => {};
  const DetaiHandress = () => {
    if (User.userID === userCurrent.userID) {
      navigation.navigate("Infor");
    }
    navigation.navigate("SeeDetails",User);
  };
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImage, setImage] = useState(false);
  const [quyen, setquyen] = useState("");
  useEffect(() => {
    const renderImgae = () => {
      data.ArrUserlike.forEach((item) => {
        if (item.userID ===userCurrent.userID) {
          setIsLiked(item.trangthai);
          setUserLike(true);
        }
      });
      if (selectImage.length > 0) {
        setImage(true);
      } else {
        setImage(false);
      }
      if (props.item.Pemission === "public") {
        setquyen("public");
      } else if (props.item.Pemission === "Private") {
        setquyen("privacy-tip");
      }
    };
    renderImgae();
  }, []);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Bài viết ",
        Uil: data.ArrUserlike,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  // su ly modal cho  binh luan
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const handleBackdropPress = () => {
    setIsVisible(false);
  };
  const [isVisibleS, setIsVisibleS] = useState(false);
  useEffect(() => {
    // Sử dụng setTimeout để đặt isVisible thành true sau 2 giây
    const timer = setTimeout(() => {
      setIsVisibleS(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [soluongCmt, setSoluongcmt] = useState(data.quantityComment);
  const [Noidung, setNoiDung] = useState("");
  const [binhluan, setBinhLuan] = useState("");
  const [parentId, setParentId] = useState(null);
  const [CommentChildren, setCommentChildren] = useState([]);
  const handleTextInputChange = (text) => {
    setNoiDung(text);
  };
  const setquatyCmt = (soluongCmt) => {
     setSoluongcmt(soluongCmt)
   }
  const selectCommet = async () => {
    try {
      const commentQuery = await firebase
        .firestore()
        .collection("CommentPost")
        .where("idBaiviet", "==", data.id)
        .get();
      if (commentQuery) {
        const comments = [];
        commentQuery.forEach((doc) => {
          const commentData = doc.data();
          let userCmt = handleUser(commentData.UserCmt);
          comments.push(commentData);
        });
        setBinhLuan(comments);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bình luận: ", error);
    }
  };
  const SendComment = async () => {
    let soluong = soluongCmt + 1;
    setSoluongcmt(soluong);
    console.log(parentId);
    const postRef = await firebase.firestore().collection("posts").doc(data.id);
    if (Noidung == "") {
      return null;
    }
    let noidung = Noidung;
    setNoiDung("");
    await firebase.firestore().collection("Comments").where;
    try {
      if (postRef) {
        if (parentId) {
          const AddIdCmtChildren = await firebase
            .firestore()
            .collection("CommentPost")
            .doc(parentId);
          const comement = {
            UserCmt: props.userDn,
            idBaiviet: data.id,
            Noidung: noidung,
            idComent: parentId,
            Dinhdanh: "Children",
            Timer: new Date().toISOString().slice(0, -5),
          };
          AddIdCmtChildren.update({
            arrCmt: firebase.firestore.FieldValue.arrayUnion(comement),
          });
        } else if (!parentId) {
          const commentRef = await firebase
            .firestore()
            .collection("CommentPost")
            .doc();
          commentRef.set({
            UserCmt: props.userDn,
            idBaiviet: data.id,
            Noidung: noidung,
            idComent: commentRef.id,
            arrCmt: [],
            Dinhdanh: "Parent",
            Timer: new Date().toISOString().slice(0, -5),
          });
        }
      }
      setSoluongcmt(soluong);
      setBinhLuan("");
      setParentId(null);
      await postRef.update({
        quantityComment: soluong,
      });
    } catch (err) {
      console.log(err + "Lỗi gữi comment đi ");
    }
    selectCommet();
  };
  const [changecmt, setChangeCmt] = useState(false);
  useEffect(() => {
    selectCommet(changecmt);
    setChangeCmt(false);
    selectCommet();
  }, [changecmt]);
  return (
    <View style={styles.contain}>
      <View style={styles.view1}>
        <TouchableOpacity
          onPress={DetaiHandress}
          style={{ flexDirection: "row" }}
        >
          {User ? (
            <Image style={styles.img3} source={{ uri: User.avatar }}></Image>
          ) : (
            <Text>Loadding</Text>
          )}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={styles.view10}>
              {User ? (
                <Text style={styles.title}>{User.DisplayName}</Text>
              ) : (
                <Text>Loadding</Text>
              )}
              <TimeAgo
                style={{ fontSize: 12, color: "blue" }}
                time={data.Timer}
              />
            </View>
            <View style={styles.view12}>
              {User ? (
                <MaterialIcons name={data.Permission} size={20} color="blue" />
              ) : (
                <Text>Loadding</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10, paddingHorizontal: 6 }}>
        <Text style={styles.txtx}>{data.text}</Text>
        <Text style={styles.txtx}>{data.feeling}</Text>
      </View>
      {showImage == true && (
        <Swiper style={{ position: "relative", height: 450 }} loop={true}>
          {selectImage.map((image, index) => (
            <View key={index}>
              <View style={styles.swip}>
                <Text>
                  {index + 1}/{selectImage.length}
                </Text>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsViewerOpen(true);
                  setCurrentImageIndex(index);
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "auto",
                    height: 440,
                    zIndex: 0,
                  }}
                />
              </TouchableWithoutFeedback>
              {isViewerOpen && (
                <Modal visible={true} transparent={true}>
                  <ImageViewer
                    imageUrls={selectImage}
                    index={currentImageIndex}
                    onSwipeDown={() => setIsViewerOpen(false)}
                    enableSwipeDown={true}
                  />
                </Modal>
              )}
            </View>
          ))}
        </Swiper>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: color.white,
        }}
      >
        <Text style={{ fontSize: 20, color: "#555555" }}>
          {numberLike >= 1000
            ? (numberLike / 1000).toFixed(1) + "k"
            : numberLike}{" "}
          Like
        </Text>
        <Text style={{ fontSize: 20, color: "#555555" }}>
          {" "}
          {soluongCmt} Bình luận
        </Text>
      </View>
      <View
        style={{ width: "100%", height: 1,marginTop:3, backgroundColor: "#DDDDDD" }}
      ></View>
      <View style={styles.view8}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={handleLike}
        >
          <AntDesign
            name="heart"
            size={24}
            color="white"
            color={isLiked ? "red" : "#EEEEEE"}
          />

          <Text style={{ color: "black" }}> Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            selectCommet();
            setIsVisible(true);
          }}
        >
          <EvilIcons name="comment" size={34} color="black" />
          <Text style={{ color: "black" }}> Comemnt</Text>
        </TouchableOpacity>

        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View style={styles.view6}>
              <View style={styles.view4}>
                <Text style={{ fontSize: 18 }}>
                  {numberLike >= 1000
                    ? (numberLike / 1000).toFixed(1) + "k"
                    : numberLike}{" "}
                  <AntDesign name="heart" size={20} color="red" /> Người Thích
                  bài viết này{" "}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <FlatList
                  style={{ flex: 0.9, backgroundColor:color.background }}
                  data={binhluan}
                  renderItem={({ item, index }) => {
                    return (
                      <Coment
                        item={item}
                        index={index}
                        userdn={props.userDn}
                        navigation={props.navigation}
                        handleTextInputChange={handleTextInputChange}
                        idbaiviet={data._id}
                        setParentId={setParentId}
                        quantityComment={soluongCmt}
                        setquantityComment={setquatyCmt}
                        changercmt={setChangeCmt}
                      />
                    );
                  }}
                />
              </View>
              <View style={styles.view7}>
                <Text style={{justifyContent:'flex-start'}}>Quy tắc</Text>
                <TextInput
                  placeholder="Viết bình luận ... "
                  style={styles.txt1}
                  // placeholderTextColor={"white"}
                  multiline
                  onChangeText={handleTextInputChange}
                  underlineColorAndroid="transparent"
                  value={Noidung}
                  
                ></TextInput>
                <View style={styles.view3}>
                  <View style={styles.view3_3}>
                    <TouchableOpacity>
                      <Entypo name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchH}>
                      <Entypo name="image" size={24} color="green" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={SendComment}
                  >
                    <Ionicons name="md-send-sharp" size={20} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            onShare();
          }}
        >
         <MaterialCommunityIcons name="share-all-outline" size={24} color="black" />
          <Text style={{ color: "black" }}> share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default FlatItem;
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor:"white",
    marginTop: 10,
    elevation:9,
    paddingTop:10,
    borderRadius:7
  },
  view1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modal2: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  view3: {
    justifyContent: "space-between",
    width: "100%",
    height: 25,
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  view3_3: {
    flexDirection: "row",
    width: "50%",
  },
  txt1: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    padding: 6,
    color: "black",
  },
  view4: {
    backgroundColor: "#EEEEEE",
    width: "100%",
    height: 40,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  view6: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  touch2: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  view7: {
    width: "100%",
    height: 100, 
    justifyContent: "space-between",
    paddingHorizontal:4,
  },
  touch3: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  view8: {
    height: 50,
    flexDirection: "row",
    backgroundColor:color.white,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  img3: {
    width: 44,
    height: 44,
    borderRadius: 100,
    marginHorizontal: 6,
   
  },
  view10: {
    justifyContent: "center",
    alignItems: "center",
  },
  view12: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  txtx: {
    color: "black",
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
  },
  touchH: {
    marginLeft: 10,
  },
  swip: {
    width: 40,
    height: 30,
    backgroundColor: "rgba(192,192,192, 0.5)",
    position: "absolute",
    borderRadius: 15,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    right: 15,
  },
});
