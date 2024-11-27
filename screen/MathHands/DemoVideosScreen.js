import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const DemoVideosScreen = ({ navigation }) => {
  const [levels, setLevels] = useState([
    { id: '1', title: 'Level 1: Basics of 1x and 2x Tables', status: 'unlocked', highestAccuracy: 0, badge: 'none' },
    { id: '2', title: 'Level 2: Introduction to 3x Table', status: 'locked', highestAccuracy: 0, badge: 'none' },
    { id: '3', title: 'Level 3: Mixed 1x-3x Tables', status: 'locked', highestAccuracy: 0, badge: 'none' },
    { id: '4', title: 'Level 4: Introduction to 4x and 5x Table', status: 'locked', highestAccuracy: 0, badge: 'none' },
    { id: '5', title: 'Level 5: Mastery of 5x Table', status: 'locked', highestAccuracy: 0, badge: 'none' },
  ]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const q = query(
          collection(db, 'userStats'),
          where('userId', '==', userId)
        );

        const querySnapshot = await getDocs(q);
        const userStats = querySnapshot.docs.map(doc => doc.data());
        let updatedLevels = levels.map(level => {
          // Find all stats for the current level
          const statsForLevel = userStats.filter(stat => stat.level === `Level ${level.id}`);
        
          if (statsForLevel.length > 0) {
            // Find the stat with the most recent timestamp
            const latestStat = statsForLevel.reduce((latest, current) =>
              current.timestamp > latest.timestamp ? current : latest
            );
        
            level.highestAccuracy = latestStat.accuracy;
            if (latestStat.accuracy >= 90) {
              level.status = 'completed';
              level.badge = 'gold';
            } else if (latestStat.accuracy >= 70) {
              level.status = 'unlocked';
              level.badge = 'green';
            } else if (latestStat.accuracy >= 50) {
              level.status = 'unlocked';
              level.badge = 'blue';
            }
          }
          return level;
        });
        
  
        // Unlock next level if the previous one is completed
        for (let i = 1; i < updatedLevels.length; i++) {
          if (updatedLevels[i - 1].status === 'completed') {
            updatedLevels[i].status = 'unlocked';
          } else {
            // Lock levels that aren't unlocked or completed
            updatedLevels[i].status = 'locked';
          }
        }
  
        setLevels(updatedLevels);
      }
    };
  
    fetchUserProgress();
  }, []);
  
  const renderBadge = (badge) => {
    switch (badge) {
      case 'gold':
        return '🏅'; // Gold badge emoji
      case 'green':
        return '🥈'; // Silver/Green badge emoji (used silver as a placeholder)
      case 'blue':
        return '🥉'; // Bronze/Blue badge emoji
      default:
        return '❓'; // Placeholder for no badge
    }
  };

  const renderLevelItem = ({ item }) => {
    const getStatusColor = () => {
      switch (item.status) {
        case 'completed':
          return '#FFD700'; // Gold color for completed levels
        case 'unlocked':
          return '#32CD32'; // Green for unlocked levels
        case 'locked':
        default:
          return '#D3D3D3'; // Gray for locked levels
      }
    };

    const handlePress = () => {
      if (item.status === 'locked') return;
      if (item.id === '1') {
        navigation.navigate('LevelOneScreen', { level: item.id });
      } else if (item.id === '2') {
        navigation.navigate('LevelTwoScreen'); // Navigate to Level Two (Math Match) screen for Level 2
      }
      // Add additional logic for other levels as they are implemented
    };

    return (
      <View style={styles.levelContainer}>
        <TouchableOpacity
          style={[styles.levelTile, { backgroundColor: getStatusColor() }]}
          onPress={handlePress}
          disabled={item.status === 'locked'}
        >
          <Text style={styles.levelText}>{item.title}</Text>
        </TouchableOpacity>
        <View style={styles.infoBox}>
          <Text style={styles.badgeText}>{renderBadge(item.badge)}</Text>
          <Text style={styles.accuracyText}>{item.highestAccuracy}%</Text>
        </View>
      </View>
    );
  };

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
    backgroundColor: '#3B5998',
    padding: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 25,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  levelTile: {
    flex: 2,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoBox: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeText: {
    fontSize: 24,
    marginBottom: 5,
  },
  accuracyText: {
    fontSize: 18,
    color: '#000',
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default DemoVideosScreen;
