export interface FeatureItem {
  id: string;
  tier: 'Core Must-Have' | 'Student-Specific' | 'Helpful Extra';
  title: string;
  description: string;
  whyStudentNeedsIt: string;
}

export const RECOMMENDED_FEATURES: FeatureItem[] = [
  {
    id: 'f1',
    tier: 'Core Must-Have',
    title: 'Quick Expense Logger (Add Expense)',
    description: 'A clean 4-field form to quickly record spending: Amount, Item Title, Category, and Date.',
    whyStudentNeedsIt: 'College students are busy moving between lectures. If adding an expense takes more than 5 seconds, they will stop tracking.',
  },
  {
    id: 'f2',
    tier: 'Core Must-Have',
    title: 'Monthly Allowance & Safe Daily Spend',
    description: 'Input your monthly allowance (e.g., from parents or part-time job) and see remaining balance plus safe spending allowance per day.',
    whyStudentNeedsIt: 'Prevents running out of cash in week 3. Knowing "I can only spend $12.50 today" is much more actionable than abstract numbers.',
  },
  {
    id: 'f3',
    tier: 'Student-Specific',
    title: 'College-Focused Categories',
    description: 'Predefined student buckets: Canteen/Food, Textbooks/Supplies, Dorm/Rent, Coffee/Snacks, Transport, Subscriptions, and Social.',
    whyStudentNeedsIt: 'Generic corporate categories (e.g. "Mortgage", "Client Meals") don\'t make sense for dorm life and campus dining.',
  },
  {
    id: 'f4',
    tier: 'Student-Specific',
    title: 'Roommate Bill Splitter (IOU / Shared Bills)',
    description: 'Calculate and record shared expenses like late-night pizza orders, dorm WiFi, or laundry supplies split evenly among 2-4 roommates.',
    whyStudentNeedsIt: 'Roommates constantly split groceries and bills. Recording just your share keeps your personal budget 100% accurate.',
  },
  {
    id: 'f5',
    tier: 'Core Must-Have',
    title: 'Search, Filter & Delete Transactions',
    description: 'A searchable transaction stream with category filters (e.g. view only "Food" or "Textbooks") and a one-click delete button.',
    whyStudentNeedsIt: 'Students make mistakes or want to check "how much did I spend on campus canteen food this week?".',
  },
  {
    id: 'f6',
    tier: 'Core Must-Have',
    title: 'Visual Category Breakdown (Progress Bars / Donut)',
    description: 'Shows what percentage of the budget went to food vs books vs entertainment with color bars.',
    whyStudentNeedsIt: 'Visual cues immediately highlight money leaks (e.g. "Whoa, 35% of my money went to iced coffee!").',
  },
  {
    id: 'f7',
    tier: 'Core Must-Have',
    title: 'Browser LocalStorage Auto-Save (Zero Backend Needed)',
    description: 'Stores expenses and settings directly in `window.localStorage`. Data persists across browser refreshes with zero server or database setup.',
    whyStudentNeedsIt: 'Beginner-friendly! No database, no Node.js backend, no Firebase required for basic homework or personal student use.',
  },
  {
    id: 'f8',
    tier: 'Helpful Extra',
    title: 'CSV Export for Spreadsheets',
    description: 'Export tracked expenses to a standard `.csv` file that opens in Google Sheets or Microsoft Excel.',
    whyStudentNeedsIt: 'Great for sharing semester expenses with parents or archiving past academic semesters.',
  },
];

