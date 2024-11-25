import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { translations } from './PhraseList'; // Import translations from PhraseList.js

const DA_ListenAndChooseDescriptionScreen = ({ navigation, route }) => {
  const { language } = route.params;
  const [sound, setSound] = useState(null);
  const [hasNavigated, setHasNavigated] = useState(false);

  // Convert the language to lowercase to match the keys in the translations object
  const langKey = language.toLowerCase() === 'en' ? 'en' : 'ta'; 
  const langData = translations[langKey];

  useEffect(() => {
    const loadSound = async () => {
      const soundObject = new Audio.Sound();
      const source =
        language === 'en'
          ? require('../../assets/VoiceRecordings/ListenAndChooseEnglish.mp3')
          : require('../../assets/VoiceRecordings/tamil.m4a');

      try {
        await soundObject.loadAsync(source);
        await soundObject.playAsync();
        soundObject.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish && !hasNavigated) {
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
    <View style={styles.container}>
      <Text style={language === 'en' ? styles.textTopicE : styles.textTopicT}>
        {langData.titlelnc}
      </Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <Text style={language === 'en' ? styles.contentE : styles.contentT}>
        {langData.description}
      </Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>{langData.nextButton}</Text>
      </TouchableOpacity>
      <Image
        style={language === 'en' ? styles.dashImgE : styles.dashImg}
        source={require('../../assets/Celebrate.png')}
      />
    </View>
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
    fontSize: 40,
    color: '#FFD166',
    marginTop: '15%',
    marginBottom: '5%',
  },
  textTopicT: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    color: '#FFD166',
    marginTop: '12%',
    marginBottom: '0%',
  },
  contentE: {
    textAlign: 'center',
    fontSize: 25,
    color: '#16397F',
    marginHorizontal: '5%',
    marginTop: '15%',
    marginBottom: '15%',
  },
  contentT: {
    textAlign: 'center',
    fontSize: 20,
    color: '#16397F',
    marginHorizontal: '7%',
    marginTop: '20%',
    marginBottom: '5%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '15.5%',
    height: '80%',
    borderRadius: 85,
  },
  dashImg: {
    alignSelf: 'center',
    width: '90%',
    height: '45%',
  },
  dashImgE: {
    alignSelf: 'center',
    marginTop: '-5%',
    width: '80%',
    height: '45%',
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
