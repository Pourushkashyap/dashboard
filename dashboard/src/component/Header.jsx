import React from 'react'
import { useApp } from '../context/AppContext'

function Header() {
  const { role, setRole, theme, toggleTheme } = useApp();

  return (
    <div
      className={`
        w-full 
        ${theme === "dark" ? "bg-black text-white " : "bg-white text-black "}
      `}
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Finance Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Track your income, expenses, and spending patterns
          </p>
        </div>

        
        <div className="flex items-center gap-3">

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`
              h-9 px-3 rounded-md text-sm
              ${theme === "dark"
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-gray-100 text-black border border-gray-300"}
            `}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

          <button
            onClick={toggleTheme}
            className={`
              h-9 w-9 flex items-center justify-center rounded-md
              ${theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"}
            `}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

        </div>
      </div>
    </div>
  )
}

export default Header;