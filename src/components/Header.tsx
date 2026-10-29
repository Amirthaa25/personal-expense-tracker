import React, { useState } from 'react';
import { 
  GraduationCap, 
  Code2, 
  Wallet, 
  Users, 
  Download, 
  RotateCcw, 
  DollarSign, 
  Check,
  ChevronDown
} from 'lucide-react';
import { BudgetConfig } from '../types';
import { CURRENCY_OPTIONS } from '../data/sampleData';

interface HeaderProps {
  activeTab: 'tracker' | 'blueprint';
  setActiveTab: (tab: 'tracker' | 'blueprint') => void;
  budget: BudgetConfig;
  onUpdateBudget: (newBudget: Partial<BudgetConfig>) => void;
  onOpenSplitter: () => void;
  onExportCSV: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  budget,
  onUpdateBudget,
  onOpenSplitter,
  onExportCSV,
  onResetData,
}) => {
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isEditingSemester, setIsEditingSemester] = useState(false);
  const [semesterInput, setSemesterInput] = useState(budget.semesterName);

  const handleSaveSemester = () => {
    if (semesterInput.trim()) {
      onUpdateBudget({ semesterName: semesterInput.trim() });
    }
    setIsEditingSemester(false);
  };

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* Logo & Student Context */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                  CampusSpend
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  Student Edition
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                {isEditingSemester ? (
                  <div className="flex items-center gap-1">
                    <input 
                      type="text" 
                      value={semesterInput} 
                      onChange={(e) => setSemesterInput(e.target.value)}
                      onBlur={handleSaveSemester}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveSemester()}
                      className="px-1.5 py-0.5 border border-blue-400 rounded text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                      autoFocus
                    />
                    <button onClick={handleSaveSemester} className="text-blue-600 hover:text-blue-700">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setIsEditingSemester(true); setSemesterInput(budget.semesterName); }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 font-medium underline underline-offset-2 decoration-dotted"
                    title="Click to rename semester"
                  >
                    {budget.semesterName}
                  </button>
                )}
                <span>·</span>
                <span>{currentDateStr}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Live App vs Beginner Blueprint) */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'tracker'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Expense Tracker</span>
            </button>
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'blueprint'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Beginner Blueprint & Code</span>
            </button>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex items-center gap-2">
            
            {/* Currency Picker */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                title="Change Currency"
              >
                <span>{budget.currencySymbol}</span>
                <span className="font-semibold">{budget.currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 py-1">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Currency
                  </div>
                  {CURRENCY_OPTIONS.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onUpdateBudget({ currency: c.code, currencySymbol: c.symbol });
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 ${
                        budget.currency === c.code ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{c.name}</span>
                      {budget.currency === c.code && <Check className="w-3 h-3 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Roommate Split Tool */}
            <button
              onClick={onOpenSplitter}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              title="Split a bill with roommates"
            >
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Split Bill</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={onExportCSV}
              className="p-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              title="Download CSV for Excel / Google Sheets"
            >
              <Download className="w-4 h-4 text-slate-500" />
            </button>

            {/* Reset sample data */}
            <button
              onClick={onResetData}
              className="p-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50"
              title="Reset Sample College Expenses"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
