import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  PiggyBank, 
  CalendarClock, 
  Edit3, 
  Check, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { BudgetConfig } from '../types';

interface BudgetSummaryProps {
  budget: BudgetConfig;
  totalSpent: number;
  onUpdateAllowance: (newAllowance: number) => void;
}

export const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  budget,
  totalSpent,
  onUpdateAllowance,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempAllowance, setTempAllowance] = useState(budget.monthlyAllowance.toString());

  const remaining = budget.monthlyAllowance - totalSpent;
  const spentPercent = budget.monthlyAllowance > 0 
    ? Math.min(100, Math.round((totalSpent / budget.monthlyAllowance) * 100))
    : 0;

  // Calculate Safe Daily Spend
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = now.getDate();
  const daysRemaining = Math.max(1, totalDaysInMonth - currentDay + 1);

  const safeDailySpend = remaining > 0 ? (remaining / daysRemaining) : 0;

  const handleSaveBudget = () => {
    const parsed = parseFloat(tempAllowance);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateAllowance(parsed);
    }
    setIsEditing(false);
  };

  // Status message
  let statusColor = 'text-emerald-600 dark:text-emerald-400';
  let statusText = `${daysRemaining} days left · On track!`;
  let barColor = 'bg-blue-600';

  if (remaining < 0) {
    statusColor = 'text-rose-600 dark:text-rose-400';
    statusText = `Over budget by ${budget.currencySymbol}${Math.abs(remaining).toFixed(2)}!`;
    barColor = 'bg-rose-500';
  } else if (spentPercent > 80) {
    statusColor = 'text-amber-600 dark:text-amber-400';
    statusText = `Caution: 80%+ spent with ${daysRemaining} days remaining`;
    barColor = 'bg-amber-500';
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs mb-6 transition-all">
      
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Monthly Budget Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Monthly Allowance</span>
            <Wallet className="w-4 h-4 text-slate-400" />
          </div>

          <div className="my-1">
            {isEditing ? (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-lg font-bold text-slate-700 dark:text-slate-300">
                  {budget.currencySymbol}
                </span>
                <input
                  type="number"
                  value={tempAllowance}
                  onChange={(e) => setTempAllowance(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveBudget()}
                  className="w-24 px-2 py-1 text-base font-bold bg-white dark:bg-slate-700 border border-blue-400 rounded-lg outline-none text-slate-900 dark:text-white"
                  autoFocus
                />
                <button
                  onClick={handleSaveBudget}
                  className="p-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {budget.currencySymbol}{budget.monthlyAllowance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
                <button
                  onClick={() => {
                    setTempAllowance(budget.monthlyAllowance.toString());
                    setIsEditing(true);
                  }}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                  title="Edit monthly allowance"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="text-xs text-slate-400">
            Set for this month's term
          </div>
        </div>

        {/* Total Spent Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Spent</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>

          <div className="my-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {budget.currencySymbol}{totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span>{spentPercent}% of total allowance</span>
          </div>
        </div>

        {/* Remaining Allowance Card */}
        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-700 dark:text-blue-300 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Remaining Balance</span>
            <PiggyBank className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="my-1">
            <h3 className={`text-2xl font-bold tracking-tight ${remaining < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-blue-400'}`}>
              {budget.currencySymbol}{remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>

          <div className={`text-xs font-medium flex items-center gap-1 ${statusColor}`}>
            {remaining < 0 && <AlertCircle className="w-3 h-3 shrink-0" />}
            <span className="truncate">{statusText}</span>
          </div>
        </div>

        {/* Safe Daily Spend Card */}
        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-300 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Safe Daily Spend</span>
            <CalendarClock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="my-1">
            <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 tracking-tight">
              {budget.currencySymbol}{safeDailySpend.toFixed(2)}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1">/ day</span>
            </h3>
          </div>

          <div className="text-xs text-emerald-800 dark:text-emerald-400">
            Spend under this to stay safe
          </div>
        </div>

      </div>

      {/* Progress Bar & Pace Helper */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs mb-2 text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Budget Pacing Gauge
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {spentPercent}% spent ({budget.currencySymbol}{remaining > 0 ? remaining.toFixed(2) : '0.00'} buffer left)
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
            style={{ width: `${Math.min(100, Math.max(0, spentPercent))}%` }}
          />
        </div>
      </div>

    </div>
  );
};
