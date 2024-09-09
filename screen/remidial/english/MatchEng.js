import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Vibration,
} from 'react-native';
import { Audio } from 'expo-av'; // Import the Audio module
import { COLORS } from '../../../constants/Theme';
import ConfettiCannon from 'react-native-confetti-cannon';

const CustomAlert = ({ visible, message, type, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
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
              fontSize: 26,
              fontWeight: 'bold',
              color: type === 'success' ? '#2E865F' : '#FF0000',
            }}
          >
            {message}
          </Text>
          <Image
            source={require('../../../assets/wrong_gif.gif')}
            style={{ width: 100, height: 100, marginTop: 5 }}
          />
          <TouchableOpacity onPress={onClose}>
            <Text
              style={{
                fontSize: 26,
                color: '#f55656',
              }}
            >
              OKAY!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const WordMatchingActivity = ({ navigation, route }) => {
  const { words } = route.params;
  const [selectedWord, setSelectedWord] = useState(null);
  const [disabledWords, setDisabledWords] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isFinishButtonEnabled, setIsFinishButtonEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shootConfetti, setShootConfetti] = useState(false);
  const [sound, setSound] = useState();
  const [timer, setTimer] = useState(30); // Timer state
  const [isTimeUp, setIsTimeUp] = useState(false); // State for "time up" alert
  const [timerInterval, setTimerInterval] = useState(null); // Store interval ID

  // Load and play sound function
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

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0 && !isTimeUp) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      setTimerInterval(interval); // Store interval ID
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTimeUp(true);
      setAlertVisible(false); // Ensure no other alerts are visible
    }
  }, [timer, isTimeUp]);

  const handleContinue = () => {
    navigation.navigate('matchEngHome');
  };

  const handleWordPress = (word) => {
    setSelectedWord(word);
  };

  const handleMatchPress = async (word) => {
    if (isTimeUp) return; // Prevent interaction if time is up

    if (selectedWord && word === selectedWord) {
      // Play success sound
      await playSound(require('../../../assets/sounds/success.mp3'));

      setDisabledWords((prevDisabledWords) => ({
        ...prevDisabledWords,
        [selectedWord]: true,
      }));
      setSelectedWord(null);
    } else {
      // Play error sound and trigger vibration only if time is not up
      if (!isTimeUp) {
        await playSound(require('../../../assets/sounds/error.mp3'));
        Vibration.vibrate(500);
        setAlertMessage('The words do not match. Try again!');
        setAlertType('error');
        setAlertVisible(true);
      }
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const handleFinish = () => {
    clearInterval(timerInterval); // Clear the timer interval to stop it
    setIsModalVisible(true); // Show the finish modal
  };

  const handleRestart = () => {
    setIsTimeUp(false);
    setTimer(20);
    setDisabledWords({});
    setSelectedWord(null);
    setAlertVisible(false);
  };

  useEffect(() => {
    const allWordsMatched = Object.keys(disabledWords).length === words.length;
    if (allWordsMatched) {
      setIsFinishButtonEnabled(true);
      setShootConfetti(true);
    } else {
      setIsFinishButtonEnabled(false);
    }
  }, [disabledWords]);

  return (
    <View style={styles.container}>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('matchEngHome')}
          style={{
            position: 'absolute',
            left: 2,
            zIndex: 1,
            top: 35,
          }}
        >
          <Image
            source={require('../../../assets/images/cross3.png')}
            style={{ width: 55, height: 55 }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Tap On Matching Words</Text>

      {/* Timer Section */}
      <View style={styles.timerContainer}>
        <Image
          source={require('../../../assets/images/timer.png')} // Replace with your timer icon image
          style={styles.timerIcon}
        />
        <Text style={styles.timerText}>00:{timer}s</Text>
      </View>

      <View style={styles.layout}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {words.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: 130,
                height: 50,
                padding: 5,
                marginVertical: 20,
                backgroundColor: disabledWords[word.left] ? '#ccc' : '#6ECB63',
                borderRadius: 15,
                alignItems: 'center',
                elevation: 3,
              }}
              onPress={() => handleWordPress(word.left)}
              disabled={disabledWords[word.left]}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: disabledWords[word.left] ? '#666' : 'black',
                }}
              >
                {word.left}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {words.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: 130,
                height: 50,
                padding: 5,
                marginVertical: 20,
                backgroundColor: disabledWords[word.right] ? '#ccc' : '#6ECB63',
                borderRadius: 15,
                alignItems: 'center',
                elevation: 3,
              }}
              onPress={() => handleMatchPress(word.right)}
              disabled={disabledWords[word.right]}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: disabledWords[word.right] ? '#666' : 'black',
                }}
              >
                {word.right}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={handleFinish}
        style={{
          flex: 1,
          position: 'absolute',
          alignSelf: 'center',
          top: '88%',
          width: '85%',
          backgroundColor: isFinishButtonEnabled ? COLORS.success : '#d8ded7',
          padding: 13,
          borderRadius: 20,
        }}
        disabled={!isFinishButtonEnabled}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: isFinishButtonEnabled ? COLORS.white : 'white',
            textAlign: 'center',
          }}
        >
          FINISH
        </Text>
      </TouchableOpacity>

      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        type={alertType}
        onClose={handleCloseAlert}
      />

      {/* Time's Up Modal */}
      {isTimeUp && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.timeUpModal}>
              <Text style={styles.timeUpText}>Time's Up!</Text>
              <TouchableOpacity
                onPress={handleRestart}
                style={styles.restartButton}
              >
                <Text style={styles.restartText}>Restart Activity</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {isModalVisible ? (
        <Modal animationType="slide" transparent={true}>
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
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 50,
                  color: COLORS.accent,
                }}
              >
                Wow You Are A Pro!
              </Text>
              <Image
                source={require('../../../assets/correct_gif.gif')}
                style={{ width: 100, height: 100, marginTop: 2 }}
              />

              {/* Confetti Cannon */}
              {shootConfetti && (
                <ConfettiCannon
                  count={400}
                  origin={{ x: -50, y: -50 }}
                  fallSpeed={5000}
                  fadeOut={true}
                  explosionSpeed={350}
                  autoStart={true}
                />
              )}
              <TouchableOpacity
                onPress={handleContinue}
                style={{
                  backgroundColor: COLORS.accent,
                  padding: 20,
                  width: '100%',
                  borderRadius: 20,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                >
                  Continue learning
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 'auto',
    height: '100%',
    backgroundColor: '#4D86F7',
  },
  bgImg: {
    alignSelf: 'center',
    top: '15%',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 80,
    backgroundColor: 'white',
  },
  title: {
    top: '3%',
    flex: 1,
    position: 'absolute',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: 'white',
    marginLeft: 40,
  },
  layout: {
    top: '18%',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: '13%',
    left: '35%',
    backgroundColor: '#bbc0c7',
    borderRadius: 10,
    padding: 10,
  },
  timerIcon: {
    width: 30,
    height: 30,
  },
  timerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    top: '15%',
    height: '100%',
    borderRadius: 85,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  timeUpModal: {
    backgroundColor: COLORS.white,
    width: '80%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  timeUpText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.error,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: COLORS.accent,
    padding: 15,
    borderRadius: 10,
  },
  restartText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WordMatchingActivity;
