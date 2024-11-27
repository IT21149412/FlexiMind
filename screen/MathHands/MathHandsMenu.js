import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";

const MathHandsMenu = ({ navigation }) => {
  const AdditionAlley = () => {
    navigation.navigate("AdditionAlleyScreen");
  };

  const SubtractionStreet = () => {
    navigation.navigate("SubtractionAlleyScreen");
  };

  const demomulti = () => {
    navigation.navigate("DemoMultiplication");
  };

  const DivisionDrive = () => {
    navigation.navigate("DivisionDriveScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>Let's get started</Text>
      <Image
        style={styles.bgImg}
        source={require("../../assets/bg.jpg")}
      />
      <View style={styles.overlay}>
        <View style={styles.listContainer}>
          {/* List items with improved styling */}
          <TouchableOpacity style={styles.listItem} onPress={AdditionAlley}>
            <Text style={styles.listItemText}>Addition Alley</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={SubtractionStreet}>
            <Text style={styles.listItemText}>Subtraction Street</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={demomulti}>
            <Text style={styles.listItemText}>Multiplication Magic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={DivisionDrive}>
            <Text style={styles.listItemText}>Division Drive</Text>
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
});

export default MathHandsMenu;
