
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";


export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-5xl font-semibold">Aora!!</Text>
      <StatusBar style="auto" />
      <Link href={"/profile"} className="text-blue-700">Go to Profile</Link>
    </View>
  );
}
