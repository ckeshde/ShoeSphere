import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; 
import { useRouter } from 'expo-router'; // jump to another page

export default function LoginScreen() {
  const [email, setEmail] = useState(''); // store email
  const [password, setPassword] = useState(''); // store password
  const router = useRouter(); // Enable the navigation jump function

  // The function executed when the "Login" button is clicked
  const handleLogin = async () => {
    try {
      // Use Firebase to login
      await signInWithEmailAndPassword(auth, email, password);
      console.log(" Login success")
      Alert.alert('Welcome!');

      // Jump to the main interface (tabs)
      router.replace('/(tabs)');
    } catch (error: any) {
      console.log('Login fail', error.message)
      Alert.alert('Login fail', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login ShoeSphere </Text>

      <TextInput
        style={styles.input}
        placeholder="Please enter your email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Please enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
      <View style={{ marginTop: 10 }} />
      <Button title="No account? Click to register" onPress={() => router.push('./register')} />
    </View>
  );
}

// CSS Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6
  }
});
