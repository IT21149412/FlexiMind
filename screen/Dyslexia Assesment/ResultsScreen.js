import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// SmallPieChart component
const SmallPieChart = ({ percentage, activityName }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
  });

  return (
    <View style={styles.smallPieContainer}>
      <Svg width="100" height="100" viewBox="0 0 36 36" style={styles.svg}>
        <G rotation="-90" origin="18, 18">
          <Circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#6ecbc3"
            strokeWidth="3.8"
          />
          <AnimatedCircle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#2a9d8f"
            strokeWidth="3.8"
            strokeDasharray="100"
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
      <View style={styles.innerSmallCircle}>
        <Text style={styles.smallPercentageText}>{Math.round(percentage)}%</Text>
      </View>
      <Text style={styles.activityName}>{activityName}</Text>
    </View>
  );
};

// PieChart component
const PieChart = ({ averagePercentage }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: averagePercentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [averagePercentage]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
  });

  return (
    <View style={styles.pieContainer}>
      <Svg width="200" height="200" viewBox="0 0 36 36" style={styles.svg}>
        <G rotation="-90" origin="18, 18">
          <Circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#f7f5bc"
            strokeWidth="3.8"
          />
          <AnimatedCircle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#f4a261"
            strokeWidth="3.8"
            strokeDasharray="100"
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
      <View style={styles.innerCircle}>
        <Text style={styles.percentageText}>{Math.round(averagePercentage)}%</Text>
      </View>
    </View>
  );
};

// English screen component
const EnglishScreen = ({ navigation }) => {
  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicE}>Assessment Results</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <Text style={styles.guardianMessage}>Below are the results of the assessment conducted for dyslexia diagnosis:</Text>

      <PieChart averagePercentage={57} />
      <View style={styles.resultoverlay} />
      <Text style={styles.resultBreakdown}>Result Breakdown</Text>
      <View style={styles.smallChartsContainer}>
        <SmallPieChart percentage={100} activityName="Visual Stimulation" />
        <SmallPieChart percentage={50} activityName="Auditory Stimulation" />
        <SmallPieChart percentage={0} activityName="Verbal Stimulation" />
        <SmallPieChart percentage={75} activityName="Spelling Words" />
      </View>
      <TouchableOpacity onPress={navigateHome} style={styles.backHomeButton}>
        <Image source={require('../../assets/backhome.png')} style={styles.homeIcon} />
      </TouchableOpacity>
    </View>
  );
};

// Tamil screen component
const TamilScreen = ({ navigation }) => {
  const navigateHome = () => {
    navigation.navigate('DA_SelectLanguage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicT}>அருமையான வேலை, வார்த்தை வழிகாட்டி!!</Text>
      <View style={styles.overlay} />
      <Text style={styles.guardianMessage}>கீழே இடப்பட்டுள்ளவை குறைவுகோள் கண்டறிதல் நடத்திய ஆய்வின் முடிவுகள்:</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      
      <PieChart averagePercentage={38} />
      <View style={styles.resultoverlay} />
      <Text style={styles.resultBreakdown}>முடிவு முறிவு</Text>
      <View style={styles.smallChartsContainer}>
        <SmallPieChart percentage={75} activityName="காட்சி தூண்டுதல்" />
        <SmallPieChart percentage={50} activityName="செவிவழி தூண்டுதல்" />
        <SmallPieChart percentage={25} activityName="எழுத்துப்பிழை வார்த்தைகள்" />
        <SmallPieChart percentage={0} activityName="வாய்மொழி தூண்டுதல்" />
      </View>
      <TouchableOpacity onPress={navigateHome} style={styles.backHomeButton}>
        <Image source={require('../../assets/backhome.png')} style={styles.homeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const DA_ResultsScreen = ({ navigation, route }) => {
  const { language } = route.params;

  // Example state management for clearing state
  const [dataCleared, setDataCleared] = useState(false);

  useEffect(() => {
    // Clear any relevant data when component mounts
    setDataCleared(false); // Example state variable to clear data
  }, []);

  return (
    language === 'ENGLISH' ? (
      <EnglishScreen navigation={navigation} />
    ) : (
      <TamilScreen navigation={navigation} />
    )
  );
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
    top: '15.4%',
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
    fontSize: 30,
    color: '#FFD166',
    marginTop: '15%',
    marginBottom: '5%',
  },
  textTopicT: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFD166',
    marginTop: '12%',
    marginBottom: '0%',
  },
  guardianMessage: {
    textAlign: 'center',
    fontSize: 15,
    color: '#051650',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  resultBreakdown: {
    textAlign: 'center',
    fontSize: 14,
    color: '#051650',
    paddingHorizontal: 20,
    marginTop: '6%'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '15.5%',
    height: '80%',
    borderRadius: 85,
  },

  resultoverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(173, 216, 230, 0.7)', 
    top: '52%',
    height: '39%',
    width: '95%',
    borderRadius: 25,
    marginLeft: '2.5%',
    borderWidth: 1,
    borderColor: '#FFD166',
  },

  pieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    position: 'relative',
    width: 200,
    height: 200,
  },
  smallChartsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '10%'
  },
  smallPieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 100,
    height: 100,
    margin: 10,
    marginBottom: '7%'
    
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  innerCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e76f51',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerSmallCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#264653',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  smallPercentageText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  activityName: {
    fontSize: 12,
    color: '#16397F',
    textAlign: 'center',
    marginTop: '-135%',

  },
  backHomeButton: {
    position: 'absolute',
    bottom: 20,
    width: '13%',
    height: '5%',
    left: '44%',
    paddingLeft: 10,
    paddingTop: 5,
    backgroundColor: '#FFD166',
    borderRadius: 10,
    borderColor: 'black'
  },
  homeIcon: {
    width: 30,
    height: 30,
  },
});

export default DA_ResultsScreen;
