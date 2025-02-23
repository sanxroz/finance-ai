import { create } from 'zustand';
import * as FileSystem from 'expo-file-system';

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  note: string;
  imageUri?: string;
}

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  loadExpenses: () => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

const EXPENSES_FILE = `${FileSystem.documentDirectory}expenses.json`;

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: [],
  
  addExpense: async (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    
    const expenses = [...get().expenses, newExpense];
    await FileSystem.writeAsStringAsync(EXPENSES_FILE, JSON.stringify(expenses));
    set({ expenses });
  },
  
  loadExpenses: async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(EXPENSES_FILE);
      if (!fileExists.exists) {
        await FileSystem.writeAsStringAsync(EXPENSES_FILE, JSON.stringify([]));
        return;
      }
      
      const data = await FileSystem.readAsStringAsync(EXPENSES_FILE);
      set({ expenses: JSON.parse(data) });
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  },
  
  deleteExpense: async (id) => {
    const expenses = get().expenses.filter(expense => expense.id !== id);
    await FileSystem.writeAsStringAsync(EXPENSES_FILE, JSON.stringify(expenses));
    set({ expenses });
  },
}));