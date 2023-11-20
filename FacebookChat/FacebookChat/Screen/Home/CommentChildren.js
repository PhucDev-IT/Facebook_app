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
  Pressable,
} from "react-native";

import { React, useState, useContext, useEffect, memo } from "react";
import TimeAgo from "react-native-timeago";
import { firebase } from "../../config.js";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from '../../UserContext';

const CommentChildren = (props) => {
  const [Data, setData] = useState(props.item);

  const { userCurrent } = useContext(UserContext);
  const [user, setUser] = useState(userCurrent);

  useEffect(() => {
    const handleUser = async () => {
      const userRef = firebase
        .firestore()
        .collection("users")
        .doc(Data.UserCmt);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUser(userData);
      } else {
        console.log("Không tìm thấy người dùng.");
        return null;
      }
    };
    handleUser();
  }, []);
  const [showOptions, setShowOptions] = useState(false);
  const [Item, setItem] = useState("");
  const handleLongPress = (selectedItem) => {
    console.log(selectedItem);
    setShowOptions(true);
    setItem(selectedItem);
  };
  const handleBackdropPress = () => {
    setShowOptions(false);
  };
  const deleteComment = async () => {
    try {
   
      setShowOptions(false);
      props.handeleindex(props.index);
      const parentCommentRef = firebase
        .firestore()
        .collection("CommentPost")
        .doc(props.ParentCommentId);
      const parentCommentDoc = await parentCommentRef.get();

      if (!parentCommentDoc.exists) {
        console.log("Comment cha không tồn tại");
        return;
      }
      const parentCommentData = parentCommentDoc.data();
      // Tìm và xóa comment con từ mảng comment trong comment cha dựa trên index
      const updatedComments = parentCommentData.arrCmt.filter(
        (_, index) => index !== props.index
      );
     const quantityComment=props.quantityComment
      // Update mảng arrCmt trong comment cha
      await parentCommentRef.update({ arrCmt: updatedComments });
      const postRef = firebase.firestore().collection("posts").doc(Item.idBaiviet);
      await postRef.update({quantityComment});
  
      console.log(
        "Comment con đã được xóa thành công từ mảng comment của comment cha"
      );
      props.changercmt(true);
    } catch (error) {
      console.error("Lỗi khi xóa comment con:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("SeeDeTail", user)}
      >
        <Image
          style={{ width: 35, height: 35, borderRadius: 35 }}
          source={{ uri: user.avatar }}
        ></Image>
      </TouchableOpacity>

      <View
        style={{
          height: "auto",
          marginLeft: 5,
        }}
      >
        <Pressable
          onLongPress={() => {
            handleLongPress(Data);
          }}
          android_ripple={{ color: "gray", borderRadius: 10 }}
          style={{
            backgroundColor: "#333333",
            paddingHorizontal: 17,
            borderRadius: 10,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
              {user.DisplayName}
            </Text>
          </TouchableOpacity>

          <Text style={{ color: "white" }}>{Data.Noidung}</Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              width: 160,
            }}
          >
            <TimeAgo
              style={{ color: "blue" }}
              time={Data.Timer}
              hideAgo={true}
            />
            <TouchableOpacity>
              <Text style={{ color: "white" }}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.handleTextInputChange(user.DisplayName + " 👉 ");
                props.setParentId(Data.idComent);
              }}
            >
              <Text style={{ color: "white" }}>Reply</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: "white" }}>Thích</Text>
        </View>
      </View>
      <Modal visible={showOptions} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.modale}>
            <View style={styles.viewmodal}>
              <TouchableOpacity style={styles.touchcmt}>
                <MaterialIcons name="report-problem" size={24} color="black" />
                <Text>Report Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchcmt}>
                <MaterialIcons name="report-problem" size={24} color="black" />
                <Text>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchcmt}>
                <MaterialIcons name="report-problem" size={24} color="black" />
                <Text>Cập nhật </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchcmt}>
                <MaterialIcons name="report-problem" size={24} color="black" />
                <Text>Hide comment</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteComment} style={styles.touchcmt}>
                <AntDesign name="delete" size={24} color="black" />
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
export default CommentChildren;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    width: "90%",
  },
  modale: {
    borderRadius: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  viewmodal: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    flex: 0.32,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingTop: 10,
  },
  touchcmt: {
    marginTop: 10,
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});
