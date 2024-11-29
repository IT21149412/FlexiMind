import React, { createContext, useState, useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import { Provider } from "react-redux";
import { store } from "./store/store";

//assessment
import DA_SelectLanguage from './screen/Dyslexia Assesment/SelectLanguageScreen';
import DA_ParentConsentScreen from './screen/Dyslexia Assesment/ParentConsentScreen';
import DA_MatchingWordsScreen from './screen/Dyslexia Assesment/MatchingWordsScreen';
import DA_GoodJobScreen from './screen/Dyslexia Assesment/GoodJobScreen';
import DA_ListenAndChooseScreen from './screen/Dyslexia Assesment/ListenAndChooseScreen';
import DA_ReadOutLoudDescriptionScreen from './screen/Dyslexia Assesment/ReadOutLoudDescriptionScreen';
import DA_GoodJobScreenListen from './screen/Dyslexia Assesment/GoodJobScreenListen';
import DA_ReadOutLoudScreen from './screen/Dyslexia Assesment/ReadOutLoudScreen';
import DA_SpellingScreen from './screen/Dyslexia Assesment/SpellingScreen';
import DA_GoodJobScreenSpell from './screen/Dyslexia Assesment/GoodJobScreenSpell';
import DA_MachingWordsDescriptionScreen from './screen/Dyslexia Assesment/MatchingWordsDescriptionScreen';
import DA_ListenAndChooseDescriptionScreen from './screen/Dyslexia Assesment/ListenAndChooseDescriptionScreen';
import DA_SpellingDescriptionScreen from './screen/Dyslexia Assesment/SpellingDescriptionScreen';
import DA_ResultsScreen from './screen/Dyslexia Assesment/ResultsScreen';
import DA_BingoScreen from './screen/Dyslexia Assesment/BingoScreen';
import DA_BingoDescriptionScreen from './screen/Dyslexia Assesment/BingoDescriptionScreen';


// Remidial
import HomeScreenRemidial from './screen/remidial/HomeScreen';
import HomeScreenRemidialTamil from './screen/remidial/HomeScreenTam';
import LanguageScreen from './screen/remidial/LanguageScreen';
import EnglishQuizScreen from './screen/remidial/english/EnglishQuizScreen';
import TamilQuizScreen from './screen/remidial/tamil/TamilQuizScreen';
import AgeEnglish from './screen/remidial/english/AgeEnglish';
import AgeTamil from './screen/remidial/tamil/AgeTamil';
import IQEnglishScreen from './screen/remidial/english/IQEnglishScreen';
import StartEngQuiz from './screen/remidial/english/StartEngQuiz';
import IQTamilScreen from './screen/remidial/tamil/IQTamilScreen';
import StartTamQuiz from './screen/remidial/tamil/StartTamQuiz';
import QuizSummary from './screen/remidial/english/QuizResultSum';
import QuizSummaryTam from './screen/remidial/tamil/QuizResultSumTam';

import ActivityEng from './screen/remidial/english/ActivityEng';
import UnitsScreenEng from './screen/remidial/english/UnitsScreenEng';
import Unit1EngNew from './screen/remidial/english/Unit1EngNew';
import MatchEngHome from './screen/remidial/english/matchEngHome';
import MatchEng from './screen/remidial/english/MatchEng';
import WordSoundHome from './screen/remidial/english/WordSoundHome';
import EngWordSounds from './screen/remidial/english/WordEng';
import ActivityTam from './screen/remidial/tamil/ActivityTamil';
import UnitsScreenTam from './screen/remidial/tamil/UnitsScreenTam';
import Unit1Tamil from './screen/remidial/tamil/Unit1Tam';
import MatchTamHome from './screen/remidial/tamil/matchTamHome';
import MatchTam from './screen/remidial/tamil/MatchTam';
import WordSoundHomeTam from './screen/remidial/tamil/WordSoundHome';
import TamWordSounds from './screen/remidial/tamil/WordTam';

//math hands
import MathHandsMainScreen from "./screen/MathHands/MathHandsMainScreen";
import MathHandsMenu from "./screen/MathHands/MathHandsMenu";
import Allexercises from "./screen/MathHands/AllExercisesScreen";
import DetectiveScreen from "./screen/MathHands/DetectiveScreen";
import AdditionAlleyScreen from "./screen/MathHands/AdditionAlleyScreen";
import SubtractionAlleyScreen from "./screen/MathHands/SubtractionStreet";
import DemoMultiplication from "./screen/MathHands/DemoMultiplication";
import DivisionDriveScreen from "./screen/MathHands/DivisionDriveScreen";
import SpacedRepetitionScreen from "./screen/MathHands/SpacedRepetitionScreen";
import FlashcardMatchingScreen from "./screen/MathHands/FlashcardMatchingScreen";
import MultiplicationInro from "./screen/MathHands/MultiplicationInro";
import GameMap from "./screen/MathHands/GamesMap";
import DemoVideosScreen from "./screen/MathHands/DemoVideosScreen";
import SixTimesScreen from "./screen/MathHands/SixTimesScreen";
import LevelOneScreen from "./screen/MathHands/level1";
import LevelTwoScreen from "./screen/MathHands/level2";
import RetryExercisesScreen from "./screen/MathHands/RetryExercisesScreen";
import LevelCompletedScreen from "./screen/MathHands/LevelCompletedScreen";
import NineTimesScreen from "./screen/MathHands/NineTimesScreen";
import ReviewScreen from "./screen/MathHands/ReviewScreen";
import SevenTimesScreen from "./screen/MathHands/SevenTimesScreen";
import TenTimesTableScreen from "./screen/MathHands/TenTimesTableScreen";
import EightTimesScreen from "./screen/MathHands/EightTimesScreen";
 

const Stack = createStackNavigator();
const MathHandsStack = createStackNavigator();

const LanguageContext = createContext();

const MathHandsScreens = ({ language, changeLanguage }) => {
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <MathHandsStack.Navigator>
        <MathHandsStack.Screen
          name="MathHandsMainScreen"
          component={MathHandsMainScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="Allexercises"
          component={Allexercises}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="DetectiveScreen"
          component={DetectiveScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="MathHandsMenu"
          component={MathHandsMenu}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="AdditionAlleyScreen"
          component={AdditionAlleyScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="SubtractionAlleyScreen"
          component={SubtractionAlleyScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="DemoMultiplication"
          component={DemoMultiplication}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="DivisionDriveScreen"
          component={DivisionDriveScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="FlashcardMatchingScreen"
          component={FlashcardMatchingScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="SpacedRepetitionScreen"
          component={SpacedRepetitionScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="MultiplicationInro"
          component={MultiplicationInro}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="GameMap"
          component={GameMap}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="DemoVideosScreen"
          component={DemoVideosScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="SixTimesScreen"
          component={SixTimesScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="LevelOneScreen"
          component={LevelOneScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="LevelTwoScreen"
          component={LevelTwoScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
            name="RetryExercisesScreen"
            component={RetryExercisesScreen}
            options={{ headerShown: false }}
          />
          <MathHandsStack.Screen
            name="LevelCompletedScreen"
            component={LevelCompletedScreen}
            options={{ headerShown: false }}
          />
          <MathHandsStack.Screen
            name="NineTimesScreen"
            component={NineTimesScreen}
            options={{ headerShown: false }}
          />
          <MathHandsStack.Screen
            name="ReviewScreen"
            component={ReviewScreen}
            options={{ headerShown: false }}
          />
          <MathHandsStack.Screen
          name="SevenTimesScreen"
          component={SevenTimesScreen}
          options={{ headerShown: false }}
        />
          <MathHandsStack.Screen
          name="EightTimesScreen"
          component={EightTimesScreen}
          options={{ headerShown: false }}
        />
        <MathHandsStack.Screen
          name="TenTimesTableScreen"
          component={TenTimesTableScreen}
          options={{ headerShown: false }}
        />
      </MathHandsStack.Navigator>
    </LanguageContext.Provider>
  );
};


const App = () => {
  const [language, setLanguage] = useState("en");
  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />

            {/* Assesment */}

            <Stack.Screen
              name="DA_SelectLanguage"
              component={DA_SelectLanguage}
              options={{ 
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="DA_ParentConsentScreen"
              component={DA_ParentConsentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_MatchingWordsScreen"
              component={DA_MatchingWordsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_GoodJobScreen"
              component={DA_GoodJobScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_ListenAndChooseScreen"
              component={DA_ListenAndChooseScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_GoodJobScreenListen"
              component={DA_GoodJobScreenListen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_ReadOutLoudDescriptionScreen"
              component={DA_ReadOutLoudDescriptionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_ReadOutLoudScreen"
              component={DA_ReadOutLoudScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_SpellingScreen"
              component={DA_SpellingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_GoodJobScreenSpell"
              component={DA_GoodJobScreenSpell}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_MatchingWordsDescriptionScreen"
              component={DA_MachingWordsDescriptionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_ListenAndChooseDescriptionScreen"
              component={DA_ListenAndChooseDescriptionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_SpellingDescriptionScreen"
              component={DA_SpellingDescriptionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_ResultsScreen"
              component={DA_ResultsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_BingoScreen"
              component={DA_BingoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DA_BingoDescriptionScreen"
              component={DA_BingoDescriptionScreen}
              options={{ headerShown: false }}
            />
            
            

            {/* Remidial */}

            <Stack.Screen
              name="HomeRemidial"
              component={HomeScreenRemidial}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeRemidialTamil"
              component={HomeScreenRemidialTamil}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Language"
              component={LanguageScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ageEng"
              component={AgeEnglish}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ageTamil"
              component={AgeTamil}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="iqEng"
              component={IQEnglishScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="iqTam"
              component={IQTamilScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="startEng"
              component={StartEngQuiz}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="startTam"
              component={StartTamQuiz}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EnglishQuiz"
              component={EnglishQuizScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TamilQuiz"
              component={TamilQuizScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="activityEng"
              component={ActivityEng}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="unitsScreenEng"
              component={UnitsScreenEng}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="unit1Eng"
              component={Unit1EngNew}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="matchEng"
              component={MatchEng}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="matchEngHome"
              component={MatchEngHome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="wordSoundHome"
              component={WordSoundHome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="engWordSounds"
              component={EngWordSounds}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="activityTam"
              component={ActivityTam}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="unitsScreenTam"
              component={UnitsScreenTam}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="unit1Tam"
              component={Unit1Tamil}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="matchTam"
              component={MatchTam}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="matchTamHome"
              component={MatchTamHome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="wordSoundHomeTam"
              component={WordSoundHomeTam}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="tamWordSounds"
              component={TamWordSounds}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="quizSummary"
              component={QuizSummary}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="quizSummarytam"
              component={QuizSummaryTam}
              options={{ headerShown: false }}
            />

            {/* Math hands */}
            <Stack.Screen
              name="MathHands"
              component={MathHandsScreens}
              options={{ headerShown: false }}
            />
          
          </Stack.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </Provider>
  
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default App;
