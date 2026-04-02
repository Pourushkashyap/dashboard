import React from 'react'
import Header from '../component/Header.jsx'
import SummaryCards from '../component/SummaryCard.jsx'
import { useApp } from '../context/AppContext'
import Chart from '../component/Chart.jsx'
import Insights from '../component/Insight.jsx'
import Transection from '../component/Transection.jsx'
function Dashboard() {
  const { theme } = useApp();

  return (
    <div
      className={`
        min-h-screen
        ${theme === "dark" 
          ? "bg-black text-white" 
          : "bg-white text-black"}
      `}
    >
      <Header />
      <SummaryCards />
      <Chart/>
      <Transection/>
      <Insights/>
    </div>
  );
}

export default Dashboard