export const DATA_MODEL_FIELDS = [
  {
    key: 'id',
    type: 'string',
    example: '"exp_1730000000000"',
    purpose: 'Unique identifier for each transaction so you can edit or delete the exact item without accidental duplicates (e.g., Date.now().toString()).',
    required: true,
  },
  {
    key: 'title',
    type: 'string',
    example: '"Calculus Lab Manual"',
    purpose: 'Short, descriptive name of what was purchased.',
    required: true,
  },
  {
    key: 'amount',
    type: 'number (float)',
    example: '24.50',
    purpose: 'The monetary cost. Always parse with parseFloat() so you can do math without JavaScript string concatenation bugs.',
    required: true,
  },
  {
    key: 'category',
    type: 'string',
    example: '"Textbooks & Supplies"',
    purpose: 'Categorizes the spending to calculate visual breakdown charts and filter by spending type.',
    required: true,
  },
  {
    key: 'date',
    type: 'string (YYYY-MM-DD)',
    example: '"2026-10-29"',
    purpose: 'Standard ISO date format. Matches native HTML <input type="date"> seamlessly.',
    required: true,
  },
  {
    key: 'paymentMethod',
    type: 'string',
    example: '"Campus Meal Card" or "Cash"',
    purpose: 'Tracks which wallet or card the student used to prevent cash shortages.',
    required: false,
  },
  {
    key: 'isSplit',
    type: 'boolean',
    example: 'true',
    purpose: 'Flags if this expense was split with dorm roommates or classmates.',
    required: false,
  },
  {
    key: 'totalBillBeforeSplit',
    type: 'number',
    example: '45.00',
    purpose: 'Original total receipt amount before dividing among friends.',
    required: false,
  },
  {
    key: 'splitWithPeopleCount',
    type: 'number',
    example: '3',
    purpose: 'Number of people sharing the expense (your share = total / count).',
    required: false,
  },
  {
    key: 'notes',
    type: 'string',
    example: '"Bought second-hand from seniors"',
    purpose: 'Optional detail or context.',
    required: false,
  },
];

export const VANILLA_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Character encoding ensures proper text and symbol (₹) rendering -->
  <meta charset="UTF-8">

  <!-- Responsive viewport: optimizes display on mobile phones and desktops -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Webpage Title displayed on the browser tab -->
  <title>Student Expense Tracker</title>

  <!-- External Stylesheet -->
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Main Container: Centers the app on screen -->
  <div class="container">

    <!-- 1. Coloured Header Section -->
    <header class="app-header">
      <h1>🎓 Student Expense Tracker</h1>
      <p class="subtitle">Track your daily college spending in Rupees (₹)</p>
    </header>

    <!-- 2. Form for Adding Expenses -->
    <section class="form-container">
      <form id="expense-form">

        <!-- Input 1: Expense Name -->
        <div class="form-group">
          <label for="expense-name">Expense Name</label>
          <input 
            type="text" 
            id="expense-name" 
            placeholder="e.g., Canteen Lunch, Bus Pass, Notebook" 
            required
          >
        </div>

        <!-- Input 2: Amount in Rupees (₹) -->
        <div class="form-group">
          <label for="expense-amount">Amount (in ₹ Rupees)</label>
          <div class="currency-input-wrapper">
            <span class="currency-symbol">₹</span>
            <input 
              type="number" 
              id="expense-amount" 
              placeholder="e.g., 150" 
              min="1" 
              step="any" 
              required
            >
          </div>
        </div>

        <!-- Input 3: Category Dropdown (Food, Travel, Books, Fun, Other) -->
        <div class="form-group">
          <label for="expense-category">Category</label>
          <select id="expense-category" required>
            <option value="" disabled selected>Select a category</option>
            <option value="Food">🍔 Food</option>
            <option value="Travel">🚌 Travel</option>
            <option value="Books">📚 Books</option>
            <option value="Fun">🎮 Fun</option>
            <option value="Other">🏷️ Other</option>
          </select>
        </div>

        <!-- Input 4: Date of Expense -->
        <div class="form-group">
          <label for="expense-date">Date</label>
          <input 
            type="date" 
            id="expense-date" 
            required
          >
        </div>

        <!-- Submit Button -->
        <button type="submit" id="add-btn" class="btn-primary">
          Add Expense
        </button>

      </form>
    </section>

    <!-- 3. Overall Total Amount Spent Card -->
    <section class="total-section">
      <div class="total-card">
        <span class="total-label">Total Amount Spent:</span>
        <span class="total-value">₹<span id="total-amount">0.00</span></span>
      </div>
    </section>

    <!-- 4. Category Spending Breakdown -->
    <section class="breakdown-section">
      <h3>Category Breakdown</h3>
      <div class="category-breakdown-grid">
        <div class="breakdown-card tag-food">
          <span class="breakdown-label">🍔 Food</span>
          <span class="breakdown-amount">₹<span id="breakdown-food">0.00</span></span>
        </div>
        <div class="breakdown-card tag-travel">
          <span class="breakdown-label">🚌 Travel</span>
          <span class="breakdown-amount">₹<span id="breakdown-travel">0.00</span></span>
        </div>
        <div class="breakdown-card tag-books">
          <span class="breakdown-label">📚 Books</span>
          <span class="breakdown-amount">₹<span id="breakdown-books">0.00</span></span>
        </div>
        <div class="breakdown-card tag-fun">
          <span class="breakdown-label">🎮 Fun</span>
          <span class="breakdown-amount">₹<span id="breakdown-fun">0.00</span></span>
        </div>
        <div class="breakdown-card tag-other">
          <span class="breakdown-label">🏷️ Other</span>
          <span class="breakdown-amount">₹<span id="breakdown-other">0.00</span></span>
        </div>
      </div>
    </section>

    <!-- 5. Expense History List & Filter Dropdown -->
    <section class="list-section">
      <div class="list-header">
        <h2>Expense History</h2>

        <!-- Filter Dropdown to show only one category at a time -->
        <div class="filter-wrapper">
          <label for="filter-category">Filter:</label>
          <select id="filter-category">
            <option value="All">All Categories</option>
            <option value="Food">🍔 Food</option>
            <option value="Travel">🚌 Travel</option>
            <option value="Books">📚 Books</option>
            <option value="Fun">🎮 Fun</option>
            <option value="Other">🏷️ Other</option>
          </select>
        </div>
      </div>

      <!-- Expense List -->
      <ul id="expense-list" class="expense-list">
        <!-- Expenses will be displayed here dynamically via script.js -->
      </ul>

      <!-- Placeholder message when no expenses are present -->
      <p id="empty-message" class="empty-message">
        No expenses recorded yet. Fill out the form above to add your first expense!
      </p>
    </section>

  </div>

  <!-- External JavaScript File -->
  <script src="script.js"></script>

