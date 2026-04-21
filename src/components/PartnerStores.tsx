import React, { useState } from "react";
import { Plus, Search, ExternalLink } from "lucide-react";
import Pagination from "./Pagination"; // Reusing your pagination component

interface PartnerStore {
  id: string;
  name: string;
  category: string;
  commission: string;
  activeDeals: number;
  status: "Active" | "Suspended";
}

const PARTNERS_DATA: PartnerStore[] = [
  {
    id: "1",
    name: "Nike",
    category: "Sports",
    commission: "8%",
    activeDeals: 12,
    status: "Active",
  },
  {
    id: "2",
    name: "Amazon",
    category: "General",
    commission: "3%",
    activeDeals: 45,
    status: "Active",
  },
  {
    id: "3",
    name: "Sephora",
    category: "Beauty",
    commission: "10%",
    activeDeals: 8,
    status: "Active",
  },
  {
    id: "4",
    name: "ASOS",
    category: "Fashion",
    commission: "6%",
    activeDeals: 15,
    status: "Active",
  },
  {
    id: "5",
    name: "Shein",
    category: "Fashion",
    commission: "12%",
    activeDeals: 22,
    status: "Suspended",
  },
];

const PartnerStores = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Partner Stores</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage affiliated brands, commission rates, and store profiles.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00A1BF] text-white rounded-lg text-sm font-semibold hover:bg-[#008ba5] transition-all">
          <Plus size={18} />
          Add Store
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search Input Area */}
        <div className="p-5 border-b border-gray-50">
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Search stores..."
              className="w-full h-11 pl-4 pr-10 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#00A1BF] placeholder:text-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100">
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Commission Rate
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Active Deals
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PARTNERS_DATA.map((partner) => (
                <tr
                  key={partner.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {/* Brand Initial Box */}
                      <div className="w-10 h-8 bg-[#F3F4F6] flex items-center justify-center rounded text-[11px] font-bold text-gray-500 uppercase">
                        {partner.name.substring(0, 2)}
                      </div>
                      <span className="text-sm font-bold text-[#111827]">
                        {partner.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {partner.category}
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[#00A1BF]">
                    {partner.commission}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {partner.activeDeals}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                        partner.status === "Active"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#FEE2E2] text-[#B91C1C]"
                      }`}
                    >
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A1BF] hover:text-[#008ba5] transition-colors">
                      View Profile
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Section */}
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={(page) => console.log(page)}
        />
      </div>
    </div>
  );
};

export default PartnerStores;
