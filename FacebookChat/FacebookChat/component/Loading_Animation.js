import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import color from '../color/color'

const Loading_Animation = () => {
  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
        <Image source={require('../assets/loading_white.gif')}/>
    </View>
  )
}

export default Loading_Animation

const styles = StyleSheet.create({
    container:{
     
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'rgba(0,0,0,0.3)',
       zIndex:1
    },
})