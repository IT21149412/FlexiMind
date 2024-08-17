import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const wordList = {
  ENGLISH: ['CLASS', 'GLASS', 'GRASS', 'BURN', 'TURN', 'FURN', 'FRANCE', 'TRANCE', 'CHANCE', 'BEACH', 'REACH', 'TEACH', 'FUNNY', 'SUNNY', 'BUNNY', 'GAME', 'SAME', 'CAME'],
  TAMIL: ['மரம்', 'வனம்', 'பதம்', 'புல்', 'மண்', 'மழை', 'சீர்', 'பால்', 'நீர்', 'முத்து']
};

const getCompoundLetters = (word) => {
  const compoundLetters = [];
  for (const letter of word) {
    if (letter === '்' && compoundLetters.length > 0) {
      const previousLetter = compoundLetters.pop();
      compoundLetters.push(previousLetter + letter);
    } else {
      compoundLetters.push(letter);
    }
  }
  return compoundLetters;
};

const DA_SpellingScreen = ({ navigation, route }) => {
  const { language } = route.params;
  const [timer, setTimer] = useState('00:30');
  const [clickedLetters, setClickedLetters] = useState([]);
  const [jumbledLetters, setJumbledLetters] = useState([]);
  const [yellowWord, setYellowWord] = useState('');
  const [spelledWord, setSpelledWord] = useState('');
  const [timerExpired, setTimerExpired] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    startTimer();
    const words = wordList[language];
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    setYellowWord(randomWord);
    const shuffledLetters = getCompoundLetters(randomWord).sort(() => Math.random() - 0.5);
    const additionalLetters = getRandomAdditionalLetters(randomWord, 3);
    const allLetters = shuffledLetters.concat(additionalLetters).sort(() => Math.random() - 0.5);
    setJumbledLetters(allLetters);
  }, []);

  useEffect(() => {
    if (timerExpired) {
      clearInterval(intervalId);
      const spelledWord = clickedLetters.join('');
      setSpelledWord(spelledWord);
    }
  }, [timerExpired]);

  const startTimer = () => {
    let seconds = 30;
    const id = setInterval(() => {
      seconds -= 1;
      if (seconds === 0) {
        clearInterval(id);
        setTimer('00:00');
        setTimerExpired(true);
      } else {
        const formattedTime = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        setTimer(formattedTime);
      }
    }, 1000);
    setIntervalId(id);
  };

  const handleLetterClick = (letter) => {
    if (!timerExpired) {
      setClickedLetters([...clickedLetters, letter]);
    } else {
      alert('Timer is expired!');
    }
  };

  const renderJumbledLetters = () => {
    return jumbledLetters.map((letter, index) => (
      <TouchableOpacity key={index} onPress={() => handleLetterClick(letter)}>
        <Text style={styles.letter}>{letter}</Text>
      </TouchableOpacity>
    ));
  };

  const renderClickedLetters = () => {
    return clickedLetters.map((letter, index) => (
      <Text key={index} style={styles.clickedLetter}>{letter}</Text>
    ));
  };

  const getRandomAdditionalLetters = (word, count) => {
    const additionalLetters = [];
    const allLetters = language === 'ENGLISH' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநபமயரலவழளறன';
    for (let i = 0; i < count; i++) {
      let randomLetter;
      do {
        randomLetter = allLetters.charAt(Math.floor(Math.random() * allLetters.length));
      } while (word.includes(randomLetter));
      additionalLetters.push(randomLetter);
    }
    return additionalLetters;
  };

  const onClickNext = () => {
    clearInterval(intervalId);
    const spelledWord = clickedLetters.join('');
    if (spelledWord.toUpperCase() === yellowWord.toUpperCase()) {
      console.log('Correct spelling!');
    } else {
      console.log('Incorrect spelling!');
    }

    // Clear any existing timeout
    clearTimeout(timer);
    
    // Stop the activity
    setTimerExpired(true); // Timer expired

    // Navigate to GoodJobScreen
    const timer = setTimeout(() => {
      // Navigate to GoodJobScreen
      navigation.navigate('DA_SpellingScreen2', { language });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>{language === 'ENGLISH' ? 'Spell the Word!' : 'வார்த்தையை உச்சரிக்கவும்!'}</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <View style={styles.descriptionContainer}>
        <View style={styles.blackBox}>
          <Text style={styles.yellowWord}>{yellowWord}</Text>
        </View>
      </View>
      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>
      <Image style={styles.boardImage} source={require('../../assets/GreenBoardVertical.png')} />
      <View style={styles.board}>
        <View style={[styles.clickedLettersContainer, timerExpired && (spelledWord === yellowWord ? styles.correctBorder : styles.incorrectBorder)]}>
          <View style={[styles.circleContainer, timerExpired && (spelledWord === yellowWord ? styles.greenCircleContainer : styles.redCircleContainer)]}>
            <View style={styles.circle} />
          </View>
          {renderClickedLetters()}
        </View>
      </View>
      <View style={styles.lettersContainer}>
        {renderJumbledLetters()}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
        <Text style={styles.nextButtonText}>{language === 'ENGLISH' ? 'Next' : 'அடுத்தது'}</Text>
      </TouchableOpacity>
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
    top: '14%',
    width: '100%',
    height: '100%',
    zIndex: -1,
    resizeMode: 'cover',
    borderWidth: 1,
    borderRadius: 85,
  },
  textTopic: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
    color: '#FFD166',
    marginTop: '15%',
    marginBottom: '2%',
    paddingLeft: '2%',
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
  blackBox: {
    backgroundColor: '#6ecb63',
    width: '80%',
    height: '65%',
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: '4%',
    marginBottom: '8%',
    borderWidth: 2,
    borderColor: '#4D86F7',
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
    height: '30%', 
    marginTop: '10%',
    marginBottom: '10%'
  },
  board: {
    position: 'absolute',
    top: '45%',
    alignItems: 'center',
  },
  yellowWord: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  clickedLettersContainer: {
    flexDirection: 'row',
    marginBottom: '70%',
    marginTop: '15%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'transparent',
  },
  correctBorder: {
    borderWidth: 4,
    borderColor: '#6ECB63',
  },
  incorrectBorder: {
    borderWidth: 4,
    borderColor: 'red',
    borderRadius: '10%',
  },
  // circleContainer: {
  //   position: 'absolute',
  //   top: '20%',
  //   right: '25%',
  // },
  // circle: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 30,
  // },
  greenCircleContainer: {
    backgroundColor: '#6ECB63',
  },
  redCircleContainer: {
    backgroundColor: 'red',
  },
  lettersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 'auto',
  },
  letter: {
    backgroundColor: '#4D86F7',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFD166',
    marginBottom: '10%',
  },
  clickedLetter: {
    backgroundColor: '#4D86F7',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 25,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: '#FFD166',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: '5%',
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DA_SpellingScreen;
