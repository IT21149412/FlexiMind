import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import { auth, db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const LevelCompletedScreen = ({ navigation }) => {
  const [stats, setStats] = useState({ totalXP: 0, committedTime: '0:00', accuracy: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndCalculateStats = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;

        const q = query(
          collection(db, 'multiplication'),
          where('userId', '==', userId),
          where('level', '==', 'Level 1'),
          orderBy('timestamp', 'desc'),
          limit(1)
        );

        try {
          const querySnapshot = await getDocs(q);
          const doc = querySnapshot.docs[0];
          if (doc.exists()) {
            const data = doc.data();

            const totalQuestions = data.results.length;
            const correctAnswers = data.results.filter(result => result.correct).length;
            const totalXP = correctAnswers * 10; 
            const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
            const committedTime = data.committedTime || '10:46';

            const stats = { totalXP, committedTime, accuracy };
            setStats(stats);

            await addDoc(collection(db, 'userStats'), {
              userId,
              level: 'Level 1',
              ...stats,
              timestamp: serverTimestamp(),
            });
          } else {
            setError('No results found.');
          }
        } catch (error) {
          setError('Error fetching results.');
          console.error('Error fetching documents: ', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAndCalculateStats();

    // Disable back button
    const backAction = () => {
      return true; // Returning true means the back button press is disabled
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Clean up the event listener
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4D86F7" />
        <Text style={styles.loadingText}>Loading your stats...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>Level completed!</Text>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>TOTAL XP</Text>
          <Text style={styles.statValue}>{stats.totalXP}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>COMMITTED</Text>
          <Text style={styles.statValue}>{stats.committedTime}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>GOOD</Text>
          <Text style={styles.statValue}>{stats.accuracy}%</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DemoVideosScreen')} // Adjust navigation as needed
      >
        <Text style={styles.buttonText}>GO TO MAIN MENU</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  congratsText: {
    fontSize: 24,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#000',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#4D86F7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4D86F7',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LevelCompletedScreen;
