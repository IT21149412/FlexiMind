import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import tamil1 from '../../../data/tamil1';
import tamil2 from '../../../data/tamil2';

const WordSoundHomeTam = ({ navigation }) => {
  const handle1 = () => {
    navigation.navigate('tamWordSounds', { data: tamil1 });
  };
  const handle2 = () => {
    navigation.navigate('tamWordSounds', { data: tamil2 });
  };
  const handle3 = () => {
    navigation.navigate('tamWordSounds', { data: tamil1 });
  };
  const handle4 = () => {
    navigation.navigate('tamWordSounds', { data: tamil2 });
  };
  const handle5 = () => {
    navigation.navigate('tamWordSounds', { data: tamil1 });
  };
  const handle6 = () => {
    navigation.navigate('tamWordSounds', { data: tamil2 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>
        வார்த்தை ஒலிகளைக் கற்றுக்{'\n'}கொள்வோம்!
      </Text>
      <Image
        style={styles.bgImg}
        source={require('../../../assets/bg.jpg')}
      ></Image>
      <View style={styles.overlay}></View>
      <Image
        style={styles.matchImg}
        source={require('../../../assets/images/girlsound.png')}
      />
      <View style={styles.rectangle1}>
        <View style={styles.orangeCircle1}>
          <View style={styles.whiteCircle1}></View>
        </View>
        <Text style={styles.dyslexia} onPress={handle1}>
          ரைமிங் சொற்கள்
        </Text>
        <Text style={styles.unitDescription1}>அலகு 1</Text>
      </View>

      <View style={styles.rectangle2}>
        <View style={styles.orangeCircle2}>
          <View style={styles.whiteCircle2}></View>
        </View>
        <Text style={styles.learn} onPress={handle2}>
          கண்ணாடி எழுத்து
        </Text>
        <Text style={styles.unitDescription2}>அலகு 2</Text>
      </View>

      <View style={styles.rectangle3}>
        <View style={styles.orangeCircle1}>
          <View style={styles.whiteCircle1}></View>
        </View>
        <Text style={styles.dyslexia} onPress={handle3}>
          தலைகீழ் கடிதங்கள்
        </Text>
        <Text style={styles.unitDescription1}>அலகு 3</Text>
      </View>

      <View style={styles.rectangle4}>
        <View style={styles.orangeCircle4}>
          <View style={styles.whiteCircle4}></View>
        </View>
        <Text style={styles.learn} onPress={handle4}>
          ஒலிக்கேற்ப எழுத்து
        </Text>
        <Text style={styles.unitDescription2}>அலகு 4</Text>
      </View>

      <View style={styles.rectangle5}>
        <View style={styles.orangeCircle1}>
          <View style={styles.whiteCircle1}></View>
        </View>
        <Text style={styles.dyslexia} onPress={handle5}>
          ஒரே போன்ற சொற்கள்
        </Text>
        <Text style={styles.unitDescription1}>அலகு 5</Text>
      </View>

      <View style={styles.rectangle6}>
        <View style={styles.orangeCircle6}>
          <View style={styles.whiteCircle6}></View>
        </View>
        <Text style={styles.learn} onPress={handle6}>
          கலப்பு கடிதங்கள்
        </Text>
        <Text style={styles.unitDescription2}>அலகு 6</Text>
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
  dashImg: {
    alignSelf: 'center',
    top: '-73%',
    width: '40%',
    height: '25%',
  },
  textImg: {
    alignSelf: 'center',
    top: '-95%',
    width: '90%',
    height: '7%',
  },
  textTopic: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 26,
    color: '#6ECB63',
    top: '3%',
    left: 18,
  },
  matchImg: {
    position: 'absolute',
    right: 13,
    top: '8%',
    width: 150,
    height: 150,
  },
  rectangle1: {
    position: 'absolute',
    width: 320,
    height: 57,
    left: 28,
    top: '30%',
    backgroundColor: '#4D86F7',
    borderRadius: 20,
  },
  dyslexia: {
    left: 70,
    fontWeight: '900',
    fontSize: 20,
    color: '#6ECB63',
    top: 5,
  },
  unitDescription1: {
    fontSize: 16,
    color: '#6ECB63',
    marginBottom: 8,
    left: 70,
  },
  unitDescription2: {
    fontSize: 16,
    color: '#6ECB63',
    marginBottom: 8,
    left: 30,
  },
  orangeCircle1: {
    position: 'absolute',
    width: 69,
    height: 66,
    left: -5,
    bottom: '-10%',
    backgroundColor: '#6ECB63',
    borderRadius: 34,
  },
  whiteCircle1: {
    position: 'absolute',
    width: 47,
    height: 49,
    left: 11,
    bottom: '12%',
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
  },
  rectangle2: {
    position: 'absolute',
    width: 320,
    height: 57,
    left: 28,
    top: '40%',
    backgroundColor: '#4D86F7',
    borderRadius: 20,
  },
  learn: {
    left: 30,
    fontWeight: '900',
    fontSize: 21,
    color: '#6ECB63',
    top: 5,
  },
  orangeCircle2: {
    position: 'absolute',
    width: 69,
    height: 66,
    left: 260,
    bottom: '-15%',
    backgroundColor: '#6ECB63',
    borderRadius: 34,
  },
  whiteCircle2: {
    position: 'absolute',
    width: 47,
    height: 49,
    left: 11,
    bottom: '12%',
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
  },
  rectangle3: {
    position: 'absolute',
    width: 320,
    height: 57,
    left: 28,
    top: '50%',
    backgroundColor: '#4D86F7',
    borderRadius: 20,
  },
  rectangle4: {
    position: 'absolute',
    width: 320,
    height: 57,
    left: 28,
    top: '60%',
    backgroundColor: '#4D86F7',
    borderRadius: 20,
  },
  orangeCircle4: {
    position: 'absolute',
    width: 69,
    height: 66,
    left: 260,
    bottom: '-15%',
    backgroundColor: '#6ECB63',
    borderRadius: 54,
  },
  whiteCircle4: {
    position: 'absolute',
    width: 47,
    height: 49,
    left: 11,
    bottom: '12%',
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
  },
  rectangle5: {
    position: 'absolute',
    width: 330,
    height: 57,
    left: 28,
    top: '70%',
    backgroundColor: '#4D86F7',
    borderRadius: 20,
  },

  rectangle6: {
    position: 'absolute',
    width: 320,
    height: 57,
    left: 28,
    top: '80%',
    backgroundColor: '#4D86F7',
    borderRadius: 20,
  },
  orangeCircle6: {
    position: 'absolute',
    width: 69,
    height: 66,
    left: 260,
    bottom: '-15%',
    backgroundColor: '#6ECB63',
    borderRadius: 54,
  },
  whiteCircle6: {
    position: 'absolute',
    width: 47,
    height: 49,
    left: 11,
    bottom: '12%',
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '18%',
    height: '90%',
    borderRadius: 85,
  },
});

export default WordSoundHomeTam;