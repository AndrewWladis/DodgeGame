import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const GameOverOverlay = ({ visible, score, bestScore, onPlayAgain, onSelectMode }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>Game Over</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.bestScore}>Best: {bestScore}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPlayAgain} style={styles.button}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSelectMode} style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.buttonText}>Select Game Mode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 58, 95, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#7dd3fc',
    marginBottom: 24,
    fontFamily: 'Papyrus',
  },
  score: {
    fontSize: 36,
    color: '#e5e7eb',
    marginBottom: 4,
    fontFamily: 'Papyrus',
  },
  bestScore: {
    fontSize: 28,
    color: '#93c5fd',
    marginBottom: 32,
    fontFamily: 'Papyrus',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    backgroundColor: '#3db5c8',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 999,
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#64748b',
  },
  buttonText: {
    color: '#0b1120',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Papyrus',
  },
});


