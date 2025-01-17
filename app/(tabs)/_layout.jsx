import { Tabs } from "expo-router";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white", // Warna teks dan ikon saat aktif
        tabBarInactiveTintColor: "gray", // Warna teks dan ikon saat tidak aktif
        tabBarStyle: {
          backgroundColor: "#ffffff", // Warna background tab bar
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      {/* Tab Home */}
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? "white" : "gray"} // Warna ikon berubah saat aktif
              style={{
                backgroundColor: focused ? "#FF6F61" : "transparent", // Warna background ikon saat aktif
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
          headerTitle: "Quiz",
          tabBarLabel: "Quiz",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="quiz"
              size={24}
              color={focused ? "white" : "gray"} // Warna ikon berubah saat aktif
              style={{
                backgroundColor: focused ? "#FF6F61" : "transparent", // Warna background ikon saat aktif
                padding: 8,
                borderRadius: 8,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
