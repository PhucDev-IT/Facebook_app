import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import color from '../color/color';
import { firebase } from '../config'
import { UserContext } from '../UserContext';
const AddFriend = ({ item }) => {
  const [button, setButton] = useState(item.item.status);
  const { userCurrent } = useContext(UserContext);
  console.log(item.item.status)

  //-----------------------------Xác nhận kết bạn
  const handleAccept = async () => {
    try {
      // Thực hiện xác nhận cho người dùng hiện tại
      await firebase.firestore().collection('Friends').doc(userCurrent.userID).collection('userFriends')
        .add({
          MyFriend: item.item
        });

      // Thực hiện xác nhận cho người gửi
      await firebase.firestore().collection('Friends').doc(item.item.userID).collection('userFriends')
        .add({
          MyFriend: userCurrent
        });


      try {
        //Xóa yêu cầu kết bạn
        const query = await firebase.firestore().collection('friendRequests').where('idReceiver', '==', userCurrent.userID)
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
        userSend: userCurrent, //Truyền đẩy đủ 1 obj
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

  const CancelMakeFriend = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection('Friends').doc(userCurrent.userID)
        .collection('userFriends').where('MyFriend.userID', '==', item.item.userID).get();
      querySnapshot.forEach((doc) => {
        // Xóa mỗi tài liệu riêng lẻ
        doc.ref.delete();
      });
      
      const query = await firebase.firestore().collection('Friends').doc(item.item.userID)
        .collection('userFriends').where('MyFriend.userID', '==', userCurrent.userID).get();
      query.forEach((doc) => {
        // Xóa mỗi tài liệu riêng lẻ
        doc.ref.delete();
      });
      console.log("Đã hủy kết bạn")
      setButton('Thêm bạn bè');
    } catch (error) {
      console.log('Lỗi hủy kết bạn: ' + error);
    }
  }

  //----------------Hủy yêu cầu kết bạn
  const HuyYeuCauKetBan = async () => {
    try {
      const query = await firebase.firestore().collection('friendRequests')
        .where('idReceiver', '==', userCurrent.userID)
        .where('userSend.userID', '==', item.item.userID).get();

      querySnapshot.forEach((doc) => {
        // Xóa mỗi tài liệu riêng lẻ
        doc.ref.delete();
      });
      console.log("HUỷ yêu cầu kết bạn thành công");
      setButton('Thêm bạn bè');
    } catch (error) {
      console.log('Lỗi hủy kết bạn: ' + error);
    }
  }

  //--------------- XỬ LÝ KẾT BẠN, HỦY KẾT BẠN, XÁC NHẬN,...-------------
  const handleFriend = async (button) => {
    try {
      switch (button) {
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
    } catch (error) {
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
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#CC33FF',
    paddingBottom: 10,

  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 80
  },
  content: {
    marginLeft: 10,

  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555555'
  },
  containerButton: {
    flexDirection: 'row'
  },
  btn: {
    width: 110,
    height: 35,
    backgroundColor: '#FF9900',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  textBtn: {
    fontSize: 15,
    fontWeight: 'bold'
  },
})