import Matter from 'matter-js';
import { COIN_RADIUS, COIN_SPAWN_INTERVAL } from '../utils/constants';

// Spawns new coins at the top at an interval.
export const CoinSpawner = (entities, { time }) => {
  const world = entities.physics.world;
  const gameState = entities.gameState;

  const now = time.current;
  const lastCoinSpawnTime = gameState.lastCoinSpawnTime || 0;

  if (now - lastCoinSpawnTime > COIN_SPAWN_INTERVAL) {
    const screenWidth = gameState.width;
    const coinId = (gameState.coinId || 0) + 1;
    gameState.coinId = coinId;
    gameState.lastCoinSpawnTime = now;

    const x = COIN_RADIUS + Math.random() * (screenWidth - COIN_RADIUS * 2);
    const y = -COIN_RADIUS * 2;

    const coinBody = Matter.Bodies.circle(x, y, COIN_RADIUS, {
      label: 'Coin',
      frictionAir: 0.02,
    });

    const speed = gameState.obstacleSpeed; // Use same speed as obstacles
    Matter.Body.setVelocity(coinBody, { x: 0, y: speed });

    Matter.World.add(world, coinBody);

    entities[`coin-${coinId}`] = {
      body: coinBody,
      size: [COIN_RADIUS * 2, COIN_RADIUS * 2],
      color: '#FFD700',
      renderer: require('../entities/Coin').Coin,
    };
  }

  return entities;
};

