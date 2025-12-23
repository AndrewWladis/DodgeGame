import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const HUD = ({ score, bestScore, isPaused, onTogglePause, visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.scores}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.bestText}>Best: {bestScore}</Text>
      </View>
      <TouchableOpacity style={styles.pauseButton} onPress={onTogglePause}>
        <Text style={styles.pauseText}>{isPaused ? 'Resume' : 'Pause'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scores: {},
  scoreText: {
    color: '#e5e7eb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bestText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  pauseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  pauseText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600',
  },
});


