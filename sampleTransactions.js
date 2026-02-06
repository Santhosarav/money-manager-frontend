export const transactions = [
  {
    id: 1,
    type: "income",
    amount: 1000,
    date: new Date().toISOString().split("T")[0], // today
    description: "Salary",
    category: "Job",
    division: "Personal",
  },
  {
    id: 2,
    type: "expense",
    amount: 50,
    date: new Date().toISOString().split("T")[0], // today
    description: "Fuel",
    category: "Transport",
    division: "Office",
  },
  {
    id: 3,
    type: "expense",
    amount: 30,
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0], // yesterday
    description: "Movie",
    category: "Entertainment",
    division: "Personal",
  },
];
