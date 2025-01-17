import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const Quiz = () => {
  const { quizId } = useLocalSearchParams();
  console.log("Received quizId:", quizId); // Debug log
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    console.log("Quiz mounted with quizId:", quizId); // Debug log
    loadQuizData();
  }, [quizId]);

  const loadQuizData = async () => {
    try {
      console.log("Loading quiz data..."); // Debug log
      const savedQuiz = await AsyncStorage.getItem("currentQuiz");

      if (savedQuiz) {
        const data = JSON.parse(savedQuiz);
        console.log("Loaded quiz data:", data); // Debug log
        setQuizData(data);
      } else {
        console.error("No quiz data found");
        router.back(); // Kembali jika tidak ada data
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken || !quizData) return;

      const response = await fetch(`${API_URL}/api/quiz/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          quizId: quizData.quizId,
          userAnswers,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        await AsyncStorage.setItem("lastQuizScore", result.score.toString());

        // Navigasi ke halaman hasil quiz
        router.push({
          pathname: "/quiz/result",
          params: {
            score: result.score,
            correctAnswers: result.correctAnswers,
            totalQuestions: result.totalQuestions,
          },
        });
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quizData) return <Text>Loading...</Text>;

  return (
    <ScrollView className="flex-1 p-5">
      {quizData.quizzes.map((quiz) => (
        <View key={quiz.id} className="mb-5">
          <Text className="text-lg font-bold mb-2">{quiz.question}</Text>
          {Object.entries(quiz.options).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              className={`p-3 my-1 rounded-lg ${
                userAnswers[quiz.id] === key ? "bg-blue-200" : "bg-gray-100"
              }`}
              onPress={() =>
                setUserAnswers((prev) => ({ ...prev, [quiz.id]: key }))
              }
            >
              <Text>
                {key}. {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity
        className="p-3 bg-blue-500 rounded-lg mb-5"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Quiz;
