import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Modal,

} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import LottieView from "lottie-react-native";
import { BASE_URL } from "./MathHandsConfig";


const DivisionDriveScreen = ({ navigation }) => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [facing, setFacing] = useState('front');
  const [fingerCount, setFingerCount] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [showLottie, setShowLottie] = useState(false);
  const [showIncorrectLottie, setShowIncorrectLottie] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isCapturing) {
      setTimeLeft(5);
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
    generateRandomNumbers();
  }, []);

  useEffect(() => {
    if (fingerCount !== null) {
      const expectedAnswer = number1 / number2;
      if (fingerCount === expectedAnswer) {

        setFeedback("Correct! Great job!");
        setShowLottie(true);
        setShowIncorrectLottie(false);

      } else {
        setFeedback(
          `Incorrect. The correct answer is ${expectedAnswer}. Please try again!`
        );
        setShowLottie(false);
        setShowIncorrectLottie(true);
      }
    }
  }, [fingerCount, number1, number2]);

  const generateRandomNumbers = () => {
    const divisor = Math.floor(Math.random() * 10) + 1;
    let dividend = Math.floor(Math.random() * 10) * divisor;
    while (dividend > 10) {
      dividend = Math.floor(Math.random() * 10) * divisor;
    }
    setNumber1(dividend);
    setNumber2(divisor);
  };

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

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const captureAndProcessImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 640 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );


      const formData = new FormData();
      formData.append("image", {

        uri: resizedPhoto.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      try {
        const response = await axios.post(

          `${BASE_URL}/process`,

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

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>Division Drive</Text>
      <Image
        style={styles.bgImg}
        source={require('../../assets/bg.jpg')}
      ></Image>
      <View style={styles.overlay}>
        <View style={styles.numberBox}>
          <Text style={styles.numberText}>
            {number1} / {number2}
          </Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={generateRandomNumbers}
          >
            <Image
              source={require('../../assets/arrows.png')}
              style={styles.refreshIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>

            Show the answer to your math problem using your fingers. Math Hands
            will then recognize your finger positions and confirm if your
            answer is correct!

          </Text>
        </View>
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        </View>
        <View style={styles.uiContainer}>
          {isCapturing && renderCircularTimer()}

          <TouchableOpacity style={styles.button1} onPress={toggleCameraFacing}>
            <Image
              source={require('../../assets/flip.png')}
              style={styles.refreshIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCaptureButtonPress}
          >
            <Text style={styles.text}>{isCapturing ? 'Stop ' : 'Start'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={hideFeedbackModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            {showLottie && !showIncorrectLottie && (
              <LottieView
                source={require("../../assets/welldone.json")}
                autoPlay
                loop={false}
                style={styles.lottie}
              />
            )}
            {showIncorrectLottie && (
              <LottieView
                source={require("../../assets/sad3.json")}

                autoPlay
                loop={true}
                style={styles.lottie}
              />
            )}
            <Text style={styles.resultText}>
              Detected Finger Count: {fingerCount}
            </Text>
            <Text style={styles.feedbackText}>{feedback}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={hideFeedbackModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
    width: 'auto',
    height: '100%',
    backgroundColor: '#4D86F7',
  },
  bgImg: {
    alignSelf: 'center',
    top: '10%',
    width: '100%',
    height: '80%',
    borderWidth: 1,
    borderRadius: 90,
  },
  textTopic: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 35,
    color: '#FFD166',
    top: '8%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '15%',
    height: '80%',
    borderRadius: 85,
  },
  numberBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    top: '1%',
    width: '50%',
    height: '20%',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 43,
    color: 'red',
  },
  refreshButton: {
    marginTop: 20,
  },
  refreshIcon: {
    width: 30,
    height: 30,
  },
  messageBox: {
    backgroundColor: '#5D8BE4',
    borderRadius: 30,
    top: '2%',
    width: '75%',
    height: '15%',
    alignSelf: 'center',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    marginLeft: 10,
    fontSize: 13,
    color: 'white',
  },
  cameraContainer: {
    width: '80%',
    height: 300,
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 20,
    left: '10%',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  uiContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#14274e',
    borderRadius: 4,
  },
  button1: {
    left: '35%',
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  resultText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  feedbackText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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
  closeButton: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default DivisionDriveScreen;
