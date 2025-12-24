import Matter from 'matter-js';
import { PLAYER_RADIUS } from './constants';

// Creates the initial entities for a new game run given screen dimensions.
// gamemode: 1 = space (default), 2 = river, 3 = reverse
export const createInitialEntities = (width, height, gamemode = 1) => {
  const engine = Matter.Engine.create({
    enableSleeping: false,
  });
  const world = engine.world;

  // Mode 3 (reverse) has reversed gravity, others have normal downward gravity
  const isReverse = gamemode === 3;
  engine.world.gravity.y = isReverse ? -0.9 : 0.9;

  // Player position based on mode
  let playerY;
  if (isReverse) {
    // Mode 3: Player at top
    playerY = height * 0.3;
  } else {
    // Mode 1 & 2: Player at bottom
    playerY = height * 0.7;
  }

  const playerBody = Matter.Bodies.circle(width / 2, playerY, PLAYER_RADIUS, {
    label: 'Player',
    isStatic: true,
  });

  // Floor and walls (invisible).
  // For reverse mode, obstacles come from bottom, so floor is above screen
  // For normal modes, floor is below screen
  const floorY = isReverse ? -200 : height + 200;
  const floor = Matter.Bodies.rectangle(width / 2, floorY, width, 50, {
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
      obstacleSpeed: isReverse ? -4 : 4, // Negative for reverse mode
      lastSpawnTime: 0,
      obstacleId: 0,
      coinId: 0,
      lastCoinSpawnTime: 0,
      score: 0,
      gamemode, // Store gamemode in gameState for systems to access
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


