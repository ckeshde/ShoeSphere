import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useCurrentLocation } from '../../hooks/useCurrentLocation'; // ✅ adjust the path if needed

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function StoreSearch() {
  const [storeLocation, setStoreLocation] = useState<Coordinates | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [storeNotFound, setStoreNotFound] = useState(false);
  const { location, errorMsg } = useCurrentLocation(); // ✅ custom hook

  const router = useRouter();

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
      setStoreLocation(store.coordinate);
      setStoreNotFound(false);
    } else {
      setStoreLocation(null);
      setStoreNotFound(true);
      Alert.alert('Store Not Found', 'The store name does not match any location.');
    }
  };

  const handleMarkerPress = () => {
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
      <Text style={styles.title}>Search for a Shoe Store</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter store name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <Button title="Search" onPress={handleSearch} />

      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            provider={PROVIDER_DEFAULT}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="You are here" />
            {storeLocation && (
              <Marker
                coordinate={storeLocation}
                title={store.name}
                description={store.address}
                onPress={handleMarkerPress}
              />
            )}
          </MapView>
        ) : (
          <Text>{errorMsg || 'Fetching location...'}</Text>
        )}
      </View>

      {storeNotFound && <Text style={styles.notFound}>Store not found. Please try again.</Text>}
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
