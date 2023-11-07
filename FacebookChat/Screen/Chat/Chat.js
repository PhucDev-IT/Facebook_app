import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import CircleUser from '../../component/CircleUser'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { firebase } from '../../config'
import Layout_Message from '../../component/Layout_Message';

const Chat = ({ navigation, route }) => {
  const [myFriends, setMyFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const userCurrent = route.params.data;


  //Phân trang số lượng đoạn chats
  const currentPage = 1;
  const itemsPerPage = 10;


  //Lấy 20 bạn bè để làm icon đang onl :)
  //Lấy danh sách bạn bè
  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const friends = firebase.firestore().collection('Friends').doc(userCurrent.userID).collection('userFriends')
        const snapshot = await friends.get();

        const requests = snapshot.docs.map((doc) => doc.data());
        setMyFriends(requests);
      } catch (error) {
        console.log("Có lỗi: ", error)
      }

    };

    getFriendRequests();
  }, [userCurrent.userID]);


  //Lấy danh sách tin nhắn
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const chatsRef = firebase.firestore().collection('chats');
        const query = chatsRef.where('user', 'array-contains', userCurrent.userID);

        query.onSnapshot(async (querySnapshot) => {
          let lastMess = [];
        
          for (const doc of querySnapshot.docs) {
            const conversationRef = chatsRef.doc(doc.id).collection('conversation').orderBy('createdAt', 'desc').limit(1);
        
            conversationRef.onSnapshot((querySnapshotRef) => {
              if (querySnapshotRef.size > 0) {
                const docRef = querySnapshotRef.docs[0];
                const data = docRef.data();
                
                // Xóa mục cũ khỏi mảng nếu tồn tại
                const existingIndex = lastMess.findIndex(item => item.idRoom === doc.id);
                if (existingIndex !== -1) {
                  lastMess.splice(existingIndex, 1);
                }
        
                lastMess.push({
                  idRoom: doc.id,
                  lastMess: data.text,
                  sentTo: {
                    DisplayName: data.sentTo.DisplayName,
                    avatar: data.sentTo.avatar,
                    id: data.sentTo.userID,
                  },
                  sentBy: {
                    DisplayName: data.sentBy.DisplayName,
                    avatar: data.sentBy.avatar,
                    id: data.sentBy.userID,
                  },
                });
        
                setMessages(lastMess); // Đặt state sau khi lấy được dữ liệu
              }
            });
          }
        });
        
      } catch (error) {
        console.log("Có lỗi khi lấy thông tin user chat: " + error);
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
        <FlatList
          style={styles.listMess}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Layout_Message item={item} userCurrent={userCurrent} />}
        />
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
    flex: 2,
    paddingVertical: 10,

  },
  listMess: {

  }
})