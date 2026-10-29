import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Layout, 
  Database, 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Sparkles,
  Info,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { 
  RECOMMENDED_FEATURES, 
  DATA_MODEL_FIELDS, 
  VANILLA_HTML_CODE, 
  VANILLA_CSS_CODE, 
  VANILLA_JS_CODE 
} from '../data/blueprintData';

export const BlueprintGuide: React.FC = () => {
  const [subTab, setSubTab] = useState<'features' | 'screen' | 'data' | 'code'>('features');
  const [codeFileTab, setCodeFileTab] = useState<'html' | 'css' | 'js'>('html');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadZip = () => {
    // Create a standalone combined HTML file or download individual files
    const fullHtml = `<!-- Complete Beginner Vanilla HTML/CSS/JS Expense Tracker -->
${VANILLA_HTML_CODE.replace('<link rel="stylesheet" href="style.css">', `<style>\n${VANILLA_CSS_CODE}\n</style>`).replace('<script src="script.js"></script>', `<script>\n${VANILLA_JS_CODE}\n</script>`)}`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'college_expense_tracker_beginner.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 text-white text-xs font-semibold mb-3">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Beginner Developer Specification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            How to Build a College Expense Tracker with Vanilla HTML, CSS & JavaScript
          </h1>
          <p className="mt-2 text-sm text-blue-100 leading-relaxed">
            Everything you need to build this project from scratch: the prioritized feature list, 
            the exact screen layout and wireframe, the JavaScript data model schema, and ready-to-run 
            starter code you can save right to your computer.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={handleDownloadZip}
              className="px-4 py-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Standalone .html Starter</span>
            </button>
            <button
              onClick={() => { setSubTab('code'); }}
              className="px-4 py-2 rounded-xl bg-blue-500/30 hover:bg-blue-500/40 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <FileCode className="w-4 h-4" />
              <span>Inspect Source Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Blueprint Sub-navigation */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px">
        <button
          onClick={() => setSubTab('features')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
            subTab === 'features'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>1. Recommended Features</span>
        </button>

        <button
          onClick={() => setSubTab('screen')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
            subTab === 'screen'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>2. Screen Layout & Wireframe</span>
        </button>

        <button
          onClick={() => setSubTab('data')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
            subTab === 'data'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>3. Expense Data Model</span>
        </button>

        <button
          onClick={() => setSubTab('code')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
            subTab === 'code'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>4. Vanilla HTML / CSS / JS Code</span>
        </button>
      </div>

      {/* Subtab 1: Features List */}
      {subTab === 'features' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              What Features Should a College Expense Tracker Have?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              For a beginner project, focus first on the <strong className="text-slate-700 dark:text-slate-300">Core Must-Haves</strong> to keep the code clean and manageable. Then add the student-specific perks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RECOMMENDED_FEATURES.map((feat) => {
              const tierBadgeColor = 
                feat.tier === 'Core Must-Have' 
                  ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40' 
                  : feat.tier === 'Student-Specific'
                  ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40';

              return (
                <div
                  key={feat.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${tierBadgeColor}`}>
                        {feat.tier}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">Why students need it:</span>
                    <span>{feat.whyStudentNeedsIt}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Beginner Tip:</strong> Don't try to build all 8 features on day 1! Build in stages:
              <br />
              <strong>Step 1:</strong> Just the Add Form + Displaying the list items on screen.
              <br />
              <strong>Step 2:</strong> Add calculations (Total Spent + Remaining Balance).
              <br />
              <strong>Step 3:</strong> Add <code className="font-mono bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded">localStorage</code> so expenses don't vanish on page refresh.
              <br />
              <strong>Step 4:</strong> Add Category filtering and the Roommate Split checkbox.
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Screen Layout & Wireframe */}
      {subTab === 'screen' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              What Should the Screen Look Like? (Layout Architecture)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              A beginner-friendly expense tracker should follow a clear, single-page visual hierarchy. 
              Here is the exact wireframe blueprint showing where every element sits:
            </p>
          </div>

          {/* Visual Interactive Wireframe Mockup */}
          <div className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl p-6 shadow-xs font-mono text-xs">
            
            {/* Header Wireframe */}
            <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-blue-400 dark:border-blue-700 rounded-xl p-3.5 mb-4 text-center">
              <span className="font-bold text-blue-700 dark:text-blue-300 block mb-0.5">
                HEADER SECTION (Full Width)
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                [Brand Title "CampusSpend"] · [Month / Semester Selector] · [Monthly Budget Input ($450)] · [Export CSV Button]
              </span>
            </div>

            {/* Top Cards Wireframe */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 text-center">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">CARD 1: TOTAL SPENT</span>
                <span className="text-blue-600 font-bold text-sm block my-1">$120.50</span>
                <span className="text-slate-400 text-[10px]">Calculated via array .reduce()</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-emerald-400 dark:border-emerald-700 rounded-xl p-3 text-center">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block text-[11px]">CARD 2: REMAINING ALLOWANCE</span>
                <span className="text-emerald-600 font-bold text-sm block my-1">$329.50</span>
                <span className="text-slate-400 text-[10px]">Budget minus Total Spent</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-amber-400 dark:border-amber-700 rounded-xl p-3 text-center">
                <span className="font-bold text-amber-700 dark:text-amber-300 block text-[11px]">CARD 3: SAFE DAILY SPEND</span>
                <span className="text-amber-600 font-bold text-sm block my-1">$18.30 / day</span>
                <span className="text-slate-400 text-[10px]">Remaining ÷ Days Left in Month</span>
              </div>
            </div>

            {/* Split 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              
              {/* Left Column: Form (2 cols) */}
              <div className="md:col-span-2 bg-white dark:bg-slate-900 border-2 border-dashed border-indigo-400 dark:border-indigo-700 rounded-xl p-4">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-2 text-center">
                  LEFT COLUMN: ADD EXPENSE FORM
                </span>
                <div className="space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                    1. Title Input ("Canteen lunch")
                  </div>
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                    2. Amount Input ($7.50)
                  </div>
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                    3. Category Dropdown (Canteen, Books, Rent...)
                  </div>
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                    4. Date Picker (YYYY-MM-DD)
                  </div>
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                    5. Roommate Split Checkbox (Optional)
                  </div>
                  <div className="p-2 bg-blue-600 text-white rounded text-center font-bold">
                    [Save Expense Button]
                  </div>
                </div>
              </div>

              {/* Right Column: List & Visuals (3 cols) */}
              <div className="md:col-span-3 bg-white dark:bg-slate-900 border-2 border-dashed border-teal-400 dark:border-teal-700 rounded-xl p-4">
                <span className="font-bold text-teal-700 dark:text-teal-300 block mb-2 text-center">
                  RIGHT COLUMN: EXPENSE LIST & FILTERS
                </span>
                <div className="space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex gap-2">
                    <div className="flex-1 p-1.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                      Search Bar [Filter by name...]
                    </div>
                    <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                      Sort [Date / Price]
                    </div>
                  </div>
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                    Category Filter Tabs: [All] [Food] [Books] [Rent] [Transport]
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      Dynamic Item Stream (&lt;ul id="expense-list"&gt;):
                    </div>
                    <div className="text-[10px] text-slate-500">
                      · Calculus Book — $38.00 (Books · Oct 28) [x Delete]
                      <br />
                      · Canteen Thali — $7.50 (Food · Oct 29) [x Delete]
                      <br />
                      · Shared WiFi — $15.00 (Split with 3) [x Delete]
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                A. Desktop Layout (2 Columns)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Form on the left (40% width), History list on the right (60% width). This allows students to log multiple expenses consecutively without endless scrolling.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                B. Mobile Responsive (1 Column)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Stacks vertically with CSS Flexbox / CSS Grid. Summary cards collapse to a compact swipe or 2-column grid. Touch targets are large (&gt;44px) for quick thumb logging.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                C. Visual Feedback & Empty States
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                When no expenses match the search query, show a polite empty state with an icon rather than a broken or blank screen.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Data Model & Schema */}
      {subTab === 'data' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              What Data Do You Need to Store for Each Expense?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              In JavaScript, every expense is stored as a simple <strong>JavaScript Object ({'{}'})</strong>. 
              The entire app’s history is simply an <strong>Array of Objects ([{}, {}])</strong>.
            </p>
          </div>

          {/* Interactive Code Object Preview */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 font-mono text-xs overflow-x-auto shadow-sm">
            <div className="text-slate-400 mb-2">// Anatomy of a Single Expense Object in JavaScript</div>
            <pre className="text-emerald-400">
{`const singleExpense = {
  id: "1730001234567",                // Unique ID (Date.now().toString())
  title: "Organic Chemistry Manual",  // Name of the expense
  amount: 24.50,                      // Number (use parseFloat to avoid string bugs!)
  category: "Textbooks & Supplies",   // Spending bucket
  date: "2026-10-29",                 // ISO date string from <input type="date">
  paymentMethod: "Campus Meal Card",  // Cash, Card, UPI, etc.
  isSplit: true,                      // Boolean: was it split with roommates?
  totalBillBeforeSplit: 49.00,        // Total receipt before dividing
  splitWithPeopleCount: 2,            // 2 roommates ($49 / 2 = $24.50)
  notes: "Bought used from dorm 3B"   // Optional notes
};`}
            </pre>
          </div>

          {/* Schema Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Field Name</th>
                    <th className="py-3 px-4">Data Type</th>
                    <th className="py-3 px-4">Required?</th>
                    <th className="py-3 px-4">Sample Value</th>
                    <th className="py-3 px-4">Why It's Needed & Beginner Pitfalls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {DATA_MODEL_FIELDS.map((f) => (
                    <tr key={f.key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {f.key}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">
                        {f.type}
                      </td>
                      <td className="py-3 px-4">
                        {f.required ? (
                          <span className="font-bold text-rose-600 dark:text-rose-400">Yes</span>
                        ) : (
                          <span className="text-slate-400">Optional</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">
                        {f.example}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                        {f.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* LocalStorage Explanation Box */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              How LocalStorage Saves Data in Plain JavaScript (No Database Needed!)
            </h4>
            <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed">
              In beginner web development, you don't need MySQL or MongoDB. The browser has a built-in store called <code className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded">localStorage</code>:
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 font-mono text-xs space-y-1.5 text-slate-800 dark:text-slate-200">
              <div>// 1. Saving to browser:</div>
              <div className="text-blue-600 dark:text-blue-400">localStorage.setItem("expenses", JSON.stringify(expensesArray));</div>
              <div className="mt-2">// 2. Loading when the page opens:</div>
              <div className="text-emerald-600 dark:text-emerald-400">const saved = localStorage.getItem("expenses");</div>
              <div className="text-emerald-600 dark:text-emerald-400">const expensesArray = saved ? JSON.parse(saved) : [];</div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Vanilla Code View */}
      {subTab === 'code' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Complete Beginner Source Code (HTML, CSS, JS)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Copy each file directly or click "Download Standalone .html Starter" to run locally in Chrome/Firefox!
              </p>
            </div>

            <button
              onClick={handleDownloadZip}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 self-start sm:self-auto shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download 1-File Starter</span>
            </button>
          </div>

          {/* File Switcher Tabs */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-t-2xl border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCodeFileTab('html')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  codeFileTab === 'html'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                index.html
              </button>
              <button
                onClick={() => setCodeFileTab('css')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  codeFileTab === 'css'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                style.css
              </button>
              <button
                onClick={() => setCodeFileTab('js')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  codeFileTab === 'js'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                app.js
              </button>
            </div>

            <button
              onClick={() => {
                const code = 
                  codeFileTab === 'html' ? VANILLA_HTML_CODE : 
                  codeFileTab === 'css' ? VANILLA_CSS_CODE : 
                  VANILLA_JS_CODE;
                handleCopy(code, codeFileTab);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copiedKey === codeFileTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy {codeFileTab.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>

          {/* Code Viewer */}
          <div className="bg-slate-950 text-slate-100 rounded-b-2xl p-4 font-mono text-xs overflow-x-auto max-h-[560px] overflow-y-auto border border-slate-900 leading-relaxed">
            <pre>
              {codeFileTab === 'html' && VANILLA_HTML_CODE}
              {codeFileTab === 'css' && VANILLA_CSS_CODE}
              {codeFileTab === 'js' && VANILLA_JS_CODE}
            </pre>
          </div>

        </div>
      )}

    </div>
  );
};
