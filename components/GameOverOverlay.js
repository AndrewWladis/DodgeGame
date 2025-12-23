import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const GameOverOverlay = ({ visible, score, bestScore, onPlayAgain }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>Game Over</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.bestScore}>Best: {bestScore}</Text>
      <TouchableOpacity onPress={onPlayAgain} style={styles.button}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 8, 22, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#f472b6',
    marginBottom: 24,
  },
  score: {
    fontSize: 24,
    color: '#e5e7eb',
    marginBottom: 4,
  },
  bestScore: {
    fontSize: 18,
    color: '#a5b4fc',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#4fd1c5',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonText: {
    color: '#0b1120',
    fontWeight: 'bold',
    fontSize: 18,
  },
});


