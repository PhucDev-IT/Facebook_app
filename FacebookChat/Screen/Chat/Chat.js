import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import CircleUser from '../../component/CircleUser'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import Layout_Message from '../../component/Layout_Message';
import { useState } from 'react';
const Chat = () => {

  const [friends, setFriends] = useState([
    {
      name: "Nguyễn Văn Phúc",
      url: "data:image/jpeg;base64,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"
    },
    {
      text: 'Nhìn cái éo gì ku',
      name: "Thơ ngây",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YAo3C_QcgCLbDCv2w6EjQKJxMCoonUt72w&usqp=CAU"
    },
    {
      text: 'I love diu',
      name: "Không có tên",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPomCiCBFi0kZ-dMeGAZsYZn-90E2DsZHLQw&usqp=CAU"
    },
    {
      text: 'Đi học không cu?',
      name: "Bé iu",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIyrlpshc6yMqGaU7ekaOafKukHWO2sLJwkwqHSIs2&s"
    },
    {
      text: 'Em ăn cơm chưa>',
      name: "Cô nàng bé bỏng",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQByIzYoEcQA2h-ehKWna44qFBzbCk4l6mMzzE8-ZTu&s"
    },
    {
      text: 'Hết cứu!',
      name: "Hoảng Hốt",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIzVDE1KN9aDtsAwZ8xy7jMAE4hljuXWlICQ&usqp=CAU"
    },
    {
      text: 'Biết phải làm sao, Buồn ghê',
      name: "Ném em xuống hồ",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRED5IrXdU0w0A5U9yv-63UI6tpoPxpwMMjFJ4RHsVyUD9HKQGK00zxG_TGdVJ3qvgsrUA&usqp=CAU"
    },
  ]);


  const renderItem = (item) => {
    return (
      <CircleUser name={item.name} img={item.url} />
    );

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Đoạn chat</Text>
        <TouchableOpacity style={styles.btnSearch}>
          <AntDesign name="search1" size={18} color="black" />
          <Text style={styles.btnSearch_Title}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <FlatList
          horizontal={true}
          data={friends}
          keyExtractor={item => item.name}
          renderItem={({ item }) => <CircleUser name={item.name} img={item.url} />}>
        </FlatList>
      </View>
      <View style={styles.body}>
        <FlatList
          data={friends}
          keyExtractor={item => item.name}
          renderItem={({ item }) => <Layout_Message nameUser={item.name} avt={item.url} lastMessage={item.text} />}>
        </FlatList>
      </View>

    </View>
  )
}
export default Chat
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    paddingTop: 10,
    paddingHorizontal: 5
  },
  header: {
    paddingHorizontal: 15,
  },
  btnSearch: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    height: 45,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 16,
    marginTop: 15,
  },
  btnSearch_Title: {
    marginLeft: 10,
    fontSize: 18,
    color: '#999999'
  },

  body: {
    paddingVertical: 10
  },

})