// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';

// const EnglishScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext }) => {
//   const [clickedWord, setClickedWord] = useState(null);

//   const handleWordClick = (word) => {
//     if (!timerExpired) {
//       setClickedWord(word);
//       onClickWord(word);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.textTopicE}>Let's Find The Matching Words!</Text>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay} />
//       <View style={styles.blackBox}>
//         <Text style={styles.yellowWord}>{wordPair.yellow}</Text>
//       </View>
//       <View style={styles.timerContainer}>
//         <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
//         <View style={styles.timerTextContainer}>
//           <Text style={styles.timerText}>{timer}</Text>
//         </View>
//       </View>
//       <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
//       <View style={styles.board}>
//         <View style={styles.whiteWordsContainer}>
//           {wordPair.words.map((word, index) => (
//             <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
//               <Text style={[
//                 styles.whiteWord,
//                 clickedWord === word && styles.clickedWord,
//                 (timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord),
//                 (timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord)
//               ]}>{word}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const TamilScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext }) => {
//   const [clickedWord, setClickedWord] = useState(null);

//   const handleWordClick = (word) => {
//     if (!timerExpired) {
//       setClickedWord(word);
//       onClickWord(word);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.textTopicT}>பொருள் பொருளைக் கண்டுபிடிக்கலாம்!</Text>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay} />
//       <View style={styles.blackBox}>
//         <Text style={styles.yellowWord}>{wordPair.yellow}</Text>
//       </View>
//       <View style={styles.timerContainer}>
//         <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
//         <View style={styles.timerTextContainer}>
//           <Text style={styles.timerText}>{timer}</Text>
//         </View>
//       </View>
//       <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
//       <View style={styles.board}>
//         <View style={styles.whiteWordsContainer}>
//           {wordPair.words.map((word, index) => (
//             <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
//               <Text style={[
//                 styles.whiteWord,
//                 clickedWord === word && styles.clickedWord,
//                 (timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord),
//                 (timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord)
//               ]}>{word}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
//         <Text style={styles.nextButtonText}>அடுத்தது</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const DA_MatchingWordsScreen = ({ navigation, route }) => {
//   const { language } = route.params;
//   const [timer, setTimer] = useState('00:30');
//   const [wordPair, setWordPair] = useState({ yellow: '', words: [] });
//   const [timerExpired, setTimerExpired] = useState(false);
//   const [activityRound, setActivityRound] = useState(1); // Track the current round of the activity

//   // Disable back button when activity starts
//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         // Return true to prevent going back
//         return true;
//       };

//       // Add event listener for back button press
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       // Cleanup function to remove event listener
//       return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [])
//   );

//   useEffect(() => {
//     const englishWordPairs = [
//       { yellow: 'TOOK', words: ['LOOK', 'TOOK'] },
//       { yellow: 'WAY', words: ['WAY', 'MAY'] },
//       { yellow: 'PAN', words: ['PAN', 'NAP'] },
//       { yellow: 'WEST', words: ['WEST', 'NEST'] },
//       { yellow: 'FALL', words: ['FALL', 'TALL'] },
//       { yellow: 'SLEEP', words: ['SLEEP', 'SHEEP'] },
//     ];

//     const tamilWordPairs = [
//       { yellow: 'காடு', words: ['காடு', 'நாடு'] },
//       { yellow: 'புல்', words: ['புல்', 'பல்'] },
//       { yellow: 'குயில்', words: ['குயில்', 'மயில்'] },
//       { yellow: 'தட்டு', words: ['தட்டு', 'எட்டு'] },
//       { yellow: 'கடை', words: ['கடை', 'நடை'] },
//     ];

//     const wordPairs = language === 'ENGLISH' ? englishWordPairs : tamilWordPairs;
//     console.log('Selected Language:', language);
//     console.log('Word Pairs:', wordPairs);

//     const randomIndex = Math.floor(Math.random() * wordPairs.length);
//     const selectedWordPair = wordPairs[randomIndex];
//     console.log('Selected Word Pair:', selectedWordPair);
//     setWordPair(selectedWordPair);

//     startTimer();
//   }, [language, activityRound]);

//   const startTimer = () => {
//     let seconds = 30;
//     const intervalId = setInterval(() => {
//       seconds -= 1;
//       if (seconds === 0) {
//         clearInterval(intervalId);
//         setTimer('00:00');
//         setTimerExpired(true); // Timer expired
//       } else {
//         const formattedTime = `${Math.floor(seconds / 60)
//           .toString()
//           .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
//         setTimer(formattedTime);
//       }
//     }, 1000);
//   };

