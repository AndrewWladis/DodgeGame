import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ControlButtons = ({
  visible,
  onLeftPressIn,
  onLeftPressOut,
  onRightPressIn,
  onRightPressOut,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.leftButton]}
        onPressIn={onLeftPressIn}
        onPressOut={onLeftPressOut}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>◀︎</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.rightButton]}
        onPressIn={onRightPressIn}
        onPressOut={onRightPressOut}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>▶︎</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  leftButton: {},
  rightButton: {},
  text: {
    color: '#e5e7eb',
    fontSize: 32,
    fontWeight: 'bold',
  },
});


