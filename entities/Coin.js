import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const Coin = ({ body, size, color }) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const baseY = body.position.y - height / 2;
  
  // Create animated value for rotation
  const rotationAnim = useRef(new Animated.Value(0)).current;
  
  // Create animated value for pulsing/glow effect
  const pulseAnim = useRef(new Animated.Value(0)).current;
  
  // Create animated value for outer glow opacity
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Continuous rotation animation
    const rotation = Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    
    // Pulsing scale animation (shrink and grow)
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    
    // Glow pulsing animation
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    
    rotation.start();
    pulse.start();
    glow.start();
    
    return () => {
      rotation.stop();
      pulse.stop();
      glow.stop();
    };
  }, [rotationAnim, pulseAnim, glowAnim]);
  
  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2], // Shrinks to 0.8 and grows to 1.2
  });
  
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.9],
  });

  return (
    <Animated.View
      style={[
        styles.gem,
        {
          left: x,
          top: baseY,
          width,
          height,
          transform: [
            { rotate: rotation },
            { scale },
          ],
        },
      ]}
    >
      {/* Outer glow layer */}
      <Animated.View
        style={[
          styles.gemGlow,
          {
            opacity: glowOpacity,
            backgroundColor: color,
            shadowColor: color,
          },
        ]}
      />
      {/* Gem diamond shape */}
      <View style={[styles.gemDiamond, { borderColor: color, shadowColor: color }]}>
        {/* Sparkle effect - top point */}
        <View style={[styles.sparkle, styles.sparkleTop, { backgroundColor: color, shadowColor: color }]} />
        {/* Sparkle effect - right point */}
        <View style={[styles.sparkle, styles.sparkleRight, { backgroundColor: color, shadowColor: color }]} />
        {/* Sparkle effect - bottom point */}
        <View style={[styles.sparkle, styles.sparkleBottom, { backgroundColor: color, shadowColor: color }]} />
        {/* Sparkle effect - left point */}
        <View style={[styles.sparkle, styles.sparkleLeft, { backgroundColor: color, shadowColor: color }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gemGlow: {
    position: 'absolute',
    width: '180%',
    height: '180%',
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 30,
  },
  gemDiamond: {
    width: '70%',
    height: '70%',
    borderWidth: 3,
    borderStyle: 'solid',
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 15,
  },
  sparkle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  sparkleTop: {
    top: -8,
    left: '50%',
    marginLeft: -3,
  },
  sparkleRight: {
    right: -8,
    top: '50%',
    marginTop: -3,
  },
  sparkleBottom: {
    bottom: -8,
    left: '50%',
    marginLeft: -3,
  },
  sparkleLeft: {
    left: -8,
    top: '50%',
    marginTop: -3,
  },
});

