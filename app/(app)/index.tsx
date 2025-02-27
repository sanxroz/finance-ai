import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useExpenseStore } from '../../store/expenseStore';
import { useAuth } from '../../context/auth';

export default function HomeScreen() {
  const { expenses, loadExpenses, deleteExpense } = useExpenseStore();
  const { isPro } = useAuth();

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    console.log('Expenses:', expenses);
  }, [expenses]);

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.amount !== null &&
      expense.category !== null &&
      expense.date !== null
  );

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + (typeof expense.amount === 'number' ? expense.amount : 0),
    0
  );

  const renderRightActions = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            "Delete Expense",
            "Are you sure you want to delete this expense?",
            [
              { text: "Cancel", style: "cancel" },
              { 
                text: "Delete", 
                onPress: () => {
                  deleteExpense(item.id);
                },
                style: "destructive"
              }
            ]
          );
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://i.pinimg.com/736x/f0/cd/c4/f0cdc47ddb7f9dd5e86c3e7915c8b337.jpg' }} 
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <Text style={styles.title}>My Expenses</Text>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Spent</Text>
          <Text style={styles.totalAmount}>${totalExpenses.toFixed(2)}</Text>
        </View>
      </View>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (!item.category || !item.date || item.amount <= 0) return null; // Filter out empty items
            return (
              <ReanimatedSwipeable renderRightActions={() => renderRightActions(item)}>
                <View style={styles.expenseItem}>
                  <View>
                    <Text style={styles.expenseCategory}>{item.category}</Text>
                    <Text style={styles.expenseDate}>
                      {new Date(item.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.expenseAmount}>
                    ${item.amount.toFixed(2)}
                  </Text>
                </View>
              </ReanimatedSwipeable>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No expenses yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Start by scanning a receipt
              </Text>
            </View>
          }
        />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  totalContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: '600',
  },
  expenseDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  headerImage: {
    width: '100%',
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    padding: 8,
  },
});
