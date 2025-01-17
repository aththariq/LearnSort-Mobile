import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SelectionSort = () => {
  const initialArray = [5, 3, 8, 4, 6];
  const [array, setArray] = useState([...initialArray]);
  const [isSorting, setIsSorting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [iterations, setIterations] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState(1);
  const intervalRef = useRef(null);

  const isArraySorted = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  // Timer effect
  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  const startSorting = () => {
    if (!isSorting) {
      setIsSorting(true);
      setIsTimerRunning(true);
      setIterations(0);
      setCurrentIndex(0);
      setMinIndex(0);
      setSearchIndex(1);

      intervalRef.current = setInterval(() => {
        setArray(prevArray => {
          const newArray = [...prevArray];

          if (searchIndex < newArray.length) {
            if (newArray[searchIndex] < newArray[minIndex]) {
              setMinIndex(searchIndex);
            }
            setSearchIndex(prev => prev + 1);
          } else {
            // Swap elemen terkecil dengan currentIndex
            [newArray[currentIndex], newArray[minIndex]] = [newArray[minIndex], newArray[currentIndex]];
            setIterations(prev => prev + 1);

            const nextIndex = currentIndex + 1;
            if (nextIndex >= newArray.length - 1 || isArraySorted(newArray)) {
              clearInterval(intervalRef.current);
              setIsSorting(false);
              setIsTimerRunning(false);
            } else {
              setCurrentIndex(nextIndex);
              setMinIndex(nextIndex);
              setSearchIndex(nextIndex + 1);
            }
          }

          return newArray;
        });
      }, 500);
    }
  };

  const pauseSorting = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
    setIsTimerRunning(false);
  };

  const resetSorting = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
    setTimer(0);
    setIsTimerRunning(false);
    setIterations(0);
    setCurrentIndex(0);
    setMinIndex(0);
    setSearchIndex(1);
    setArray([...initialArray]);
  };

  const formatTime = ms => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}s`;
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-5">Selection Sort</Text>
      <Text className="text-base mb-5">
        Selection Sort adalah algoritma yang memilih elemen terkecil di sub-array
        dan menempatkannya di posisi yang benar secara bertahap.
      </Text>

      {/* Visualisasi Array */}
      <View className="flex-row justify-center mb-5">
        {array.map((value, index) => (
          <View
            key={index}
            className={`w-12 h-12 justify-center items-center mx-1 ${
              index === minIndex
                ? "bg-blue-300" // Elemen terkecil saat ini
                : index < currentIndex
                ? "bg-green-200" // Bagian yang sudah terurut
                : "bg-gray-200"  // Bagian yang belum terurut
            }`}
          >
            <Text className="text-lg">{value}</Text>
          </View>
        ))}
      </View>

      {/* Kontrol */}
      <View className="flex-row justify-around">
        <TouchableOpacity
          className="bg-blue-500 px-6 py-2 rounded"
          onPress={isSorting ? pauseSorting : startSorting}
        >
          <Text className="text-white text-lg">
            {isSorting ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-yellow-500 px-6 py-2 rounded"
          onPress={pauseSorting}
        >
          <Text className="text-white text-lg">Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 px-6 py-2 rounded"
          onPress={resetSorting}
        >
          <Text className="text-white text-lg">Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Display */}
      <View className="mt-5 items-center">
        <Text className="text-lg">Iterations: {iterations}</Text>
        <Text className="text-lg">Time: {formatTime(timer)}</Text>
      </View>
    </View>
  );
};

export default SelectionSort;
