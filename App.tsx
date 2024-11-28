import React, { useState, useEffect, useCallback, useRef } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./App.styles";
import Score from "./src/components/Score/Score";
import Timer from "./src/components/Timer/Timer";
import ActionButton from "./src/components/ActionButton/ActionButton";
import GameControl from "./src/components/GameControl/GameControl";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [bestScore, setBestScore] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const pressCountRef = useRef(0);

  const saveBestScore = useCallback(async (score: number) => {
    try {
      await AsyncStorage.setItem("@best_score", score.toString());
    } catch (e) {
      console.error("Error saving best score", e);
    }
  }, []);

  const loadBestScore = useCallback(async () => {
    try {
      const savedScore = await AsyncStorage.getItem("@best_score");
      if (savedScore !== null) {
        setBestScore(parseInt(savedScore, 10));
      }
    } catch (e) {
      console.error("Error loading best score", e);
    }
  }, []);

  const stopGame = useCallback(() => {
    setGameOver(true);
    if (pressCountRef.current > bestScore) {
      setGameResult("You won");
      setBestScore(pressCountRef.current);
      saveBestScore(pressCountRef.current);
    } else {
      setGameResult("You lost");
    }
  }, [bestScore, saveBestScore]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setPressCount(0);
    pressCountRef.current = 0;
    setGameResult("");
    setTimeLeft(30);
  }, []);

  const startNewGame = useCallback(() => {
    setGameStarted(false);
    setGameOver(false);
    setPressCount(0);
    pressCountRef.current = 0;
    setGameResult("");
    setTimeLeft(30);
  }, []);

  useEffect(() => {
    loadBestScore();
  }, [loadBestScore]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (gameStarted && !gameOver) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            stopGame();
            clearInterval(interval!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [gameStarted, gameOver]);

  const handlePress = useCallback(() => {
    if (gameOver || !gameStarted) return;
    setPressCount((prev) => prev + 1);
    pressCountRef.current += 1;
  }, [gameOver, gameStarted]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Score score={pressCount} bestScore={bestScore} />

        <Timer timeLeft={timeLeft} />

        <ActionButton
          gameStarted={gameStarted}
          gameOver={gameOver}
          handlePress={handlePress}
          startGame={startGame}
          gameResult={gameResult}
        />

        <GameControl
          gameStarted={gameStarted}
          gameOver={gameOver}
          stopGame={stopGame}
          startNewGame={startNewGame}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
