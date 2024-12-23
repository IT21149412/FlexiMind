import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ActivityTamil = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState('எளிது');

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
  };
  const handleSentence = () => {
    navigation.navigate('unitsScreenTam');
  };

  const handleMatch = () => {
    navigation.navigate('matchTamHome');
  };

  const handleSounds = () => {
    navigation.navigate('wordSoundHomeTam');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      {/* <View style={styles.levelInputContainer}>
        <View
          style={[
            styles.levelInput,
            { borderColor: selectedAge ? '#6FA3EF' : 'black' },
          ]}
        >
          <Picker
            selectedValue={selectedAge}
            style={{ height: 50, width: 150, color: 'grey' }}
            onValueChange={(itemValue) => handleAgeSelect(itemValue)}
          >
            <Picker.Item label="Select Level" value="" />
            <Picker.Item label="எளிது" value="எளிது" />
            <Picker.Item label="நடுத்தரம்" value="நடுத்தரம்" />
            <Picker.Item label="கடினம்" value="கடினம்" />
          </Picker>
        </View>
      </View> */}

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.card, styles.shadow]}>
          <View style={styles.imageSection}>
            <Image
              style={styles.icon}
              source={require('../../../assets/images/sentence.png')}
            />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.cardText} onPress={handleSentence}>
              வாக்கியம் கட்டுமானம்
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.shadow]}>
          <View style={styles.imageSection}>
            <Image
              style={styles.icon}
              source={require('../../../assets/images/matchHome.png')}
            />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.cardText} onPress={handleMatch}>
              சொற்கள் பொருத்து
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.shadow]}>
          <View style={styles.imageSection}>
            <Image
              style={styles.icon}
              source={require('../../../assets/images/sound.png')}
            />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.cardText} onPress={handleSounds}>
              சொல் ஒலிகள்
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D86F7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bgImg: {
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  levelInputContainer: {
    marginTop: '10%',
    marginBottom: '5%',
  },
  levelInput: {
    borderWidth: 2,
    //borderColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor: '#4D86F7',
    width: '50%',
    //left: 100,
  },
  scrollViewContainer: {
    // alignItems: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 260,
    marginVertical: 20,
    flexDirection: 'column',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  imageSection: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#6FA3EF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  textSection: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFD166',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    width: 170,
    height: 130,
  },
  cardText: {
    fontWeight: '600',
    fontSize: 22,
    color: '#333333',
  },
});

export default ActivityTamil;
