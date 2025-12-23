import Matter from 'matter-js';

// Handles swipe/drag by following the user's finger horizontally.
// Wherever you drag on the screen, the player moves to that x-position.
export const InputSystem = (entities, { touches }) => {
  const gameState = entities.gameState;
  const playerEntity = entities.player;
  const playerBody = playerEntity.body;

  // Look for the latest touch position (press/move) this frame.
  let touchX = null;

  (touches || []).forEach((t) => {
    if (t.type === 'move' || t.type === 'press' || t.type === 'start') {
      if (t.event && typeof t.event.pageX === 'number') {
        touchX = t.event.pageX;
      } else if (Array.isArray(t.position)) {
        touchX = t.position[0];
      }
    }
  });

  if (touchX != null) {
    const halfWidth = playerEntity.size[0] / 2;
    const leftLimit = halfWidth;
    const rightLimit = gameState.width - halfWidth;

    const clampedX = Math.max(leftLimit, Math.min(rightLimit, touchX));

    Matter.Body.setPosition(playerBody, {
      x: clampedX,
      y: playerBody.position.y,
    });
  }

  return entities;
};



