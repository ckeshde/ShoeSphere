// store.tsx
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { addFavorite } from '../../utils/addFavorite';

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

  const handleAddFavorite = async () => {
    try {
      await addFavorite({
        id,
        name,
        address,
        phone,
        openingHours,
        closingHours,
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
      Alert.alert('Success', `${name} added to favorites`);
    } catch (error) {
      Alert.alert('Error', 'Failed to add favorite');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text>Address: {address}</Text>
      <Text>Phone: {phone}</Text>
      <Text>Opening Hours: {openingHours}</Text>
      <Text>Closing Hours: {closingHours}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Add to Favorites" onPress={handleAddFavorite} />
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
