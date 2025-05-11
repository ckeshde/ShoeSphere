import { FontAwesome } from '@expo/vector-icons'; 
import React, {useEffect, useState} from 'react';
import {useRouter, useLocalSearchParams} from 'expo-router';
import {collection, getDocs, orderBy, query, where, deleteDoc, doc} from 'firebase/firestore';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import {db} from './firebaseConfig';
import { getAuth } from 'firebase/auth';


type Review = {
  id: string;
  username: string;
  uid?: string;
  content: string;
  rating: number;
  createdAt: string;
};

export default function ReviewScreen() {

  const [reviews, setReviews] = useState<Review[]>([]);
  const router = useRouter();
  const currentUser = getAuth().currentUser;

  // const isOwnReview = item.uid === currentUser?.uid;
  //Get store ID
  const {storeId, storeName} = useLocalSearchParams()

  

  // get review list
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Firestore query and dispaly the latest review
        const q = query(collection(db, 'reviews'),  where('storeId', '==', storeId), orderBy('createdAt', 'desc')); //In descednding  order oftime
        const snapshot = await getDocs(q);

        const fetched = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            // username: data.username || 'Unknown User',
            username: data.username?.split('@')[0]|| 'Unknown',
            uid: data.uid,
            content: data.content,
            rating: data.rating,
            createdAt: data.createdAt?.toDate().toLocaleString() || 'N/A',
          };
        });
        setReviews(fetched);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [storeId]);

  // Delete button
  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'reviews', id));
              Alert.alert('Deleted!', 'The review has been deleted.');
              // Refresh list
              setReviews(prev => prev.filter(review => review.id !== id));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete the review');
            }
          },
        },
      ]
    );
  };
  

  // Render star ratings
  const renderStars = (rating: number) => {
    return( <View style={styles.starRow}>
      {[...Array(5)].map((_, index) => (
                <FontAwesome
                key={index}
                // full star is star, empty star is star-o
                name={index <= rating ? 'star' : 'star-o'}
                size={16}
                color="#FFD700"
              />
      ))}
      </View>
      );
  };
// 

  const renderItem = ({ item }: { item: Review }) => {
    const isOwnReview = item.uid === currentUser?.uid;
    return (
      <View style={[styles.card, isOwnReview && styles.ownCard]}>
        <Text style={styles.username}>{item.username}</Text>
        {renderStars(item.rating)}
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.footerRow}>
          <Text style={styles.timestamp}>{item.createdAt}</Text>
          {isOwnReview && (
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{storeName}Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      {/* Add review button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/addreview', params: { storeId, storeName } })}>
        <Text style={styles.buttonText}>Add review</Text>
      </TouchableOpacity>

      
      
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  ownCard: {
    borderWidth: 1.5,
    borderColor: '#007AFF',
    backgroundColor: '#e7f1ff',
  },
  username: { fontWeight: 'bold', marginBottom: 4 },
  content: { fontSize: 14, marginVertical: 6 },
  starRow: { flexDirection: 'row', marginBottom: 4 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  timestamp: { fontSize: 12, color: '#888' },
  deleteText: { color: 'red', fontSize: 13 },
  button: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 15 },});

