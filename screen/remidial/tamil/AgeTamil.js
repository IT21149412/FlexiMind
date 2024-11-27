import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AgeTamil = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState('');

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
  };

  const handleTamil = () => {
    if (selectedAge) {
      navigation.navigate('iqTam', { selectedAge });
    } else {
      alert('உங்கள் வயதைத் தேர்ந்தெடுக்கவும்!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>தொடங்குவோம்!</Text>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <Image
        style={styles.startImg}
        source={require('../../../assets/images/start.png')}
      />
      <View style={styles.textBox}>
        <Text style={styles.text}>உங்கள் வயதை உள்ளிடவும்:</Text>
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
            <Picker.Item label="வயதை உள்ளிடவும்" value="" color="#888" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
          </Picker>
        </View>
      </View>

      <Text style={styles.hintTextTamil}>
        <Image
          style={styles.icon}
          source={require('../../../assets/images/hint.png')}
        />{' '}
        உதவிக்குறிப்பு: உங்களுக்கான சிறந்ததைத் தேர்வுசெய்யவும்.
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleTamil}>
          <Text style={styles.buttonText}>IQ சோதனையைத் தொடங்கவும்</Text>
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
    width: 250,
    height: 250,
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
  hintTextTamil: {
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
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default AgeTamil;
