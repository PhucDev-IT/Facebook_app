import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout_Confirm_Friend from '../../component/Layout_Confirm_Friend'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import color from '../../color/color';
const Banbe = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_icon}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
          <Text style={styles.labelText}>Bạn bè</Text>
          <FontAwesome name="search" size={24} color="black" />
        </View>
        <View style={styles.option_header}>
          <TouchableOpacity style={styles.btn_option_elip}>
            <Text style={styles.textOption}>Gợi ý</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_option_elip}>
            <Text style={styles.textOption}>Bạn bè</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{flexDirection:'row', paddingHorizontal:10}}>
          <Text style={styles.labelText}>Lời mời kết bạn</Text>
          <Text style={[styles.labelText,{color:'red',marginLeft:5}]}>12</Text>
        </View>
      </View>
    </View>
  )
}
export default Banbe
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },

  header: {
    flex: 1,
    marginHorizontal:10,
    borderBottomWidth:1,
    borderColor:'black'
  },
  body: {
    flex: 5,
    marginTop:10,
  },

  header_icon:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:10
  },
  option_header:{
    marginTop:25,
    flexDirection:'row'
  },
  btn_option_elip:{
    width:100,
    height:45,
    backgroundColor:'#D9D8DD',
    margin:5,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
  },
  textOption:{
    fontSize:17,
    fontWeight:'bold'
  },
  labelText:{
    fontSize:23,
      fontWeight:'bold'
  },
})