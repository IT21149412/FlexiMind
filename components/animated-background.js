import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AnimatedBackground = () => {
  const starAnim1 = new Animated.Value(-100);
  const starAnim2 = new Animated.Value(-200);

  React.useEffect(() => {
    const animateStar = (anim) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: width,
          duration: 5000,
          useNativeDriver: true,
        })
      ).start();
    };

    animateStar(starAnim1);
    animateStar(starAnim2);
  }, [starAnim1, starAnim2]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.star, { transform: [{ translateX: starAnim1 }] }]} />
      <Animated.View style={[styles.star, { transform: [{ translateX: starAnim2 }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    opacity: 0.7,
    transform: [{ translateX: -100 }],
  },
});

export default AnimatedBackground;
