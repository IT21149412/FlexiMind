import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Vibration,
} from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import LottieView from "lottie-react-native";

// Utility function to shuffle an array
const shuffleArray = (array) => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const FlashcardMatchingScreen = ({ navigation }) => {
  const [flashcards, setFlashcards] = useState([
    { id: 1, fingerImage: require("../../assets/one.png"), number: 1, type: "finger", matched: false },
    { id: 2, number: 1, type: "number", matched: false },
    { id: 3, fingerImage: require("../../assets/two.png"), number: 2, type: "finger", matched: false },
    { id: 4, number: 2, type: "number", matched: false },
    { id: 5, fingerImage: require("../../assets/three.png"), number: 3, type: "finger", matched: false },
    { id: 6, number: 3, type: "number", matched: false },
    { id: 7, fingerImage: require("../../assets/four.png"), number: 4, type: "finger", matched: false },
    { id: 8, number: 4, type: "number", matched: false },
    { id: 9, fingerImage: require("../../assets/five.png"), number: 5, type: "finger", matched: false },
    { id: 10, number: 5, type: "number", matched: false },
    // Add more flashcards as needed
  ]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [matches, setMatches] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(20); // Initial countdown time in seconds
  const [timerRunning, setTimerRunning] = useState(false); // Flag to control timer start/stop
  const [showStartButton, setShowStartButton] = useState(true); // Flag to control showing the start button
  const [showAnimation, setShowAnimation] = useState(false); // State to control animation visibility

  // Shuffle flashcards on component mount
  useEffect(() => {
    setFlashcards(shuffleArray(flashcards));
  }, []);

  // Timer management
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    if (secondsLeft === 0) {
      stopTimer();
      Alert.alert("Time's up!", "Try again?");
    }
  }, [secondsLeft]);

  const startGame = () => {
    setShowStartButton(false); // Hide the start button once game starts
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const handleCardPress = (card) => {
    if (selectedCard) {
      checkMatch(selectedCard, card);
    } else {
      setSelectedCard(card);
    }
  };

  const checkMatch = (card1, card2) => {
    if (card1.number === card2.number && card1.id !== card2.id && card1.type !== card2.type) {
      setMatches([...matches, card1, card2]);
      markAsMatched(card1.id, card2.id);
    } else {
      // Vibrate for 500ms when match is incorrect
      Vibration.vibrate(500);
    }
    setSelectedCard(null);
  };

  const markAsMatched = (id1, id2) => {
    setFlashcards(prevState =>
      prevState.map(card => {
        if (card.id === id1 || card.id === id2) {
          return { ...card, matched: true };
        }
        return card;
      })
    );
  };

  useEffect(() => {
    if (matches.length === flashcards.length) {
      Alert.alert("Congratulations!", "You've matched all flashcards!");
      stopTimer();
    }
  }, [matches]);

  const handleRefresh = () => {
    Alert.alert(
      "Refresh Game",
      "Are you sure you want to restart the game?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: resetGame },
      ],
      { cancelable: false }
    );
  };

  const resetGame = () => {
    setMatches([]);
    setFlashcards(shuffleArray([...flashcards]));
    setSecondsLeft(20); // Reset timer to 20 seconds
    stopTimer();
    setShowStartButton(true); // Show the start button again
  };

  const Timer = () => {
    const radius = 30;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (secondsLeft / 20) * circumference;

    return (
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          stroke="#333"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
        />
        <Circle
          stroke="#FFD166"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
        />
        <SvgText
          x={radius}
          y={radius}
          fontSize="14"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="#FFF"
        >
          {secondsLeft}
        </SvgText>
      </Svg>
    );
  };

  const renderStartButton = () => {
    return (
      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    );
  };

  const renderPopup = () => {
    Alert.alert(
      "Start Game / Refresh",
      "Are you ready to start the game?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            // Handle cancellation
          },
        },
        {
          text: "OK",
          onPress: () => {
            startGame();
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    renderPopup();
  }, []);

  const renderItem = ({ item }) => {
    const isMatched = matches.some(match => match.id === item.id);
    const isSelected = selectedCard === item;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          isMatched && styles.matchedCard,
        ]}
        onPress={() => handleCardPress(item)}
        disabled={isMatched}
      >
        {item.type === "finger" ? (
          <Image source={item.fingerImage} style={styles.image} />
        ) : (
          <Text style={[styles.cardText, isMatched && { color: '#28A745' }]}>{item.number}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>Finger Matching Exercise</Text>
      <View style={styles.timerContainer}>
        <Timer />
      </View>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh Game</Text>
      </TouchableOpacity>
      <FlatList
        data={flashcards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
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
  textTopic: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#FFF",
    marginTop: 40, // Adjusted margin to provide space between title and timer
    marginBottom: 20, // Added marginBottom for better spacing
  },
  timerContainer: {
    position: "absolute",
    top: 80,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 20,
  },
  row: {
    justifyContent: "space-around",
},
card: {
  backgroundColor: "#FFD166",
  borderRadius: 10,
  padding: 20,
  margin: 10,
  width: 150,
  alignItems: "center",
},
selectedCard: {
  backgroundColor: "#FF7F50",
},
matchedCard: {
  backgroundColor: "#28A745",
},
image: {
  width: 100,
  height: 100,
  marginBottom: 10,
},
cardText: {
  fontSize: 18,
  color: "#000",
},
refreshButton: {
  backgroundColor: "#007BFF",
  padding: 10,
  borderRadius: 5,
  marginTop: 20,
},
refreshButtonText: {
  color: "#FFF",
  fontSize: 18,
},
startButton: {
  backgroundColor: "#28A745",
  padding: 15,
  borderRadius: 5,
  marginTop: 20,
},
startButtonText: {
  color: "#FFF",
  fontSize: 18,
},
popupButton: {
  backgroundColor: "#FFD166",
  padding: 15,
  borderRadius: 5,
  marginTop: 20,
},
popupButtonText: {
  color: "#FFF",
  fontSize: 18,
},
popupOpenButton: {
  position: "absolute",
  bottom: 20,
  right: 20,
  backgroundColor: "#FFD166",
  padding: 10,
  borderRadius: 5,
},
popupOpenButtonText: {
  color: "#FFF",
  fontSize: 14,
},
});

export default FlashcardMatchingScreen;
