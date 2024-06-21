//check tamil

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

// English screen component
const EnglishScreen = ({ toggleConsent, consent, handleNext }) => (
    <View style={styles.container}>
        <Text style={styles.textTopicE}>Great Job, Word Wizard!!</Text>
        <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
        <View style={styles.overlay}></View>
        <Image style={styles.dashImg} source={require('../../assets/Celebrate.png')}></Image>
        <Text style={styles.contentE}>
            Wow, you're on fire, Word Wizard! 🔥 You tackled that challenge like a pro! Take a moment to pat yourself on the back—you're doing fantastic! Ready for more fun? Let's dive into the next adventure...
        </Text>
    </View>
);

// Tamil screen component
const TamilScreen = ({ toggleConsent, consent, handleNext }) => (
    <View style={styles.container}>
        <Text style={styles.textTopicT}>அருமையான வேலை, வார்த்தை வழிகாட்டி!!</Text>
        <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
        <View style={styles.overlay}></View>
        <Image style={styles.dashImg} source={require('../../assets/Celebrate.png')}></Image>
        <Text style={styles.contentT}>
        ஆஹா, நீங்கள் திறமையாக விளையாடிக்கொண்டிருக்கிறீர்கள்🔥! அந்தச் சவாலை ஒரு நிபுணரைப் போல சமாளித்தீர்கள்! உங்கள் முதுகைத் தட்டி பாராட்டிக்கொள்ள கொள்ள சிறிது நேரம் ஒதுக்குங்கள் - நீங்கள் அற்புதமாகச் செய்கிறீர்கள்! மேலும் வேடிக்கைக்கு தயாரா? அடுத்த சாகசத்திற்கு தயாராகுவோம்
3.. 2.. 1! </Text>
        
    </View>
);

const DA_GoodJobScreenSpell = ({ navigation, route }) => {
    const { language } = route.params;
    const [sound, setSound] = useState(null);
  
    useEffect(() => {
        const loadSound = async () => {
          const soundObject = new Audio.Sound();
          const source = language === 'ENGLISH' ? require('../../assets/VoiceRecordings/GoodJobEnglish.mp3') : require('../../assets/VoiceRecordings/tamil.m4a');
      
          try {
            await soundObject.loadAsync(source);
            await soundObject.playAsync();
            soundObject.setOnPlaybackStatusUpdate((status) => {
              if (status.isLoaded && status.didJustFinish) {
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
  
    const handleNext = () => {
    
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
        fontSize: 20,
        // fontWeight: 'bold',
        color: '#16397F',
        marginHorizontal: '5%',
        marginTop: '1%',
        marginBottom: '8%',
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
});

export default DA_GoodJobScreenSpell;
