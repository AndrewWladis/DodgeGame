import Matter from 'matter-js';

// Sets up collision listener to detect player vs obstacle hits.
export const Collision = (entities, { dispatch }) => {
  const engine = entities.physics.engine;

  if (!entities.physics.collisionInitialized) {
    entities.physics.collisionInitialized = true;

    Matter.Events.on(engine, 'collisionStart', (event) => {
      const pairs = event.pairs || [];

      for (const pair of pairs) {
        const labels = [pair.bodyA.label, pair.bodyB.label];

        const isPlayerHit =
          (labels[0] === 'Player' && labels[1] === 'Obstacle') ||
          (labels[1] === 'Player' && labels[0] === 'Obstacle');

        if (isPlayerHit) {
          dispatch({ type: 'game-over' });
          break;
        }
      }
    });
  }

  return entities;
};


