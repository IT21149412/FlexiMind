import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import * as Speech from 'expo-speech';

const EngWordSounds = ({ route }) => {
  const { words } = route.params;
  // Function to trigger text-to-speech
  const handleSpeak = (word) => {
    Speech.speak(word); // This will make the device speak the word
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Read Aloud The Words</Text>
      <Text style={styles.level}>Easy Level</Text>

      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <Image
        style={styles.characterImage}
        source={require('../../../assets/images/girlsound.png')}
      />
      <ScrollView style={styles.wordsContainer}>
        {words.map((word, index) => (
          <TouchableOpacity
            key={index}
            style={styles.wordButton}
            onPress={() => handleSpeak(word)}
          >
            <Text style={styles.wordText}>{word}</Text>
            <Image
              style={styles.soundIcon}
              source={require('../../../assets/images/speaker.png')} // Replace with your sound icon image path
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  title: {
    textAlign: 'center',
    top: '4%',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  level: {
    fontSize: 18,
    top: '5%',
    color: '#FF6347',
    marginTop: 5,
    textAlign: 'center',
  },
  characterImage: {
    position: 'absolute',
    alignSelf: 'center',
    top: '15%',
    width: 150,
    height: 150,
  },
  wordsContainer: {
    position: 'absolute',
    marginTop: 50,
    width: '80%',
    top: '30%',
    left: '10%', // Center the ScrollView
    height: '70%', // Set the height of the ScrollView
  },
  wordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFD700',
    padding: 20,
    marginVertical: 20,
    borderRadius: 15,
  },
  wordText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  soundIcon: {
    width: 30,
    height: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '18%',
    height: '90%',
    borderRadius: 85,
  },
});

export default EngWordSounds;
