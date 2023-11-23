import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import color from '../../color/color';
import { firebase } from '../../config'
import * as FileSystem from 'expo-file-system'
import { UserContext } from '../../UserContext';
import { add } from 'date-fns';


const PreviewStory = ({ route }) => {
    const { userCurrent } = useContext(UserContext);
    const MY_TASK_NAME = 'videoUploadTask';
    const { videoPath, thumbnailPath } = route.params;
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    }

    const handleUploadVideo = async () => {
        alert('Video đang được tải lên');
        pushSotry();
        navigation.goBack();
    };

    //Đẩy video  lên firebase
    const pushSotry = async () => {
        const urlStory = await pushImage("stories", videoPath);
        const urlThumbnail = await pushImage("thumbnail", thumbnailPath);
        await addStory(urlStory, urlThumbnail);
    }

    const pushImage = async (pathParent, uriImg) => {
        try {
            const { uri } = await FileSystem.getInfoAsync(uriImg);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Mạng không ổn định'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send();
            });
            const filename = `${Date.now()}`;
            const ref = firebase.storage().ref().child(pathParent + '/' + filename);
            await ref.put(blob);

            // Lấy download URL của tệp đã tải lên
            const downloadURL = await ref.getDownloadURL();
            return downloadURL;

        } catch (error) {
            console.log('Có lỗi khi upload photo: ', error)
        }
    }

    //Thêm story vào firebase
    const addStory = async (urlStory, urlThumbnail) => {

        const now = new Date();
        const endTime = add(now, { days: 1 });
        try {
            await firebase.firestore().collection('stories').doc(userCurrent.userID)
                .collection("itemstories").add({
                    createdAt: now,
                    endTime: endTime,
                    idUser: userCurrent.userID,
                    thumbnail: urlThumbnail,
                    story: urlStory
                })
        } catch (error) {
            console.log('Có lỗi khi upload story: ', error)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handleBack}
                style={{ marginLeft: 10, marginTop: 5 }}>
                <Ionicons name="ios-arrow-back-sharp" size={28} color='#ffffff' />
            </TouchableOpacity>

            <Video
                source={{ uri: videoPath }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                isLooping
                style={styles.video}
            />
            <TouchableOpacity
                onPress={handleUploadVideo}
                style={styles.btnShare}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#ffff', marginRight: 15 }}>Chia sẽ ngay</Text>
                <Ionicons name="send" size={22} color={color.white} style={{ marginTop: 4 }} />
            </TouchableOpacity>
        </View>
    )
}

export default PreviewStory


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    video: {
        width: '100%',
        height: '87%',
        marginBottom: 5
    },

    btnShare: {
        width: 180,
        height: 45,
        backgroundColor: '#4199FA',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 150

    },

});
