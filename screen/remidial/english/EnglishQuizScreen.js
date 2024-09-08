// Modify the import statements to include useNavigation
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../../constants/Theme';
import data from '../../../data/QuizEnglish';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EnglishQuizScreen({ route }) {
  const { selectedAge, iqscore } = route.params;

  const allQuestions = data;
  const navigation = useNavigation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state
  const [timeTaken, setTimeTaken] = useState(0); // Time taken to complete the quiz
  const [results, setResults] = useState([]); // Array to store the results

  useEffect(() => {
    let interval;
    if (!showScoreModal) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (showScoreModal) {
      clearInterval(interval);
      setTimeTaken(timer);
    }
    return () => clearInterval(interval);
  }, [showScoreModal]);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);

    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1);
      setResults([...results, 1]); // Add 1 for correct answer
    } else {
      setResults([...results, 0]); // Add 0 for incorrect answer
    }

    console.log('Results array: ', [
      ...results,
      selectedOption == correct_option ? 1 : 0,
    ]); // Log results array

    // Show Next Button
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const showResults = () => {
    // Navigate to QuizSummary screen
    navigation.navigate('quizSummary', {
      selectedAge,
      iqscore,
      score: score,
      totalQuestions: allQuestions.length,
      timeTaken: timeTaken,
      questionResults: results, // Pass the results array to the QuizSummary screen
    });
  };

  const renderQuestion = () => {
    return (
      <View style={{ marginVertical: 40 }}>
        {/* Question Counter */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: COLORS.black, fontSize: 18, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>
        {/* Question */}
        <Text style={{ color: COLORS.black, fontSize: 30, fontWeight: '700' }}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.options.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? COLORS.success
                  : option == currentOptionSelected
                  ? COLORS.error
                  : COLORS.secondary,
              backgroundColor:
                option == correctOption
                  ? COLORS.success + '20'
                  : option == currentOptionSelected
                  ? COLORS.error + '20'
                  : COLORS.secondary,
              height: 60,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: COLORS.black }}>{option}</Text>
            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.success,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../../../assets/images/check.png')}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.error,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../../../assets/images/cross.png')}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: '100%',
            backgroundColor: COLORS.accent,
            padding: 20,
            borderRadius: 5,
          }}
        >
          <Text
            style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: '#00000020',
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  const formatTime = (seconds) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  return (
    <View
      style={{
        position: 'relative',
        width: 'auto',
        height: '100%',
        backgroundColor: '#4D86F7',
      }}
    >
      <Image
        style={{
          alignSelf: 'center',
          top: '0%',
          width: '100%',
          height: '100%',
          borderWidth: 1,
        }}
        source={require('../../../assets/bg.jpg')}
      ></Image>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          top: '0%',
          height: '100%',
        }}
      ></View>
      <SafeAreaView
        style={{
          flex: 1,
          position: 'absolute',
          left: '5%',
          right: '5%',
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View
          style={{
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 16,
            position: 'relative',
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#251661',
              marginBottom: 20,
            }}
          >
            Choose the correct word
          </Text>
          {/* Timer */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Image
              source={require('../../../assets/images/timer.png')}
              style={{ width: 28, height: 28 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
                marginLeft: 5,
              }}
            >
              {formatTime(timer)}
            </Text>
          </View>
          {/* ProgressBar */}
          {renderProgressBar()}
          {/* Question */}
          {renderQuestion()}
          {/* Options */}
          {renderOptions()}
          {/* Next Button */}
          {renderNextButton()}
          {/* Score Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showScoreModal}
          >
            {/* <ImageBackground
    source={require('../../../assets/images/DottedBG.png')} // Replace with your background image path
    style={{ flex: 1, top: '50%', position: 'absolute', justifyContent: 'center', alignItems: 'center'
    }}
  ></ImageBackground> */}
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.background,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: '90%',
                  borderRadius: 20,
                  padding: 20,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: COLORS.accent,
                  }}
                >
                  {score > allQuestions.length / 2
                    ? 'Good Job!'
                    : 'Dont give up!'}
                </Text>
                {/* GIF Animation */}
                {score <= allQuestions.length / 2 ? (
                  <Image
                    source={require('../../../assets/better_luck_gif.gif')}
                    style={{ width: 100, height: 100, marginTop: 5 }}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/correct_gif.gif')}
                    style={{ width: 100, height: 100, marginTop: 5 }}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      color:
                        score > allQuestions.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    {score}
                  </Text>
                  <Text style={{ fontSize: 20, color: COLORS.black }}>
                    / {allQuestions.length}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 5,
                  }}
                >
                  {/* <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: COLORS.accent
                    }}
                  >
                    Time Taken: {formatTime(timeTaken)}
                  </Text> */}
                </View>
                {/* Retry Quiz button */}
                <TouchableOpacity
                  onPress={showResults}
                  style={{
                    backgroundColor: COLORS.accent,
                    padding: 20,
                    width: '100%',
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.white,
                      fontSize: 20,
                    }}
                  >
                    Analyze Results
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
}
