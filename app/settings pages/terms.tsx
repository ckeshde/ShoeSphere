
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function TermsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms and Privacy</Text>
      <Text style={styles.text}>
      Welcome to ShoeSphere. This application is committed to protecting user privacy. All user data is only used to provide service experience and will not be disclosed to any third party.
      By using this application, you agree to our terms of use and Privacy policy. We reserve the right to change the content. Thank you for your understanding and support.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
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