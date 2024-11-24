import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

// English screen component
const EnglishScreen = ({ handleNext }) => (
    <View style={styles.container}>
        <Text style={styles.textTopicE}>Read Out Loud!</Text>
        <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
        <View style={styles.overlay}></View>
        <Text style={styles.contentE}>
        Hey There! 🧙‍♂️ It's time to show off your reading skills! Look at the words on the screen, and when you are ready, click the START RECORDING button and say the word out loud! You have 5 seconds to say the word.. Let's get started!
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <Image style={styles.dashImgE} source={require('../../assets/Celebrate.png')}></Image>
        
    </View>
);

// Tamil screen component
const TamilScreen = ({ handleNext }) => (
    <View style={styles.container}>
        <Text style={styles.textTopicT}>சத்தமாகப் படியுங்கள்!</Text>
        <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
        <View style={styles.overlay}></View>
        <Image style={styles.dashImg} source={require('../../assets/Celebrate.png')}></Image>
        <Text style={styles.contentT}>
        ஏய்! 🧙‍♂️ உங்கள் வாசிப்புத் திறனை வெளிப்படுத்த வேண்டிய நேரம் இது! திரையில் உள்ள வார்த்தைகளைப் பார்த்து, நீங்கள் தயாரானதும், 'பதிவு செய்யத் தொடங்கு' பொத்தானைக் கிளிக் செய்து, அந்த வார்த்தையை உரக்கச் சொல்லுங்கள்! வார்த்தை சொல்ல உங்களுக்கு 5 வினாடிகள் உள்ளன.. தொடங்குவோம்!        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>அடுத்தது</Text>
        </TouchableOpacity>
    </View>
);

const DA_ReadOutLoudDescriptionScreen = ({ navigation, route }) => {
    const { language, results, setResults } = route.params;  // Receiving the results and setResults
    const [sound, setSound] = useState(null);
    const [hasNavigated, setHasNavigated] = useState(false);

    useEffect(() => {
        const loadSound = async () => {
            const soundObject = new Audio.Sound();
            const source = language === 'ENGLISH' ? require('../../assets/VoiceRecordings/ListenAndChooseEnglish.mp3') : require('../../assets/VoiceRecordings/tamil.m4a');

            try {
                await soundObject.loadAsync(source);
                await soundObject.playAsync();
                soundObject.setOnPlaybackStatusUpdate((status) => {
                    if (status.isLoaded && status.didJustFinish && !hasNavigated) {
                        // Audio finished playing, navigate to the next screen
                        handleNext();
                    }
                });
                setSound(soundObject);
            } catch (error) {
                console.error('Failed to load sound', error);
            }
        };

        loadSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [language]);

    useEffect(() => {
        console.log('Results state:', results);
    }, [results]);  // Log the results state every time it changes

    const handleNext = async () => {
        if (!hasNavigated) {
            setHasNavigated(true);
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
            }
            navigation.navigate('DA_ReadOutLoudScreen', { language, results, setResults });
        }
    };

    return (
        language === 'ENGLISH' ? (
            <EnglishScreen handleNext={handleNext} />
        ) : (
            <TamilScreen handleNext={handleNext} />
        )
    );
};

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
        marginTop: '15%',
        marginBottom: '5%',
    },

    textTopicT: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#FFD166',
        marginTop: '12%',
        marginBottom: '0%',
    },

    contentE: {
        textAlign: 'center',
        fontSize: 25,
        // fontWeight: 'bold',
        color: '#16397F',
        marginHorizontal: '5%',
        marginTop: '15%',
        marginBottom: '15%',
    },

    contentT: {
        textAlign: 'center',
        fontSize: 14,
        // fontWeight: 'bold',
        color: '#16397F',
        marginHorizontal: '7%',
        marginTop: '1%',
        marginBottom: '5%',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '15.5%',
        height: '80%',
        borderRadius: 85,
    },
    consentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C0BFBF',
        backgroundColor: '#C0BFBF',
        marginRight: '5%',
        marginLeft: '15%',
    },
    checked: {
        backgroundColor: '#FFD166',
        borderWidth: 5,
    },
    consentText: {
        fontSize: 14,
        color: '#4C7FE4',
        marginRight: '15%'
    },
    
    
    dashImg: {
        alignSelf: 'center',
        marginTop:'8%',
        width: '100%',
        height: '50%',
    },

    dashImgE: {
        alignSelf: 'center',
        marginTop:'8%',
        width: '50%',
        height: '25%',
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
});

export default DA_ReadOutLoudDescriptionScreen;
