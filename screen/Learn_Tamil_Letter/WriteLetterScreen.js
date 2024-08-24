import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Vibration, ToastAndroid, Modal } from "react-native";
import { Audio, Video } from 'expo-av';
import Signature from "react-native-signature-canvas";
import * as FileSystem from 'expo-file-system';
import { Entypo } from '@expo/vector-icons';

const translations = {
    English: {
        title: "TAMIL LETTER\n WRITE",
        vowelTitle: "Vowel Letters",
        consonantTitle: "Consonant Letters",
        write: "Write",
        clear: "Erase",
        submit: "Submit",
        skip: "Skip",
        noSignature: "No Signature",
        noSignatureMessage: "Please write a letter before submitting.",
        errorTitle: "Error",
        errorMessage: "Failed to send the signature.",
        responseTitle: "Response",
        incorrectAnswer: "Answer is Incorrect",
        correctAnswer: "Your answer is Correct",
        tryAgain: "Try Again",
        next: "Next",
        congratulations: "Congratulations",
        allLettersCompleted: "You have completed all letters!",
        unexpectedResponse: "Unexpected Response",
        instruction: "Instruction"
    },
    Tamil: {
        title: "தமிழ் எழுத்து\n எழுத",
        vowelTitle: "உயிர் எழுத்துகள்",
        consonantTitle: "மெய் எழுத்துகள்",
        write: "எழுதுக",
        clear: "நீக்கு",
        submit: "சமர்ப்பி",
        skip: "தவிர்",
        noSignature: "எழுத்து இல்லை",
        noSignatureMessage: "சமர்ப்பிக்கும் முன் எழுத்து எழுதவும்.",
        errorTitle: "பிழை",
        errorMessage: "எழுத்து அனுப்புவதில் தோல்வி.",
        responseTitle: "பதில்",
        incorrectAnswer: "பதில் தவறாக உள்ளது",
        correctAnswer: "உங்கள் பதில் சரியாக உள்ளது",
        tryAgain: "மீண்டும் முயற்சிக்கவும்",
        next: "அடுத்து",
        congratulations: "வாழ்த்துக்கள்",
        allLettersCompleted: "நீங்கள் எல்லா எழுத்துகளையும் முடித்துவிட்டீர்கள்!",
        unexpectedResponse: "எதிர்பாராத பதில்",
        instruction: "அறிவுறுத்தல்கள்"
    }
};

const videoMapping = {
    'அ': require('../../assets/Letter writing videos/Vowel letters/a.mp4'),
    'ஆ': require('../../assets/Letter writing videos/Vowel letters/aa.mp4'),
    'இ': require('../../assets/Letter writing videos/Vowel letters/e.mp4'),
    'ஈ': require('../../assets/Letter writing videos/Vowel letters/ee.mp4'),
    'உ': require('../../assets/Letter writing videos/Vowel letters/u.mp4'),
    'ஊ': require('../../assets/Letter writing videos/Vowel letters/uu.mp4'),
    'எ': require('../../assets/Letter writing videos/Vowel letters/ae.mp4'),
    'ஏ': require('../../assets/Letter writing videos/Vowel letters/aee.mp4'),
    'ஐ': require('../../assets/Letter writing videos/Vowel letters/i.mp4'),
    'ஒ': require('../../assets/Letter writing videos/Vowel letters/o.mp4'),
    'ஓ': require('../../assets/Letter writing videos/Vowel letters/oo.mp4'),
    'ஔ': require('../../assets/Letter writing videos/Vowel letters/ou.mp4'),
    'க்': require('../../assets/Letter writing videos/Consonant letters/k.mp4'),
    'ங்': require('../../assets/Letter writing videos/Consonant letters/ng.mp4'),
    'ச்': require('../../assets/Letter writing videos/Consonant letters/ch.mp4'),
    'ஞ்': require('../../assets/Letter writing videos/Consonant letters/nj.mp4'),
    'ட்': require('../../assets/Letter writing videos/Consonant letters/t.mp4'),
    'ண்': require('../../assets/Letter writing videos/Consonant letters/nn.mp4'),
    'த்': require('../../assets/Letter writing videos/Consonant letters/th.mp4'),
    'ந்': require('../../assets/Letter writing videos/Consonant letters/ndh.mp4'),
    'ப்': require('../../assets/Letter writing videos/Consonant letters/p.mp4'),
    'ம்': require('../../assets/Letter writing videos/Consonant letters/m.mp4'),
    'ய்': require('../../assets/Letter writing videos/Consonant letters/yi.mp4'),
    'ர்': require('../../assets/Letter writing videos/Consonant letters/r.mp4'),
    'ல்': require('../../assets/Letter writing videos/Consonant letters/l.mp4'),
    'வ்': require('../../assets/Letter writing videos/Consonant letters/v.mp4'),
    'ழ்': require('../../assets/Letter writing videos/Consonant letters/lll.mp4'),
    'ள்': require('../../assets/Letter writing videos/Consonant letters/ll.mp4'),
    'ற்': require('../../assets/Letter writing videos/Consonant letters/tr.mp4'),
    'ன்': require('../../assets/Letter writing videos/Consonant letters/n.mp4'),
};

