import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
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

const DA_MatchingWordsScreen = ({ navigation, route }) => {
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

    startTimer();
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
    // Clear any existing timeout
    clearTimeout(timer);

    // Stop the activity
    setTimerExpired(true); // Timer expired

    // Navigate to MatchingWordsScreen2 after 2 seconds
    setTimeout(() => {
      navigation.navigate('DA_MatchingWordsScreen2', { language });
    }, 2000);
  };

  return language === 'ENGLISH' ? 
    <EnglishScreen timer={timer} wordPair={wordPair} onClickWord={handleClickWord} timerExpired={timerExpired} onClickNext={onClickNext} /> : 
    <TamilScreen timer={timer} wordPair={wordPair} onClickWord={handleClickWord} timerExpired={timerExpired} onClickNext={onClickNext} />;
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  whiteWord: {
    color: 'white',
    fontSize: 35,
    paddingLeft: '8%', 
    paddingRight: '8%',
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

export default DA_MatchingWordsScreen;
