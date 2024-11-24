import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity, Alert, Platform } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { ImageBackground } from 'react-native';

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
          <Circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#6ecbc3" strokeWidth="3.8" />
          <AnimatedCircle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#2a9d8f" strokeWidth="3.8" strokeDasharray="100" strokeDashoffset={strokeDashoffset} />
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
          <Circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#f7f5bc" strokeWidth="3.8" />
          <AnimatedCircle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#f4a261" strokeWidth="3.8" strokeDasharray="100" strokeDashoffset={strokeDashoffset} />
        </G>
      </Svg>
      <View style={styles.innerCircle}>
        <Text style={styles.percentageText}>{Math.round(averagePercentage)}%</Text>
      </View>
    </View>
  );
};

// Fetch user results
const fetchUserResults = async () => {
  const user = auth.currentUser;
  if (!user) {
    Alert.alert('Error', 'No user is logged in.');
    return {};
  }

  const userId = user.uid;
  const collections = [
    'Bingo_Results',
    'MatchingWords_Results',
    'ReadOutLoud_Results',
    'Spelling_Results',
    'listen_and_choose_results',
  ];

  let results = {};
  for (const collection of collections) {
    const docRef = doc(db, collection, userId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      results[collection] = docSnapshot.data();
    } else {
      console.warn(`No data found for collection: ${collection}`);
    }
  }
  return results;
};



// Generate PDF report with expo-print and save to media library
const generatePDFReport = async (userData) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #003f5c; font-size: 28px; }
          h2 { color: #4D86F7; font-size: 25px; }
          .section-title { color: #FFD166; font-size: 18px; margin-top: 20px; }
          .details, .result { margin-top: 5px; }
          .result { color: #020035; font-size: 25px; }
          .activity { font-size: 16px; color: #264653; margin-top: 15px; font-weight: bold; }
          h3 { color: #033500; font-size: 23px; }
        </style>
      </head>
      <body>
        <h1>Child's Dyslexia Assessment Report</h1>
        <h2>Personal Details</h2>
        <div><strong>Name:</strong> ${userData.childName || 'N/A'}</div>
        <div><strong>Age:</strong> ${userData.childAge || 'N/A'}</div>
        <div><strong>Guardian's Email:</strong> ${userData.guardianEmail || 'N/A'}</div>
        <div><strong>Psychiatrist's Email:</strong> ${userData.psychiatristEmail || 'N/A'}</div>

        <h2>Results Summary</h2>
        <div class="section-title">Total Score and Activity Percentage:</div>
        <div class="result">Overall Percentage: ${calculateOverallPercentage(userData)}%</div>

        <h2>Activity Breakdown</h2>
        ${generateActivityResultsHTML(userData)}
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    if (Platform.OS === 'ios') {
      await Sharing.shareAsync(uri);
    } else {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        await MediaLibrary.createAssetAsync(uri);
        Alert.alert("PDF generated", "The report has been saved to your gallery.");
      }
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

// Calculate the percentage of correct answers for each activity
const calculateActivityPercentage = (results) => {
  if (!results || !results.results || results.results.length === 0) return 0;

  const correctRounds = results.results.filter((round) => round.isCorrect || round.isFullyCorrect);
  return (correctRounds.length / results.results.length) * 100;
};

// Calculate overall percentage across all activities
const calculateOverallPercentage = (userData) => {
  const activities = [
    userData.Bingo_Results,
    userData.MatchingWords_Results,
    userData.ReadOutLoud_Results,
    userData.Spelling_Results,
    userData.listen_and_choose_results,
  ];

  let totalCorrect = 0;
  let totalRounds = 0;

  activities.forEach((activity) => {
    if (activity?.results) {
      const correct = activity.results.filter((res) => res.isCorrect || res.isFullyCorrect).length;
      totalCorrect += correct;
      totalRounds += activity.results.length;
    }
  });

  return ((totalCorrect / totalRounds) * 100).toFixed(2);
};

// Generate HTML for each activity’s results
// Generate HTML for each activity’s results with detailed information
const generateActivityResultsHTML = (userData) => {
  const activities = [
    { title: 'Bingo Results', data: userData.Bingo_Results },
    { title: 'Matching Words Results', data: userData.MatchingWords_Results },
    { title: 'Read Out Loud Results', data: userData.ReadOutLoud_Results },
    { title: 'Spelling Results', data: userData.Spelling_Results },
    { title: 'Listen and Choose Results', data: userData.listen_and_choose_results },
  ];

  return activities
    .map((activity) => {
      if (!activity.data?.results) return ''; // Skip if there is no data for the activity

      // Generate HTML for each round
      const roundsHTML = activity.data.results
        .map((round, index) => {
          const roundDetails = Object.entries(round)
            .map(([key, value]) => `<strong>${key}</strong>: ${value}`)
            .join('<br>');
          return `<div><strong>Round ${index + 1}</strong><br>${roundDetails}</div>`;
        })
        .join('<br>');

      return `<div class="activity"><h3>${activity.title}</h3>${roundsHTML}</div>`;
    })
    .join('<br>');
};


// English screen component
const EnglishScreen = ({ navigation, activityPercentages, averagePercentage }) => {
  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicE}>Assessment Results</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay} />
      <Text style={styles.guardianMessage}>
        Below are the results of the assessment conducted for dyslexia diagnosis:
      </Text>

      <PieChart averagePercentage={averagePercentage} />
      <View style={styles.resultoverlay} />
      <Text style={styles.resultBreakdown}>Result Breakdown</Text>
      <View style={styles.smallChartsContainer}>
        <SmallPieChart percentage={activityPercentages.bingo} activityName="Bingo" />
        <SmallPieChart percentage={activityPercentages.matchingWords} activityName="Matching Words" />
        <SmallPieChart percentage={activityPercentages.readOutLoud} activityName="Read Out Loud" />
        <SmallPieChart percentage={activityPercentages.spelling} activityName="Spelling Words" />
        <SmallPieChart percentage={activityPercentages.listenAndChoose} activityName="Listen and Choose" />
      </View>
      <TouchableOpacity onPress={navigateHome} style={styles.backHomeButton}>
        <Image source={require('../../assets/backhome.png')} style={styles.homeIcon} />
      </TouchableOpacity>
    </View>
  );
};

// Tamil screen component
const TamilScreen = ({ navigation, activityPercentages, averagePercentage }) => {
  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopicT}>அருமையான வேலை, வார்த்தை வழிகாட்டி!!</Text>
      <View style={styles.overlay} />
      <Text style={styles.guardianMessage}>
        கீழே இடப்பட்டுள்ளவை குறைவுகோள் கண்டறிதல் நடத்திய ஆய்வின் முடிவுகள்:
      </Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />

      <PieChart averagePercentage={averagePercentage} />
      <View style={styles.resultoverlay} />
      <Text style={styles.resultBreakdown}>முடிவு முறிவு</Text>
      <View style={styles.smallChartsContainer}>
        <SmallPieChart percentage={activityPercentages.bingo} activityName="பிங்கோ" />
        <SmallPieChart percentage={activityPercentages.matchingWords} activityName="பொருத்தும் வார்த்தைகள்" />
        <SmallPieChart percentage={activityPercentages.readOutLoud} activityName="உச்சரித்தல்" />
        <SmallPieChart percentage={activityPercentages.spelling} activityName="எழுத்துப்பிழை வார்த்தைகள்" />
        <SmallPieChart percentage={activityPercentages.listenAndChoose} activityName="கேட்டு தேர்ந்தெடுக்கவும்" />
      </View>
      <TouchableOpacity onPress={navigateHome} style={styles.backHomeButton}>
        <Image source={require('../../assets/backhome.png')} style={styles.homeIcon} />
      </TouchableOpacity>
    </View>
  );
};


