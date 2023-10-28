import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../color/color';
import { firebase } from '../config'
import { ca } from 'date-fns/locale';
const AddFriend = ({ item, UserCurrent }) => {
  const [button,setButton] = useState(item.item.status);

  console.log(item.item.status)

  //-----------------------------Xác nhận kết bạn
  const handleAccept = async () => {
    try {
      // Thực hiện xác nhận cho người dùng hiện tại
      await firebase.firestore().collection('Friends').doc(UserCurrent.userID).collection('userFriends')
        .add({
          MyFriend: item.item
        });

      // Thực hiện xác nhận cho người gửi
      await firebase.firestore().collection('Friends').doc(item.item.userID).collection('userFriends')
        .add({
          MyFriend: UserCurrent
        });

     
      try {
         //Xóa yêu cầu kết bạn
      const query = await firebase.firestore().collection('friendRequests').where('idReceiver', '==', UserCurrent.userID)
      .where('userSend.userID', '==', item.item.userID)
        const querySnapshot = await query.get();

        querySnapshot.forEach((doc) => {
          // Xóa mỗi tài liệu riêng lẻ
          doc.ref.delete();
        });
        console.log('Đã chấp nhận kết bạn')
        setButton('Hủy kết bạn');
      } catch (error) {
        console.log("Lỗi: " + error);
      }
    } catch (error) {
      console.log("Lỗi: " + error);
    }

  }

  //--------------Yêu cầu kết bạn
  const handleAddFriend = async () => {
  
    try {
      await firebase.firestore().collection('friendRequests').add({
        userSend:UserCurrent, //Truyền đẩy đủ 1 obj
        idReceiver: item.item.userID,
        status: 'pending',
        date: new Date(),
      }).then(() => {
        // Xử lý khi thành công
        setButton("Chờ xác nhận")
        console.log('Yêu cầu kết bạn đã được gửi.');
      }).catch((error) => {
        alert('Có lỗi xảy ra: ' + error);
        console.log('Lỗi: ' + error);
      });
    } catch (error) {
      console.log('Lỗi yêu cầu kb: ' + error);
    }
  }
  
  //---------------hủy kết bạn

  const CancelMakeFriend = async ()=>{
    try{
     const querySnapshot =  await firebase.firestore().collection('Friends').doc(UserCurrent.userID)
      .collection('userFriends').where('MyFriend.userID','==',item.item.userID).get();
      querySnapshot.forEach((doc) => {
        // Xóa mỗi tài liệu riêng lẻ
        doc.ref.delete();
      });
      console.log("Đã hủy kết bạn")
      setButton('Thêm bạn bè');
    }catch(error){
      console.log('Lỗi hủy kết bạn: ' + error);
    }
  }

  //----------------Hủy yêu cầu kết bạn
  const HuyYeuCauKetBan = async ()=>{
    try{
     const query =  firebase.firestore().collection('friendRequests')
       .where('idReceiver', '==', UserCurrent.userID)
       .where('userSend.userID', '==', item.item.userID);

       console.log(UserCurrent.userID)
       console.log(item.item.userID)
    

     const querySnapshot = await query.get();
     console.log("size: ",querySnapshot.size)
      querySnapshot.forEach((doc) => {
        // Xóa mỗi tài liệu riêng lẻ
        doc.ref.delete();
      });
      console.log("HUỷ yêu cầu kết bạn thành công");
      setButton('Thêm bạn bè');
    }catch(error){
      console.log('Lỗi hủy kết bạn: ' + error);
    }
  }

  //--------------- XỬ LÝ KẾT BẠN, HỦY KẾT BẠN, XÁC NHẬN,...-------------
  const handleFriend = async (button)=>{
    try{
      switch(button){
        case 'Thêm bạn bè':
          handleAddFriend();
          break;
        case 'Hủy kết bạn':
          CancelMakeFriend();
          break;
        case 'Chờ xác nhận':
 
          HuyYeuCauKetBan();
          break;
          case 'Xác nhận':
            handleAccept();
          break;
      }
    }catch(error){
      console.log('Lỗi hủy kết bạn: ' + error);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: item.item.avatar }} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.item.DisplayName}</Text>
        <View style={styles.containerButton}>
          <TouchableOpacity
             onPress={() => handleFriend(button)}
            style={styles.btn}>
            <Text style={[styles.textBtn, { color: '#ffffff' }]}>{button}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AddFriend;

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 10
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 80
  },
  content: {
    marginLeft: 10,

  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  containerButton: {
    flexDirection: 'row'
  },
  btn: {
    width: 120,
    height: 40,
    backgroundColor: color.primary,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  textBtn: {
    fontSize: 16,
    fontWeight: 'bold'
  },
})