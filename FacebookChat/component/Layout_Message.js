import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
const Layout_Message = (props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={() => navigation.navigate("ChatDetails")}
            style={styles.btn}>
                <View style={styles.left}>
                    <Image style={styles.img} source={{ uri: props.avt }} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>{props.nameUser}</Text>
                    <Text style={styles.text}>{props.lastMessage}</Text>
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