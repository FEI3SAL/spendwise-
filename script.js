// ======================================
// SPENDWISE INTERACTIVE APPLICATION
// ======================================


// 1. VARIABLES AND ARRAYS

let monthlyBudget = 0;

let totalExpenses = 0;

const expenses = [];


// 2. SELECT HTML ELEMENTS

const budgetForm = document.getElementById("budget-form");

const budgetInput = document.getElementById("budget-input");

const expenseForm = document.getElementById("expense-form");

const expenseName = document.getElementById("expense-name");

const expenseAmount = document.getElementById("amount");

const expenseCategory = document.getElementById("category");

const expenseList = document.getElementById("expense-list");

const message = document.getElementById("message");


// 3. FORMAT CURRENCY

function formatCurrency(amount) {

    return "KSh " + amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

}


// 4. SET MONTHLY BUDGET

budgetForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const budget = Number(budgetInput.value);

    if (!Number.isFinite(budget) || budget <= 0) {

        message.textContent = "Please enter a valid budget.";

        return;

    }

    monthlyBudget = budget;

    updateDashboard();

    message.textContent = "Monthly budget saved successfully!";

    budgetForm.reset();

});


// 5. ADD EXPENSE

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value.trim();

    const amount = Number(expenseAmount.value);

    const category = expenseCategory.value;

    // Conditional validation

    if (name === "" || !Number.isFinite(amount) ||
        amount <= 0 || category === "") {

        message.textContent = "Please enter valid expense details.";

        return;

    }

    // Create expense object

    const expense = {

        id: Date.now(),

        name: name,

        amount: amount,

        category: category,

        date: new Date().toLocaleDateString()

    };

    // Store expense in array

    expenses.push(expense);

    // Update dashboard

    updateDashboard();

    message.textContent = "Expense added successfully!";

    expenseForm.reset();

});


// 6. CALCULATE TOTAL EXPENSES

function calculateTotalExpenses() {

    let total = 0;

    // Loop through expense records

    for (let expense of expenses) {

        total += expense.amount;

    }

    return total;

}


// 7. CALCULATE REMAINING BALANCE

function calculateRemainingBalance() {

    return monthlyBudget - totalExpenses;

}


// 8. DISPLAY EXPENSES IN TABLE

function displayExpenses() {

    expenseList.innerHTML = "";

    // Loop through all expenses

    for (let expense of expenses) {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");

        const amountCell = document.createElement("td");

        const categoryCell = document.createElement("td");

        const dateCell = document.createElement("td");

        nameCell.textContent = expense.name;

        amountCell.textContent = formatCurrency(expense.amount);

        categoryCell.textContent = expense.category;

        dateCell.textContent = expense.date;

        row.appendChild(nameCell);

        row.appendChild(amountCell);

        row.appendChild(categoryCell);

        row.appendChild(dateCell);

        expenseList.appendChild(row);

    }

}


// 9. UPDATE CATEGORY CARDS

function updateCategories() {

    const categoryTotals = {

        Food: 0,

        Transport: 0,

        Rent: 0,

        Entertainment: 0,

        Savings: 0,

        Utilities: 0

    };

    // Loop through expenses

    for (let expense of expenses) {

        categoryTotals[expense.category] += expense.amount;

    }

    for (let category in categoryTotals) {

        const element = document.getElementById(
            "category-" + category.toLowerCase()
        );

        element.textContent = formatCurrency(
            categoryTotals[category]
        );

    }

}


// 10. UPDATE DASHBOARD

function updateDashboard() {

    totalExpenses = calculateTotalExpenses();

    const remainingBalance = calculateRemainingBalance();

    document.getElementById("total-budget").textContent =
        formatCurrency(monthlyBudget);

    document.getElementById("total-spent").textContent =
        formatCurrency(totalExpenses);

    document.getElementById("remaining-balance").textContent =
        formatCurrency(remainingBalance);

    // Conditional budget feedback

    if (monthlyBudget === 0) {

        message.textContent = "Please set your monthly budget.";

    } else if (remainingBalance < 0) {

        message.textContent = "Warning! You have exceeded your budget.";

    } else if (remainingBalance === 0) {

        message.textContent = "You have used your entire budget.";

    }

    displayExpenses();

    updateCategories();

}


// INITIAL DASHBOARD DISPLAY

updateDashboard();