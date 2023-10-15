import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Pressable,
    Platform

} from 'react-native'

import React, { useMemo, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import color from '../../color/color'

const DangKy = ({ navigation }) => {

    const handlerContinue = () => {
        navigation.navigate("InputAccount_SignUp");
  }
  const handlerHaveAccount = () => {
    navigation.navigate("Login");
}
    const HanldeBack = () => {
        navigation.navigate("Login");
    }
    //Custom radio button choose gender
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Nam',
            value: 'Nam'
        },
        {
            id: '2',
            label: 'Nữ',
            value: 'Nữ'
        }
    ]), []);
    const [selectedId, setSelectedId] = useState();

    //Custom datepicker
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [dateOfBirth, setDateOfBirth] = useState("")
    const isShowDatePicker = () => {
        setShowPicker(!showPicker)
    }

    //Nhận giá trị ngày được chọn
    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS == "android") {
                isShowDatePicker();
                setDateOfBirth(currentDate.toDateString());
            }
        } else {
            isShowDatePicker();
        }
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.topBack}>
                <TouchableOpacity
                    onPress={HanldeBack}>
                    <Ionicons name="arrow-back-sharp" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <FontAwesome5 name="facebook" size={74} color="blue" />
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Đăng ký</Text>
            </View>

            <View style={{ marginHorizontal: 15 }}>
                <View style={styles.fullName}>
                    <TextInput
                        placeholder='Họ'
                        placeholderTextColor={color.placeholderTextColor}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder='Tên'
                        placeholderTextColor={color.placeholderTextColor}
                        style={styles.input}
                    />
                </View>
                <View>

                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            display='spinner'
                            value={date}
                            onChange={onChange}
                        />
                    )}

                    {!showPicker && (
                        <Pressable onPress={isShowDatePicker}>
                            <TextInput
                                placeholder='Ngày sinh'
                                placeholderTextColor={color.placeholderTextColor}
                                editable={false}
                                style={[styles.input, { width: '100%' ,color:'black'}]} >{dateOfBirth}</TextInput>
                        </Pressable>
                    )}

                </View>

                <View style={styles.containerRadio} >
                    <Text style={{ fontSize: 14, margin: 10 }}>Giới tính</Text>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId}
                        layout='row' />
                </View>
                <TouchableOpacity
                onPress={handlerContinue}
                >
                    <View style={styles.btnContinue}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 500 }}>Tiếp</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.bottom}>
                    <TouchableOpacity onPress={handlerHaveAccount}>
                        <Text style={{ fontSize: 16, color: '#1f0bd4' }}>Bạn đã có tài khoản ư?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
export default DangKy
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    topBack: {
        marginTop: 10,
        marginLeft: 10
    },
    header: {

        justifyContent: 'center',
        alignItems: 'center'
    },

    fullName: {
        marginTop: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: "row"
    },

    input: {
        marginTop: 20,
        width: "45%",
        height: 55,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#b7b6b8",
        backgroundColor: color.white,
        paddingHorizontal: 15,
    },

    containerRadio: {
        width: '100%',
        height: 90,
        elevation: 6,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: color.white,
    },
    btnContinue: {
        width: '100%',
        height: 40,
        backgroundColor: '#5294ff',
        marginTop: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        marginTop: 200,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})