import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./GameControl.styles";

interface GameControlProps {
  gameStarted: boolean;
  gameOver: boolean;
  stopGame: () => void;
  startNewGame: () => void;
}

const GameControl: React.FC<GameControlProps> = ({
  gameStarted,
  gameOver,
  stopGame,
  startNewGame,
}) => {
  return (
    <View style={styles.container}>
      {gameOver ? (
        <TouchableOpacity
          onPress={startNewGame}
          style={styles.startNewGameButton}
        >
          <Text style={styles.stopButtonText}>Start New Game</Text>
        </TouchableOpacity>
      ) : gameStarted ? (
        <TouchableOpacity onPress={stopGame} style={styles.stopButton}>
          <Text style={styles.stopButtonText}>Stop Game</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

export default GameControl;
