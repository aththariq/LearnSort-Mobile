import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <Text style={styles.header}>Register</Text>
        <Text style={styles.subText}>
          Already have an account?{' '}
          <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
            Login
          </Text>
        </Text>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Your username"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#ccc"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={showPassword}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.toggle} onPress={toggleShowPassword}>
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={showConfirmPassword}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.toggle} onPress={toggleShowConfirmPassword}>
            <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By registering, you agree to our
          <Text onPress={() => {}} style={styles.link}> Terms & Privacy Policy</Text>.
        </Text>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  keyboardView: {
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0a1944',
  },
  subText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  link: {
    color: '#0a1944',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',  // Changed to black
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  toggle: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  eyeIcon: {
    color: '#333',
  },
  button: {
    backgroundColor: '#0a1944',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  }
});

export default RegisterScreen;