</body>
</html>`;

export const VANILLA_CSS_CODE = `/* 
  ==============================================================
  Student Expense Tracker — style.css
  Modern, Clean, Responsive CSS for Beginners
  
  Features:
  1. Clean card container centered on page
  2. Vibrant coloured gradient header
  3. Big, bold total amount display
  4. Category breakdown cards with custom colors
  5. Category filter dropdown
  6. Individual category color tags (Food, Travel, Books, Fun, Other)
  7. Mobile-first responsive layout
  ==============================================================
*/

/* 1. THEME PALETTE & CSS VARIABLES */
:root {
  --primary: #4f46e5;          /* Modern Indigo */
  --primary-hover: #4338ca;
  --bg-page: #f8fafc;          /* Soft cool slate background */
  --bg-card: #ffffff;
  --text-main: #0f172a;        /* High-contrast readable text */
  --text-muted: #64748b;       /* Secondary details & placeholders */
  --border: #e2e8f0;           /* Clean subtle hairline border */
  --border-focus: #6366f1;
  --radius-card: 20px;
  --radius-element: 10px;
  --shadow-card: 0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
  --shadow-btn: 0 4px 12px rgba(79, 70, 229, 0.25);

  /* Category Tag Colors (Background, Text, Border) */
  --tag-food-bg: #fff7ed;
  --tag-food-text: #c2410c;
  --tag-food-border: #ffedd5;

  --tag-travel-bg: #ecfeff;
  --tag-travel-text: #0e7490;
  --tag-travel-border: #cffafe;

  --tag-books-bg: #eef2ff;
  --tag-books-text: #4338ca;
  --tag-books-border: #e0e7ff;

  --tag-fun-bg: #fdf2f8;
  --tag-fun-text: #be185d;
  --tag-fun-border: #fce7f3;

  --tag-other-bg: #f1f5f9;
  --tag-other-text: #475569;
  --tag-other-border: #e2e8f0;
}

/* 2. BASE RESET & PAGE LAYOUT */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--bg-page);
  color: var(--text-main);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  line-height: 1.5;
}

