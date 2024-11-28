import React from "react";
import { Text } from "react-native";
import styles from "./Timer.styles";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return <Text style={styles.timer}>Time left: {timeLeft}s</Text>;
};

export default Timer;
