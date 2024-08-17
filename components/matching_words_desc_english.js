import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const EnglishScreen = ({ handleNext }) => (
    <View style={styles.container}>
        <Text style={styles.textTopicE}>Let's Find The Matching Words!</Text>
        <Image style={styles.bgImg} source={require('../assets/bg.jpg')} />
        <View style={styles.overlay}></View>
        <Text style={styles.contentE}>
            Hey, Word Wizard! 🧙‍♂️ Are you ready for a super fun challenge? Look at the words on the board and find the one that's just like the one you see on top! Show off your awesome matching skills! Let's get started!
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <Image style={styles.dashImgE} source={require('../assets/Celebrate.png')} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#4D86F7',
        alignItems: 'center',
    },
    bgImg: {
        position: 'absolute',
        top: '15.4%',
        width: '100%',
        height: '100%',
        zIndex: -1,
        resizeMode: 'cover',
        borderWidth: 1,
        borderRadius: 85,
    },
    textTopicE: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#FFD166',
        marginTop: '12%',
        marginBottom: '5%',
    },
    contentE: {
        textAlign: 'center',
        fontSize: 25,
        color: '#16397F',
        marginHorizontal: '5%',
        marginTop: '15%',
        marginBottom: '15%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '15.5%',
        height: '80%',
        borderRadius: 85,
    },
    nextButton: {
        backgroundColor: '#FFD166',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: '3%',
    },
    nextButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    dashImgE: {
        alignSelf: 'center',
        marginTop: '8%',
        width: '50%',
        height: '25%',
    },
});

export default EnglishScreen;