//   const handleClickWord = (word) => {
//     console.log('Clicked word:', word);
//   };

//   const onClickNext = () => {
//     // Increase the activity round
//     const nextRound = activityRound + 1;
//     setActivityRound(nextRound);

//     // Clear any existing timeout
//     clearTimeout(timer);

//     // Stop the activity
//     setTimerExpired(true); // Timer expired

//     // Navigate to MatchingWordsScreen after 2 seconds if both rounds are completed
//     if (nextRound > 2) {
//       setTimeout(() => {
//         navigation.navigate('DA_MatchingWordsScreen2', { language });
//       }, 2000);
//     } else {
//       // Reset the timer and word pair for the next round
//       setTimer('00:30');
//       setTimerExpired(false);
//     }
//   };

//   return language === 'ENGLISH' ? 
//     <EnglishScreen timer={timer} wordPair={wordPair} onClickWord={handleClickWord} timerExpired={timerExpired} onClickNext={onClickNext} /> : 
//     <TamilScreen timer={timer} wordPair={wordPair} onClickWord={handleClickWord} timerExpired={timerExpired} onClickNext={onClickNext} />;
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#4D86F7',
//     alignItems: 'center',
//   },
//   bgImg: {
//     position: 'absolute',
//     top: '14%',
//     width: '100%',
//     height: '100%',
//     zIndex: -1,
//     resizeMode: 'cover',
//     borderWidth: 1,
//     borderRadius: 85,
//   },
//   textTopicE: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 27,
//     color: '#FFD166',
//     marginTop: '10%',
//     marginBottom: '2%',
//     paddingLeft: '2%',
//   },
//   textTopicT: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 22,
//     color: '#FFD166',
//     marginTop: '12%',
//     marginBottom: '2%',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     top: '14%',
//     height: '100%',
//     borderRadius: 85,
//   },
//   blackBox: {
//     backgroundColor: 'black',
//     width: '80%',
//     height: '12%',
//     paddingVertical: 10,
//     alignItems: 'center',
//     borderRadius: 10,
//     marginTop: '10%',
//     marginBottom: '5%',
//   },
//   timerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#D9D9D9',
//     paddingHorizontal: '5%',
//     paddingVertical: '2%',
//     borderRadius: 10,
//     marginTop: '2%',
//     marginLeft: '60%',
//   },
//   timerIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 5,
//   },
//   timerTextContainer: {
//     marginLeft: 5,
//   },
//   timerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   boardImage: {
//     width: '100%', 
//     height: '60%', 
//   },
//   board: {
//     position: 'absolute',
//     top: '55%',
//     alignItems: 'center',
//   },
//   yellowWord: {
//     color: 'yellow',
//     fontSize: 40,
//     fontWeight: 'bold',
//     paddingTop: 5,
//   },
//   whiteWordsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: '10%',
//   },
//   whiteWord: {
//     color: 'white',
//     fontSize: 35,
//     paddingLeft: '8%', 
//     paddingRight: '8%',
//   },
//   clickedWord: {
//     borderWidth: 3,
//     borderColor: 'blue',
//     borderRadius: 90,
//     padding: 5,
//   },
//   correctWord: {
//     borderWidth: 4,
//     borderColor: '#6ECB63',
//     borderRadius: 90,
//     padding: 5,
//   },
//   wrongWord: {
//     borderWidth: 4,
//     borderColor: 'red',
//     borderRadius: 90,
//     padding: 5,
//   },
//   nextButton: {
//     backgroundColor: '#FFD166',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginTop: '-30%',
//   },
//   nextButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default DA_MatchingWordsScreen;




/////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';

