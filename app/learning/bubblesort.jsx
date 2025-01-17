import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { router } from "expo-router";

const BubbleSort = () => {
  const [isDone, setIsDone] = useState(false); // State untuk menandai apakah tombol sudah ditekan

  const handleDone = async () => {
    try {
      // Ambil token dari AsyncStorage
      const userToken = await AsyncStorage.getItem("userToken");
      console.log("User Token:", userToken); // Debugging
      if (!userToken) {
        console.error("Token tidak ditemukan");
        return;
      }

      // Periksa API URL
      console.log("API URL:", `${API_URL}/api/user/progress`); // Debugging

      // Kirim request ke API dengan method PUT
      const response = await fetch(`${API_URL}/api/user/progress`, {
        method: "PUT", // Ganti dari POST ke PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          module: "Bubble Sort",
        }),
      });

      // Periksa respons dari API
      console.log("Response Status:", response.status); // Debugging
      const responseData = await response.json();
      console.log("Response Data:", responseData); // Debugging

      if (response.ok) {
        // Jika berhasil, set state isDone menjadi true
        setIsDone(true);

        // Arahkan ke halaman home
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
      <Text className="text-2xl font-bold mb-5">Bubble Sort</Text>
      <WebView
        source={{ uri: "https://www.youtube.com/embed/xli_FI7CuzA" }}
        className="h-64 mb-5"
      />
      <Text className="text-base mb-5">
        Bubble Sort adalah algoritma sorting sederhana yang berulang kali
        menelusuri daftar, membandingkan elemen yang berdekatan dan menukarnya
        jika mereka berada dalam urutan yang salah.
      </Text>
      <TouchableOpacity
        className={`p-3 rounded-lg ${isDone ? "bg-gray-400" : "bg-blue-500"}`} // Ubah warna tombol berdasarkan state isDone
        onPress={isDone ? null : handleDone} // Non-aktifkan tombol jika isDone true
        disabled={isDone} // Non-aktifkan tombol jika isDone true
      >
        <Text className="text-white text-center">
          {isDone ? "Completed" : "Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BubbleSort;
