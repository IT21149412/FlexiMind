import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const DashboardHome = ({ navigation }) => {
  const handleTest = () => {
    navigation.navigate('ageEng');
  };

  const handleActivities = () => {
    navigation.navigate('activityEng');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Let's Choose What{'\n'}To Do!</Text>
      <Image
        style={styles.bgImg}
        source={require('../../assets/bg.jpg')}
      ></Image>
      <View style={styles.overlay}></View>

      <View style={styles.rectangle1}>
        <Image
          style={styles.icon}
          source={require('../../assets/images/testHome.png')}
        ></Image>
        <Text style={styles.text} onPress={handleTest}>
          Take{'\n'}Screening{'\n'}Test
        </Text>
      </View>

      <View style={styles.rectangle3}>
        <Image
          style={styles.icon}
          source={require('../../assets/images/activity.png')}
        ></Image>
        <Text style={styles.text} onPress={handleActivities}>
          Word and{'\n'}Sentence{'\n'}Building Fun
        </Text>
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
    top: '14%',
    width: '100%',
    height: '90%',
    borderWidth: 1,
    borderRadius: 85,
  },
  subtitle: {
    fontSize: 37,
    color: '#FFD166',
    textAlign: 'center',
    top: '8%',
    fontWeight: '700',
  },
  rectangle1: {
    position: 'absolute',
    width: 300,
    height: 150,
    backgroundColor: '#6FA3EF',
    borderRadius: 20,
    left: 46,
    top: '35%',
    marginVertical: 20,
    padding: 10,
    elevation: 10,
  },
  text: {
    left: 125,
    fontWeight: '600',
    fontSize: 28,
    color: '#251661',
    top: 7,
  },
  icon: {
    top: 3,
    position: 'absolute',
    width: 120,
    height: 120,
    left: 3,
  },
  rectangle3: {
    position: 'absolute',
    width: 300,
    height: 150,
    backgroundColor: '#6FA3EF',
    borderRadius: 20,
    left: 46,
    top: '65%',
    marginVertical: 20,
    padding: 10,
    elevation: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    top: '25%',
    height: '90%',
    borderRadius: 80,
  },
});

export default DashboardHome;
