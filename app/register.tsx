import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, Image} from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebaseConfig'; 
import { useRouter } from 'expo-router';  // jump to another page



export default function RegisterScreen() {
    const [email, setEmail] = useState('');       // store email
    const [password, setPassword] = useState(''); // store password
    const router = useRouter();                  // jump
  
    const handleRegister = async () => {
      try {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log("Register success");
          Alert.alert("Register success！");
  
          router.replace('/(tabs)');  // jumpt to homepage
        } catch (error: any) {
          console.log(error.message);
          Alert.alert("Register fail", error.message); 
        }
    };
  
    return (
      <View style={styles.container}>
        <Image source = {require('../assets/logo.png')}
               style = {{width: 120, height: 120, borderRadius: 60, marginBottom: 20, alignSelf: 'center'}}
        />
        <Text style={styles.title}>Register ShoeSphere</Text>
        <TextInput
          placeholder="Please enter your email address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Please enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Register" onPress={handleRegister} />
        <Button title="Already have an account? Return to login" onPress={() => router.replace('/login')} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20, },
    title: {  fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center' },
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
