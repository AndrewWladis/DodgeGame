import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Bounds = ({ body, size, color = 'transparent' }) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={[
        styles.bounds,
        {
          left: x,
          top: y,
          width,
          height,
          backgroundColor: color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bounds: {
    position: 'absolute',
  },
});


