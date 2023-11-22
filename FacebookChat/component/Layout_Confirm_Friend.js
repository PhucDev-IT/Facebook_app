import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../color/color';
import { firebase } from '../config'


const Layout_Confirm_Friend = (props) => {
 
  const handleAccept = async () => {
    try {
      // Thực hiện xác nhận cho người dùng hiện tại
      await firebase.firestore().collection('Friends').doc(props.UserCurrent.userID).collection('userFriends').doc(props.item.userSend.userID)
        .set({
          MyFriend: props.item.userSend
        });

      // Thực hiện xác nhận cho người gửi
      await firebase.firestore().collection('Friends').doc(props.item.userSend.userID).collection('userFriends').doc(props.UserCurrent.userID)
        .set({
          MyFriend: props.UserCurrent
        });

     
      try {
         //Xóa yêu cầu kết bạn
      const query = await firebase.firestore().collection('friendRequests').where('idReceiver', '==', props.UserCurrent.userID)
      .where('userSend.userID', '==', props.item.userSend.userID)
        const querySnapshot = await query.get();

        querySnapshot.forEach((doc) => {
          // Xóa mỗi tài liệu riêng lẻ
          doc.ref.delete();
        });
      } catch (error) {
        console.log("Lỗi: " + error);
      }
        // Sau khi xác nhận, gọi hàm xử lý xác nhận truyền từ Banbe
        props.onAccept(props.item);

    } catch (error) {
      console.log("Lỗi: " + error);
    }

  }

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: props.item.userSend.avatar }} />
      <View style={styles.content}>
        <Text style={styles.name}>{props.item.userSend.DisplayName}</Text>
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={handleAccept}
            style={styles.btn}>
            <Text style={[styles.textBtn, { color: '#ffffff' }]}>Xác nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#E5E4E9' }]}>
            <Text style={styles.textBtn}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Layout_Confirm_Friend;
const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    padding: 5,

  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 90
  },
  content: {
    marginLeft: 10,

  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  containerButton: {
    flexDirection: 'row'
  },
  btn: {
    width: 105,
    height: 35,
    backgroundColor: color.primary,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  textBtn: {
    fontSize: 14,
    fontWeight: 'bold'
  },
})