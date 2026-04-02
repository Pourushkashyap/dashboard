import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  ChevronDown,
} from "lucide-react";
import AddTransactionModal from "./AddTransectionDialog"; 

function Transactions() {
  const { transactions, role, theme, setTransactions } = useApp();
  const isDark = theme === "dark";


  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortField, setSortField] = useState("date"); 
  const [sortOrder, setSortOrder] = useState("desc"); 

  
  const [showAddModal, setShowAddModal] = useState(false);

  
  const filteredData = transactions
    .filter((tx) => {
      const matchesSearch = tx.description
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || tx.type === typeFilter;
      const matchesCategory =
        categoryFilter === "all" || tx.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      let valA, valB;

      if (sortField === "date") {
        valA = new Date(a.date);
        valB = new Date(b.date);
      } else {
        valA = a.description.toLowerCase();
        valB = b.description.toLowerCase();
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  
  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  
  const allCategories = [
    ...new Set(transactions.map((t) => t.category)),
  ].sort();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div
          className={`rounded-3xl p-6 shadow ${
            isDark
              ? "bg-[#0f172a] border border-gray-800 text-white"
              : "bg-white border border-gray-200 text-black shadow-sm"
          }`}
        >
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Transactions</h2>

           
            {role === "admin" && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-colors text-white px-5 py-2.5 rounded-2xl text-sm font-medium"
              >
                <Plus size={18} />
                Add Transaction
              </button>
            )}
          </div>

          
          <div className="flex flex-wrap items-center gap-3 mb-6">
           
            <div className="relative flex-1 min-w-[260px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-[#1e2937] border-gray-700 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-300 text-black placeholder:text-gray-400"
                }`}
              />
            </div>

           
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={`px-5 py-3 rounded-2xl text-sm border appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-[#1e2937] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              />
            </div>

            
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`px-5 py-3 rounded-2xl text-sm border appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-[#1e2937] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <option value="all">All Categories</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              />
            </div>

            
            <button
              onClick={() => {
                if (sortField === "date") {
                  setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                } else {
                  setSortField("date");
                  setSortOrder("desc");
                }
              }}
              className={`flex items-center gap-1.5 px-5 py-3 rounded-2xl text-sm font-medium border transition-colors ${
                sortField === "date"
                  ? isDark
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-blue-600 border-blue-600 text-white"
                  : isDark
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {sortField === "date" && sortOrder === "desc" ? "↓" : "↑"} Date
            </button>

           
            <button
              onClick={() => {
                if (sortField === "description") {
                  setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                } else {
                  setSortField("description");
                  setSortOrder("desc");
                }
              }}
              className={`flex items-center gap-1.5 px-5 py-3 rounded-2xl text-sm font-medium border transition-colors ${
                sortField === "description"
                  ? isDark
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-blue-600 border-blue-600 text-white"
                  : isDark
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {sortField === "description" && sortOrder === "desc"
                ? "↓"
                : "↑"}{" "}
              Desc
            </button>
          </div>

          
          <div
            className={`grid grid-cols-[1fr_140px_160px_120px] pb-4 text-xs font-semibold uppercase tracking-widest border-b ${
              isDark ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"
            }`}
          >
            <div>DESCRIPTION</div>
            <div>DATE</div>
            <div>CATEGORY</div>
            <div className="text-right">AMOUNT</div>
          </div>

         
          <div className="max-h-[460px] overflow-auto">
            {filteredData.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No transactions found
              </div>
            ) : (
              filteredData.map((tx) => (
                <div
                  key={tx.id}
                  className={`grid grid-cols-[1fr_140px_160px_120px] py-4 items-center border-b last:border-none ${
                    isDark ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                 
                  <div className="flex items-center gap-3">
                    {tx.type === "income" ? (
                      <div className="w-8 h-8 flex items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                        <ArrowUpRight size={18} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                        <ArrowDownRight size={18} />
                      </div>
                    )}
                    <span className="font-medium">{tx.description}</span>
                  </div>

                 
                  <div className="text-sm">{formatDate(tx.date)}</div>

                 
                  <div>
                    <span
                      className={`inline-block px-4 py-1 text-xs font-medium rounded-3xl ${
                        isDark
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tx.category}
                    </span>
                  </div>

                
                  <div className="flex items-center justify-end gap-2">
                    <span
                      className={`font-semibold text-lg ${
                        tx.type === "income" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"}$
                      {tx.amount.toLocaleString("en-US")}
                    </span>

                    {/* DELETE - only for Admin */}
                    {role === "admin" && (
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors ml-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

     
      <AddTransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}

export default Transactions;