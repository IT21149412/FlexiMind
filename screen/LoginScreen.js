import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const tryAutoLogin = async () => {
            try {
                const storedEmail = await SecureStore.getItemAsync('email');
                const storedPassword = await SecureStore.getItemAsync('password');

                if (storedEmail && storedPassword) {
                    setEmail(storedEmail);
                    setPassword(storedPassword);
                    handleLogin();
                }
            } catch (error) {
                console.error('Error reading stored credentials:', error);
            }
        };

        tryAutoLogin();
    }, []);

    const saveCredentials = async (email, password) => {
        try {
            await SecureStore.setItemAsync('email', email);
            await SecureStore.setItemAsync('password', password);
        } catch (error) {
            console.error('Error saving credentials:', error);
        }
    };

    const handleLogin = () => {
        if (email.length === 0 || password.length === 0) {
            console.log('Please enter Email and Password');
            const value = "Please enter Email and Password";
            ToastAndroid.showWithGravityAndOffset(
                value,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // User logged in successfully
                    console.log('Login Successful!');
                    const value = "Login Successful!";
                    ToastAndroid.showWithGravityAndOffset(
                        value,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    saveCredentials(email, password);


                    navigation.navigate('Home'); 
                })
                .catch(error => {
                    // Handle login errors (e.g., incorrect email or password)
                    if (error.code === 'auth/invalid-credential') {
                        const value = "Incorrect Email or Password";
                        ToastAndroid.showWithGravityAndOffset(
                            value,
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }
                    if (error.code === 'auth/too-many-requests') {
                        const value = "Login disabled due to many attempts. Reset password or retry later.";
                        ToastAndroid.showWithGravityAndOffset(
                            value,
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            50,
                            50
                        );
                    }
                })
                .finally(() => {
                    setLoading(false); 
                });
        }
    }
    const handleCreate = () => {
        navigation.navigate('Register');
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.textTopic}>Login</Text>
                <Image style={styles.bgImg} source={require('../assets/bg.jpg')}></Image>
                <View style={styles.overlay}></View>
                <Text style={styles.textWelcome}>Welcome back to FlexiMind</Text>
                <Text style={styles.textEmail}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Text style={styles.textEmail}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                    {showPassword ? (
                        <Image
                            source={require('../assets/eye.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    ) : (
                        <Image
                            source={require('../assets/eyeClose.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={styles.loginTxt}>Login</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.createAcc} onPress={handleCreate}>
                    <Text style={styles.createTxt}>Create an account?</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        
    },
    container: {
        position: 'relative',
        width: 'auto',
        height: 800,
        backgroundColor: '#4D86F7',
    },
    bgImg: {
        alignSelf: 'center',
        top: '15%',
        width: '100%',
        height: '90%',
        borderWidth: 1,
        borderRadius: 90,
    },
    textTopic: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 35,
        color: '#FFD166',
        top: '12%'
    },
    textWelcome: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 25,
        color: '#4D86F7',
        bottom: '70%'
    },
    textEmail: {
        left: '11%',
        fontWeight: '900',
        fontSize: 25,
        color: '#05056E',
        bottom: '60%'
    },
    input: {
        bottom: '60%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderColor: '#05056E',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: 300,
        left: '11%',
    },

    eyeIcon: {
        position: 'absolute',
        right: '15%',
        bottom: '40%'
    },
    eyeIconText: {
        fontSize: 20,
    },
    loginBtn: {
        alignSelf: 'center',
        bottom: '55%',
        backgroundColor:'#4D86F7',
        width: '30%',
        height: '5%',
        padding: 10,
        borderRadius: 10
    },
    loginTxt: {
        color: '#FFD166',
        fontSize: 15,
        height: 37.5,
        textAlign: 'center',
        fontWeight: '800'
    },

    createAcc: {
        alignSelf: 'center',
        bottom: '50%',
        borderRadius: 10
    },
    createTxt: {
        color: '#4D86F7',
        fontSize: 15,
        height: 37.5,
        textAlign: 'center',
        fontWeight: '800'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '21%',
        height: '90%',
        borderRadius: 85,
    }
});

export default LoginScreen;
