import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import axios from 'axios';
import CustomButton from './custom/ThemedButton';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, fromUser: true };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o-mini',
                    store: true,
                    messages: [
                        {
                            role: 'system',
                            content:
                                'You are a helpful assistant for a shoe store locator app. Only answer shoe-related and store-related FAQs. Keep your answers short and friendly.',
                        },
                        { role: 'user', content: input },
                    ],
                },
                {
                   headers: {
                        Authorization: 'Bearer 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', // Replace this with API KEY PROVIDED
                        'Content-Type': 'application/json',
                    },
                }
            );

            const botText = response.data.choices[0].message.content.trim();
            setMessages(prev => [...prev, { text: botText, fromUser: false }]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            } else {
                console.log('An unknown error occurred:', error);
            }
        }

        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
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
                    {loading && <Text style={{ marginTop: 10 }}>Bot is typing...</Text>}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Ask a question about stores..."
                        value={input}
                        onChangeText={setInput}
                        style={styles.input}
                        editable={!loading}
                    />
                    <CustomButton
                        title="Send"
                        onPress={handleSend}
                        backgroundColor={loading ? '#ccc' : '#424242'}
                        textColor="#fff"
                    />

                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Chatbot;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, },
    chat: { flex: 1, marginBottom: 10 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 50 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
    },
    message: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 4,
        maxWidth: '80%',
    },
    user: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
    bot: { alignSelf: 'flex-start', backgroundColor: '#EEE' },
    text: { fontSize: 16 },
});
