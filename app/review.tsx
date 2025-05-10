import { FontAwesome } from '@expo/vector-icons'; 
import React, {useEffect, useState} from 'react';
import {useRouter} from 'expo-router';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import { TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import {db} from './firebaseConfig';

type Review = {
  id: string;
  username: string;
  content: string;
  rating: number;
  createdAt: string;
};

export default function ReviewScreen() {

  const [reviews, setReviews] = useState<Review[]>([]);
  const router = useRouter();

  // get review list
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Firestore query and dispaly the latest review
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc')); //In descednding  order oftime
        const querySnapshot = await getDocs(q);

        const fetchedReviews: Review[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            // username: data.username || 'Unknown User',
            username: data.username?.split('@')[0]|| 'Unknown',
            content: data.content || 'Very good store!',
            rating: data.rating || 5,
            createdAt: data.createdAt?.toDate().toLocaleString() || 'N/A',
          };
        });
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          // full star is star, empty star is star-o
          name={i <= rating ? 'star' : 'star-o'}
          size={16}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={styles.starRow}>{stars}</View>;
  };

  // render each review
  const renderItem = ({ item }: { item: Review }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
      {renderStars(item.rating)}
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.timestamp}>{item.createdAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      {/* Add review button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/addreview')}>
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
    borderRadius: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    marginVertical: 6,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  button: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});

