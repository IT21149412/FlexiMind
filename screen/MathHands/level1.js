import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const gridQuestions = [
  [{ id: 'ex1', question: '1x2', correctAnswer: 2 }, { id: 'ex2', question: '2x2', correctAnswer: 4 }, { id: 'ex3', question: '3x2', correctAnswer: 6 }],
  [{ id: 'ex4', question: '2x3', correctAnswer: 6 }, { id: 'ex5', question: '1x4', correctAnswer: 4 }, { id: 'ex6', question: '2x4', correctAnswer: 8 }],
  [{ id: 'ex7', question: '3x3', correctAnswer: 9 }, { id: 'ex8', question: '4x2', correctAnswer: 8 }, { id: 'ex9', question: '5x1', correctAnswer: 5 }],
];

const LevelOneScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [highlightedPath, setHighlightedPath] = useState([]);
  const [incorrectPath, setIncorrectPath] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ row: 0, col: 0 });
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [sound, setSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/correct.wav'));
    setSound(sound);
    await sound.playAsync();
  };

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleAnswer = (row, col) => {
    const currentQuestion = gridQuestions[row][col];
    const correct = parseInt(currentAnswer) === currentQuestion.correctAnswer;
  
    const newResult = {
      exerciseId: currentQuestion.id,
      question: currentQuestion.question,
      correct,
      correctAnswer: currentQuestion.correctAnswer,  
    };
  
    setResults([...results, newResult]);
  
    if (correct) {
      setHighlightedPath([...highlightedPath, { row, col }]);
      playSound();
    } else {
      setIncorrectPath([...incorrectPath, { row, col }]);
      Vibration.vibrate();
    }
  
    if (row === 2 && col === 2) {
      saveResults();
    } else {
      if (col < 2) {
        setCurrentPosition({ row, col: col + 1 });
      } else if (row < 2) {
        setCurrentPosition({ row: row + 1, col: 0 });
      }
    }
  
    setCurrentAnswer('');
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

        navigation.navigate('RetryExercisesScreen', { results });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  return (
    <View style={styles.container}>
      {gridQuestions.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => {
            const isHighlighted = highlightedPath.some(path => path.row === rowIndex && path.col === colIndex);
            const isIncorrect = incorrectPath.some(path => path.row === rowIndex && path.col === colIndex);
            return (
              <TouchableOpacity
                key={colIndex}
                style={[styles.cell, isHighlighted ? styles.highlightedCell : null, isIncorrect ? styles.incorrectCell : null]}
                onPress={() => setCurrentPosition({ row: rowIndex, col: colIndex })}
                disabled={rowIndex !== currentPosition.row || colIndex !== currentPosition.col}
              >
                <Text style={styles.questionText}>{cell.question}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <Text style={styles.instructionText}>Answer the question:</Text>
      <Text style={styles.currentQuestion}>
        {gridQuestions[currentPosition.row][currentPosition.col].question}
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={currentAnswer}
        onChangeText={setCurrentAnswer}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleAnswer(currentPosition.row, currentPosition.col)}>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  cell: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
  },
  highlightedCell: {
    backgroundColor: '#FFD700',
  },
  incorrectCell: {
    backgroundColor: '#FF6347',
  },
  questionText: {
    fontSize: 18,
    color: '#4D86F7',
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

export default LevelOneScreen;
