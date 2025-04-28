import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function StoreSearch() {
  const [storeLocation, setStoreLocation] = useState<Coordinates | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [storeNotFound, setStoreNotFound] = useState(false);

  const router = useRouter();

  // Sample store data (this can be expanded in the future)
  const store = {
    name: 'Nike',
    coordinate: {
      latitude: -37.809970468810995,
      longitude: 144.96313006932527,
    },
    address: '211 La Trobe St, Melbourne VIC 3000, Australia',
    phone: '+61 3 8663 8000',
    openingHours: '9:00 AM',
    closingHours: '9:00 PM',
  };

  const handleSearch = () => {
    if (searchQuery.toLowerCase() === store.name.toLowerCase()) {
      // If search query matches the store name, update the coordinates
      setStoreLocation(store.coordinate);
      setStoreNotFound(false); // Reset the "not found" state
    } else {
      // If no store matches, show "not found" alert/message
      setStoreLocation(null);
      setStoreNotFound(true); // Set the "not found" state to true
      Alert.alert('Store Not Found', 'The store name does not match any location.');
    }
  };

  const handleMarkerPress = (marker: any) => {
    // Navigate to store.tsx and pass store details as params
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
    <View style={styles.screen}>
      <Text style={styles.title}>Search for a Shoe Store</Text>

      {/* Search input field */}
      <TextInput
        style={styles.input}
        placeholder="Enter store name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Search button */}
      <Button title="Search" onPress={handleSearch} />

      {/* Display map */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -37.81,
            longitude: 144.96,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {storeLocation && (
            <Marker
              coordinate={storeLocation}
              title={store.name}
              description={store.address}
              onPress={handleMarkerPress} // Navigate to the store details page when tapped
            />
          )}
        </MapView>
      </View>

      {/* Show "Not Found" message */}
      {storeNotFound && <Text style={styles.notFound}>Store not found. Please try again.</Text>}
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
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 16,
  },
  mapContainer: {
    height: 300,
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
