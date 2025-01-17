import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@env"; // Menggunakan variabel lingkungan

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleRegister = async () => {
    // Validasi input
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Harap isi semua field!");
      return;
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      Alert.alert("Error", "Password dan konfirmasi password tidak sama!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Registrasi berhasil! Silakan login.");
        router.replace("/(auth)/sign-in"); // Redirect ke halaman login
      } else {
        Alert.alert(
          "Registration Failed",
          data.message || "Something went wrong"
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while registering");
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Form Register di tengah layar */}
      <View className="flex-1 justify-center">
        {/* Judul Register */}
        <Text className="text-4xl font-bold mb-4 text-center">Register</Text>

        {/* Input Nama */}
        <TextInput
          className="w-full p-3 border border-gray-300 rounded mb-4"
          placeholder="Nama"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

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

        {/* Input Konfirmasi Password */}
        <View className="w-full relative mb-4">
          <TextInput
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={confirmPasswordVisibility}
          />
          <TouchableOpacity
            onPress={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-3"
          >
            {/* Ganti dengan ikon dari Ionicons */}
            {confirmPasswordVisibility ? (
              <Ionicons name="eye-off-outline" size={24} color="black" />
            ) : (
              <Ionicons name="eye-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>

        {/* Tombol Register */}
        <TouchableOpacity
          onPress={handleRegister}
          className="w-full bg-secondary p-3 rounded justify-center items-center mb-4"
        >
          <Text className="text-white font-bold">Sign Up</Text>
        </TouchableOpacity>

        {/* Link Login */}
        <Text className="mt-4 text-center">
          Already have an account?{" "}
          <Text
            onPress={() => router.replace("/sign-in")}
            className="text-blue-500"
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
