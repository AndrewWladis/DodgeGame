import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const StartScreen = ({ visible, onStart }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>TRIPLE T RIVER RUN</Text>
      <TouchableOpacity onPress={onStart} style={styles.button}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 58, 95, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 8,
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Papyrus',
  },
  button: {
    backgroundColor: '#3db5c8',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 999,
    shadowColor: '#3db5c8',
    shadowOpacity: 0.7,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  buttonText: {
    color: '#0b1120',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Papyrus',
  },
});


