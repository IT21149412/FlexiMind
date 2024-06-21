import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Audio } from 'expo-av'; 
import { useFocusEffect } from '@react-navigation/native';

const EnglishScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext }) => {
  const [clickedWord, setClickedWord] = useState(null);

  const handleWordClick = (word) => {
    if (!timerExpired) {
      setClickedWord(word);
      onClickWord(word);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicE}>Let's Find The Matching Words!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <View style={styles.blackBox}>
        <Text style={styles.yellowWord}>{wordPair.yellow}</Text>
      </View>
      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>
      <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
      <View style={styles.board}>
        <View style={styles.whiteWordsContainer}>
          {wordPair.words.map((word, index) => (
            <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
              <Text style={[
                styles.whiteWord,
                clickedWord === word && styles.clickedWord,
                (timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord),
                (timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord)
              ]}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const TamilScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext }) => {
  const [clickedWord, setClickedWord] = useState(null);

  const handleWordClick = (word) => {
    if (!timerExpired) {
      setClickedWord(word);
      onClickWord(word);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicT}>பொருள் பொருளைக் கண்டுபிடிக்கலாம்!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <View style={styles.blackBox}>
        <Text style={styles.yellowWord}>{wordPair.yellow}</Text>
      </View>
      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>
      <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
      <View style={styles.board}>
        <View style={styles.whiteWordsContainer}>
          {wordPair.words.map((word, index) => (
            <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
              <Text style={[
                styles.whiteWord,
                clickedWord === word && styles.clickedWord,
                (timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord),
                (timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord)
              ]}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
        <Text style={styles.nextButtonText}>அடுத்தது</Text>
      </TouchableOpacity>
    </View>
  );
};



const DA_MatchingWordsScreen2 = ({ navigation, route }) => {
  const { language } = route.params;
  const [timer, setTimer] = useState('00:30');
  const [wordPair, setWordPair] = useState({ yellow: '', words: [] });
  const [soundObject, setSoundObject] = useState(null);
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
      { yellow: 'CLASS', words: ['CLASS', 'GLASS', 'GRASS'] },
      { yellow: 'BURN', words: ['BURN', 'TURN', 'FURN'] },
      { yellow: 'FRANCE', words: ['FRANCE', 'TRANCE', 'CHANCE'] },
      { yellow: 'BEACH', words: ['BEACH', 'REACH', 'TEACH'] },
      { yellow: 'FUNNY', words: ['FUNNY', 'SUNNY', 'BUNNY'] },
      { yellow: 'GAME', words: ['GAME', 'SAME', 'CAME'] },
    ];
  
    const tamilWordPairs = [
      { yellow: 'காடு', words: ['காடு', 'பாடு', 'மாடு'] },
      { yellow: 'புல்', words: ['புல்', 'பல்', 'கல்'] },
      { yellow: 'குயில்', words: ['குயில்', 'மயில்', 'ரயில்'] },
      { yellow: 'பட்டு', words: ['பட்டு', 'எட்டு', 'லட்டு'] },
      { yellow: 'கடை', words: ['கடை', 'நடை', 'வடை'] },
    ];
  
    const wordPairs = language === 'ENGLISH' ? englishWordPairs : tamilWordPairs;
  
    // Randomly select a word pair
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    const selectedWordPair = wordPairs[randomIndex];
    setWordPair(selectedWordPair);
  
    const loadAudio = async () => {
      const recording = language === 'ENGLISH' ? require('../../assets/VoiceRecordings/MatchingWords2English.mp3') : require('../../assets/VoiceRecordings/tamil.m4a');
      const soundObj = new Audio.Sound();
      try {
        await soundObj.loadAsync(recording);
        await soundObj.playAsync();
        soundObj.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            startTimer();
          }
        });
        setSoundObject(soundObj);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };
  
    loadAudio();
  
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, [language]);
  

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

  const handleClickWord = (word) => {
    console.log('Clicked word:', word);
  };

  const onClickNext = () => {
    // Stop audio playback
    if (soundObject) {
      soundObject.stopAsync();
    }
  
    // Clear any existing timeout
    clearTimeout(timer);

    console.log("Language value:", language); // Log the language value
  
    // Navigate to GoodJobScreen after 2 seconds
    const timer = setTimeout(() => {
      // Navigate to GoodJobScreen
      navigation.navigate('DA_GoodJobScreen', { language });
    }, 1000);
};


  return language === 'ENGLISH' ? <EnglishScreen timer={timer} wordPair={wordPair} onClickWord={handleClickWord} timerExpired={timerExpired} onClickNext={onClickNext} /> : <TamilScreen timer={timer} wordPair={wordPair} onClickWord={handleClickWord} timerExpired={timerExpired} onClickNext={onClickNext} />;
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
    marginTop: '10%',
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
  blackBox: {
    backgroundColor: 'black',
    width: '80%',
    height: '12%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: '10%',
    marginBottom: '5%',
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
    paddingTop: 5,
  },
  whiteWordsContainer: {
    flexDirection: 'column', // Display words vertically
    alignItems: 'center', // Center words horizontally
  },
    whiteWord: {
      color: 'white',
      fontSize: 30,
      paddingLeft: '12%', 
      paddingRight: '12%',
      marginBottom:'5%',
    },
    wordRow: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Distributes items evenly in each row
      width: '100%', // Ensure the rows take up the full width
     
    },  
  
  clickedWord: {
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 90,
    padding: 5,
  },
  correctWord: {
    borderWidth: 4,
    borderColor: '#6ECB63',
    borderRadius: 90,
    padding: 5,
  },
  wrongWord: {
    borderWidth: 4,
    borderColor: 'red',
    borderRadius: 90,
    padding: 5,
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

export default DA_MatchingWordsScreen2;



