
import { Feather, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function SettingsScreen() {

  const user = getAuth().currentUser;

  // when user click signout, it can jump to login page
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');

    } catch (error) {
      console.error('Logout error:', error);
    }
  };


    return (
      <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* user and email */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/usericon.png')} 
          style={styles.avatar}
        />
        <Text style={styles.emailText}>{user?.email || 'Guest'}</Text>
      </View>

      {/* favorite button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/favorites')}>
        <FontAwesome name="heart" size={20} color="red" style={styles.icon} />
        <Text style={styles.buttonText}>My Favorites</Text>
      </TouchableOpacity>

      {/* review button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('../review')}>
        <Feather name="edit-3" size={20} color="blue" style={styles.icon} />
        <Text style={styles.buttonText}>My Reviews</Text>
      </TouchableOpacity>

      {/* review button
      <TouchableOpacity style={styles.button} onPress={() => router.push('../review')}>
        <Feather name="edit-3" size={20} color="blue" style={styles.icon} />
        <Text style={styles.buttonText}>My Reviews</Text>
      </TouchableOpacity>
 */}

      {/* log out button */}
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginBottom: 10,
    },
    emailText: {
      fontSize: 20,
      fontWeight: '500',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
      padding: 18,
      borderRadius: 12,
      width: '80%',
      marginBottom: 18,
    },
    icon: {
      marginRight: 15,
    },
    buttonText: {
      fontSize: 20,
    },
    logoutText: {
      marginTop: 25,
      color: 'red',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  
  
  