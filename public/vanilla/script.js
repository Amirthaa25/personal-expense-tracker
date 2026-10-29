/* 
  ==============================================================
  Student Expense Tracker — script.js
  Features:
  1. Saves expenses to localStorage (persists across reloads)
  2. Input validation (positive ₹ amount & non-empty fields)
  3. Individual delete button for each expense
  4. Dynamically calculates total amount spent
  5. NEW: Calculates and displays spending breakdown per category
  6. NEW: Category filter dropdown to view one category at a time
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

// NEW: Category Filter Dropdown
const filterCategorySelect = document.getElementById("filter-category");

// NEW: Category Breakdown Spans
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

// NEW FUNCTION: Calculate & Update Category Breakdown
function updateCategoryBreakdown() {
  // Category totals accumulator
  const totals = {
    Food: 0,
    Travel: 0,
    Books: 0,
    Fun: 0,
    Other: 0
  };

  // Sum up expenses for each category
  expenses.forEach(function (item) {
    if (totals.hasOwnProperty(item.category)) {
      totals[item.category] += item.amount;
    } else {
      totals.Other += item.amount;
    }
  });

  // Update the 5 breakdown cards on screen
  breakdownFood.textContent = totals.Food.toFixed(2);
  breakdownTravel.textContent = totals.Travel.toFixed(2);
  breakdownBooks.textContent = totals.Books.toFixed(2);
  breakdownFun.textContent = totals.Fun.toFixed(2);
  breakdownOther.textContent = totals.Other.toFixed(2);
}

// Render expenses list on screen (WITH FILTER SUPPORT)
function renderExpenses() {
  // Clear current list items
  expenseList.innerHTML = "";

  // Get selected filter value ("All", "Food", "Travel", etc.)
  const selectedFilter = filterCategorySelect.value;

  // Filter expenses based on the dropdown selection
  const filteredExpenses = expenses.filter(function (item) {
    if (selectedFilter === "All") {
      return true; // Keep all expenses
    }
    return item.category === selectedFilter; // Keep only matching category
  });

  // Display empty message if no expenses match
  if (filteredExpenses.length === 0) {
    emptyMessage.style.display = "block";
    if (selectedFilter === "All") {
      emptyMessage.textContent = "No expenses recorded yet. Fill out the form above to add your first expense!";
    } else {
      emptyMessage.textContent = `No expenses found in the "${selectedFilter}" category.`;
    }
  } else {
    emptyMessage.style.display = "none";

    // Loop through filtered expenses (newest first) and create <li>
    filteredExpenses.slice().reverse().forEach(function (expense) {
      const li = document.createElement("li");
      li.className = "expense-item";

      const catLower = (expense.category || "other").toLowerCase();
      const icon = categoryIcons[expense.category] || "🏷️";

      li.innerHTML = `
        <div class="expense-info">
          <span class="expense-name">${escapeHTML(expense.name)}</span>
          <div class="expense-meta">
            <span>${expense.date}</span>
            <span class="category-tag tag-${catLower}">
              ${icon} ${expense.category}
            </span>
          </div>
        </div>
        <div class="expense-right">
          <span class="expense-amount">₹${expense.amount.toFixed(2)}</span>
          <button 
            type="button" 
            class="btn-delete" 
            onclick="deleteExpense('${expense.id}')" 
            title="Delete this expense"
          >×</button>
        </div>
      `;

      expenseList.appendChild(li);
    });
  }

  // Update both the overall total and category breakdown
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
  event.preventDefault(); // Stop page reload

  const name = expenseNameInput.value.trim();
  const rawAmount = expenseAmountInput.value.trim();
  const category = expenseCategoryInput.value;
  const date = expenseDateInput.value;

  // Validation: Check for empty fields
  if (!name || !rawAmount || !category || !date) {
    alert("⚠️ Please fill in all fields (Name, Amount, Category, and Date).");
    return;
  }

  // Validation: Check for positive number
  const amount = parseFloat(rawAmount);
  if (isNaN(amount) || amount <= 0) {
    alert("⚠️ Please enter a valid positive amount greater than ₹0.");
    expenseAmountInput.focus();
    return;
  }

  // Create new expense object
  const newExpense = {
    id: Date.now().toString(),
    name: name,
    amount: amount,
    category: category,
    date: date
  };

  // Add to array & save
  expenses.push(newExpense);
  saveExpenses();

  // Re-render UI list & update breakdown
  renderExpenses();

  // Reset form inputs
  expenseNameInput.value = "";
  expenseAmountInput.value = "";
  expenseCategoryInput.selectedIndex = 0;
  expenseDateInput.value = new Date().toISOString().split("T")[0];
  expenseNameInput.focus();
});

// NEW EVENT LISTENER: Category Filter Change
filterCategorySelect.addEventListener("change", function () {
  // Re-render the list according to the newly selected category
  renderExpenses();
});

// Delete Expense
window.deleteExpense = function (idToDelete) {
  // Filter out the clicked item
  expenses = expenses.filter(function (item) {
    return item.id !== idToDelete;
  });

  // Save to localStorage
  saveExpenses();

  // Re-render UI list & update breakdown
  renderExpenses();
};

// ==========================================
// 5. INITIAL RUN
// ==========================================
renderExpenses();
