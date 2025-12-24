import Matter from 'matter-js';

// Removes obstacles and coins that have fallen off-screen to keep entity count bounded.
// Supports reverse mode where obstacles move upward from bottom.
export const Cleanup = (entities) => {
  const world = entities.physics.world;
  const gameState = entities.gameState;
  const screenHeight = gameState.height;
  const isReverse = gameState.gamemode === 3;

  Object.keys(entities)
    .filter((key) => key.startsWith('obstacle-') || key.startsWith('coin-'))
    .forEach((key) => {
      const entity = entities[key];
      const body = entity && entity.body;
      if (!body) return;
      
      const entityHalfHeight = (entity.size?.[1] || 0) / 2;
      const isOffScreen = isReverse
        ? body.position.y + entityHalfHeight < -50 // Above screen in reverse mode
        : body.position.y - entityHalfHeight > screenHeight + 50; // Below screen in normal mode
      
      if (isOffScreen) {
        Matter.World.remove(world, body);
        delete entities[key];
      }
    });

  return entities;
};


