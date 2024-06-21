import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const wordList = [
  'CLASS', 'GLASS', 'GRASS', 'BURN', 'TURN', 'FURN', 'FRANCE', 'TRANCE', 'CHANCE', 'BEACH', 'REACH', 'TEACH', 'FUNNY', 'SUNNY', 'BUNNY', 'GAME', 'SAME', 'CAME'
];

const DA_SpellingScreen = ({ onLetterClick = () => {} }) => {
  const [timer, setTimer] = useState('00:30');
  const [clickedLetters, setClickedLetters] = useState([]);
  const [jumbledLetters, setJumbledLetters] = useState([]);
  const [yellowWord, setYellowWord] = useState('');
  const [spelledWord, setSpelledWord] = useState('');
  const [timerExpired, setTimerExpired] = useState(false); // State to manage timer expiration
  const [intervalId, setIntervalId] = useState(null); // State to hold intervalId

  useEffect(() => {
    startTimer();
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];
    setYellowWord(randomWord);

    const shuffledLetters = randomWord.split('').sort(() => Math.random() - 0.5);
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
        setTimerExpired(true); // Timer expired
      } else {
        const formattedTime = `${Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        setTimer(formattedTime);
      }
    }, 1000);
    setIntervalId(id); // Store intervalId in state
  };

  const handleLetterClick = (letter) => {
    if (!timerExpired) {
      setClickedLetters([...clickedLetters, letter]);
      onLetterClick(letter);
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
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < count; i++) {
      let randomLetter;
      do {
        randomLetter = allLetters.charAt(Math.floor(Math.random() * allLetters.length));
      } while (word.includes(randomLetter)); // Ensure the letter is not in the word
      additionalLetters.push(randomLetter);
    }
    return additionalLetters;
  };

  const onClickNext = () => {
    // Stop the timer
    clearInterval(intervalId);
  
    // Check if the spelled word matches the yellow word
    const spelledWord = clickedLetters.join('');
    if (spelledWord.toUpperCase() === yellowWord.toUpperCase()) {
      // If the spelled word matches the yellow word, draw a green circle
      console.log('Correct spelling!');
      // Add your logic to draw a green circle here
    } else {
      // If the spelled word does not match the yellow word, draw a red circle
      console.log('Incorrect spelling!');
      // Add your logic to draw a red circle here
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.textTopic}>Spell the Word!</Text>
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
    <Image style={styles.boardImage} source={require('../../assets/GreenBoardVertical.webp')} />
    <View style={styles.board}>
        
        <View style={[styles.clickedLettersContainer, timerExpired && (spelledWord === yellowWord ? styles.correctBorder : styles.incorrectBorder)]}>
        {/* Add conditional styling for the circle */}
        <View style={[styles.circleContainer, timerExpired && (spelledWord === yellowWord ? styles.greenCircleContainer : styles.redCircleContainer)]}>
            <View style={styles.circle} />
        </View>
        {renderClickedLetters()}
        </View>
    </View>
    <View style={styles.lettersContainer}>
        {renderJumbledLetters()}
    </View>
    {/* Next button positioned absolutely */}
    <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
        <Text style={styles.nextButtonText}>Next</Text>
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
      speakerIcon: {
        width: 20,
        height: 20,
        marginRight: '1%',
        marginLeft: '3%',
        marginTop: '3%',
      },
      content: {
        textAlign: 'justify',
        fontSize: 15,
        color: '#16397F',
        marginHorizontal: '3%',
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
        width: '95%', 
        height: '53%', 
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
    clickedLettersContainer: {
        flexDirection: 'row',
        marginBottom: '70%',
        marginTop:'15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 15,
        borderColor: 'transparent', // Initially transparent
    },
    correctBorder: {
        borderWidth: 4,
        borderColor: '#6ECB63',
    },
    incorrectBorder: {
        bborderWidth: 4,
        borderColor: 'red',
    },
    clickedLetter: {
        color: 'white',
        fontSize: 30,
        marginRight: 5,
    },
    lettersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '-55%',
        width: '80%',
        
    },
    letter: {
        color: 'white',
        fontSize: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#FFD166',
        borderRadius: 5,
    },
    nextButton: {
        backgroundColor: '#FFD166',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: '18%',
    },
    nextButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    blackBox: {
      backgroundColor: 'black',
      width: '80%',
      height: '70%',
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 10,
      marginTop: '10%',
      marginBottom: '5%',
    },
});

export default DA_SpellingScreen;
