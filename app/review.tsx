import { router } from 'expo-router';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

const reviews = [
    {
        id: '1',
        name: 'Alice',
        rating: '5',
        content: 'Amazing store! Shoes are very beautiful!',
        date: '2025-5-1',
    },
    {
        id: '2',
        name: 'Musk',
        rating: '4.5',
        content: 'Very good shoe stroe!',
        date: '2025-5-2',
    },
]

export default function ReviewScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Sneaker Zone</Text>
  
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reviewBox}>
              <Text style={styles.name}>{item.name} ⭐️ {item.rating}/5</Text>
              <Text style={styles.content}>{item.content}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          )}
        />
  
        <View style={{ marginTop: 20 }}>
          <Button title="Add review" onPress={() => router.push('./addreview')} />
        </View>
      </View>
  
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    reviewBox: {
      backgroundColor: '#f2f2f2',
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
    },
    name: { fontWeight: 'bold', marginBottom: 4 },
    content: { fontSize: 16, marginBottom: 4 },
    date: { fontSize: 12, color: 'gray' },
  });