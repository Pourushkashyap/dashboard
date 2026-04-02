import { useApp } from "../context/AppContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceChart = () => {
  const { monthlyBalances, theme } = useApp();

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
        Balance Trend
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={monthlyBalances}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          
          <Area
            type="monotone"
            dataKey="income"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.15}
          />


          <Area
            type="monotone"
            dataKey="balance"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;