import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import { firebase } from '../config'
import { Button } from 'react-native-paper';

const TestScreen = () => {
 
  const handle = async ()=>{
     // Đường dẫn đến Firebase Storage
  const storageRef = firebase.storage().ref();

  // Tên tệp hình ảnh
  const imageName = 'test.jpeg';

  // Đối tượng tệp (file) hoặc Blob của hình ảnh
  const imageFile = 'data:image/jpeg;base64,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';

  // Đẩy hình ảnh lên Firebase Storage
  const imageRef = storageRef.child(imageName);
  imageRef.put(imageFile)
    .then(snapshot => {
      console.log('Uploaded a file:', snapshot.metadata.fullPath);
      // Tiếp tục bước 2: Lấy URL và lưu vào Firestore
      // Lấy URL của hình ảnh sau khi tải lên
      imageRef.getDownloadURL()
        .then(url => {
          console.log('File is available at:', url);
          // Tiếp tục bước 3: Lưu URL vào Firestore
          firestore()
            .collection('test')
            .add({
              imageUrl: url, // Đây là URL bạn đã lấy ở bước trước
              // Các trường dữ liệu khác nếu cần
            })
            .then(docRef => {
              console.log('Document written with ID:', docRef.id);
            })
            .catch(error => {
              console.error('Error adding document:', error);
            });
        })
        .catch(error => {
          console.error('Error getting download URL:', error);
        });
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });

  }
  return (
    <View>
      <Text>Choose an option:</Text>
    <Button onPress={handle}>
      <Text>Nhấn</Text>
    </Button>
    </View>
  );
}

export default TestScreen;
