// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity, Modal } from 'react-native';
// import { Audio } from 'expo-av';

// const EnglishScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, playYellowWordAudio }) => {
//   const [clickedWord, setClickedWord] = useState(null);

//   const handleWordClick = (word) => {
//     if (!timerExpired) {
//       setClickedWord(word);
//       onClickWord(word);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.textTopicE}>Listen and Choose!</Text>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay} />
//       <View style={styles.descriptionContainer}>
//         <TouchableOpacity onPress={playYellowWordAudio}>
//           <Image style={styles.speakerImage} source={require('../../assets/ListenSpeak.png')} />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.timerContainer}>
//         <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
//         <View style={styles.timerTextContainer}>
//           <Text style={styles.timerText}>{timer}</Text>
//         </View>
//       </View>
//       <View style={styles.answerContainer}>
//         {wordPair.words.map((word, index) => (
//           <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
//             <View style={[
//               styles.answerBox,
//               clickedWord === word && styles.clickedWord,
//               timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord,
//               timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord,
//             ]}>
//               <Text style={styles.answerText}>{word}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const TamilScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, playYellowWordAudio }) => {
//   const [clickedWord, setClickedWord] = useState(null);

//   const handleWordClick = (word) => {
//     if (!timerExpired) {
//       setClickedWord(word);
//       onClickWord(word);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.textTopicT}>கேட்டுவிட்டு தேர்வு செய்!</Text>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay} />
//       <View style={styles.descriptionContainer}>
//         <TouchableOpacity onPress={playYellowWordAudio}>
//           <Image style={styles.speakerImage} source={require('../../assets/ListenSpeak.png')} />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.timerContainer}>
//         <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
//         <View style={styles.timerTextContainer}>
//           <Text style={styles.timerText}>{timer}</Text>
//         </View>
//       </View>
//       <View style={styles.answerContainer}>
//         {wordPair.words.map((word, index) => (
//           <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
//             <View style={[
//               styles.answerBox,
//               clickedWord === word && styles.clickedWord,
//               timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord,
//               timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord,
//             ]}>
//               <Text style={styles.answerText}>{word}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
//         <Text style={styles.nextButtonText}>அடுத்தது</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const DA_ListenAndChooseScreen = ({ navigation, route }) => {
//   const { language } = route.params;
//   const [timer, setTimer] = useState('00:30');
//   const [wordPair, setWordPair] = useState({ yellow: '', words: [] });
//   const [soundObject, setSoundObject] = useState(null);
//   const [timerExpired, setTimerExpired] = useState(false);
//   const [currentRound, setCurrentRound] = useState(1);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [animationType, setAnimationType] = useState('');
//   const [clickedWord, setClickedWord] = useState(null);
//   const [startTime, setStartTime] = useState(null);
//   const [results, setResults] = useState([]); // Store results in state
//   const maxRounds = 4;
//   const [intervalId, setIntervalId] = useState(null);

//   const englishWordPairs = [
//     { yellow: 'TOOK', audio: require('../../assets/VoiceRecordings/Took.mp3'), words: ['LOOK', 'TOOK', 'BOOK'] },
//     { yellow: 'WAY', audio: require('../../assets/VoiceRecordings/Way.mp3'), words: ['WAY', 'MAY', 'DAY'] },
//     { yellow: 'PAN', audio: require('../../assets/VoiceRecordings/Pan.mp3'), words: ['PAN', 'NAP', 'CAN'] },
//     { yellow: 'WEST', audio: require('../../assets/VoiceRecordings/West.mp3'), words: ['WEST', 'NEST', 'BEST'] },
//     { yellow: 'FALL', audio: require('../../assets/VoiceRecordings/Fall.mp3'), words: ['FALL', 'TALL', 'CALL'] },
//     { yellow: 'SLEEP', audio: require('../../assets/VoiceRecordings/Sleep.mp3'), words: ['SLEEP', 'SHEEP', 'CREEP'] },
//   ];

