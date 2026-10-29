import React from 'react';
import { PieChart, TrendingUp, Sparkles } from 'lucide-react';
import { Expense, BudgetConfig } from '../types';
import { CATEGORIES } from '../data/sampleData';

interface CategoryBreakdownProps {
  expenses: Expense[];
  budget: BudgetConfig;
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  expenses,
  budget,
}) => {
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  // Group by category
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((item) => {
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
  });

  // Sort by highest spending first
  const sortedCategories = CATEGORIES
    .map((cat) => ({
      ...cat,
      amount: categoryTotals[cat.name] || 0,
      percentage: totalSpent > 0 ? ((categoryTotals[cat.name] || 0) / totalSpent) * 100 : 0,
    }))
    .filter((cat) => cat.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const highestCat = sortedCategories.length > 0 ? sortedCategories[0] : null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Category Breakdown
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Where your student money is going this month
          </p>
        </div>
        <PieChart className="w-4 h-4 text-slate-400" />
      </div>

      {sortedCategories.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-xs">
          No expenses recorded yet.
        </div>
      ) : (
        <div className="space-y-3.5">
          {highestCat && (
            <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Top Spending Area
                </span>
              </div>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                {highestCat.name} ({highestCat.percentage.toFixed(0)}%)
              </span>
            </div>
          )}

          <div className="space-y-3 pt-1">
            {sortedCategories.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: cat.color }} 
                    />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {budget.currencySymbol}{cat.amount.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({cat.percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
