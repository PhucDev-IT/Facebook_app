import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import AddFriend from '../../component/AddFriend'
import { useState, useEffect } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { firebase } from '../../config'
import { FlatList } from 'react-native'
import { useRoute } from "@react-navigation/native"
const SearchFriends = ({ navigation }) => {
  const [textInput, setTextInput] = useState('');
  const [listUser, setListUser] = useState([]);

  //Lấy ID người dùng hiện tại
    const route = useRoute()
    const UserCurrent = route.params.data

  //Tìm kiếm bạn bè
  const fetchData = async () => {
    try {
      //Lấy danh sách người dùng
      const querySnapshot = await firebase.firestore().collection('users').orderBy('DisplayName').startAt(textInput).endAt(textInput+'\uf8ff')
        .get();
      const documents = querySnapshot.docs.map(doc => doc.data());

      //Lấy danh sách bạn bè đã kết bạn
      const friendsSnapshot = await firebase.firestore().collection('Friends').doc(UserCurrent.userID).collection('userFriends').get();
      const friendIDs = friendsSnapshot.docs.map(doc => doc.data().MyFriend.userID);
      
      //Lây danh sách user hiện tại đang yêu cầu kết bạn nhưng bị bơ
      const friendRequests = await firebase.firestore().collection('friendRequests').where('userSend.userID','==',UserCurrent.userID).get();
      const firendRequestID = friendRequests.docs.map(doc => doc.data().idReceiver);

      //Lấy danh sách đang chờ user hiện tại xác nhận kết bạn
      const listChoXacNhan = await firebase.firestore().collection('friendRequests').where('idReceiver', '==', UserCurrent.userID).get();
      const IDChoXacNhans = listChoXacNhan.docs.map(doc => doc.data().userSend.userID)

     // Tạo danh sách người dùng với trạng thái "Thêm" hoặc "Hủy kết bạn"
    const userList = documents.map(doc => {
      const isFriend = friendIDs.includes(doc.userID);
      const isSentRequest = firendRequestID.includes(doc.userID);
      const isChoXacNhan = IDChoXacNhans.includes(doc.userID)
      let status = 'Thêm bạn bè';

      if (isFriend) {
        status = 'Hủy kết bạn';
      } else if (isSentRequest) {
        status = 'Chờ xác nhận';
      }else if(isChoXacNhan){
        status = 'Xác nhận'
      }
      return {
        ...doc,
        status,
      };
    });


      setListUser(userList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };


  const handleOnSubmitEditing = () => {
   // if(textInput!='')
      fetchData();
  };


  const handleBack =()=>{
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
        onPress={handleBack}
        style={{ marginTop: 5 }}>
          <Ionicons name="arrow-back-sharp" size={30} color="black" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          onChangeText={text => setTextInput(text)}
          value={textInput}
          placeholder="Tìm kiếm bạn bè"
          onKeyPress={handleOnSubmitEditing}
        />
      </View>
      <View style={styles.body}>
        <FlatList
          data={listUser}
            keyExtractor={(item, index) => index.toString()} // Assuming each document has a unique "id" field
          renderItem={(item) => <AddFriend item = {item} UserCurrent={UserCurrent} /> }
        />
      </View>
    </View>
  )
}

export default SearchFriends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    paddingHorizontal: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    flexDirection: 'row',
    marginTop: 20,
    alignContent: 'center'
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
    backgroundColor: '#DDDDDD',
    fontSize: 16
  },
  body: {
    marginTop: 20
  },


})