// DA_ResultsScreen component
const DA_ResultsScreen = ({ navigation, route }) => {
  const { language } = route.params;
  const [activityPercentages, setActivityPercentages] = useState({
    bingo: 0,
    matchingWords: 0,
    readOutLoud: 0,
    spelling: 0,
    listenAndChoose: 0,
  });
  const [averagePercentage, setAveragePercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDataAndGeneratePDF = async () => {
      const results = await fetchUserResults();

      // Calculate the percentage for each activity
      const newActivityPercentages = {
        bingo: calculateActivityPercentage(results.Bingo_Results),
        matchingWords: calculateActivityPercentage(results.MatchingWords_Results),
        readOutLoud: calculateActivityPercentage(results.ReadOutLoud_Results),
        spelling: calculateActivityPercentage(results.Spelling_Results),
        listenAndChoose: calculateActivityPercentage(results.listen_and_choose_results),
      };

      setActivityPercentages(newActivityPercentages);
      setAveragePercentage(calculateOverallPercentage(results));
      await generatePDFReport(results); // Generate PDF as soon as results are loaded
      setLoading(false);
    };

    loadDataAndGeneratePDF();
  }, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ImageBackground
          source={require('../../assets/LoadingBackground.jpg')}
          style={styles.loadingBackground} // Set the size and positioning for the background image
          resizeMode="cover"
        >
          <Image source={require('../../assets/loading.gif')} style={styles.loadingGif} />
          <Text style={styles.loadingText}>Loading Results...</Text>
        </ImageBackground>
      </View>
    );
  }

  return language === 'ENGLISH' ? <EnglishScreen {...{ navigation, activityPercentages, averagePercentage }} /> : <TamilScreen {...{ navigation, activityPercentages, averagePercentage }} />;
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
    marginTop: 50,
    paddingHorizontal: 20,
  },
  resultBreakdown: {
    textAlign: 'center',
    fontSize: 14,
    color: '#051650',
    paddingHorizontal: 20,
    marginTop: '6%',
    marginBottom: '6%'
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
    top: '56%',
    height: '35%',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 150,
    height: 150,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#051650', 
  },
});

export default DA_ResultsScreen;


