import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
const Layout_Message = ({ item,userCurrent }) => {

    const navigation = useNavigation();
    const userChat = item.sentBy.id == userCurrent.userID ? item.sentTo : item.sentBy
   
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>  navigation.navigate("ChatDetails", { roomId: item.idRoom, UserCurrent:userCurrent, FriendChat:userChat })}
                style={styles.btn}>
                <View style={styles.left}>
                    <Image style={styles.img} source={{ uri: userChat.avatar }} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>{userChat.DisplayName}</Text>
                    <Text style={styles.text}>{item.sentBy.id == userCurrent.userID?'Bạn: ':''}{item.lastMess}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Layout_Message
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
       

    },
    btn: {
        height: '100%',
        flexDirection: 'row'
    },
    left: {
        width: 70,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    content: {
        marginLeft: 5,
        justifyContent: 'center'
    },
    name: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: '600'
    },
    text: {
        fontSize: 15,
    }
})