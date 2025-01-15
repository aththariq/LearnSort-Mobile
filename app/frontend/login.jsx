import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('assets/icons/home.png')} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.linkText}>
        Don't have an account?{' '}
        <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
          Register
        </Text>
      </Text>
      <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
        <Image style={styles.googleLogo} source={require('assets/icons/eye.png')} />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text>or</Text>
        <View style={styles.line} />
      </View>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={passwordVisibility}
        />
        <TouchableOpacity style={styles.toggle} onPress={togglePasswordVisibility}>
          <Text style={styles.toggleIcon}>{passwordVisibility ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={() => {}}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.terms}>
        By proceeding with login, you agree to our{' '}
        <Text style={styles.link} onPress={() => {}}>
          Terms & Privacy Policy
        </Text>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f6f7f2',
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linkText: {
    marginVertical: 10,
  },
  link: {
    color: 'blue',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  toggle: {
    position: 'absolute',
    right: 10,
    top: 18,
  },
  toggleIcon: {
    fontSize: 18,
  },
  signInButton: {
    backgroundColor: '#0a1944',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  terms: {
    marginTop: 20,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export default LoginScreen;
