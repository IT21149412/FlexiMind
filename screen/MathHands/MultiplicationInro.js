import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";

const MultiplicationIntro = ({ navigation }) => {
  const tables = [2, 3, 4, 5, 6, 7, 8, 9, 10]; // List of times tables

  const startDemo = (timesTable) => {
    // Navigate to the demo screen for the selected times table
    navigation.navigate('VideoDemo', {
      videoUrl: `http://path-to-your-video-${timesTable}.mp4`, // Change to your video URL
      timesTable: `${timesTable}`,
      instructions: [
        `1. Fold ${timesTable} + 1 fingers, starting from the left.`,
        '2. Count the fingers before and after the folded fingers.',
        '3. You\'ll have the correct number of fingers to make the answer!',
      ],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.textTopic}>Learn Multiplication with Fingers</Text>
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.introText}>
            Did you know you can use your fingers to learn multiplication tables? It's fun and easy!
          </Text>
          <View style={styles.tilesContainer}>
            {tables.map((table) => (
              <TouchableOpacity
                key={table}
                style={styles.tile}
                onPress={() => startDemo(table)}
              >
                <Text style={styles.tileText}>{table} Times Table</Text>
              </TouchableOpacity>
            ))}
          </View>
          <LottieView
            style={styles.lottieView}
            source={require("../../assets/hippo.json")}
            autoPlay
            loop
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 50,
    backgroundColor: "#4D86F7",
    alignItems: "center",
  },
  bgImg: {
    alignSelf: "center",
    width: "100%",
    height: 300,
    borderRadius: 90,
    marginTop: 20,
  },
  textTopic: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 35,
    color: "#FFF",
    marginTop: 20,
  },
  overlay: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  introText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4D86F7",
    textAlign: "center",
    marginBottom: 20,
  },
  tilesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tile: {
    backgroundColor: "#FFF",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  tileText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4D86F7",
    textAlign: "center",
  },
  lottieView: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default MultiplicationIntro;
