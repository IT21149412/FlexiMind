import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const StartEngQuiz = ({ navigation }) => {
  const handleEnglish = () => {
    navigation.navigate('EnglishQuiz');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Congratulations!!{'\n'}you're one step closer to finish the test!
      </Text>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <Image
        style={styles.startImg}
        source={require('../../../assets/images/finish.png')}
      />
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Ready to Spark Your Brain Cells? Let's Dive into the World of
          Quizzical Wonders!
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleEnglish}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
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
    top: '9%',
    width: '100%',
    height: '90%',
    borderWidth: 1,
    borderRadius: 90,
  },
  startImg: {
    position: 'absolute',
    alignSelf: 'center',
    top: '17%',
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    top: '5%',
    fontWeight: '600',
    color: '#FFD166',
  },
  textBox: {
    position: 'absolute',
    top: '50%',
    left: 15,
    right: 15,
  },
  text: {
    fontSize: 25,
    color: '#251661',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 40,
  },
  buttons: {
    position: 'absolute',
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
    top: '70%',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    top: '23%',
    height: '90%',
    borderRadius: 85,
  },
});

export default StartEngQuiz;
