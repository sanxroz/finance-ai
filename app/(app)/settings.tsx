import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../context/auth';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { logout, isPro, upgradeToProVersion } = useAuth();

  const handleUpgrade = () => {
    Alert.alert(
      'Upgrade to Pro',
      'Get unlimited receipt scanning and advanced analytics for $9.99/month',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Upgrade',
          onPress: () => {
            // In a real app, handle payment processing here
            upgradeToProVersion();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {!isPro && (
          <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
            <View style={styles.upgradeContent}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text style={styles.upgradeText}>Upgrade to Pro</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  upgradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  upgradeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#ff3b30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});