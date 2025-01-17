import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { router } from "expo-router";

const Home = () => {
  const [progressData, setProgressData] = useState({});
  const [recentHistory, setRecentHistory] = useState([]);
  const [completedModules, setCompletedModules] = useState({}); // State untuk menyimpan status modul yang sudah selesai

  useEffect(() => {
    fetchProgressData();
    loadCompletedModules(); // Muat status modul yang sudah selesai
  }, []);

  // Fungsi untuk memuat status modul yang sudah selesai dari AsyncStorage
  const loadCompletedModules = async () => {
    try {
      const savedModules = await AsyncStorage.getItem("completedModules");
      if (savedModules) {
        setCompletedModules(JSON.parse(savedModules));
      }
    } catch (error) {
      console.error("Error loading completed modules:", error);
    }
  };

  // Fungsi untuk menyimpan status modul yang sudah selesai ke AsyncStorage
  const saveCompletedModule = async (moduleName) => {
    try {
      const updatedModules = { ...completedModules, [moduleName]: true };
      setCompletedModules(updatedModules);
      await AsyncStorage.setItem(
        "completedModules",
        JSON.stringify(updatedModules)
      );
    } catch (error) {
      console.error("Error saving completed module:", error);
    }
  };

  const fetchProgressData = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        console.error("Token tidak ditemukan");
        return;
      }

      const response = await axios.get(`${API_URL}/api/user/progress`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log("Response Data:", response.data); // Debugging

      setProgressData(response.data.progress || {});
      setRecentHistory(response.data.progressHistory?.slice(0, 4) || []);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  // Fungsi untuk menambah progress saat memilih modul
  const handleModuleSelection = async (moduleName) => {
    try {
      // Jika modul sudah selesai, tidak perlu kirim request lagi
      if (completedModules[moduleName]) {
        console.log(`${moduleName} sudah selesai, tidak perlu kirim request`);
        return;
      }

      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        console.error("Token tidak ditemukan");
        return;
      }

      // Kirim request PUT ke /api/user/progress
      const response = await fetch(`${API_URL}/api/user/progress`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          module: moduleName,
        }),
      });

      if (response.ok) {
        console.log(`Progress untuk ${moduleName} berhasil ditambahkan`);
        await saveCompletedModule(moduleName); // Simpan status modul sebagai selesai
        fetchProgressData(); // Refresh progress data
      } else {
        console.error("Gagal mengupdate progress");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Render progress data as a list
  const renderProgress = () => {
    return Object.keys(progressData).map((key, index) => (
      <View key={index} className="p-3 my-1 bg-gray-100 rounded-lg">
        <Text className="text-base">
          {key}: {progressData[key]}%
        </Text>
      </View>
    ));
  };

  // Render recent history as a list
  const renderHistoryItem = ({ item }) => (
    <View className="p-3 my-1 bg-gray-200 rounded-lg">
      <Text className="text-base">
        {item.module}{" "}
        <Text className="text-green-600">+{item.percentageAdded}%</Text>
      </Text>
    </View>
  );

  return (
    <FlatList
      className="flex-1 p-5 bg-white"
      data={recentHistory} // Data untuk recent history
      ListHeaderComponent={
        <>
          <Text className="text-2xl font-bold mb-5">Your Progress</Text>

          {/* Progress Data */}
          <View className="mb-5">
            {Object.keys(progressData).length > 0 ? (
              renderProgress()
            ) : (
              <Text>No progress data available</Text>
            )}
          </View>

          {/* Menu Pilihan Sorting Algorithm */}
          <Text className="text-xl font-bold mt-5 mb-3">
            Choose Sorting Algorithm
          </Text>
          <View className="mb-5">
            <TouchableOpacity
              className="p-3 my-1 bg-blue-100 rounded-lg"
              onPress={async () => {
                await handleModuleSelection("Bubble Sort"); // Tambah progress
                router.push("/sorting/bubblesort"); // Navigasi ke halaman Bubble Sort
              }}
            >
              <Text className="text-base">Bubble Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 my-1 bg-blue-100 rounded-lg"
              onPress={async () => {
                await handleModuleSelection("Insertion Sort"); // Tambah progress
                router.push("/sorting/insertionsort"); // Navigasi ke halaman Insertion Sort
              }}
            >
              <Text className="text-base">Insertion Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 my-1 bg-blue-100 rounded-lg"
              onPress={async () => {
                await handleModuleSelection("Selection Sort"); // Tambah progress
                router.push("/sorting/selectionsort"); // Navigasi ke halaman Selection Sort
              }}
            >
              <Text className="text-base">Selection Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 my-1 bg-blue-100 rounded-lg"
              onPress={async () => {
                await handleModuleSelection("Merge Sort"); // Tambah progress
                router.push("/sorting/mergesort"); // Navigasi ke halaman Merge Sort
              }}
            >
              <Text className="text-base">Merge Sort</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Learning Module */}
          <Text className="text-xl font-bold mt-5 mb-3">Learning Module</Text>
          <View className="mb-5">
            <TouchableOpacity
              className="p-3 my-1 bg-purple-100 rounded-lg"
              onPress={() => router.push("/learning/bubblesort")} // Path ke learning
            >
              <Text className="text-base">Bubble Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 my-1 bg-purple-100 rounded-lg"
              onPress={() => router.push("/learning/insertionsort")} // Path ke learning
            >
              <Text className="text-base">Insertion Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 my-1 bg-purple-100 rounded-lg"
              onPress={() => router.push("/learning/selectionsort")} // Path ke learning
            >
              <Text className="text-base">Selection Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 my-1 bg-purple-100 rounded-lg"
              onPress={() => router.push("/learning/mergesort")} // Path ke learning
            >
              <Text className="text-base">Merge Sort</Text>
            </TouchableOpacity>
          </View>

          {/* Recent History Title */}
          <Text className="text-xl font-bold mt-5 mb-3">Recent History</Text>
        </>
      }
      renderItem={renderHistoryItem}
      keyExtractor={(item, index) => item._id || index.toString()} // Gunakan _id sebagai key
      ListEmptyComponent={<Text>No recent history available</Text>} // Tampilkan pesan jika data kosong
    />
  );
};

export default Home;
