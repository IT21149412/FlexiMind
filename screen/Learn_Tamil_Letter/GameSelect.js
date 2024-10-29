import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Easing } from 'react-native';

const GameSelectScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-100)).current;

    const handleLevelSelect = (screen, level) => {
        setModalVisible(false);
        if (level) {
            navigation.navigate(screen, { level: level });
        } else {
            navigation.navigate(screen);
        }
    };

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Game to Play</Text>

            <TouchableOpacity style={styles.button} onPress={openModal}>
                <Text style={styles.buttonText}>Select Letter Game</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleLevelSelect('FirstLetterGame')}>
                <Text style={styles.buttonText}>First Letter Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleLevelSelect('MatchingLettersGameScreen')}>
                <Text style={styles.buttonText}>Matching Letters Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleLevelSelect('SelectWordGameScreen')}>
                <Text style={styles.buttonText}>Select the Correct Word Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Text style={styles.closeButtonText}>BACK</Text>
            </TouchableOpacity>

            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
                    <Animated.View style={[styles.modalView, { transform: [{ translateY: slideAnim }] }]}>
                        <Text style={styles.modalTitle}>Select Level</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleLevelSelect('Game', 'Basic')}>
                            <Text style={styles.modalButtonText}>Basic Level</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleLevelSelect('Game', 'Medium')}>
                            <Text style={styles.modalButtonText}>Medium Level</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleLevelSelect('Game', 'Hard')}>
                            <Text style={styles.modalButtonText}>Hard Level</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4D86F7',
        padding: 20,
    },
    title: {
        fontSize: 32,
        marginBottom: 30,
        textAlign: 'center',
        color: '#FFD166',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FFD166',
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        color: '#4D86F7',
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 30,
    },
    closeButtonText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: 320,
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    modalButton: {
        backgroundColor: '#FFD166',
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        elevation: 5,
    },
    modalButtonText: {
        color: '#4D86F7',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GameSelectScreen;
