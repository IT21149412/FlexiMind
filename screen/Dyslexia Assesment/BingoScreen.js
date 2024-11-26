// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// // Import the word lists
// import { words_en } from '../../assets/WordLists/words_en';
// import { words_ta } from '../../assets/WordLists/words_ta';

// const generateWordSet = (usedWords, wordList) => {
//   let wordObj;

//   // Ensure that a valid word object is selected
//   do {
//     wordObj = wordList[Math.floor(Math.random() * wordList.length)];
//   } while (!wordObj || usedWords.includes(wordObj.word));

//   // Generate a set of 5 identical words
//   const wordSet = Array(5).fill().map(() => ({ word: wordObj.word, id: Math.random().toString() }));

//   // Filter out duplicates and ensure unique words
//   let remainingWords = [...new Set(wordObj.similar)].slice(0, 5);

//   // Add random words ensuring they are unique and not duplicates of the selected word or its similar words
//   const otherWords = wordList.filter(w => w.word !== wordObj.word).flatMap(w => w.similar);

//   while (remainingWords.length < 10) {
//     const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
//     if (!remainingWords.includes(randomWord)) {
//       remainingWords.push(randomWord);
//     }
//   }

//   // Create the final word list by combining identical and unique words
//   return [...wordSet, ...remainingWords.map(word => ({ word, id: Math.random().toString() }))].sort(() => Math.random() - 0.5);
// };

// const DA_BingoScreen = ({ navigation, route }) => {
//   const { language } = route.params; // Get language from route params
//   const [usedWords, setUsedWords] = useState([]);
//   const [bingoCard, setBingoCard] = useState([]);
//   const [selectedWords, setSelectedWords] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [animationType, setAnimationType] = useState('none');
//   const [currentRound, setCurrentRound] = useState(1);
//   const maxRounds = 4;

//   useEffect(() => {
//     const wordList = language === 'ENGLISH' ? words_en : words_ta; // Select the appropriate word list
//     setBingoCard(generateWordSet(usedWords, wordList));
//   }, [usedWords, language]);

//   const handleWordPress = (id) => {
//     if (selectedWords.includes(id)) {
//       setSelectedWords(selectedWords.filter(w => w !== id));
//     } else if (selectedWords.length < 5) {
//       setSelectedWords([...selectedWords, id]);
//     }
//   };

//   const checkResults = () => {
//     const correctWord = bingoCard.find(item => bingoCard.filter(w => w.word === item.word).length === 5)?.word;
//     const correctCount = selectedWords.filter(id => bingoCard.find(item => item.id === id && item.word === correctWord)).length;

//     if (correctCount === 5) {
//       setModalMessage('Good Job! You got all the words correct!');
//       setAnimationType('correct');
//     } else if (correctCount > 0) {
//       setModalMessage(`You can do better! You got ${correctCount}/5 correct.`);
//       setAnimationType('better');
//     } else {
//       setModalMessage('Don’t be sad! Let’s do the next activity better!');
//       setAnimationType('wrong');
//     }

//     setModalVisible(true);
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

//   const handleNext = () => {
//     setSelectedWords([]);
//     setModalVisible(false);

//     if (currentRound < maxRounds) {
//       const wordList = language === 'ENGLISH' ? words_en : words_ta;
//       const newWordSet = generateWordSet([...usedWords, bingoCard[0].word], wordList);
//       setBingoCard(newWordSet);
//       setUsedWords([...usedWords, bingoCard[0].word]);
//       setCurrentRound(currentRound + 1);
//     } else {
//       navigation.navigate('DA_GoodJobScreen', { language }); // Pass language param to next screen
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Select the Same Words</Text>
//       <FlatList
//         data={bingoCard}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.wordButton, selectedWords.includes(item.id) ? styles.selected : null]}
//             onPress={() => handleWordPress(item.id)}
//           >
//             <Text style={styles.wordText}>{item.word}</Text>
//           </TouchableOpacity>
//         )}
//         numColumns={3}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.wordListContainer}
//       />
//       <TouchableOpacity style={styles.nextButton} onPress={checkResults}>
//         <Text style={styles.nextButtonText}>Check</Text>
//       </TouchableOpacity>
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
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f8ff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#4D86F7',
//   },
//   wordListContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   wordButton: {
//     backgroundColor: '#FFD166',
//     margin: 10,
//     padding: 20,
//     borderRadius: 10,
//     width: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   wordText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   selected: {
//     backgroundColor: '#4D86F7',
//   },
//   nextButton: {
//     backgroundColor: '#FFD166',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   nextButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   gif: {
//     width: 100,
//     height: 100,
//     marginBottom: 15,
//   },
//   closeButton: {
//     marginTop: 15,
//     backgroundColor: '#FFD166',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   closeButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default DA_BingoScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// // Import the word lists
// import { words_en } from '../../assets/WordLists/words_en';
// import { words_ta } from '../../assets/WordLists/words_ta';

