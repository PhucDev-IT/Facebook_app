import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import color from '../../color/color';
import { firebase } from '../../config'
import * as FileSystem from 'expo-file-system'
import * as TaskManager from 'expo-task-manager';


const PreviewStory = ({ route }) => {
    const MY_TASK_NAME = 'videoUploadTask';
    const { videoPath, userCurrent } = route.params;
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        // Định nghĩa tác vụ nền ở đây
        TaskManager.defineTask(MY_TASK_NAME, ({ data, error }) => {
          if (error) {
            console.error('Task error:', error);
            return;
          }
    
          if (data) {
            // Thực hiện tác vụ tải video lên Firebase ở đây
            const { path } = data;
            pushSotry(path);
          }
        });
      }, []);


    const handleUploadVideo = async () => {
        // Đăng ký tác vụ nền
        await TaskManager.registerTaskAsync(MY_TASK_NAME, {
            videoPath,
        });

        // Quay trở lại màn hình Story
        navigation.goBack();
    };





    //Đẩy video  lên firebase
    const pushSotry = async (uriImg) => {
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
            const ref = firebase.storage().ref().child('stories/' + filename);
            await ref.put(blob);

            // Lấy download URL của tệp đã tải lên
            const downloadURL = await ref.getDownloadURL();
            await addStory(downloadURL);


        } catch (error) {
            console.log('Có lỗi khi upload photo: ', error)
        }
    }
    //Thêm story vào firebase
    const addStory = async (url) => {
        try {
            await firebase.firestore().collection('stories').doc(userCurrent.userID)
                .collection("itemsotries").add({
                    createdAt: new Date(),
                    user: userCurrent,
                    story: url
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
                resizeMode="cover"
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
