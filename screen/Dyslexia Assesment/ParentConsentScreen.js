import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { translations } from './PhraseList'; // Import translations
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const languageMap = {
  en: 'en',
  ta: 'ta',
};

const DA_ParentConsentScreen = ({ route, navigation }) => {
  const { t } = useTranslation(); // Use the hook to access translations
  const { language = 'en' } = route.params; // Extract language from route params
  const mappedLanguage = languageMap[language] || 'en'; // Map language

  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [psychiatristEmail, setPsychiatristEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(true); // Show modal on load
  const [consentGiven, setConsentGiven] = useState(false); // Track consent checkbox state
  const [sessionId, setSessionId] = useState(null); // Store session ID in state

  const currentLanguage = translations[mappedLanguage] || translations['en']; // Fallback to 'en' if mappedLanguage is undefined

  const isFormValid = () => {
    const age = parseInt(childAge, 10);
    return consentGiven && childName.length > 0 && age >= 6 && age <= 10 && guardianEmail.length > 0;
  };

  const handleConsentToggle = () => {
    setConsentGiven(!consentGiven); // Toggle the consent state
  };

  const handleAgree = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    navigation.goBack(); // Go back to the previous screen
  };

  // Define the handleNext function to navigate to the next screen with the session ID
  const handleNext = () => {
    navigation.navigate('DA_ListenAndChooseDescriptionScreen', { sessionId, language }); // Pass sessionId and language to the next screen
  };

  const handleSubmit = async () => {
    // Get the current authenticated user
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid; // Retrieve userId from auth.currentUser
      console.log('Current user ID:', userId); // Log the user ID for debugging

      // Prepare the data to save
      const assessmentData = {
        childName,
        childAge,
        language: mappedLanguage, // Save the language in the database as 'en' or 'ta'
        guardianEmail,
        psychiatristEmail, // Optional
        userId,  // User ID from Firebase Authentication
        timestamp: serverTimestamp(), // Store the time when the test is taken
      };

      // Attempt to save the data in Firestore
      try {
        const docRef = await addDoc(collection(db, 'DyslAssessmentUsers'), assessmentData);
        console.log('Document successfully written with ID:', docRef.id);
        setSessionId(docRef.id); // Store the session ID in state

        handleNext(); // Proceed to the next screen after submission
      } catch (error) {
        console.error('Error writing document:', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTopic}>{currentLanguage.consentTitle}</Text>
      <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={currentLanguage.namePlaceholder}
          value={childName}
          onChangeText={setChildName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{currentLanguage.ageLabel}</Text>
        <View style={styles.ageOptions}>
          {[6, 7, 8, 9, 10].map((age) => (
            <TouchableOpacity
              key={age}
              style={[styles.ageOption, childAge === String(age) ? styles.selectedAgeOption : null]}
              onPress={() => setChildAge(String(age))}
            >
              <Text style={styles.ageOptionText}>{age}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={currentLanguage.guardianEmailPlaceholder}
          value={guardianEmail}
          onChangeText={setGuardianEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={currentLanguage.psychiatristEmailPlaceholder}
          value={psychiatristEmail}
          onChangeText={setPsychiatristEmail}
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity
        style={[styles.nextButton, { opacity: isFormValid() ? 1 : 0.5 }]}
        onPress={handleSubmit}
        disabled={!isFormValid()}
      >
        <Text style={styles.nextButtonText}>{currentLanguage.beginButton}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{currentLanguage.modalDescription}</Text>
            
            {/* Consent Checkbox */}
            <TouchableOpacity style={styles.consentButton} onPress={handleConsentToggle}>
              <View style={[styles.checkbox, consentGiven ? styles.checked : null]}></View>
              <Text style={styles.consentText}>{currentLanguage.consentText}</Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              {/* Proceed Button */}
              <TouchableOpacity
                style={[styles.modalButton, { opacity: consentGiven ? 1 : 0.5 }]}
                onPress={handleAgree}
                disabled={!consentGiven}
              >
                <Text style={styles.modalButtonText}>{currentLanguage.proceedButton}</Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#4D86F7',
    alignItems: 'center',
  },
  textTopic: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFD166',
    marginTop: '10%',
    marginBottom: '5%',
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '15.5%',
    height: '80%',
    borderRadius: 85,
  },
  inputContainer: {
    width: '70%',
    height: '5%',
    marginTop: '10%',
  },
  inputLabel: {
    fontSize: 16,
    color: '#16397F',
    marginBottom: '2%',
  },
  input: {
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  ageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  ageOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  ageOptionText: {
    color: '#16397F',
    fontSize: 16,
  },
  selectedAgeOption: {
    borderColor: '#4D86F7',
  },
  nextButton: {
    backgroundColor: '#4D86F7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: '10%',
  },
  nextButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#16397F',
    textAlign: 'justify',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  consentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C0BFBF',
    marginRight: '5%',
  },
  checked: {
    backgroundColor: '#FFD166',
    borderWidth: 5,
  },
  consentText: {
    fontSize: 14,
    color: '#4C7FE4',
    marginBottom: '10%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4D86F7',
    borderRadius: 5,
    marginHorizontal: '30%',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DA_ParentConsentScreen;