const beepSound = require('../../assets/beep.mp3'); // Ensure you have a beep sound in the correct path

const SoundVowelScreen = ({ route }) => {
    const { category, language } = route.params;
    const ref = useRef();
    const [signature, setSignature] = useState(null);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [toastShown, setToastShown] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sound, setSound] = useState(null);
    const videoRef = useRef(null);

    // const texts = translations[language] || translations.English;
    const texts = translations.English;
   // console.log("Language", language);

    const vowelLetters = [
        'அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ',
        'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'
    ];

    const expectedVowelResponses = [
        'A', 'AA', 'E', 'EE', 'U', 'UU',
        'AE', 'AEE', 'I', 'O', 'OO', 'OU'
    ];

    const consonantLetters = [
        'க்', 'ங்', 'ச்', 'ஞ்', 'ட்', 'ண்', 'த்', 'ந்',
        'ப்', 'ம்', 'ய்', 'ர்', 'ல்', 'வ்', 'ழ்', 'ள்', 'ற்', 'ன்'
    ];

    const expectedConsonantResponses = [
        'k', 'ng', 'ch', 'nj', 't', 'nn', 'th', 'ndh',
        'p', 'm', 'yi', 'r', 'l', 'v', 'lll', 'll', 'tr', 'n'
    ];

    const letters = category === 'vowel' ? vowelLetters : consonantLetters;
    const expectedResponses = category === 'vowel' ? expectedVowelResponses : expectedConsonantResponses;

    const handleSignature = signature => {
        console.log(signature);
        setSignature(signature);
    };

    const handleEmpty = () => {
        console.log('Empty');
    };

    const handleClear = () => {
        ref.current.clearSignature();
        setSignature(null);
        setToastShown(false);
        console.log('clear success!');
    };

    const handleEnd = () => {
        ref.current.readSignature();
    };

    const handleSave = async () => {
        if (signature) {
            try {
                const base64Code = signature.split('data:image/png;base64,')[1];
                const path = `${FileSystem.documentDirectory}signature.jpg`;
                await FileSystem.writeAsStringAsync(path, base64Code, { encoding: FileSystem.EncodingType.Base64 });

                const formData = new FormData();
                formData.append("image", {
                    uri: path,
                    name: "image.jpg",
                    type: "image/jpeg",
                });
                // Calling hosted APIs 
                const apiUrl = category === 'vowel'
                    ? "http://13.51.198.180/tamilLetter"
                    : "http://13.51.198.180/tamilConsonantLetter";

                const response = await fetch(apiUrl, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const responseJson = await response.json();
                    console.log('response: ', responseJson.defectiveness);
                    console.log('letter: ', currentLetterIndex);
                    if (responseJson.defectiveness === "No defect found") {
                        Alert.alert(
                            texts.responseTitle,
                            texts.incorrectAnswer,
                            [
                                { text: texts.tryAgain, onPress: handleClear }
                            ]
                        );
                    } else if (responseJson.defectiveness === expectedResponses[currentLetterIndex]) {
                        Alert.alert(
                            texts.responseTitle,
                            texts.correctAnswer,
                            [
                                {
                                    text: texts.next, onPress: () => {
                                        if (currentLetterIndex < letters.length - 1) {
                                            setCurrentLetterIndex(currentLetterIndex + 1);
                                        } else {
                                            Alert.alert(texts.congratulations, texts.allLettersCompleted);
                                        }
                                        handleClear();
                                    }
                                }
                            ]
                        );
                    } else {
                        Alert.alert(
                            texts.responseTitle,
                            texts.incorrectAnswer,
                            [
                                { text: texts.tryAgain, onPress: handleClear }
                            ]
                        );
                    }
                } else {
                    console.log('response', response);
                    const responseText = await response.text();
                    Alert.alert(texts.unexpectedResponse, responseText);
                }
            } catch (error) {
                console.error('Error sending signature:', error);
                Alert.alert(texts.errorTitle, texts.errorMessage);
            }
        } else {
            Alert.alert(texts.noSignature, texts.noSignatureMessage);
        }
    };

    const handleSkip = () => {
        if (currentLetterIndex < letters.length - 1) {
            setCurrentLetterIndex(currentLetterIndex + 1);
        } else {
            Alert.alert(texts.congratulations, texts.allLettersCompleted);
        }
        handleClear();
    };

    const handleDrawingOutside = async () => {
        Vibration.vibrate(500);
        if (!toastShown) {
            ToastAndroid.showWithGravityAndOffset(
                "Out of area",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            setToastShown(true);
        }

        const { sound } = await Audio.Sound.createAsync(beepSound);
        setSound(sound);
        await sound.playAsync();
    };

    const handleTouch = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        const { height, width } = styles.signatureContainer;

        if (locationX <= 0 || locationY <= 0 || locationX > width || locationY > height) {
            handleDrawingOutside();
        }
    };

    const handlePlayPause = () => {
        setIsModalVisible(true);
        setIsVideoPlaying(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsVideoPlaying(false);
    };

    React.useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Text style={styles.textTopic}>{texts.title}</Text>
            {category === 'vowel' ? (
                <>
                    <Text style={styles.vowelText}>{texts.vowelTitle}</Text>
                </>
            ) : category === 'consonant' ? (
                <>
                    <Text style={styles.vowelText}>{texts.consonantTitle}</Text>
                </>
            ) : null}

            <Image style={styles.dashImg} source={require('../../assets/write.png')} />

            <View style={styles.overlay}>
                <Text style={styles.card1Text}><Text style={{ color: "#4D86F7", fontSize: 45, fontWeight: '600' }}>{texts.write}</Text> {letters[currentLetterIndex]}</Text>

                <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
                    <Text style={styles.playButtonText}>{texts.instruction}</Text>
                    <Entypo name="controller-play" size={24} color="black" />
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                            <Video
                                ref={videoRef}
                                source={videoMapping[letters[currentLetterIndex]]}
                                style={styles.video}
                                resizeMode="contain"
                                useNativeControls={true}
                                isLooping
                                shouldPlay={isVideoPlaying}
                            />
                        </View>
                    </View>
                </Modal>

                <View style={styles.signatureContainer} onTouchMove={handleTouch}>
                    <Signature
                        ref={ref}
                        onOK={handleSignature}
                        onEmpty={handleEmpty}
                        descriptionText="Sign"
                        clearText="Clear"
                        confirmText="Save"
                        penColor="black"
                        dotSize={5}
                        minWidth={5}
                        maxWidth={5}
                        onEnd={handleEnd}
                        backgroundColor="white"
                        webStyle={`.m-signature-pad--body {background: white;} .m-signature-pad--footer {display: none; margin: 0px;}`}
                        style={styles.signatureCanvas}
                    />
                </View>

                <TouchableOpacity onPress={handleClear} style={styles.eraseButton}>
                    <Text style={styles.eraseButtonText}>{texts.clear}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>{texts.submit}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                    <Text style={styles.skipButtonText}>{texts.skip}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#4D86F7',
    },
    dashImg: {
        left: '70%',
        top: '-10.6%',
        width: '25%',
        height: '22%',
    },
    textTopic: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 35,
        color: '#FFD166',
        top: '0%',
    },
    vowelText: {
        left: '5%',
        fontWeight: '600',
        fontSize: 25,
        color: '#FFD166',
        top: '5%',
    },
    card1Text: {
        fontSize: 60,
        alignSelf: 'center',
        fontWeight: '400',
        top: '0%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '28%',
        height: 'auto',
        borderRadius: 85,
        flex: 1,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    signatureContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        borderWidth: 5,
        borderColor: '#000',
        height: 250,
        borderRadius: 10,
    },
    signatureCanvas: {
        flex: 1,
        borderRadius: 10,
    },
    eraseButton: {
        marginTop: 20,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#FF5A5F',
        borderRadius: 10,
        alignItems: 'center',
        width: '40%'
    },
    eraseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        marginTop: 20,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        alignItems: 'center',
        bottom: '13%',
        width: '40%',
        left: '50%'
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    skipButton: {
        padding: 10,
        backgroundColor: '#FF8C00',
        borderRadius: 10,
        alignItems: 'center',
        width: '40%',
        alignSelf: 'center',
        bottom: '7%'
    },
    skipButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    playButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    playButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 180,
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#FF5A5F',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SoundVowelScreen;
