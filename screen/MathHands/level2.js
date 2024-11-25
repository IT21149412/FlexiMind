import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';

const generateCards = () => {
  const timesTable = [
    { question: '3x1', answer: 3 },
    { question: '3x2', answer: 6 },
    { question: '3x3', answer: 9 },
    { question: '3x4', answer: 12 },
    { question: '4x1', answer: 4 },
    { question: '4x2', answer: 8 },
    { question: '4x3', answer: 12 },
    { question: '4x4', answer: 16 },
  ];

  const cards = timesTable.flatMap(pair => [
    { id: `${pair.question}-q`, content: pair.question, isQuestion: true },
    { id: `${pair.question}-a`, content: pair.answer.toString(), isQuestion: false },
  ]);

  return shuffleArray(cards);
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const LevelTwoScreen = () => {
  const [cards, setCards] = useState(generateCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [animationValue] = useState(new Animated.Value(1));

  useEffect(() => {
    Alert.alert(
      "Welcome to Math Match!",
      "Find the pairs! Match the multiplication questions with the correct answers. Tap two cards to flip them and see if they match. Let's get started!",
      [{ text: "Got it!", onPress: () => {} }]
    );
  }, []);

  const flipCard = (card) => {
    if (selectedCards.length < 2 && !matchedPairs.includes(card.id)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;

      if (firstCard.isQuestion !== secondCard.isQuestion && firstCard.content === secondCard.content) {
        // Match found
        setMatchedPairs([...matchedPairs, firstCard.id, secondCard.id]);
        playMatchAnimation();
      }

      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  }, [selectedCards]);

  const playMatchAnimation = () => {
    Animated.sequence([
      Animated.timing(animationValue, { toValue: 1.5, duration: 300, useNativeDriver: true }),
      Animated.timing(animationValue, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Math Match</Text>
      <View style={styles.grid}>
        {cards.map(card => {
          const isSelected = selectedCards.some(selected => selected.id === card.id);
          const isMatched = matchedPairs.includes(card.id);
          return (
            <TouchableOpacity key={card.id} onPress={() => flipCard(card)} disabled={isMatched}>
              <Animated.View style={[styles.card, isMatched ? styles.matchedCard : null, { transform: [{ scale: isMatched ? animationValue : 1 }] }]}>
                <Text style={styles.cardText}>{isSelected || isMatched ? card.content : '?'}</Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    width: '80%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#4D86F7',
    width: 70,
    height: 100,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  matchedCard: {
    backgroundColor: '#FFD700',
  },
  cardText: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default LevelTwoScreen;
