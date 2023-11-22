import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Story_Item from '../../component/Story_Item'
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native'
import { firebase } from '../../config'
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { TouchableOpacity } from 'react-native';
import { UserContext } from '../../UserContext';
const Story = ({ navigation, route }) => {
  const [stories, setStories] = useState([]);
  const { userCurrent } = useContext(UserContext);

  const now = new Date();
  //.where('endTime', '>', now)
  const getMyStories = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection('stories').doc(userCurrent.userID).collection("itemstories").get();
      let listStory = [];
      querySnapshot.forEach((doc) => {
        listStory.push({
          poster: {
            id: userCurrent.userID,
            DisplayName: userCurrent.DisplayName,
            avatar: userCurrent.avatar,
          },
          idStory: doc.id,
          data: doc.data(),
        });
      });
      return listStory;
    } catch (error) {
      console.log("Error getting documents: ", error);
      return [];
    }
  }

  const getStoriesMyFriends = async () => {
    try {
      let listStory = [];
      const querySnapshot = await firebase.firestore().collection('Friends').doc(userCurrent.userID).collection('userFriends').get();
      for (const doc of querySnapshot.docs) {
        const query = await firebase.firestore().collection('stories').doc(doc.data().MyFriend.userID).collection('itemstories').get();
        query.forEach((docRef) => {

          listStory.push({
            poster: {
              id: doc.data().MyFriend.userID,
              DisplayName: doc.data().MyFriend.DisplayName,
              avatar: doc.data().MyFriend.avatar,
            },
            idStory: docRef.id,
            data: docRef.data(),
          });
        });
      }
      return listStory;
    } catch (error) {
      console.log("Error getting documents: ", error);
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myStories = await getMyStories();
        const friendsStories = await getStoriesMyFriends();
        const updatedStories = stories.concat(myStories, friendsStories);
        setStories(updatedStories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  //Chọn video
  const pickVideo = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,

      });
      let path = null;
      if (!result.canceled) {
        path = result.assets[0].uri;
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          path,
          {
            time: 1500,
          }
        );
        console.log(uri);
        navigation.navigate('PreviewStory', { videoPath: path, thumbnailPath: uri });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Tin</Text>

        <View>
          <TouchableOpacity onPress={pickVideo}>
            <Ionicons name="add-circle-outline" size={35} color="#CC99FF" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          data={stories}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()} // Assuming each document has a unique "id" field
          renderItem={({ item, index }) => {
            return <Story_Item item={item} />;
          }}
        />

      </View>
    </View>
  )
}
export default Story
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  header: {
    backgroundColor: '#ffffff',
    elevation: 6,
    height: '8%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  body: {
    height: '92%',
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
})