import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BubbleSort = () => {
  const initialArray = [5, 3, 8, 4, 6];
  const [array, setArray] = useState([...initialArray]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedIndex, setSortedIndex] = useState(array.length);
  const intervalRef = useRef(null);

  const startSorting = () => {
    if (!isSorting) {
      setIsSorting(true);
      intervalRef.current = setInterval(() => {
        setArray((prevArray) => {
          const newArray = [...prevArray];
          if (currentIndex < sortedIndex - 1) {
            // Bandingkan dan tukar elemen
            if (newArray[currentIndex] > newArray[currentIndex + 1]) {
              [newArray[currentIndex], newArray[currentIndex + 1]] = [
                newArray[currentIndex + 1],
                newArray[currentIndex],
              ];
            }
            setCurrentIndex((prevIndex) => prevIndex + 1);
          } else {
            // Selesai satu iterasi, reset indeks dan kurangi sortedIndex
            setSortedIndex((prevSortedIndex) => prevSortedIndex - 1);
            setCurrentIndex(0);
            // Jika array sudah terurut, hentikan interval
            if (sortedIndex <= 1) {
              clearInterval(intervalRef.current);
              setIsSorting(false);
            }
          }
          return newArray;
        });
      }, 500); // Delay 500ms untuk setiap langkah
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
    </View>
  );
};

export default BubbleSort;
