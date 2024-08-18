import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const StartEngQuiz = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState('');

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
  };

  const handleEnglish = () => {
    navigation.navigate('TamilQuiz');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        வாழ்த்துக்கள்!!{'\n'}சோதனையை முடிக்க இன்னும் ஒரு படி நெருங்கிவிட்டீர்கள்
      </Text>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <Image
        style={styles.startImg}
        source={require('../../../assets/images/finish.png')}
      />
      <View style={styles.textBox}>
        <Text style={styles.text}>
          உங்கள் மூளை செல்களைத் தூண்ட தயாரா? வினாடி வினாடி அதிசயங்களின் உலகில்
          மூழ்குவோம்!
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleEnglish}>
          <Text style={styles.buttonText}>வினாடி வினாவைத் தொடங்கவும்</Text>
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
    top: '10%',
    width: '100%',
    height: '90%',
    borderWidth: 1,
    borderRadius: 90,
  },
  startImg: {
    position: 'absolute',
    alignSelf: 'center',
    top: '19%',
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 25,
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
    fontSize: 20,
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
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    top: '26%',
    height: '90%',
    borderRadius: 85,
  },
});

export default StartEngQuiz;
