import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Audio } from 'expo-av';

const SoundVowelScreen = ({route}) => {
    const { category, language } = route.params;
    console.log("Screen ", category);
    console.log("Language", language);


    const handleSpeak1 = async (soundFile) => {
        const soundObject = new Audio.Sound();

        try {
            await soundObject.loadAsync(soundFile);
            await soundObject.playAsync();
        } catch (error) {
            console.error("Error playing sound", error);
        }
    };

    const renderText = (english, tamil) => {
        return language === 'Tamil' ? tamil : english;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTopic}>
                {/* {renderText('TAMIL LETTER\n SOUNDS', 'தமிழ் எழுத்து \nஒலிகள்')} */}
                {'தமிழ் எழுத்து \nஒலிகள்'}
            </Text>
            {category === 'vowel' ? (
                <>
                    <Text style={styles.vowelText}>
                        {/* {renderText('Vowel Letters', 'உயிர் \nஎழுத்துக்கள்')} */}
                        {'உயிர் \nஎழுத்துக்கள்'}
                    </Text>
                </>
            ) : category === 'consonant' ? (
                <>
                    <Text style={styles.vowelText}>
                        {/* {renderText('Consonant Letters', 'மெய் \nஎழுத்துக்கள்')} */}
                        {'மெய் \nஎழுத்துக்கள்'}
                    </Text>
                </>
            ) : null}

            <Image style={styles.dashImg} source={require('../../assets/music.png')}></Image>
            <ScrollView style={styles.overlay}>
                {category === 'vowel' && (
                    <>
                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/A - அ.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>அ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/AA - ஆ.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ஆ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/E - இ.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>இ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/EE - ஈ.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ஈ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/U - உ.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>உ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/UU - ஊ.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ஊ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/AE - எ.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>எ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/AEE - ஏ.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ஏ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/I - ஐ.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>ஐ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/O - ஒ.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ஒ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/OO - ஓ.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>ஓ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Vowel-Letter-Sounds/OU - ஔ.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ஔ</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}

                {category === 'consonant' && (
                    <>
                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/k-க்.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>க்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/ng-ங்.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ங்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/ch-ச்.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>ச்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/nch - ஞ்.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ஞ்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/t-ட்.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>ட்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/nn-ண்.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ண்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/th - த்.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>த்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/ndh - ந்.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ந்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/p - ப்.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>ப்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/m - ம்.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ம்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/yi - ய்.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>ய்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/r - ர்.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ர்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/l - ல்.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>ல்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/v - வ்.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>வ்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/lll - ழ்.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>ழ்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/ll - ள்.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ள்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/tr - ற்.mp3'))}>
                            <View style={styles.card1}>
                                <Text style={styles.card1Text}>ற்</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSpeak1(require('../../assets/Tamil-Consonant-Letter-Sounds/n - ன்.mp3'))}>
                            <View style={styles.card2}>
                                <Text style={styles.card1Text}>ன்</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}

            </ScrollView>
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
        top: '15.5%',
        width: '100%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 90,
    },
    dashImg: {
        left: '59%',
        top: '-6.6%',
        width: '40%',
        height: '20%',
    },
    textImg: {
        alignSelf: 'center',
        top: '-95%',
        width: '90%',
        height: '7%',
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
    vowelText: {
        left: '5%',
        fontWeight: '600',
        fontSize: 25,
        color: '#FFD166',
        top: '5%'
    },
    card1: {
        alignSelf: 'center',
        marginTop: 50,
        width: 305,
        height: 132,
        backgroundColor: 'rgba(255, 209, 102, 0.3)',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card1Text: {
        fontSize: 95,
        alignSelf: 'center',
        fontWeight: '400',
        height: '100%',
        top: '0%'
    },
    card2: {
        alignSelf: 'center',
        marginTop: 50,
        width: 305,
        height: 132,
        backgroundColor: 'rgba(255, 209, 102, 0.5)',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        top: '28%',
        height: 'auto',
        borderRadius: 85,
        flex: 1,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
});
export default SoundVowelScreen;
