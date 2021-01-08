import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ gameover, isTimerActive, sequence, seconds, setSeconds }) => {
  // --> Possible states <--
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    let timeLeft = null;
    // If timer is actively counting down
    if (isTimerActive) {
      // interval is a variable - setSecondsLeft runs once
      timeLeft = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      if (secondsLeft === 0) {
        console.log('timer gameover');
        // gameover and stop the setInterval
        gameover();
        clearInterval(timeLeft);
      }
    }
    // returns the function - stops the setInterval.
    return () => clearInterval(timeLeft);
  }, [isTimerActive, secondsLeft]);

  return (
    <View>
      <Text>{secondsLeft}s</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({});
