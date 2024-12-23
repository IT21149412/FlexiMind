import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const MathHandsMainScreen = () => {
  const navigation = useNavigation();

  const MathHandsMenu = () => {
    navigation.navigate("Allexercises"); // No need to pass language
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bgImg} source={require("../../assets/bg.jpg")} />
      <View style={styles.overlay}>
        <Text style={styles.textTopic}>Math Hands</Text>
        <Text style={styles.subtitle}>
          Learn math the fun{"\n"}way with your fingers!
        </Text>
        <TouchableOpacity style={styles.button} onPress={MathHandsMenu}>
          <Text style={styles.buttonText}>START LEARNING</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GO BACK</Text>
        </TouchableOpacity>
        <View style={styles.lottieContainer}>
          <LottieView
            style={styles.lottie}
            source={require("../../assets/fox.json")}
            autoPlay
            loop
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  textTopic: {
    fontSize: 35,
    fontWeight: "900",
    color: "#FFD166",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#CB9D06",
    textAlign: "center",
    marginVertical: 20,
  },
  bgImg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    top: "15%",
    height: "81%",
    borderRadius: 85,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#4D86F7",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  lottieContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  lottie: {
    top: "120%",
    width: 200,
    height: 200,
    left: "25%",
  },
});

export default MathHandsMainScreen;
