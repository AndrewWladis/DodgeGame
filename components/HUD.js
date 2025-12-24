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
    top: 60,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scores: {},
  scoreText: {
    color: '#e0f2fe',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Papyrus',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bestText: {
    color: '#bae6fd',
    fontSize: 22,
    fontFamily: 'Papyrus',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  pauseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(30, 58, 95, 0.85)',
    borderWidth: 1,
    borderColor: '#3db5c8',
  },
  pauseText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Papyrus',
  },
});


