import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from "react-native";

const LearnTamilScreen = ({ navigation, route }) => {
    // const { language } = route.params;

    // const stylesEnglish = language === 'Tamil' ? stylesTamil : stylesEnglish;

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const handleSound = () => {
        navigation.navigate('Sound1');
    };

    const handleGame = () => {
        navigation.navigate('GameSelect');
    };

    const handleWrite = () => {
        navigation.navigate('Writing');
    };

    return (
        <View style={stylesEnglish.container}>
            <Text style={stylesEnglish.textTopic}>
                {'LET’S LEARN\nTAMIL LETTERS'}
                {/* {language === 'Tamil' ? 'தமிழ் எழுத்துக்களை கற்போம்' : 'LET’S LEARN\nTAMIL LETTERS'} */}
            </Text>
            <Image style={stylesEnglish.bgImg} source={require('../../assets/bg.jpg')} />
            <View style={stylesEnglish.overlay}></View>
            <Image style={stylesEnglish.dashImg} source={require('../../assets/learn.png')} />

            <View style={stylesEnglish.rectangle1}>
                <TouchableOpacity onPress={handleWrite}>
                    <Image style={stylesEnglish.writeImg} source={require('../../assets/write-tamil.png')} />
                    <Text style={stylesEnglish.text1}>
                        {/* {language === 'Tamil' ? 'தமிழ் எழுத்து \nஎழுதுதல்' : 'Tamil Letter\nWriting'} */}
                        {'Tamil Letter\nWriting'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={stylesEnglish.rectangle2}>
                <TouchableOpacity onPress={handleSound}>
                    <Image style={stylesEnglish.listenImg} source={require('../../assets/listen.png')} />
                    <Text style={stylesEnglish.text1}>
                        {/* {language === 'Tamil' ? 'தமிழ் எழுத்து \nஒலிகள்' : 'Tamil Letter\nSounds'} */}
                        {'Tamil Letter\nSounds'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={stylesEnglish.rectangle3}>
                <TouchableOpacity onPress={handleGame}>
                    <Image style={stylesEnglish.listenImg} source={require('../../assets/game.png')} />
                    <Text style={stylesEnglish.text1}>
                        {/* {language === 'Tamil' ? 'தமிழ் எழுத்து\n  விளையாட்டு' : 'Tamil Letter\nGames'} */}
                        {'Tamil Letter\nGames'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={stylesEnglish.bottomNavigate}>
                <TouchableOpacity onPress={handleHome}>
                    <Image style={stylesEnglish.homeIcon} source={require('../../assets/homeIcon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const stylesEnglish = StyleSheet.create({
    container: {
        position: 'relative',
        width: 'auto',
        height: '100%',
        backgroundColor: '#4D86F7',
    },
    textTopic: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 35,
        color: '#FFD166',
        top: '8%'
    },
    bgImg: {
        alignSelf: 'center',
        top: '17%',
        width: '100%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 90,
    },
    dashImg: {
        alignSelf: 'center',
        top: '-73%',
        width: '40%',
        height: '25%',
    },
    text1: {
        left: 150,
        fontWeight: '900',
        fontSize: 25,
        color: '#FFD166',
        bottom: '45%'
    },
    rectangle1: {
        position: 'absolute',
        width: 320,
        height: 120,
        alignSelf: 'center',
        top: '41%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    writeImg: {
        width: 160,
        height: 90,
        left: '3%',
        top: '12%'
    },
    rectangle2: {
        position: 'absolute',
        width: 320,
        height: 120,
        alignSelf: 'center',
        top: '58.5%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    listenImg: {
        width: 60,
        height: 90,
        left: '5%',
        top: '10%'
    },
    rectangle3: {
        position: 'absolute',
        width: 320,
        height: 120,
        alignSelf: 'center',
        top: '76%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    bottomNavigate: {
        position: 'absolute',
        width: '100%',
        height: 40,
        top: '95.2%',
        backgroundColor: '#4D86F7',
    },
    homeIcon: {
        alignSelf: 'center',
        height: 28,
        width: 28,
        top: 8
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '28%',
        height: '80%',
        borderRadius: 85,
    },
});

const stylesTamil = StyleSheet.create({
    container: {
        position: 'relative',
        width: 'auto',
        height: '100%',
        backgroundColor: '#4D86F7',
    },
    textTopic: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 35,
        color: '#FFD166',
        top: '8%'
    },
    bgImg: {
        alignSelf: 'center',
        top: '17%',
        width: '100%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 90,
    },
    dashImg: {
        alignSelf: 'center',
        top: '-73%',
        width: '40%',
        height: '25%',
    },
    text1: {
        left: 122,
        fontWeight: '900',
        fontSize: 23,
        color: '#FFD166',
        bottom: '45%'
    },
    rectangle1: {
        position: 'absolute',
        width: 320,
        height: 120,
        alignSelf: 'center',
        top: '41%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    writeImg: {
        width: 160,
        height: 90,
        left: '3%',
        top: '12%'
    },
    rectangle2: {
        position: 'absolute',
        width: 320,
        height: 120,
        alignSelf: 'center',
        top: '58.5%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    listenImg: {
        width: 60,
        height: 90,
        left: '5%',
        top: '10%'
    },
    rectangle3: {
        position: 'absolute',
        width: 320,
        height: 120,
        alignSelf: 'center',
        top: '76%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    bottomNavigate: {
        position: 'absolute',
        width: '100%',
        height: 40,
        top: '95.2%',
        backgroundColor: '#4D86F7',
    },
    homeIcon: {
        alignSelf: 'center',
        height: 28,
        width: 28,
        top: 8
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '28%',
        height: '80%',
        borderRadius: 85,
    },
});

export default LearnTamilScreen;
