import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { firebase } from '../../config'
import { useCallback } from 'react'
import color from '../../color/color'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const ChatDetails = ({ route }) => {
  const [messages, setMessages] = useState([])
  const { roomId, UserCurrent, FriendChat } = route.params;



  useEffect(() => {

    console.log('key: '+roomId)
    const chatRef = firebase.firestore().collection('chats').doc(roomId).collection('conversation').orderBy('createdAt', 'desc');

    const unsubscribe = chatRef.onSnapshot((snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.sentBy.userID, // ID của người gửi tin nhắn
            name: data.sentBy.DisplayName,
            avatar: data.sentBy.avatar,
          },
        };
      });

      setMessages(newMessages);
    });

    return () => {
      unsubscribe();
    };
  }, [])


  const onSend = useCallback((messageArrays) => {
    const msg = messageArrays[0];
    const message = {
      ...msg,
      sentBy: UserCurrent,
      sentTo: FriendChat

    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )


    firebase.firestore().collection('chats').doc(roomId).set({
      user: [UserCurrent.userID,FriendChat.userID]
  
    }).then(() => {
      // Sau khi tài liệu "chats" được tạo hoặc cập nhật thành công, bạn có thể thêm dữ liệu vào collection "conversation".
      firebase.firestore().collection('chats').doc(roomId).collection('conversation').add({
        ...message,
      }).then(() => {
        // Dữ liệu đã được thêm thành công
      }).catch((error) => {
        console.error('Lỗi khi thêm dữ liệu vào collection "conversation":', error);
      });
    }).catch((error) => {
      console.error('Lỗi khi tạo hoặc cập nhật tài liệu "chats":', error);
    });

  }, [])


  //Custom
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'red'
          },
          left: {
            backgroundColor: '#ffffff'
          }
        }}

        textStyle={{
          right: {
            color: color.white
          }
        }}
      >
      </Bubble>
    );
  }

  const scrollToBottomComponent = () => {
    return (
      <AntDesign name="arrowdown" size={24} color="black" />
    );
  }

  //Custom nút gửi
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <Ionicons name="send" size={23} color="#CC33FF" style={{ marginHorizontal: 10, marginBottom: 10 }} />
        </View>
      </Send>
    );
  }




  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="ios-arrow-back-sharp" size={28} color="#FF9900" />
        <Image style={styles.img} source={{ uri: FriendChat.avatar }} />
        <Text style={{fontSize:17, fontWeight:'bold'}}>{FriendChat.DisplayName}</Text>
      </View>
      <View style={styles.body}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: UserCurrent.userID,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        scrollToBottom  //Hiển thị nút cuộn nhanh
        scrollToBottomComponent={scrollToBottomComponent}
      />
      </View>
    </View>

  )
}

export default ChatDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },

  header: {
    height:'7%',
    elevation: 7,
    backgroundColor:'#FEFEFE',
    paddingVertical:10,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10
  },
  body:{
    height:'93%',
  },
  img:{
    width:40,
    height:40,
    borderRadius:40,
    marginLeft:15,
    marginRight:10
  },
})