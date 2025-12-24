import { useWindowDimensions } from 'react-native';

// Global tuning constants for the game.

export const PLAYER_RADIUS = 36;
export const PLAYER_SPEED = 280; // pixels per second

export const OBSTACLE_MIN_WIDTH = 90;
export const OBSTACLE_MAX_WIDTH = 180;
export const OBSTACLE_HEIGHT = 24;
export const BASE_OBSTACLE_SPEED = 4; // initial downward velocity
export const BASE_SPAWN_INTERVAL = 900; // ms between spawns at start
export const MIN_SPAWN_INTERVAL = 350;

export const SCORE_PER_SECOND = 67; // points per second survived
export const SCORE_PER_LEVEL = 1500; // every this many points, difficulty increases
export const COIN_POINTS = 1000; // points awarded for collecting a coin

// Space-themed asteroid colors - dark browns, grays with orange/red hints, metallic
export const OBSTACLE_COLORS = [
  '#3d2817', // Dark brown asteroid
  '#4a2c1a', // Brown-gray asteroid
  '#2d1f14', // Very dark brown
  '#5a3d2e', // Medium brown
  '#3a2a1f', // Dark brown-gray
  '#4d3526', // Brown with gray
  '#2f2419', // Dark space rock
  '#5c4033', // Medium space rock
];

// Log colors for river mode - various shades of brown
export const LOG_COLORS = [
  '#8d6e63', // Brown log
  '#6d4c41', // Darker brown log
  '#795548', // Medium brown log
  '#5d4037', // Dark brown log
  '#a1887f', // Lighter brown log
  '#8d6e63', // Brown log (repeat)
  '#6d4c41', // Darker brown log (repeat)
  '#795548', // Medium brown log (repeat)
];

export const COIN_RADIUS = 20;
export const COIN_SPAWN_INTERVAL = 3000; // ms between coin spawns

// Convenience hook for responsive layout.
export const useDimensions = () => {
  const { width, height } = useWindowDimensions();
  return { width, height };
};


