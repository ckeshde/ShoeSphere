// components/Chatbot.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

const faqData: { [key: string]: string } = {
  "opening hours": "Most stores are open from 10 AM to 8 PM.",
  "weekends": "Yes, stores are open on weekends.",
  "return policy": "You can return shoes within 14 days with a receipt.",
  "brands": "We support major brands like Nike, Adidas, Puma, and Reebok.",
  "payment methods": "Most stores accept cash, credit/debit cards, and mobile payments."
};

const getAnswer = (question: string): string => {
  const q = question.toLowerCase();
  if (q.includes("open") && q.includes("weekend")) return faqData["weekends"];
  if (q.includes("return")) return faqData["return policy"];
  if (q.includes("brand")) return faqData["brands"];
  if (q.includes("pay")) return faqData["payment methods"];
  if (q.includes("hour") || q.includes("open")) return faqData["opening hours"];
  return "Sorry, I didn’t understand. Please try asking differently.";
};

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string, fromUser: boolean }[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, fromUser: true };
    const botMsg = { text: getAnswer(input), fromUser: false };
    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat} contentContainerStyle={{ paddingBottom: 10 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[styles.message, msg.fromUser ? styles.user : styles.bot]}
          >
            <Text style={styles.text}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask a question..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  chat: { flex: 1, marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginRight: 8 },
  message: { padding: 10, borderRadius: 10, marginVertical: 4, maxWidth: '80%' },
  user: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
  bot: { alignSelf: 'flex-start', backgroundColor: '#EEE' },
  text: { fontSize: 16 }
});
