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
import { BASE_URL} from "./MathHandsConfig";
import AwesomeAlert from "react-native-awesome-alerts";
import PagerView from "react-native-pager-view";
import { Video } from "expo-av";
import LottieView from "lottie-react-native";

const NineTimesScreen = ({ route, navigation }) => {
  const [facing, setFacing] = useState("front");
  const [isCapturing, setIsCapturing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [instructionModalVisible, setInstructionModalVisible] = useState(true);

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
          `${BASE_URL}/process-nine-times-table`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.error) {
          setErrorMessage(response.data.error);
          setShowAlert(true);
        } else {
          setResult(response.data);
          setModalVisible(true);
        }
      } catch (error) {
        console.error("Error processing image:", error);
        setErrorMessage("An error occurred. Please try again.");
        setShowAlert(true);
      }
    }
  };

  const handleCaptureButtonPress = () => {
    setIsCapturing((prev) => !prev);
  };

  const renderInstructionModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={instructionModalVisible}
        onRequestClose={() => setInstructionModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Learn the 9 Times Table</Text>

          {/* Adding explicit height for PagerView */}
          <PagerView style={styles.pagerView} initialPage={0}>
            <View style={styles.page} key="1">
              <Video
                source={require("../../assets/video1.mp4")} // Ensure path is correct
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                useNativeControls
                style={styles.video}
              />
              <Text style={styles.pageText}>Swipe next🫱</Text>
            </View>

            <View style={styles.page} key="2">
              <Video
                source={require("../../assets/video2.mp4")} // Ensure path is correct
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                useNativeControls
                style={styles.video}
              />
              <Text style={styles.pageText}>Swipe next🫱</Text>
            </View>

            <View style={styles.page} key="3">
              <Video
                source={require("../../assets/video3.mp4")} // Ensure path is correct
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                useNativeControls
                style={styles.video}
              />
              <Text style={styles.pageText}> Let’s calculate!</Text>
            </View>
            <View style={styles.page} key="4">
              <Text style={styles.pageText}>
                {" "}
                Always remember {"\n"} To see the 9 times table,{"\n"} Fold the
                finger you want to multiply {"\n"} by 9!
              </Text>
              <LottieView
                style={styles.lottie}
                source={require("../../assets/wizard.json")}
                autoPlay
                loop
              />
            </View>
          </PagerView>

          <Button
            title="Got it! Start the exercise"
            onPress={() => setInstructionModalVisible(false)}
          />
        </View>
      </Modal>
    );
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

  const renderResult = () => {
    if (result) {
      const base64Image = `data:image/jpeg;base64,${result.processed_image}`;

      // Keep the foldedFingerNumber and displayFingerNumber logic unchanged
      const foldedFingerNumber = result.hand_data.find(
        (hand) => hand.folded_finger_number !== null
      )?.folded_finger_number;

      const displayFingerNumber =
        foldedFingerNumber !== undefined ? foldedFingerNumber : "Unknown";

      const redCircleCount = result.red_circle_count || 0;
      const blueCircleCount = result.blue_circle_count || 0;

      const leftHand = result.hand_data.find(
        (hand) => hand.hand_type === "Left"
      );

      // Check if left hand folded_finger_number is null
      const isLeftHandFoldedNull =
        leftHand && leftHand.folded_finger_number === null;

      // Adjust the answer calculation based on left hand folded_finger_number
      const answer = isLeftHandFoldedNull
        ? `${redCircleCount}${blueCircleCount}` // Red first when left hand's folded_finger_number is null
        : `${blueCircleCount}${redCircleCount}`; // Default: Blue first

      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.kidFriendlyModalView}>
              <Text style={styles.kidModalText}>
                🎉 Yay! Let's see how we can find{" "}
                <Text style={{ color: "green" }}>9X{displayFingerNumber}</Text>{" "}
                🎉
              </Text>

              <Image
                source={{ uri: base64Image }}
                style={styles.kidFriendlyImage}
              />

              <Text style={styles.kidExplanationText}>
                <Text style={{ fontWeight: "bold", color: "#FF6347" }}>
                  You folded finger number {displayFingerNumber}!{"\n"}
                </Text>
                {/* Display red first if left hand's folded_finger_number is null */}
                {isLeftHandFoldedNull ? (
                  <>
                    🔍 Count the 🔴 which are located left of your folded
                    finger. There are {redCircleCount}.{"\n"}
                    🔍 Count the 🔵 which are located right of your folded
                    finger. There are {blueCircleCount}.
                  </>
                ) : (
                  <>
                    🔍 Count the 🔵 which are located left of your folded
                    finger. There are {blueCircleCount}.{"\n"}
                    🔍 Count the 🔴 which are located right of your folded
                    finger. There are {redCircleCount}.
                  </>
                )}
                {"\n"}
                Now put these numbers together...{"\n"}
              </Text>
              <View style={[styles.stepContainer, styles.stepBox]}>
                <Text style={styles.explanationText2}>
                  The Answer is: {answer}
                </Text>
              </View>
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                title="Close"
                color="#841584"
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
      {renderInstructionModal()}

      <Image style={styles.bgImg} source={require("../../assets/bg.jpg")} />
      <View style={styles.overlay}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          9 Times Table
        </Text>
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        </View>
        <View>            
          <Text   style={{ textAlign: "center", fontSize: 15, fontWeight: "bold",color: "#4169e1"  }}>{"\n"}{"\n"}To find the 9 times table,{"\n"}
             hold out both hands, fold the finger of the number you're multiplying by 9 😊</Text>
        </View>
        <View style={styles.uiContainer}>
          {isCapturing && renderCircularTimer()}
          <TouchableOpacity style={styles.button1} onPress={toggleCameraFacing}>
            {/* <Image
              source={require("../../assets/flip.png")}
              style={styles.refreshIcon}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCaptureButtonPress}
          >
            <Text style={styles.text}>{isCapturing ? "Stop " : "Start"}</Text>
          </TouchableOpacity>
          {result && (
            <View style={styles.resultContainer}>
              {/* <Text style={styles.resultText}>Answer: {result.result}</Text> */}
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
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Error"
          message={errorMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="Close"
          onCancelPressed={() => {
            setShowAlert(false); // Close the alert
          }}
          cancelButtonColor="#DD6B55"
          titleStyle={{ fontSize: 20, fontWeight: "bold", color: "red" }}
          messageStyle={{ fontSize: 16, textAlign: "center" }}
        />
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
  kidFriendlyModalView: {
    margin: 20,
    backgroundColor: "#FFF8DC",
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
  kidModalText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 15,
    textAlign: "center",
  },
  kidFriendlyImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
  kidExplanationText: {
    fontSize: 18,
    textAlign: "center",
    color: "#4B0082",
    marginBottom: 15,
  },
  stepContainer: {
    alignItems: "center",
    marginVertical: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF5E1", // Light, playful background color
  },
  modalTitle: {
    fontSize: 28, // Larger text for kids to read easily
    fontWeight: "bold",
    color: "#FF6347", // Fun and energetic color
    marginBottom: 20,
    textAlign: "center",
  },
  pagerView: {
    flex: 1,
    width: "100%",
    height: 400,
    borderRadius: 20, // Rounded corners for a softer look
    overflow: "hidden", // Ensure content is contained
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10, // Adding some padding for spacing
  },
  pageText: {
    fontSize: 20, // Larger, clearer text
    fontWeight: "bold",
    marginTop: 10,
    color: "#4B0082", // Playful dark purple
  },
  video: {
    width: "100%",
    height: 400,
    borderRadius: 20, // Rounded corners for a friendly look
    marginBottom: 10, // Space between the video and text
    borderWidth: 4, // Added border width for emphasis
    borderColor: "#FF6347", // Bright and fun border color (same as title for consistency)
    shadowColor: "#000", // Shadow to give depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
  },
  videoControlButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFB6C1", // Light pink for a fun touch
    borderRadius: 20, // Rounded buttons
    alignItems: "center",
  },
  videoControlText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  lottie: {
    width: "70%",
    height: "50%",
  },
});

export default NineTimesScreen;
