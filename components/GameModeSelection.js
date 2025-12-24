import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Mode 1: Space background (current)
const SpaceBackground = ({ children }) => (
  <ImageBackground
    source={require('../assets/background.png')}
    style={styles.backgroundImage}
    resizeMode="cover"
  >
    {children}
  </ImageBackground>
);

// Mode 2: River background
const RiverBackground = ({ children }) => (
  <LinearGradient
    colors={['#4a90e2', '#6bb3ff', '#87ceeb', '#b0e0e6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.backgroundImage}
  >
    {/* Add some water ripple effect with simple shapes */}
    <View style={styles.riverOverlay}>
      <View style={styles.wave1} />
      <View style={styles.wave2} />
    </View>
    {children}
  </LinearGradient>
);

// Mode 3: Reverse mode background (space but darker for top-down)
const ReverseBackground = ({ children }) => (
  <ImageBackground
    source={require('../assets/background.png')}
    style={styles.backgroundImage}
    resizeMode="cover"
  >
    <View style={styles.reverseOverlay} />
    {children}
  </ImageBackground>
);

const ModeButton = ({ mode, title, description, background: Background, onSelect }) => (
  <TouchableOpacity style={styles.modeButton} onPress={() => onSelect(mode)}>
    <Background>
      <View style={styles.modeContent}>
        <Text style={styles.modeTitle}>{title}</Text>
        <Text style={styles.modeDescription}>{description}</Text>
      </View>
    </Background>
  </TouchableOpacity>
);

export const GameModeSelection = ({ visible, onSelectMode }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>SELECT GAME MODE</Text>
      <View style={styles.modesContainer}>
        <ModeButton
          mode={1}
          title="Cosmic Run"
          description="Dodge asteroids from space"
          background={SpaceBackground}
          onSelect={onSelectMode}
        />
        <ModeButton
          mode={2}
          title="River Run"
          description="Navigate through floating logs"
          background={RiverBackground}
          onSelect={onSelectMode}
        />
        <ModeButton
          mode={3}
          title="Reverse Mode"
          description="Start at top, dodge from below"
          background={ReverseBackground}
          onSelect={onSelectMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 6,
    color: '#ffffff',
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'Papyrus',
  },
  modesContainer: {
    width: '100%',
    gap: 20,
  },
  modeButton: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Papyrus',
  },
  modeDescription: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
    fontFamily: 'Papyrus',
  },
  riverOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  wave1: {
    position: 'absolute',
    bottom: '30%',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  wave2: {
    position: 'absolute',
    bottom: '25%',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 2,
  },
  reverseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

