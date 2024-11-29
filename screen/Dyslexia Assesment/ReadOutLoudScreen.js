import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, BackHandler, Animated, Alert, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import axios from 'axios';
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Import Firestore and Firebase auth

const EnglishScreen = ({ wordPair, onClickRecord, recordingInProgress, animationCircle, countdown }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTopicE}>Say The Word!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />

      <View style={styles.correctWordContainer}>
        <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
        <Text style={styles.correctWordText}>{wordPair.yellow}</Text>
        <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
      </View>

      <View style={styles.answerContainer}>
        <TouchableOpacity
          onPress={onClickRecord}
          style={styles.recordButton}
          disabled={recordingInProgress}
        >
          <Text style={styles.recordButtonText}>
            {recordingInProgress ? 'Recording...' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>

      {recordingInProgress && (
        <Animated.View
          style={[
            styles.circleAnimation,
            {
              transform: [
                {
                  scale: animationCircle.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.timerText}>{countdown}s</Text>
        </Animated.View>
      )}

      <Image source={require('../../assets/reading.gif')} style={styles.gif} />
    </View>
  );
};

const TamilScreen = ({ wordPair, onClickRecord, recordingInProgress, animationCircle, countdown }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTopicT}>சொல்லுங்கள்!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />

      <View style={styles.correctWordContainer}>
        <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
        <Text style={styles.correctWordText}>{wordPair.yellow}</Text>
        <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
      </View>

      <View style={styles.answerContainer}>
        <TouchableOpacity
          onPress={onClickRecord}
          style={styles.recordButton}
          disabled={recordingInProgress}
        >
          <Text style={styles.recordButtonText}>
            {recordingInProgress ? 'பதிவு செய்தல்...' : 'பதிவைத் தொடங்கவும்'}
          </Text>
        </TouchableOpacity>
      </View>

      {recordingInProgress && (
        <Animated.View
          style={[
            styles.circleAnimation,
            {
              transform: [
                {
                  scale: animationCircle.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.timerText}>{countdown}s</Text>
        </Animated.View>
      )}
      <Image source={require('../../assets/reading.gif')} style={styles.screengif} />

    </View>
  );
};

const DA_ReadOutLoudScreen = ({ navigation, route }) => {
  const { language } = route.params;
  const recordingRef = useRef(null);
  const [recordingInProgress, setRecordingInProgress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [correctWord, setCorrectWord] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [animationCircle, setAnimationCircle] = useState(new Animated.Value(0));
  const [animationType, setAnimationType] = useState('');
  const [counter, setCounter] = useState(0);
  const [countdown, setCountdown] = useState(5); // Initialize countdown to 5 seconds
  const [startTime, setStartTime] = useState(null); // To track time taken for each round
  const [usedWords, setUsedWords] = useState([]); // Track used words

  const wordLists = language === 'en' ? require('../../assets/WordLists/read_words_en').read_words_en : require('../../assets/WordLists/read_words_ta').read_words_ta;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    setNewWord();
  }, [language]);

  const setNewWord = () => {
    // Filter out used words
    const availableWords = wordLists.filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) {
      console.log('No more words left!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];

    setCorrectWord(selectedWord);
    setUsedWords([...usedWords, selectedWord]); // Add the selected word to the used words
    setStartTime(Date.now()); // Start time for each round
  };

  //recording function
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync({
        android: {
          extension: '.wav',
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
        },
      });
      recordingRef.current = recording;
      setRecordingInProgress(true);
      animateCircle();

      setTimeout(async () => {
        await stopRecording();
      }, 5000);
    } catch (err) {
      console.error('Failed to start recording', err);
      setRecordingInProgress(false);
      Alert.alert('Recording Error', 'Failed to start recording.');
    }
  };

  //stop recording after 5 seconds and save
  const stopRecording = async () => {
    setRecordingInProgress(false);
    if (recordingRef.current) {
      try {
        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        if (uri) {
          await sendAudioToServer(uri);
        }
      } catch (error) {
        console.error('Error stopping recording:', error);
        Alert.alert('Recording Error', 'Failed to stop recording properly.');
      }
    }
  };

  const sendAudioToServer = async (uri) => {
    try {
      const formData = new FormData();
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('file', {
        uri: Platform.OS === 'android' ? uri.replace('file://', '') : uri,
        type: `audio/${fileType}`,
        name: `recording.${fileType}`,
      });

      const response = await axios.post('http://172.20.10.3:8000/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.transcription) {
        const firstWord = response.data.transcription.split(' ')[0].toLowerCase();
        const isCorrect = firstWord === correctWord.toLowerCase();
        setTranscription(response.data.transcription);

        const timeTaken = (Date.now() - startTime) / 1000; // Calculate time taken

        // Store result in Firestore
        await storeResultInFirestore(correctWord, firstWord, isCorrect, counter + 1, timeTaken);

        setModalMessage(
          isCorrect
            ? `Good job! You did great! You pronounced '${correctWord}' right!`
            : `You can do better next time! Correct word: ${correctWord} \nYou said: ${firstWord}`
        );
        setAnimationType(isCorrect ? 'correct' : 'wrong');
        setModalVisible(true);
      } else {
        Alert.alert('Transcription Error', 'Failed to get transcription from the server.');
      }
    } catch (error) {
      console.error('Error sending audio to server:', error);
      Alert.alert('Transcription Error', 'Failed to send the audio to the server.');
    }
  };

  const storeResultInFirestore = async (correctWord, transcribedWord, isCorrect, round, timeTaken) => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const docRef = doc(db, 'ReadOutLoud_Results', userId);

      const roundData = {
        correctWord,
        transcribedWord,
        isCorrect,
        round,
        timeTaken,
      };

      try {
        if (round === 1) {
          await setDoc(docRef, {
            userId,
            activity: 'read_out_loud',
            results: [roundData],
            timestamp: serverTimestamp(),
          });
        } else {
          await updateDoc(docRef, {
            results: arrayUnion(roundData),
            timestamp: serverTimestamp(),
          });
        }
      } catch (error) {
        console.error('Error storing result in Firestore:', error);
      }
    } else {
      console.error('No user logged in');
    }
  };

  const animateCircle = () => {
    setAnimationCircle(new Animated.Value(0));
    setCountdown(5);
    Animated.timing(animationCircle, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    let countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(countdownInterval);
        return 0;
      });
    }, 1000);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setTranscription('');
    setAnimationType('');
    if (counter < 3) {
      setCounter(counter + 1);
      setNewWord();
    } else {
      navigation.navigate('DA_GoodJobScreenSpell', { language });
    }
  };

  const renderAnimation = () => {
    switch (animationType) {
      case 'correct':
        return <Image source={require('../../assets/correct_gif.gif')} style={styles.gif} />;
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
          wordPair={{ yellow: correctWord }}
          onClickRecord={startRecording}
          recordingInProgress={recordingInProgress}
          animationCircle={animationCircle}
          countdown={countdown}
        />
      ) : (
        <TamilScreen
          wordPair={{ yellow: correctWord }}
          onClickRecord={startRecording}
          recordingInProgress={recordingInProgress}
          animationCircle={animationCircle}
          countdown={countdown}
        />
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {renderAnimation()}
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleModalClose}
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
  // The styles are reused from the matching screen to keep consistency
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
    marginTop: '20%',
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
    marginVertical: 50,
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

  screengif: {
    width: 200,
    height: 220,
    marginTop: '30%'
  },

  recordButton: {
    backgroundColor: '#FF6666',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '80%',
    borderRadius: 10,
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'center',
  },
  recordButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  circleAnimation: {
    position: 'absolute',
    top: '50%',
    left: '38%',
    borderWidth: 5,
    borderColor: '#FFD166',
    borderRadius: 100,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default DA_ReadOutLoudScreen;


// import React, { useState, useEffect, useRef } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, BackHandler, Animated, Alert, Platform } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { Audio } from 'expo-av';
// import axios from 'axios';

// const EnglishScreen = ({ timer, wordPair, onClickRecord, recordingInProgress, animationCircle }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.textTopicE}>Say The Word!</Text>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay} />

//       <View style={styles.correctWordContainer}>
//         <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
//         <Text style={styles.correctWordText}>{wordPair.yellow}</Text>
//         <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
//       </View>

//       <View style={styles.answerContainer}>
//         <TouchableOpacity
//           onPress={onClickRecord}
//           style={styles.recordButton}
//           disabled={recordingInProgress}
//         >
//           <Text style={styles.recordButtonText}>
//             {recordingInProgress ? 'Recording...' : 'Start Recording'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {recordingInProgress && (
//         <Animated.View
//           style={[
//             styles.circleAnimation,
//             {
//               width: animationCircle.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['100%', '0%'],
//               }),
//               height: animationCircle.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['100%', '0%'],
//               }),
//             },
//           ]}
//         >
//           <Text style={styles.timerText}>
//             {Math.ceil(animationCircle.interpolate({
//               inputRange: [0, 1],
//               outputRange: [5, 0],
//             }))}s
//           </Text>
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// const TamilScreen = ({ timer, wordPair, onClickRecord, recordingInProgress, animationCircle }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.textTopicT}>சொல்லுங்கள்!</Text>
//       <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
//       <View style={styles.overlay} />

//       <View style={styles.correctWordContainer}>
//         <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
//         <Text style={styles.correctWordText}>{wordPair.yellow}</Text>
//         <Image style={styles.highlightIcon} source={require('../../assets/star.png')} />
//       </View>

//       <View style={styles.answerContainer}>
//         <TouchableOpacity
//           onPress={onClickRecord}
//           style={styles.recordButton}
//           disabled={recordingInProgress}
//         >
//           <Text style={styles.recordButtonText}>
//             {recordingInProgress ? 'Recording...' : 'Start Recording'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {recordingInProgress && (
//         <Animated.View
//           style={[
//             styles.circleAnimation,
//             {
//               width: animationCircle.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['100%', '0%'],
//               }),
//               height: animationCircle.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['100%', '0%'],
//               }),
//             },
//           ]}
//         >
//           <Text style={styles.timerText}>
//             {Math.ceil(animationCircle.interpolate({
//               inputRange: [0, 1],
//               outputRange: [5, 0],
//             }))}s
//           </Text>
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// const DA_ReadOutLoudScreen = ({ navigation, route }) => {
//   const { language } = route.params;
//   const recordingRef = useRef(null);
//   const [recordingInProgress, setRecordingInProgress] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [transcription, setTranscription] = useState('');
//   const [correctWord, setCorrectWord] = useState('');
//   const [modalMessage, setModalMessage] = useState('');
//   const [animationCircle, setAnimationCircle] = useState(new Animated.Value(0));
//   const [animationType, setAnimationType] = useState('');

//   const wordLists = language === 'ENGLISH' ? require('../../assets/WordLists/read_words_en').read_words_en : require('../../assets/WordLists/read_words_ta').read_words_ta;

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => true;
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [])
//   );

//   useEffect(() => {
//     setNewWord();
//   }, [language]);

//   const setNewWord = () => {
//     const randomIndex = Math.floor(Math.random() * wordLists.length);
//     const selectedWord = wordLists[randomIndex];
//     setCorrectWord(selectedWord);
//   };

//   const startRecording = async () => {
//     try {
//       console.log('Requesting permissions..');
//       await Audio.requestPermissionsAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });
//       console.log('Starting recording..');
//       const { recording } = await Audio.Recording.createAsync({
//         android: {
//           extension: '.wav',
//           sampleRate: 16000,
//           numberOfChannels: 1,
//           bitRate: 128000,
//         },
//         ios: {
//           extension: '.wav',
//           sampleRate: 16000,
//           numberOfChannels: 1,
//           bitRate: 128000,
//           outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
//         },
//       });
//       recordingRef.current = recording;
//       setRecordingInProgress(true);
//       animateCircle();
//       console.log('Recording started');

//       setTimeout(async () => {
//         await stopRecording();
//       }, 5000);
//     } catch (err) {
//       console.error('Failed to start recording', err);
//       setRecordingInProgress(false);
//       Alert.alert('Recording Error', 'Failed to start recording.');
//     }
//   };

//   const stopRecording = async () => {
//     console.log('Stopping recording..');
//     setRecordingInProgress(false);
//     if (recordingRef.current) {
//       try {
//         await recordingRef.current.stopAndUnloadAsync();
//         const uri = recordingRef.current.getURI();
//         if (uri) {
//           console.log('Recording stopped and stored at', uri);
//           await sendAudioToServer(uri);
//         } else {
//           console.error('Failed to get URI after recording');
//           Alert.alert('Recording Error', 'Failed to save the recording.');
//         }
//       } catch (error) {
//         console.error('Error stopping recording:', error);
//         Alert.alert('Recording Error', 'Failed to stop recording properly.');
//       }
//     } else {
//       console.log('No recording found to stop.');
//     }
//   };

//   const sendAudioToServer = async (uri) => {
//     try {
//       const formData = new FormData();
//       const uriParts = uri.split('.');
//       const fileType = uriParts[uriParts.length - 1];
  
//       formData.append('file', {
//         uri: Platform.OS === 'android' ? uri.replace('file://', '') : uri,
//         type: `audio/${fileType}`,
//         name: `recording.${fileType}`,
//       });
  
//       console.log('Sending audio to server...');
//       const response = await axios.post('https://9ad5-112-135-195-167.ngrok-free.app/transcribe', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
  
//       if (response.data && response.data.transcription) {
//         console.log('Transcription received:', response.data.transcription);
//         setTranscription(response.data.transcription);
//         const isCorrect = response.data.transcription.toLowerCase() === correctWord.toLowerCase();
//         setModalMessage(
//           isCorrect
//             ? `Good job! You did great! You pronounced '${correctWord}' right!`
//             : `You can do better next time! Correct word: ${correctWord} \nYou said: ${response.data.transcription}`
//         );
//         setAnimationType(isCorrect ? 'correct' : 'wrong');
//         setModalVisible(true);
//       } else {
//         console.error('Failed to receive valid transcription from server');
//         Alert.alert('Transcription Error', 'Failed to get transcription from the server.');
//       }
//     } catch (error) {
//       console.error('Error sending audio to server:', error);
//       Alert.alert('Transcription Error', 'Failed to send the audio to the server.');
//     }
//   };
  

//   const animateCircle = () => {
//     setAnimationCircle(new Animated.Value(0));
//     Animated.timing(animationCircle, {
//       toValue: 1,
//       duration: 5000,
//       useNativeDriver: false,
//     }).start();
//   };

//   const handleModalClose = () => {
//     setModalVisible(false);
//     setTranscription('');
//     setAnimationType('');
//     setNewWord(); // Get a new word after closing the modal
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

//   return (
//     <>
//       {language === 'ENGLISH' ? (
//         <EnglishScreen
//           timer="00:30"
//           wordPair={{ yellow: correctWord }}
//           onClickRecord={startRecording}
//           recordingInProgress={recordingInProgress}
//           animationCircle={animationCircle}
//         />
//       ) : (
//         <TamilScreen
//           timer="00:30"
//           wordPair={{ yellow: correctWord }}
//           onClickRecord={startRecording}
//           recordingInProgress={recordingInProgress}
//           animationCircle={animationCircle}
//         />
//       )}

//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={modalVisible}
//         onRequestClose={handleModalClose}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {renderAnimation()}
//             <Text style={styles.modalText}>{modalMessage}</Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={handleModalClose}
//             >
//               <Text style={styles.closeButtonText}>Next</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };


// const styles = StyleSheet.create({
//   // The styles are reused from the matching screen to keep consistency
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
//     marginTop: '15%',
//     marginBottom: '2%',
//   },
//   textTopicT: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 22,
//     color: '#FFD166',
//     marginTop: '14%',
//     marginBottom: '2%',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     top: '14%',
//     height: '100%',
//     borderRadius: 85,
//   },
//   descriptionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginTop: 20,
//   },
//   speakerImage: {
//     width: 80,
//     height: 80,
//     marginTop: 20,
//   },
//   correctWordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFD700',
//     padding: 10,
//     borderRadius: 15,
//     marginVertical: 20,
//   },
//   correctWordText: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#2C3E50',
//   },
//   highlightIcon: {
//     width: 40,
//     height: 40,
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   timerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#D9D9D9',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 20,
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
//   answerContainer: {
//     backgroundColor: '#FFEBE5',
//     borderRadius: 20,
//     padding: 20,
//     marginVertical: 40,
//     width: '90%',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between', // Align items in multiple rows
//   },
//   answerBoxContainer: {
//     width: '48%', // Take up 48% of the container width to fit two items per row
//     marginBottom: 10,
//   },
//   answerBox: {
//     backgroundColor: '#FFFAF0',
//     borderRadius: 10,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   answerText: {
//     color: '#5A67D8',
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   clickedWord: {
//     backgroundColor: '#FFCC80',
//     transform: [{ scale: 1.05 }],
//   },
//   correctWord: {
//     backgroundColor: '#9AE6B4',
//     transform: [{ scale: 1.1 }],
//     borderColor: '#38A169',
//     borderWidth: 3,
//   },
//   wrongWord: {
//     backgroundColor: '#ADD8E6',
//     transform: [{ scale: 1.05 }],
//     borderColor: '#E53E3E',
//     borderWidth: 3,
//   },
//   nextButton: {
//     backgroundColor: '#FFD166',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
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
//     width: 270,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 5,
//     elevation: 5,
//   },

//   modalText: {
//     fontSize: 20,
//     marginVertical: 20,
//     textAlign: 'center',
//   },
//   closeButton: {
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
//   gif: {
//     width: 100,
//     height: 100,
//   },

//   recordButton: {
//     backgroundColor: '#FF6666',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     marginLeft: '20%',
//     marginRight: '10%',
//     alignItems: 'center',
//   },
//   recordButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   circleAnimation: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     borderWidth: 2,
//     borderColor: '#FFD166',
//     borderRadius: 100,
//     backgroundColor: '#FFD166',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  
// });

// export default DA_ReadOutLoudScreen;
