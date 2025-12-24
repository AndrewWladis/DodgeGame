import Matter from 'matter-js';
import { COIN_RADIUS, COIN_SPAWN_INTERVAL } from '../utils/constants';

// Spawns new coins at an interval. Supports reverse mode.
export const CoinSpawner = (entities, { time }) => {
  const world = entities.physics.world;
  const gameState = entities.gameState;
  const gamemode = gameState.gamemode || 1;
  const isReverse = gamemode === 3;

  const now = time.current;
  const lastCoinSpawnTime = gameState.lastCoinSpawnTime || 0;

  if (now - lastCoinSpawnTime > COIN_SPAWN_INTERVAL) {
    const screenWidth = gameState.width;
    const screenHeight = gameState.height;
    const coinId = (gameState.coinId || 0) + 1;
    gameState.coinId = coinId;
    gameState.lastCoinSpawnTime = now;

    const x = COIN_RADIUS + Math.random() * (screenWidth - COIN_RADIUS * 2);
    // Spawn position: top for modes 1 & 2, bottom for mode 3
    const y = isReverse ? screenHeight + COIN_RADIUS * 2 : -COIN_RADIUS * 2;

    const coinBody = Matter.Bodies.circle(x, y, COIN_RADIUS, {
      label: 'Coin',
      frictionAir: 0.02,
    });

    const speed = gameState.obstacleSpeed; // Use same speed as obstacles
    Matter.Body.setVelocity(coinBody, { x: 0, y: speed });

    Matter.World.add(world, coinBody);

    // Random gem colors
    const gemColors = ['#FFD700', '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3'];
    const color = gemColors[coinId % gemColors.length];
    
    entities[`coin-${coinId}`] = {
      body: coinBody,
      size: [COIN_RADIUS * 2, COIN_RADIUS * 2],
      color,
      renderer: require('../entities/Coin').Coin,
    };
  }

  return entities;
};

