import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Audio } from 'expo-av'; 
import { useFocusEffect } from '@react-navigation/native';

const EnglishScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, playYellowWordAudio }) => {
  const [clickedWord, setClickedWord] = useState(null);

  const handleWordClick = (word) => {
    if (!timerExpired) {
      setClickedWord(word);
      onClickWord(word);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicE}>Listen and Choose!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <View style={styles.descriptionContainer}>
        <TouchableOpacity onPress={playYellowWordAudio}>
          <Image style={styles.speakerImage} source={require('../../assets/ListenSpeak.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>
      <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
      <View style={styles.board}>
        
        <View style={styles.whiteWordsContainer}>
          {wordPair.words.map((word, index) => (
            <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
              <Text style={[
                styles.whiteWord,
                clickedWord === word && styles.clickedWord,
                (timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord),
                (timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord)
              ]}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Next button positioned absolutely */}
      <TouchableOpacity style={styles.nextButton} onPress={() => onClickNext()}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const TamilScreen = ({ timer, wordPair, onClickWord, timerExpired, onClickNext, playYellowWordAudio }) => {
  const [clickedWord, setClickedWord] = useState(null);

  const handleWordClick = (word) => {
    if (!timerExpired) {
      setClickedWord(word);
      onClickWord(word);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicT}>கேட்டுவிட்டு தேர்வு செய்!</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <View style={styles.descriptionContainer}>
        <Image style={styles.speakerIcon} source={require('../../assets/speaker.png')} />
        <Text style={styles.contentT}>
          ஹாய், வேர்ட் எக்ஸ்ப்ளோரர்! 🌟 புதிய சவாலுக்கு தயாராகுங்கள்! ஒரு வார்த்தை சத்தமாக பேசப்படுவதை கவனமாகக் கேளுங்கள். பிறகு, கீழே உள்ள பட்டியலிலிருந்து அதே வார்த்தையைத் தேர்ந்தெடுக்கவும். மீண்டும் கேட்க வேண்டுமா? மற்றொரு கேட்க, எழுத்துப் பலகையிலிருந்து உங்கள் பேச்சாளர் நண்பரைத் தட்டவும். உங்கள் அற்புதமான கேட்கும் திறனை வெளிப்படுத்துவோம்!
        </Text>
      </View>
      <View style={styles.timerContainer}>
        <Image style={styles.timerIcon} source={require('../../assets/timer.webp')} />
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>
      <Image style={styles.boardImage} source={require('../../assets/GreenBoard2.png')} />
      <View style={styles.board}>
        <TouchableOpacity onPress={playYellowWordAudio}>
          <Image style={styles.speakerImage} source={require('../../assets/ListenSpeak.png')} />
        </TouchableOpacity>
        <View style={styles.whiteWordsContainer}>
          {wordPair.words.map((word, index) => (
            <TouchableOpacity key={index} onPress={() => handleWordClick(word)}>
              <Text style={[
                styles.whiteWord,
                clickedWord === word && styles.clickedWord,
                (timerExpired && clickedWord === word && word !== wordPair.yellow && styles.wrongWord),
                (timerExpired && word === wordPair.yellow && clickedWord === word && styles.correctWord)
              ]}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Next button positioned absolutely */}
      <TouchableOpacity style={styles.nextButton} onPress={() => onClickNext()}>
        <Text style={styles.nextButtonText}>அடுத்தது</Text>
      </TouchableOpacity>
    </View>
  );
};


const DA_ListenAndChooseScreen = ({ navigation, route }) => {
    const { language } = route.params;
    const [timer, setTimer] = useState('00:30');
    const [wordPair, setWordPair] = useState({ yellow: '', words: [] });
    const [soundObject, setSoundObject] = useState(null);
    const [timerExpired, setTimerExpired] = useState(false);
  
    const audioMap = {
      'TOOK': require('../../assets/VoiceRecordings/Took.mp3'),
      'WAY': require('../../assets/VoiceRecordings/Way.mp3'),
      'PAN': require('../../assets/VoiceRecordings/Pan.mp3'),
      'WEST': require('../../assets/VoiceRecordings/West.mp3'),
      'FALL': require('../../assets/VoiceRecordings/Fall.mp3'),
      'SLEEP': require('../../assets/VoiceRecordings/Sleep.mp3'),
      'காடு': require('../../assets/VoiceRecordings/Kaadu.m4a'),
      'புல்': require('../../assets/VoiceRecordings/Pul.m4a'),
      'குயில்': require('../../assets/VoiceRecordings/Kuyil.m4a'),
      'தட்டு': require('../../assets/VoiceRecordings/Tattu.m4a'),
      'கடை': require('../../assets/VoiceRecordings/Kadai.m4a'),
    };
  
    useEffect(() => {
      const englishWordPairs = [
        { yellow: 'TOOK', audio: require('../../assets/VoiceRecordings/Took.mp3'), words: ['LOOK', 'TOOK'] },
        { yellow: 'WAY', audio: require('../../assets/VoiceRecordings/Way.mp3'), words: ['WAY', 'MAY'] },
        { yellow: 'PAN', audio: require('../../assets/VoiceRecordings/Pan.mp3'), words: ['PAN', 'NAP'] },
        { yellow: 'WEST', audio: require('../../assets/VoiceRecordings/West.mp3'), words: ['WEST', 'NEST'] },
        { yellow: 'FALL', audio: require('../../assets/VoiceRecordings/Fall.mp3'), words: ['FALL', 'TALL'] },
        { yellow: 'SLEEP', audio: require('../../assets/VoiceRecordings/Sleep.mp3'), words: ['SLEEP', 'SHEEP'] },
      ];
    
      const tamilWordPairs = [
        { yellow: 'காடு', audio: require('../../assets/VoiceRecordings/Kaadu.m4a'), words: ['காடு', 'நாடு'] },
        { yellow: 'புல்', audio: require('../../assets/VoiceRecordings/Pul.m4a'), words: ['புல்', 'பல்'] },
        { yellow: 'குயில்', audio: require('../../assets/VoiceRecordings/Kuyil.m4a'), words: ['குயில்', 'மயில்'] },
        { yellow: 'தட்டு', audio: require('../../assets/VoiceRecordings/Tattu.m4a'), words: ['தட்டு', 'எட்டு'] },
        { yellow: 'கடை', audio: require('../../assets/VoiceRecordings/Kadai.m4a'), words: ['கடை', 'நடை'] },
      ];
    
      const wordPairs = language === 'ENGLISH' ? englishWordPairs : tamilWordPairs;
      console.log('Selected Language:', language);
      console.log('Word Pairs:', wordPairs);
    
      const randomIndex = Math.floor(Math.random() * wordPairs.length);
      const selectedWordPair = wordPairs[randomIndex];
      console.log('Selected Word Pair:', selectedWordPair);
      setWordPair(selectedWordPair);
    
      const playYellowWordAudio = async () => {
        const yellowWordAudio = selectedWordPair.audio;
        const yellowWordSoundObj = new Audio.Sound();
        try {
          await yellowWordSoundObj.loadAsync(yellowWordAudio);
          await yellowWordSoundObj.playAsync();
        } catch (error) {
          console.error('Error loading yellow word audio:', error);
        }
      };
  
      return () => {
        if (soundObject) {
          soundObject.unloadAsync();
        }
      };
    }, [language]);
    
    useEffect(() => {
      // Cleanup function to stop audio when unmounting
      return () => {
        if (soundObject) {
          soundObject.unloadAsync();
        }
      };
    }, []);
  
    const startTimer = () => {
      let seconds = 30;
      const intervalId = setInterval(() => {
        seconds -= 1;
        if (seconds === 0) {
          clearInterval(intervalId);
          setTimer('00:00');
          setTimerExpired(true); // Timer expired
        } else {
          const formattedTime = `${Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
          setTimer(formattedTime);
        }
      }, 1000);
    };
  
    const handleClickWord = (word) => {
      console.log('Clicked word:', word);
    };
  
    const onClickNext = () => {
      // Clear any existing timeout
      clearTimeout(timer);
    
      // Stop the activity
      setTimerExpired(true); // Timer expired
    
      // Stop the audio playback
      if (soundObject) {
        soundObject.stopAsync();
      }
    
      // Navigate to GoodJobScreen
      const timer = setTimeout(() => {
        // Navigate to GoodJobScreen
        navigation.navigate('DA_GoodJobScreenListen', { language });
      }, 2000);
    };
    
  
    return language === 'ENGLISH' ? <EnglishScreen timer={timer} wordPair={wordPair} onClickWord={handleClickWord} timerExpired={timerExpired} onClickNext={onClickNext}/> : <TamilScreen timer={timer} wordPair={wordPair} onClickWord={handleClickWord} timerExpired={timerExpired} onClickNext={onClickNext} />;
  };
  

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#4D86F7',
    alignItems: 'center',
  },
  bgImg: {
    position: 'absolute',
    top: '14%',
    width: '100%',
    height: '100%',
    zIndex: -1,
    resizeMode: 'cover',
    borderWidth: 1,
    borderRadius: 85,
  },
  textTopicE: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
    color: '#FFD166',
    marginTop: '15%',
    marginBottom: '2%',
    paddingLeft: '2%',
  },
  textTopicT: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFD166',
    marginTop: '14%',
    marginBottom: '2%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '14%',
    height: '100%',
    borderRadius: 85,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  speakerIcon: {
    width: 20,
    height: 20,
    marginRight: '1%',
    marginLeft: '3%',
    marginTop: '3%',
  },
  contentE: {
    textAlign: 'justify',
    fontSize: 15,
    color: '#16397F',
    marginHorizontal: '3%',
    marginTop: '6%',
    marginBottom: '5%',
  },
  contentT: {
    textAlign: 'justify',
    fontSize: 12,
    color: '#16397F',
    marginHorizontal: '6%',
    marginTop: '6%',
    marginBottom: '0%',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    borderRadius: 10,
    marginTop: '2%',
    marginLeft: '60%',
  },
  timerIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  timerTextContainer: {
    marginLeft: 5,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  boardImage: {
    width: '100%', 
    height: '60%', 
  },
  board: {
    position: 'absolute',
    top: '55%',
    alignItems: 'center',
  },
  yellowWord: {
    color: 'yellow',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  whiteWordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whiteWord: {
    color: 'white',
    fontSize: 35,
    paddingLeft: '8%', 
    paddingRight: '8%',
  },
  clickedWord: {
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 90,
    padding: 5,
  },
  correctWord: {
    borderWidth: 4,
    borderColor: '#6ECB63',
    borderRadius: 90,
    padding: 5,
  },
  wrongWord: {
    borderWidth: 4,
    borderColor: 'red',
    borderRadius: 90,
    padding: 5,
  },
  nextButton: {
    backgroundColor: '#FFD166',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: '-30%',
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  speakerImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default DA_ListenAndChooseScreen;
