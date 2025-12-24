import Matter from 'matter-js';
import {
  OBSTACLE_COLORS,
  LOG_COLORS,
  OBSTACLE_HEIGHT,
  OBSTACLE_MIN_WIDTH,
  OBSTACLE_MAX_WIDTH,
} from '../utils/constants';

// Spawns new obstacles at an interval. Supports different modes:
// Mode 1: Space asteroids from top (default)
// Mode 2: Logs from top (river mode)
// Mode 3: Obstacles from bottom (reverse mode)
export const ObstacleSpawner = (entities, { time }) => {
  const world = entities.physics.world;
  const gameState = entities.gameState;
  const gamemode = gameState.gamemode || 1;

  const now = time.current;
  const lastSpawnTime = gameState.lastSpawnTime || 0;
  const interval = gameState.spawnInterval;

  if (now - lastSpawnTime > interval) {
    const screenWidth = gameState.width;
    const screenHeight = gameState.height;
    const obstacleId = (gameState.obstacleId || 0) + 1;
    gameState.obstacleId = obstacleId;
    gameState.lastSpawnTime = now;

    const width =
      OBSTACLE_MIN_WIDTH +
      Math.random() * (OBSTACLE_MAX_WIDTH - OBSTACLE_MIN_WIDTH);
    const x = width / 2 + Math.random() * (screenWidth - width);
    
    // Spawn position: top for modes 1 & 2, bottom for mode 3
    const isReverse = gamemode === 3;
    const y = isReverse ? screenHeight + OBSTACLE_HEIGHT : -OBSTACLE_HEIGHT;

    const obstacleBody = Matter.Bodies.rectangle(x, y, width, OBSTACLE_HEIGHT, {
      label: 'Obstacle',
      frictionAir: 0.02,
    });

    const speed = gameState.obstacleSpeed;
    Matter.Body.setVelocity(obstacleBody, { x: 0, y: speed });

    Matter.World.add(world, obstacleBody);

    // Choose renderer and colors based on mode
    let renderer, color;
    if (gamemode === 2) {
      // River mode: use Log renderer
      renderer = require('../entities/Log').Log;
      color = LOG_COLORS[obstacleId % LOG_COLORS.length];
    } else {
      // Space mode (1) and reverse mode (3): use Obstacle renderer
      renderer = require('../entities/Obstacle').Obstacle;
      color = OBSTACLE_COLORS[obstacleId % OBSTACLE_COLORS.length];
    }

    entities[`obstacle-${obstacleId}`] = {
      body: obstacleBody,
      size: [width, OBSTACLE_HEIGHT],
      color,
      renderer,
    };
  }

  return entities;
};


