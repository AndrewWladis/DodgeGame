import Matter from 'matter-js';
import {
  OBSTACLE_COLORS,
  OBSTACLE_HEIGHT,
  OBSTACLE_MIN_WIDTH,
  OBSTACLE_MAX_WIDTH,
} from '../utils/constants';

// Spawns new obstacles at the top at an interval.
export const ObstacleSpawner = (entities, { time }) => {
  const world = entities.physics.world;
  const gameState = entities.gameState;

  const now = time.current;
  const lastSpawnTime = gameState.lastSpawnTime || 0;
  const interval = gameState.spawnInterval;

  if (now - lastSpawnTime > interval) {
    const screenWidth = gameState.width;
    const obstacleId = (gameState.obstacleId || 0) + 1;
    gameState.obstacleId = obstacleId;
    gameState.lastSpawnTime = now;

    const width =
      OBSTACLE_MIN_WIDTH +
      Math.random() * (OBSTACLE_MAX_WIDTH - OBSTACLE_MIN_WIDTH);
    const x = width / 2 + Math.random() * (screenWidth - width);
    const y = -OBSTACLE_HEIGHT;

    const obstacleBody = Matter.Bodies.rectangle(x, y, width, OBSTACLE_HEIGHT, {
      label: 'Obstacle',
      frictionAir: 0.02,
    });

    const speed = gameState.obstacleSpeed;
    Matter.Body.setVelocity(obstacleBody, { x: 0, y: speed });

    Matter.World.add(world, obstacleBody);

    const color = OBSTACLE_COLORS[obstacleId % OBSTACLE_COLORS.length];

    entities[`obstacle-${obstacleId}`] = {
      body: obstacleBody,
      size: [width, OBSTACLE_HEIGHT],
      color,
      renderer: require('../entities/Obstacle').Obstacle,
    };
  }

  return entities;
};


