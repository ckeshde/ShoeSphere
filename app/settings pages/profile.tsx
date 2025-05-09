import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function ProfileScreen() {
  const [user] = useAuthState(auth);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {/* User photo */}
      <Image
        source={require('../assets/usericon.png')}
        style={styles.avatar}
      />

      {/* User email */}
      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{user?.email ? user.email : 'Guest'}</Text>

      {/* UID */}
      <Text style={styles.label}>UserID</Text>
      <Text style={styles.value}>{user?.uid || 'no'}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  
});