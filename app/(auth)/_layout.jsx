import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in" // Halaman login
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up" // Halaman register
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
