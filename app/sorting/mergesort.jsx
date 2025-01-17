import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MergeSort = () => {
  const initialArray = [5, 3, 8, 4, 6];
  const [array, setArray] = useState([...initialArray]);
  const [isSorting, setIsSorting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [iterations, setIterations] = useState(0);
  const intervalRef = useRef(null);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(initialArray.length - 1);
  const [mid, setMid] = useState(Math.floor((0 + (initialArray.length - 1)) / 2));
  const [phase, setPhase] = useState('split'); // split atau merge
  const [indexLeft, setIndexLeft] = useState(0);
  const [indexRight, setIndexRight] = useState(0);
  const [tempArray, setTempArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

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

  useEffect(() => {
    if (isSorting && currentStep < steps.length) {
      const intervalId = setInterval(() => {
        setArray(steps[currentStep]);
        setIterations(prev => prev + 1);
        setCurrentStep(prev => prev + 1);

        if (currentStep >= steps.length - 1) {
          clearInterval(intervalId);
          setIsSorting(false);
          setIsTimerRunning(false);
        }
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [isSorting, currentStep, steps]);

  const pauseSorting = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
    setIsTimerRunning(false);
  };

  const resetSorting = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
    setIsTimerRunning(false);
    setTimer(0);
    setIterations(0);
    setArray([...initialArray]);
    setLeft(0);
    setRight(initialArray.length - 1);
    setMid(Math.floor((0 + (initialArray.length - 1)) / 2));
    setPhase('split');
    setIndexLeft(0);
    setIndexRight(0);
    setTempArray([]);
    setSteps([]);
    setCurrentStep(0);
  };

  const mergeProcess = (arr, l, m, r) => {
    const leftPart = arr.slice(l, m + 1);
    const rightPart = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < leftPart.length && j < rightPart.length) {
      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        i++;
      } else {
        arr[k] = rightPart[j];
        j++;
      }
      k++;
    }
    while (i < leftPart.length) {
      arr[k] = leftPart[i];
      i++; k++;
    }
    while (j < rightPart.length) {
      arr[k] = rightPart[j];
      j++; k++;
    }
    return arr;
  };

  const doMergeSort = (arr, l, r, steps) => {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    doMergeSort(arr, l, m, steps);
    doMergeSort(arr, m + 1, r, steps);
    merge(arr, l, m, r, steps);
  };

  const merge = (arr, l, m, r, steps) => {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;
      steps.push([...arr]);
    }

    while (i < left.length) {
      arr[k] = left[i];
      i++;
      k++;
      steps.push([...arr]);
    }

    while (j < right.length) {
      arr[k] = right[j];
      j++;
      k++;
      steps.push([...arr]);
    }
  };

  const startSorting = () => {
    if (!isSorting) {
      setIsSorting(true);
      setIsTimerRunning(true);
      setIterations(0);
      setCurrentStep(0);

      const newArray = [...array];
      const generatedSteps = [];
      doMergeSort(newArray, 0, newArray.length - 1, generatedSteps);
      setSteps(generatedSteps);
    }
  };

  const formatTime = ms => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}s`;
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-5">Merge Sort</Text>
      <Text className="text-base mb-5">
        Merge Sort menggunakan pendekatan divide-and-conquer untuk membagi
        array menjadi bagian kecil, lalu menggabungkannya secara berurutan.
      </Text>

      {/* Visualisasi Array */}
      <View className="flex-row justify-center mb-5">
        {array.map((value, index) => (
          <View
            key={index}
            className={`w-12 h-12 justify-center items-center mx-1 ${
              "bg-gray-200"
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

export default MergeSort;
