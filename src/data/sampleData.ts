import { Expense, ExpenseCategory, BudgetConfig, SavingsGoal } from '../types';

export interface CategoryMeta {
  name: ExpenseCategory;
  iconName: string;
  color: string;
  bgLight: string;
  textColor: string;
  description: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    name: 'Food & Canteen',
    iconName: 'Utensils',
    color: '#f97316',
    bgLight: 'bg-orange-50 dark:bg-orange-950/30',
    textColor: 'text-orange-700 dark:text-orange-300',
    description: 'Campus cafeteria, mess food, meal plans, dinners',
  },
  {
    name: 'Textbooks & Supplies',
    iconName: 'BookOpen',
    color: '#2563eb',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    description: 'Coursebooks, notebooks, stationery, printouts',
  },
  {
    name: 'Coffee & Snacks',
    iconName: 'Coffee',
    color: '#d97706',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textColor: 'text-amber-700 dark:text-amber-300',
    description: 'Campus cafe, study fuel, vending machines, boba',
  },
  {
    name: 'Dorm & Rent',
    iconName: 'Home',
    color: '#8b5cf6',
    bgLight: 'bg-purple-50 dark:bg-purple-950/30',
    textColor: 'text-purple-700 dark:text-purple-300',
    description: 'Room rent, dorm dues, utilities, room supplies',
  },
  {
    name: 'Transport & Commute',
    iconName: 'Bus',
    color: '#06b6d4',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/30',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    description: 'Metro pass, bus fares, bike repairs, cab rides',
  },
  {
    name: 'Entertainment & Social',
    iconName: 'Gamepad2',
    color: '#ec4899',
    bgLight: 'bg-pink-50 dark:bg-pink-950/30',
    textColor: 'text-pink-700 dark:text-pink-300',
    description: 'Movies, college fest, weekend outings, bowling',
  },
  {
    name: 'Subscriptions',
    iconName: 'Tv',
    color: '#10b981',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    description: 'Spotify Student, Prime Student, cloud storage',
  },
  {
    name: 'Laundry & Groceries',
    iconName: 'ShoppingBag',
    color: '#14b8a6',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    textColor: 'text-teal-700 dark:text-teal-300',
    description: 'Laundromat, dorm snacks, ramen, toiletries',
  },
  {
    name: 'Emergency & Health',
    iconName: 'HeartPulse',
    color: '#ef4444',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textColor: 'text-rose-700 dark:text-rose-300',
    description: 'Medicine, health center visits, clinic',
  },
  {
    name: 'Other',
    iconName: 'Tag',
    color: '#64748b',
    bgLight: 'bg-slate-50 dark:bg-slate-900/40',
    textColor: 'text-slate-700 dark:text-slate-300',
    description: 'Miscellaneous student personal purchases',
  },
];

export const CURRENCY_OPTIONS = [
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar (C$)' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar (A$)' },
];

export const DEFAULT_BUDGET: BudgetConfig = {
  monthlyAllowance: 450,
  currency: 'USD',
  currencySymbol: '$',
  semesterName: 'Fall Semester',
};

// Generate realistic dates around current time
const today = new Date();
const formatDate = (daysAgo: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    title: 'Calculus II Used Textbook',
    amount: 38.00,
    category: 'Textbooks & Supplies',
    date: formatDate(1),
    paymentMethod: 'Debit Card / UPI',
    notes: 'Bought from senior student on campus bookstore board',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'exp-2',
    title: 'Campus Canteen Lunch + Iced Tea',
    amount: 7.50,
    category: 'Food & Canteen',
    date: formatDate(0),
    paymentMethod: 'Campus Meal Card',
    notes: 'South dining hall wrap combo',
    createdAt: Date.now() - 3600000 * 3,
  },
  {
    id: 'exp-3',
    title: 'Late Night Study Espresso & Muffin',
    amount: 5.25,
    category: 'Coffee & Snacks',
    date: formatDate(1),
    paymentMethod: 'Cash',
    notes: 'Library cafe during midterms prep',
    createdAt: Date.now() - 86400000 * 1.2,
  },
  {
    id: 'exp-4',
    title: 'Shared Dorm WiFi Bill (Split)',
    amount: 15.00,
    category: 'Dorm & Rent',
    date: formatDate(3),
    paymentMethod: 'Debit Card / UPI',
    isSplit: true,
    totalBillBeforeSplit: 45.00,
    splitWithPeopleCount: 3,
    roommateNote: 'High-speed fiber bill split evenly among 3 roommates ($45 total)',
    notes: 'Paid Alex via venmo',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'exp-5',
    title: 'Monthly Student Bus & Rail Transit Pass',
    amount: 32.00,
    category: 'Transport & Commute',
    date: formatDate(5),
    paymentMethod: 'Debit Card / UPI',
    notes: 'Unlimited campus zone & downtown rides',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'exp-6',
    title: 'Spotify Student Discount Plan',
    amount: 5.99,
    category: 'Subscriptions',
    date: formatDate(7),
    paymentMethod: 'Debit Card / UPI',
    notes: 'Student verification applied',
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: 'exp-7',
    title: 'Dorm Laundry Card Recharge',
    amount: 12.00,
    category: 'Laundry & Groceries',
    date: formatDate(8),
    paymentMethod: 'Campus Meal Card',
    notes: 'Wash & dry tokens for 6 loads',
    createdAt: Date.now() - 86400000 * 8,
  },
  {
    id: 'exp-8',
    title: 'Friday Movie Night & Popcorn',
    amount: 14.50,
    category: 'Entertainment & Social',
    date: formatDate(10),
    paymentMethod: 'Debit Card / UPI',
    notes: 'Student ticket discount at campus cinema',
    createdAt: Date.now() - 86400000 * 10,
  },
];

export const INITIAL_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: 'goal-1',
    title: 'Semester End Roadtrip',
    targetAmount: 150,
    currentAmount: 95,
    targetDate: 'End of Term',
  },
  {
    id: 'goal-2',
    title: 'Lab Fee & Graphing Calculator',
    targetAmount: 80,
    currentAmount: 60,
    targetDate: 'Next Month',
  },
];
