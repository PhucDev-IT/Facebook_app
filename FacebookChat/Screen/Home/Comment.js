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

import { Entypo } from "@expo/vector-icons";
import { React, useState, useRef, useEffect, memo } from "react";

const Coment = (props) => {
  // const datamini = [{ index: 1, data: "1" }];
  // const [user, setUser] = useState(props.item.User);
  // const [Data, setData] = useState(props.item);
  // const [Noidung, setNoiDung] = useState(Data.Content);
  // const [soluongCmt, setSoluongcmt] = useState(Data.soluongcmt);
  // const [cmtChidren, setCmchildren] = useState(Data.ChidrenCpnent);
  // const handleReplyClick = () => {
  //     props.handleTextInputChange(user.Hoten);
  //       props.setParentId(Data._id);
  // };

  // const [ChidrenCpnent, setComponent] = useState(false);
  // useEffect(() => {
  //   const CommentChildren = () => {
  //     if (cmtChidren) {
  //       setComponent(true);
  //     } else {
  //       setCmchildren(false);
  //     }
  //   };
  // }, []);
  // const FlaitcommentChildren = () => {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         marginTop: 10,
  //         width: "90%",
  //       }}
  //     >
  //       <TouchableOpacity
  //         onPress={() => props.navigation.navigate("SeeDeTail", user)}
  //       >
  //         <Image
  //           style={{ width: 45, height: 45, borderRadius: 40 }}
  //           source={{ uri: user.Avatar }}
  //         ></Image>
  //       </TouchableOpacity>

  //       <View
  //         style={{
  //           height: "auto",
  //           marginLeft: 5,
  //         }}
  //       >
  //         <View
  //           style={{
  //             backgroundColor: "#333333",
  //             paddingHorizontal: 17,
  //             borderRadius: 10,
  //             marginHorizontal: 10,
  //           }}
  //         >
  //           <TouchableOpacity>
  //             <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
  //               {user.Hoten}
  //             </Text>
  //           </TouchableOpacity>
  //           <Text style={{ color: "white" }}>{Noidung}</Text>
  //         </View>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "space-between",
  //             marginHorizontal: 15,
  //           }}
  //         >
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               justifyContent: "space-between",
  //               marginHorizontal: 15,
  //               width: 160,
  //             }}
  //           >
  //             <TimeAgo
  //               style={{ color: "blue" }}
  //               time={Data.createdAt}
  //               hideAgo={true}
  //             />
  //             <TouchableOpacity>
  //               <Text>Like</Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity onPress={handleReplyClick}>
  //               <Text>Reply</Text>
  //             </TouchableOpacity>
  //           </View>
  //           <Text>Thích</Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <View>
      <View
        style={styles.view1}
      >
        <TouchableOpacity
        
        >
          <Image
            style={{ width: 45, height: 45, borderRadius: 40 }}
           
          ></Image>
        </TouchableOpacity>

        <View
          style={{
            height: "auto",
            marginLeft: 5,
          }}
        >
          <View
            style={styles.view5}
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
        
              </Text>
            </TouchableOpacity>
            {/* <Text style={{ color: "white" }}>{Noidung}</Text> */}
          </View>
          <View
            style={styles.view2}
          >
            <View
              style={styles.view3}
            >
              {/* <TimeAgo
                style={{ color: "blue" }}
              //   time={Data.createdAt}
              //   hideAgo={true}
              /> */}
              <TouchableOpacity>
                <Text>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text>Reply</Text>
              </TouchableOpacity>
            </View>
            <Text>Thích</Text>
          </View>
        </View>
      </View>
      {/* {ChidrenCpnent && (
        <View style={{ marginLeft: 60, backgroundColor: "white" }}>
          <FlatList
            data={cmtChidren}
            style={{ flex: 0.9, backgroundColor: "pink" }}
            renderItem={({ item, index }) => {
              return <FlaitcommentChildren />;
            }}
          />
          <TouchableOpacity>
            <Text style={{ color: "blue" }}>xem thêm...</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};
export default Coment;
const styles = StyleSheet.create({
  view1:{
    flexDirection: "row",
    marginTop: 10,
    width: "90%",
  },view2:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },view3:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    width: 160,
}, view5:{
  backgroundColor: "#333333",
  paddingHorizontal: 17,
  borderRadius: 10,
  marginHorizontal: 10,
}
});
