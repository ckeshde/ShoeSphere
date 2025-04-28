import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
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
      router.replace('/');
    } catch (error: any) {
      console.log('Login fail', error.message)
      Alert.alert('Login fail', error.message);
    }
  };

  return (
    <View style={styles.container}>
       <Image source = {require('../assets/logo.png')}
                     style = {{width: 120, height: 120, borderRadius: 60, marginBottom: 20, alignSelf: 'center'}}
              />
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
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    // padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    paddingHorizontal: 10,
    fontSize: 16
  }
});
