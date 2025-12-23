import AsyncStorage from '@react-native-async-storage/async-storage';

const BEST_SCORE_KEY = '@dodge_best_score';

// Gets the persisted best score or null if none.
export const getBestScore = async () => {
  try {
    const value = await AsyncStorage.getItem(BEST_SCORE_KEY);
    if (value == null) return null;
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
  } catch (e) {
    return null;
  }
};

// Saves the score if it is higher than the stored best score.
export const saveBestScoreIfHigher = async (score) => {
  try {
    const current = await getBestScore();
    if (current == null || score > current) {
      await AsyncStorage.setItem(BEST_SCORE_KEY, String(score));
    }
  } catch (e) {
    // Ignore storage errors; game still runs.
  }
};


