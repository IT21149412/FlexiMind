import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';

const SelectWordGameScreen = ({ navigation }) => {
    //const { language } = route.params;
    const [selectedWord, setSelectedWord] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    const questions = [
        { prompt: 'ல் / ப / க', options: ['பகல்', 'இவபா', 'கபல்'], answer: 'பகல்' },
        { prompt: 'ணி / அ / ல்', options: ['ணிஅல்', 'அணில்', 'அல்ணி'], answer: 'அணில்' },
        { prompt: 'நி / ம் / ற', options: ['ம்நிற', 'நிறம்', 'றநிம்'], answer: 'நிறம்' },
        { prompt: 'ட / ட் / ம் / வ', options: ['வட்டம்', 'டட்வம்', 'டம்வம்'], answer: 'வட்டம்' },
        { prompt: 'வு / றி / மு', options: ['வுறிமு', 'றிமுவு', 'முறிவு'], answer: 'முறிவு' },
    ];

    const handleWordPress = (word) => {
        setSelectedWord(word);
        setIsCorrect(word === questions[currentIndex].answer);
    };

    const handleNextPress = () => {
        if (isCorrect) {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedWord(null);
                setIsCorrect(null);
            } else {
                setShowCompletionModal(true);
            }
        } else {
            alert('Please select the correct word before proceeding.');
        }
    };

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Select the Correct{'\n'}Word</Text>
            <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
            <View style={styles.overlay}></View>
            <Image style={styles.dashImg} source={require('../../assets/game2.png')}></Image>
            <Text style={styles.promptText}>{questions[currentIndex].prompt}</Text>
            <View style={styles.optionsContainer}>
                {questions[currentIndex].options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedWord === option && {
                                backgroundColor: isCorrect ? 'green' : 'red',
                            },
                        ]}
                        onPress={() => handleWordPress(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
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
        fontSize: 30,
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
    promptText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#05056E',
        bottom: '40%'
    },
    optionsContainer: {
        marginTop: 50,
        bottom: '40%'
    },
    optionButton: {
        backgroundColor: '#FFD166',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#0275d8',
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        bottom: '40%'
    },
    nextButtonText: {
        fontSize: 20,
        color: '#FFD166',
        fontWeight: 'bold',
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

export default SelectWordGameScreen;
