import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { firebase } from '../../config'
import { useCallback } from 'react'
import { ca, da } from 'date-fns/locale'
const ChatDetails = ({ route }) => {
  const [messages, setMessages] = useState([])
  const { roomId, UserCurrent, IdFriend } = route.params;
  const [IdConversation, setIdConversation] = useState('');

  //Lấy 20 tin nhắn cuối cùng
  const listConversation = async () => {
    try {
      const query = firebase.firestore().collection('chats').doc(IdConversation).collection('conversation').orderBy('timeSend', 'desc').get();
      query.then((querySnapshot) => {
        // Lấy ra các tài liệu từ kết quả truy vấn
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data); // In ra thông tin của tài liệu đầu tiên trong truy vấn
        });

      }).catch((error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      });

    } catch (error) {
      console.log('Lỗi: ' + error)
    }
  }


  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'data:image/jpeg;base64,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',
  //       },
  //     },
  //   ])
  // }, [])


  // useEffect(() => {
  //   if (IdConversation == null) {
  //     const chatId = IdFriend > UserCurrent.userID ? `${IdFriend + '-' + UserCurrent.userID}` : `${UserCurrent.userID + '-' + IdFriend}`;
  //     setIdConversation(chatId)
  //   }

  //   const query = firebase.firestore().collection('chats').doc(IdConversation).collection('conversation').orderBy('timeSend', 'desc')
  //   const observer = query.onSnapshot(querySnapshot => {
  //     // Xử lý sự thay đổi dữ liệu ở đây
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       console.log(data); // In ra thông tin của tài liệu
  //       setMessages(data);
  //     });
  //   }, err => {
  //     console.log(`Encountered error: ${err}`);
  //   });

  //   return () => {
  //     observer()
  //   }
  // },[])


  const onSend = useCallback((messageArrays) => {
    const msg = messageArrays[0];
    const message = {
      ...msg,
      sentBy: UserCurrent,
      sentTo: IdFriend

    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )

    if (roomId === null) {
      const chatId = IdFriend > UserCurrent.userID ? `${IdFriend + '-' + UserCurrent.userID}` : `${UserCurrent.userID + '-' + IdFriend}`;
      setIdConversation(chatId)
   
    }

    firebase.firestore().collection('chats').doc(IdConversation).set({
      user: {
        ...UserCurrent.userID,
        ...IdFriend
      }
    }).collection('conversation').add({
      ...message,
      timeSend: new Date()
    })

  }, [])


  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: UserCurrent.userID,
      }}
    />
  )
}

export default ChatDetails

const styles = StyleSheet.create({})