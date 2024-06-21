import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import DA_SelectLanguage from './screen/Dyslexia Assesment/SelectLanguageScreen';
import DA_ParentConsentScreen from './screen/Dyslexia Assesment/ParentConsentScreen';
import DA_MatchingWordsScreen from './screen/Dyslexia Assesment/MatchingWordsScreen';
import DA_MatchingWordsScreen2 from './screen/Dyslexia Assesment/MatchingWordsScreen2';
import DA_GoodJobScreen from './screen/Dyslexia Assesment/GoodJobScreen';
import DA_ListenAndChooseScreen from './screen/Dyslexia Assesment/ListenAndChooseScreen';
import DA_GoodJobScreenListen from './screen/Dyslexia Assesment/GoodJobScreenListen';
import DA_ReadOutLoudScreen from './screen/Dyslexia Assesment/ReadOutLoudScreen';
import DA_SpellingScreen from './screen/Dyslexia Assesment/SpellingScreen';
import DA_GoodJobScreenSpell from './screen/Dyslexia Assesment/GoodJobScreenSpell';
import DA_MachingWordsDescriptionScreen from './screen/Dyslexia Assesment/MatchingWordsDescriptionScreen';
import DA_ListenAndChooseDescriptionScreen from './screen/Dyslexia Assesment/ListenAndChooseDescriptionScreen';
import DA_SpellingDescriptionScreen from './screen/Dyslexia Assesment/SpellingDescriptionScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
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

        {/* Dyslexia Assesment */}

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
          name="DA_MatchingWordsScreen2"
          component={DA_MatchingWordsScreen2}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
