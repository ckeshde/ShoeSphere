
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {StyleSheet, Text,TouchableOpacity, View} from 'react-native';
import { auth } from '../firebaseConfig';
import * as Linking from 'expo-linking';

export default function SettingsScreen() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* User information */}
      <TouchableOpacity style={styles.item} onPress={() => router.push('../settings pages/profile')}>
        <FontAwesome name="user-circle-o" size={20} color="#333" style={styles.icon} />
        <Text style={styles.itemText}>{user?.email || 'Guest'}</Text>
        <Feather name="chevron-right" size={20} color="#999" style={styles.arrow} />
      </TouchableOpacity>

      {/* My favorite */}
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.item} onPress={() => router.push('/favorites')}>
          <Feather name="heart" size={20} color="#e91e63" style={styles.icon} />
          <Text style={styles.itemText}>My Favorite</Text>
          <Feather name="chevron-right" size={20} color="#999" style={styles.arrow} />
        </TouchableOpacity>

        {/* My review */}
        <TouchableOpacity style={styles.item} onPress={() => router.push('/review')}>
          <MaterialIcons name="rate-review" size={20} color="#2196f3" style={styles.icon} />
          <Text style={styles.itemText}>My Review</Text>
          <Feather name="chevron-right" size={20} color="#999" style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('../settings pages/terms')}>
          <Feather name="file-text" size={20} color="#4caf50" style={styles.icon} />
          <Text style={styles.itemText}>Terms & Privacy</Text>
          <Feather name="chevron-right" size={20} color="#999" style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('../settings pages/help')}>
          <Feather name="help-circle" size={20} color="#03a9f4" style={styles.icon} />
          <Text style={styles.itemText}>Help & Support</Text>
          <Feather name="chevron-right" size={20} color="#999" style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://shoesphere-d37fd.web.app/')}>
          <Text style={{ color: 'blue', marginTop: 20 }}>Team Introduce</Text>
        </TouchableOpacity>

       
      </View>

      {/* Sign out */}
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
  },
  icon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    marginLeft: 'auto',
  },
  logoutText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#d00',
  },
});