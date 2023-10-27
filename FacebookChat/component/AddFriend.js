import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../color/color';
import { firebase } from '../config'
import { ca } from 'date-fns/locale';
const AddFriend = ({ item, UserCurrent }) => {
  const [button,setButton] = useState("Thêm bạn bè");
  
  const handleAddFriend = async () => {
    if(button != 'Thêm bạn bè'){
      return;
    }
    try {
      await firebase.firestore().collection('friendRequests').add({
        userSend:UserCurrent,
        idReceiver: item.item.userID,
        status: 'pending',
      }).then(() => {
        // Xử lý khi thành công
        setButton("Hủy")
        console.log('Yêu cầu kết bạn đã được gửi.');
      }).catch((error) => {
        alert('Có lỗi xảy ra: ' + error);
        console.log('Lỗi: ' + error);
      });
    } catch (error) {
      console.log('Lỗi: ' + error);
    }
  }
  

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: item.item.avatar }} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.item.DisplayName}</Text>
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={handleAddFriend}
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