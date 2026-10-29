export type ExpenseCategory = 
  | 'Food & Canteen'
  | 'Textbooks & Supplies'
  | 'Dorm & Rent'
  | 'Transport & Commute'
  | 'Coffee & Snacks'
  | 'Entertainment & Social'
  | 'Subscriptions'
  | 'Laundry & Groceries'
  | 'Emergency & Health'
  | 'Other';

export type PaymentMethod = 'Cash' | 'Debit Card / UPI' | 'Campus Meal Card' | 'Credit Card';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // YYYY-MM-DD
  paymentMethod: PaymentMethod;
  notes?: string;
  isSplit?: boolean;
  totalBillBeforeSplit?: number;
  splitWithPeopleCount?: number;
  roommateNote?: string;
  createdAt: number;
}

export interface BudgetConfig {
  monthlyAllowance: number;
  currency: string;
  currencySymbol: string;
  semesterName: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
}
