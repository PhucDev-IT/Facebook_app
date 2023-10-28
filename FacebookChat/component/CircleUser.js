import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CircleUser = (props) => {
  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Image style={styles.img} source={{ uri: props.img }} />
        <Text style={styles.name}>{props.name}</Text>
      </TouchableOpacity>
    </View>

  )
}

export default CircleUser;
const styles = StyleSheet.create({
  container: {

    paddingVertical:7,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:5,
  
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
    textAlign:'center',
    bottom:0
  }
})