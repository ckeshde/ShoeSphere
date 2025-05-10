import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import { FavoriteStore } from '../../utils/addFavorite';

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteStore[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const favRef = collection(db, 'favorites');

    // Real-time listener
    const unsubscribe = onSnapshot(
      favRef,
      (snapshot) => {
        const favList: FavoriteStore[] = snapshot.docs.map((doc) => doc.data() as FavoriteStore);
        setFavorites(favList);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching favorites:', error);
        setLoading(false);
      }
    );

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleStorePress = (store: FavoriteStore) => {
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

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (favorites.length === 0) {
    return <Text style={styles.emptyText}>No favorite stores yet.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Stores</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.storeItem}
            onPress={() => handleStorePress(item)}
          >
            <Text style={styles.storeName}>{item.name}</Text>
            <Text style={styles.storeAddress}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  storeItem: {
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
  },
});