//   const tamilWordPairs = [
//     { yellow: 'காடு', audio: require('../../assets/VoiceRecordings/Kaadu.m4a'), words: ['காடு', 'நாடு', 'பாடு'] },
//     { yellow: 'புல்', audio: require('../../assets/VoiceRecordings/Pul.m4a'), words: ['புல்', 'பல்', 'நல்'] },
//     { yellow: 'குயில்', audio: require('../../assets/VoiceRecordings/Kuyil.m4a'), words: ['குயில்', 'மயில்', 'சிலை'] },
//     { yellow: 'தட்டு', audio: require('../../assets/VoiceRecordings/Tattu.m4a'), words: ['தட்டு', 'எட்டு', 'பட்டு'] },
//     { yellow: 'கடை', audio: require('../../assets/VoiceRecordings/Kadai.m4a'), words: ['கடை', 'நடை', 'படை'] },
//   ];

//   useEffect(() => {
//     const wordPairs = language === 'ENGLISH' ? englishWordPairs : tamilWordPairs;
//     setNewWordPair(wordPairs);
//   }, [language, currentRound]);

//   useEffect(() => {
//     startTimer();
//     return () => {
//       clearInterval(intervalId); // Clear the interval on unmount
//       if (soundObject) {
//         soundObject.unloadAsync(); // Unload the sound object on unmount
//       }
//     };
//   }, [wordPair]);

//   const setNewWordPair = (wordPairs) => {
//     const randomIndex = Math.floor(Math.random() * wordPairs.length);
//     const selectedWordPair = wordPairs[randomIndex];
//     setWordPair(selectedWordPair);
//     playYellowWordAudio(selectedWordPair.audio);
//     setClickedWord(null); // Reset clicked word for each round
//     setStartTime(Date.now()); // Start time for the round
//   };

//   const playYellowWordAudio = async (audio) => {
//     if (soundObject) {
//       await soundObject.unloadAsync();
//     }

//     const yellowWordSoundObj = new Audio.Sound();
//     try {
//       await yellowWordSoundObj.loadAsync(audio);
//       await yellowWordSoundObj.playAsync();
//     } catch (error) {
//       console.error('Error loading yellow word audio:', error);
//     }
//     setSoundObject(yellowWordSoundObj);
//   };

//   const startTimer = () => {
//     if (intervalId) {
//       clearInterval(intervalId); // Clear any existing interval before starting a new one
//     }

//     let seconds = 30;
//     const id = setInterval(() => {
//       seconds -= 1;
//       if (seconds === 0) {
//         clearInterval(id);
//         setTimer('00:00');
//         setTimerExpired(true); // Timer expired
//         handleModal();
//       } else {
//         const formattedTime = `${Math.floor(seconds / 60)
//           .toString()
//           .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
//         setTimer(formattedTime);
//       }
//     }, 1000);
//     setIntervalId(id);
//   };

//   const handleClickWord = (word) => {
//     setClickedWord(word);
//   };

//   const handleModal = () => {
//     setModalVisible(true);
//     const timeTaken = (Date.now() - startTime) / 1000; // Time taken in seconds

//     const result = {
//       activity: 'listen_and_choose',
//       round: currentRound,
//       correctWord: wordPair.yellow,
//       selectedWord: clickedWord,
//       isCorrect: clickedWord === wordPair.yellow,
//       timeTaken: timeTaken.toFixed(2),
//     };

//     setResults([...results, result]);

//     if (!clickedWord) {
//       setAnimationType('better');
//       setModalMessage("Cheer up! You can do this! listen");
//     } else if (clickedWord === wordPair.yellow) {
//       setAnimationType('correct');
//       setModalMessage("Good job! You selected the correct answer.");
//     } else {
//       setAnimationType('wrong');
//       setModalMessage("Let's do better in the next round!");
//     }
//   };

//   const handleNext = async () => {
//     // Reset state variables
//     setModalVisible(false);
//     setClickedWord(null);
//     setTimerExpired(false);
//     setTimer('00:30');
//     setAnimationType('');

//     // Unload sound object and clear timer when navigating away
//     if (soundObject) {
//       await soundObject.unloadAsync();
//     }
//     if (intervalId) {
//       clearInterval(intervalId);
//     }

//     if (currentRound < maxRounds) {
//       setCurrentRound(currentRound + 1);
//     } else {
//       // Calculate the total mark
//       const correctAnswers = results.filter(result => result.isCorrect).length;
//       const totalMark = (correctAnswers / maxRounds) * 100;

