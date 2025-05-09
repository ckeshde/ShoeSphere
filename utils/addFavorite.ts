// addFavorite.ts
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';

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
  const favoriteRef = collection(db, 'favorites');
  await addDoc(favoriteRef, store);
}
