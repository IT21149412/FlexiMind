import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import { auth, db } from '../../firebase';
import Svg, { Circle, G } from 'react-native-svg';
import { COLORS } from '../../../constants/Theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// SmallPieChart component
const SmallPieChart = ({ percentage, activityName }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
  });

  return (
    <View style={styles.smallPieContainer}>
      <Svg width="120" height="120" viewBox="0 0 36 36" style={styles.svg}>
        <G rotation="-90" origin="18, 18">
          <Circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#aed5f2"
            strokeWidth="3.8"
          />
          <AnimatedCircle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke={COLORS.accent}
            strokeWidth="3.8"
            strokeDasharray="100"
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
      <View style={styles.innerSmallCircle}>
        <Text style={styles.smallPercentageText}>
          {Math.round(percentage)}%
        </Text>
      </View>
      <Text style={styles.activityName}>{activityName}</Text>
    </View>
  );
};

// Main QuizSummary component
const QuizSummary = ({ route, navigation }) => {
  const {
    selectedAge,
    iqscore,
    score,
    totalQuestions,
    timeTaken,
    questionResults,
  } = route.params;
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  const percentageiq = (iqscore / totalQuestions) * 100;
  const percentage = (score / totalQuestions) * 100;

  // Function to store the quiz results in Firestore
  const storeResultsInFirestore = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      try {
        await addDoc(collection(db, 'quizResults'), {
          userId, // Store userId in Firestore
          selectedAge,
          iqscore,
          score,
          totalQuestions,
          timeTaken,
          questionResults,
          createdAt: new Date(), // Timestamp for when the data is stored
        });
        console.log('Results stored successfully!');
      } catch (error) {
        console.error('Error storing results:', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  useEffect(() => {
    // Prepare data for API request
    const requestData = {
      Age: selectedAge,
      IQ: iqscore,
      Question1: questionResults[0] || 0,
      Question2: questionResults[1] || 0,
      Question3: questionResults[2] || 0,
      Question4: questionResults[3] || 0,
      Question5: questionResults[4] || 0,
      Time_S: timeTaken,
    };

    // Fetch prediction from Flask API
    fetch('http://192.168.186.38:5001/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Prediction:', data.prediction);
        setPrediction(data.prediction);
        setLoading(false);

        // Store the quiz results in Firestore after prediction
        storeResultsInFirestore();
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Ensure loading is set to false even on error
      });
  }, [selectedAge, iqscore, questionResults, timeTaken]);

  const formatTime = (seconds) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  const handlePositivePrediction = () => {
    navigation.navigate('activityEng');
  };

  const handleNegativePrediction = () => {
    navigation.navigate('Home'); // Replace with your actual home screen
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Results - Age: {selectedAge}</Text>
      </View>
      <View style={styles.resultsContainer}>
        <View style={styles.resultItem}>
          <SmallPieChart percentage={percentageiq} activityName="IQ Test" />
          <SmallPieChart percentage={percentage} activityName="Quiz" />
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Image
          style={styles.timeIcon}
          source={require('../../../assets/images/timer.png')}
        />
        <Text style={styles.timeText}>{formatTime(timeTaken)}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.predictionContainer}>
          {prediction === 1 ? (
            <View>
              <Image
                source={require('../../../assets/images/activity.gif')}
                style={styles.Gif}
              />
              <Text style={styles.predictionText}>
                Practice makes perfect! Let's try some more word and sentence
                building games!
              </Text>
              <TouchableOpacity
                onPress={handlePositivePrediction}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>Go to Activities</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Image
                source={require('../../../assets/images/good.gif')}
                style={styles.Gif}
              />
              <Text style={styles.predictionText}>
                You're on the right track! Let's explore some new adventures!
              </Text>
              <TouchableOpacity
                onPress={handleNegativePrediction}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D86F7',
  },
  bgImg: {
    position: 'absolute',
    top: '10%',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 90,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '10%',
    height: '100%',
    borderRadius: 90,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  smallPieContainer: {
    alignItems: 'center',
    margin: 10,
  },
  svg: {
    position: 'relative',
  },
  innerSmallCircle: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aed5f2',
  },
  smallPercentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  activityName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.accent,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timeIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  predictionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  Gif: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  predictionText: {
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3333',
    marginVertical: 20,
  },
  nextButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default QuizSummary;
