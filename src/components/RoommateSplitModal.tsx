import React, { useState } from 'react';
import { 
  X, 
  Users, 
  PlusCircle, 
  Calculator, 
  Check, 
  ArrowRight,
  Pizza
} from 'lucide-react';
import { BudgetConfig, ExpenseCategory } from '../types';

interface RoommateSplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: BudgetConfig;
  onLogSplitExpense: (expenseData: {
    title: string;
    amount: number;
    category: ExpenseCategory;
    notes: string;
    totalBillBeforeSplit: number;
    splitWithPeopleCount: number;
  }) => void;
}

export const RoommateSplitModal: React.FC<RoommateSplitModalProps> = ({
  isOpen,
  onClose,
  budget,
  onLogSplitExpense,
}) => {
  const [billTitle, setBillTitle] = useState('Dorm Pizza Order');
  const [totalAmount, setTotalAmount] = useState('36.00');
  const [roommatesCount, setRoommatesCount] = useState(3);
  const [tipOrFee, setTipOrFee] = useState('0');
  const [payerName, setPayerName] = useState('Me');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('Food & Canteen');

  if (!isOpen) return null;

  const billNum = parseFloat(totalAmount) || 0;
  const tipNum = parseFloat(tipOrFee) || 0;
  const grandTotal = billNum + tipNum;
  const perPersonShare = roommatesCount > 0 ? grandTotal / roommatesCount : 0;

  const handleLogShare = () => {
    if (perPersonShare <= 0) return;

    onLogSplitExpense({
      title: `${billTitle} (My Share)`,
      amount: Number(perPersonShare.toFixed(2)),
      category: selectedCategory,
      notes: `Split among ${roommatesCount} roommates. Total receipt: ${budget.currencySymbol}${grandTotal.toFixed(2)}`,
      totalBillBeforeSplit: grandTotal,
      splitWithPeopleCount: roommatesCount,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Roommate Bill Splitter
            </h3>
            <p className="text-xs text-slate-500">
              Divide grocery, dining, or dorm bills evenly without math headaches
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              What was purchased?
            </label>
            <input
              type="text"
              value={billTitle}
              onChange={(e) => setBillTitle(e.target.value)}
              placeholder="e.g. WiFi Bill, Groceries, Pizza Night"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Receipt Amount ({budget.currencySymbol})
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tip or Delivery Fee ({budget.currencySymbol})
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={tipOrFee}
                onChange={(e) => setTipOrFee(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Number of Roommates
              </label>
              <div className="flex items-center gap-2">
                {[2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRoommatesCount(num)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                      roommatesCount === num
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ExpenseCategory)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-white"
              >
                <option value="Food & Canteen">Food & Canteen</option>
                <option value="Dorm & Rent">Dorm & Rent</option>
                <option value="Laundry & Groceries">Laundry & Groceries</option>
                <option value="Entertainment & Social">Entertainment</option>
                <option value="Transport & Commute">Transport</option>
              </select>
            </div>
          </div>

          {/* Result Calculation Banner */}
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
            <div className="flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-300 mb-1">
              <span>Total Bill (with fees):</span>
              <span className="font-bold">{budget.currencySymbol}{grandTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-indigo-100 dark:border-indigo-900/40">
              <span>Each Person Pays:</span>
              <span className="text-xl text-indigo-600 dark:text-indigo-400">
                {budget.currencySymbol}{perPersonShare.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              ({budget.currencySymbol}{grandTotal.toFixed(2)} ÷ {roommatesCount} people)
            </p>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleLogShare}
            disabled={perPersonShare <= 0}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <span>Add My Share ({budget.currencySymbol}{perPersonShare.toFixed(2)}) to Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
