import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

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
        <Text style={styles.label}>Algorithm:</Text>
        <Picker
          selectedValue={algorithm}
          style={styles.picker}
          onValueChange={handleAlgorithmChange}
          mode="dropdown" // Android only
        >
          <Picker.Item label="Bubble Sort" value="bubble" />
          <Picker.Item label="Merge Sort" value="merge" />
          <Picker.Item label="Quick Sort" value="quick" />
          <Picker.Item label="Heap Sort" value="heap" />
        </Picker>
      </View>
      <View style={styles.controlSection}>
        <Text style={styles.label}>Array Size: {arraySize}</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={50}
          value={arraySize}
          onValueChange={setArraySize}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          thumbTintColor="#307ecc"
        />
        <Text style={styles.label}>Speed: {speed} sec/step</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={2}
          step={0.1}
          value={speed}
          onValueChange={setSpeed}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          thumbTintColor="#307ecc"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Play" color="#0a1944" onPress={() => console.log('Play pressed')} />
        <Button title="Reset" color="#0a1944" onPress={() => console.log('Reset pressed')} />
        <Button title="Explain Sorting" color="#0a1944" onPress={() => console.log('Explain pressed')} />
      </View>
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
    color: '#0a1944',
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  picker: {
    width: '100%',
    height: 44,
  },
  controlSection: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  }
});

export default SortScreen;
