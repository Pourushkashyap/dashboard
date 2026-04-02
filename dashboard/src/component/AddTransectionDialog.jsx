import { useState } from "react";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";

const AddTransactionModal = ({ isOpen, onClose }) => {
  const { setTransactions, theme } = useApp();
  const isDark = theme === "dark";

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Other",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    "Salary", "Freelance", "Investments", "Food & Dining",
    "Transportation", "Shopping", "Entertainment",
    "Bills & Utilities", "Health", "Education", "Travel", "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;

    const newTx = {
      id: Date.now().toString(),
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    };

    setTransactions((prev) => [newTx, ...prev]);
    onClose();

    
    setForm({
      description: "",
      amount: "",
      type: "expense",
      category: "Other",
      date: new Date().toISOString().split("T")[0],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div
        className={`w-full max-w-md mx-4 rounded-3xl ${
          isDark ? "bg-[#0f172a] text-white" : "bg-white text-black shadow-2xl"
        }`}
      >
        
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-700">
          <h3 className="text-2xl font-semibold">Add Transaction</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div>
            <label className="block text-sm mb-2 font-medium">Description</label>
            <input
              type="text"
              placeholder="e.g. Grocery shopping"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:border-blue-500 ${
                isDark
                  ? "bg-[#1e2937] border-gray-700"
                  : "bg-white border-gray-300"
              }`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm mb-2 font-medium">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:border-blue-500 ${
                  isDark
                    ? "bg-[#1e2937] border-gray-700"
                    : "bg-white border-gray-300"
                }`}
                required
              />
            </div>

           
            <div>
              <label className="block text-sm mb-2 font-medium">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:border-blue-500 ${
                  isDark
                    ? "bg-[#1e2937] border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm mb-2 font-medium">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:border-blue-500 ${
                  isDark
                    ? "bg-[#1e2937] border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

           
            <div>
              <label className="block text-sm mb-2 font-medium">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:border-blue-500 ${
                  isDark
                    ? "bg-[#1e2937] border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 py-5 rounded-3xl text-white font-semibold text-lg transition-colors"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;