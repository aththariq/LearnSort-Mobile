import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function SortingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sorting Algorithms",
          headerShown: true,
        }}
      />
      <Stack.Screen name="bubblesort" />
      <Stack.Screen name="insertionsort" />
      <Stack.Screen name="selectionsort" />
      <Stack.Screen name="mergesort" />
    </Stack>
  );
}
