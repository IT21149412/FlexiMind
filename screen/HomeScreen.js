import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const DashboardHome = ({navigation}) => {

    const handleDyslexia = () => {
        navigation.navigate('DA_SelectLanguage');
    }

    const handleLearn = () => {
        //Navigate your screens
    }

    const handleMaths = () => {
        //Navigate your screens
    }

    const handleRemedial = () => {
        navigation.navigate('Language');
    }

    return (
        <View style={styles.container}>
        <Text style={styles.textTopic}>FlexiMind</Text>
            <Image style={styles.bgImg} source={require('../assets/bg.jpg')}></Image>
            <View style={styles.overlay}></View>
            <Image style={styles.dashImg} source={require('../assets/dashboard.png')}></Image>
             <View style={styles.rectangle1}>
             <View style={styles.orangeCircle1}>
                <View style={styles.whiteCircle1}></View>
             </View>
                <Text style={styles.dyslexia} onPress={handleDyslexia}>Dyslexia Assessment</Text>
             </View>

            <View style={styles.rectangle2}>
                <View style={styles.orangeCircle2}>
                    <View style={styles.whiteCircle2}></View>
                </View>
                <Text style={styles.learn} onPress={handleLearn}>Learn Tamil Letters</Text>
            </View>

            <View style={styles.rectangle3}>
                <View style={styles.orangeCircle3}>
                    <View style={styles.whiteCircle3}></View>
                </View>
                <Text style={styles.eduTrack} onPress={handleMaths}>EduTrack and{'\n'} MathHands</Text>
            </View>

            <View style={styles.rectangle4}>
                <View style={styles.orangeCircle4}>
                    <View style={styles.whiteCircle4}></View>
                </View>
                <Text style={styles.remedial} onPress={handleRemedial}>Words and Sentence{'\n'} construction</Text>
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
        top: '22%',
        width: '100%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 90,
    },
    dashImg: {
        alignSelf: 'center',
        top: '-73%',
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
        top: '8%'
    },
    rectangle1: {
        position: 'absolute',
        width: 320,
        height: 49,
        left: 28,
        top: '40%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    dyslexia: {
        left: 70,
        fontWeight: '900',
        fontSize: 25,
        color: '#FFD166',
        top: 5
    },
    orangeCircle1: {
        position: 'absolute',
        width: 69,
        height: 66,
        left: -5,
        bottom: '-15%',
        backgroundColor: '#FFD166',
        borderRadius: 34,
    },
    whiteCircle1: {
        position: 'absolute',
        width: 47,
        height: 49,
        left: 11,
        bottom: '12%',
        backgroundColor: '#FFFFFF',
        borderRadius: 9999,
    }, 
    rectangle2: {
        position: 'absolute',
        width: 320,
        height: 49,
        left: 28,
        top: '50%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    learn: {
        left: 30,
        fontWeight: '900',
        fontSize: 25,
        color: '#FFD166',
        top: 5
    },
    orangeCircle2: {
        position: 'absolute',
        width: 69,
        height: 66,
        left: 260,
        bottom: '-15%',
        backgroundColor: '#FFD166',
        borderRadius: 34,
    },
    whiteCircle2: {
        position: 'absolute',
        width: 47,
        height: 49,
        left: 11,
        bottom: '12%',
        backgroundColor: '#FFFFFF',
        borderRadius: 9999,
    },
    rectangle3: {
        position: 'absolute',
        width: 320,
        height: 79,
        left: 28,
        top: '60%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    eduTrack: {
        left: 100,
        fontWeight: '900',
        fontSize: 25,
        color: '#FFD166',
        top: 5
    },
    orangeCircle3: {
        position: 'absolute',
        width: 99,
        height: 96,
        left: -10,
        bottom: '-10%',
        backgroundColor: '#FFD166',
        borderRadius: 54,
    },
    whiteCircle3: {
        position: 'absolute',
        width: 77,
        height: 79,
        left: 11,
        bottom: '8%',
        backgroundColor: '#FFFFFF',
        borderRadius: 9999,
    },
    rectangle4: {
        position: 'absolute',
        width: 320,
        height: 79,
        left: 28,
        top: '75%',
        backgroundColor: '#4D86F7',
        borderRadius: 20,
    },
    remedial: {
        left: 18,
        fontWeight: '900',
        fontSize: 25,
        color: '#FFD166',
        top: 5
    },
    orangeCircle4: {
        position: 'absolute',
        width: 99,
        height: 96,
        left: 250,
        bottom: '-10%',
        backgroundColor: '#FFD166',
        borderRadius: 54,
    },
    whiteCircle4: {
        position: 'absolute',
        width: 77,
        height: 79,
        left: 11,
        bottom: '8%',
        backgroundColor: '#FFFFFF',
        borderRadius: 9999,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: '28%',
        height: '80%',
        borderRadius: 85,
    }
});

export default DashboardHome;


// import React from 'react';
// import { View, StyleSheet, Image, Text } from 'react-native';

// const DashboardHome = () => {

//     return (
//         <View style={styles.container}>
//             <Text style={styles.textTopic}>FlexiMind</Text>
//             <Image style={styles.bgImg} source={require('../assets/bg.jpg')}></Image>
//             <View style={styles.overlay}></View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         position: 'relative',
//         width: 'auto',
//         height: '100%',
//         backgroundColor: '#4D86F7',
//     },
//     bgImg: {
//         alignSelf: 'center',
//         top: '10%',
//         width: '100%',
//         height: '80%',
//         borderWidth: 1,
//         borderRadius: 90,
//     },
   
//     textTopic: {
//         textAlign: 'center',
//         fontWeight: '900',
//         fontSize: 35,
//         color: '#FFD166',
//         top: '8%'
//     },
//     overlay: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: 'rgba(255, 255, 255, 0.7)',
//         top: '15%',
//         height: '80%',
//         borderRadius: 85,
//     }
// });

// export default DashboardHome;
