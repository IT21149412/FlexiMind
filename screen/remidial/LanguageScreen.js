import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const QuizSelectionScreen = ({ navigation }) => {
  const handleEnglish = () => {
    navigation.navigate('HomeRemidial', { language: 'en' });
  };

  const handleTamil = () => {
    navigation.navigate('HomeRemidial', { language: 'ta' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>Ready to Shine? {'\n'} Let's Start!</Text>

      <Image
        style={styles.bgImg}
        source={require('../../assets/bg.jpg')}
      ></Image>
      <View style={styles.overlay}></View>
      <Image
        style={styles.dashImg}
        source={require('../../assets/images/hi.png')}
      ></Image>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Hey there, future word wizard!{'\n'}Ready for some fun tests and cool
          games to boost your reading and writing skills? {'\n'}
          {'\n'}
          {'\n'}
          ஏய், எதிர்கால வார்த்தை வழிகாட்டி!{'\n'}உங்கள் வாசிப்பு மற்றும் எழுதும்
          திறனை அதிகரிக்க சில வேடிக்கையான சோதனைகள் மற்றும் குளிர்
          விளையாட்டுகளுக்கு தயாரா?
        </Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonEng}>
            <Text style={styles.button1Text} onPress={handleEnglish}>
              English
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonEng}>
            <Text style={styles.button1Text} onPress={handleTamil}>
              தமிழ்
            </Text>
          </View>
        </View>
      </View>
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
    top: '11%',
    width: '100%',
    height: '90%',
    borderWidth: 1,
    borderRadius: 90,
  },
  textTopic: {
    textAlign: 'right',
    fontWeight: '900',
    fontSize: 35,
    right: '4%',
    color: '#FFD166',
    top: '4%',
  },
  dashImg: {
    position: 'absolute',
    left: '8%',
    top: '12%',
    width: '50%',
    height: '20%',
  },
  title: {
    flexDirection: 'row',
    fontSize: 30,
    fontWeight: '600',
    color: '#FFD166',
    textAlign: 'right',
    top: '3%',
  },
  textBox: {
    position: 'absolute',
    top: '37%',
    left: 10,
    right: 10,
  },
  text: {
    fontSize: 20,
    color: '#251661',
    textAlign: 'center',
    fontWeight: '500',
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row', // Add flexDirection property
    justifyContent: 'space-between', // Optional: To evenly space the buttons
    top: '85%',
    left: 15,
    right: 15,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5, // Optional: Adjust spacing between buttons
    height: 50,
  },
  buttonEng: {
    position: 'absolute',
    width: 150,
    height: 49,
    backgroundColor: 'green',
    borderRadius: 15,
  },
  button1Text: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    top: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    top: '22%',
    height: '90%',
    borderRadius: 85,
  },
});

export default QuizSelectionScreen;
