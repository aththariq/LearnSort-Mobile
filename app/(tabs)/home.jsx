import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { router } from "expo-router"; // Import router dari Expo Router

const Home = () => {
  const [progressData, setProgressData] = useState({});
  const [recentHistory, setRecentHistory] = useState([]);

  useEffect(() => {
    fetchProgressData();
  }, []);

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
              onPress={() => router.push("/sorting/bubblesort")}
            >
              <Text className="text-base">Bubble Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 my-1 bg-blue-100 rounded-lg"
              onPress={() => router.push("/sorting/insertionsort")}
            >
              <Text className="text-base">Insertion Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 my-1 bg-blue-100 rounded-lg"
              onPress={() => router.push("/sorting/selectionsort")}
            >
              <Text className="text-base">Selection Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 my-1 bg-blue-100 rounded-lg"
              onPress={() => router.push("/sorting/mergesort")}
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