// const generateWordSet = (usedWords, wordList) => {
//   let wordObj;

//   // Ensure that a valid word object is selected
//   do {
//     wordObj = wordList[Math.floor(Math.random() * wordList.length)];
//   } while (!wordObj || usedWords.includes(wordObj.word));

//   // Generate a set of 5 identical words
//   const wordSet = Array(5).fill().map(() => ({ word: wordObj.word, id: Math.random().toString() }));

//   // Filter out duplicates and ensure unique words
//   let remainingWords = [...new Set(wordObj.similar)].slice(0, 5);

//   // Add random words ensuring they are unique and not duplicates of the selected word or its similar words
//   const otherWords = wordList.filter(w => w.word !== wordObj.word).flatMap(w => w.similar);

//   while (remainingWords.length < 10) {
//     const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
//     if (!remainingWords.includes(randomWord)) {
//       remainingWords.push(randomWord);
//     }
//   }

//   // Create the final word list by combining identical and unique words
//   return [...wordSet, ...remainingWords.map(word => ({ word, id: Math.random().toString() }))].sort(() => Math.random() - 0.5);
// };

// const DA_BingoScreen = ({ navigation, route }) => {
//   const { language } = route.params; // Get language from route params
//   const [usedWords, setUsedWords] = useState([]);
//   const [bingoCard, setBingoCard] = useState([]);
//   const [selectedWords, setSelectedWords] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [animationType, setAnimationType] = useState('none');
//   const [currentRound, setCurrentRound] = useState(1);
//   const maxRounds = 4;

//   // State to track game data
//   const [gameData, setGameData] = useState([]);

//   useEffect(() => {
//     const wordList = language === 'ENGLISH' ? words_en : words_ta; // Select the appropriate word list
//     setBingoCard(generateWordSet(usedWords, wordList));
//   }, [usedWords, language]);

//   const handleWordPress = (id) => {
//     if (selectedWords.includes(id)) {
//       setSelectedWords(selectedWords.filter(w => w !== id));
//     } else if (selectedWords.length < 5) {
//       setSelectedWords([...selectedWords, id]);
//     }
//   };

//   const checkResults = () => {
//     const correctWord = bingoCard.find(item => bingoCard.filter(w => w.word === item.word).length === 5)?.word;
//     const correctCount = selectedWords.filter(id => bingoCard.find(item => item.id === id && item.word === correctWord)).length;

//     // Store data for this round
//     const roundData = {
//       round: currentRound,
//       correctWord,
//       selectedWords: selectedWords.map(id => bingoCard.find(item => item.id === id)?.word),
//       correctCount,
//       isFullyCorrect: correctCount === 5,
//     };

//     setGameData([...gameData, roundData]);

//     if (correctCount === 5) {
//       setModalMessage('Good Job! You got all the words correct!');
//       setAnimationType('correct');
//     } else if (correctCount > 0) {
//       setModalMessage(`You can do better! You got ${correctCount}/5 correct.`);
//       setAnimationType('better');
//     } else {
//       setModalMessage('Don’t be sad! Let’s do the next activity better!');
//       setAnimationType('wrong');
//     }

//     setModalVisible(true);
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

//   const handleNext = () => {
//     setSelectedWords([]);
//     setModalVisible(false);

//     if (currentRound < maxRounds) {
//       const wordList = language === 'ENGLISH' ? words_en : words_ta;
//       const newWordSet = generateWordSet([...usedWords, bingoCard[0].word], wordList);
//       setBingoCard(newWordSet);
//       setUsedWords([...usedWords, bingoCard[0].word]);
//       setCurrentRound(currentRound + 1);
//     } else {
//       const totalCorrectRounds = gameData.filter(round => round.isFullyCorrect).length;
//       const totalScore = (totalCorrectRounds / maxRounds) * 100;
      
