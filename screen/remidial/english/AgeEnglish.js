import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AgeEnglish = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState('');

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
  };

  const handleEnglish = () => {
    if (selectedAge) {
      navigation.navigate('iqEng', {selectedAge});
    } else {
      alert('Please select your age!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Get Started!</Text>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <Image
        style={styles.startImg}
        source={require('../../../assets/images/start.png')}
      />
      <View style={styles.textBox}>
        <Text style={styles.text}>Select your age:</Text>
        <View
          style={[
            styles.ageInput,
            { borderColor: selectedAge ? 'green' : 'gray' },
          ]}
        >
          <Picker
            selectedValue={selectedAge}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue) => handleAgeSelect(itemValue)}
          >
            <Picker.Item label="Select Age" value="" color="#888" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
          </Picker>
        </View>
      </View>
      <Text style={styles.hintText}>
        <Image
          style={styles.icon}
          source={require('../../../assets/images/hint.png')}
        />{' '}
        Hint: Make sure you choose your most{'\n'}comfortable familiar language.
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleEnglish}>
          <Text style={styles.buttonText}>Start IQ Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#4D86F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  startImg: {
    top: '-5%',
    width: 300,
    height: 300,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD166',
    marginTop: 20,
  },
  textBox: {
    width: '80%',
    marginTop: 40,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#251661',
    fontWeight: '700',
    marginBottom: 20,
  },
  ageInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
  },
  hintText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#251661',
    fontSize: 18,
    fontWeight: '500',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  buttons: {
    marginTop: 40,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default AgeEnglish;
