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
        styles.coin,
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
          styles.coinGlow,
          {
            opacity: glowOpacity,
          },
        ]}
      />
      {/* Inner coin */}
      <View style={[styles.coinInner, { backgroundColor: color }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  coin: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinGlow: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    borderRadius: 999,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 25, // For Android shadow
  },
  coinInner: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20, // For Android shadow
  },
});

