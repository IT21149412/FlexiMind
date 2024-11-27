import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av'; // For playing audio

const EngWordSounds = ({ route }) => {
  const { data } = route.params; // The array of words with sounds is passed here

  // Function to play the sound for each word
  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    // Ensure that the sound stops and resources are released after playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>வார்த்தைகளை உரக்கப் படியுங்கள்</Text>

      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <Image
        style={styles.characterImage}
        source={require('../../../assets/images/girlsound.png')}
      />
      <ScrollView style={styles.wordsContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.wordButton}
            onPress={() => playSound(item.sound)} // Accessing the 'sound' property from each object in the array
          >
            <Text style={styles.wordText}>{item.word}</Text>
            <Image
              style={styles.soundIcon}
              source={require('../../../assets/images/speaker.png')}
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
    top: '5%',
    width: '100%',
    height: '90%',
    borderWidth: 1,
    borderRadius: 90,
  },
  title: {
    textAlign: 'center',
    top: '4%',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  characterImage: {
    position: 'absolute',
    alignSelf: 'center',
    top: '13%',
    width: 150,
    height: 150,
  },
  wordsContainer: {
    position: 'absolute',
    marginTop: 50,
    width: '80%',
    top: '25%',
    left: '10%',
    height: '70%',
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
    top: '12%',
    height: '90%',
    borderRadius: 85,
  },
});

export default EngWordSounds;
