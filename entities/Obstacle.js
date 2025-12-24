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
      {/* Rock texture effect - darker shadow on one side */}
      <View style={styles.rockShadow} />
      {/* Rock highlight on opposite side */}
      <View style={styles.rockHighlight} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  rockShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '40%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  rockHighlight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '30%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});


