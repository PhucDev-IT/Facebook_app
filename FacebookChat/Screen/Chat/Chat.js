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
const Chat = ({ navigation, route }) => {
 
  const [message, setListMessages] = useState([]);
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
          const conversationRef = chatsRef.doc(doc.id).collection('conversation').orderBy('timeSend', 'desc').limit(1).get();

          conversationRef.then((querySnapshot) => {
            // Lấy ra các tài liệu từ kết quả truy vấn
            querySnapshot.forEach((doc) => {
              // const data = doc.data();
              // console.log(data); // In ra thông tin của tài liệu đầu tiên trong truy vấn
            });
          }).catch((error) => {
            console.error('Lỗi khi lấy dữ liệu:', error);
          });

        });

        const lastChatMessages = [];
      } catch (error) {
        console.log("Có lỗi khi lấy user: " + error)
      }
    }
    fetchChatData(); // Gọi hàm để lấy dữ liệu khi màn hình được hiển thị
  }, []);




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
          keyExtractor={item => item.name}
          renderItem={({ item }) => <CircleUser item={item} userCurrent={route.params.data} />}>
        </FlatList>
      </View>
      <View style={styles.body}>

        {/* <FlatList
          data={friends}
          keyExtractor={item => item.name}
          renderItem={({ item }) => <Layout_Message nameUser={item.name} avt={item.url} lastMessage={item.text} />}>
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
    paddingVertical: 10
  },

})