import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';

const MatchingLettersGameScreen = ({ navigation }) => {
   // const { language } = route.params;
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [letters, setLetters] = useState([
        { id: 1, letter: 'வ', isMatched: false },
        { id: 2, letter: 'அ', isMatched: false },
        { id: 3, letter: 'ல', isMatched: false },
        { id: 4, letter: 'உ', isMatched: false },
        { id: 5, letter: 'அ', isMatched: false },
        { id: 6, letter: 'வ', isMatched: false },
        { id: 7, letter: 'ப', isMatched: false },
        { id: 8, letter: 'ல', isMatched: false },
        { id: 9, letter: 'உ', isMatched: false },
        { id: 10, letter: 'ப', isMatched: false },
    ]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    const handleLetterPress = (letterObj) => {
        if (selectedLetters.length < 2 && !letterObj.isMatched) {
            setSelectedLetters([...selectedLetters, letterObj]);
        }

        if (selectedLetters.length === 1) {
            if (selectedLetters[0].letter === letterObj.letter && selectedLetters[0].id !== letterObj.id) {
                setMatchedPairs([...matchedPairs, selectedLetters[0].letter]);
                const updatedLetters = letters.map((letter) =>
                    letter.id === selectedLetters[0].id || letter.id === letterObj.id
                        ? { ...letter, isMatched: true }
                        : letter
                );
                setLetters(updatedLetters);
                setSelectedLetters([]);
            } else {
                setTimeout(() => setSelectedLetters([]), 500);
            }
        }

        if (matchedPairs.length + 1 === letters.length / 2) {
            setShowCompletionModal(true);
        }
    };

    const handleHomePress = () => {
        //navigation.navigate('Home', { language: language });
        navigation.navigate('GameSelect');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Select the matching{'\n'}letters</Text>
            <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
            <View style={styles.overlay}></View>
            <Image style={styles.dashImg} source={require('../../assets/game2.png')}></Image>
            <View style={styles.lettersContainer}>
                {letters.map((letterObj) => (
                    <TouchableOpacity
                        key={letterObj.id}
                        style={[
                            styles.letterButton,
                            selectedLetters.includes(letterObj) && !letterObj.isMatched
                                ? { backgroundColor: 'red' }
                                : letterObj.isMatched
                                    ? { backgroundColor: 'green' }
                                    : { backgroundColor: '#FFD166' },
                        ]}
                        onPress={() => handleLetterPress(letterObj)}
                        disabled={letterObj.isMatched}
                    >
                        <Text style={styles.letterText}>{letterObj.letter}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
                <Image style={styles.homeIcon} source={require('../assets/homeIcon.png')} />
            </TouchableOpacity> */}
            <Modal
                visible={showCompletionModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowCompletionModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Congratulations, you have completed this game!</Text>
                        <TouchableOpacity style={styles.doneButton} onPress={handleHomePress}>
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4D86F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 35,
        color: '#FFD166',
        top: '35%',
    },
    bgImg: {
        alignSelf: 'center',
        top: '50.4%',
        width: '100%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 90,
    },
    dashImg: {
        alignSelf: 'center',
        bottom: '50%',
        width: '60%',
        height: '18%',
        top: '-45%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '28%',
        height: '80%',
        borderRadius: 85,
    },
    lettersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // marginTop: 50,
        bottom: '75%'
    },
    letterButton: {
        backgroundColor: '#FFD166',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
    },
    letterText: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
    },
    homeButton: {
        position: 'absolute',
        bottom: 20,
    },
    homeIcon: {
        width: 50,
        height: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: '#FFD166',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: '#0275d8',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    doneButtonText: {
        color: '#FFD166',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default MatchingLettersGameScreen;
