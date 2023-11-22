import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import React,{useContext} from 'react'
import color from '../../color/color';
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../UserContext';
const Item_Story_Home = ({ item }) => {
    const navigation = useNavigation();
    const { userCurrent } = useContext(UserContext);
    const handleClick = () => {
        navigation.navigate('DisplayStories', { item: item });
    }
    return (
        <TouchableOpacity
            onPress={handleClick}
            style={styles.container} >
            <Image source={{ uri: item.data.thumbnail }} style={styles.backgroundImg} />
            <View style={styles.lopPhu}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.poster.avatar }} style={styles.imageAvt} />
                </View>
                <Text style={styles.text}>{item.poster.DisplayName}</Text>
            </View>
        </TouchableOpacity>


    )
}

export default Item_Story_Home


const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 150,
        borderRadius: 13,
        marginHorizontal: 6,
        elevation:4,
        borderColor:'#AAAAAA',

    },
    backgroundImg: {
        width: '100%',
        height: '100%',
        borderRadius: 13,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

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

    imageAvt: {
        width: '100%',
        height: '100%',
        borderRadius: 38,
        margin: 1,
        backgroundColor: 'white'

    },
    text: {
        marginLeft: 7,
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
        marginTop:60,
    },
    lopPhu: {
        width: '100%',
        position: 'absolute',
        borderRadius:13
    },

})