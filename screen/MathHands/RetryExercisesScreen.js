import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,TextInput} from 'react-native';

const RetryExercisesScreen = ({ route, navigation }) => {
  const { results } = route.params;
  const incorrectQuestions = results.filter(result => !result.correct);
  const [currentReview, setCurrentReview] = useState(0);
  const [reviewAnswer, setReviewAnswer] = useState('');

  useEffect(() => {
    // If there are no incorrect questions, navigate to the LevelCompletedScreen immediately
    if (incorrectQuestions.length === 0) {
      navigation.navigate('LevelCompletedScreen', { results });
    }
  }, [incorrectQuestions, navigation]);

  const handleReviewAnswer = () => {
    const correct = parseInt(reviewAnswer) === incorrectQuestions[currentReview].correctAnswer;

    if (correct) {
      if (currentReview < incorrectQuestions.length - 1) {
        setCurrentReview(currentReview + 1);
        setReviewAnswer('');
      } else {
        // Navigate to Level Completed Screen after all review questions are completed
        navigation.navigate('LevelCompletedScreen', { results });
      }
    } else {
      // Optionally, you could vibrate the device or give feedback on incorrect answers.
      setReviewAnswer('');
    }
  };

  // Return null if there are no incorrect questions to prevent rendering issues
  if (incorrectQuestions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Review Question:</Text>
      <Text style={styles.currentQuestion}>
        {incorrectQuestions[currentReview].question}
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={reviewAnswer}
        onChangeText={setReviewAnswer}
      />
      <TouchableOpacity style={styles.button} onPress={handleReviewAnswer}>
        <Text style={styles.buttonText}>Submit Answer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D86F7',
    padding: 20,
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  currentQuestion: {
    fontSize: 22,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#4D86F7',
    fontWeight: 'bold',
  },
});

export default RetryExercisesScreen;
