import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { router } from "expo-router";

const InsertionSort = () => {
  const [isDone, setIsDone] = useState(false); // State untuk menandai apakah tombol sudah ditekan

  // Cek status isDone dari AsyncStorage saat komponen dimuat
  useEffect(() => {
    const checkDoneStatus = async () => {
      const doneStatus = await AsyncStorage.getItem("insertionSortDone");
      if (doneStatus === "true") {
        setIsDone(true);
      }
    };

    checkDoneStatus();
  }, []);

  const handleDone = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        console.error("Token tidak ditemukan");
        return;
      }

      const response = await fetch(`${API_URL}/api/user/progress`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          module: "Insertion Sort",
        }),
      });

      if (response.ok) {
        setIsDone(true); // Set state isDone menjadi true
        await AsyncStorage.setItem("insertionSortDone", "true"); // Simpan status ke AsyncStorage
        router.push("/home");
      } else {
        console.error("Gagal mengupdate progress");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-5">Insertion Sort</Text>
      <WebView
        source={{ uri: "https://www.youtube.com/embed/JU767SDMDvA" }}
        className="h-64 mb-5"
      />
      <Text className="text-base mb-5">
        Insertion Sort adalah algoritma sorting yang membangun array yang
        diurutkan satu elemen pada satu waktu dengan membandingkan setiap elemen
        dengan elemen yang sudah diurutkan dan memasukkannya ke posisi yang
        benar.
      </Text>
      <TouchableOpacity
        className={`p-3 rounded-lg ${isDone ? "bg-gray-400" : "bg-blue-500"}`} // Ubah warna tombol berdasarkan state isDone
        onPress={isDone ? null : handleDone} // Non-aktifkan tombol jika isDone true
        disabled={isDone} // Non-aktifkan tombol jika isDone true
      >
        <Text className="text-white text-center">
          {isDone ? "Completed" : "Done"} 
          isDone
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InsertionSort;
