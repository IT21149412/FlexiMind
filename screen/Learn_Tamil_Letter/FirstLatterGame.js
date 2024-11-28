import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const FirstLetterGameScreen = ({ navigation }) => {
    //const { language } = route.params;
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    const questions = [
        { image: require('../../assets/Game/tree.png'), options: ['ம', 'உ', 'ப'], answer: 'ம' },
        { image: require('../../assets/Game/kite.png'), options: ['ன', 'ட', 'ப'], answer: 'ப' },
        { image: require('../../assets/Game/home.png'), options: ['வீ', 'ழ', 'வ'], answer: 'வீ' },
        { image: require('../../assets/Game/squirrel.png'), options: ['அ', 'இ', 'ர'], answer: 'அ' },
        { image: require('../../assets/Game/book.png'), options: ['ம', 'பு', 'ற'], answer: 'பு' },
    ];

    const handleLetterPress = (letter) => {
        setSelectedLetter(letter);
        setIsCorrect(letter === questions[currentIndex].answer);
    };

    const handleNextPress = () => {
        if (isCorrect) {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedLetter(null);
                setIsCorrect(null);
            } else {
                setShowCompletionModal(true);
            }
        } else {
            alert("Please select the correct answer before proceeding.");
        }
    };

    const handleHomePress = () => {
        navigation.navigate('GameSelect');
    };

    return (
        <View style={styles.containerNew}>
            <Text style={styles.headerText}>Select the First{'\n'}Letter</Text>
            <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
            <View style={styles.overlay}></View>
            <Image style={styles.dashImg} source={require('../../assets/game2.png')}></Image>
            <Image style={styles.image} source={questions[currentIndex].image} />

            <View style={styles.buttonsContainer}>
                {questions[currentIndex].options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.letterButton,
                            selectedLetter === option && {
                                backgroundColor: isCorrect ? 'green' : 'red',
                            },
                        ]}
                        onPress={() => handleLetterPress(option)}
                    >
                        <Text style={styles.letterText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
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
    containerNew: {
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
        top: '33%',
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
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        bottom: '25%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        bottom: '70%',
    },
    letterButton: {
        backgroundColor: '#FFD166',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    letterText: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#0275d8',
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        bottom: '35%',
    },
    nextButtonText: {
        fontSize: 20,
        color: '#FFD166',
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '32%',
        height: '80%',
        borderRadius: 85,
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

export default FirstLetterGameScreen;
