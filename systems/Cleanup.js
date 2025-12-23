import Matter from 'matter-js';

// Removes obstacles that have fallen off-screen to keep entity count bounded.
export const Cleanup = (entities) => {
  const world = entities.physics.world;
  const gameState = entities.gameState;
  const screenHeight = gameState.height;

  Object.keys(entities)
    .filter((key) => key.startsWith('obstacle-'))
    .forEach((key) => {
      const entity = entities[key];
      const body = entity && entity.body;
      if (!body) return;
      if (body.position.y - (entity.size?.[1] || 0) / 2 > screenHeight + 50) {
        Matter.World.remove(world, body);
        delete entities[key];
      }
    });

  return entities;
};


