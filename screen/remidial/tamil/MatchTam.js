import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import { COLORS, SIZES } from '../../../constants/Theme';

const words = [
  { left: 'மரம்', right: 'பாடு' },
  { left: 'கரம்', right: 'நாடு' },
  { left: 'பாடு', right: 'மணி' },
  { left: 'நாடு', right: 'கரம்' },
  { left: 'மணி', right: 'மரம்' },
];

const CustomAlert = ({ visible, message, type, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: type === 'success' ? 'white' : 'white',
            padding: 20,
            borderRadius: 10,
            height: '18%',
            width: '80%',
            borderColor: '#FFC5C5',
            borderWidth: 4,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: type === 'success' ? '#2E865F' : '#FF0000',
            }}
          >
            {message}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text
              style={{
                fontSize: 18,
                color: '#007AFF',
                // justifyContent: 'right',
              }}
            >
              OK!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const WordMatchingActivity = ({ navigation }) => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [disabledWords, setDisabledWords] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isFinishButtonEnabled, setIsFinishButtonEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleContinue = () => {
    navigation.navigate('matchTamHome');
  };

  const handleWordPress = (word) => {
    setSelectedWord(word);
  };

  const handleMatchPress = (word) => {
    if (selectedWord && word === selectedWord) {
      setDisabledWords((prevDisabledWords) => ({
        ...prevDisabledWords,
        [selectedWord]: true,
      }));
      setSelectedWord(null);
    } else {
      setAlertMessage('வார்த்தைகள் பொருந்தவில்லை. மீண்டும் முயற்சி செய்.');
      setAlertType('error');
      setAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const handleFinish = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    const allWordsMatched = Object.keys(disabledWords).length === words.length;
    if (allWordsMatched) {
      setIsFinishButtonEnabled(true);
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
          // alignItems: 'center',
          position: 'absolute',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('matchTamHome')} // Navigate to the home screen
          style={{
            position: 'absolute',
            left: 5,
            zIndex: 1,
            top: 15,
          }}
        >
          <Image
            source={require('../../../assets/images/cross3.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>பொருந்தும் சொற்களைத் தட்டவும்</Text>

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
                // borderWidth: 4,
                // borderColor: disabledWords[word.left] ? '#ccc' : '#FFD166',
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
                borderWidth: 0,
                // borderWidth: 4,
                // borderColor: disabledWords[word.left] ? '#ccc' : '#6ECB63',
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
          top: '80%',
          width: '85%',
          backgroundColor: isFinishButtonEnabled ? COLORS.success : '#d8ded7',
          padding: 13,
          borderRadius: 20,
          //opacity: isFinishButtonEnabled ? 1 : 0.5,
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
          முடிக்கவும்
        </Text>
      </TouchableOpacity>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        type={alertType}
        onClose={handleCloseAlert}
      />

      {/* </View> */}
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
                style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 50 }}
              >
                ஆஹா நீங்கள் ஒரு ப்ரோ!
              </Text>

              {/* Next lesson button */}
              <TouchableOpacity
                onPress={handleContinue}
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
                  தொடர்ந்து கற்றுக்கொள்
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
    top: '1%',
    flex: 1,
    position: 'absolute',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: 'white',
    marginLeft: -9,
  },
  layout: {
    top: '18%',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    top: '15%',
    height: '100%',
    borderRadius: 85,
  },
});

export default WordMatchingActivity;
