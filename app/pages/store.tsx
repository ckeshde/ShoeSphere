import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';
import CustomButton from '../../components/custom/ThemedButton';

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
      setIsFavorite(false); // Ensure button reverts immediately
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
        storeId: String(id),
        storeName: String(name),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsCard}>
  <Text style={styles.storeName}>{name}</Text>

  <View style={styles.detailRow}>
    <Text style={styles.label}>📍 Address:</Text>
    <Text style={styles.value}>{address}</Text>
  </View>

  <View style={styles.detailRow}>
    <Text style={styles.label}>📞 Phone:</Text>
    <Text style={styles.value}>{phone}</Text>
  </View>

  <View style={styles.detailRow}>
    <Text style={styles.label}>🕒 Opening Hours:</Text>
    <Text style={styles.value}>{openingHours}</Text>
  </View>

  <View style={styles.detailRow}>
    <Text style={styles.label}>🕕 Closing Hours:</Text>
    <Text style={styles.value}>{closingHours}</Text>
  </View>
</View>


      <View style={styles.buttonContainer}>
        {isFavorite ? (
          <CustomButton
            title="Delete from Favorites"
            onPress={handleRemoveFavorite}
            backgroundColor="#D32F2F"
          />
        ) : (
          <CustomButton
            title="Add to Favorites"
            onPress={handleAddFavorite}
            backgroundColor="#424242"
          />
        )}

        <CustomButton
          title="Go to Reviews"
          onPress={handleGoToReview}
          backgroundColor="#424242"
        />
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
  detailsCard: {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
  marginBottom: 20,
},

storeName: {
  fontSize: 26,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 12,
  textAlign: 'center',
},

detailRow: {
  flexDirection: 'row',
  marginBottom: 8,
  alignItems: 'flex-start',
},

label: {
  fontWeight: '600',
  width: 120,
  color: '#444',
},

value: {
  flex: 1,
  color: '#666',
  fontSize: 15,
},

});
