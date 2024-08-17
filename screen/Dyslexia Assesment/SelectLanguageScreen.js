import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const DA_SelectLanguage = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleSelectLanguage = (language) => {
        setSelectedLanguage(language);
    }

    const handleNext = () => {
        if (selectedLanguage) {
            navigation.navigate('DA_ParentConsentScreen', {
                language: selectedLanguage,
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTopic}>Select Your Child's Preferred Language...</Text>
            <Image style={styles.bgImg} source={require('../../assets/bg.jpg')}></Image>
            <View style={styles.overlay}></View>
            <Text style={styles.languageDescription}>Choose the language your child is most comfortable with for the activities ahead. This selection will ensure a smoother experience tailored to your child's needs.</Text>
            <Text style={styles.languageDescription}>வரவிருக்கும் செயல்பாடுகளுக்காக உங்கள் பிள்ளைக்கு மிகவும் வசதியாக இருக்கும் மொழியைத் தேர்ந்தெடுக்கவும். இந்தத் தேர்வு உங்கள் குழந்தையின் தேவைகளுக்கு ஏற்ப ஒரு மென்மையான அனுபவத்தை உறுதி செய்யும்.</Text>

            <View style={styles.languageContainer}>
                <TouchableOpacity
                    style={[styles.languageButton, selectedLanguage === 'TAMIL' ? styles.selectedLanguage : null]}
                    onPress={() => handleSelectLanguage('TAMIL')}
                >
                    {selectedLanguage === 'TAMIL' && <View style={styles.circle}><Text style={styles.tick}>&#10004;</Text></View>}
                    <Text style={styles.languageButtonText}>TAMIL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.languageButton, selectedLanguage === 'ENGLISH' ? styles.selectedLanguage : null]}
                    onPress={() => handleSelectLanguage('ENGLISH')}
                >
                    {selectedLanguage === 'ENGLISH' && <View style={styles.circle}><Text style={styles.tick}>&#10004;</Text></View>}
                    <Text style={styles.languageButtonText}>ENGLISH</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#4D86F7',
        alignItems: 'center',
    },
    bgImg: {
        position: 'absolute',
        top: '15.4%',
        width: '100%',
        height: '100%',
        zIndex: -1,
        resizeMode: 'cover',
        borderWidth: 1,
        borderRadius: 85,
    },
    textTopic: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#FFD166',
        marginTop: '10%',
        marginBottom: '5%',
    },
    languageDescription: {
        textAlign: 'center',
        fontSize: 18,
        // fontWeight: 'bold',
        color: '#16397F',
        marginHorizontal: '5%',
        marginTop: '12%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '15.5%',
        height: '80%',
        borderRadius: 85,
    },
    languageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '8%',
        zIndex: 1,
    },
    languageButton: {
        backgroundColor: '#6ECB63',
        paddingVertical: '4%',
        paddingHorizontal: '8%',
        borderRadius: 10,
        marginHorizontal: '3%',
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedLanguage: {
        backgroundColor: '#003f5c',
    },
    languageButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF',
        
    },
    tick: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    circle: {
        marginRight: 5,
        backgroundColor: '#003f5c',
        borderRadius: 50,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#4D86F7',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: '10%',
    },
    nextButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});

export default DA_SelectLanguage;
