import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Learning Modules" }} />
      <Stack.Screen name="bubblesort" options={{ title: "Bubble Sort" }} />
      <Stack.Screen
        name="insertionsort"
        options={{ title: "Insertion Sort" }}
      />
      <Stack.Screen
        name="selectionsort"
        options={{ title: "Selection Sort" }}
      />
      <Stack.Screen name="mergesort" options={{ title: "Merge Sort" }} />
    </Stack>
  );
};

export default Layout;
