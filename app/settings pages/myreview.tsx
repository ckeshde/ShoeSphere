import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Review = {
  id: string;
  storeId: string;
  storeName?: string;  
  username: string;
  content: string;
  rating: number;
  createdAt: string;
};

export default function MyReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const user = getAuth().currentUser;
  const router = useRouter();

  // Load the reviews fo the current user
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

  // Delete review
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', id));
      
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      Alert.alert('Fail to delete', 'Please try again later');
    }
  };

  // Render rating
  const renderStars = (rating: number) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
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
  };

  // Each review renders the item
  const renderItem = ({ item }: { item: Review }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: '/review',
          params: {
            storeId: item.storeId,
            storeName: item.storeName || '',
          },
        });
      }}
    >
      <Text style={styles.username}>{item.username}</Text>
      {renderStars(item.rating)}
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.timestamp}>{item.createdAt}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My review</Text>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  username: { fontWeight: 'bold', fontSize: 16 },
  content: { fontSize: 14, marginVertical: 8 },
  timestamp: { fontSize: 12, color: '#888' },
  deleteText: { color: 'red', fontWeight: 'bold', marginLeft: 16 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});