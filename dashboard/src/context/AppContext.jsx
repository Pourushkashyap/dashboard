import { createContext, useContext, useState } from "react";
import { MOCK_TRANSACTIONS } from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  
  const [theme, setTheme] = useState("dark");
  const [role, setRole] = useState("admin");

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

 
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

 
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;


  const monthlyBalances = Object.values(
    transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleString("en-US", {
        month: "short",
      });

      if (!acc[month]) {
        acc[month] = { month, income: 0, expenses: 0 };
      }

      if (t.type === "income") {
        acc[month].income += t.amount;
      } else {
        acc[month].expenses += t.amount;
      }

      return acc;
    }, {})
  ).map(m => ({
    ...m,
    balance: m.income - m.expenses,
  }));


  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        if (!acc[t.category]) {
          acc[t.category] = { name: t.category, value: 0 };
        }
        acc[t.category].value += t.amount;
      }
      return acc;
    }, {})
  );

  return (
    <AppContext.Provider
      value={{
        
        theme,
        toggleTheme,
        role,
        setRole,

        // DATA
        transactions,
        setTransactions,
        totalIncome,
        totalExpenses,
        totalBalance,
        monthlyBalances,
        categoryData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);