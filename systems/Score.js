import { SCORE_PER_SECOND } from '../utils/constants';

// Increments score over time and dispatches updates for the HUD.
export const ScoreSystem = (entities, { time, dispatch }) => {
  const gameState = entities.gameState;
  const dtSeconds = time.delta / 1000;

  const currentScore = gameState.score || 0;
  const newScore = currentScore + SCORE_PER_SECOND * dtSeconds;

  gameState.score = newScore;
  dispatch({ type: 'score-update', score: newScore });

  return entities;
};


