import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const StartScreen = ({ visible, onStart }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>DODGE</Text>
      <Text style={styles.subtitle}>Tap to Start</Text>
      <TouchableOpacity onPress={onStart} style={styles.button}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 8, 22, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 8,
    color: '#ffffff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0aec0',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4fd1c5',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 999,
    shadowColor: '#4fd1c5',
    shadowOpacity: 0.7,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  buttonText: {
    color: '#0b1120',
    fontWeight: 'bold',
    fontSize: 18,
  },
});


