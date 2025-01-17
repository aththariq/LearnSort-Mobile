import { Tabs } from "expo-router";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white", // Warna teks dan ikon saat aktif
          tabBarInactiveTintColor: "gray", // Warna teks dan ikon saat tidak aktif
          tabBarStyle: {
            backgroundColor: "#ffffff", // Warna background tab bar
            borderTopWidth: 1,
            borderTopColor: "#e5e5e5",
            height: 20,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          headerShown: false, // Sembunyikan header di (tabs)
        }}
      >
        {/* Tab Home */}
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color }) => (
              <Entypo
                name="home"
                size={24}
                color={focused ? "white" : "gray"} // Warna ikon berubah saat aktif
                style={{
                  backgroundColor: focused ? "#0A1A45" : "transparent", // Warna background ikon saat aktif
                  padding: 8,
                  borderRadius: 8,
                }}
              />
            ),
          }}
        />

        {/* Tab Quiz */}
        <Tabs.Screen
          name="quiz"
          options={{
            tabBarLabel: "Quiz",
            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons
                name="quiz"
                size={24}
                color={focused ? "white" : "gray"} // Warna ikon berubah saat aktif
                style={{
                  backgroundColor: focused ? "#0A1A45" : "transparent", // Warna background ikon saat aktif
                  padding: 8,
                  borderRadius: 8,
                }}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
