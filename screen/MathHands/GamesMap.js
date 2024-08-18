import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

const GameMap = () => {
  const navigation = useNavigation();
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ],
    };
  });

  const moveWizardTo = (x, y) => {
    translationX.value = withSpring(x);
    translationY.value = withSpring(y);
  };

 

  const navigateToTimesTable1to5 = () => {
    navigation.navigate("DemoVideosScreen"); // Ensure this screen is defined in your navigation stack
  };

  const navigateToTimesTable6 = () => {
    navigation.navigate("SixTimesScreen"); // Ensure this screen is defined in your navigation stack
  };



  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/game.jpg")} // Use the path where your image is stored
        style={styles.backgroundImage}
      />
      <Animated.View style={[styles.lottieContainer, animatedStyle]}>
        <LottieView
          style={styles.lottie}
          source={require("../../assets/wizard.json")}
          autoPlay
          loop
        />
      </Animated.View>
      <TouchableOpacity
        style={[styles.tile, styles.tile1]}
        onPress={navigateToTimesTable1to5}
      >
        <Text style={styles.tileText}>1-5</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tile, styles.tile6]}
        onPress={navigateToTimesTable6}
      >
        <Text style={styles.tileText}>6</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tile, styles.tile7]}
        onPress={() => moveWizardTo(85, -100)}
      >
        <Text style={styles.tileText}>7</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tile, styles.tile8]}
        onPress={() => moveWizardTo(40, -250)}
      >
        <Text style={styles.tileText}>8</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tile, styles.tile9]}
        onPress={() => moveWizardTo(-120, -400)}
      >
        <Text style={styles.tileText}>9</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tile, styles.tile10]}
        onPress={() => moveWizardTo(-120, -500)}
      >
        <Text style={styles.tileText}>10</Text>
      </TouchableOpacity>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  lottieContainer: {
    position: "absolute",
    left: "25%",
    top: "60%",
    width: 200,
    height: 200,
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
  tile: {
    position: "absolute",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  tileText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4D86F7",
  },
  tile1: { top: "80%", left: "46%" },
  tile6: { top: "59%", left: "11%" },
  tile7: { top: "53%", left: "80%" },
  tile8: { top: "25%", left: "71%" },
  tile9: { top: "20%", left: "30%" },
  tile10: { top: "2%", left: "38%" },
  navigationButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -75 }],
    backgroundColor: "#4D86F7",
    padding: 10,
    borderRadius: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default GameMap;
