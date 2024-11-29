import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import * as ImageManipulator from "expo-image-manipulator";
import LottieView from "lottie-react-native";
import { BASE_URL } from "./MathHandsConfig";

const EightTimesScreen = () => {
  const [facing, setFacing] = useState("front");
  const [isCapturing, setIsCapturing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [fingerCount, setFingerCount] = useState(0);
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
          `${BASE_URL}/process-eight-times-table`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { finger_count, result } = response.data;
        setFingerCount(finger_count);
        setResult(result);
        setModalVisible(true);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
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
      {/* Title */}
      <Text style={styles.title}>8 Times Table</Text>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      </View>

      {/* Buttons */}
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
          onPress={() => setIsCapturing(true)}
        >
          <Text style={styles.text}>{isCapturing ? "Stop " : "Start"}</Text>
        </TouchableOpacity>
      </View>

      {/* Result Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              8 x {fingerCount} = {result}
            </Text>
            <Text style={styles.modalText}>
              You raised {fingerCount} fingers! Amazing work!
            </Text>
            <LottieView
              source={require("../../assets/welldone.json")}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
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
    flex: 1,
    backgroundColor: "#E8F4F8",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  cameraContainer: {
    width: "80%",
    height: 300,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 20,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  uiContainer: {
    alignItems: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#14274e",
    borderRadius: 4,
    marginVertical: 10,
  },
  button1: {
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default EightTimesScreen;
