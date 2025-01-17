import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@env";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession(); // Untuk menangani redirect setelah login

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  // Konfigurasi Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "1007158782494-j5u6ksed2gjdpg097r7fjegmtfb8a0hc.apps.googleusercontent.com", // Ganti dengan Expo Client ID Anda
    iosClientId:
      "1007158782494-itc4ov8k3dh9fgd9iceenmqfgphtrsjc.apps.googleusercontent.com", // Ganti dengan iOS Client ID Anda
  });

  // Handle login dengan Google
  const handleGoogleLogin = async () => {
    try {
      // Memulai proses login dengan Google
      const result = await promptAsync();
      if (result.type === "success") {
        // Dapatkan ID token dari respons
        const { id_token } = result.params;

        // Kirim ID token ke backend
        const response = await fetch(`${API_URL}/api/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: id_token, // Kirim ID token ke backend
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Simpan token JWT dan arahkan ke halaman home
          await AsyncStorage.setItem("userToken", data.token);
          router.replace("/(tabs)/home");
        } else {
          Alert.alert("Login Failed", data.message || "Something went wrong");
        }
      } else {
        Alert.alert("Login Failed", "Google login was canceled or failed");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      Alert.alert("Error", "An error occurred while logging in with Google");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleLogin = async () => {
    try {
      console.log("API URL:", `${API_URL}/api/auth/login`); // Debugging
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log("Response Status:", response.status); // Debugging
      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (response.ok) {
        router.replace("/(tabs)/home");
      } else {
        Alert.alert("Login Failed", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("API Error:", error); // Debugging
      Alert.alert("Error", "An error occurred while logging in");
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Form Login di tengah layar */}
      <View className="flex-1 justify-center w-full">
        {/* Judul Login */}
        <Text className="text-4xl font-bold mb-4 text-center">Login</Text>

        {/* Input Email */}
        <TextInput
          className="w-full p-3 border border-gray-300 rounded mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Input Password */}
        <View className="w-full relative mb-4">
          <TextInput
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={passwordVisibility}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="absolute right-3 top-3"
          >
            {/* Ganti dengan ikon dari Ionicons */}
            {passwordVisibility ? (
              <Ionicons name="eye-off-outline" size={24} color="black" />
            ) : (
              <Ionicons name="eye-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>

        {/* Tombol Login */}
        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-secondary p-3 rounded justify-center items-center mb-4"
        >
          <Text className="text-white font-bold">Sign In</Text>
        </TouchableOpacity>

        {/* Separator "OR" */}
        <View className="flex-row items-center w-full mb-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Tombol Sign In with Google */}
        <TouchableOpacity
          className="w-full flex-row items-center justify-center bg-red-500 p-3 rounded mb-4"
          onPress={handleGoogleLogin}
          disabled={!request}
        >
          <Ionicons name="logo-google" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Sign In with Google</Text>
        </TouchableOpacity>

        {/* Link Register */}
        <Text className="mt-4 text-center">
          Don't have an account?{" "}
          <Text
            onPress={() => router.push("/sign-up")}
            className="text-blue-500"
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
