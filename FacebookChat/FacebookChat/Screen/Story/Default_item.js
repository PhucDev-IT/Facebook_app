import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import color from '../../color/color';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as MediaLibrary from 'expo-media-library';
const MAX_VIDEO_DURATION = 30000; // Độ dài tối đa cho video (30 giây)

const Default_item = ({ item }) => {
  const navigation = useNavigation();

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
        navigation.navigate('PreviewStory', { videoPath: path, thumbnailPath: uri, userCurrent: item });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <TouchableOpacity
      onPress={pickVideo}
      style={styles.container} >
      <Image source={require('../../assets/default_user.png')} style={styles.backgroundImg} />
      <View style={styles.lopPhu}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/icons8-add-30.png')} style={styles.iconAdd} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Default_item


const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    borderRadius: 15,
    elevation: 4,
    marginRight: 20,
    marginBottom: 15

  },
  backgroundImg: {
    width: 150,
    height: 200,
    borderRadius: 15

  },
  imageContainer: {
    margin: 10,
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#3578E5',
    justifyContent: 'center',
    alignItems: 'center',

  },

  iconAdd: {
    width: '100%',
    height: '100%',
    borderRadius: 38,
    margin: 1,
    backgroundColor: 'white'

  },

  lopPhu: {
    position: 'absolute'
  }
})