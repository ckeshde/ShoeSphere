import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';  // Import the hook

export default function StoreScreen() {
  const router = useRouter();
  const { name, address, phone, openingHours, closingHours } = useLocalSearchParams();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Store Details</Text>

      <View style={styles.details}>
        <Text>Store: {name}</Text>
        <Text>Address: {address}</Text>
        <Text>Phone: {phone}</Text>
        <Text>Opening Hours: {openingHours}</Text>
        <Text>Closing Hours: {closingHours}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  details: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
});
