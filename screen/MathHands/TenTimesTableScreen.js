import React, { useState, useRef, useEffect } from "react";
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
import { BASE_URL } from "./MathHandsConfig";

const TenTimesScreen = ({ navigation }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [facing, setFacing] = useState("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [timeLeft, setTimeLeft] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState(null);
  const cameraRef = useRef(null);

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

  const captureAndProcessImage = async () => {
    if (cameraRef.current) {
      try {
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

        const response = await axios.post(
          `${BASE_URL}/process-ten-times-table`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setResult(response.data);
        setModalVisible(true);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const renderTimer = () => {
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

  const renderModalContent = () => {
    if (!result) return null;

    const fingerCount = result.result / 10; // Derive finger count from result
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>10 x {fingerCount}</Text>
            <Image
              source={require("../../assets/5.png")}
              style={styles.handImage}
            />
            <Text style={styles.resultText}>Result: {result.result}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    );
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to access the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>10 Times Table</Text>
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      </View>
      <View style={styles.controlsContainer}>
        {isCapturing && renderTimer()}
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.buttonText}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={() => setIsCapturing(true)}
        >
          <Text style={styles.buttonText}>
            {isCapturing ? "Stop" : "Capture"}
          </Text>
        </TouchableOpacity>
      </View>
      {renderModalContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D86F7",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFD700",
  },
  cameraContainer: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#14274e",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  captureButton: {
    backgroundColor: "#FF4500",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  handImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  permissionText: {
    fontSize: 18,
    textAlign: "center",
    margin: 20,
  },
});

export default TenTimesScreen;
