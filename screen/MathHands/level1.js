import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,TextInput} from 'react-native';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const exercises = [
  { id: 'ex1', story: "A farmer has 2 pens of sheep. Each pen has 2 sheep. How many sheep are there in total?", correctAnswer: 4, multiplication: '2x2' },
  { id: 'ex2', story: "You help a gardener collect apples. There are 3 baskets, each with 1 apple. How many apples do you have?", correctAnswer: 3, multiplication: '1x3' },
  { id: 'ex3', story: "You have 4 boxes of toy cars. Each box contains 1 car. How many cars do you have?", correctAnswer: 4, multiplication: '1x4' },
  { id: 'ex4', story: "A gardener plants 2 rows of trees. Each row has 3 trees. How many trees are planted in total?", correctAnswer: 6, multiplication: '2x3' },
  { id: 'ex5', story: "You bake cookies for your friends. You have 2 friends and give each 2 cookies. How many cookies did you give away?", correctAnswer: 4, multiplication: '2x2' },
  { id: 'ex6', story: "Your bookshelf has 1 shelf. On that shelf, there are 5 books. How many books are on the shelf?", correctAnswer: 5, multiplication: '1x5' },
  { id: 'ex7', story: "You pour juice into 2 cups. Each cup holds 2 glasses of juice. How many glasses of juice are there in total?", correctAnswer: 4, multiplication: '2x2' },
  { id: 'ex8', story: "You have 3 pencil boxes, and each box contains 2 pencils. How many pencils do you have in total?", correctAnswer: 6, multiplication: '2x3' },
  { id: 'ex9', story: "You walk 1 dog each day for 4 days. How many walks did you go on?", correctAnswer: 4, multiplication: '1x4' },
  { id: 'ex10', story: "A woodcutter chops 2 logs each day for 2 days. How many logs are chopped in total?", correctAnswer: 4, multiplication: '2x2' },
];

const LevelOneScreen = ({ navigation }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState([]);

  const handleAnswer = () => {
    const correct = parseInt(userAnswer) === exercises[currentExercise].correctAnswer;
    
    const newResult = {
      exerciseId: exercises[currentExercise].id,
      correct,
    };
    
    setResults([...results, newResult]);
    
    // Move to the next exercise
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
    } else {
      saveResults();
    }
  };

  const saveResults = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;

      try {
        await addDoc(collection(db, 'multiplication'), {
          userId,
          level: 'Level 1',
          results,
          timestamp: serverTimestamp(),
        });

        // Navigate to a summary or next level screen
        navigation.navigate('SummaryScreen', { level: 'Level 1' });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.storyText}>{exercises[currentExercise].story}</Text>
      <Text style={styles.multiplicationText}>What is {exercises[currentExercise].multiplication}?</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleAnswer}>
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
  storyText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  multiplicationText: {
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

export default LevelOneScreen;
