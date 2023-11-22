import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import color from '../../color/color';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
const DetailsStory = ({route}) => {
    const navigation = useNavigation();
    const { sumViewer,viewers ,thumbnail } = route.params;


    const handleBack = () => {
        navigation.goBack();
    }

    const viewNotViewer = () => {
        return (
            <View style={styles.container_notViewer}>
                <Image source={require('../../assets/khong_ai_xem.png')} style={{ width: 150, height: 150 }} />
                <View style={{ width: 200, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#888888' }}>Chưa có người xem</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#999999' }}>Thông tin chi tiết về những người xem tin của bạn sẽ hiển thị ở đây</Text>
                </View>
                <TouchableOpacity style={styles.btnRefresh_NotViewer}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: color.white }}>Làm mới</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const Layout_Viewer = (value) => {
        return (
           
            <View style={styles.layoutUser_container}>
           
                <TouchableOpacity style={styles.layout_content}>
                    <Image style={styles.imgLayout} source={{uri:value.data.avatar}} />
                    <View style={styles.layout_content_content}>
                        <Text style={{fontSize:17,fontWeight:'500'}}>{value.data.DisplayName}</Text>
                        <Text>{value.data.icon}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const showViewer = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{sumViewer} người xem</Text>
                    <TouchableOpacity style={styles.btnRefresh_ShowViewer}>
                        <Feather style={{ marginRight: 5 }} name="refresh-ccw" size={20} color="black" />
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Làm mới</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.listMess}
                    data={viewers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => Layout_Viewer(item)}
                />

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text></Text>
                <Text style={{ fontWeight: '700', fontSize: 16 }}>Thông tin chi tiết</Text>
                <TouchableOpacity
                    onPress={handleBack}
                >
                    <AntDesign name="close" size={22} color="#808080" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerDemo}>
                <View style={styles.currentStory_container}>
                    <View style={{  elevation: 7}}>
                        <Image style={styles.currentStory} source={{ uri: thumbnail }} />
                    </View>
                </View>
                <TouchableOpacity style={styles.addNewStory}>
                    <Ionicons name="add-circle" size={40} color="#66CCFF" />
                    <Text style={{ fontWeight: 'bold', color: '#3399FF' }}>Thêm tin mới</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                {sumViewer==0?viewNotViewer():showViewer()}
        
            </View>
        </View>
    )
}

export default DetailsStory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: color.white
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerDemo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    currentStory_container: {
        borderBottomWidth: 2,
        width: 100,
        height: 150,
        marginLeft: 20,
        paddingBottom: 5,
        marginTop: 15
    },
    currentStory: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    addNewStory: {
        width: 100,
        height: 130,
        backgroundColor: '#FDF5E6',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 10
    },
    body: {
        height: '100%',
    },
    container_notViewer: {
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btnRefresh_NotViewer: {
        width: 100,
        height: 40,
        backgroundColor: "#66CCFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 15,
    },
    btnRefresh_ShowViewer: {
        width: 100,
        height: 40,
        backgroundColor: "#66CCFF",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 15,
    },
    layoutUser_container:{
        width:'100%',
        height:80,
        justifyContent:'center'
    },
    layout_content:{
        flexDirection:'row',
        width:'100%',
        
    },
    imgLayout:{
        width:60,
        height:60,
        borderRadius:60,
        marginRight:10
    },
})