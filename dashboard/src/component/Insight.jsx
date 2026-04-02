import { useApp } from "../context/AppContext";
import { AlertTriangle, TrendingUp, Zap, Lightbulb } from "lucide-react";

const Insights = () => {
  const { categoryData, totalIncome, totalExpenses, monthlyBalances, theme } = useApp();

  
  const highestCategory = categoryData.reduce(
    (max, curr) => (curr.value > max.value ? curr : max),
    { name: "", value: 0 }
  );

  
  const savingsRate =
    totalIncome > 0
      ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
      : 0;

  
  let trend = 0;
  if (monthlyBalances.length >= 2) {
    const last = monthlyBalances[monthlyBalances.length - 1].expenses;
    const prev = monthlyBalances[monthlyBalances.length - 2].expenses;
    trend = (((last - prev) / prev) * 100).toFixed(0);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 ">
      
      <div
        className={`
          rounded-xl p-5
          ${
            theme === "dark"
              ? "bg-[#0f172a] border border-gray-800 text-white"
              : "bg-white border border-gray-200 text-black shadow-sm"
          }
        `}
      >
        <h2 className="text-lg font-semibold mb-4">Insights</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          
         <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Lightbulb size={18} />
            </div>
            <div>
              <h3 className="font-medium">Highest Spending</h3>
              <p className="text-sm text-gray-400">
                {highestCategory.name} is your top spending category at $
                {highestCategory.value.toFixed(0)}
              </p>
            </div>
          </div>

          
          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Lightbulb size={18} />
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="font-medium">Savings Rate</h3>
              <p className="text-sm text-gray-400">
                You're saving {savingsRate}% of your income — great job!
              </p>
            </div>
          </div>

         
          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Lightbulb size={18} />
              <Zap size={18} />
            </div>
            <div>
              <h3 className="font-medium">Monthly Trend</h3>
              <p className="text-sm text-gray-400">
                Spending {trend > 0 ? "increased" : "decreased"} {Math.abs(trend)}% vs previous month
              </p>
            </div>
          </div>

          
          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Lightbulb size={18} />
              <Lightbulb size={18} />
            </div>
            <div>
              <h3 className="font-medium">Quick Tip</h3>
              <p className="text-sm text-gray-400">
                Consider setting a budget for {highestCategory.name} to control your largest expense
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Insights;