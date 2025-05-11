// app/pages/faq.tsx
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import Chatbot from '../../components/Chatbot';

const ChatbotScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Chatbot />
    </SafeAreaView>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }
});
