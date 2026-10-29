import React, { useState } from 'react';
import { PiggyBank, Plus, Minus, Target } from 'lucide-react';
import { SavingsGoal, BudgetConfig } from '../types';

interface SavingsJarProps {
  goals: SavingsGoal[];
  budget: BudgetConfig;
  onUpdateGoal: (goalId: string, delta: number) => void;
  onAddGoal: (title: string, target: number) => void;
}

export const SavingsJar: React.FC<SavingsJarProps> = ({
  goals,
  budget,
  onUpdateGoal,
  onAddGoal,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('100');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(newTarget);
    if (newTitle.trim() && !isNaN(target) && target > 0) {
      onAddGoal(newTitle.trim(), target);
      setNewTitle('');
      setNewTarget('100');
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <PiggyBank className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Student Savings Jars
            </h2>
            <p className="text-xs text-slate-500">
              Put aside small change for semester trips & supplies
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs font-semibold px-2.5 py-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-colors"
        >
          {showAddForm ? 'Cancel' : '+ New Jar'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="p-3 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
              Goal Name
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. End of term roadtrip, New phone"
              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                Target Amount ({budget.currencySymbol})
              </label>
              <input
                type="number"
                step="5"
                min="5"
                required
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white"
              />
            </div>
            <div className="self-end">
              <button
                type="submit"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      )}

      {goals.length === 0 ? (
        <p className="text-xs text-slate-400 py-3 text-center">No active savings jars yet.</p>
      ) : (
        <div className="space-y-3">
          {goals.map((g) => {
            const percent = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
            const isCompleted = g.currentAmount >= g.targetAmount;

            return (
              <div
                key={g.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {g.title}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {budget.currencySymbol}{g.currentAmount} / {budget.currencySymbol}{g.targetAmount}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Quick Add / Withdraw */}
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{percent}% saved {isCompleted && '🎉 Goal reached!'}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateGoal(g.id, -5)}
                      disabled={g.currentAmount <= 0}
                      className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30"
                      title="Withdraw $5"
                    >
                      -5
                    </button>
                    <button
                      onClick={() => onUpdateGoal(g.id, 5)}
                      className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-emerald-600 font-semibold"
                      title="Deposit $5"
                    >
                      +5
                    </button>
                    <button
                      onClick={() => onUpdateGoal(g.id, 10)}
                      className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-emerald-600 font-semibold"
                      title="Deposit $10"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
