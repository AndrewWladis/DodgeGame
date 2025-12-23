import {
  BASE_OBSTACLE_SPEED,
  BASE_SPAWN_INTERVAL,
  MIN_SPAWN_INTERVAL,
  SCORE_PER_LEVEL,
} from '../utils/constants';

// Adjusts spawn interval and obstacle speed based on score.
export const Difficulty = (entities) => {
  const gameState = entities.gameState;
  const score = gameState.score || 0;

  const level = Math.floor(score / SCORE_PER_LEVEL);

  const spawnInterval = BASE_SPAWN_INTERVAL - level * 80;
  const speed = BASE_OBSTACLE_SPEED + level * 0.4;

  gameState.spawnInterval = Math.max(MIN_SPAWN_INTERVAL, spawnInterval);
  gameState.obstacleSpeed = speed;

  return entities;
};


