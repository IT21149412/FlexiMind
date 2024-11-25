// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity, BackHandler, Modal } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';

// const wordList = {
//   ENGLISH: ['CLASS', 'GLASS', 'GRASS', 'BURN', 'TURN', 'FURN', 'FRANCE', 'TRANCE', 'CHANCE', 'BEACH', 'REACH', 'TEACH', 'FUNNY', 'SUNNY', 'BUNNY', 'GAME', 'SAME', 'CAME'],
//   TAMIL: ['மரம்', 'வனம்', 'பதம்', 'வனம்', 'மண்', 'நலம்', 'பணம்', 'வனத', 'அரசவ', 'பணவ', 'மகன', 'கலத']
// };

// const getCompoundLetters = (word) => {
//   const compoundLetters = [];
//   for (const letter of word) {
//     if (letter === '்' && compoundLetters.length > 0) {
//       const previousLetter = compoundLetters.pop();
//       compoundLetters.push(previousLetter + letter);
//     } else {
//       compoundLetters.push(letter);
//     }
//   }
//   return compoundLetters;
// };

// const DA_SpellingScreen = ({ navigation, route }) => {
//   const { language } = route.params;
//   const [timer, setTimer] = useState('00:30');
//   const [clickedLetters, setClickedLetters] = useState([]);
//   const [jumbledLetters, setJumbledLetters] = useState([]);
//   const [yellowWord, setYellowWord] = useState('');
//   const [spelledWord, setSpelledWord] = useState('');
//   const [timerExpired, setTimerExpired] = useState(false);
//   const [intervalId, setIntervalId] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [animationType, setAnimationType] = useState('');

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => true;
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [])
//   );

//   useEffect(() => {
//     startTimer();
//     const words = wordList[language];
//     const randomIndex = Math.floor(Math.random() * words.length);
//     const randomWord = words[randomIndex];
//     setYellowWord(randomWord);
//     const shuffledLetters = getCompoundLetters(randomWord).sort(() => Math.random() - 0.5);
//     const additionalLetters = getRandomAdditionalLetters(randomWord, 3);
//     const allLetters = shuffledLetters.concat(additionalLetters).sort(() => Math.random() - 0.5);
//     setJumbledLetters(allLetters);
//   }, []);

//   useEffect(() => {
//     if (timerExpired) {
//       clearInterval(intervalId);
//       const spelledWord = clickedLetters.join('');
//       setSpelledWord(spelledWord);
//       showResultModal(spelledWord.toUpperCase() === yellowWord.toUpperCase());
//     }
//   }, [timerExpired]);

//   const startTimer = () => {
//     let seconds = 30;
//     const id = setInterval(() => {
//       seconds -= 1;
//       if (seconds === 0) {
//         clearInterval(id);
//         setTimer('00:00');
//         setTimerExpired(true);
//       } else {
//         const formattedTime = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
//         setTimer(formattedTime);
//       }
//     }, 1000);
//     setIntervalId(id);
//   };

//   const handleLetterClick = (letter) => {
//     if (!timerExpired) {
//       setClickedLetters([...clickedLetters, letter]);
//     } else {
//       alert('Timer is expired!');
//     }
//   };

//   const renderJumbledLetters = () => {
//     return jumbledLetters.map((letter, index) => (
//       <TouchableOpacity key={index} onPress={() => handleLetterClick(letter)}>
//         <Text style={styles.letter}>{letter}</Text>
//       </TouchableOpacity>
//     ));
//   };

//   const renderClickedLetters = () => {
//     return clickedLetters.map((letter, index) => (
//       <Text key={index} style={styles.clickedLetter}>{letter}</Text>
//     ));
//   };

//   const getRandomAdditionalLetters = (word, count) => {
//     const additionalLetters = [];
//     const allLetters = language === 'ENGLISH' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநபமயரலவழளறன';
//     for (let i = 0; i < count; i++) {
//       let randomLetter;
//       do {
//         randomLetter = allLetters.charAt(Math.floor(Math.random() * allLetters.length));
//       } while (word.includes(randomLetter));
//       additionalLetters.push(randomLetter);
//     }
//     return additionalLetters;
//   };

//   const showResultModal = (isCorrect) => {
//     setAnimationType(isCorrect ? 'correct' : 'wrong');
//     setModalVisible(true);
//   };

