import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Entypo } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import color from '../../color/color';
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../../config'
import { UserContext } from '../../UserContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
const DisplayStories = ({ route }) => {
    const { item } = route.params;
    const { userCurrent } = useContext(UserContext);
    const [numberView, setNumberView] = useState(0);
    const [viewers, setViewers] = useState([]);
    const navigation = useNavigation();



    const handleBack = () => {
        navigation.goBack();
    }

    const customSendMessage = () => {
        return (
            <View style={{flexDirection:'row',height:35,justifyContent:'center',alignItems:'center',marginBottom:20}}>
                <TouchableOpacity>
                    <Feather name="camera" size={23} color={color.colorBottomChat} style={{ marginHorizontal: 10, marginBottom: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <FontAwesome name="file-photo-o" size={23} color={color.colorBottomChat} style={{ marginHorizontal: 10, marginBottom: 10 }} />
                </TouchableOpacity>
                <TextInput
                    placeholder="Email"                
                    mode='outlined'
                    onChangeText={text => setEmail(text)}
                    style={{borderWidth: 1,height:35,width:'60%'}}
                />
                <TouchableOpacity >
                   <Text style={{fontSize:25}}>👍</Text>
                </TouchableOpacity>
            </View>
        )
    }



    const showViewFriends = () => {
        return (
            <View style={{ flexDirection: 'row', }}>

                <View style={styles.inputForm}>
                    <Text style={{ color: color.white, fontWeight: '400' }}>Gửi tin nhắn</Text>
                </View>
                <ScrollView horizontal={true}>
                    <TouchableOpacity onPress={() => giveIcon('♥️')}><Text style={styles.icon}>♥️</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => giveIcon('😆')}><Text style={styles.icon}>😆</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => giveIcon('😲')}><Text style={styles.icon}>😲</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => giveIcon('😢')}><Text style={styles.icon}>😢</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => giveIcon('😡')}><Text style={styles.icon}>😡</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => giveIcon('👍')}><Text style={styles.icon}>👍</Text></TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    //Xử lý khi user nhấn vào lượt xem
    const handleClickCounterViewer = () => {
        navigation.navigate("DetailsStory", { sumViewer: numberView, viewers: viewers, thumbnail: item.data.thumbnail })
    }
    const setMyView = () => {
        return (
            <TouchableOpacity
                onPress={handleClickCounterViewer}
                style={{ paddingHorizontal: 10 }}>
                <Entypo name="chevron-small-up" size={24} color="#ffffff" />
                <Text style={{ color: color.white, fontWeight: '600', fontSize: 16 }}>{numberView == 0 ? "Chưa có" : numberView} người xem</Text>
            </TouchableOpacity>

        );
    }


    //Đếm số lượt xem
    useEffect(() => {
        if (item.poster.id != userCurrent.userID) {
            seeStory();

        }
    }, [])

    useEffect(() => {
        if (item.poster.id == userCurrent.userID) {
            getViewer();
        }
    }, [])



    const getViewer = async () => {
        try {
            let listViewer = []
            await firebase.firestore().collection('stories').doc(item.poster.id).collection('itemstories').doc(item.idStory)
                .collection('viewers').get().then((querySnapshot) => {
                    setNumberView(querySnapshot.size);
                    querySnapshot.forEach((doc) => {
                        listViewer.push({
                            userID: doc.id,
                            data: doc.data()
                        })
                    })
                    setViewers(listViewer);
                })
        } catch (error) {
            console.log("Erros get viewer: ", error);
        }
    }

    //Xử lý vào xem và  thả icon
    //Mới vào xem
    const seeStory = async () => {
        try {
            const storyRef = firebase.firestore().collection('stories').doc(item.poster.id).collection('itemstories').doc(item.idStory)
                .collection('viewers').doc(userCurrent.userID).get().then((doc) => {
                    if (!doc.exists) {
                        firebase.firestore().collection('stories').doc(item.poster.id).collection('itemstories').doc(item.idStory)
                            .collection('viewers').doc(userCurrent.userID).set({
                                avatar: userCurrent.avatar,
                                DisplayName: userCurrent.DisplayName,
                                icon: ""
                            })
                    }
                })

        } catch (error) {
            console.log("Error seeing story: ", error);
        }
    }

    const giveIcon = async (icon) => {
        try {
            await firebase.firestore().collection('stories').doc(item.poster.id).collection('itemstories').doc(item.idStory)
                .collection('viewers').doc(userCurrent.userID).set({
                    avatar: userCurrent.avatar,
                    DisplayName: userCurrent.DisplayName,
                    icon: icon
                });
        } catch (error) {
            console.log("Erros give story: ", error);
        }
    }



    return (
        <View style={styles.container}>

            <Video
                source={{ uri: item.data.story }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain" // Chỉnh sửa resizeMode thành 'contain'
                shouldPlay
                style={styles.video}
            />

            <View style={styles.lopPhu}>
                <View style={styles.headerContainer}>
                    <View style={styles.progressVideo}>

                    </View>
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                            <Image style={styles.img} source={{ uri: item.poster.avatar }} />
                            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15 }}>{item.poster.DisplayName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleBack}>
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom}>
                    {item.poster.id == userCurrent.userID ? setMyView() : showViewFriends()}

                </View>
            </View>
        </View>
    )
}

export default DisplayStories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative'
    },
    video: {
        flex: 1,
        marginBottom: 5
    },
    lopPhu: {
        width: '100%',
        height: '100%',
        position: 'absolute',

    },

    headerContainer: {
        height: '93%',
    },
    headerContent: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        height: '7%',
        paddingLeft: 10
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 15
    },
    icon: {
        fontSize: 30,
        marginRight: 10
    },
    inputForm: {
        width: 200,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        paddingLeft: 15,
        marginRight: 15,
        borderWidth: 1,
        borderColor: color.white,

    },

})