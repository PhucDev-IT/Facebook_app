
import React from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from 'react-native-paper';
import color from '../../color/color'
import Infor_SignUp from './Infor_SignUp'
const InputAccount_SignUp = ({ navigation }) => {
    const HanldeBack = () => {
        navigation.navigate("Infor_SignUp");
    }
    const HandleCotinute = () =>{
        navigation.navigate("SignUpCompleted")
    }

    const [text, setText] = React.useState("");
    return (
        <ScrollView style={styles.container}>
            <View style={styles.topBack}>
                <TouchableOpacity
                    onPress={HanldeBack}>
                    <Ionicons name="arrow-back-sharp" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Email của bạn là gì?</Text>
                <Text style={styles.text}>Nhập Email có thể dùng để liên hệ với bạn. Và nó sẽ làm tài khoản đăng nhập.</Text>
                <TextInput
                    label="Email"
                    value={text}
                    mode='outlined'
                    onChangeText={text => setText(text)}
                />

                <Text style={[styles.text]}>Bạn cũng sẽ nhận được thông báo của chúng tôi qua Email và có thể chọn không bất cứ lúc nào.</Text>
            </View>

            <View style={styles.containerBtn}>
                <TouchableOpacity
                onPress={HandleCotinute}
                 style={styles.btnContinue}>
                    <Text style={{ color: color.white, fontWeight: '500', fontSize: 15 }}>Tiếp theo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSignUpWithPhone}>
                    <Text style={{ fontWeight: '500', fontSize: 15 }}>Đăng ký bằng số điện thoại</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default InputAccount_SignUp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,

    },
    body: {
        flex: 1,
        marginHorizontal: 15,
        marginTop: 10
    },
    topBack: {
        marginTop: 10,
        marginLeft: 10
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: color.white,
        borderColor: color.placeholderTextColor,
        borderRadius: 20
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',

    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        lineHeight: 20,
        fontSize: 14
    },
    containerBtn: {
        marginHorizontal: 15,
        marginTop: 20
    },
    btnContinue: {
        width: '100%',
        height: 50,
        backgroundColor: color.primary,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    btnSignUpWithPhone: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})