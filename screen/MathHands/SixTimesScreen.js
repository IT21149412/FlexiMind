import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import LottieView from "lottie-react-native";
import { BASE_URL2 } from "./MathHandsConfig";

const SixTimesScreen = ({ route, navigation }) => {
  const [facing, setFacing] = useState("front");
  const [isCapturing, setIsCapturing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [showLottie, setShowLottie] = useState(false);
  const [showIncorrectLottie, setShowIncorrectLottie] = useState(false);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const captureAndProcessImage = async () => {
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        let resizedPhoto = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 640 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        let formData = new FormData();
        formData.append("image", {
          uri: resizedPhoto.uri,
          type: "image/jpeg",
          name: "photo.jpg",
        });

        const response = await axios.post(
          `${BASE_URL2}/process-six-times-table`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setResult(response.data);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
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

  const getHandImage = (fingerCount) => {
    switch (fingerCount) {
      case 1:
        return require("../../assets/1.gif");
      case 2:
        return require("../../assets/22.gif");
      case 3:
        return require("../../assets/3.gif");
      case 4:
        return require("../../assets/4.gif");
      case 5:
        return require("../../assets/5.gif");
      case 6:
        return require("../../assets/6.gif");
      case 7:
        return require("../../assets/7.gif");
      case 8:
        return require("../../assets/8.gif");
      case 9:
        return require("../../assets/9.gif");
      case 10:
        return require("../../assets/10.gif");
      default:
        return null;
    }
  };

  const renderStepImages = (step) => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>Step 1: Count the Fingers</Text>
            {result.finger_count && (
              <Image
                source={getHandImage(result.finger_count)}
                style={styles.stepImage}
              />
            )}
            <Text style={styles.explanationText}>
              You have {result.finger_count} fingers up.
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>
              Step 2: Multiply the raised fingers by 5
            </Text>
            <View style={styles.iconsContainer}>
              {[...Array(result.finger_count)].map((_, i) => (
                <Image
                  key={i}
                  source={require("../../assets/5.png")}
                  style={[
                    styles.icon,
                    result.finger_count > 6 && styles.smallIcon,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.explanationText}>
              {result.finger_count} x 5 = {result.multiple_of_5}
            </Text>
          </View>
        );
      case 3:
        return (
          <View style={[styles.stepContainer, styles.stepBox]}>
            <Text style={styles.stepText}>
              Step 3: Add answers for step 1 and step 2
            </Text>
            <View style={styles.additionContainer}>
              {/* Add images or icons for the numbers if needed */}
            </View>
            <Text style={styles.explanationText2}>
              Answer: {result.multiple_of_5} + {result.finger_count} ={" "}
              {result.result}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    if (result) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>6 X {result.finger_count}</Text>
              {renderStepImages(1)}
              {renderStepImages(2)}
              {renderStepImages(3)}
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                title="Close"
              />
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bgImg} source={require("../../assets/bg.jpg")} />
      <View style={styles.overlay}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          6 Times Table
        </Text>
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        </View>
        <View style={styles.uiContainer}>
          {isCapturing && renderCircularTimer()}
          <TouchableOpacity style={styles.button1} onPress={toggleCameraFacing}>
            <Image
              source={require("../../assets/flip.png")}
              style={styles.refreshIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCaptureButtonPress}
          >
            <Text style={styles.text}>{isCapturing ? "Stop " : "Start"}</Text>
          </TouchableOpacity>
          {result && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Answer: {result.result}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.modalButtonText}>Check Calculation</Text>
              </TouchableOpacity>
              <Image
                source={require("../../assets/icons8-tap-gesture.gif")}
                style={styles.icon2}
              />
            </View>
          )}
          {renderResult()}
        </View>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    top: "15%",
    height: "80%",
    borderRadius: 85,
  },
  cameraContainer: {
    width: "80%",
    height: 300,
    overflow: "hidden",
    borderRadius: 10,
    marginTop: 20,
    left: "10%",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  uiContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  button: {
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
  refreshIcon: {
    width: 30,
    height: 30,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#14274e",
    borderRadius: 4,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  stepContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  stepText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    margin: 5,
  },
  stepImage: {
    width: 250,
    height: 250,
  },
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    margin: 5,
  },
  smallIcon: {
    width: 30,
    height: 30,
    margin: 3,
  },
  additionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  additionImage: {
    width: 50,
    height: 50,
  },
  additionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 5,
  },
  explanationText: {
    fontSize: 16,
    color: "black",
    margin: 5,
    textAlign: "center",
  },
  explanationText2: {
    fontSize: 24,
    color: "black",
    margin: 5,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  additionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  additionImage: {
    width: 50,
    height: 50,
  },
  additionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 5,
  },
  stepBox: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f9f9f9", // Optional: add background color for better visibility
  },
});

export default SixTimesScreen;
