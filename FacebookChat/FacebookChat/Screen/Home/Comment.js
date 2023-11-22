import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from "react-native";

import { React, useState, useContext, useEffect, memo } from "react";
import TimeAgo from "react-native-timeago";
import { firebase } from "../../config.js";
import CommentChildren from "./CommentChildren.js";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from '../../UserContext';
const Coment = (props) => {
  
  const { userCurrent } = useContext(UserContext);
  const [user, setUser] = useState(userCurrent);

  const [Data, setData] = useState(props.item);

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
  const [soluongCmt, setSoluongcmt] = useState(Data.soluongcmt);
  const [cmtChidren, setCmchildren] = useState(Data.ChidrenCpnent);
  const [parentId, setParentId] = useState(null);
  const handleReplyClick = (text) => {
    console.log("handelenay");
    props.handleTextInputChange(text);
    props.setParentId(parentId);
  };
  
  const handeldeleteIndex = (index) => {
    try {
      // Xóa comment tại index từ mảng Data
      const updatedComments = [...Data];
      updatedComments.splice(index, 1);
        
      // Cập nhật lại state Data sau khi xóa comment
      setData(updatedComments);

      console.log("Comment đã được xóa thành công tại index", index);
    } catch (error) {
      console.error("Lỗi khi xóa comment:", error);
    }
  };
  const [ChidrenCpnent, setComponent] = useState(false);
  useEffect(() => {
    const CommentChildren = () => {
      if (cmtChidren) {
        setComponent(true);
      } else {
        setCmchildren(false);
      }
    };
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

  const [XemThem, setXemThem] = useState(false);

  useEffect(() => {
    const CommentChildren = () => {
      if (Data.arrCmt.length <= 1) {
        setComponent(true);
        setXemThem(false);
      } else if (Data.arrCmt.length > 1) {
        setComponent(false);
        setXemThem(true);
      }
    };
    CommentChildren();
  }, [Data]);
  const hanlderXemThem = () => {
    setComponent(true);
    setXemThem(false);
  };
  const deleteComment = async () => {
    try {
      props.changercmt(true);
      setShowOptions(false);
  
      const DeleteCmt = firebase.firestore().collection("CommentPost");
      await DeleteCmt.doc(Item.idComent).delete();
      const quantityComment = props.quantityComment - 1; // Giảm số lượng bình luận
  
      // Cập nhật số lượng bình luận giảm trong collection "posts"
      const postRef = firebase.firestore().collection("posts").doc(Item.idBaiviet);
      await postRef.update({ quantityComment });
  
      console.log("Bình luận đã được xóa thành công!");
      props.changercmt(true);
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
    }
  };;
  return (
    <View>
      <View style={styles.view1}>
        <TouchableOpacity>
          <Image
            style={{ width: 45, height: 45, borderRadius: 40 }}
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
            android_ripple={{ color: "gray" }}
            style={styles.view5}
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
                {user.DisplayName}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "white" }}>{Data.Noidung}</Text>
          </Pressable>

          <View style={styles.view2}>
            <View style={styles.view3}>
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
      </View>

      <View style={{ marginLeft: 60, backgroundColor: "white" }}>
        {ChidrenCpnent && (
          <FlatList
            style={{ backgroundColor: "#555555" }}
            data={Data.arrCmt}
            renderItem={({ item, index }) => {
              return (
                <CommentChildren
                  item={item}
                  handleTextInputChange={handleReplyClick}
                  setParentId={setParentId}
                  quantityComment={props.quantityComment}
                  setquantityComment={setSoluongcmt}
                  ParentCommentId={Data.idComent}
                  index={index}
                  handeleindex={handeldeleteIndex}
                  changercmt={props.changercmt}
                />
              );
            }}
          />
        )}
        {XemThem && (
          <TouchableOpacity
            onPress={hanlderXemThem}
            style={{ backgroundColor: "#555555" }}
          >
            <Text style={{ color: "blue" }}>
              {Data.arrCmt.length} xem thêm...
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal visible={showOptions} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View
            style={{
              borderRadius: 10,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
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
export default Coment;
const styles = StyleSheet.create({
  view1: {
    flexDirection: "row",
    marginTop: 10,
    width: "90%",
  },
  view2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  view3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    width: 160,
  },
  view5: {
    backgroundColor: "#333333",
    paddingHorizontal: 17,
    borderRadius: 10,
    marginHorizontal: 10,
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
