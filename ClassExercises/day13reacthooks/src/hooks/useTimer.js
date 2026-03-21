import { useState, useEffect, useRef } from "react";

function useTimer() {

  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {

    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSeconds(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { seconds, startTimer, stopTimer, resetTimer };

}

export default useTimer;