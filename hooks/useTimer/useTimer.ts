import { useState, useEffect, useRef } from "react";

const useTimer = (initialTime: number, onTimeEnd: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          onTimeEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    stopTimer();
  };

  return { timeLeft, startTimer, stopTimer, resetTimer };
};

export default useTimer;
