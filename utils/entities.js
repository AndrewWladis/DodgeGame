import Matter from 'matter-js';
import { PLAYER_RADIUS } from './constants';

// Creates the initial entities for a new game run given screen dimensions.
export const createInitialEntities = (width, height) => {
  const engine = Matter.Engine.create({
    enableSleeping: false,
  });
  const world = engine.world;

  // Gravity pulls obstacles downward.
  engine.world.gravity.y = 0.9;

  // Player starting in the middle of the screen.
  const playerBody = Matter.Bodies.circle(width / 2, height / 2, PLAYER_RADIUS, {
    label: 'Player',
    isStatic: true,
  });

  // Floor and walls (invisible).
  const floor = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, {
    isStatic: true,
    label: 'Floor',
  });

  const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height, {
    isStatic: true,
    label: 'Wall',
  });

  const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, {
    isStatic: true,
    label: 'Wall',
  });

  Matter.World.add(world, [playerBody, floor, leftWall, rightWall]);

  const PlayerRenderer = require('../entities/Player').Player;
  const BoundsRenderer = require('../entities/Bounds').Bounds;

  return {
    physics: {
      engine,
      world,
    },
    gameState: {
      width,
      height,
      spawnInterval: 900,
      obstacleSpeed: 4,
      lastSpawnTime: 0,
      obstacleId: 0,
      score: 0,
    },
    player: {
      body: playerBody,
      size: [PLAYER_RADIUS * 2, PLAYER_RADIUS * 2],
      color: '#4fd1c5',
      renderer: PlayerRenderer,
    },
    floor: {
      body: floor,
      size: [width, 50],
      color: 'transparent',
      renderer: BoundsRenderer,
    },
    leftWall: {
      body: leftWall,
      size: [50, height],
      color: 'transparent',
      renderer: BoundsRenderer,
    },
    rightWall: {
      body: rightWall,
      size: [50, height],
      color: 'transparent',
      renderer: BoundsRenderer,
    },
  };
};


