import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export default function App() {
  const [orientation, setOrientation] = useState('portrait');

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = orientation === 'landscape' ? 90 : 0;
    return {
      transform: [{ rotateZ: `${rotation}deg` }],
    };
  });

  useEffect(() => {
    const subscription = Accelerometer.addListener((data) => {
      const { x, y, z } = data;
      // Implement logic to determine orientation based on accelerometer data
      // For example, you can check if x is significantly larger than y and z
      const isLandscape = Math.abs(x) > 0.8; // Adjust threshold as needed
      setOrientation(isLandscape ? 'landscape' : 'portrait');
    });

    return () => subscription.remove();
  }, []);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text>Orientation: {orientation}</Text>
      <StatusBar style="auto" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',   

  },
});