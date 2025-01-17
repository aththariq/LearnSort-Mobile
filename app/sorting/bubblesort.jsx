import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BubbleSort = () => {
  const initialArray = [5, 3, 8, 4, 6];
  const [array, setArray] = useState([...initialArray]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedIndex, setSortedIndex] = useState(array.length);
  const intervalRef = useRef(null);
  const [iterations, setIterations] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  
  const isArraySorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  
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
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex < sortedIndex - 1) {
            setArray(prevArray => {
              const newArray = [...prevArray];
              if (newArray[prevIndex] > newArray[prevIndex + 1]) {
                [newArray[prevIndex], newArray[prevIndex + 1]] = 
                [newArray[prevIndex + 1], newArray[prevIndex]];
              }
              
              if (isArraySorted(newArray)) {
                clearInterval(intervalRef.current);
                setIsSorting(false);
                setIsTimerRunning(false); 
              }
              return newArray;
            });
            return prevIndex + 1;
          } else {
            
            setArray(prevArray => {
              if (isArraySorted(prevArray)) {
                clearInterval(intervalRef.current);
                setIsSorting(false);
                setIsTimerRunning(false); 
                return prevArray;
              }
              return prevArray;
            });
            setSortedIndex(prev => prev - 1);
            setIterations(prev => prev + 1); 
            return 0;
          }
        });
      }, 500);
    }
  };

  const pauseSorting = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
  };

  const resetSorting = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
    setArray([...initialArray]);
    setCurrentIndex(0);
    setSortedIndex(initialArray.length);
    setIterations(0);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}s`;
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-5">Bubble Sort</Text>
      <Text className="text-base mb-5">
        Bubble Sort adalah algoritma sorting sederhana yang bekerja dengan
        membandingkan dua elemen bersebelahan dan menukarnya jika urutannya
        salah.
      </Text>

      {/* Visualisasi Array */}
      <View className="flex-row justify-center mb-5">
        {array.map((value, index) => (
          <View
            key={index}
            className={`w-12 h-12 justify-center items-center mx-1 ${
              index === currentIndex || index === currentIndex + 1
                ? "bg-blue-200"
                : "bg-gray-200"
            }`}
          >
            <Text className="text-lg">{value}</Text>
          </View>
        ))}
      </View>

      {/* Kontrol Play/Pause/Reset */}
      <View className="flex-row justify-around">
        <TouchableOpacity
          className="bg-blue-500 px-6 py-2 rounded"
          onPress={startSorting}
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

export default BubbleSort;
