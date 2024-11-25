import React, { useState, useEffect, useRef } from "react";
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

const DetectiveScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState(null);
  const [facing, setFacing] = useState("front");
  const [fingerCount, setFingerCount] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [showLottie, setShowLottie] = useState(false);
  const [showIncorrectLottie, setShowIncorrectLottie] = useState(false);

  const Textquestions = [
    "Which box has more monkeys? Show the number using your fingers.",
    "Which box has more bears? Show the number using your fingers.",
    "Which box has more carrots? Show the number using your fingers.",
    "Which box has more apples? Show the number using your fingers.",
    "Which box has more trees? Show the number using your fingers.",
  ];

  const imageDict = {
    1: require("../../assets/monkey.png"),
    2: require("../../assets/apple.jpg"),
    3: require("../../assets/carrot.png"),
    4: require("../../assets/banana.png"),
    5: require("../../assets/tree.jpg"),
  };

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * Textquestions.length);
    const questionText = Textquestions[randomIndex];
    let leftNumber = Math.floor(Math.random() * 5) + 1;
    let rightNumber;

    do {
      rightNumber = Math.floor(Math.random() * 5) + 1;
    } while (leftNumber === rightNumber);

    let leftImage, rightImage;

    if (questionText.includes("monkeys")) {
      leftImage = imageDict[1];
      rightImage = imageDict[1];
    } else if (questionText.includes("apples")) {
      leftImage = imageDict[2];
      rightImage = imageDict[2];
    } else if (questionText.includes("carrots")) {
      leftImage = imageDict[3];
      rightImage = imageDict[3];
    } else if (questionText.includes("bears")) {
      leftImage = imageDict[4];
      rightImage = imageDict[4];
    } else if (questionText.includes("trees")) {
      leftImage = imageDict[5];
      rightImage = imageDict[5];
    }

    const leftImages = Array(leftNumber).fill(leftImage);
    const rightImages = Array(rightNumber).fill(rightImage);

    return {
      questionText,
      leftNumber,
      rightNumber,
      leftImages,
      rightImages,
    };
  };

  const generateNewQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setQuestion(generateQuestion());
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  useEffect(() => {
    let intervalId = null;

    if (isCapturing) {
      setTimeLeft(5);
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            captureAndProcessImage()
              .then(() => {
                setIsCapturing(false);
                showFeedbackModal();
              })
              .catch((error) => console.error("Error capturing image:", error));
            clearInterval(intervalId);
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
    if (fingerCount !== null && question !== null) {
      const expectedAnswer = Math.max(question.leftNumber, question.rightNumber);
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
  }, [fingerCount, question]);

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
        type: "image/jpeg",
        name: "photo.jpg",
      });

      try {
        const response = await axios.post(`${BASE_URL}/process`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFingerCount(response.data.finger_count);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  const showFeedbackModal = () => {
    setIsModalVisible(true);
  };

  const hideFeedbackModal = () => {
    setIsModalVisible(false);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

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
      <Text style={styles.textTopic}>Let's Get Started</Text>
      <Image style={styles.bgImg} source={require("../../assets/bg.jpg")} />
      <View style={styles.overlay}>
        {question && (
          <>
            <Text style={styles.qtext}>{question.questionText}</Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() => generateNewQuestion()}
            >
              <Image
                source={require("../../assets/arrows.png")}
                style={styles.refreshIcon}
              />
            </TouchableOpacity>
            <View style={styles.container2}>
              <View style={styles.numberBox}>
                {question.leftImages.map((image, index) => (
                  <Image key={index} source={image} style={styles.emoji} />
                ))}
              </View>
              <View style={styles.numberBox2}>
                {question.rightImages.map((image, index) => (
                  <Image key={index} source={image} style={styles.emoji} />
                ))}
              </View>
            </View>
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
                  source={require("../../assets/flip.png")}
                  style={styles.flipButton}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={handleCaptureButtonPress}
              >
                <Text style={styles.text}>
                  {isCapturing ? "Stop " : "Start"}
                </Text>
              </TouchableOpacity>
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
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "auto",
    height: "100%",
    backgroundColor: "#4D86F7",
  },
  bgImg: {
    alignSelf: "center",
    top: "10%",
    width: "100%",
    height: "80%",
    borderWidth: 1,
    borderRadius: 90,
  },
  textTopic: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 35,
    color: "#FFD166",
    top: "8%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    top: "15%",
    height: "80%",
    borderRadius: 85,
  },
  container2: {
    flexDirection: "row",
    padding: 10,
  },
  numberBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    top: "1%",
    right: "0.50%",
    width: "45%",
    height: "60%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dotted",
  },
  numberBox2: {
    backgroundColor: "#fff",
    borderRadius: 10,
    top: "1%",
    left: "10%",
    width: "45%",
    height: "60%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dotted",
  },
  qtext: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    paddingVertical: 5,
  },
  emoji: {
    width: 30,
    height: 30,
  },
  refreshButton: {
    padding: 0,
    marginTop: 1,
    right: 2,
  },
  refreshIcon: {
    left: "90%",
    width: 20,
    height: 20
  },
  cameraContainer: {
    width: "80%",
    height: 300,
    overflow: "hidden",
    borderRadius: 10,
    marginTop: -89,
    left: "10%",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  uiContainer: {
    marginTop: 1,
    alignItems: "center",
  },
  flipButton: { 
    top: 1,
    width: 30,
    height: 30,
  },
  button: {
    marginTop: -20,
    padding: 10,
    backgroundColor: "#14274e",
    borderRadius: 4,
  },
  button1: {
    left: "35%",
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  resultText: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
  },
  feedbackText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#f00",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default DetectiveScreen;