//       console.log('Final Results:', gameData);
//       console.log(`Total Score: ${totalScore}%`);

//       navigation.navigate('DA_GoodJobScreen', { language }); // Pass language param to next screen
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Select the Same Words</Text>
//       <FlatList
//         data={bingoCard}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.wordButton, selectedWords.includes(item.id) ? styles.selected : null]}
//             onPress={() => handleWordPress(item.id)}
//           >
//             <Text style={styles.wordText}>{item.word}</Text>
//           </TouchableOpacity>
//         )}
//         numColumns={3}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.wordListContainer}
//       />
//       <TouchableOpacity style={styles.nextButton} onPress={checkResults}>
//         <Text style={styles.nextButtonText}>Check</Text>
//       </TouchableOpacity>
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
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f8ff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#4D86F7',
//   },
//   wordListContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   wordButton: {
//     backgroundColor: '#FFD166',
//     margin: 10,
//     padding: 20,
//     borderRadius: 10,
//     width: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   wordText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   selected: {
//     backgroundColor: '#4D86F7',
//   },
//   nextButton: {
//     backgroundColor: '#FFD166',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   nextButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   gif: {
//     width: 100,
//     height: 100,
//     marginBottom: 15,
//   },
//   closeButton: {
//     marginTop: 15,
//     backgroundColor: '#FFD166',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   closeButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default DA_BingoScreen;



// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// // Import the word lists
// import { words_en } from '../../assets/WordLists/words_en';
// import { words_ta } from '../../assets/WordLists/words_ta';

// const generateWordSet = (usedWords, wordList) => {
//   let wordObj;

//   // Ensure that a valid word object is selected
//   do {
//     wordObj = wordList[Math.floor(Math.random() * wordList.length)];
//   } while (!wordObj || usedWords.includes(wordObj.word));

//   // Generate a set of 5 identical words
//   const wordSet = Array(5).fill().map(() => ({ word: wordObj.word, id: Math.random().toString() }));

//   // Filter out duplicates and ensure unique words
//   let remainingWords = [...new Set(wordObj.similar)].slice(0, 5);

//   // Add random words ensuring they are unique and not duplicates of the selected word or its similar words
//   const otherWords = wordList.filter(w => w.word !== wordObj.word).flatMap(w => w.similar);

//   while (remainingWords.length < 10) {
//     const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
//     if (!remainingWords.includes(randomWord)) {
//       remainingWords.push(randomWord);
//     }
//   }

//   // Shuffle the final word list by combining identical and unique words
//   const shuffledWords = [...wordSet, ...remainingWords.map(word => ({ word, id: Math.random().toString() }))].sort(() => Math.random() - 0.5);
  
//   // Return the correct word and the shuffled word set
//   return { correctWord: wordObj.word, shuffledWords };
// };

// const DA_BingoScreen = ({ navigation, route }) => {
//   const { language } = route.params; // Get language from route params
//   const [usedWords, setUsedWords] = useState([]);
//   const [bingoCard, setBingoCard] = useState([]);
//   const [selectedWords, setSelectedWords] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [animationType, setAnimationType] = useState('none');
//   const [currentRound, setCurrentRound] = useState(1);
//   const maxRounds = 4;

//   // State to track game data
//   const [gameData, setGameData] = useState([]);
//   const [correctWord, setCorrectWord] = useState('');

//   useEffect(() => {
//     const wordList = language === 'ENGLISH' ? words_en : words_ta; // Select the appropriate word list
//     const { correctWord, shuffledWords } = generateWordSet(usedWords, wordList);
//     setCorrectWord(correctWord);
//     setBingoCard(shuffledWords);
//   }, [usedWords, language]);

//   const handleWordPress = (id) => {
//     if (selectedWords.includes(id)) {
//       setSelectedWords(selectedWords.filter(w => w !== id));
//     } else if (selectedWords.length < 5) {
//       setSelectedWords([...selectedWords, id]);
//     }
//   };

