import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';

const GameScreen = ({ navigation, route }) => {
    const { level } = route.params;

    const normalizedLevel = level.toLowerCase();

    console.log('Normalized Level:', normalizedLevel);

    const allQuestions = {
        basic: [
            { id: 1, text: "அ___மா", answer: "ம்", selectedAnswer: "", answerOptions: ["ம்", "க்", "அ", "பா"] },
            { id: 2, text: "அப்___", answer: "பா", selectedAnswer: "", answerOptions: ["ம்", "க்", "அ", "பா"] },
            { id: 3, text: "___க்கா", answer: "அ", selectedAnswer: "", answerOptions: ["ம்", "க்", "அ", "பா"] },
            { id: 4, text: "த___பி", answer: "ம்", selectedAnswer: "", answerOptions: ["ம்", "க்", "அ", "பா"] }
        ],
        medium: [
            { id: 5, text: "கப்___ல்", answer: "ப", selectedAnswer: "", answerOptions: ["ப", "ய", "ண்", "ட்"] },
            { id: 6, text: "வ___ணம்", answer: "ண்", selectedAnswer: "", answerOptions: ["ப", "ய", "ண்", "ட்"] },
            { id: 7, text: "சூரி___ன்", answer: "ய", selectedAnswer: "", answerOptions: ["ப", "ய", "ண்", "ட்"] },
            { id: 8, text: "ப___ம்", answer: "ட்", selectedAnswer: "", answerOptions: ["ப", "ய", "ண்", "ட்"] }
        ],
        hard: [
            { id: 9, text: "குடும்ப___", answer: "ம்", selectedAnswer: "", answerOptions: ["ம்", "ர", "வ", "ச"] },
            { id: 10, text: "___ந்திரன்", answer: "ச", selectedAnswer: "", answerOptions: ["ம்", "ர", "வ", "ச"] },
            { id: 11, text: "பகல___ன்", answer: "வ", selectedAnswer: "", answerOptions: ["ம்", "ர", "வ", "ச"] },
            { id: 12, text: "சக்க___ம்", answer: "ர", selectedAnswer: "", answerOptions: ["ம்", "ர", "வ", "ச"] }
        ]
    };

    const initialQuestions = allQuestions[normalizedLevel] || [];

    console.log('Initial questions:', initialQuestions);

    const [questions, setQuestions] = useState(initialQuestions);
    const [answersSubmitted, setAnswersSubmitted] = useState(false);
    const [points, setPoints] = useState(0);
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

    useEffect(() => {
        const allAnswered = questions.every(question => question.selectedAnswer !== "");
        setAllQuestionsAnswered(allAnswered);
    }, [questions]);

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const handleAnswerChange = (itemValue, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].selectedAnswer = itemValue;
        setQuestions(updatedQuestions);
    };

    const submitAnswers = () => {
        let earnedPoints = 0;
        const wrongAnswers = [];
        questions.forEach(question => {
            if (question.selectedAnswer === question.answer) {
                earnedPoints += 5;
            } else {
                wrongAnswers.push({
                    question: question.text,
                    selectedAnswer: question.selectedAnswer,
                    correctAnswer: question.answer
                });
            }
        });

        setPoints(earnedPoints);
        setAnswersSubmitted(true);

        // const alertTitle = language === 'Tamil' ? 'முடிவுகள்' : 'Results';
        const alertTitle = 'Results';
        // const alertMessage = language === 'Tamil' ?
        //     `மொத்த மதிப்பெண்கள்: ${earnedPoints}\n\n` +
        //     (wrongAnswers.length > 0 ?
        //         `தவறான பதில்கள்:\n${wrongAnswers.map(wrong => `கேள்வி: ${wrong.question}\உங்கள் பதில்: ${wrong.selectedAnswer}\சரியான பதில்: ${wrong.correctAnswer}`).join('\n\n')}` :
        //         'எல்லா பதில்களும் சரி!') :
        //     `Total Marks: ${earnedPoints}\n\n` +
        //     (wrongAnswers.length > 0 ?
        //         `Wrong Answers:\n${wrongAnswers.map(wrong => `Question: ${wrong.question}\nYour Answer: ${wrong.selectedAnswer}\nCorrect Answer: ${wrong.correctAnswer}`).join('\n\n')}` :
        //         'All answers are correct!');

        const alertMessage =
            `Total Marks: ${earnedPoints}\n\n` +
            (wrongAnswers.length > 0 ?
                `Wrong Answers:\n${wrongAnswers.map(wrong => `Question: ${wrong.question}\nYour Answer: ${wrong.selectedAnswer}\nCorrect Answer: ${wrong.correctAnswer}`).join('\n\n')}` :
                'All answers are correct!');

        Alert.alert(alertTitle, alertMessage, [
            { text: 'OK', onPress: () => navigation.navigate('Learn') }
        ], { cancelable: false });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTopic}>{'LET"S PLAY A\nGAME'}</Text>
            <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
            <View style={styles.overlay}></View>
            <Image style={styles.dashImg} source={require('../../assets/game2.png')}></Image>

            {questions.length === 0 ? (
                <Text style={styles.noQuestionsText}>No questions available</Text>
            ) : (
                questions.map((question, index) => (
                    <View key={question.id} style={styles.questionContainer}>
                        <Picker
                            selectedValue={question.selectedAnswer}
                            onValueChange={(itemValue) => handleAnswerChange(itemValue, index)}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            <Picker.Item label="___" value="" />
                            {question.answerOptions.map((option, optionIndex) => (
                                <Picker.Item key={optionIndex} label={option} value={option} />
                            ))}
                        </Picker>

                        {question.selectedAnswer === "" ? (
                            <Text style={styles.quest}>{question.text}</Text>
                        ) : (
                            <Text style={styles.quest}>{question.text.replace("___", question.selectedAnswer)}</Text>
                        )}
                    </View>
                ))
            )}


            <TouchableOpacity
                style={[styles.submitButton, allQuestionsAnswered && styles.enabledButton]}
                onPress={submitAnswers}
                disabled={!allQuestionsAnswered}
            >
                <Text style={styles.submitButtonText}>Submit Answers</Text>
            </TouchableOpacity>

            <View style={styles.bottomNavigate}>
                <TouchableOpacity onPress={handleHome}>
                    <Image style={styles.homeIcon} source={require('../../assets/homeIcon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 'auto',
        height: '100%',
        backgroundColor: '#4D86F7',
    },
    bgImg: {
        alignSelf: 'center',
        top: '15.4%',
        width: '100%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 90,
    },
    dashImg: {
        alignSelf: 'center',
        top: '-83.5%',
        width: '70%',
        height: '25%',
    },
    textTopic: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 35,
        color: '#FFD166',
        top: '0%'
    },
    bottomNavigate: {
        position: 'absolute',
        width: '100%',
        height: 40,
        top: '94.5%',
        backgroundColor: '#4D86F7',
    },
    homeIcon: {
        alignSelf: 'center',
        height: 28,
        width: 28,
        top: 8
    },
    quest: {
        paddingTop: 5,
        top: '-520%',
        textAlign: 'center',
        color: '#05056E',
        fontWeight: 'bold',
        fontSize: 50,
    },
    picker: {
        bottom: 590,
        left: '-10%',
    },
    shuffleButton: {
        bottom: 600,
        left: '8%',
        backgroundColor: '#4D86F7',
        borderRadius: 10,
        width: '35%',
        height: '5%'
    },
    shuffleButtonText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
        color: '#FFD166',
        top: '15%'
    },
    submitButton: {
        bottom: '78%',
        alignSelf: 'center',
        backgroundColor: '#4D86F7',
        borderRadius: 10,
        width: '35%',
        height: '5%'
    },
    submitButtonText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
        color: '#FFD166',
        top: '15%'
    },
    questionContainer: {
        marginBottom: -35,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '28%',
        height: '80%',
        borderRadius: 85,
    },
    noQuestionsText: {
        textAlign: 'center',
        color: '#FF0000',
        fontSize: 20,
        marginTop: 20,
    }
});

export default GameScreen;
