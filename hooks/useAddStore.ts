// pages/seedStores.tsx (or useAddStore.ts if used as a hook)
import { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig'; // adjust the path if needed

export default function SeedStores() {
  useEffect(() => {
    const addStore = async () => {
      try {
        const docRef = await addDoc(collection(db, 'stores'), {
          name: 'Nike Northland',
          latitude: -37.72665,
          longitude: 145.02973,
          address: 'Shop J36, Northland Shopping Centre, 2-50 Murray Rd, Preston VIC 3072',
          phone: '0399647655',
          openingHours: '9:00 AM',
          closingHours: '9:00 PM',
        });
        console.log('Store added with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding store: ', e);
      }
    };

    addStore();
  }, []);

  return null;
}
