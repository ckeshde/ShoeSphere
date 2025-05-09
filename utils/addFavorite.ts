// addFavorite.ts
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';
import { Alert } from 'react-native';


export interface FavoriteStore {
  id: string | string[];
  name: string | string[];
  address: string | string[];
  phone: string | string[];
  openingHours: string | string[];
  closingHours: string | string[];
  latitude: number;
  longitude: number;
}

export async function addFavorite(store: FavoriteStore) {
  try {
    const favoriteRef = collection(db, 'favorites');

    // Query Firestore for a store with the same ID
    const q = query(favoriteRef, where('id', '==', store.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      Alert.alert('Already Added', 'You have already added this store to favorites.');
      return;
    }

    // Store doesn't exist, add it
    await addDoc(favoriteRef, store);
    Alert.alert('Success', 'Store added to favorites!');
  } catch (error) {
    console.error('Error adding favorite:', error);
    Alert.alert('Error', 'Failed to add to favorites.');
  }
}