// const EnglishScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, clickedWord, validateAnswer }) => {
//   const handleWordClick = (word) => {
//     if (!timerExpired && !validateAnswer) {
//       onClickWord(word);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.textTopicE}>Let's Find The Matching Words!</Text>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay} />
//       <View style={styles.blackBox}>
//         <Text style={styles.yellowWord}>{wordPair.yellow}</Text>
//       </View>
//       <View style={styles.timerContainer}>
//         <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
//         <View style={styles.timerTextContainer}>
//           <Text style={styles.timerText}>{timer}</Text>
//         </View>
//       </View>
//       <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
//       <View style={styles.board}>
//         <View style={styles.whiteWordsContainer}>
//           {wordPair.words.map((word, index) => (
//             <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
//               <Text style={[
//                 styles.whiteWord,
//                 clickedWord === word && styles.clickedWord,
//                 validateAnswer && word === wordPair.yellow && styles.correctWord,
//                 validateAnswer && clickedWord === word && word !== wordPair.yellow && styles.wrongWord
//               ]}>{word}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const TamilScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, clickedWord, validateAnswer }) => {
//   const handleWordClick = (word) => {
//     if (!timerExpired && !validateAnswer) {
//       onClickWord(word);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.textTopicT}>பொருந்தக்கூடிய சொற்களைக் கண்டுபிடிப்போம்!</Text>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay} />
//       <View style={styles.blackBox}>
//         <Text style={styles.yellowWord}>{wordPair.yellow}</Text>
//       </View>
//       <View style={styles.timerContainer}>
//         <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
//         <View style={styles.timerTextContainer}>
//           <Text style={styles.timerText}>{timer}</Text>
//         </View>
//       </View>
//       <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
//       <View style={styles.board}>
//         <View style={styles.whiteWordsContainer}>
//           {wordPair.words.map((word, index) => (
//             <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
//               <Text style={[
//                 styles.whiteWord,
//                 clickedWord === word && styles.clickedWord,
//                 validateAnswer && word === wordPair.yellow && styles.correctWord,
//                 validateAnswer && clickedWord === word && word !== wordPair.yellow && styles.wrongWord
//               ]}>{word}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={onClickNext}>
//         <Text style={styles.nextButtonText}>அடுத்தது</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const DA_MatchingWordsScreen = ({ navigation, route }) => {
//   const { language } = route.params;
//   const [timer, setTimer] = useState('00:30');
//   const [wordPair, setWordPair] = useState({ yellow: '', words: [] });
//   const [timerExpired, setTimerExpired] = useState(false);
//   const [clickedWord, setClickedWord] = useState(null);
//   const [validateAnswer, setValidateAnswer] = useState(false);
//   const [matchingMark, setMatchingMark] = useState(0); // Initialize matchingMark state

//   // Disable back button when activity starts
//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         // Return true to prevent going back
//         return true;
//       };

//       // Add event listener for back button press
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       // Cleanup function to remove event listener
//       return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [])
//   );

//   useEffect(() => {
//     const englishWordPairs = [
//       { yellow: 'CLASS', words: ['CLASS', 'GLASS', 'GRASS'] },
//       { yellow: 'BURN', words: ['BURN', 'TURN', 'FURN'] },
//       { yellow: 'FRANCE', words: ['FRANCE', 'TRANCE', 'CHANCE'] },
//       { yellow: 'BEACH', words: ['BEACH', 'REACH', 'TEACH'] },
//       { yellow: 'FUNNY', words: ['FUNNY', 'SUNNY', 'BUNNY'] },
//       { yellow: 'GAME', words: ['GAME', 'SAME', 'CAME'] },
//     ];

//     const tamilWordPairs = [
//       { yellow: 'காடு', words: ['காடு', 'பாடு', 'மாடு'] },
//       { yellow: 'புல்', words: ['புல்', 'பல்', 'கல்'] },
//       { yellow: 'குயில்', words: ['குயில்', 'மயில்', 'ரயில்'] },
//       { yellow: 'பட்டு', words: ['பட்டு', 'எட்டு', 'லட்டு'] },
//       { yellow: 'கடை', words: ['கடை', 'நடை', 'வடை'] },
//     ];

//     const wordPairs = language === 'ENGLISH' ? englishWordPairs : tamilWordPairs;

//     // Randomly select a word pair
//     const randomIndex = Math.floor(Math.random() * wordPairs.length);
//     const selectedWordPair = wordPairs[randomIndex];
//     setWordPair(selectedWordPair);

//     startTimer();

//     return () => {
//       // Clean up resources when component unmounts
//       clearTimer();
//     };
//   }, [language]);

//   const startTimer = () => {
//     let seconds = 30;
//     const intervalId = setInterval(() => {
//       seconds -= 1;
//       if (seconds === 0) {
//         clearInterval(intervalId);
//         setTimer('00:00');
//         setTimerExpired(true); // Timer expired
//         validateAnswerAndSetMark();
//       } else {
//         const formattedTime = `${Math.floor(seconds / 60)
//           .toString()
//           .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
//         setTimer(formattedTime);
//       }
//     }, 1000);
//   };

//   const clearTimer = () => {
//     clearInterval(intervalId);
//   };

//   const handleClickWord = (word) => {
//     if (!timerExpired && !validateAnswer) {
//       setClickedWord(word);
//     }
//   };

