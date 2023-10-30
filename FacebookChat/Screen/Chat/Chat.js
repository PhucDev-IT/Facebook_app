import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import CircleUser from '../../component/CircleUser'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import Layout_Message from '../../component/Layout_Message';
import { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { firebase } from '../../config'
import { ca, da } from 'date-fns/locale';
const Chat = ({ navigation, route }) => {
  // <Layout_Message item={item}  />
  const [lastChatMessages, setLastChatMessages] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const userCurrent = route.params.data;
  //Phân trang số lượng đoạn chats
  const currentPage = 1;
  const itemsPerPage = 10;


  //Lấy 20 bạn bè để làm icon đang onl :)
  //Lấy danh sách bạn bè
  useEffect(() => {
    const getFriendRequests = async () => {
      const friends = firebase.firestore().collection('Friends').doc(userCurrent.userID).collection('userFriends')
      const snapshot = await friends.get();

      const requests = snapshot.docs.map((doc) => doc.data());
      
      setMyFriends(requests);
   
    };
    
    getFriendRequests();
  }, [userCurrent.userID]);


  //Lấy danh sách tin nhắn
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const chatsRef = firebase.firestore().collection('chats');
        const query = await chatsRef.where('user', 'array-contains', userCurrent.userID)
        //Lấy cuộc trò chuyện của user hiện tại vs các user khác
        const querySnapshot = await query.get();
        querySnapshot.forEach((doc) => {

          //Sau khi lấy được id cụ thể thì truy xuất chi tiết đoạn chat để lấy tin nhắn cuối cùng
          const conversationRef = chatsRef.doc(doc.id).collection('conversation').orderBy('createdAt', 'desc').limit(1).get();
          conversationRef.then((querySnapshotRef) => {
            if (querySnapshotRef.size > 0) {
              const docRef = querySnapshotRef.docs[0];
              const data = docRef.data();

              const conversation = {
                user1: {
                  name: data.sentTo.DisplayName,
                  avatar: data.sentTo.avatar,
                  id: data.sentTo.userID,
                },
                user2: {
                  name: data.sentBy.DisplayName,
                  avatar: data.sentBy.avatar,
                  id: data.sentBy.userID,
                },
                lastMess: data.text
              };
              setLastChatMessages(conversation);
            }
          });

        })

      } catch (error) {
        console.log("Có lỗi khi lấy thông tin user chat: " + error)
      }
    }

    fetchChatData(); // Gọi hàm để lấy dữ liệu khi màn hình được hiển thị
  }, [userCurrent.userID]);




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Đoạn chat</Text>
        <TouchableOpacity style={styles.btnSearch}>
          <AntDesign name="search1" size={18} color="black" />
          <Text style={styles.btnSearch_Title}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <FlatList
          horizontal={true}
          data={myFriends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CircleUser item={item} userCurrent={route.params.data} />}>
        </FlatList>
      </View>
      <View style={styles.body}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Làm gì có người yêu mà đòi chat</Text>
        {/* <FlatList
          data={lastChatMessages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {console.log(item)}}>
        </FlatList> */}
      </View>

    </View>
  )
}
export default Chat
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    paddingTop: 10,
    paddingHorizontal: 5
  },
  header: {
    paddingHorizontal: 15,
  },
  btnSearch: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    height: 45,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 16,
    marginTop: 15,
  },
  btnSearch_Title: {
    marginLeft: 10,
    fontSize: 18,
    color: '#999999'
  },

  body: {
    paddingVertical: 100,
    justifyContent:'center',
    alignItems:'center',
  },

})