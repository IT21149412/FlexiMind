import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import EnglishScreen from '../../components/matching_words_desc_english';
import TamilScreen from '../../components/matching_words_desc_tamil';

const DA_MatchingWordsDescriptionScreen = ({ navigation, route }) => {
    const { language, results, setResults } = route.params;  // Receiving the results and setResults
    const [sound, setSound] = useState(null);
    const [hasNavigated, setHasNavigated] = useState(false);

    useEffect(() => {
        const loadAndPlaySound = async () => {
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    language === 'en'
                        ? require('../../assets/VoiceRecordings/MatchingWordsEnglish.mp3')
                        : require('../../assets/VoiceRecordings/tamil.m4a')
                );

                console.log('Sound loaded successfully');
                
                await newSound.playAsync();
                console.log('Playing sound');

                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.isLoaded && status.didJustFinish && !hasNavigated) {
                        console.log('Sound finished playing');
                        handleNext(); // Automatically navigate when sound finishes
                    }
                });

                setSound(newSound); // Set the sound state
            } catch (error) {
                console.error('Failed to load or play sound', error);
            }
        };

        loadAndPlaySound();

        return () => {
            if (sound) {
                sound.unloadAsync(); // Ensure sound is unloaded on component unmount
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
                await sound.stopAsync(); // Stop the sound
                await sound.unloadAsync(); // Unload the sound
            }
            navigation.navigate('DA_MatchingWordsScreen', { language, results, setResults }); // Navigate to the next screen
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {language === 'en' ? (
                <EnglishScreen handleNext={handleNext} />
            ) : (
                <TamilScreen handleNext={handleNext} />
            )}
        </View>
    );
};

export default DA_MatchingWordsDescriptionScreen;
