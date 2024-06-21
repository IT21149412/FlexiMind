import React, { useState, useEffect } from 'react';
import { Permissions } from 'expo';
import { View, StyleSheet, Image, Text, TouchableOpacity, BackHandler, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const EnglishScreen = ({ timer, wordPair, timerExpired, onClickNext }) => {
  const [recording, setRecording] = useState(null);
  const [playing, setPlaying] = useState(false);

  const startRecording = async () => {
    try {
      console.log('Recording...');
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') {
        console.error('Permission to record audio was denied');
        return;
      }
      const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      setRecording(recording);
      await recording.startAsync();
      // Record for 10 seconds
      setTimeout(stopRecording, 10000);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      console.log('Stopping recording...');
      await recording.stopAndUnloadAsync();
      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const playRecording = async () => {
    try {
      console.log('Playing recording...');
      const { sound } = await recording.createNewLoadedSoundAsync();
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlaying(false);
        }
      });
      setPlaying(true);
    } catch (error) {
      console.error('Failed to play recording:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicE}>Speak Up, Word Champ!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <View style={styles.descriptionContainer}>
        <Image style={styles.speakerIcon} source={require('../../assets/speaker.png')} />
        <Text style={styles.contentE}>
          Hey, Word Champ! 🎤 Get ready to shine! When you see the word appear on the screen, press and hold the mic on the board, and say the word out loud. Let's show off your awesome speaking skills! Ready, set, go!
        </Text>
      </View>
      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>
      <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
      <View style={styles.board}>
        <Text style={styles.yellowWord}>{wordPair.yellow}</Text>
        {/* Mic icon */}
        <Pressable
          onPressIn={startRecording}
          onPressOut={stopRecording}
          onLongPress={playRecording}
        >
          <Image style={styles.micIcon} source={require('../../assets/mic.png')} />
        </Pressable>
      </View>
      {/* Next button positioned absolutely */}
      <TouchableOpacity style={styles.nextButton} onPress={() => onClickNext()}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const TamilScreen = ({ timer, wordPair, timerExpired, onClickNext }) => {
  const [recording, setRecording] = useState(null);
  const [playing, setPlaying] = useState(false);

  const startRecording = async () => {
    try {
      console.log('Recording...');
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') {
        console.error('Permission to record audio was denied');
        return;
      }
      const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      setRecording(recording);
      await recording.startAsync();
      // Record for 10 seconds
      setTimeout(stopRecording, 10000);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      console.log('Stopping recording...');
      await recording.stopAndUnloadAsync();
      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const playRecording = async () => {
    try {
      console.log('Playing recording...');
      const { sound } = await recording.createNewLoadedSoundAsync();
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlaying(false);
        }
      });
      setPlaying(true);
    } catch (error) {
      console.error('Failed to play recording:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicT}>பேசு, வார்த்தை வீரன்!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <View style={styles.descriptionContainer}>
        <Image style={styles.speakerIcon} source={require('../../assets/speaker.png')} />
        <Text style={styles.contentT}>
          ஏய், வார்த்தை வீரன்! 🎤 பிரகாசிக்க தயாராகுங்கள்! திரையில் வார்த்தை தோன்றும்போது, ​​போர்டில் உள்ள மைக்கை அழுத்திப் பிடித்து, அந்த வார்த்தையை உரக்கச் சொல்லவும். உங்கள் அற்புதமான பேச்சுத் திறமையை வெளிப்படுத்துவோம்! தயார், செட், போ!
        </Text>
      </View>
      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>
      <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
      <View style={styles.board}>
        <Text style={styles.yellowWord}>{wordPair.yellow}</Text>
        {/* Mic icon */}
        <Pressable
          onPressIn={startRecording}
          onPressOut={stopRecording}
          onLongPress={playRecording}
        >
          <Image style={styles.micIcon} source={require('../../assets/mic.png')} />
        </Pressable>
      </View>
      {/* Next button positioned absolutely */}
      <TouchableOpacity style={styles.nextButton} onPress={() => onClickNext()}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const DA_ReadOutLoudScreen = ({ navigation, route }) => {
  const { language } = route.params;
  const [timer, setTimer] = useState('00:30');
  const [wordPair, setWordPair] = useState({ yellow: '', words: [] });
  const [timerExpired, setTimerExpired] = useState(false);

  // Disable back button when activity starts
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Return true to prevent going back
        return true;
      };
      
      // Add event listener for back button press
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup function to remove event listener
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    const englishWordPairs = [
      { yellow: 'TOOK', words: ['LOOK', 'TOOK'] },
      { yellow: 'WAY', words: ['WAY', 'MAY'] },
      { yellow: 'PAN', words: ['PAN', 'NAP'] },
      { yellow: 'WEST', words: ['WEST', 'NEST'] },
      { yellow: 'FALL', words: ['FALL', 'TALL'] },
      { yellow: 'SLEEP', words: ['SLEEP', 'SHEEP'] },
    ];

    const tamilWordPairs = [
      { yellow: 'காடு', words: ['காடு', 'நாடு'] },
      { yellow: 'புல்', words: ['புல்', 'பல்'] },
      { yellow: 'குயில்', words: ['குயில்', 'மயில்'] },
      { yellow: 'தட்டு', words: ['தட்டு', 'எட்டு'] },
      { yellow: 'கடை', words: ['கடை', 'நடை'] },
    ];

    const wordPairs = language === 'ENGLISH' ? englishWordPairs : tamilWordPairs;
    console.log('Selected Language:', language);
    console.log('Word Pairs:', wordPairs);

    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    const selectedWordPair = wordPairs[randomIndex];
    console.log('Selected Word Pair:', selectedWordPair);
    setWordPair(selectedWordPair);

    const loadAudio = async () => {
      const recording = language === 'ENGLISH' ? require('../../assets/VoiceRecordings/MatchingWordsEnglish.mp3') : require('../../assets/VoiceRecordings/MatchingWordsTamil.mp3');
      const soundObj = new Audio.Sound();
      try {
        await soundObj.loadAsync(recording);
        await soundObj.playAsync();
        soundObj.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            startTimer();
          }
        });
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();

    return () => {
      if (soundObj) {
        soundObj.unloadAsync();
      }
    };
  }, [language]);

  useEffect(() => {
    // Cleanup function to stop audio when unmounting
    return () => {
      if (soundObj) {
        soundObj.unloadAsync();
      }
    };
  }, []);

  const startTimer = () => {
    let seconds = 30;
    const intervalId = setInterval(() => {
      seconds -= 1;
      if (seconds === 0) {
        clearInterval(intervalId);
        setTimer('00:00');
        setTimerExpired(true); // Timer expired
      } else {
        const formattedTime = `${Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        setTimer(formattedTime);
      }
    }, 1000);
  };

  const onClickNext = () => {
    // Clear any existing timeout
    clearTimeout(timer);
  
    // Stop the activity
    setTimerExpired(true); // Timer expired
  
    // Stop audio playback
    if (soundObj) {
      soundObj.stopAsync();
    }
  
    // Navigate to MatchingWordsScreen2 after 2 seconds
    const timer = setTimeout(() => {
      // Navigate to MatchingWordsScreen2
      navigation.navigate('DA_MatchingWordsScreen2', { language });
    }, 2000);
  };

  return language === 'ENGLISH' ? <EnglishScreen timer={timer} wordPair={wordPair} timerExpired={timerExpired} onClickNext={onClickNext} /> : <TamilScreen timer={timer} wordPair={wordPair} timerExpired={timerExpired} onClickNext={onClickNext} />;
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
    top: '14%',
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
    fontSize: 27,
    color: '#FFD166',
    marginTop: '14%',
    marginBottom: '2%',
    paddingLeft: '2%',
  },
  textTopicT: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFD166',
    marginTop: '12%',
    marginBottom: '2%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '14%',
    height: '100%',
    borderRadius: 85,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  speakerIcon: {
    width: 20,
    height: 20,
    marginRight: '1%',
    marginLeft: '3%',
    marginTop: '3%',
  },
  contentE: {
    textAlign: 'justify',
    fontSize: 15,
    color: '#16397F',
    marginHorizontal: '2%',
    marginTop: '10%',
    marginBottom: '5%',
  },
  contentT: {
    textAlign: 'justify',
    fontSize: 12,
    color: '#16397F',
    marginHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '2%',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    borderRadius: 10,
    marginTop: '2%',
    marginLeft: '60%',
  },
  timerIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  timerTextContainer: {
    marginLeft: 5,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  boardImage: {
    width: '100%', 
    height: '60%', 
  },
  board: {
    position: 'absolute',
    top: '55%',
    alignItems: 'center',
  },
  yellowWord: {
    color: 'yellow',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  micIcon: {
    width: 50,
    height: 50,
  },
  nextButton: {
    backgroundColor: '#FFD166',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: '-30%',
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DA_ReadOutLoudScreen;
