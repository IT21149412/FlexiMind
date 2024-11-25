import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";

const Allexercises = ({ navigation }) => {
  const basicmath = () => {
    navigation.navigate("DetectiveScreen");
  };

  const numberCrunches = () => {
    navigation.navigate("MathHandsMenu");
  };
  
  const allnumdet = () => {
    navigation.navigate("FlashcardMatchingScreen");
  };

  const MemmoryMissionStart = () => {
    navigation.navigate("SpacedRepetitionScreen");
  };

  const startMagicQuest = () => {
    navigation.navigate("GameMap");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>Let's get started</Text>
      <Image style={styles.bgImg} source={require("../../assets/bg.jpg")} />
      <View style={styles.overlay}>
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.listItem} onPress={numberCrunches}>
            <Text style={styles.listItemText}>Number Learning</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={basicmath}>
            <Text style={styles.listItemText}>Number Detectives</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={allnumdet}>
            <Text style={styles.listItemText}>Number Matching</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPress={MemmoryMissionStart}
          >
            <Text style={styles.listItemText}>Memory Mission</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={startMagicQuest}>
            <Text style={styles.listItemText}>Visit Magic Garden</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.magicButton}
            onPress={startMagicQuest}
          >
            <Image
              style={styles.gifImage}
              source={require("../../assets/message (2).gif")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <LottieView
            style={styles.lottie}
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
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  listItem: {
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
  gifImage: {
    top: "50%",
    left: "1%",
    width: 170,
    height: 120,
  },
  lottie: {
    width: "150%",
    height: "150%",
    left: "-40%",
  },
});

export default Allexercises;
