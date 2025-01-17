import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuizResult = () => {
  const { score, correctAnswers, totalQuestions } = useLocalSearchParams();
  console.log(
    "Received parameters in QuizResult:",
    score,
    correctAnswers,
    totalQuestions
  ); // Debug log

  const handleNext = async () => {
    if (parseInt(score) === 100) {
      await AsyncStorage.removeItem("currentQuiz");
      await AsyncStorage.removeItem("lastQuizScore");
      router.replace("/quiz"); // Kembali ke halaman /quiz
    } else {
      router.replace("/quiz"); // Kembali ke halaman /quiz
    }
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-5">Hasil Quiz</Text>
      <Text className="text-lg mb-3">Score: {score}</Text>
      <Text className="text-lg mb-5">
        Benar: {correctAnswers}/{totalQuestions}
      </Text>

      <TouchableOpacity
        className="p-3 bg-blue-500 rounded-lg"
        onPress={handleNext}
      >
        <Text className="text-white text-center">
          {parseInt(score) === 100 ? "Selesai" : "Coba Lagi"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizResult;
