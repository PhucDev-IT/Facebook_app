import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react'
import color from '../../color/color';
import { useEffect } from 'react';
import { useState } from 'react';
const Default_item = () => {
    return (

        <TouchableOpacity style={styles.container} >
            <Image source={require('../../assets/default_user.png')} style={styles.backgroundImg} />
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/icons8-add-30.png')} style={styles.imageAvt} />
            </View>

        </TouchableOpacity>


    )
}

export default Default_item

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 210,
        borderRadius: 20,
        elevation: 6,
        marginRight:30

    },
    backgroundImg: {
        width: 160,
        height: 210,
        borderRadius: 20

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
        position: 'absolute'

    },

    imageAvt: {
        width: '100%',
        height: '100%',
        borderRadius: 38,
        margin: 1,
        backgroundColor: 'white'

    },

})