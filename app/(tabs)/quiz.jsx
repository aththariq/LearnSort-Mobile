import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { router } from "expo-router";

const QuizHome = () => {
  const [quizHistory, setQuizHistory] = useState([]);

  // Ambil history quiz saat komponen dimuat
  useEffect(() => {
    fetchQuizHistory();
  }, []);

  // Fungsi untuk mengambil history quiz
  const fetchQuizHistory = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        console.error("Token tidak ditemukan");
        return;
      }

      const response = await fetch(`${API_URL}/api/quiz/history`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQuizHistory(data.quizHistory || []);
      } else {
        console.error("Gagal mengambil history quiz");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fungsi untuk memulai quiz baru
  const startQuiz = async () => {
    try {
      console.log("Starting quiz..."); // Debug log
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) return;

      const response = await fetch(`${API_URL}/api/quiz/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Quiz data received:", data);

        if (data.quizId && data.quizzes) {
          // Simpan data quiz ke AsyncStorage
          await AsyncStorage.setItem("currentQuiz", JSON.stringify(data));

          // Navigasi ke halaman quiz
          router.push({
            pathname: "/(quiz)/index", // Sesuaikan dengan struktur file
            params: { quizId: data.quizId }, // Kirim quizId sebagai parameter
          });
        }
      }
    } catch (error) {
      console.error("Error in startQuiz:", error);
    }
  };

  // Render item history quiz
  const renderHistoryItem = ({ item }) => (
    <View className="p-3 my-1 bg-gray-200 rounded-lg">
      <Text className="text-base">
        Skor: {item.score} ({item.correctAnswers}/{item.totalQuestions})
      </Text>
      <Text className="text-sm text-gray-600">
        Waktu: {new Date(item.startTime).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-5">Quiz</Text>

      {/* Tombol Start Quiz */}
      <TouchableOpacity
        className="p-3 bg-blue-500 rounded-lg mb-5"
        onPress={startQuiz}
      >
        <Text className="text-white text-center">Start Quiz</Text>
      </TouchableOpacity>

      {/* Daftar History Quiz */}
      <Text className="text-xl font-bold mb-3">Quiz History</Text>
      <FlatList
        data={quizHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.quizId}
        ListEmptyComponent={<Text>Belum ada history quiz</Text>}
      />
    </View>
  );
};

export default QuizHome;
