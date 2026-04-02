import { useApp } from "../context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#10b981", "#3b82f6", "#f59e0b",
  "#a855f7", "#ec4899", "#2563eb",
  "#14b8a6", "#0ea5e9"
];

const PieChartComponent = () => {
  const { categoryData, theme } = useApp();

  return (
    <div
      className={`
        rounded-xl p-5 h-full
        ${
          theme === "dark"
            ? "bg-[#0f172a] border border-gray-800 text-white"
            : "bg-white border border-gray-200 text-black shadow-sm"
        }
      `}
    >
      <h2 className="text-sm font-semibold mb-4">
        Spending Breakdown
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">

        {/* PIE */}
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={categoryData}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

       
        <div className="text-sm space-y-2 w-full">
          {categoryData.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span>{item.name}</span>
              </div>

              <span className="font-medium">
                ${item.value.toFixed(0)}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PieChartComponent;