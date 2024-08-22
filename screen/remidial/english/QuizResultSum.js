import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
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
        <Text style={styles.smallPercentageText}>{Math.round(percentage)}%</Text>
      </View>
      <Text style={styles.activityName}>{activityName}</Text>
    </View>
  );
};

// Main QuizSummary component
const QuizSummary = ({ route, navigation }) => {
  const { selectedAge,iqscore, score, totalQuestions, timeTaken } = route.params;
  const percentageiq = (iqscore / totalQuestions) * 100;
  const percentage = (score / totalQuestions) * 100;


  const formatTime = (seconds) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  const showResults = () => {
    navigation.navigate('activityEng');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Results age: {selectedAge}</Text>
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
      <TouchableOpacity onPress={showResults} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#4D86F7',
  },
  bgImg: {
    position: 'absolute',
    top: '13%',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 90,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '13%',
    height: '100%',
    borderRadius: 90,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  resultsContainer: {
    top: '-15%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultItem: {
    flexDirection: 'row', // Align items in the same row
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
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
    top: '-85%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  timeIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,

  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'center',
    width: '50%',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default QuizSummary;
