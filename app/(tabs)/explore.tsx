// explore.tsx
import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Store } from '../../utils/filterStores';
import { useRouter } from 'expo-router';

export default function Explore() {
  const [allStores, setAllStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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
        setFilteredStores(stores);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = allStores.filter((store) =>
      store.name.toLowerCase().includes(lowerQuery)
    );
    setFilteredStores(filtered);
  }, [searchQuery, allStores]);

  const handleStorePress = (store: Store) => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Explore All Stores</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by store name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleStorePress(item)}>
            <Text style={styles.storeName}>{item.name}</Text>
            <Text style={styles.storeAddress}>{item.address}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No stores found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
  },
  item: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    marginBottom: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storeAddress: {
    fontSize: 14,
    color: '#555',
  },
  empty: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});
