# 🎓 Student Expense Tracker

A clean, modern, and beginner-friendly web application designed for college students to track daily campus spending in Indian Rupees (₹). Built entirely with **Vanilla HTML, CSS, and JavaScript**—no frameworks, no external libraries, and zero backend required!

---

## 📌 Project Overview

Managing daily allowances, mess bills, textbook photocopies, and weekend hangouts can get overwhelming for college students. This expense tracker helps students stay on top of their finances with:
- Instant spending breakdown across campus categories.
- Real-time overall and category-specific totals.
- Category filtering to audit spending patterns.
- Automatic browser storage so expenses are never lost on reload.

---

## ✨ Features

- **Quick Expense Logging**: Add items with Name, Amount in Rupees (₹), Category, and Date.
- **Input Validation**: Prevents empty submissions or negative/zero amounts with clear, friendly error alerts.
- **Live Running Total**: Dynamically calculates the overall money spent using JavaScript array reduction.
- **Category Spending Breakdown**: Instant visual summary cards showing totals spent in:
  - 🍔 **Food**
  - 🚌 **Travel**
  - 📚 **Books**
  - 🎮 **Fun**
  - 🏷️ **Other**
- **Category Filtering**: Dropdown filter to inspect one category at a time or view all expenses together.
- **Individual Deletion**: One-click delete button (`×`) on each item that instantly updates both the overall and category totals.
- **Browser LocalStorage Persistence**: Saves all transactions in the browser so your data stays intact even after refreshing the page or restarting your computer.
- **Modern & Mobile-Responsive Design**: Centered elevated card layout, gradient header, custom chevron dropdowns, and large touch targets (≥44px) for phones.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure (`<header>`, `<section>`, `<form>`, `<select>`, `<ul>`) |
| **CSS3** | Modern flexbox & grid layouts, CSS custom variables, gradients, and media queries |
| **Vanilla JavaScript (ES6+)** | DOM manipulation, array methods (`.reduce()`, `.filter()`, `.forEach()`), event listeners |
| **Browser Web Storage API** | `window.localStorage` with `JSON.stringify()` & `JSON.parse()` for offline data persistence |

---

## 📂 Project Structure

```text
student-expense-tracker/
│
├── index.html        # Main HTML skeleton and structure
├── style.css         # Styling, theme palette, category tags & mobile responsive rules
├── script.js         # Logic: validation, array management, calculations & localStorage
└── README.md         # Project documentation and guide
```

---

## 🚀 How to Run Locally

You don't need Node.js or any build tools to run this project!

### Method 1: Direct File Open (Easiest)
1. Download or clone this repository to your computer.
2. Locate `index.html` in your file explorer.
3. Double-click `index.html` (or right-click -> **Open with Google Chrome / Firefox / Safari / Edge**).

### Method 2: VS Code Live Server (Recommended for Developers)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by *Ritwick Dey* (from the Extensions tab `Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The app will launch at `http://127.0.0.1:5500/`.

---

## 🌐 How to Publish for Free on GitHub Pages

You can host this project online so anyone (or your college evaluator) can visit it with a public link!

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click the **"+"** icon in the top-right corner and select **New repository**.
3. Name your repository (e.g., `student-expense-tracker`).
4. Set the visibility to **Public**.
5. Check **Add a README file** (or leave it unchecked if you are uploading your own).
6. Click **Create repository**.

### Step 2: Upload Your Files
1. On your new repository page, click **Add file** -> **Upload files**.
2. Drag and drop all 3 project files:
   - `index.html` *(Ensure the filename is all lowercase: `index.html`)*
   - `style.css`
   - `script.js`
   - `README.md`
3. In the "Commit changes" box at the bottom, type `"Initial release of student expense tracker"`.
4. Click **Commit changes**.

### Step 3: Enable GitHub Pages
1. Go to your repository's **Settings** tab (the gear icon near the top right).
2. On the left sidebar menu, scroll down and click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - Source: Select **Deploy from a branch**.
   - Branch: Select **`main`** (or `master`) and leave the folder as **`/ (root)`**.
4. Click **Save**.

### Step 4: Access Your Live Website!
1. Wait 1 to 2 minutes for GitHub to build your site.
2. Refresh the GitHub Pages settings page. You will see a banner:
   > *"Your site is live at `https://<your-username>.github.io/student-expense-tracker/`"*
3. Click the link to view and share your live expense tracker!

---

## 👨‍🎓 Beginner Tips & Customization
- **Change Default Currency**: In `index.html`, `style.css`, and `script.js`, replace `₹` with `$`, `€`, or `£`.
- **Add More Categories**: Add an `<option>` in `index.html` and a matching CSS color rule in `style.css` under `.category-tag.tag-<your-category>`.
- **Clear All Data**: Open your browser's Developer Tools (`F12`), go to the **Console** tab, type `localStorage.clear()`, and reload.

---

## 📄 License
This project is open-source and free to use for student learning and personal projects under the MIT License.
