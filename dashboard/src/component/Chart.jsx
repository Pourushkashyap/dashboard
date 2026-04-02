import React from 'react'
import PieChartComponent from './PieChart'
import BalanceChart from './BalanceChart'
function Chart() {
  return (
   <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">

        
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>

       
        <div>
          <PieChartComponent />
        </div>

      </div>
    </>
  
   
  )
}

export default Chart