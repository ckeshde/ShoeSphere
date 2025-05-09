// storesearch.tsx
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import {
  filterStoresByNameAndDistance,
  Store,
  convertToMeters,
} from '../../utils/filterStores';

export default function StoreSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchedStores, setMatchedStores] = useState<Store[]>([]);
  const [allStores, setAllStores] = useState<Store[]>([]);
  const [selectedRadius, setSelectedRadius] = useState(5000);

  const { location, errorMsg } = useCurrentLocation();
  const router = useRouter();

  const handleRadiusSelect = (radiusInKm: number) => {
    setSelectedRadius(convertToMeters(radiusInKm));
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesRef = collection(db, 'stores');
        const querySnapshot = await getDocs(storesRef);
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

        setAllStores(stores);
      } catch (error) {
        console.error('Error fetching stores:', error);
        Alert.alert('Error', 'Could not fetch stores from database.');
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const filtered = filterStoresByNameAndDistance(
      allStores,
      searchQuery,
      location,
      selectedRadius
    );
    setMatchedStores(filtered);
  }, [searchQuery, allStores, location, selectedRadius]);

  const handleMarkerPress = (store: Store) => {
    router.push({
      pathname: '/pages/store',
      params: {
        id: String(store.id),
        name: String(store.name),
        address: String(store.address),
        phone: String(store.phone),
        openingHours: String(store.openingHours),
        closingHours: String(store.closingHours),
        latitude: String(store.latitude),
        longitude: String(store.longitude),
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
        onChangeText={(text) => setSearchQuery(text)}
      />

      <View style={styles.radiusContainer}>
        <Text style={styles.radiusLabel}>Filter by distance:</Text>
        <View style={styles.buttonGroup}>
          {[5000, 10000, 30000].map((radius) => (
            <TouchableOpacity
              key={radius}
              style={[
                styles.radiusButton,
                selectedRadius === radius && styles.radiusButtonSelected,
              ]}
              onPress={() => setSelectedRadius(radius)}
            >
              <Text
                style={[
                  styles.radiusButtonText,
                  selectedRadius === radius && styles.radiusButtonTextSelected,
                ]}
              >
                {radius / 1000} km
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="You are here" />
            {matchedStores.map((store) => (
              <Marker
                key={store.id}
                coordinate={{
                  latitude: store.latitude,
                  longitude: store.longitude,
                }}
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
    marginBottom: 10,
    borderRadius: 4,
    fontSize: 16,
    marginHorizontal: 10,
  },
  radiusContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  radiusLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  radiusButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
  },
  radiusButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  radiusButtonText: {
    fontSize: 14,
    color: '#333',
  },
  radiusButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
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
