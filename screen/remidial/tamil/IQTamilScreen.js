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
  StyleSheet,
} from 'react-native';
import { COLORS, SIZES } from '../../../constants/Theme';
import data from '../../../data/IQTamil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IQEnglishScreen({ route, navigation }) {
  const { selectedAge } = route.params;
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [iqscore, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const saveQuizCompletion = async () => {
    try {
      await AsyncStorage.setItem('quizCompleted', 'true');
    } catch (error) {
      console.error('Error saving quiz completion state:', error);
    }
  };

  const retrieveQuizCompletion = async () => {
    try {
      const quizCompleted = await AsyncStorage.getItem('quizCompleted');
      return quizCompleted === 'true';
    } catch (error) {
      console.error('Error retrieving quiz completion state:', error);
      return false;
    }
  };

  useEffect(() => {
    const checkQuizCompletion = async () => {
      const isQuizCompleted = await retrieveQuizCompletion();
      if (isQuizCompleted) {
        // Show appropriate UI or navigate to the next screen
      }
    };
    checkQuizCompletion();
  }, []);

  const handleFinishQuiz = async () => {
    await saveQuizCompletion();
    navigation.navigate('startTam', { selectedAge, iqscore });
  };

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption === correct_option) {
      // Set Score
      setScore(iqscore + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex === allQuestions.length - 1) {
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

  const endIQTest = () => {};

  const renderQuestion = () => {
    const currentQuestion = allQuestions[currentQuestionIndex];
    return (
      <View
        style={
          {
            //marginVertical: 40,
          }
        }
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
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
        <Text
          style={{
            color: COLORS.black,
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {currentQuestion.question}
        </Text>

        {/* Image for Question */}
        {currentQuestion.image && (
          <Image
            source={currentQuestion.image}
            style={{
              width: '83%',
              height: '65%',
              resizeMode: 'cover',
              marginVertical: 20,
              alignSelf: 'center',
            }}
          />
        )}
      </View>
    );
  };
  const OptionButton = ({ option }) => {
    const isImageOption = typeof option === 'object' && option.image;
    const isSelected =
      option.text === currentOptionSelected || option === currentOptionSelected;
    const isCorrect = option.text === correctOption || option === correctOption;
    const isWrong = isSelected && !isCorrect;

    return (
      <TouchableOpacity
        onPress={() => validateAnswer(option.text || option)}
        disabled={isOptionsDisabled}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: isCorrect
            ? COLORS.success
            : isSelected
            ? COLORS.error
            : COLORS.secondary,
          backgroundColor: isCorrect
            ? COLORS.success + '20'
            : isSelected
            ? COLORS.error + '20'
            : COLORS.secondary,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 5,
          paddingVertical: 10,
          marginTop: 15,
        }}
      >
        {/* Option Image */}
        {isImageOption && (
          <Image
            source={option.image}
            style={{ width: 70, height: 70, marginLeft: 10 }}
          />
        )}
        {/* Option Text */}
        {!isImageOption && (
          <Text style={{ fontSize: 20, color: COLORS.black }}>
            {option.text || option}
          </Text>
        )}
        {/* Show Cross Icon for wrong answer */}
        {isWrong && (
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
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
        )}
        {/* Show Check Icon for correct answer */}
        {isCorrect && isSelected && (
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
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
        )}
      </TouchableOpacity>
    );
  };

  const renderOptions = () => {
    const options = allQuestions[currentQuestionIndex]?.options;

    if (!options || options.length === 0) {
      return null;
    }

    return (
      <View>
        {/* First Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {options.slice(0, 2).map((option, index) => (
            <OptionButton key={index} option={option} />
          ))}
        </View>
        {/* Second Row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          {options.slice(2).map((option, index) => (
            <OptionButton key={index + 2} option={option} />
          ))}
        </View>
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
            அடுத்தது
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

  return (
    <View
      style={{
        position: 'relative',
        width: 'auto',
        height: '100%',
        backgroundColor: '#4D86F7',
      }}
    >
      {/* Background Image */}
      <Image
        style={{
          alignSelf: 'center',
          top: '0%',
          width: '100%',
          height: '100%',
          borderWidth: 1,
        }}
        source={require('../../../assets/bg.jpg')}
      />
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
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.primary,
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
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                  {iqscore > allQuestions.length / 2
                    ? 'வாழ்த்துகள்!'
                    : 'நல்ல வேலை! விட்டுவிடாதே'}
                </Text>

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
                        iqscore > allQuestions.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    {iqscore}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLORS.black,
                    }}
                  >
                    / {allQuestions.length}
                  </Text>
                </View>
                {/* Retry Quiz button */}
                <TouchableOpacity
                  onPress={handleFinishQuiz}
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
                    முடிக்க
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
