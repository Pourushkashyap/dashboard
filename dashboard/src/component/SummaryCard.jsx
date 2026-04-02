import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";


const cards = [
  { key: "balance", label: "Total Balance", icon: Wallet, color: "primary" },
  { key: "income", label: "Total Income", icon: TrendingUp, color: "income" },
  { key: "expenses", label: "Total Expenses", icon: TrendingDown, color: "expense" },
];


const formatCurrency = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n || 0);

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses, theme } = useApp();

  const values = {
    balance: totalBalance || 0,
    income: totalIncome || 0,
    expenses: totalExpenses || 0,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {cards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`
              rounded-xl p-5 transition-all
              ${
                theme === "dark"
                  ? "bg-[#0f172a] border border-gray-800 text-white"
                  : "bg-white border border-gray-200 text-black shadow-sm"
              }
            `}
          >
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {card.label}
              </span>

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  card.color === "income"
                    ? "bg-green-500/10 text-green-400"
                    : card.color === "expense"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-blue-500/10 text-blue-400"
                }`}
              >
                <card.icon className="h-4 w-4" />
              </div>
            </div>

            
            <div className="mt-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {formatCurrency(values[card.key])}
              </h2>
            </div>

            
            <div className="mt-3 flex items-center gap-1 text-xs">
              {card.key !== "expenses" ? (
                <ArrowUpRight className="h-3 w-3 text-green-400" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-400" />
              )}

              <span
                className={
                  card.key !== "expenses"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {card.key === "balance"
                  ? "+12.5%"
                  : card.key === "income"
                  ? "+8.2%"
                  : "+3.1%"}
              </span>

              <span className="text-gray-400 ml-1">
                vs last quarter
              </span>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default SummaryCards;