import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import Icon from 'react-native-vector-icons/FontAwesome'; 

type Store = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  openingHours: string;
  closingHours: string;
};

export default function StoreSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchedStores, setMatchedStores] = useState<Store[]>([]);
  const { location, errorMsg } = useCurrentLocation();
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const storesRef = collection(db, 'stores');
      const querySnapshot = await getDocs(storesRef);

      if (querySnapshot.empty) {
        Alert.alert('Store Not Found', 'No stores found in Firestore.');
        setMatchedStores([]);
        return;
      }

      const stores: Store[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        stores.push({
          id: doc.id,
          name: data.name,
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address,
          phone: data.phone,
          openingHours: data.openingHours,
          closingHours: data.closingHours,
        });
      });

      // Filter stores based on the search query (case-insensitive)
      const filteredStores = stores.filter((store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredStores.length === 0) {
        Alert.alert('Store Not Found', 'No matching store found.');
      }

      setMatchedStores(filteredStores);
    } catch (error) {
      console.error('Error fetching stores:', error);
      Alert.alert('Error', 'Could not fetch stores from database.');
    }
  };

  const handleMarkerPress = (store: Store) => {
    router.push({
      pathname: '/pages/store',
      params: {
        name: store.name,
        address: store.address,
        phone: store.phone,
        openingHours: store.openingHours,
        closingHours: store.closingHours,
      },
    });
  };

  return (
    <View>
      <Text style={styles.title}>Search for a Store</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter store name"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />

      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="You are here" >
            <Icon name="map-marker" size={40} color="blue" />
            </Marker>
            {matchedStores.map((store) => (
              <Marker
                key={store.id}
                coordinate={{ latitude: store.latitude, longitude: store.longitude }}
                title={store.name}
                description={store.address}
                onPress={() => handleMarkerPress(store)}
              />
            ))}
          </MapView>
        ) : (
          <Text>{errorMsg || 'Fetching location...'}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 16,
  },
  mapContainer: {
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  notFound: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
