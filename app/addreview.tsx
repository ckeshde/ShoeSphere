import { useRouter } from 'expo-router';
import {addDoc, collection, Timestamp} from 'firebase/firestore';
import React , {useState} from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {db, auth} from './firebaseConfig';


export default function AddReviewScreen() {

    // const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if ( !content || !rating) {
            Alert.alert('Please fill in all fields');
            return;
        }

        const user = auth.currentUser;
        try {
            await addDoc(collection(db, 'reviews'), {
                username: user?.email?.split('@')[0] || 'guest', //Automatically obtain the email prefix
                rating: Number(rating),
                content,
                createdAt: Timestamp.now(),
            });
            Alert.alert('The review was submitted successfully!')
            router.back();
        } catch (error) {
            console.error('Failded to add a review:', error);
            Alert.alert('Submit failure')
        }
    };


    return (
        <View style={styles.container}>
          {/* <Text style={styles.label}>User name</Text> */}
          {/* <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Please enter your name" /> */}
          
          <Text style={styles.label}>Rating（1-5）</Text>
          <TextInput
            style={styles.input}
            value={rating}
            onChangeText={setRating}
            placeholder="Please enter the rating"
            keyboardType="numeric"
          />
    
          <Text style={styles.label}>Review content</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={content}
            onChangeText={setContent}
            placeholder="Please enter the content"
            multiline
          />
    
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, padding: 20, backgroundColor: '#fff' },
      label: { fontSize: 16, marginTop: 16 },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 8,
      },
    });