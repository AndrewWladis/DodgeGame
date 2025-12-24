import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const Log = ({ body, size, color }) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const baseY = body.position.y - height / 2;
  
  // Small rotation for natural log movement
  const rotationAngle = useRef(-5 + Math.random() * 10).current;
  
  // Create animated value for floating/swaying effect
  const swayAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Create a looping animation for water swaying
    const duration = 2000 + Math.random() * 1000;
    
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(swayAnim, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(swayAnim, {
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
  }, [swayAnim]);
  
  // Apply swaying motion
  const animatedY = swayAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, -5],
  });

  return (
    <Animated.View
      style={[
        styles.log,
        {
          left: x,
          top: baseY,
          width,
          height,
          transform: [
            { translateY: animatedY },
            { rotate: `${rotationAngle}deg` },
          ],
        },
      ]}
    >
      {/* Log texture - bark pattern */}
      <View style={styles.logTop} />
      <View style={styles.barkLine1} />
      <View style={styles.barkLine2} />
      <View style={styles.barkLine3} />
      {/* Wood grain details */}
      <View style={styles.woodGrain1} />
      <View style={styles.woodGrain2} />
      <View style={styles.woodGrain3} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  log: {
    position: 'absolute',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#5d4037',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#8d6e63', // Brown log color
  },
  logTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '25%',
    backgroundColor: '#6d4c41', // Darker brown for top
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barkLine1: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    height: 1,
    backgroundColor: '#5d4037',
  },
  barkLine2: {
    position: 'absolute',
    top: '50%',
    left: '15%',
    right: '15%',
    height: 1,
    backgroundColor: '#5d4037',
  },
  barkLine3: {
    position: 'absolute',
    top: '70%',
    left: '20%',
    right: '20%',
    height: 1,
    backgroundColor: '#5d4037',
  },
  woodGrain1: {
    position: 'absolute',
    top: '35%',
    left: '20%',
    width: 3,
    height: '30%',
    backgroundColor: '#6d4c41',
    borderRadius: 1.5,
  },
  woodGrain2: {
    position: 'absolute',
    top: '40%',
    right: '25%',
    width: 2,
    height: '25%',
    backgroundColor: '#6d4c41',
    borderRadius: 1,
  },
  woodGrain3: {
    position: 'absolute',
    top: '60%',
    left: '30%',
    width: 2.5,
    height: '20%',
    backgroundColor: '#6d4c41',
    borderRadius: 1.25,
  },
});

