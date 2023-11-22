import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React,{useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import { useEffect } from 'react'
import { UserContext } from '../UserContext';
import { useState } from 'react'

const CircleUser = (props) => {
  const navigation = useNavigation();
  const { userCurrent } = useContext(UserContext);
  const [isOnline,setIsOnline] = useState(false)
  const inforRoom = async () => {
   //Lấy tất cả tin nhắn của người dùng hiện tại, sau đó lọc xem có tin nhắn nào đã được tạo với user kia chưa
   const queryRoom = await firebase.firestore().collection('chats').where('user','array-contains',userCurrent.userID).get();

   let roomId = null;

   queryRoom.forEach((doc)=>{
     const data = doc.data();
     for(const item of data.user){
       if(item === props.item.userID){
         roomId = doc.id;
       }
     }
   })
   console.log("Tìm kiếm: ",roomId)
    if(roomId==null){

      roomId = props.item.userID > userCurrent.userID ? `${props.item.userID + '-' + userCurrent.userID}` : `${userCurrent.userID + '-' + props.item.userID}`;
    }

    return roomId;
  };


  useEffect(()=>{
    const fetchChatData = async () => {
      var starCountRef = firebase.database().ref('users/' + userCurrent.userID +'/isOnline'  );
      starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        setIsOnline(data);
      });
    }
    fetchChatData();
    }, [userCurrent.userID]);
    
  

  return (

    <View style={styles.container}>
    <TouchableOpacity
      onPress={async () => {
        const roomId = await inforRoom();
        navigation.navigate("ChatDetails", { roomId: roomId, FriendChat:props.item });
      }}
      style={styles.btn}
    >
      <Image style={styles.img} source={{ uri: props.item.avatar }} />
      <Text style={styles.name}>{props.item.DisplayName}</Text>

      {isOnline?<Image source={require('../assets/icon_online.png')} style={styles.iconOnline} />:null}
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
  },
  iconOnline:{
    width:20,
    height:20,
    position:'absolute',
    bottom:25,
    right:10
  },
})