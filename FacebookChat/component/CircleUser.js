import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import { useEffect } from 'react'
const CircleUser = (props) => {
  const navigation = useNavigation();
  console.log(props.item.MyFriend.userID)
  const inforRoom = async () => {
    const query = await firebase.firestore().collection('chats').where('user', 'array-contains', props.item.MyFriend.userID).get();
    
    let roomId = null;
    query.forEach((doc) => {
      roomId = doc.id;
    });
    
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
    width: 80,
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