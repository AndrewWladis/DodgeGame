import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const Player = ({ body, size, color }) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const baseY = body.position.y - height / 2;
  
  // Create animated value for floating effect
  const floatAnim = useRef(new Animated.Value(0)).current;
  
  // Random phase offset for variation between instances
  const phaseOffset = useRef(Math.random() * Math.PI * 2).current;
  
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
    outputRange: [10, 0], // Negative Y moves up
  });

  return (
    <Animated.View
      style={[
        styles.player,
        {
          left: x,
          top: baseY,
          width,
          height,
          backgroundColor: color,
          transform: [{ translateY: animatedY }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    borderRadius: 9999,
  },
});


