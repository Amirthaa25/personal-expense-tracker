import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Trash2, 
  Users, 
  ArrowUpDown, 
  Utensils,
  BookOpen,
  Coffee,
  Home,
  Bus,
  Gamepad2,
  Tv,
  ShoppingBag,
  HeartPulse,
  Tag,
  CreditCard,
  Calendar,
  X
} from 'lucide-react';
import { Expense, ExpenseCategory, BudgetConfig } from '../types';
import { CATEGORIES } from '../data/sampleData';

interface ExpenseListProps {
  expenses: Expense[];
  budget: BudgetConfig;
  onDeleteExpense: (id: string) => void;
  onClearAll: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Utensils,
  BookOpen,
  Coffee,
  Home,
  Bus,
  Gamepad2,
  Tv,
  ShoppingBag,
  HeartPulse,
  Tag,
};

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  budget,
  onDeleteExpense,
  onClearAll,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        return 0;
      });
  }, [expenses, searchTerm, selectedCategory, sortBy]);

  const getCategoryMeta = (catName: string) => {
    return CATEGORIES.find((c) => c.name === catName) || {
      name: 'Other' as ExpenseCategory,
      iconName: 'Tag',
      color: '#64748b',
      bgLight: 'bg-slate-50',
      textColor: 'text-slate-700',
      description: '',
    };
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Expense History
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              ({filteredExpenses.length} {filteredExpenses.length === 1 ? 'entry' : 'entries'})
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Search, filter, and audit your college spending
          </p>
        </div>

        {expenses.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all logged expenses?')) {
                onClearAll();
              }
            }}
            className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 self-start sm:self-auto font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search expenses by title or note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 text-slate-900 dark:text-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills / Segmented Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.name
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Expense Items Stream */}
      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12 px-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-2">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No expenses found
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search query or category filter.'
              : 'Add your first college expense using the form above.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
          {filteredExpenses.map((item) => {
            const meta = getCategoryMeta(item.category);
            const IconComponent = ICON_MAP[meta.iconName] || Tag;

            return (
              <div
                key={item.id}
                className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all"
              >
                {/* Left: Icon & Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${meta.color}15`, color: meta.color }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                        {item.title}
                      </span>
                    </div>

                    {/* Unboxed Metadata with Typographic Separators */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>{item.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.paymentMethod}</span>
                      {item.isSplit && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Split ({item.splitWithPeopleCount || 2})
                          </span>
                        </>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 italic truncate">
                        "{item.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div className="flex items-center gap-3 shrink-0 ml-3">
                  <div className="text-right">
                    <span className="font-bold text-base text-slate-900 dark:text-white block">
                      {budget.currencySymbol}{item.amount.toFixed(2)}
                    </span>
                    {item.totalBillBeforeSplit && (
                      <span className="text-[10px] text-slate-400 block">
                        Full: {budget.currencySymbol}{item.totalBillBeforeSplit.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onDeleteExpense(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Delete expense"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
