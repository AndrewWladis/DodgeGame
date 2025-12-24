import { useWindowDimensions } from 'react-native';

// Global tuning constants for the game.

export const PLAYER_RADIUS = 36;
export const PLAYER_SPEED = 280; // pixels per second

export const OBSTACLE_MIN_WIDTH = 40;
export const OBSTACLE_MAX_WIDTH = 120;
export const OBSTACLE_HEIGHT = 24;
export const BASE_OBSTACLE_SPEED = 4; // initial downward velocity
export const BASE_SPAWN_INTERVAL = 900; // ms between spawns at start
export const MIN_SPAWN_INTERVAL = 350;

export const SCORE_PER_SECOND = 120; // points per second survived
export const SCORE_PER_LEVEL = 1500; // every this many points, difficulty increases

export const OBSTACLE_COLORS = ['#f97316', '#22c55e', '#3b82f6', '#e11d48', '#a855f7'];

// Convenience hook for responsive layout.
export const useDimensions = () => {
  const { width, height } = useWindowDimensions();
  return { width, height };
};


