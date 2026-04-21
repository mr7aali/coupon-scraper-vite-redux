import {
  Users,
  CreditCard,
  DollarSign,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  trend,
  icon: Icon,
  color,
  isNegative,
}: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-start shadow-sm">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-[#111827] mb-2">{value}</h3>
      <div
        className={`flex items-center gap-1 text-xs font-semibold ${isNegative ? "text-red-500" : "text-green-500"}`}
      >
        {isNegative ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
        {trend}{" "}
        <span className="text-gray-400 font-normal ml-1">vs last month</span>
      </div>
    </div>
    <div className={`p-3 rounded-lg bg-[#E0F7FA] text-[#00A1BF]`}>
      <Icon size={24} />
    </div>
  </div>
);

export default StatCard;
