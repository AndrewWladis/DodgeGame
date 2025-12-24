import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameEngine } from 'react-native-game-engine';
import { useDimensions } from './utils/constants';
import { createInitialEntities } from './utils/entities';
import { Physics } from './systems/Physics';
import { ObstacleSpawner } from './systems/ObstacleSpawner';
import { CoinSpawner } from './systems/CoinSpawner';
import { Cleanup } from './systems/Cleanup';
import { Collision } from './systems/Collision';
import { Difficulty } from './systems/Difficulty';
import { InputSystem } from './systems/Input';
import { ScoreSystem } from './systems/Score';
import { StartScreen } from './components/StartScreen';
import { GameOverOverlay } from './components/GameOverOverlay';
import { HUD } from './components/HUD';
import { getBestScore, saveBestScoreIfHigher } from './utils/storage';

export default function App() {
  const { width, height } = useDimensions();
  const [entities, setEntities] = useState(() => createInitialEntities(width, height));
  const [running, setRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [engineKey, setEngineKey] = useState(0);

  const gameEngineRef = useRef(null);

  // Load best score once on mount.
  useEffect(() => {
    (async () => {
      const stored = await getBestScore();
      if (stored != null) {
        setBestScore(stored);
      }
    })();
  }, []);

  const handleEvent = useCallback(
    async (e) => {
      if (e.type === 'game-over') {
        setRunning(false);
        setIsGameOver(true);
        setIsPaused(false);
        setHasStarted(true);
        await saveBestScoreIfHigher(score);
        const stored = await getBestScore();
        if (stored != null) {
          setBestScore(stored);
        }
      } else if (e.type === 'score-update') {
        setScore(Math.floor(e.score));
      }
    },
    [score]
  );

  const handleStart = () => {
    setEngineKey((k) => k + 1);
    setEntities(createInitialEntities(width, height));
    setScore(0);
    setIsGameOver(false);
    setHasStarted(true);
    setIsPaused(false);
    setRunning(true);
  };

  const handlePlayAgain = () => {
    handleStart();
  };

  const togglePause = () => {
    if (!hasStarted || isGameOver) return;
    setIsPaused((prev) => !prev);
    setRunning((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        colors={['#5aa0b8', '#4a90a4', '#3a8ba0', '#2e7d8f', '#1e5f7a']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={styles.backgroundImage}
      >
        <View style={styles.gameContainer}>
          <GameEngine
            key={engineKey}
            ref={gameEngineRef}
            style={styles.gameEngine}
            systems={[
              Physics,
              InputSystem,
              ObstacleSpawner,
              CoinSpawner,
              Difficulty,
              Cleanup,
              Collision,
              ScoreSystem,
            ]}
            entities={entities}
            running={running}
            onEvent={handleEvent}
          />
          <HUD
            score={score}
            bestScore={bestScore}
            isPaused={isPaused}
            onTogglePause={togglePause}
            visible={hasStarted && !isGameOver}
          />
          <StartScreen visible={!hasStarted} onStart={handleStart} />
          <GameOverOverlay
            visible={isGameOver}
            score={score}
            bestScore={bestScore}
            onPlayAgain={handlePlayAgain}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a5f',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gameContainer: {
    flex: 1,
    zIndex: 1,
  },
  gameEngine: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