//   const validateAnswerAndSetMark = () => {
//     setValidateAnswer(true);
//     if (clickedWord === wordPair.yellow) {
//       setMatchingMark(1); // Set matchingMark to 1 if correct word is selected
//     } else {
//       setMatchingMark(0); // Set matchingMark to 0 if wrong word is selected
//     }
//     console.log("Matching Mark in Screen 1:", matchingMark); // Log matchingMark in Screen 1
//   };

//   useEffect(() => {
//     // This effect runs whenever matchingMark changes
//     console.log("Matching Mark updated in Screen 1:", matchingMark);
//   }, [matchingMark]);

//   const onClickNext = () => {
//     // Validate answer and set matchingMark
//     validateAnswerAndSetMark();

//     // Navigate to the next screen after 1 second
//     setTimeout(() => {
//       navigation.navigate('DA_MatchingWordsScreen2', { language, matchingMark });
//     }, 1000);
//   };

//   return language === 'ENGLISH' ? (
//     <EnglishScreen
//       timer={timer}
//       wordPair={wordPair}
//       onClickWord={handleClickWord}
//       timerExpired={timerExpired}
//       onClickNext={onClickNext}
//       clickedWord={clickedWord}
//       validateAnswer={validateAnswer}
//     />
//   ) : (
//     <TamilScreen
//       timer={timer}
//       wordPair={wordPair}
//       onClickWord={handleClickWord}
//       timerExpired={timerExpired}
//       onClickNext={onClickNext}
//       clickedWord={clickedWord}
//       validateAnswer={validateAnswer}
//     />
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#4D86F7',
//     alignItems: 'center',
//   },
//   bgImg: {
//     position: 'absolute',
//     top: '14%',
//     width: '100%',
//     height: '100%',
//     zIndex: -1,
//     resizeMode: 'cover',
//     borderWidth: 1,
//     borderRadius: 85,
//   },
//   textTopicE: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 27,
//     color: '#FFD166',
//     marginTop: '10%',
//     marginBottom: '2%',
//     paddingLeft: '2%',
//   },
//   textTopicT: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 20,
//     color: '#FFD166',
//     marginTop: '12%',
//     marginBottom: '2%',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     top: '14%',
//     height: '100%',
//     borderRadius: 85,
//   },
//   blackBox: {
//     backgroundColor: '#6ecb63',
//     width: '80%',
//     height: '12%',
//     paddingVertical: 10,
//     alignItems: 'center',
//     borderRadius: 10,
//     marginTop: '10%',
//     marginBottom: '5%',
//     borderWidth: 2,
//     borderColor: '#4D86F7',
//   },
//   timerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#D9D9D9',
//     paddingHorizontal: '5%',
//     paddingVertical: '2%',
//     borderRadius: 10,
//     marginTop: '2%',
//     marginLeft: '60%',
//   },
//   timerIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 5,
//   },
//   timerTextContainer: {
//     marginLeft: 5,
//   },
//   timerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   boardImage: {
//     width: '100%', 
//     height: '60%', 
//   },
//   board: {
//     position: 'absolute',
//     top: '55%',
//     alignItems: 'center',
//   },
//   yellowWord: {
//     color: 'white',
//     fontSize: 40,
//     fontWeight: 'bold',
//     paddingTop: 5,
//   },
//   whiteWordsContainer: {
//     flexDirection: 'column', // Display words vertically
//     alignItems: 'center', // Center words horizontally
//   },
//     whiteWord: {
//       color: 'white',
//       fontSize: 30,
//       paddingLeft: '12%', 
//       paddingRight: '12%',
//       marginBottom:'5%',
//     },
//     wordRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between', // Distributes items evenly in each row
//       width: '100%', // Ensure the rows take up the full width
     
//     },  
  
//   clickedWord: {
//     borderWidth: 3,
//     borderColor: 'blue',
//     borderRadius: 90,
//     padding: 5,
//   },
//   correctWord: {
//     borderWidth: 4,
//     borderColor: '#6ECB63',
//     borderRadius: 90,
//     padding: 5,
//   },
//   wrongWord: {
//     borderWidth: 4,
//     borderColor: 'red',
//     borderRadius: 90,
//     padding: 5,
//   },
//   nextButton: {
//     backgroundColor: '#FFD166',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginTop: '-30%',
//   },
//   nextButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default DA_MatchingWordsScreen;



import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Firebase instance for Firestore

const EnglishScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, clickedWord }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTopicE}>Let's Find The Matching Word!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />

      <View style={styles.correctWordContainer}>
        <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
        <Text style={styles.correctWordText}>{wordPair.yellow}</Text>
        <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
      </View>

      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>

      <View style={styles.answerContainer}>
        {wordPair.words.map((word, index) => (
          <TouchableOpacity key={index} onPress={() => onClickWord(word)} style={styles.answerBoxContainer}>
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

const TamilScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, clickedWord }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTopicT}>பொருந்தக்கூடிய சொற்களைக் கண்டுபிடிப்போம்!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />

      <View style={styles.correctWordContainer}>
        <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
        <Text style={styles.correctWordText}>{wordPair.yellow}</Text>
        <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
      </View>

      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>

      <View style={styles.answerContainer}>
        {wordPair.words.map((word, index) => (
          <TouchableOpacity key={index} onPress={() => onClickWord(word)} style={styles.answerBoxContainer}>
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

const DA_MatchingWordsScreen = ({ navigation, route }) => {
  const { language } = route.params;
  const [timer, setTimer] = useState('00:30');
  const [wordPair, setWordPair] = useState({ yellow: '', words: [] });
  const [timerExpired, setTimerExpired] = useState(false);
  const [clickedWord, setClickedWord] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [animationType, setAnimationType] = useState('');
  const [startTime, setStartTime] = useState(null);
  const maxRounds = 4;
  const [intervalId, setIntervalId] = useState(null);

  const wordLists = language === 'en' ? require('../../assets/WordLists/words_en').words_en : require('../../assets/WordLists/words_ta').words_ta;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    setNewWordPair();
  }, [language, currentRound]);

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalId);
      setModalVisible(false);
    };
  }, [wordPair]);

  const setNewWordPair = () => {
    const randomIndex = Math.floor(Math.random() * wordLists.length);
    const selectedWord = wordLists[randomIndex];
    setWordPair({
      yellow: selectedWord.word,
      words: [selectedWord.word, ...selectedWord.similar].sort(() => 0.5 - Math.random())
    });
    setClickedWord(null);
    setStartTime(Date.now());
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


  const storeResultsInFirestore = async (roundData) => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const docRef = doc(db, 'MatchingWords_Results', userId);

      try {
        if (currentRound === 1) {
          await setDoc(docRef, {
            userId,
            activity: 'matching_words',
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
    } else {
      console.error('No user logged in');
    }
  };

  const handleModal = async () => {
    // Prevent modal actions after the max round
    if (currentRound > maxRounds) {
      return;
    }

    setModalVisible(true);
    const timeTaken = (Date.now() - startTime) / 1000;

    const roundData = {
      activity: 'matching_words',
      round: currentRound,
      correctWord: wordPair.yellow,
      selectedWord: clickedWord,
      isCorrect: clickedWord === wordPair.yellow,
      timeTaken: timeTaken.toFixed(2),
    };

    // Store the results in Firestore only if within the allowed rounds
    if (currentRound <= maxRounds) {
      await storeResultsInFirestore(roundData);
    }

    if (!clickedWord) {
      setAnimationType('better');
      setModalMessage("Cheer up! You can do this!");
    } else if (clickedWord === wordPair.yellow) {
      setAnimationType('correct');
      setModalMessage("Good job! You selected the correct answer.");
    } else {
      setAnimationType('wrong');
      setModalMessage("Let's do better in the next round!");
    }
  };

  const handleNext = async () => {
      setModalVisible(false);
      setClickedWord(null);
      setTimerExpired(false);
      setTimer('00:30');
      setAnimationType('');

      if (intervalId) {
        clearInterval(intervalId);
      }

      // Prevent moving to the next round if maxRounds is reached
      if (currentRound < maxRounds) {
        setCurrentRound(currentRound + 1);
      } else {
        console.log('All rounds completed');
        navigation.navigate('DA_SpellingDescriptionScreen', { language });
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
      {language === 'en' ? (
        <EnglishScreen
          timer={timer}
          wordPair={wordPair}
          onClickWord={handleClickWord}
          timerExpired={timerExpired}
          onClickNext={handleModal}
          clickedWord={clickedWord}
        />
      ) : (
        <TamilScreen
          timer={timer}
          wordPair={wordPair}
          onClickWord={handleClickWord}
          timerExpired={timerExpired}
          onClickNext={handleModal}
          clickedWord={clickedWord}
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
  // The styles are reused from the Listen and Choose screen to match UI
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
  correctWordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 15,
    marginTop: 50,
  },
  correctWordText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  highlightIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 25,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Align items in multiple rows
  },
  answerBoxContainer: {
    width: '48%', // Take up 48% of the container width to fit two items per row
    marginBottom: 10,
  },
  answerBox: {
    backgroundColor: '#FFFAF0',
    borderRadius: 10,
    height: 60,
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

export default DA_MatchingWordsScreen;
