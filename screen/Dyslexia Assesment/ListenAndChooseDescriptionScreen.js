import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

// English screen component
const EnglishScreen = ({ handleNext }) => (
    <View style={styles.container}>
        <Text style={styles.textTopicE}>Listen and Choose!</Text>
        <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
        <View style={styles.overlay}></View>
        <Text style={styles.contentE}>
        Hey there, Word Explorer! 🌟 Get ready for a new challenge! Listen carefully as a word is spoken out loud. Then, pick the same word from the list below. Need to hear it again? Tap your speaker friend on the writing board for another listen. Let's dive in and show off your amazing listening skills!
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
        <Text style={styles.textTopicT}>அருமையான வேலை, வார்த்தை வழிகாட்டி!!</Text>
        <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
        <View style={styles.overlay}></View>
        <Image style={styles.dashImg} source={require('../../assets/Celebrate.png')}></Image>
        <Text style={styles.contentT}>
        ஏய், வருங்கால பிரபலமே! 🧙‍♂️ வேடிக்கையான சவாலுக்கு நீங்கள் தயாரா? பலகையில் உள்ள வார்த்தைகளைப் பார்த்து, மேலே நீங்கள் பார்ப்பது போன்ற ஒரு வார்த்தையை கண்டறியவும்! உங்கள் அற்புதமான திறன்களைக் காட்டுங்கள்! தொடங்குவோம்!
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>அடுத்தது</Text>
        </TouchableOpacity>
    </View>
);

const DA_ListenAndChooseDescriptionScreen = ({ navigation, route }) => {
    const { language } = route.params;
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

    const handleNext = async () => {
        if (!hasNavigated) {
            setHasNavigated(true);
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
            }
            navigation.navigate('DA_ListenAndChooseScreen', { language });
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
        fontSize: 15,
        // fontWeight: 'bold',
        color: '#16397F',
        marginHorizontal: '7%',
        marginTop: '5%',
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

export default DA_ListenAndChooseDescriptionScreen;
