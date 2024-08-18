import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
//import MemmoryMissionStart from "./MemmoryMissionStart";
// import MathHandsMenu from "./MathHandsMenu";
// import SetQuestions from "./SetQuestions";

import LottieView from "lottie-react-native";
// import BasicMath from "./BasicMath";
import DetectiveScreen from "./DetectiveScreen";
import MathHandsMenu from "./MathHandsMenu";
import SpacedRepetitionScreen from "./SpacedRepetitionScreen";
import FlashcardMatchingScreen from "./FlashcardMatchingScreen";
import MultiplicationInro from "./MultiplicationInro";
// import DetScreen from "./DetScreen2";

const Allexercises = ({ navigation }) => {
  const basicmath = () => {
    navigation.navigate(DetectiveScreen);
  };

  const numberCrunches = () => {
    navigation.navigate(MathHandsMenu);
  };

  const allnumdet = () => {
    navigation.navigate(FlashcardMatchingScreen);
  };

  const allnew = () => {
    //  navigation.navigate(SetQuestions);
  };

  const MemmoryMissionStart = () => {
    navigation.navigate(SpacedRepetitionScreen);
  };

  const startMultiplicationFeature = () => {
    navigation.navigate(MultiplicationInro);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>Lets get started</Text>
      <Image style={styles.bgImg} source={require("../../assets/bg.jpg")} />
      <View style={styles.overlay}>
        {/* List container with improved styling */}
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.listItem} onPress={basicmath}>
            <Text style={styles.listItemText}>Number detectives️ </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={numberCrunches}>
            <Text style={styles.listItemText}>Number Learning </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={allnumdet}>
            <Text style={styles.listItemText}>Number Matching </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPress={MemmoryMissionStart}
          >
            <Text style={styles.listItemText}>Memory mission</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <LottieView
            style={{ flex: 1, resizeMode: "contain", top: "35%" }}
            source={require("../../assets/hippo.json")}
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
    color: "#FFF",
    top: "8%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    top: "15%",
    height: "80%",
    borderRadius: 85,
  },
  listContainer: {
    // Center the list horizontally
    alignItems: "center",
    // Add some top and bottom padding
    paddingTop: 20,
    paddingBottom: 20,
  },
  listItem: {
    // Style for each list item
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  listItemText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4D86F7",
  },
  
});

export default Allexercises;
