import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Modal,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import LottieView from 'lottie-react-native';

const questionsData = [
  { text: 'What is 2 + 2?', answer: 4 },
  { text: 'What is 3 + 3?', answer: 6 },
  { text: 'What is 4 + 4?', answer: 8 },
  { text: 'What is 5 + 5?', answer: 10 },
  { text: 'What is 6 + 3?', answer: 9 },
  { text: 'What is 7 + 3?', answer: 10 },
  { text: 'What is 8 + 1?', answer: 9 },
  { text: 'What is 1 + 0?', answer: 1 },
  { text: 'What is 1 + 1?', answer: 2 },
];

const SpacedRepetitionScreen = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const timerRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [showLottie, setShowLottie] = useState(false);
  const [showIncorrectLottie, setShowIncorrectLottie] = useState(false);
  const [fingerCount, setFingerCount] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [facing, setFacing] = useState('front');
  const [detailedFeedback, setDetailedFeedback] = useState([]);

  const totalQuestions = questions.length;

  const handleAnswer = (correct, userAnswer) => {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }

    const currentQuestion = questions[currentQuestionIndex];
    setDetailedFeedback((prevFeedback) => [
      ...prevFeedback,
      {
        question: currentQuestion.text,
        correctAnswer: currentQuestion.answer,
        userAnswer: userAnswer,
        correct: correct,
      },
    ]);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    let intervalId = null;

    if (isCapturing) {
      setTimeLeft(5); // Reset the timer
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            captureAndProcessImage();
            clearInterval(intervalId);
            setIsCapturing(false);
            showFeedbackModal();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isCapturing]);

  useEffect(() => {
    if (fingerCount !== null) {
      const expectedAnswer = questions[currentQuestionIndex].answer;
      if (fingerCount === expectedAnswer) {
        setFeedback('Correct! Great job!');
        setShowLottie(true); // Show Lottie animation if correct
        setShowIncorrectLottie(false); // Hide incorrect Lottie animation
        handleAnswer(true, fingerCount);
      } else {
        setFeedback(
          `Incorrect. The correct answer is ${expectedAnswer}.\nPlease try again!`
        );
        setShowLottie(false); // Hide Lottie animation if correct
        setShowIncorrectLottie(true); // Show incorrect Lottie animation
        handleAnswer(false, fingerCount);
      }
    }
  }, [fingerCount]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const captureAndProcessImage = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      let resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 640 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      let formData = new FormData();
      formData.append('image', {
        uri: resizedPhoto.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      try {
        const response = await axios.post(
          'http://192.168.8.101:5000/process',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setFingerCount(response.data.finger_count);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  };

  const showFeedbackModal = () => {
    setIsModalVisible(true);
  };

  const hideFeedbackModal = () => {
    setIsModalVisible(false);
  };

  const handleCaptureButtonPress = () => {
    setIsCapturing((prev) => !prev);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const renderCircularTimer = () => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (timeLeft / 5) * circumference;
    return (
      <Svg width="120" height="120" viewBox="0 0 120 120">
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#d3d3d3"
          strokeWidth="10"
          fill="none"
        />
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#00ff00"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        <SvgText x="60" y="65" textAnchor="middle" fontSize="30" fill="#000">
          {timeLeft}
        </SvgText>
      </Svg>
    );
  };

  const renderDetailedFeedback = () => {
    return detailedFeedback.map((feedback, index) => (
      <View key={index} style={styles.feedbackItem}>
        <Text style={styles.feedbackQuestion}>{feedback.question}</Text>
        <Text style={styles.feedbackText}>
          Your answer: {feedback.userAnswer} -{' '}
          {feedback.correct
            ? 'Correct! 😊'
            : `Incorrect. The correct answer is ${feedback.correctAnswer}.`}
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={(currentQuestionIndex + 1) / totalQuestions}
        width={300} // Increased width
        height={15} // Increased height
        color="#FFD166"
        style={styles.progressBar}
      />
      {!showScore ? (
        <View style={styles.questionContainer}>
          <Text style={styles.textTopic}>
            Question {currentQuestionIndex + 1}
          </Text>
          <Text style={styles.qtext}>
            {questions[currentQuestionIndex].text}
          </Text>

          <View style={styles.cameraContainer}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
          </View>

          <View style={styles.uiContainer}>
            {isCapturing && renderCircularTimer()}
            <TouchableOpacity
              style={styles.button1}
              onPress={toggleCameraFacing}
            >
              <Image
                source={require('../../assets/flip.png')}
                style={styles.refreshIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCaptureButtonPress}
            >
              <Text style={styles.text}>{isCapturing ? 'Stop' : 'Start'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.scoreContainer}>
          <SafeAreaView style={styles.container2}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.scoreText}>
                Your Score: {score} / {totalQuestions}
              </Text>
              <TouchableOpacity
                style={styles.restartButton}
                onPress={() => {
                  setScore(0);
                  setCurrentQuestionIndex(0);
                  setShowScore(false);
                  setDetailedFeedback([]);
                }}
              >
                <Text style={styles.buttonText}>Restart</Text>
              </TouchableOpacity>
              <View style={styles.detailedFeedbackContainer}>
                {renderDetailedFeedback()}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={hideFeedbackModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.feedbackText}>{feedback}</Text>
            {showLottie && (
              <LottieView
                source={require('../../assets/welldone.json')}
                autoPlay
                loop={false}
                style={styles.lottie}
              />
            )}
            {showIncorrectLottie && (
              <LottieView
                source={require('../../assets/sad3.json')}
                autoPlay
                loop={false}
                style={styles.lottie}
              />
            )}
            <Button title="Close" onPress={hideFeedbackModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 'auto',
    height: '100%',
    backgroundColor: '#4D86F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    marginVertical: 20,
  },
  textTopic: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 35,
    color: '#FFF',
    marginVertical: 20,
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtext: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  cameraContainer: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: '#FFD166',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  uiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  lottie: {
    width: 150,
    height: 150,
  },
  button1: {
    left: '35%',
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
  },
  refreshIcon: {
    width: 30,
    height: 30,
  },
  scoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 20,
  },
  restartButton: {
    backgroundColor: '#FFD166',
    borderRadius: 100,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    height: 50,
    width: 100,
    left: '60%',
  },
  detailedFeedbackContainer: {
    marginTop: 20,
  },
  feedbackItem: {
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  feedbackQuestion: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  container2: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'blue',
    marginHorizontal: 20,
    padding: 20,
  },
  text3: {
    fontSize: 42,
  },
});

export default SpacedRepetitionScreen;
