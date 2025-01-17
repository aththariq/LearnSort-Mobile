import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@env";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleLogin = async () => {
    try {
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

      const data = await response.json();

      if (response.ok) {
        router.replace("/home");
      } else {
        Alert.alert("Login Failed", data.message || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging in");
      console.error(error);
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
          onPress={() => {
            Alert.alert("Info", "Sign In with Google clicked");
          }}
        >
          <Ionicons name="logo-google" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Sign In with Google</Text>
        </TouchableOpacity>

        {/* Link Register */}
        <Text className="mt-4 text-center">
          Don't have an account?{" "}
          <Text
            onPress={() => router.push("/(auth)/sign-up")}
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
