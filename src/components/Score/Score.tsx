import React from "react";
import { Text } from "react-native";
import styles from "./Score.styles";

interface ScoreProps {
  score: number;
  bestScore: number;
}

const Score: React.FC<ScoreProps> = ({ score, bestScore }) => {
  return (
    <>
      <Text style={styles.counter}>Score: {score}</Text>
      <Text style={styles.bestScore}>Best Score: {bestScore}</Text>
    </>
  );
};

export default Score;
