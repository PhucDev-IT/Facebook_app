import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState,useContext, useEffect } from 'react'
import Layout_Confirm_Friend from '../../component/Layout_Confirm_Friend'
import { UserContext } from '../../UserContext';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import color from '../../color/color';
import { useRoute } from "@react-navigation/native"
import { firebase } from '../../config'
const Banbe = ({ navigation }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestCount, setFriendRequestCount] = useState(0);
  const { userCurrent } = useContext(UserContext);

  //Lấy ID người dùng hiện tại
  const idUserCurrent = userCurrent.userID;


  const handleClickSearch = () => {
    navigation.navigate("SearchFriends")
  }

  const handleClickMyFriend = () => {
    navigation.navigate("MyFriendScreen")
  }

  //Lấy danh sách lời mời kết bạn
  useEffect(() => {
    const getFriendRequests = async () => {
      const friendRequestsRef = firebase.firestore().collection('friendRequests').where('idReceiver', '==', idUserCurrent)

      const snapshot = await friendRequestsRef.get();

      const requests = snapshot.docs.map((doc) => doc.data());
      setFriendRequests(requests);
    };

    getFriendRequests();
  }, [idUserCurrent]);

  //Đếm số lượng kết bạn
  useEffect(() => {

    const unsubscribe = firebase.firestore().collection('friendRequests').where('idReceiver', '==', idUserCurrent)
      .onSnapshot((querySnapshot) => {
        setFriendRequestCount(querySnapshot.size); // Cập nhật số lượng lời mời kết bạn khi có thay đổi
      });

    return () => {
      unsubscribe(); // Hủy theo dõi khi unmount component
    };
  }, [idUserCurrent]); // Theo dõi khi userID thay đổi

  // Hàm xử lý xác nhận lời mời kết bạn
  const handleAcceptFriendRequest = (acceptedRequest) => {
    // Gọi hàm xử lý xác nhận ở đây và truyền dữ liệu của lời mời kết bạn
    // Sau khi xác nhận, cập nhật lại danh sách và số lượng lời mời kết bạn
    const updatedFriendRequests = friendRequests.filter((request) => request !== acceptedRequest);
    setFriendRequests(updatedFriendRequests);
    setFriendRequestCount(updatedFriendRequests.length);
  }

  const handleBack = () => {
    navigation.navigate("")
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_icon}>
          <View></View>
          <Text style={styles.labelText}>Bạn bè</Text>
          <TouchableOpacity
            onPress={handleClickSearch}
          ><FontAwesome name="search" size={24} color="black" /></TouchableOpacity>
        </View>
        <View style={styles.option_header}>
          <TouchableOpacity style={styles.btn_option_elip}>
            <Text style={styles.textOption}>Gợi ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleClickMyFriend}
            style={styles.btn_option_elip}>
            <Text style={styles.textOption}>Bạn bè</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <Text style={styles.labelText}>Lời mời kết bạn</Text>
          <Text style={[styles.labelText, { color: 'red', marginLeft: 5 }]}>{friendRequestCount}</Text>
        </View>
        <FlatList
          data={friendRequests}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Layout_Confirm_Friend item={item} onAccept={handleAcceptFriendRequest} UserCurrent={userCurrent} />}
        />
      </View>
    </View>
  )
}
export default Banbe
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FEFEFE'
  },

  header: {
    flex: 1,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#996600',
  },
  body: {
    flex: 5,
    marginTop: 10,
  },

  header_icon: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  option_header: {
    marginTop: 25,
    flexDirection: 'row'
  },
  btn_option_elip: {
    width: 100,
    height: 40,
    backgroundColor: '#D9D8DD',
    margin: 5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textOption: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  labelText: {
    fontSize: 23,
    fontWeight: '600',
    color:'#444444'
  },
})