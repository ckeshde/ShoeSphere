// FavoritesFilter.tsx
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';
import { Store } from './filterStores';

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Store[]>([]);
  
  // Fetch favorite stores from Firebase
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesRef = collection(db, 'favorites');
        const querySnapshot = await getDocs(favoritesRef);
        const favoriteStores: Store[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          favoriteStores.push({
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

        setFavorites(favoriteStores);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);
  
  return { favorites };
}
