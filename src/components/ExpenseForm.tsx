import React, { useState } from 'react';
import { 
  PlusCircle, 
  Users, 
  CreditCard, 
  Calendar, 
  Tag, 
  FileText,
  DollarSign
} from 'lucide-react';
import { Expense, ExpenseCategory, PaymentMethod, BudgetConfig } from '../types';
import { CATEGORIES } from '../data/sampleData';

interface ExpenseFormProps {
  budget: BudgetConfig;
  onAddExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
}

const STUDENT_QUICK_PRESETS = [
  { label: '🍔 Canteen Lunch', title: 'Campus Canteen Lunch', category: 'Food & Canteen' as ExpenseCategory, amount: 7.00 },
  { label: '☕ Iced Coffee', title: 'Library Study Coffee', category: 'Coffee & Snacks' as ExpenseCategory, amount: 4.50 },
  { label: '📚 Printouts/Xerox', title: 'Lab Record Printouts', category: 'Textbooks & Supplies' as ExpenseCategory, amount: 3.50 },
  { label: '🚌 Bus/Metro', title: 'Metro Transit Fare', category: 'Transport & Commute' as ExpenseCategory, amount: 2.75 },
  { label: '🧺 Laundry', title: 'Dorm Laundry Wash & Dry', category: 'Laundry & Groceries' as ExpenseCategory, amount: 5.00 },
];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ budget, onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food & Canteen');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Campus Meal Card');
  const [notes, setNotes] = useState('');

  // Roommate Split State
  const [isSplit, setIsSplit] = useState(false);
  const [totalBill, setTotalBill] = useState('');
  const [roommateCount, setRoommateCount] = useState(2);

  const calculatedShare = isSplit && totalBill 
    ? (parseFloat(totalBill) / roommateCount) 
    : 0;

  const handleApplyPreset = (preset: typeof STUDENT_QUICK_PRESETS[0]) => {
    setTitle(preset.title);
    setCategory(preset.category);
    setAmount(preset.amount.toString());
  };

  const handleQuickAddAmount = (addValue: number) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + addValue).toFixed(2));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalAmount = isSplit ? calculatedShare : parseFloat(amount);

    if (!title.trim()) {
      return;
    }
    if (isNaN(finalAmount) || finalAmount <= 0) {
      return;
    }

    onAddExpense({
      title: title.trim(),
      amount: Number(finalAmount.toFixed(2)),
      category,
      date,
      paymentMethod,
      notes: notes.trim() || undefined,
      isSplit,
      totalBillBeforeSplit: isSplit ? parseFloat(totalBill) : undefined,
      splitWithPeopleCount: isSplit ? roommateCount : undefined,
      roommateNote: isSplit ? `Split between ${roommateCount} roommates (Full receipt was ${budget.currencySymbol}${parseFloat(totalBill).toFixed(2)})` : undefined,
    });

    // Reset Form
    setTitle('');
    setAmount('');
    setNotes('');
    setIsSplit(false);
    setTotalBill('');
    setRoommateCount(2);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Add New Expense
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Quickly log your campus spend or split bills
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">
          Fast Logger
        </span>
      </div>

      {/* Quick Student Chips */}
      <div className="mb-4">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Student Quick Presets
        </span>
        <div className="flex flex-wrap gap-1.5">
          {STUDENT_QUICK_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title / Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Expense Name *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Canteen Lunch, Chemistry Book, Bus Pass"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Amount & Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Amount */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isSplit ? 'My Share Amount' : 'Amount *'}
              </label>
              {!isSplit && (
                <div className="flex gap-1">
                  {[2, 5, 10].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleQuickAddAmount(val)}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600"
                    >
                      +{val}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-semibold text-sm">
                {budget.currencySymbol}
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required={!isSplit}
                disabled={isSplit}
                value={isSplit ? (calculatedShare > 0 ? calculatedShare.toFixed(2) : '') : amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={`w-full pl-8 pr-3.5 py-2.5 text-sm rounded-xl outline-none font-semibold transition-all ${
                  isSplit
                    ? 'bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 cursor-not-allowed'
                    : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-900 dark:text-white'
                }`}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category *
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 dark:text-white transition-all appearance-none cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Date & Payment Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Date *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 outline-none text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 outline-none text-slate-900 dark:text-white"
            >
              <option value="Campus Meal Card">Campus Meal Card</option>
              <option value="Debit Card / UPI">Debit Card / UPI</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>

        </div>

        {/* Roommate Split Toggle & Helper Box */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/70 dark:bg-slate-800/40">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isSplit}
              onChange={(e) => setIsSplit(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Split with roommates / classmates?
              </span>
            </div>
          </label>

          {isSplit && (
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Full Bill Amount ({budget.currencySymbol})
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required={isSplit}
                  value={totalBill}
                  onChange={(e) => setTotalBill(e.target.value)}
                  placeholder="e.g. 45.00"
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Number of People (You + Roommates)
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={roommateCount}
                  onChange={(e) => setRoommateCount(Math.max(2, parseInt(e.target.value) || 2))}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40 px-3 py-2 rounded-lg">
                Your Personal Share: {budget.currencySymbol}{calculatedShare.toFixed(2)} ({budget.currencySymbol}{totalBill || '0'} ÷ {roommateCount} people)
              </div>
            </div>
          )}
        </div>

        {/* Optional Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Note / Memo <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Bought used from dorm 4B, paid via campus card"
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Save Expense</span>
        </button>

      </form>
    </div>
  );
};
