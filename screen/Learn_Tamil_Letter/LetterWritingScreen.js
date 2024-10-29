import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const LetterWritingScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    //const language = useSelector((state) => state.settings.language); // Get language from Redux
    const language = useSelector((state) => state.language.currentLanguage);
    useEffect(() => {
        if (language) {
            i18n.changeLanguage(language); // Set i18n language based on Redux state
        }

        console.log('selected language:', language)
    }, [language, i18n]);

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const handleVowel = () => {
        navigation.navigate('WritingLetter', { category: 'vowel' });
    };

    const handleConsonant = () => {
        navigation.navigate('WritingLetter', { category: 'consonant' });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTopic}>{t('title')}</Text>
            <Image style={styles.bgImg} source={require('../../assets/bg.jpg')} />
            <View style={styles.overlay} />
            <Image style={styles.dashImg} source={require('../../assets/write2.png')} />

            <View style={styles.ellipse}>
                <Text style={styles.text}>{t('number1')}</Text>
            </View>

            <View style={styles.rectangle1}>
                <TouchableOpacity onPress={handleVowel}>
                    <Text style={styles.text1}>{t('vowel')}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line1} />

            <View style={styles.ellipse2}>
                <Text style={styles.text}>{t('number2')}</Text>
            </View>

            <View style={styles.rectangle2}>
                <TouchableOpacity onPress={handleConsonant}>
                    <Text style={styles.text1}>{t('consonant')}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line2} />

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
        top: '15.5%',
        width: '100%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 90,
    },
    dashImg: {
        left: '5%',
        top: '-76%',
        width: '40%',
        height: '25%',
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
    ellipse: {
        position: 'absolute',
        width: 64,
        height: 65,
        left: '5%',
        top: '50%',
        backgroundColor: '#FFD166',
        borderRadius: 34,
    },
    ellipse2: {
        position: 'absolute',
        width: 64,
        height: 65,
        left: '5%',
        top: '75%',
        backgroundColor: '#FFD166',
        borderRadius: 34,
    },
    text: {
        position: 'absolute',
        left: '25%',
        top: '-15%',
        fontWeight: '800',
        fontSize: 60,
        color: '#FFFFFF',
    },
    rectangle1: {
        position: 'absolute',
        width: 220,
        height: 100,
        right: '5%',
        top: '48%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    rectangle2: {
        position: 'absolute',
        width: 220,
        height: 100,
        right: '5%',
        top: '73%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    text1: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 25,
        color: '#FFD166',
    },
    line1: {
        position: 'absolute',
        width: 74.5,
        height: 0,
        left: '20%',
        top: '55%',
        borderTopWidth: 4,
        borderStyle: 'solid',
        borderColor: '#FFD166',
        transform: [{ rotate: '1.06deg' }],
    },
    line2: {
        position: 'absolute',
        width: 74.5,
        height: 0,
        left: '20%',
        top: '80%',
        borderTopWidth: 4,
        borderStyle: 'solid',
        borderColor: '#FFD166',
        transform: [{ rotate: '1.06deg' }],
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '28%',
        height: '80%',
        borderRadius: 85,
    }
});

export default LetterWritingScreen;
