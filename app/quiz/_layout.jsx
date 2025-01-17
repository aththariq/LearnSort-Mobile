import { Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[quizId]"
        options={{
          title: "Quiz", // Judul untuk halaman quiz dengan parameter quizId
          headerShown: true,
          headerBackTitle: "Kembali", // Teks tombol panah kiri
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          title: "Hasil Quiz", // Judul untuk halaman hasil quiz
          headerShown: true,
          headerBackTitle: "Kembali", // Teks tombol panah kiri
        }}
      />
    </Stack>
  );
}
