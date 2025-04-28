
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import StoreSearch from '../pages/storesearch';

import { useEffect } from 'react';
import { useRouter, useNavigationContainerRef } from 'expo-router';


export default function HomeScreen() {

  const router = useRouter();

  useEffect(() => {
    // Delay the jump to ensure that the RootLayout is mounted
    const timeout = setTimeout(() => {
      router.replace('./login');
    }, 100); // 100ms delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>It is redirecting to the login page...</Text>
    </View>
  );


  return (
    <View style={styles.screen}>
      <Text>Hello</Text>
      <StoreSearch />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});