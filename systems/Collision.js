import Matter from 'matter-js';
import { COIN_POINTS } from '../utils/constants';

// Sets up collision listener to detect player vs obstacle hits and coin collection.
export const Collision = (entities, { dispatch }) => {
  const engine = entities.physics.engine;
  const world = entities.physics.world;

  if (!entities.physics.collisionInitialized) {
    entities.physics.collisionInitialized = true;

    Matter.Events.on(engine, 'collisionStart', (event) => {
      const pairs = event.pairs || [];

      for (const pair of pairs) {
        const labels = [pair.bodyA.label, pair.bodyB.label];
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;

        // Check for player hitting obstacle (game over)
        const isPlayerHit =
          (labels[0] === 'Player' && labels[1] === 'Obstacle') ||
          (labels[1] === 'Player' && labels[0] === 'Obstacle');

        if (isPlayerHit) {
          // Play bang sound effect
          if (entities.sound && entities.sound.bang) {
            entities.sound.bang.setPositionAsync(0)
              .then(() => entities.sound.bang.playAsync())
              .catch((error) => {
                console.warn('Failed to play bang sound:', error);
              });
          }
          dispatch({ type: 'game-over' });
          break;
        }

        // Check for player collecting coin
        const isCoinCollected =
          (labels[0] === 'Player' && labels[1] === 'Coin') ||
          (labels[1] === 'Player' && labels[0] === 'Coin');

        if (isCoinCollected) {
          const coinBody = labels[0] === 'Coin' ? bodyA : bodyB;
          
          // Play money sound effect
          if (entities.sound && entities.sound.money) {
            entities.sound.money.setPositionAsync(0)
              .then(() => entities.sound.money.playAsync())
              .catch((error) => {
                console.warn('Failed to play money sound:', error);
              });
          }
          
          // Remove coin from world and entities
          Matter.World.remove(world, coinBody);
          
          // Find and remove coin entity
          Object.keys(entities).forEach((key) => {
            if (key.startsWith('coin-') && entities[key].body === coinBody) {
              delete entities[key];
            }
          });

          // Award points by updating gameState score directly
          const gameState = entities.gameState;
          gameState.score = (gameState.score || 0) + COIN_POINTS;
          break;
        }
      }
    });
  }

  return entities;
};


