import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./ActionButton.styles";

interface ActionButtonProps {
  gameStarted: boolean;
  gameOver: boolean;
  handlePress: () => void;
  startGame: () => void;
  gameResult: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  gameStarted,
  gameOver,
  handlePress,
  startGame,
  gameResult,
}) => {
  return (
    <TouchableOpacity
      onPress={gameOver ? undefined : gameStarted ? handlePress : startGame}
      style={[
        styles.circleButton,
        gameOver
          ? styles.gameOverButton
          : gameStarted
          ? styles.activeButton
          : styles.startButton,
      ]}
      disabled={gameOver}
    >
      {gameOver ? (
        <Text
          style={[
            gameResult === "You won"
              ? styles.gameResultWin
              : styles.gameResultLose,
          ]}
        >
          {gameResult}
        </Text>
      ) : (
        <Text style={styles.buttonText}>
          {gameStarted ? "Tap me" : "Start"}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ActionButton;
