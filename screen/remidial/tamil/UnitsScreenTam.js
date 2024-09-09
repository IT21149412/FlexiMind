import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import dataT1 from '../../../data/Unit1Tamil';
import dataT2 from '../../../data/Unit2Tamil';
// import dataT2 from '../../../data/Unit3Eng';
// import dataT2 from '../../../data/Unit4Eng';
// import dataT2 from '../../../data/Unit5Eng';
// import dataT2 from '../../../data/Unit6Eng';

const showAlert = (navigation, screen, data) => {
  Alert.alert(
    'அலகு தொடங்கு',
    'நீங்கள் தொடங்க விரும்புகிறீர்களா?',
    [
      {
        text: 'சரி',
        onPress: () => navigation.navigate(screen, { data }),
      },
    ],
    {
      cancelable: false,
    }
  );
};

const UnitsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.bgImg} source={require('../../../assets/bg.jpg')} />
      <View style={styles.overlay}></View>
      <View style={styles.header}>
        <Text style={styles.headerText}>சிரம நிலை: எளிது</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.unitContainer, styles.container1]}>
          <Text style={styles.unitTitle}>ஓசை பொருந்தும் சொற்கள்</Text>
          <Text style={styles.unitDescription}>அலகு 1</Text>
        </View>
        <TouchableOpacity
          onPress={() => showAlert(navigation, 'unitComponentTam', dataT1)}
        >
          <Image
            source={require('../../../assets/images/star1.png')}
            style={styles.iconsContainer}
          />
        </TouchableOpacity>

        <View style={[styles.unitContainer, styles.container2]}>
          <Text style={styles.unitTitle}>கண்ணாடி எழுத்து</Text>
          <Text style={styles.unitDescription}>அலகு 2</Text>
        </View>
        <TouchableOpacity
          onPress={() => showAlert(navigation, 'unitComponentTam', dataT2)}
        >
          <Image
            source={require('../../../assets/images/star2.png')}
            style={styles.iconsContainer}
          />
        </TouchableOpacity>

        <View style={[styles.unitContainer, styles.container3]}>
          <Text style={styles.unitTitle}>எழுத்து சேர்க்கைகளின் மாறுதல்</Text>
          <Text style={styles.unitDescription}>அலகு 3</Text>
        </View>
        <TouchableOpacity
          onPress={() => showAlert(navigation, 'unitComponentTam', dataT1)}
        >
          <Image
            source={require('../../../assets/images/star3.png')}
            style={styles.iconsContainer}
          />
        </TouchableOpacity>

        <View style={[styles.unitContainer, styles.container2]}>
          <Text style={styles.unitTitle}>
            எழுத்துகளின் வரிசையை கலந்து விடுதல்
          </Text>
          <Text style={styles.unitDescription}>அலகு 4</Text>
        </View>
        <TouchableOpacity
          onPress={() => showAlert(navigation, 'unitComponentTam', dataT2)}
        >
          <Image
            source={require('../../../assets/images/star2.png')}
            style={styles.iconsContainer}
          />
        </TouchableOpacity>

        <View style={[styles.unitContainer, styles.container3]}>
          <Text style={styles.unitTitle}>ஒலிக்கேற்ப எழுத்து</Text>
          <Text style={styles.unitDescription}>அலகு 5</Text>
        </View>
        <TouchableOpacity
          onPress={() => showAlert(navigation, 'unitComponentTam', dataT1)}
        >
          <Image
            source={require('../../../assets/images/star3.png')}
            style={styles.iconsContainer}
          />
        </TouchableOpacity>

        <View style={[styles.unitContainer, styles.container1]}>
          <Text style={styles.unitTitle}>ஒரே போன்ற சொற்கள்</Text>
          <Text style={styles.unitDescription}>அலகு 6</Text>
        </View>
        <TouchableOpacity
          onPress={() => showAlert(navigation, 'unitComponentTam', dataT2)}
        >
          <Image
            source={require('../../../assets/images/star6.png')}
            style={styles.iconsContainer}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bgImg: {
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 120,
    backgroundColor: '#6ECB63',
    padding: 24,
    borderWidth: 1,
    borderColor: 'grey',
    zIndex: 1,
  },
  headerText: {
    // alignSelf: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    top: 50,
  },
  scrollViewContent: {
    paddingVertical: 50, // Adjusted to make room for the header
  },
  unitContainer: {
    padding: 20,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 5,
    elevation: 3,
  },
  unitTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  unitDescription: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  container1: {
    paddingTop: 30,
    backgroundColor: '#6ECB63',
  },
  container2: {
    backgroundColor: '#FFD166',
  },
  container3: {
    backgroundColor: '#4D86F7',
  },
  startButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  startIcon: {
    width: 40,
    height: 40,
  },
  iconsContainer: {
    paddingVertical: 490,
    flexDirection: 'row',
    alignSelf: 'center',
    width: 250,
    height: 250,
    paddingBottom: 55,
  },
});

export default UnitsScreen;
