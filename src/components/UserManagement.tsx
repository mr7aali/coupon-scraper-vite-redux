import React, { useState } from "react";
import { Download, MoreVertical, Search } from "lucide-react";
import Pagination from "./Pagination";

// Types for our dynamic data
interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  status: "Active" | "Suspended" | "Pending";
  cashback: string;
  joinDate: string;
}

const USERS_DATA: User[] = [
  {
    id: "USR-1829",
    name: "Emma Thompson",
    email: "emma.t@example.com",
    country: "UK",
    status: "Active",
    cashback: "$145.50",
    joinDate: "2023-10-12",
  },
  {
    id: "USR-1830",
    name: "Michael Chen",
    email: "m.chen@example.com",
    country: "US",
    status: "Active",
    cashback: "$32.00",
    joinDate: "2023-11-05",
  },
  {
    id: "USR-1831",
    name: "Sophie Martin",
    email: "smartin@example.fr",
    country: "France",
    status: "Suspended",
    cashback: "$0.00",
    joinDate: "2023-11-18",
  },
  {
    id: "USR-1832",
    name: "Omar Al-Fayed",
    email: "omar.f@example.ae",
    country: "UAE",
    status: "Active",
    cashback: "$450.25",
    joinDate: "2023-09-01",
  },
  {
    id: "USR-1833",
    name: "Sarah Jenkins",
    email: "s.jenkins@example.com",
    country: "US",
    status: "Active",
    cashback: "$89.10",
    joinDate: "2023-12-02",
  },
  {
    id: "USR-1834",
    name: "Ahmed Hassan",
    email: "ahmed.h@example.eg",
    country: "Egypt",
    status: "Pending",
    cashback: "$12.00",
    joinDate: "2024-01-15",
  },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can make this dynamic too
  const filteredUsers = USERS_DATA.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">
            Users Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all registered users, their statuses, and cashback balances.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search Bar Area */}
        <div className="p-5 border-b border-gray-50">
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Search users by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-4 pr-10 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1BF]/20 focus:border-[#00A1BF] placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100">
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Total Cashback
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-5 text-sm text-gray-400 font-medium">
                    {user.id}
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[#111827]">
                    {user.name}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                    {user.country}
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[#10B981]">
                    {user.cashback}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-gray-500 text-sm">
              No users found matching your search.
            </div>
          )}
          {/* INTEGRATED PAGINATION COMPONENT */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

/* Sub-component for Status Badges with logic matching your UI colors */
const StatusBadge = ({ status }: { status: User["status"] }) => {
  const styles = {
    Active: "bg-[#DCFCE7] text-[#15803D]",
    Suspended: "bg-[#FEE2E2] text-[#B91C1C]",
    Pending: "bg-[#FEF9C3] text-[#854D0E]",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[12px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default UserManagement;
