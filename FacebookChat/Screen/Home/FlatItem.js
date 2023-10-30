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
import { React, useState, useRef, useEffect, memo } from "react";

import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const FlatItem = memo((props) => {


  
  const [isLiked, setIsLiked] = useState("");
  const [arrlike, setArrlike] = useState(1);
  const [numberLike, setNumber] = useState(2);
  const index =1;
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
   
  };
  const tym = async () => {};
  const DetaiHandress = () => {
  
  };
  // set phongd to màn hinhg
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const [showImage, setImage] = useState(false);
  const [quyen, setquyen] = useState("");

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
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

  //binh luan
  const [soluongCmt, setSoluongcmt] = useState(1);
  const [Noidung, setNoiDung] = useState("");

  const [parentId, setParentId] = useState(null);
 



  const [CommentChildren, setCommentChildren] = useState([]);

  return (
    <View style={styles.contain}>
      <View
        style={styles.view1}
      >
        <TouchableOpacity
          onPress={DetaiHandress}
          style={{ flexDirection: "row" }}
        >
          <Image
         
            style={styles.img3}
          ></Image>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={styles.view10}
            >
              <Text style={styles.title}>{user.Hoten}</Text>
             
            </View>
            <View
              style={styles.view12}
            >
              {/* <MaterialIcons name={quyen} size={20} color="black" /> */}
              <Text>-Bạn đang ở </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10, paddingHorizontal: 6 }}>
        {/* <Text>{databaiviet.Trangthai}</Text>
        <Text>{databaiviet.Fell}</Text> */}
      </View>
      {/* {showImage == true && (
        <Swiper style={{ position: "relative", height: 450 }} loop={true}>
          {anh.map((image, index) => (
            <View key={index}>
              <View
                style={{
                  width: 40,
                  height: 30,
                  backgroundColor: "rgba(192,192,192, 0.5)",
                  position: "absolute",
                  borderRadius: 15,
                  zIndex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  right: 15,
                }}
              >
                <Text>
                  {index + 1}/{anh.length}
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
                    imageUrls={images}
                    index={currentImageIndex}
                    onSwipeDown={() => setIsViewerOpen(false)}
                    enableSwipeDown={true}
                  />
                </Modal>
              )}
            </View>
          ))}
        </Swiper>
      )} */}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={{ fontSize: 20 }}>{numberLike} Like</Text>
        <Text style={{ fontSize: 20 }}> {soluongCmt} Bình luận</Text>
      </View>
      <View
        style={styles.view8}
      >
        <TouchableOpacity
          style={styles.touch3}
          onPress={handleLike}
        >
          <Text style={{ color: "white" }}>
            <AntDesign
              name="heart"
              size={24}
              color="white"
            //  color={isLiked ? "red" : "white"}
              // color={databaiviet.Like.filter(x => x._id == props.userDn).length > 0 ? "red" : "white"}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={styles.touch2}
        >
          <EvilIcons name="comment" size={34} color="white" />
        </TouchableOpacity>

        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >  
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View
              style={styles.view6}
            >
              <View
                style={styles.view4}
              >
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
                  style={{ flex: 0.9, backgroundColor: "pink" }}
                  data={binhluan}
                  renderItem={({ item, index }) => {
                    return (
                      <Coment
                        item={item}
                        index={index}
                        userdn={props.userDn}
                        navigation={props.navigation}
                        handleTextInputChange={handleTextInputChange}
                        idbaiviet={databaiviet._id}
                        // setParentId={setParentId}
                      />
                    );
                  }}
                />
              </View>
              <View
                style={styles.view7}
              >
                <TextInput
                  placeholder="Comment "
                  style={styles.txt1}
                  placeholderTextColor={"white"}
                  multiline
                  onChangeText={handleTextInputChange}
                  underlineColorAndroid="transparent"
                  value={Noidung}
                ></TextInput>

                <View
                  style={styles.view3}
                >
                  <View
                    style={styles.view3_3}
                  >
                    <TouchableOpacity>
                      <Entypo name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Entypo name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Entypo name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Entypo name="camera" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={SendComment}>
                    <Ionicons name="md-send-sharp" size={24} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            onShare();
          }}
          style={styles.modal2}
        >
          <Text style={{ color: "white" }}>
            <FontAwesome name="share" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default FlatItem;
const styles = StyleSheet.create({
contain: { flex: 1 },
view1:{
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},modal2:{
  backgroundColor: "black",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  borderColor: "white",
  borderWidth: 2,
},view3:{
  justifyContent: "space-between",
  width: "100%",
  height: 25,
  paddingHorizontal: 5,
  alignItems: "center",
  flexDirection: "row",
},view3_3:{
  flexDirection: "row",
  justifyContent: "space-between",
  width: "50%",
  marginTop: 4,
},txt1:{
  width: "100%",
  height: 45,
  borderRadius: 10,
  backgroundColor: "#BBBBBB",
  padding: 4,
},view4:{
  backgroundColor: "orange",
  width: "100%",
  height: 40,
  paddingHorizontal: 16,
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "row",
},view6:{
  flex: 1,
  backgroundColor: "#C0C0C0",
  justifyContent: "flex-end",
},touch2:{
  backgroundColor: "black",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  borderColor: "white",
  borderWidth: 2,
},view7:{
  backgroundColor: "orange",
  width: "100%",
  height: 100, // Đổi chiều cao của header
  padding: 10,
  justifyContent: "space-between",
},touch3:{
  backgroundColor: "black",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  borderColor: "white",
  borderWidth: 2,
},view8:{
  height: 50,
  marginHorizontal: 10,
  flexDirection: "row",
},img3:{
  width: 39,
  height: 44,
  borderRadius: 100,
  marginHorizontal: 6,
},view10:{
  justifyContent: "center",
  alignItems: "center",
},view12:{
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 20,
}
})