/* 3. CENTERED CLEAN CARD DESIGN */
.container {
  width: 100%;
  max-width: 540px;
  background-color: var(--bg-card);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* 4. COLOURED GRADIENT HEADER */
.app-header {
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  color: #ffffff;
  padding: 28px 24px;
  text-align: center;
}

.app-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.app-header .subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
}

/* 5. BIG BOLD TOTAL AMOUNT SECTION */
.total-section {
  padding: 20px 24px 0 24px;
}

.total-card {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-element);
  padding: 16px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.total-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.total-value {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.total-value #total-amount {
  font-variant-numeric: tabular-nums;
}

/* 6. CATEGORY SPENDING BREAKDOWN SECTION */
.breakdown-section {
  padding: 18px 24px 0 24px;
}

.breakdown-section h3 {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.category-breakdown-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 8px;
}

.breakdown-card {
  padding: 10px 8px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: transform 0.15s ease;
}

.breakdown-card:hover {
  transform: translateY(-2px);
}

.breakdown-label {
  font-size: 0.725rem;
  font-weight: 600;
}

.breakdown-amount {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* Category Colors for Breakdown Cards */
.breakdown-card.tag-food {
  background-color: var(--tag-food-bg);
  color: var(--tag-food-text);
  border: 1px solid var(--tag-food-border);
}

.breakdown-card.tag-travel {
  background-color: var(--tag-travel-bg);
  color: var(--tag-travel-text);
  border: 1px solid var(--tag-travel-border);
}

.breakdown-card.tag-books {
  background-color: var(--tag-books-bg);
  color: var(--tag-books-text);
  border: 1px solid var(--tag-books-border);
}

.breakdown-card.tag-fun {
  background-color: var(--tag-fun-bg);
  color: var(--tag-fun-text);
  border: 1px solid var(--tag-fun-border);
}

.breakdown-card.tag-other {
  background-color: var(--tag-other-bg);
  color: var(--tag-other-text);
  border: 1px solid var(--tag-other-border);
}

/* 7. FORM & MODERN INPUTS */
.form-container {
  padding: 24px;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.825rem;
  font-weight: 600;
  color: #334155;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 11px 14px;
  font-size: 0.95rem;
  color: var(--text-main);
  background-color: #ffffff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-element);
  outline: none;
  transition: all 0.2s ease;
}

.form-group input::placeholder {
  color: #94a3b8;
  font-size: 0.9rem;
}

.form-group input:focus,
.form-group select:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

/* Currency input wrapper for ₹ symbol */
.currency-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol {
  position: absolute;
  left: 14px;
  font-size: 1rem;
  font-weight: 700;
  color: #64748b;
  pointer-events: none;
}

.currency-input-wrapper input {
  padding-left: 32px;
  font-weight: 600;
}

/* Custom Dropdown Chevron */
.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
  padding-right: 36px;
}

/* Modern Primary Button */
.btn-primary {
  width: 100%;
  padding: 13px 20px;
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-element);
  cursor: pointer;
  box-shadow: var(--shadow-btn);
  transition: all 0.2s ease;
  margin-top: 6px;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #4338ca 0%, #3730a3 100%);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.35);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.25);
}

/* 8. EXPENSE LIST & FILTER CONTROLS */
.list-section {
  padding: 0 24px 24px 24px;
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 10px;
}

.list-header h2 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
}

/* Category Filter Wrapper */
.filter-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-wrapper label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

.filter-wrapper select {
  padding: 6px 28px 6px 10px;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--text-main);
  background-color: #ffffff;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.filter-wrapper select:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

.expense-list {
  list-style: none;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 2px;
}

.expense-list::-webkit-scrollbar {
  width: 5px;
}
.expense-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

/* Individual Item Card */
.expense-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius-element);
  margin-bottom: 8px;
  transition: all 0.15s ease;
}

.expense-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  background-color: #fafafa;
}

.expense-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.expense-name {
  font-size: 0.925rem;
  font-weight: 600;
  color: var(--text-main);
}

