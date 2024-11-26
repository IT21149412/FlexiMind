import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TamilScreen = ({ handleNext }) => (
    <View style={styles.container}>
        <Text style={styles.textTopicT}>அருமையான வேலை, வார்த்தை வழிகாட்டி!!</Text>
        <Image style={styles.bgImg} source={require('../assets/bg.jpg')} />
        <View style={styles.overlay}></View>
        <Image style={styles.dashImg} source={require('../assets/Celebrate.png')} />
        <Text style={styles.contentT}>
        ஏய், வார்த்தை வழிகாட்டி! 🧙‍♂️ சூப்பர் வேடிக்கையான சவாலுக்கு நீங்கள் தயாரா? பலகையில் உள்ள வார்த்தைகளைப் பார்த்து, மேலே நீங்கள் பார்ப்பது போன்ற ஒன்றைக் கண்டறியவும்! உங்கள் அற்புதமான பொருந்தக்கூடிய திறன்களைக் காட்டுங்கள்! தொடங்குவோம்!
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>அடுத்தது</Text>
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
        fontSize: 25,
        color: '#FFD166',
        marginTop: '12%',
        marginBottom: '0%',
    },
    contentT: {
        textAlign: 'center',
        fontSize: 15,
        color: '#16397F',
        marginHorizontal: '7%',
        marginTop: '1%',
        marginBottom: '5%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '15.5%',
        height: '80%',
        borderRadius: 85,
    },
    nextButton: {
        backgroundColor: '#FFD166',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: '3%',
    },
    nextButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    dashImg: {
        alignSelf: 'center',
        marginTop: '10%',
        width: '100%',
        height: '50%',
    },
});

export default TamilScreen;
