import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Layout_Confirm_Friend = () => {
  return (
    <View>
      <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIzVDE1KN9aDtsAwZ8xy7jMAE4hljuXWlICQ&usqp=CAU"}} />
      <View>
        <Text>Xin chào cậu</Text>
        <TouchableOpacity>
          <Text>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Layout_Confirm_Friend;