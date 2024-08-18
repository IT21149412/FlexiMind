import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';
import { COLORS } from '../../../constants/Theme';

const QuizSummary = ({ route, navigation }) => {
  const { score, totalQuestions, timeTaken } = route.params;
  const progress = score / totalQuestions;
  const percentage = Math.round(progress * 100);

  const formatTime = (seconds) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  const showResults = () => {
    navigation.navigate('activityTam');
  };
  return (
    <View style={styles.container}>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <View style={styles.header}>
        <Text style={styles.headerText}>உங்கள் முடிவுகள்</Text>
      </View>
      <View style={styles.resultsContainer}>
        <View style={styles.resultItem}>
          <Text style={styles.resultText}>IQ சோதனை:</Text>

          <ProgressCircle
            size={100}
            progress={progress}
            showsText={false}
            color={COLORS.accent}
            unfilledColor="#e0e0e0"
            borderWidth={0}
          >
            {() => (
              <Text style={styles.text}>
                {score} / {totalQuestions}
              </Text>
            )}
          </ProgressCircle>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultText}>வினாடி வினா:</Text>
          <ProgressCircle
            size={100}
            progress={progress}
            showsText={false}
            color={COLORS.accent}
            unfilledColor="#e0e0e0"
            borderWidth={0}
          >
            {() => <Text style={styles.progressText}>{score}</Text>}
          </ProgressCircle>
        </View>
        <View style={styles.timeContainer}>
          <Image
            style={styles.timeIcon}
            source={require('../../../assets/images/timer.png')}
          />
          <Text style={styles.timeText}>{formatTime(timeTaken)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={showResults} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>அடுத்தது</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E0F7FA',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  progressText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  timeIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizSummary;
