import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/auth';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

export default function PaywallScreen() {
  const { upgradeToProVersion } = useAuth();

  const handleUpgrade = async () => {
    // In a real app, handle payment processing here
    await upgradeToProVersion();
    router.back();
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={100} style={styles.content}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Upgrade to Pro</Text>
        <Text style={styles.subtitle}>
          Get unlimited access to all features and take control of your finances
        </Text>

        <View style={styles.features}>
          <Feature icon="infinite" text="Unlimited receipt scanning" />
          <Feature icon="analytics" text="Advanced analytics" />
          <Feature icon="cloud-upload" text="Cloud backup" />
          <Feature icon="trending-up" text="Expense forecasting" />
        </View>

        <View style={styles.pricing}>
          <Text style={styles.price}>$9.99</Text>
          <Text style={styles.period}>/month</Text>
        </View>

        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
          <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Cancel anytime. Subscription auto-renews monthly.
        </Text>
      </BlurView>
    </View>
  );
}

function Feature({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.feature}>
      <Ionicons name={icon as any} size={24} color="#000" />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  features: {
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
  },
  pricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  period: {
    fontSize: 16,
    color: '#666',
  },
  upgradeButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});