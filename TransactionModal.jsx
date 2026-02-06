import React, { useState } from "react";

export default function TransactionModal({ isOpen, onClose, onSave, transaction }) {
  if (!isOpen) return null;

  // This pre-fills the modal if editing, or sets empty defaults if adding
  const defaultData = transaction || {
    type: "income",
    amount: "",
    date: "",
    description: "",
    category: "",
    division: "Personal",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = {
              ...defaultData,
              type: e.target.type.value,
              amount: parseFloat(e.target.amount.value),
              date: e.target.date.value,
              description: e.target.description.value,
              category: e.target.category.value,
              division: e.target.division.value,
            };
            onSave(data);
          }}
        >
          <select name="type" defaultValue={defaultData.type} className="border w-full mb-2 p-1">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            defaultValue={defaultData.amount}
            className="border w-full mb-2 p-1"
            required
          />

          <input
            type="date"
            name="date"
            defaultValue={defaultData.date}
            className="border w-full mb-2 p-1"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            defaultValue={defaultData.description}
            className="border w-full mb-2 p-1"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            defaultValue={defaultData.category}
            className="border w-full mb-2 p-1"
          />

          <select name="division" defaultValue={defaultData.division} className="border w-full mb-4 p-1">
            <option value="Personal">Personal</option>
            <option value="Office">Office</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
