import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const InsertionSort = () => {
  const initialArray = [5, 3, 8, 4, 6];
  const [array, setArray] = useState([...initialArray]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1); // Indeks elemen yang sedang diproses
  const [compareIndex, setCompareIndex] = useState(currentIndex - 1); // Indeks elemen yang dibandingkan
  const [iterations, setIterations] = useState(0); // Jumlah iterasi
  const [timer, setTimer] = useState(0); // Timer
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Status timer
  const intervalRef = useRef(null);

  // Timer effect
  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  // Fungsi untuk memeriksa apakah array sudah terurut
  const isArraySorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  // Fungsi untuk memulai sorting
  const startSorting = () => {
    if (!isSorting) {
      setIsSorting(true);
      setIsTimerRunning(true);
      setIterations(0);
      setCurrentIndex(1);
      setCompareIndex(currentIndex - 1);

      intervalRef.current = setInterval(() => {
        setArray((prevArray) => {
          const newArray = [...prevArray];

          // Jika elemen sebelumnya lebih besar, lakukan pertukaran
          if (
            compareIndex >= 0 &&
            newArray[compareIndex] > newArray[compareIndex + 1]
          ) {
            [newArray[compareIndex], newArray[compareIndex + 1]] = [
              newArray[compareIndex + 1],
              newArray[compareIndex],
            ];
            setIterations((prev) => prev + 1);
            setCompareIndex((prev) => prev - 1); // Geser ke kiri untuk membandingkan lagi
          } else {
            // Jika tidak ada pertukaran, pindah ke elemen berikutnya
            setCurrentIndex((prev) => prev + 1);
            setCompareIndex(currentIndex - 1); // Mulai membandingkan dari elemen sebelumnya
          }

          // Jika sudah mencapai akhir array
          if (currentIndex >= newArray.length) {
            if (isArraySorted(newArray)) {
              clearInterval(intervalRef.current);
              setIsSorting(false);
              setIsTimerRunning(false);
            } else {
              // Jika belum terurut, ulangi dari awal
              setCurrentIndex(1);
              setCompareIndex(currentIndex - 1);
            }
          }

          return newArray;
        });
      }, 500); // Delay 500ms untuk setiap langkah
    }
  };

  // Fungsi untuk menghentikan sorting
  const pauseSorting = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
    setIsTimerRunning(false);
  };

  // Fungsi untuk mereset sorting
  const resetSorting = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
    setArray([...initialArray]);
    setCurrentIndex(1);
    setCompareIndex(currentIndex - 1);
    setIterations(0);
    setTimer(0);
    setIsTimerRunning(false);
  };

  // Fungsi untuk memformat waktu
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, "0")}s`;
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-5">Insertion Sort</Text>
      <Text className="text-base mb-5">
        Insertion Sort adalah algoritma sorting yang bekerja dengan cara
        membandingkan dan memindahkan elemen ke posisi yang tepat di bagian
        array yang sudah terurut.
      </Text>

      {/* Visualisasi Array */}
      <View className="flex-row justify-center mb-5">
        {array.map((value, index) => (
          <View
            key={index}
            className={`w-12 h-12 justify-center items-center mx-1 ${
              index === compareIndex || index === compareIndex + 1
                ? "bg-blue-200" // Elemen yang sedang dibandingkan
                : index < currentIndex
                ? "bg-green-200" // Bagian yang sudah terurut
                : "bg-gray-200" // Bagian yang belum terurut
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

export default InsertionSort;
