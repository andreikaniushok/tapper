import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  circleButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    margin: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  gameOverButton: {
    backgroundColor: "#d9d9d9",
  },
  gameResultWin: {
    color: "green",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  gameResultLose: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  activeButton: {
    backgroundColor: "#FF6347",
  },
  startButton: {
    backgroundColor: "#4CAF50",
  },
});

export default styles;