//   const renderAnimation = () => {
//     switch (animationType) {
//       case 'correct':
//         return <Image source={require('../../assets/correct_gif.gif')} style={styles.gif} />;
//       case 'wrong':
//         return <Image source={require('../../assets/wrong_gif.gif')} style={styles.gif} />;
//       default:
//         return null;
//     }
//   };

//   const renderModalText = () => {
//     if (animationType === 'correct') {
//       return 'Good job! You are doing great!';
//     } else if (animationType === 'wrong') {
//       return "Let's do better next time! You can do this!";
//     }
//     return '';
//   };

//   const onClickNext = () => {
//     clearInterval(intervalId);
//     const spelledWord = clickedLetters.join('');
//     setTimerExpired(true);
//     setTimeout(() => {
//         setModalVisible(false); // Hide modal before navigating
        
//         if (language === 'TAMIL') {
//             navigation.navigate('DA_ReadOutLoudDescriptionScreen', { language });
//         } else if (language === 'ENGLISH') {
//             navigation.navigate('DA_GoodJobScreenSpell', { language });
//         }
//     }, 100);
//   };


//   return (
//     <View style={styles.container}>
//       <Text style={styles.textTopic}>{language === 'ENGLISH' ? 'Spell the Word!' : 'வார்த்தையை உச்சரிக்கவும்!'}</Text>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay} />
//       <View style={styles.descriptionContainer}>
//         <View style={styles.blackBox}>
//           <Text style={styles.yellowWord}>{yellowWord}</Text>
//         </View>
//       </View>
//       <View style={styles.timerContainer}>
//         <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
//         <View style={styles.timerTextContainer}>
//           <Text style={styles.timerText}>{timer}</Text>
//         </View>
//       </View>
//       <Image style={styles.boardImage} source={require('../../assets/GreenBoardVertical.png')} />
//       <View style={styles.board}>
//         <View style={[styles.clickedLettersContainer, timerExpired && (spelledWord === yellowWord ? styles.correctBorder : styles.incorrectBorder)]}>
//           <View style={[styles.circleContainer, timerExpired && (spelledWord === yellowWord ? styles.greenCircleContainer : styles.redCircleContainer)]}>
//             <View style={styles.circle} />
//           </View>
//           {renderClickedLetters()}
//         </View>
//       </View>
//       <View style={styles.lettersContainer}>
//         {renderJumbledLetters()}
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
//         <Text style={styles.nextButtonText}>{language === 'ENGLISH' ? 'Next' : 'அடுத்தது'}</Text>
//       </TouchableOpacity>
      
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {renderAnimation()}
//             <Text style={styles.modalText}>{renderModalText()}</Text>
//             <TouchableOpacity style={styles.modalNextButton} onPress={onClickNext}>
//               <Text style={styles.nextButtonText}>{language === 'ENGLISH' ? 'Next' : 'அடுத்தது'}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, BackHandler, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db, auth } from '../firebase'; // Firebase instance for Firestore
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'; // Firestore methods

