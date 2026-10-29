/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BudgetSummary } from './components/BudgetSummary';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { RoommateSplitModal } from './components/RoommateSplitModal';
import { SavingsJar } from './components/SavingsJar';
import { BlueprintGuide } from './components/BlueprintGuide';
import { Expense, BudgetConfig, SavingsGoal, ExpenseCategory } from './types';
import { INITIAL_EXPENSES, DEFAULT_BUDGET, INITIAL_SAVINGS_GOALS } from './data/sampleData';

const LOCAL_STORAGE_EXPENSES_KEY = 'campusexpense_items_v2';
const LOCAL_STORAGE_BUDGET_KEY = 'campusexpense_budget_v2';
const LOCAL_STORAGE_GOALS_KEY = 'campusexpense_goals_v2';

export default function App() {
  // Load initial data from localStorage if present
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_EXPENSES_KEY);
      return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
    } catch (e) {
      return INITIAL_EXPENSES;
    }
  });

  const [budget, setBudget] = useState<BudgetConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BUDGET_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_BUDGET;
    } catch (e) {
      return DEFAULT_BUDGET;
    }
  });

  const [goals, setGoals] = useState<SavingsGoal[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_GOALS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SAVINGS_GOALS;
    } catch (e) {
      return INITIAL_SAVINGS_GOALS;
    }
  });

  const [activeTab, setActiveTab] = useState<'tracker' | 'blueprint'>('tracker');
  const [isSplitterOpen, setIsSplitterOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_EXPENSES_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error('Failed to save expenses to localStorage', e);
    }
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BUDGET_KEY, JSON.stringify(budget));
    } catch (e) {
      console.error('Failed to save budget to localStorage', e);
    }
  }, [budget]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_GOALS_KEY, JSON.stringify(goals));
    } catch (e) {
      console.error('Failed to save goals to localStorage', e);
    }
  }, [goals]);

  // Calculations
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  // Expense Handlers
  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
      createdAt: Date.now(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setExpenses([]);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all expenses, budget and savings to default student samples?')) {
      setExpenses(INITIAL_EXPENSES);
      setBudget(DEFAULT_BUDGET);
      setGoals(INITIAL_SAVINGS_GOALS);
    }
  };

  // Budget Handlers
  const handleUpdateBudget = (newFields: Partial<BudgetConfig>) => {
    setBudget((prev) => ({ ...prev, ...newFields }));
  };

  const handleUpdateAllowance = (newAllowance: number) => {
    setBudget((prev) => ({ ...prev, monthlyAllowance: newAllowance }));
  };

  // Savings Goal Handlers
  const handleUpdateGoal = (goalId: string, delta: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const nextVal = Math.max(0, g.currentAmount + delta);
          return { ...g, currentAmount: nextVal };
        }
        return g;
      })
    );
  };

  const handleAddGoal = (title: string, targetAmount: number) => {
    const newGoal: SavingsGoal = {
      id: `goal-${Date.now()}`,
      title,
      targetAmount,
      currentAmount: 0,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  // Split Expense Handler
  const handleLogSplitExpense = (splitData: {
    title: string;
    amount: number;
    category: ExpenseCategory;
    notes: string;
    totalBillBeforeSplit: number;
    splitWithPeopleCount: number;
  }) => {
    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      title: splitData.title,
      amount: splitData.amount,
      category: splitData.category,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Debit Card / UPI',
      notes: splitData.notes,
      isSplit: true,
      totalBillBeforeSplit: splitData.totalBillBeforeSplit,
      splitWithPeopleCount: splitData.splitWithPeopleCount,
      roommateNote: `Split among ${splitData.splitWithPeopleCount} roommates`,
      createdAt: Date.now(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    if (expenses.length === 0) {
      alert('No expenses to export.');
      return;
    }

    let csvContent = 'ID,Date,Title,Amount,Currency,Category,Payment Method,Is Split,Total Bill Before Split,People Count,Notes\n';

    expenses.forEach((item) => {
      const safeTitle = `"${item.title.replace(/"/g, '""')}"`;
      const safeNotes = `"${(item.notes || '').replace(/"/g, '""')}"`;
      csvContent += `${item.id},${item.date},${safeTitle},${item.amount},${budget.currency},"${item.category}","${item.paymentMethod}",${item.isSplit ? 'Yes' : 'No'},${item.totalBillBeforeSplit || ''},${item.splitWithPeopleCount || ''},${safeNotes}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `campus_expenses_${budget.semesterName.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        budget={budget}
        onUpdateBudget={handleUpdateBudget}
        onOpenSplitter={() => setIsSplitterOpen(true)}
        onExportCSV={handleExportCSV}
        onResetData={handleResetData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {activeTab === 'tracker' ? (
          <div>
            {/* Top Summary Cards & Pacing Gauge */}
            <BudgetSummary
              budget={budget}
              totalSpent={totalSpent}
              onUpdateAllowance={handleUpdateAllowance}
            />

            {/* 2-Column Responsive Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (5 of 12 cols): Form + Savings Jar */}
              <div className="lg:col-span-5 space-y-6">
                <ExpenseForm
                  budget={budget}
                  onAddExpense={handleAddExpense}
                />
                <SavingsJar
                  goals={goals}
                  budget={budget}
                  onUpdateGoal={handleUpdateGoal}
                  onAddGoal={handleAddGoal}
                />
              </div>

              {/* Right Column (7 of 12 cols): Category Breakdown + Expense List */}
              <div className="lg:col-span-7 space-y-6">
                <CategoryBreakdown
                  expenses={expenses}
                  budget={budget}
                />
                <ExpenseList
                  expenses={expenses}
                  budget={budget}
                  onDeleteExpense={handleDeleteExpense}
                  onClearAll={handleClearAll}
                />
              </div>

            </div>
          </div>
        ) : (
          /* Blueprint Guide & Developer Specification */
          <BlueprintGuide />
        )}

      </main>

      {/* Roommate Split Modal */}
      <RoommateSplitModal
        isOpen={isSplitterOpen}
        onClose={() => setIsSplitterOpen(false)}
        budget={budget}
        onLogSplitExpense={handleLogSplitExpense}
      />

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">CampusSpend</span>
            <span>·</span>
            <span>Beginner-friendly Student Expense Tracker</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(activeTab === 'tracker' ? 'blueprint' : 'tracker')}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {activeTab === 'tracker' ? 'View HTML/CSS/JS Blueprint' : 'Switch to Live Tracker'}
            </button>
            <span>·</span>
            <span>Zero server setup required</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
