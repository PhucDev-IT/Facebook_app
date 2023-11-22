import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
const TestScreen = () => {
  const navigation = useNavigation();
  const handleClick = ()=>{
    navigation.navigate("ScreenB");
  }
  return (
    <View>
      <Text>TestScreen</Text>
      <Button>Click đi</Button>
    </View>
  )
}

export default TestScreen

const styles = StyleSheet.create({})