import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const EnglishScreen = ({ toggleConsent, consent, handleNext }) => {
    const [childName, setChildName] = useState('');
    const [childAge, setChildAge] = useState('');
    const [guardianEmail, setGuardianEmail] = useState('');
    const [psychiatristEmail, setPsychiatristEmail] = useState('');
    const [keyword, setKeyword] = useState('');
    const [modalVisible, setModalVisible] = useState(true); // Show modal on load

    const isFormValid = () => {
        const age = parseInt(childAge, 10);
        return consent && childName.length > 0 && age >= 6 && age <= 10 && guardianEmail.length > 0 && psychiatristEmail.length > 0 && keyword.length > 0;
    };

    useEffect(() => {
        setModalVisible(true);
    }, []);

    const handleAgree = () => {
        setModalVisible(false);
        toggleConsent();
    };

    const handleAgeCheckbox = (age) => {
        setChildAge(age);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTopicE}>Your Child's Dyslexia Assessment Journey Begins Here...</Text>
            <Image style={styles.bgImg} source={require('../assets/bg.jpg')} />
            <View style={styles.overlay}></View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Child's Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your child's name"
                    value={childName}
                    onChangeText={setChildName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Select Child's Age (6-10)</Text>
                <View style={styles.ageOptions}>
                    <TouchableOpacity
                        style={[styles.ageOption, childAge === '6' ? styles.selectedAgeOption : null]}
                        onPress={() => handleAgeCheckbox('6')}
                    >
                        <Text style={styles.ageOptionText}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.ageOption, childAge === '7' ? styles.selectedAgeOption : null]}
                        onPress={() => handleAgeCheckbox('7')}
                    >
                        <Text style={styles.ageOptionText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.ageOption, childAge === '8' ? styles.selectedAgeOption : null]}
                        onPress={() => handleAgeCheckbox('8')}
                    >
                        <Text style={styles.ageOptionText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.ageOption, childAge === '9' ? styles.selectedAgeOption : null]}
                        onPress={() => handleAgeCheckbox('9')}
                    >
                        <Text style={styles.ageOptionText}>9</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.ageOption, childAge === '10' ? styles.selectedAgeOption : null]}
                        onPress={() => handleAgeCheckbox('10')}
                    >
                        <Text style={styles.ageOptionText}>10</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Guardian's Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter guardian's email"
                    value={guardianEmail}
                    onChangeText={setGuardianEmail}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Psychiatrist's Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter psychiatrist's email"
                    value={psychiatristEmail}
                    onChangeText={setPsychiatristEmail}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Keyword</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a keyword"
                    value={keyword}
                    onChangeText={setKeyword}
                />
            </View>
            <TouchableOpacity
                style={[styles.nextButton, { opacity: isFormValid() ? 1 : 0.5 }]}
                onPress={handleNext}
                disabled={!isFormValid()}
            >
                <Text style={styles.nextButtonText}>BEGIN</Text>
            </TouchableOpacity>
            <Image style={styles.dashImg} source={require('../assets/learn.png')} />
    
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            "Ready to start? Enter the required details and tap 'Begin' and hand the device over to your child. Our activities are carefully crafted to help us understand dyslexia better, like detectives solving a mystery! But don't worry, we've got your back. Before we dive in, please give us your consent to share detailed results with you and your child's trusted psychiatrist by ticking the button below. We're here to support you every step of the way. Thanks for trusting us with this important journey!"
                        </Text>
                        <TouchableOpacity style={styles.consentButton} onPress={toggleConsent}>
                            <View style={[styles.checkbox, consent ? styles.checked : null]}></View>
                            <Text style={styles.consentText}>
                                "I consent to sharing detailed assessment results with both myself (as the guardian) and my child's psychiatrist for further support and guidance."
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleAgree}>
                                <Text style={styles.modalButtonText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    textTopicE: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#FFD166',
        marginTop: '10%',
        marginBottom: '5%',
    },
    contentButton: {
        marginHorizontal: '5%',
        marginTop: '3%',
        marginBottom: '8%',
    },
    contentButtonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#16397F',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '15.5%',
        height: '80%',
        borderRadius: 85,
    },
    inputContainer: {
        width: '70%',
        height: '5%',
        marginTop: '10%'
    },
    inputLabel: {
        fontSize: 16,
        color: '#16397F',
        marginBottom: '2%',
    },
    input: {
        height: 35,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
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
        marginRight: '5%',
    },
    checked: {
        backgroundColor: '#FFD166',
        borderWidth: 5,
    },
    consentText: {
        fontSize: 14,
        color: '#4C7FE4',
        marginBottom: '10%',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#16397F',
        textAlign: 'justify',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4D86F7',
        borderRadius: 5,
        marginHorizontal: '30%',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    ageOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%',
    },
    ageOption: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    ageOptionText: {
        color: '#16397F',
        fontSize: 16,
    },
    selectedAgeOption: {
        borderColor: '#4D86F7',
    },
    
    dashImg: {
        alignSelf: 'center',
        marginTop: '1%',
        width: '45%',
        height: '25%',
    },
});

export default EnglishScreen;
