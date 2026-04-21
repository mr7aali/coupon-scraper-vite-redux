import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Send,
  Plus,
  DollarSign,
  Users,
  Wallet,
  CreditCard,
} from "lucide-react";
import StatCard from "./StatCard";

const lineData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
  { name: "Jul", revenue: 7200 },
];

const barData = [
  { day: "Mon", users: 40 },
  { day: "Tue", users: 50 },
  { day: "Wed", users: 65 },
  { day: "Thu", users: 45 },
  { day: "Fri", users: 75 },
  { day: "Sat", users: 90 },
  { day: "Sun", users: 80 },
];

export default function DashboardOverview() {
  return (
    <div className=" bg-[#F9FAFB] min-h-screen font-sans">
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Send size={16} /> Notify
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00A1BF] text-white rounded-lg text-sm font-medium hover:bg-[#008ba5]">
            <Plus size={16} /> Add Deal
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="24,521"
          trend="12.5%"
          icon={Users}
        />
        <StatCard
          title="Active Subscribers"
          value="8,432"
          trend="8.2%"
          icon={CreditCard}
        />
        <StatCard
          title="Total Revenue"
          value="$142,380"
          trend="15.3%"
          icon={DollarSign}
        />
        <StatCard
          title="Cashback Paid"
          value="$38,290"
          trend="2.4%"
          icon={Wallet}
          isNegative
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Growth - Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <h3 className="font-bold text-[#111827] mb-6">Revenue Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00A1BF"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#fff",
                    stroke: "#00A1BF",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Users - Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <h3 className="font-bold text-[#111827] mb-6">
            New Users (This Week)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="users"
                  fill="#4FD1ED"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-50">
          <h3 className="font-bold text-[#111827]">Recent Activity</h3>
          <button className="text-[#00A1BF] text-sm font-medium hover:underline">
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          <ActivityItem
            dotColor="bg-green-500"
            text="Sarah Jenkins subscribed to Pro Plan"
            time="2 mins ago"
          />
          <ActivityItem
            dotColor="bg-blue-500"
            text="New store 'Nike' added to platform"
            time="1 hour ago"
          />
          <ActivityItem
            dotColor="bg-yellow-500"
            text="Flash sale deal created for Amazon"
            time="3 hours ago"
          />
          <ActivityItem
            dotColor="bg-green-500"
            text="$45.50 cashback paid to user #8492"
            time="5 hours ago"
          />
        </div>
      </div>
    </div>
  );
}

const ActivityItem = ({ dotColor, text, time }: any) => (
  <div className="flex items-center justify-between p-6">
    <div className="flex items-center gap-4">
      <div className={`h-2 w-2 rounded-full ${dotColor}`} />
      <span className="text-sm text-gray-700">{text}</span>
    </div>
    <span className="text-xs text-gray-400">{time}</span>
  </div>
);
