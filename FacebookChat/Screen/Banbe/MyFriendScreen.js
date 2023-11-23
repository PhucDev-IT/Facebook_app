import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { useState, useEffect,useContext } from 'react'
import Layout_MyFriend from '../../component/Layout_MyFriend'
import { Ionicons } from "@expo/vector-icons";
import { firebase } from '../../config'
import { UserContext } from '../../UserContext';
const MyFriendScreen = ({ navigation }) => {

    const [textInput, setTextInput] = useState('');
    const [myFriends, setMyFriends] = useState([]);

    const { userCurrent } = useContext(UserContext);//Lấy ID người dùng hiện tại
    //Lấy danh sách bạn bè
    useEffect(() => {
        const getFriendRequests = async () => {
          try {
            const users = [];
            const friends = await firebase.firestore().collection('Friends').doc(userCurrent.userID).collection('userFriends').get();
      
            for (const docs of friends.docs) {
              const doc = await firebase.firestore().collection('users').doc(docs.id).get();
              if (doc.exists) {
                users.push(doc.data());
              }
            }
      
            setMyFriends(users);
          } catch (error) {
            console.error('Lỗi khi lấy danh sách bạn bè:', error);
          }
        };
      
        getFriendRequests();
      }, [userCurrent.userID]);


    const handleBack = () => {
        navigation.goBack();
    }

    //Tìm bạn bè
    const handleSearch = () => {
        try {
            const querySnapshot = firebase.firestore().collection('Friends').doc(userCurrent.userID).collection('userFriends').orderBy('DisplayName')
                .startAt(textInput).endAt(textInput + '\uf8ff')
                .get();
            const documents = querySnapshot.docs.map(doc => doc.data());
            setMyFriends(documents)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleBack}>
                    <Ionicons name="arrow-back-sharp" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Bạn bè</Text>
            </View>
            <View style={styles.containerSearch}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setTextInput(text)}
                    value={textInput}
                    placeholder="Tìm kiếm bạn bè"
                    onSubmitEditing={handleSearch}
                />
            </View>

            <View style={styles.body}>
                <FlatList
                    data={myFriends}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Layout_MyFriend item={item} />}
                />
            </View>

        </View>
    )
}

export default MyFriendScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 8,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        flexDirection: 'row',
        marginTop: 20,
        alignContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    containerSearch: {
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '90%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#DDDDDD',
        fontSize: 16,
        elevation: 5
    },

    body: {
        paddingTop: 20
    }
})