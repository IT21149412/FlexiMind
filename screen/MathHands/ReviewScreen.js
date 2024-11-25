import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";

const ReviewScreen = ({ navigation }) => {
  const handleContinue = () => {
    // Navigate to the review exercises screen or retry the incorrect exercises
    navigation.navigate("RetryExercisesScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Let's correct the exercises you missed!</Text>
      <LottieView
        style={styles.lottie}
        source={require("../../assets/wizard.json")}
        autoPlay
        loop
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#4D86F7",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4D86F7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  lottie: {
    width: "70%",
    height: "50%",
  },
});

export default ReviewScreen;