const wordList = {
  en: ['CLASS', 'GLASS', 'GRASS', 'BURN', 'TURN', 'FURN', 'FRANCE', 'TRANCE', 'CHANCE', 'BEACH', 'REACH', 'TEACH', 'FUNNY', 'SUNNY', 'BUNNY', 'GAME', 'SAME', 'CAME'],
  ta: ['மரம்', 'வனம்', 'பதம்', 'வனம்', 'மண்', 'நலம்', 'பணம்', 'வனத', 'அரசவ', 'பணவ', 'மகன', 'கலத']
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
  const [modalVisible, setModalVisible] = useState(false);
  const [animationType, setAnimationType] = useState('');
  const [wordCounter, setWordCounter] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    startTimer();
    loadNewWord();
  };

  const loadNewWord = () => {
    const words = wordList[language];
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    setYellowWord(randomWord);
    const shuffledLetters = getCompoundLetters(randomWord).sort(() => Math.random() - 0.5);
    const additionalLetters = getRandomAdditionalLetters(randomWord, 3);
    const allLetters = shuffledLetters.concat(additionalLetters).sort(() => Math.random() - 0.5);
    setJumbledLetters(allLetters);
    setClickedLetters([]);
    setTimerExpired(false);
    setSpelledWord('');
  };

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
    const allLetters = language === 'en' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநபமயரலவழளறன';
    for (let i = 0; i < count; i++) {
      let randomLetter;
      do {
        randomLetter = allLetters.charAt(Math.floor(Math.random() * allLetters.length));
      } while (word.includes(randomLetter));
      additionalLetters.push(randomLetter);
    }
    return additionalLetters;
  };

  const showResultModal = async (isCorrect) => {
    setAnimationType(isCorrect ? 'correct' : 'wrong');
    setModalVisible(true);
    
    // Store result in the database
    const spelledWord = clickedLetters.join('');
    await storeResultInFirestore(spelledWord, isCorrect);
  };

  const storeResultInFirestore = async (spelledWord, isCorrect) => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const docRef = doc(db, 'Spelling_Results', userId);
  
      try {
        const roundData = {
          word: yellowWord, // Correct word
          spelledWord,      // User-spelled word
          isCorrect,        // Whether the spelling was correct
          round: wordCounter + 1, // Current round number
          timeTaken: 30 - parseInt(timer.split(':')[1]), // Time taken for this round
        };
  
        if (wordCounter === 0) {
          // First round, create a new document
          await setDoc(docRef, {
            userId,
            language,
            results: [roundData], // Store round data in array
            // Set the timestamp outside of the results array
            lastUpdated: serverTimestamp(), // Timestamp of the last update
          });
        } else {
          // Update document, append new result
          await updateDoc(docRef, {
            results: arrayUnion(roundData), // Add new result to the array
            lastUpdated: serverTimestamp(), // Update the timestamp outside the array
          });
        }
      } catch (error) {
        console.error('Error storing result in Firestore:', error);
      }
    } else {
      console.error('No user logged in');
    }
  };
  
  

  const renderAnimation = () => {
    if (animationType === 'correct') {
      return <Image source={require('../../assets/correct_gif.gif')} style={styles.gif} />;
    } else if (animationType === 'wrong') {
      return <Image source={require('../../assets/wrong_gif.gif')} style={styles.gif} />;
    }
    return null;
  };

  const renderModalText = () => {
    if (animationType === 'correct') {
      return 'Good job! You are doing great!';
    } else if (animationType === 'wrong') {
      return "Let's do better next time! You can do this!";
    }
    return '';
  };

  const onClickShowModal = () => {
    const spelledWord = clickedLetters.join('');
    const isCorrect = spelledWord.toUpperCase() === yellowWord.toUpperCase();
    showResultModal(isCorrect);
  };

  const onClickNextInModal = () => {
    clearInterval(intervalId);
    if (wordCounter < 3) {
      setWordCounter(wordCounter + 1);
      setModalVisible(false);
      startGame();
    } else {
      setTimeout(() => {
        setModalVisible(false);
        if (language === 'ta') {
          navigation.navigate('DA_ReadOutLoudDescriptionScreen', { language });
        } else if (language === 'en') {
          navigation.navigate('DA_GoodJobScreenSpell', { language });
        }
      }, 100);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>{language === 'en' ? 'Spell the Word!' : 'வார்த்தையை உச்சரிக்கவும்!'}</Text>
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

      <TouchableOpacity style={styles.nextButton} onPress={onClickShowModal}>
        <Text style={styles.nextButtonText}>{language === 'en' ? 'Next' : 'அடுத்தது'}</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {renderAnimation()}
            <Text style={styles.modalText}>{renderModalText()}</Text>
            <TouchableOpacity style={styles.modalNextButton} onPress={onClickNextInModal}>
              <Text style={styles.nextButtonText}>{language === 'en' ? 'Next' : 'அடுத்தது'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  // Existing styles
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
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'transparent',
    width: '90%', // Set the width of the container
    height: 70, // Set a fixed height for the container
    overflow: 'hidden', // Ensure letters don't overflow the container
    paddingHorizontal: 10,
    marginBottom: '10%', // Adjust margin if needed
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
    backgroundColor: '#008080',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFD166',
    marginBottom: '10%',
    textAlign: 'center',
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4, // Adds a subtle shadow on Android
  },
  
  clickedLetter: {
    backgroundColor: '#FF6F61',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 35,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    borderRadius: 5,
    borderColor:'#FFD166',
    borderWidth: 1,
    textAlign: 'center',
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4, // Adds a subtle shadow on Android
  },
  
  nextButton: {
    backgroundColor: '#FFD166',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 270,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  gif: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalNextButton: {
    backgroundColor: '#FFD166',
    padding: 10,
    borderRadius: 5,
  },
});

export default DA_SpellingScreen;
