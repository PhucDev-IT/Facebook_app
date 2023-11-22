import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
const Layout_MyFriend = (item) => {

  console.log(item.item.MyFriend.DisplayName)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container_btn}>
        <Image style={styles.img} source={{ uri: item.item.MyFriend.avatar }} />
        <View style={styles.content}>
          <Text style={styles.name}>{item.item.MyFriend.DisplayName}</Text>
          <Text style={styles.address}>Việt Nam</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather style={styles.iconMore} name="more-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default Layout_MyFriend

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center'
  },
  container_btn: {
    width:'90%',
    height: 80,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  img: {
    width: 70,
    height: 70,
    borderRadius: 70
  },
  content: {
    marginLeft: 10,
    justifyContent: 'center',
    width: '60%'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

})