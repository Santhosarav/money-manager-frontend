import React, { useState } from "react";
import { transactions as initialTransactions } from "../data/sampleTransactions";
import TransactionModal from "./TransactionModal";

export default function Dashboard() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Filter states
  const [filterDivision, setFilterDivision] = useState("All");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // Save function for adding or editing transactions
  const handleSave = (newTransaction) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id ? { ...t, ...newTransaction } : t
        )
      );
      setEditingTransaction(null);
    } else {
      const id = transactions.length + 1;
      setTransactions([...transactions, { id, ...newTransaction }]);
    }
    setIsModalOpen(false);
  };

  // Filtered transactions for summary and display
  const filteredTransactions = transactions.filter((t) => {
    const transactionDate = t.date;

    if (filterDivision !== "All" && t.division !== filterDivision) return false;
    if (filterCategory && !t.category.toLowerCase().includes(filterCategory.toLowerCase()))
      return false;
    if (filterStartDate && transactionDate < filterStartDate) return false;
    if (filterEndDate && transactionDate > filterEndDate) return false;

    return true;
  });

  // Summary calculations
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const categoryTotals = {};
  filteredTransactions.forEach((t) => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += Number(t.amount);
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Money Manager Dashboard</h1>

      {/* Add Transaction Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Add Transaction
      </button>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <select
          value={filterDivision}
          onChange={(e) => setFilterDivision(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="All">All Divisions</option>
          <option value="Personal">Personal</option>
          <option value="Office">Office</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-1 rounded"
        />

        <input
          type="date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          className="border p-1 rounded"
        />

        <input
          type="date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      {/* Summary */}
      <div className="mb-4 p-2 border rounded bg-gray-100">
        <h2 className="font-bold mb-2">Summary</h2>
        <p>Total Income: ${totalIncome}</p>
        <p>Total Expense: ${totalExpense}</p>
        <h3 className="font-semibold mt-2">By Category:</h3>
        <ul>
          {Object.keys(categoryTotals).map((cat) => (
            <li key={cat}>
              {cat}: ${categoryTotals[cat]}
            </li>
          ))}
        </ul>
      </div>

      {/* Transaction List */}
      <ul>
        {filteredTransactions.map((t) => {
          const transactionDate = new Date(t.date);
          const now = new Date();
          const hoursDiff = (now - transactionDate) / 36e5;
          const canEdit = hoursDiff <= 12;

          return (
            <li
              key={t.id}
              className="mb-2 border p-2 rounded flex justify-between items-center"
            >
              <span>
                {t.date} - {t.description} - {t.type} - ${t.amount} - {t.category} - {t.division}
              </span>

              {canEdit && (
                <button
                  onClick={() => {
                    setEditingTransaction(t);
                    setIsModalOpen(true);
                  }}
                  className="px-2 py-1 bg-yellow-400 rounded text-white ml-2"
                >
                  Edit
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* Modal for Add/Edit */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSave}
        transaction={editingTransaction}
      />
    </div>
  );
}
