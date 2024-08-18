import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const DemoVideosScreen = ({ navigation }) => {

  const levels = [
    { id: '1', title: 'Level 1: Basics of 1x and 2x Tables' },
    { id: '2', title: 'Level 2: Introduction to 3x Table' },
    { id: '3', title: 'Level 3: Mixed 1x-3x Tables' },
    { id: '4', title: 'Level 4: Introduction to 4x Table' },
    { id: '5', title: 'Level 5: Mastery of 1x-4x Tables' },
  ];

  const renderLevelItem = ({ item }) => (
    <TouchableOpacity
      style={styles.levelTile}
      onPress={() => navigation.navigate('LevelOneScreen', { level: item.id })}
    >
      <Text style={styles.levelText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select Your Level</Text>
      <FlatList
        data={levels}
        renderItem={renderLevelItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B5998', // Darker blue for a more calming and modern look
    padding: 20,
  },
  headerText: {
    fontSize: 26, // Slightly smaller for balance
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 25, // Slightly less margin for better spacing
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  levelTile: {
    backgroundColor: '#FFF',
    padding: 15, // Less padding for a more compact look
    borderRadius: 10,
    marginBottom: 15, // Reduced margin for tighter spacing
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Slightly subtler shadow
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  levelText: {
    fontSize: 18, // Slightly smaller text for better balance
    fontWeight: '600', // Semi-bold for a softer look
    color: '#3B5998', // Consistent with the background color
    textAlign: 'center',
  },
});

export default DemoVideosScreen;