//   const checkResults = () => {
//     const correctCount = selectedWords.filter(id => bingoCard.find(item => item.id === id && item.word === correctWord)).length;

//     // Store data for this round
//     const roundData = {
//       round: currentRound,
//       correctWord,
//       selectedWords: selectedWords.map(id => bingoCard.find(item => item.id === id)?.word),
//       correctCount,
//       isFullyCorrect: correctCount === 5,
//     };

//     setGameData([...gameData, roundData]);

//     if (correctCount === 5) {
//       setModalMessage('Good Job! You got all the words correct!');
//       setAnimationType('correct');
//     } else if (correctCount > 0) {
//       setModalMessage(`You can do better! You got ${correctCount}/5 correct.`);
//       setAnimationType('better');
//     } else {
//       setModalMessage('Don’t be sad! Let’s do the next activity better!');
//       setAnimationType('wrong');
//     }

//     setModalVisible(true);
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

//   const handleNext = () => {
//     setSelectedWords([]);
//     setModalVisible(false);

//     if (currentRound < maxRounds) {
//       const wordList = language === 'ENGLISH' ? words_en : words_ta;
//       const { correctWord, shuffledWords } = generateWordSet([...usedWords, correctWord], wordList);
//       setCorrectWord(correctWord);
//       setBingoCard(shuffledWords);
//       setUsedWords([...usedWords, correctWord]);
//       setCurrentRound(currentRound + 1);
//     } else {
//       const totalCorrectRounds = gameData.filter(round => round.isFullyCorrect).length;
//       const totalScore = (totalCorrectRounds / maxRounds) * 100;
      
//       console.log('Final Results:', gameData);
//       console.log(`Total Score: ${totalScore}%`);

//       navigation.navigate('DA_ListenAndChooseDescriptionScreen', { language }); // Pass language param to next screen
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay}></View>
//       <Text style={styles.header}>Select the Same Words</Text>

//       {/* Display the correct word in a separate box */}
//       <View style={styles.correctWordContainer}>
//         <Text style={styles.correctWordText}>{correctWord}</Text>
//       </View>

//       <FlatList
//         data={bingoCard}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.wordButton, selectedWords.includes(item.id) ? styles.selected : null]}
//             onPress={() => handleWordPress(item.id)}
//           >
//             <Text style={styles.wordText}>{item.word}</Text>
//           </TouchableOpacity>
//         )}
//         numColumns={3}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.wordListContainer}
//       />
//       <TouchableOpacity style={styles.nextButton} onPress={checkResults}>
//         <Text style={styles.nextButtonText}>Check</Text>
//       </TouchableOpacity>
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
//     </View>
//   );
// };


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'; // Firestore methods
import { db, auth } from '../firebase'; // Firebase instance for Firestore
import { words_en } from '../../assets/WordLists/words_en';
import { words_ta } from '../../assets/WordLists/words_ta';

const generateWordSet = (usedWords, wordList) => {
  let wordObj;
  do {
    wordObj = wordList[Math.floor(Math.random() * wordList.length)];
  } while (!wordObj || usedWords.includes(wordObj.word));

  const wordSet = Array(5).fill().map(() => ({ word: wordObj.word, id: Math.random().toString() }));
  let remainingWords = [...new Set(wordObj.similar)].slice(0, 5);
  const otherWords = wordList.filter(w => w.word !== wordObj.word).flatMap(w => w.similar);

  while (remainingWords.length < 10) {
    const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
    if (!remainingWords.includes(randomWord)) {
      remainingWords.push(randomWord);
    }
  }

  const shuffledWords = [...wordSet, ...remainingWords.map(word => ({ word, id: Math.random().toString() }))].sort(() => Math.random() - 0.5);
  return { correctWord: wordObj.word, shuffledWords };
};

