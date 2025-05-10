import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';

export default function Store() {
  const {
    name,
    address,
    phone,
    openingHours,
    closingHours,
    latitude,
    longitude,
    id,
  } = useLocalSearchParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const [docId, setDocId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    const snapshot = await getDocs(collection(db, 'favorites'));
    const match = snapshot.docs.find((docSnap) => docSnap.data().id === id);
    if (match) {
      setIsFavorite(true);
      setDocId(match.id);
    } else {
      setIsFavorite(false);
      setDocId(null);
    }
  };

  const handleAddFavorite = async () => {
    if (isFavorite) {
      Alert.alert('Already Added', 'This store is already in your favorites.');
      return;
    }

    try {
      await addDoc(collection(db, 'favorites'), {
        id,
        name,
        address,
        phone,
        openingHours,
        closingHours,
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
      setIsFavorite(true);
      Alert.alert('Success', `${name} added to favorites`);
    } catch (error) {
      Alert.alert('Error', 'Failed to add favorite');
    }
  };

  const handleRemoveFavorite = async () => {
    if (!docId) return;

    try {
      await deleteDoc(doc(db, 'favorites', docId));
      setIsFavorite(false);
      setDocId(null);
      Alert.alert('Removed', `${name} removed from favorites`);
    } catch (error) {
      Alert.alert('Error', 'Failed to remove favorite');
    }
  };

  const handleGoToReview = () => {
    router.push({
      pathname: '/review',
      params: {
        id: String(id),
        name: String(name),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text>Address: {address}</Text>
      <Text>Phone: {phone}</Text>
      <Text>Opening Hours: {openingHours}</Text>
      <Text>Closing Hours: {closingHours}</Text>

      <View style={styles.buttonContainer}>
        {isFavorite ? (
          <Button title="Delete from Favorites" onPress={handleRemoveFavorite} />
        ) : (
          <Button title="Add to Favorites" onPress={handleAddFavorite} />
        )}

        <View style={{ marginTop: 10 }}>
          <Button title="Go to Reviews" onPress={handleGoToReview} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
