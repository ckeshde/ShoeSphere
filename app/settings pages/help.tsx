import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help and Support</Text>
      <Text style={styles.text}>
      If you encounter any problems while using, please contact support@shoeshere.com.
      We will contact you as soon as possible to provide technical support and response. Thank you for using our App!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});