import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react'
import color from '../color/color';
import { useNavigation } from '@react-navigation/native'
const Story_Item = ({ item }) => {

  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('DisplayStories', { item: item });
  }

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={styles.container} >
      <Image source={{ uri: item.data.thumbnail }} style={styles.backgroundImg} />
      <View style={styles.lopPhu}>
        <View style={styles.header}>

          <View style={styles.imageContainer}>
            <Image source={{ uri: item.poster.avatar }} style={styles.imageAvt} />
          </View>

          <View style={styles.quantityStory}><Text style={{color:color.white}}>1</Text></View>
        </View>
        <Text style={styles.text}>{item.poster.DisplayName}</Text>
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
    marginBottom: 15

  },
  backgroundImg: {
    width: 150,
    height: 200,
    borderRadius: 15

  },
  header: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'

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
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff'
  },
  lopPhu: {
    width:'100%',
    position: 'absolute'
  },
  quantityStory:{
    marginRight:10,
    width:25,
    height:25,
    borderRadius:50,
    borderWidth:1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems:'center',

  }
})