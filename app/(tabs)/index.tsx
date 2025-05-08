
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import StoreSearch from '../pages/storesearch';
import { useEffect } from 'react';
import { useRouter, useNavigationContainerRef } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SeedStores from '../../hooks/useAddStore';


export default function HomeScreen() {

  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // it will jump to homepage when user login
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    });

    return () => unsubscribe();
  }, []);
  

  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text>It is redirecting to the login page...</Text>
  //   </View>
  // );


  return (
    <View style={styles.screen}>
      <Text>Hello</Text>
      <StoreSearch />
      {/* <SeedStores/> */}
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