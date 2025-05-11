import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import {useRouter} from 'expo-router';

type Review = {
  id: string;
  storeId: string;
  storeName?: string;
  username: string;
  content: string;
  rating: number;
  createdAt: string;
};

export default function MyReviewsScreen() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const user = getAuth().currentUser;

  const router = useRouter();

  // Load the reviews of current user
  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        if (!user) return;
        const q = query(
          collection(db, 'reviews'),
          where('uid', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const fetched: Review[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            storeId: data.storeId,
            storeName: data.storeName || '',
            username: data.username,
            content: data.content,
            rating: data.rating,
            createdAt: data.createdAt?.toDate().toLocaleString() || '',
          };
        });
        setReviews(fetched);
      } catch (error) {
        console.error('Load fail:', error);
      }
    };

    fetchMyReviews();
  }, []);

  // Render rating
  const renderStars = (rating: number) => (
    <View style={styles.starRow}>
      {[...Array(5)].map((_, i) => (
        <FontAwesome
          key={i}
          name={i < rating ? 'star' : 'star-o'}
          size={16}
          color="#FFD700"
        />
      ))}
    </View>
  );

  // Delete review
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', id));
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      Alert.alert('Fail to delete', 'Please try again later');
    }
  };

  // The displayed content of each review
  const renderItem = ({ item }: { item: Review }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
      {renderStars(item.rating)}
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.timestamp}>{item.createdAt}</Text>

      <TouchableOpacity
        onPress={() =>
          Alert.alert('Confirm delete', 'Are you sure you want to delete this review', [
            { text: 'Cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => handleDelete(item.id) },
          ])
        }
      >
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My review</Text>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', margin: 16 },
  list: { paddingHorizontal: 16 },
  card: {
    marginBottom: 12,
    padding: 14,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  username: { fontWeight: 'bold', marginBottom: 4 },
  content: { marginVertical: 6 },
  timestamp: { fontSize: 12, color: '#999', textAlign: 'right' },
  delete: { color: 'red', textAlign: 'right', marginTop: 8 },
  starRow: { flexDirection: 'row', marginBottom: 4 },
});