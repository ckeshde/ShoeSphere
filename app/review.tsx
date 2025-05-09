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

}

