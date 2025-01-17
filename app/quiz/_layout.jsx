import { Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Quiz",
          headerShown: true,
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          title: "Hasil Quiz",
          headerShown: true,
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
