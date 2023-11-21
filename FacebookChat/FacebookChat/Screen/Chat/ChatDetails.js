import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect,useContext, useState } from 'react'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { firebase } from '../../config'
import { useCallback } from 'react'
import color from '../../color/color'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import { UserContext } from '../../UserContext';
import { Video } from 'expo-av';

const ChatDetails = ({ route }) => {
  const [messages, setMessages] = useState([])
  const { roomId, FriendChat } = route.params;
  const navigation = useNavigation();
  const { userCurrent } = useContext(UserContext);

  const handleBack = () => {
    navigation.goBack();
  }

  useEffect(() => {

    const chatRef = firebase.firestore().collection('chats').doc(roomId).collection('conversation').orderBy('createdAt', 'desc');

    const unsubscribe = chatRef.onSnapshot((snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          image: data.image,
          video: data.video,
          user: {
            _id: data.sentBy.userID, // ID của người gửi tin nhắn
            name: data.sentBy.DisplayName,
            avatar: data.sentBy.avatar,
          },
        };
      });

      setMessages(newMessages);
    });

    return () => {
      unsubscribe();
    };
  }, [])

  const sendMessage = async (messageArrays) => {

    const msg = messageArrays[0];
    const message = {
      ...msg,
      sentBy: userCurrent,
      sentTo: FriendChat
    }

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )

    await firebase.firestore().collection('chats').doc(roomId).set({
      user: [userCurrent.userID, FriendChat.userID]

    }).then(() => {
      // Sau khi tài liệu "chats" được tạo hoặc cập nhật thành công, bạn có thể thêm dữ liệu vào collection "conversation".
      firebase.firestore().collection('chats').doc(roomId).collection('conversation').add({
        ...message,
      }).then(() => {
        console.log("Gửi thành công")
      }).catch((error) => {
        console.error('Lỗi khi thêm dữ liệu vào collection "conversation":', error);
      });
    }).catch((error) => {
      console.error('Lỗi khi tạo hoặc cập nhật tài liệu "chats":', error);
    });
  }

  const onSend = useCallback((messageArrays) => {
    sendMessage(messageArrays);
  }, [])


  //Chọn ảnh
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {

      result.assets.map((asset)=>{
        const fileExtension = asset.uri.split('.').pop();

        if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
          addNewMessageImage(asset.uri);
        } else if (fileExtension === 'mp4' || fileExtension === 'mov') {
          addNewMessageVideo(asset.uri);
        } else {
          // Loại tệp không được hỗ trợ
         alert('Loại tệp không được hỗ trợ');
        }
      })
      
    }
  };

  //--------------------------------------Chụp ảnh-----------------------------------
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Cho phép chỉnh sửa trước ảnh
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      addNewMessageImage(result.uri);
    }
  };

  //Đẩy ảnh đã chụp lên firebase
  const putImageToStorage = async (uriImg) => {
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
      const ref = firebase.storage().ref().child('chats/' + filename);
      await ref.put(blob);

      // Lấy download URL của tệp đã tải lên
      const downloadURL = await ref.getDownloadURL();
      return downloadURL;

    } catch (error) {
      console.log('Có lỗi khi upload photo: ', error)
    }
  }

  //Add message image to firebase
  const addNewMessageImage = async (uriImg) => {
    try {
      const img = await putImageToStorage(uriImg);
      sendImage(img,null);
    } catch (error) {
      alert('Có lỗi khi gửi tin nhắn');
      console.log('Có lỗi khi upload mess: ', error);
    }
  }

  const addNewMessageVideo = async (videoPath) => {
    try {
      const path = await putImageToStorage(videoPath);
      sendImage(null,path);
    } catch (error) {
      alert('Có lỗi khi gửi tin nhắn');
      console.log('Có lỗi khi upload mess: ', error);
    }
  }

  const sendImage = async (uriImg,videoPath) => {
    let message = null;
    if(uriImg==null && videoPath!=null){
      message = {
        video:videoPath,
        sentBy: userCurrent,
        sentTo: FriendChat,
        createdAt: new Date(),
        user:{
          _id:userCurrent.userID
        }
      }
    }else if(uriImg!=null && videoPath==null){
      message = {
        image:uriImg,
        sentBy: userCurrent,
        sentTo: FriendChat,
        createdAt: new Date(),
        user:{
          _id:userCurrent.userID
        }
      }
    }
    
    await firebase.firestore().collection('chats').doc(roomId).set({
      user: [userCurrent.userID, FriendChat.userID]

    }).then(() => {
      // Sau khi tài liệu "chats" được tạo hoặc cập nhật thành công, bạn có thể thêm dữ liệu vào collection "conversation".
     const chatRef = firebase.firestore().collection('chats').doc(roomId).collection('conversation').doc()
     chatRef.set({
        ...message,
        _id:chatRef.id
      }).then(() => {
        console.log("Gửi thành công")
      }).catch((error) => {
        console.error('Lỗi khi thêm dữ liệu vào collection "conversation":', error);
      });
    }).catch((error) => {
      console.error('Lỗi khi tạo hoặc cập nhật tài liệu "chats":', error);
    });
  }


  //Custom
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#ffa366'
          },
          left: {
            backgroundColor: '#E6F1D8'
          }
        }}

        textStyle={{
          right: {
            color: color.white
          }
        }}
      >
      </Bubble>
    );
  }

  const scrollToBottomComponent = () => {
    return (
      <AntDesign name="arrowdown" size={24} color="black" />
    );
  }

  //Custom nút gửi
  const renderSend = (props) => {
    return (
        <Send {...props}>
        <View>
          <Ionicons name="send" size={24} color="#CC33FF" style={{ marginRight: 10}} />
        </View>
      </Send>
    );
  }


  const renderInputToolbar = (props) => {
    return (
      <InputToolbar {...props}
        containerStyle={{
          backgroundColor: 'white',
          borderColor: color.white,
          marginBottom: 10,
        }}
      />

    );
  }
 


  const renderAction = useCallback(() => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={takePicture}>
          <Feather name="camera" size={23} color={color.colorBottomChat} style={{ marginHorizontal: 10, marginBottom: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <FontAwesome name="file-photo-o" size={23} color={color.colorBottomChat} style={{ marginHorizontal: 10, marginBottom: 10 }} />
        </TouchableOpacity>
      </View>
   );
  }, [])

  // Tạo một hàm tùy chỉnh để hiển thị video
  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    if (currentMessage.video) {
      return (
        <View style={{ padding: 10, borderRadius: 10 }}>
          <Video
            source={{ uri: currentMessage.video }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            useNativeControls // Bật hiển thị nút điều khiển
            style={{ width: 250, height: 200, borderRadius: 10 }}
          />
        </View>
      );
    }
    return null;
  };


  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}>
          <Ionicons name="ios-arrow-back-sharp" size={28} color="#FF9900" />
        </TouchableOpacity>
        <Image style={styles.img} source={{ uri: FriendChat.avatar }} />
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{FriendChat.DisplayName}</Text>
      </View>
      <View style={styles.body}>
        <GiftedChat
          messages={messages}
          onSend={newMessage => onSend(newMessage)}
          user={{
            _id: userCurrent.userID,
          }}
          placeholder={'Nhập tin nhắn'}

          renderBubble={renderBubble}
          renderSend={renderSend}
          renderMessageVideo={renderMessageVideo}
          scrollToBottom  //Hiển thị nút cuộn nhanh
          scrollToBottomComponent={scrollToBottomComponent}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderAction}
          isLoadingEarlier
          listViewProps={{ marginBottom: 20 }}
          textInputStyle={{
            backgroundColor: '#E3E3E3',
            borderRadius: 20,
            paddingHorizontal: 10,
            marginRight: 20,
          }}
        />
      </View>
    </View>

  )
}

export default ChatDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },

  header: {
    flex:0.7,
    elevation: 7,
    backgroundColor: '#FEFEFE',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  body: {
    flex:9.3
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 15,
    marginRight: 10
  },
})