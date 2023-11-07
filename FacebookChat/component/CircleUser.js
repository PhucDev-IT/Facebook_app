import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import { useEffect } from 'react'


const CircleUser = (props) => {
  const navigation = useNavigation();
 
  const inforRoom = async () => {
   //Lấy tất cả tin nhắn của người dùng hiện tại, sau đó lọc xem có tin nhắn nào đã được tạo với user kia chưa
   const queryRoom = await firebase.firestore().collection('chats').where('user','array-contains',props.userCurrent.userID).get();

   let roomId = null;

   queryRoom.forEach((doc)=>{
     const data = doc.data();
     for(const item of data.user){
       if(item === props.item.MyFriend.userID){
         roomId = doc.id;
       }
     }
   })
   console.log("Tìm kiếm: ",roomId)
    if(roomId==null){

      roomId = props.item.MyFriend.userID > props.userCurrent.userID ? `${props.item.MyFriend.userID + '-' + props.userCurrent.userID}` : `${props.userCurrent.userID + '-' + props.item.MyFriend.userID}`;
    }

    return roomId;
  };


  return (

    <View style={styles.container}>
    <TouchableOpacity
      onPress={async () => {
        const roomId = await inforRoom();
        navigation.navigate("ChatDetails", { roomId: roomId, UserCurrent:props.userCurrent, FriendChat:props.item.MyFriend });
      }}
      style={styles.btn}
    >
      <Image style={styles.img} source={{ uri: props.item.MyFriend.avatar }} />
      <Text style={styles.name}>{props.item.MyFriend.DisplayName}</Text>
    </TouchableOpacity>
  </View>
  

  )
}

export default CircleUser;
const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,

  },
  btn: {
    width: 85,
    height: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly', // Để căn đều các phần tử theo chiều dọc

  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 5,

  },
  name: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
    bottom: 0
  }
})