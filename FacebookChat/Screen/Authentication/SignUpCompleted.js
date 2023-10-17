import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import color from '../../color/color';

const SignUpCompleted = ({ navigation }) => {
    const handleLogin = () => {
         navigation.navigate("Login")
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <AntDesign name="checkcircle" size={70} color="#06c409" />
                <Text style={styles.txt}>Đăng ký thành công</Text>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                onPress={handleLogin}
                style={styles.btn}>
                    <Text style={styles.txtBtn} >Quay về đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUpCompleted
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    body:{
        flex:2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:10
    },
    btn:{
        width:'80%',
        height:50,
        marginTop:50,
        backgroundColor:color.primary,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    },
    txtBtn:{
        fontSize:17,
        fontWeight:'bold',
        color:color.white
    }

});