//       // Log the results and the total mark
//       console.log('Results:', results);
//       console.log(`Total mark for listen_activity: ${totalMark}%`);

//       // Reset state before navigating to avoid unwanted modal display on the next page
//       setResults([]);

//       // Move to the next screen
//       navigation.navigate('DA_BingoDescriptionScreen', {
//         language,
//         results, // Pass the results state
//         setResults, // Pass the setResults function
//       });
//     }
//   };

//   const renderAnimation = () => {
//     switch (animationType) {
//       case 'correct':
//         return <Image source={require('../../assets/correct_gif.gif')} style={styles.gif} />;
//       case 'better':
//         return <Image source={require('../../assets/better_luck_gif.gif')} style={styles.gif} />;
//       case 'wrong':
//         return <Image source={require('../../assets/wrong_gif.gif')} style={styles.gif} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       {language === 'ENGLISH' ? (
//         <EnglishScreen
//           timer={timer}
//           wordPair={wordPair}
//           onClickWord={handleClickWord}
//           timerExpired={timerExpired}
//           onClickNext={handleModal}
//           playYellowWordAudio={() => soundObject && soundObject.replayAsync()}
//         />
//       ) : (
//         <TamilScreen
//           timer={timer}
//           wordPair={wordPair}
//           onClickWord={handleClickWord}
//           timerExpired={timerExpired}
//           onClickNext={handleModal}
//           playYellowWordAudio={() => soundObject && soundObject.replayAsync()}
//         />
//       )}
//       <Modal
//         transparent={true}
//         animationType="fade"
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {renderAnimation()}
//             <Text style={styles.modalText}>{modalMessage}</Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={handleNext}
//             >
//               <Text style={styles.closeButtonText}>Next</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { auth, db } from '../firebase'; // Firebase imports
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'; // Firestore methods
import * as FileSystem from 'expo-file-system';

const logFilePath = `${FileSystem.documentDirectory}app_logs.txt`; 

// Function to write to the log file
const writeToLogFile = async (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  try {
    await FileSystem.writeAsStringAsync(logFilePath, logMessage, { append: true });
    console.log('Log written:', logMessage);
  } catch (error) {
    console.error('Failed to write log:', error);
  }
};

const EnglishScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, playYellowWordAudio }) => {
  const [clickedWord, setClickedWord] = useState(null);

  const handleWordClick = (word) => {
    if (!timerExpired) {
      setClickedWord(word);
      onClickWord(word);
      writeToLogFile(`Word clicked: ${word}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicE}>Listen and Choose!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <View style={styles.descriptionContainer}>
        <TouchableOpacity onPress={playYellowWordAudio}>
          <Image style={styles.speakerImage} source={require('../../assets/ListenSpeak.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>
      <View style={styles.answerContainer}>
        {wordPair.words.map((word, index) => (
          <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
            <View style={[
              styles.answerBox,
              clickedWord === word && styles.clickedWord,
              timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord,
              timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord,
            ]}>
              <Text style={styles.answerText}>{word}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const TamilScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, playYellowWordAudio }) => {
  const [clickedWord, setClickedWord] = useState(null);

  const handleWordClick = (word) => {
    if (!timerExpired) {
      setClickedWord(word);
      onClickWord(word);
      writeToLogFile(`Word clicked: ${word}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicT}>கேட்டுவிட்டு தேர்வு செய்!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <View style={styles.descriptionContainer}>
        <TouchableOpacity onPress={playYellowWordAudio}>
          <Image style={styles.speakerImage} source={require('../../assets/ListenSpeak.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>
      <View style={styles.answerContainer}>
        {wordPair.words.map((word, index) => (
          <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
            <View style={[
              styles.answerBox,
              clickedWord === word && styles.clickedWord,
              timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord,
              timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord,
            ]}>
              <Text style={styles.answerText}>{word}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
        <Text style={styles.nextButtonText}>அடுத்தது</Text>
      </TouchableOpacity>
    </View>
  );
};


const DA_ListenAndChooseScreen = ({ navigation, route }) => {
  const { language } = route.params;
  const [timer, setTimer] = useState('00:30');
  const [wordPair, setWordPair] = useState({ yellow: '', words: [] });
  const [soundObject, setSoundObject] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [animationType, setAnimationType] = useState('');
  const [clickedWord, setClickedWord] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const maxRounds = 4;
  const [intervalId, setIntervalId] = useState(null);

  const englishWordPairs = [
    { yellow: 'TOOK', audio: require('../../assets/VoiceRecordings/Took.mp3'), words: ['LOOK', 'TOOK', 'BOOK'] },
    { yellow: 'WAY', audio: require('../../assets/VoiceRecordings/Way.mp3'), words: ['WAY', 'MAY', 'DAY'] },
    { yellow: 'PAN', audio: require('../../assets/VoiceRecordings/Pan.mp3'), words: ['PAN', 'NAP', 'CAN'] },
    { yellow: 'WEST', audio: require('../../assets/VoiceRecordings/West.mp3'), words: ['WEST', 'NEST', 'BEST'] },
    { yellow: 'FALL', audio: require('../../assets/VoiceRecordings/Fall.mp3'), words: ['FALL', 'TALL', 'CALL'] },
    { yellow: 'SLEEP', audio: require('../../assets/VoiceRecordings/Sleep.mp3'), words: ['SLEEP', 'SHEEP', 'CREEP'] },
  ];

  const tamilWordPairs = [
    { yellow: 'காடு', audio: require('../../assets/VoiceRecordings/Kaadu.m4a'), words: ['காடு', 'நாடு', 'பாடு'] },
    { yellow: 'புல்', audio: require('../../assets/VoiceRecordings/Pul.m4a'), words: ['புல்', 'பல்', 'நல்'] },
    { yellow: 'குயில்', audio: require('../../assets/VoiceRecordings/Kuyil.m4a'), words: ['குயில்', 'மயில்', 'சிலை'] },
    { yellow: 'தட்டு', audio: require('../../assets/VoiceRecordings/Tattu.m4a'), words: ['தட்டு', 'எட்டு', 'பட்டு'] },
    { yellow: 'கடை', audio: require('../../assets/VoiceRecordings/Kadai.m4a'), words: ['கடை', 'நடை', 'படை'] },
  ];

  useEffect(() => {
    const wordPairs = language === 'ENGLISH' ? englishWordPairs : tamilWordPairs;
    setNewWordPair(wordPairs);
  }, [language, currentRound]);

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalId);
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, [wordPair]);

  const setNewWordPair = (wordPairs) => {
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    const selectedWordPair = wordPairs[randomIndex];
    setWordPair(selectedWordPair);
    playYellowWordAudio(selectedWordPair.audio);
    setClickedWord(null);
    setStartTime(Date.now());
    writeToLogFile(`New word pair selected: ${selectedWordPair.yellow}`);
  };

  const playYellowWordAudio = async (audio) => {
    if (soundObject) {
      await soundObject.unloadAsync();
    }

    const yellowWordSoundObj = new Audio.Sound();
    try {
      await yellowWordSoundObj.loadAsync(audio);
      await yellowWordSoundObj.playAsync();
      writeToLogFile(`Playing audio for: ${audio}`);
    } catch (error) {
      console.error('Error loading yellow word audio:', error);
    }
    setSoundObject(yellowWordSoundObj);
  };

  const startTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    let seconds = 30;
    const id = setInterval(() => {
      seconds -= 1;
      if (seconds === 0) {
        clearInterval(id);
        setTimer('00:00');
        setTimerExpired(true);
        handleModal();
        writeToLogFile('Timer expired');
      } else {
        const formattedTime = `${Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        setTimer(formattedTime);
      }
    }, 1000);
    setIntervalId(id);
  };

  const handleClickWord = (word) => {
    setClickedWord(word);
  };

  const handleModal = async () => {
    setModalVisible(true);
    const timeTaken = (Date.now() - startTime) / 1000;

    const result = {
      round: currentRound,
      correctWord: wordPair.yellow,
      selectedWord: clickedWord,
      isCorrect: clickedWord === wordPair.yellow,
      timeTaken: timeTaken.toFixed(2),
    };

    await saveResults(result);

    if (!clickedWord) {
      setAnimationType('better');
      setModalMessage("Cheer up! You can do this! listen");
    } else if (clickedWord === wordPair.yellow) {
      setAnimationType('correct');
      setModalMessage("Good job! You selected the correct answer.");
    } else {
      setAnimationType('wrong');
      setModalMessage("Let's do better in the next round!");
    }
    writeToLogFile(`Modal shown for round: ${currentRound}, Correct: ${result.isCorrect}`);
  };

  const saveResults = async (result) => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
  
      // Log the user ID to ensure it's valid
      console.log('Current user ID:', userId);
  
      // Refresh the user's token if needed
      await auth.currentUser.getIdToken(true);
  
      // Firestore operations here
      try {
        if (currentRound === 1) {
          await setDoc(doc(db, 'listen_and_choose_results', userId), {
            userId,
            level: 'Level 1',
            results: [result],
            timestamp: serverTimestamp(),
          });
        } else {
          const docRef = doc(db, 'listen_and_choose_results', userId);
          await updateDoc(docRef, {
            results: arrayUnion(result),
          });
        }
  
        console.log('Results successfully stored in Firestore');
        writeToLogFile(`Results saved to Firestore for round: ${currentRound}`);
      } catch (error) {
        console.error('Error adding document:', error);
        writeToLogFile(`Error saving results to Firestore: ${error.message}`);
      }
    } else {
      console.error('No user is logged in');
      writeToLogFile('Error: No user is logged in');
    }
  };
  

  const handleNext = async () => {
    setModalVisible(false);
    setClickedWord(null);
    setTimerExpired(false);
    setTimer('00:30');
    setAnimationType('');

    if (soundObject) {
      await soundObject.unloadAsync();
    }
    if (intervalId) {
      clearInterval(intervalId);
    }

    if (currentRound < maxRounds) {
      setCurrentRound(currentRound + 1);
      writeToLogFile(`Moving to next round: ${currentRound + 1}`);
    } else {
      writeToLogFile('All rounds completed. Navigating to next screen.');
      navigation.navigate('DA_BingoDescriptionScreen', { language });
    }
  };

  const renderAnimation = () => {
    switch (animationType) {
      case 'correct':
        return <Image source={require('../../assets/correct_gif.gif')} style={styles.gif} />;
      case 'better':
        return <Image source={require('../../assets/better_luck_gif.gif')} style={styles.gif} />;
      case 'wrong':
        return <Image source={require('../../assets/wrong_gif.gif')} style={styles.gif} />;
      default:
        return null;
    }
  };

  return (
    <>
      {language === 'ENGLISH' ? (
        <EnglishScreen
          timer={timer}
          wordPair={wordPair}
          onClickWord={handleClickWord}
          timerExpired={timerExpired}
          onClickNext={handleModal}
          playYellowWordAudio={() => soundObject && soundObject.replayAsync()}
        />
      ) : (
        <TamilScreen
          timer={timer}
          wordPair={wordPair}
          onClickWord={handleClickWord}
          timerExpired={timerExpired}
          onClickNext={handleModal}
          playYellowWordAudio={() => soundObject && soundObject.replayAsync()}
        />
      )}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {renderAnimation()}
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleNext}
            >
              <Text style={styles.closeButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
  textTopicE: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
    color: '#FFD166',
    marginTop: '15%',
    marginBottom: '2%',
  },
  textTopicT: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFD166',
    marginTop: '14%',
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
  speakerImage: {
    width: 80,
    height: 80,
    marginTop: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
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
  answerContainer: {
    backgroundColor: '#FFEBE5',
    borderRadius: 20,
    padding: 20,
    marginVertical: 40,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  answerBox: {
    backgroundColor: '#FFFAF0',
    borderRadius: 10,
    width: 200,
    height: 60,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    color: '#5A67D8',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clickedWord: {
    backgroundColor: '#FFCC80',
    transform: [{ scale: 1.05 }],
  },
  correctWord: {
    backgroundColor: '#9AE6B4',
    transform: [{ scale: 1.1 }],
    borderColor: '#38A169',
    borderWidth: 3,
  },
  wrongWord: {
    backgroundColor: '#ADD8E6',
    transform: [{ scale: 1.05 }],
    borderColor: '#E53E3E',
    borderWidth: 3,
  },
  nextButton: {
    backgroundColor: '#FFD166',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 270,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FFD166',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  gif: {
    width: 100,
    height: 100,
  },
});

export default DA_ListenAndChooseScreen;
