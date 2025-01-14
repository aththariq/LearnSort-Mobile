import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Picker, Slider } from 'react-native';

const SortScreen = () => {
  const [algorithm, setAlgorithm] = useState('bubble');
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(0.5);

  const handleAlgorithmChange = (itemValue) => {
    setAlgorithm(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sorting Algorithm Playground</Text>
      <View style={styles.dropdown}>
        <Text>Algorithm:</Text>
        <Picker
          selectedValue={algorithm}
          style={styles.picker}
          onValueChange={(itemValue) => handleAlgorithmChange(itemValue)}
        >
          <Picker.Item label="Bubble Sort" value="bubble" />
          <Picker.Item label="Merge Sort" value="merge" />
          <Picker.Item label="Quick Sort" value="quick" />
          <Picker.Item label="Heap Sort" value="heap" />
        </Picker>
      </View>
      <View style={styles.controls}>
        <Text>Array Size: {arraySize}</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={50}
          value={arraySize}
          onValueChange={(value) => setArraySize(value)}
        />
        <Text>Speed: {speed} sec/step</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={2}
          step={0.1}
          value={speed}
          onValueChange={(value) => setSpeed(value)}
        />
      </View>
      <Button title="Play" onPress={() => console.log('Play pressed')} />
      <Button title="Reset" onPress={() => console.log('Reset pressed')} />
      <Button title="Explain Sorting" onPress={() => console.log('Explain pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
  },
  picker: {
    width: 200,
    height: 44,
  },
  controls: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
  }
});

export default SortScreen;
