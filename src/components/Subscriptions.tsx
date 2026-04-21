import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Users,
  TrendingDown,
  Search,
} from "lucide-react";
import Pagination from "./Pagination"; // Using the reusable pagination we made

// Reusable Subscriptions Stat Card
const SubStatCard = ({ title, value, trend, icon: Icon, isNegative }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-start shadow-sm flex-1">
    <div>
      <p className="text-gray-500 text-[13px] font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-[#111827] mb-2">{value}</h3>
      <div
        className={`flex items-center gap-1 text-xs font-semibold ${isNegative ? "text-red-500" : "text-green-500"}`}
      >
        {isNegative ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
        {trend}{" "}
        <span className="text-gray-400 font-normal ml-1">vs last month</span>
      </div>
    </div>
    <div className="p-3 rounded-lg bg-[#E0F7FA] text-[#00A1BF]">
      <Icon size={24} />
    </div>
  </div>
);

const SUBS_DATA = [
  {
    user: "Emma Thompson",
    plan: "Pro Annual",
    price: "$99.00/yr",
    start: "2023-10-12",
    renewal: "2024-10-12",
    status: "Active",
  },
  {
    user: "Michael Chen",
    plan: "Pro Monthly",
    price: "$9.99/mo",
    start: "2024-02-05",
    renewal: "2024-03-05",
    status: "Active",
  },
  {
    user: "Sophie Martin",
    plan: "Pro Monthly",
    price: "$9.99/mo",
    start: "2023-11-18",
    renewal: "2024-01-18",
    status: "Canceled",
  },
  {
    user: "Omar Al-Fayed",
    plan: "Pro Annual",
    price: "$99.00/yr",
    start: "2023-09-01",
    renewal: "2024-09-01",
    status: "Active",
  },
];

const Subscriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827]">Subscriptions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor premium users, recurring revenue, and churn.
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <SubStatCard
          title="Monthly Recurring Revenue"
          value="$28,450"
          trend="5.2 %"
          icon={DollarSign}
        />
        <SubStatCard
          title="Conversion Rate"
          value="34.2%"
          trend="1.1 %"
          icon={TrendingUp}
        />
        <SubStatCard
          title="Churn Rate"
          value="2.8%"
          trend="0.4 %"
          icon={Users}
          isNegative
        />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search Header */}
        <div className="p-5 border-b border-gray-50">
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Search subscribers..."
              className="w-full h-11 pl-4 pr-10 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#00A1BF] placeholder:text-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100">
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase">
                  User
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase">
                  Plan
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase">
                  Price
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase">
                  Start Date
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase">
                  Renewal Date
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SUBS_DATA.map((sub, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-sm font-semibold text-[#1F2937]">
                    {sub.user}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[#00A1BF]">
                    {sub.plan}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {sub.price}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {sub.start}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {sub.renewal}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                        sub.status === "Active"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#F3F4F6] text-[#6B7280]"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-sm font-medium text-gray-500 hover:text-[#00A1BF] transition-colors">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reusing our Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Subscriptions;
