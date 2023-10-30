import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react'
import color from '../color/color';


const Story_Item = ({ item }) => {

  return (
    <TouchableOpacity style={styles.container} >
      <Image source={{ uri: item.item.img }} style={styles.backgroundImg} />
      <View style={styles.lopPhu}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.item.avatar }} style={styles.imageAvt} />
        </View>
        <Text style={styles.text}>{item.item.name}</Text>
      </View>
    </TouchableOpacity>


  )
}

export default Story_Item

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    borderRadius: 15,
    elevation: 4,
    marginRight: 20,
    marginBottom:15

  },
  backgroundImg: {
    width: 150,
    height: 200,
    borderRadius: 15

  },
  imageContainer: {
    margin: 10,
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#3578E5',
    justifyContent: 'center',
    alignItems: 'center',

  },

  imageAvt: {
    width: '100%',
    height: '100%',
    borderRadius: 38,
    margin: 1,
    backgroundColor: 'white'

  },
  text: {
    marginTop: 110,
    marginLeft: 7,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  lopPhu: {
    position: 'absolute'
  }
})