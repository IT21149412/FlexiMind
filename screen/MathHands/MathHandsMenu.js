import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import AdditionAlleyScreen from "./AdditionAlleyScreen";
import SubtractionAlleyScreen from "./SubtractionStreet";
import DivisionDriveScreen from "./DivisionDriveScreen";
import LottieView from "lottie-react-native";
import DemoMultiplication from "./DemoMultiplication";
import { translations } from "./locales";

const MathHandsMenu = ({route, navigation }) => {
  const { language } = route.params;
  const t = translations[language];

  const AdditionAlley = () => {
    navigation.navigate("AdditionAlleyScreen",{ language: language });
  };

  const SubtractionStreet = () => {
    navigation.navigate("SubtractionAlleyScreen" ,{ language: language });
  };

  const demomulti = () => {
    navigation.navigate("DemoMultiplication" ,{ language: language });
  };

  const DivisionDrive = () => {
    navigation.navigate("DivisionDriveScreen"  ,{ language: language });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>{t.startLearning}</Text>
      <Image
        style={styles.bgImg}
        source={require("../../assets/bg.jpg")}
      />
      <View style={styles.overlay}>
        <View style={styles.listContainer}>
          {/* List items with improved styling */}
          <TouchableOpacity style={styles.listItem} onPress={AdditionAlley}>
            <Text style={styles.listItemText}>{t.additionAlley}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={SubtractionStreet}>
            <Text style={styles.listItemText}>{t.subtractionStreet}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={demomulti}>
            <Text style={styles.listItemText}>{t.multiplicationMagic}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={DivisionDrive}>
            <Text style={styles.listItemText}>{t.divisionDrive}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <LottieView
            style={{ flex: 1, resizeMode: "contain", top: "30%" }}
            source={require("../../assets/starfish.json")}
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

export default MathHandsMenu;
