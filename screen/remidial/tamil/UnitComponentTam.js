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
  Vibration,
  ImageBackground,
} from 'react-native';
import { COLORS } from '../../../constants/Theme';
import { Audio } from 'expo-av'; // Import the Audio module from expo-av
import ConfettiCannon from 'react-native-confetti-cannon';

const UnitComponentTam = ({ route, navigation }) => {
  const { data } = route.params;

  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state
  const [timeTaken, setTimeTaken] = useState(0); // Time taken to complete the quiz
  const [filledSentence, setFilledSentence] = useState(
    allQuestions[currentQuestionIndex]?.question
  ); // State for filled sentence

  const [sound, setSound] = useState();
  const [shootConfetti, setShootConfetti] = useState(false);

  // Function to load and play sound
  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    await sound.playAsync();
  };

  // Cleanup the sound when component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    let interval;
    if (!showScoreModal) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (showScoreModal) {
      clearInterval(interval);
      setTimeTaken(timer);
      // Trigger confetti when score modal is shown

      setShootConfetti(true);
    }
    return () => clearInterval(interval);
  }, [showScoreModal]);

  const validateAnswer = async (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);

    // Replace __ with the selected option and apply different colors
    const updatedSentence = allQuestions[
      currentQuestionIndex
    ]?.question.replace('____', selectedOption);

    // Split the sentence into parts around the selected option
    const parts = updatedSentence.split(selectedOption);

    // Create JSX to set color only for the selected option
    const formattedSentence = (
      <Text>
        {parts.map((part, index) => {
          return (
            <React.Fragment key={index}>
              {index > 0 ? (
                <Text style={{ color: '#24a7ed' }}>{selectedOption}</Text>
              ) : null}
              {part}
            </React.Fragment>
          );
        })}
      </Text>
    );

    setFilledSentence(formattedSentence);

    if (selectedOption == correct_option) {
      // Play success sound
      await playSound(require('../../../assets/sounds/success.mp3'));
      // Set Score
      setScore(score + 1);
    } else {
      // Play error sound and trigger vibration
      await playSound(require('../../../assets/sounds/error.mp3'));
      Vibration.vibrate(500);
    }

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
      setFilledSentence(allQuestions[currentQuestionIndex + 1]?.question); // Update the sentence for the next question
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    setFilledSentence(allQuestions[0]?.question); // Reset the sentence
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View style={{ marginVertical: 40 }}>
        {/* Image */}
        <Image
          source={allQuestions[currentQuestionIndex]?.image}
          style={{
            width: '100%',
            height: 200,
            borderRadius: 10,
            marginBottom: 40,
          }}
          resizeMode="contain"
        />
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
        <Text style={{ color: '#4f4e4d', fontSize: 26, fontWeight: '600' }}>
          {filledSentence}
        </Text>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {allQuestions[currentQuestionIndex]?.options.map((option, index) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={index}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? '#6ECB63'
                  : option == currentOptionSelected
                  ? COLORS.error
                  : '#f0f0f0',
              backgroundColor:
                option == correctOption
                  ? COLORS.success + '20'
                  : option == currentOptionSelected
                  ? COLORS.error + '20'
                  : COLORS.secondary,
              width: '38%', // Adjust width to fit side by side
              height: 60,
              borderRadius: 25,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 1,
              marginVertical: 20,
              marginHorizontal: 18,
              backgroundColor: 'white',
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                color: '#4f4e4d',
                fontWeight: '600',
                marginRight: 10,
              }}
            >
              {option}
            </Text>
            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: '#6ECB63',
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
            backgroundColor: '#6ECB63',
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: COLORS.white,
              textAlign: 'center',
              fontWeight: '600',
            }}
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
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('unitsScreenTam')} // Navigate to the home screen
          style={{
            position: 'absolute',
            left: -22,
            zIndex: 1,
          }}
        >
          <Image
            source={require('../../../assets/images/cross1.png')}
            style={{ width: 35, height: 35 }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: '80%',
            height: 18,
            borderRadius: 20,
            backgroundColor: '#00000020',
            marginLeft: 20,
          }}
        >
          <Animated.View
            style={[
              {
                height: 18,
                borderRadius: 20,
                backgroundColor: '#6ECB63',
                // To prevent overlapping with the close icon
              },
              {
                width: progressAnim,
              },
            ]}
          ></Animated.View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        position: 'relative',
        width: 'auto',
        height: '100%',
        backgroundColor: 'white',
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
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
            paddingVertical: 30,
            paddingHorizontal: 16,
            position: 'relative',
          }}
        >
          {/* ProgressBar */}
          {renderProgressBar()}
          {/* Title */}
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#4f4e4d',
              marginBottom: 20,
              left: -20,
              marginTop: 12,
            }}
          >
            காலியிடத்தை நிரப்பவும்.
          </Text>

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
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: COLORS.accent,
                  }}
                >
                  {score > allQuestions.length / 2
                    ? 'வாழ்த்துகள்!'
                    : 'நல்ல வேலை! விட்டுவிடாதே'}
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
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLORS.black,
                    }}
                  >
                    / {allQuestions.length}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={restartQuiz}
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
                    தொடர்ந்து
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Confetti Cannon */}
              {shootConfetti && (
                <ConfettiCannon
                  count={400}
                  origin={{ x: 0, y: 0 }}
                  fallSpeed={5000}
                  fadeOut={true}
                  explosionSpeed={350}
                  autoStart={true}
                />
              )}
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UnitComponentTam;