.expense-meta {
  font-size: 0.775rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Individual Category Tags */
.category-tag {
  display: inline-block;
  padding: 2px 8px;
  font-size: 0.725rem;
  font-weight: 600;
  border-radius: 6px;
  line-height: 1.2;
}

.category-tag.tag-food {
  background-color: var(--tag-food-bg);
  color: var(--tag-food-text);
  border: 1px solid var(--tag-food-border);
}

.category-tag.tag-travel {
  background-color: var(--tag-travel-bg);
  color: var(--tag-travel-text);
  border: 1px solid var(--tag-travel-border);
}

.category-tag.tag-books {
  background-color: var(--tag-books-bg);
  color: var(--tag-books-text);
  border: 1px solid var(--tag-books-border);
}

.category-tag.tag-fun {
  background-color: var(--tag-fun-bg);
  color: var(--tag-fun-text);
  border: 1px solid var(--tag-fun-border);
}

.category-tag.tag-other {
  background-color: var(--tag-other-bg);
  color: var(--tag-other-text);
  border: 1px solid var(--tag-other-border);
}

.expense-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.expense-amount {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  white-space: nowrap;
}

.btn-delete {
  background: transparent;
  border: none;
  color: #94a3b8;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-delete:hover {
  color: #ef4444;
  background-color: #fee2e2;
}

.empty-message {
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
  padding: 28px 12px;
  background-color: #f8fafc;
  border: 1.5px dashed var(--border);
  border-radius: var(--radius-element);
}

/* 9. MOBILE RESPONSIVENESS */
@media (max-width: 480px) {
  body {
    padding: 12px 10px;
    align-items: flex-start;
  }

  .container {
    border-radius: 16px;
  }

  .app-header {
    padding: 22px 18px;
  }

  .app-header h1 {
    font-size: 1.3rem;
  }

  .total-section {
    padding: 16px 18px 0 18px;
  }

  .total-value {
    font-size: 1.9rem;
  }

  .breakdown-section {
    padding: 16px 18px 0 18px;
  }

  .category-breakdown-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-breakdown-grid .breakdown-card:last-child {
    grid-column: span 2;
  }

  .form-container {
    padding: 18px;
  }

  .form-group input,
  .form-group select,
  .btn-primary {
    padding: 12px 14px;
    font-size: 1rem;
    min-height: 46px;
  }

  .list-section {
    padding: 0 18px 18px 18px;
  }

  .expense-item {
    padding: 12px;
  }

  .btn-delete {
    width: 32px;
    height: 32px;
  }
}
`;

export const VANILLA_JS_CODE = `/* 
  ==============================================================
  Student Expense Tracker — script.js
  Features:
  1. Saves expenses to localStorage (persists across reloads)
  2. Input validation (positive ₹ amount & non-empty fields)
  3. Individual delete button for each expense
  4. Dynamically calculates total amount spent
  5. Calculates and displays spending breakdown per category
  6. Category filter dropdown to view one category at a time
  ==============================================================
*/

// ==========================================
// 1. SELECT HTML ELEMENTS (DOM)
// ==========================================
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");
const expenseDateInput = document.getElementById("expense-date");
const totalAmountSpan = document.getElementById("total-amount");
const expenseList = document.getElementById("expense-list");
const emptyMessage = document.getElementById("empty-message");

// Category Filter Dropdown
const filterCategorySelect = document.getElementById("filter-category");

// Category Breakdown Spans
const breakdownFood = document.getElementById("breakdown-food");
const breakdownTravel = document.getElementById("breakdown-travel");
const breakdownBooks = document.getElementById("breakdown-books");
const breakdownFun = document.getElementById("breakdown-fun");
const breakdownOther = document.getElementById("breakdown-other");

// Storage key in localStorage
const STORAGE_KEY = "student_expenses_rupees";

// Category Icons
const categoryIcons = {
  Food: "🍔",
  Travel: "🚌",
  Books: "📚",
  Fun: "🎮",
  Other: "🏷️"
};

// Set today's date as default
expenseDateInput.value = new Date().toISOString().split("T")[0];

// ==========================================
// 2. LOAD DATA FROM LOCALSTORAGE
// ==========================================
let expenses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ==========================================
// 3. HELPER FUNCTIONS
// ==========================================

// Save expenses array to browser localStorage
function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// Update the overall Total Amount Spent
function updateTotalAmount() {
  const total = expenses.reduce(function (sum, item) {
    return sum + item.amount;
  }, 0);

  totalAmountSpan.textContent = total.toFixed(2);
}

// Calculate & Update Category Breakdown
function updateCategoryBreakdown() {
  const totals = {
    Food: 0,
    Travel: 0,
    Books: 0,
    Fun: 0,
    Other: 0
  };

  expenses.forEach(function (item) {
    if (totals.hasOwnProperty(item.category)) {
      totals[item.category] += item.amount;
    } else {
      totals.Other += item.amount;
    }
  });

  breakdownFood.textContent = totals.Food.toFixed(2);
  breakdownTravel.textContent = totals.Travel.toFixed(2);
  breakdownBooks.textContent = totals.Books.toFixed(2);
  breakdownFun.textContent = totals.Fun.toFixed(2);
  breakdownOther.textContent = totals.Other.toFixed(2);
}

// Render expenses list on screen (WITH FILTER SUPPORT)
function renderExpenses() {
  expenseList.innerHTML = "";

  const selectedFilter = filterCategorySelect.value;

  const filteredExpenses = expenses.filter(function (item) {
    if (selectedFilter === "All") {
      return true;
    }
    return item.category === selectedFilter;
  });

  if (filteredExpenses.length === 0) {
    emptyMessage.style.display = "block";
    if (selectedFilter === "All") {
      emptyMessage.textContent = "No expenses recorded yet. Fill out the form above to add your first expense!";
    } else {
      emptyMessage.textContent = \`No expenses found in the "\${selectedFilter}" category.\`;
    }
  } else {
    emptyMessage.style.display = "none";

    filteredExpenses.slice().reverse().forEach(function (expense) {
      const li = document.createElement("li");
      li.className = "expense-item";

      const catLower = (expense.category || "other").toLowerCase();
      const icon = categoryIcons[expense.category] || "🏷️";

      li.innerHTML = \`
        <div class="expense-info">
          <span class="expense-name">\${escapeHTML(expense.name)}</span>
          <div class="expense-meta">
            <span>\${expense.date}</span>
            <span class="category-tag tag-\${catLower}">
              \${icon} \${expense.category}
            </span>
          </div>
        </div>
        <div class="expense-right">
          <span class="expense-amount">₹\${expense.amount.toFixed(2)}</span>
          <button 
            type="button" 
            class="btn-delete" 
            onclick="deleteExpense('\${expense.id}')" 
            title="Delete this expense"
          >×</button>
        </div>
      \`;

      expenseList.appendChild(li);
    });
  }

  updateTotalAmount();
  updateCategoryBreakdown();
}

// Basic text sanitizer to prevent HTML injection
function escapeHTML(text) {
  return text.replace(/[&<>'"]/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }[char] || char;
  });
}

// ==========================================
// 4. EVENT LISTENERS
// ==========================================

// Add Expense (Form Submission)
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = expenseNameInput.value.trim();
  const rawAmount = expenseAmountInput.value.trim();
  const category = expenseCategoryInput.value;
  const date = expenseDateInput.value;

  if (!name || !rawAmount || !category || !date) {
    alert("⚠️ Please fill in all fields (Name, Amount, Category, and Date).");
    return;
  }

  const amount = parseFloat(rawAmount);
  if (isNaN(amount) || amount <= 0) {
    alert("⚠️ Please enter a valid positive amount greater than ₹0.");
    expenseAmountInput.focus();
    return;
  }

  const newExpense = {
    id: Date.now().toString(),
    name: name,
    amount: amount,
    category: category,
    date: date
  };

  expenses.push(newExpense);
  saveExpenses();
  renderExpenses();

  expenseNameInput.value = "";
  expenseAmountInput.value = "";
  expenseCategoryInput.selectedIndex = 0;
  expenseDateInput.value = new Date().toISOString().split("T")[0];
  expenseNameInput.focus();
});

// Category Filter Change
filterCategorySelect.addEventListener("change", function () {
  renderExpenses();
});

// Delete Expense
window.deleteExpense = function (idToDelete) {
  expenses = expenses.filter(function (item) {
    return item.id !== idToDelete;
  });

  saveExpenses();
  renderExpenses();
};

// ==========================================
// 5. INITIAL RUN
// ==========================================
renderExpenses();
`;
