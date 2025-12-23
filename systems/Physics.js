import Matter from 'matter-js';

// Steps the Matter.js engine each frame.
export const Physics = (entities, { time }) => {
  const engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};