const DA_BingoScreen = ({ navigation, route }) => {
  const { language } = route.params; // Results passed no longer needed since we're using Firestore
  const [usedWords, setUsedWords] = useState([]);
  const [bingoCard, setBingoCard] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [animationType, setAnimationType] = useState('none');
  const [currentRound, setCurrentRound] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const maxRounds = 4;
  const [correctWord, setCorrectWord] = useState(''); // Fix: Add this state to track the correct word

  // Firebase User
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    const wordList = language === 'en' ? words_en : words_ta;
    const { correctWord, shuffledWords } = generateWordSet(usedWords, wordList);
    setCorrectWord(correctWord); // Now you can use setCorrectWord since it's defined
    setBingoCard(shuffledWords);
    setStartTime(Date.now()); // Start time for the round
  }, [usedWords, language]);

  const handleWordPress = (id) => {
    if (selectedWords.includes(id)) {
      setSelectedWords(selectedWords.filter(w => w !== id));
    } else {
      setSelectedWords([...selectedWords, id]);
    }
  };

  const storeResultsInFirestore = async (roundData) => {
    if (!userId) {
      console.error('No user logged in');
      return;
    }

    const docRef = doc(db, 'Bingo_Results', userId);

    try {
      if (currentRound === 1) {
        await setDoc(docRef, {
          userId,
          activity: 'bingo',
          results: [roundData],
          timestamp: serverTimestamp(),
        });
      } else {
        await updateDoc(docRef, {
          results: arrayUnion(roundData),
        });
      }
    } catch (error) {
      console.error('Error storing round data in Firestore:', error);
    }
  };

  const handleNext = async () => {
    // Reset selections and hide the modal
    setSelectedWords([]);
    setModalVisible(false);

    // Check if the current round is the last round
    if (currentRound >= maxRounds) {
        console.log('All rounds completed');

        // Navigate to the next screen and pass necessary params
        navigation.navigate('DA_MatchingWordsDescriptionScreen', { language });
    } else {
        // If it's not the last round, continue to the next round
        const wordList = language === 'en' ? words_en : words_ta;
        const { correctWord, shuffledWords } = generateWordSet([...usedWords, correctWord], wordList);

        // Set up the next round
        setCorrectWord(correctWord);
        setBingoCard(shuffledWords);
        setUsedWords([...usedWords, correctWord]);
        setCurrentRound(currentRound + 1);
    }
  };

  const checkResults = async () => {
      // Ensure we are within the allowed number of rounds
      if (currentRound > maxRounds) return;

      const selectedCorrectWords = selectedWords.filter(id => bingoCard.find(item => item.id === id && item.word === correctWord));
      const correctCount = selectedCorrectWords.length;
      const totalSelected = selectedWords.length;
      const timeTaken = (Date.now() - startTime) / 1000; // Time taken in seconds

      const roundData = {
          activity: 'bingo',
          round: currentRound,
          correctWord,
          selectedWords: selectedWords.map(id => bingoCard.find(item => item.id === id)?.word),
          correctCount,
          isFullyCorrect: correctCount === 5 && totalSelected === 5,
          timeTaken: timeTaken.toFixed(2),
      };

      console.log('New Round Data:', roundData);

      // Store in Firestore
      await storeResultsInFirestore(roundData);

      // Display appropriate messages
      if (correctCount === 5 && totalSelected === 5) {
          setModalMessage('Good Job! You got all the words correct!');
          setAnimationType('correct');
      } else if (correctCount === 0) {
          setModalMessage('Don’t be sad! Let’s do the next activity better!');
          setAnimationType('wrong');
      } else {
          setModalMessage('You can do better next time!');
          setAnimationType('better');
      }

      // Show modal with result feedback
      setModalVisible(true);
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
    <View style={styles.container}>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <Text style={styles.header}>Select the same looking words!</Text>

      <FlatList
        data={bingoCard}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.wordButton, selectedWords.includes(item.id) ? styles.selected : null]}
            onPress={() => handleWordPress(item.id)}
          >
            <Text style={styles.wordText}>{item.word}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.wordListContainer}
      />
      <TouchableOpacity style={styles.nextButton} onPress={checkResults}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '14%',
    height: '100%',
    borderRadius: 85,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '5%',
    color: '#FFD166',
  },
  correctWordContainer: {
    backgroundColor: '#FFD166',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  correctWordText: {
    fontSize: 28,
    color: '#16397F',
    fontWeight: 'bold',
  },
  wordListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  wordButton: {
    backgroundColor: '#4682B4',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: '#FF7F50',
  },
  nextButton: {
    backgroundColor: '#FFD166',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 170
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16397F',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  gif: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#FFD166',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16397F',
  },
});

export default DA_BingoScreen;

