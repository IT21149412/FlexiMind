import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TamilScreen = ({ toggleConsent, consent, handleNext }) => (
    <View style={styles.container}>
        <Text style={styles.textTopicT}>உங்கள் பிள்ளையின் டிஸ்லெக்ஸியா மதிப்பீட்டு பயணம் இங்கே தொடங்குகிறது...</Text>
        <Image style={styles.bgImg} source={require('../assets/bg.jpg')}></Image>
        <View style={styles.overlay}></View>
        <Text style={styles.contentT}>
            "தொடங்கத் தயாரா? 'தொடங்கவும்' என்பதைத் தட்டி, சாதனத்தை உங்கள் குழந்தையிடம் ஒப்படைக்கவும். துப்பறியும் நபர்கள் மர்மத்தைத் தீர்ப்பது போல, டிஸ்லெக்ஸியாவை நன்றாகப் புரிந்துகொள்ள உதவும் வகையில் எங்கள் செயல்பாடுகள் கவனமாக வடிவமைக்கப்பட்டுள்ளன!
            கவலைப்பட வேண்டாம், நாங்கள் உங்கள் ஆதரவைப் பெற்றுள்ளோம். நாங்கள்  ஆரம்பிக்க முன், கீழே உள்ள Button டிக் செய்வதன் மூலம் உங்களுடனும் உங்கள் குழந்தையின் நம்பகமான மனநல மருத்துவருடனும் விரிவான முடிவுகளைப் பகிர்ந்து கொள்ள உங்கள் ஒப்புதலை எங்களுக்கு வழங்கவும்.
            ஒவ்வொரு அடியிலும் உங்களுக்கு ஆதரவாக நாங்கள் இருக்கிறோம். இந்த முக்கியமான பயணத்தில் எங்களை நம்பியதற்கு நன்றி!"
        </Text>
        <TouchableOpacity style={styles.consentButton} onPress={toggleConsent}>
            <View style={[styles.checkbox, consent ? styles.checked : null]}></View>
            <Text style={styles.consentText}>
                "முடிவுகளை விரிவாக கதிராக்க, அவனது மனநல மருத்துவருடனும் நானும் (பாதுகாக்கினராக) விவரவாய்வை பகிரும்படிக்கு ஒப்புதல்."
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.nextButton, { opacity: consent ? 1 : 0.5 }]}
            onPress={handleNext}
            disabled={!consent} // Disable the button if consent is not given
        >
            <Text style={styles.nextButtonText}>தொடங்கவும்</Text>
        </TouchableOpacity>
    </View>
);

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
    textTopicT: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#FFD166',
        marginTop: '12%',
        marginBottom: '5%',
    },
    contentT: {
        textAlign: 'justify',
        fontSize: 18,
        color: '#16397F',
        marginHorizontal: '5%',
        marginTop: '20%',
        marginBottom: '5%',

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '15.5%',
        height: '80%',
        borderRadius: 85,
    },
    consentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C0BFBF',
        backgroundColor: '#C0BFBF',
        marginRight: '5%',
        marginLeft: '15%',
    },
    checked: {
        backgroundColor: '#FFD166',
        borderWidth: 5,
    },
    consentText: {
        textAlign: 'justify',
        fontSize: 14,
        color: '#4C7FE4',
        marginRight: '15%',
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

export default TamilScreen;
