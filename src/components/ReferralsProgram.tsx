import React, { useState } from "react";
import { Users, UserPlus, Gift } from "lucide-react";
import Pagination from "./Pagination"; //

const ReferralsProgram = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data representing the visual state in your screenshot
  const REFERRAL_DATA = [
    {
      id: "1",
      referrer: "Emma Thompson",
      referredUser: "John Doe",
      rewardAmount: "$10.00",
      date: "2024-03-01",
      status: "Paid",
    },
    {
      id: "2",
      referrer: "Michael Chen",
      referredUser: "Alice Smith",
      rewardAmount: "$10.00",
      date: "2024-03-02",
      status: "Pending",
    },
    {
      id: "3",
      referrer: "Omar Al-Fayed",
      referredUser: "Zayed Khan",
      rewardAmount: "$10.00",
      date: "2024-02-28",
      status: "Paid",
    },
    // Add more mock items here to test pagination logic
  ];

  // Logic to handle dynamic content filtering and paging
  const filteredData = REFERRAL_DATA.filter((item) =>
    item.referrer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827]">Referrals Program</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track user invites and manage referral rewards.
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <ReferralStatCard title="Total Referrals" value="12,450" icon={Users} />
        <ReferralStatCard
          title="Successful Signups"
          value="8,230"
          icon={UserPlus}
        />
        <ReferralStatCard
          title="Total Reward Paid"
          value="$82,300"
          icon={Gift}
        />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search Header */}
        <div className="p-5 border-b border-gray-50">
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Search referrers..."
              className="w-full h-11 pl-4 pr-10 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#00A1BF] placeholder:text-gray-400"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100">
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Referrer
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Referred User
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Reward Amount
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentItems.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-5 text-sm font-semibold text-[#1F2937]">
                    {txn.referrer}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {txn.referredUser}
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[#10B981]">
                    {txn.rewardAmount}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {txn.date}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                        txn.status === "Paid"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#FEF9C3] text-[#854D0E]"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Integration */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

// Reusable Stat Card sub-component
const ReferralStatCard = ({ title, value, icon: Icon }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-start shadow-sm flex-1">
    <div>
      <p className="text-gray-500 text-[13px] font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-[#111827] mb-2">{value}</h3>
    </div>
    <div className="p-3 rounded-lg bg-[#E0F7FA] text-[#00A1BF]">
      <Icon size={24} />
    </div>
  </div>
);

export default ReferralsProgram;
