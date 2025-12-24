import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const Obstacle = ({ body, size, color }) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const baseY = body.position.y - height / 2;
  
  // Random rotation angle between -10 and 10 degrees (generated once per obstacle)
  const rotationAngle = useRef(-10 + Math.random() * 20).current;
  
  // Create animated value for floating effect
  const floatAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Create a looping animation that smoothly goes up and down
    // Using a random duration for variation (1.5-2.5 seconds per cycle)
    const duration = 1500 + Math.random() * 1000;
    
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );
    
    animation.start();
    
    return () => {
      animation.stop();
    };
  }, [floatAnim]);
  
  // Apply smooth up/down motion: 0 = bottom, 1 = top (10px up)
  const animatedY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  return (
    <Animated.View
      style={[
        styles.obstacle,
        {
          left: x,
          top: baseY,
          width,
          height,
          backgroundColor: color,
          transform: [
            { translateY: animatedY },
            { rotate: `${rotationAngle}deg` },
          ],
        },
      ]}
    >
      {/* Space asteroid texture - darker shadow on one side */}
      <View style={styles.asteroidShadow} />
      {/* Asteroid highlight on opposite side */}
      <View style={styles.asteroidHighlight} />
      {/* Crater-like details for space rock effect */}
      <View style={styles.crater1} />
      <View style={styles.crater2} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    borderRadius: 12, // More rounded for asteroid look
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  asteroidShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '45%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  asteroidHighlight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '25%',
    height: '100%',
    backgroundColor: 'rgba(255, 200, 100, 0.2)', // Warm highlight for space rock
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  crater1: {
    position: 'absolute',
    left: '30%',
    top: '30%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  crater2: {
    position: 'absolute',
    right: '25%',
    bottom: '25%',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});


