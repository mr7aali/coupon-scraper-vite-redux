import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Pagination from "./Pagination"; // Using the reusable Pagination component from before

// Types for our dynamic data
interface Deal {
  id: string;
  store: string;
  discount: string;
  cashback: string;
  expiryDate: string;
  status: "Active" | "Expired" | "Pending";
  views: string;
}

const DEALS_DATA: Deal[] = [
  {
    id: "DL-8821",
    store: "Nike",
    discount: "20% OFF",
    cashback: "5%",
    expiryDate: "2024-05-01",
    status: "Active",
    views: "1,240",
  },
  {
    id: "DL-8822",
    store: "Amazon",
    discount: "$50 OFF",
    cashback: "2%",
    expiryDate: "2024-04-15",
    status: "Active",
    views: "8,930",
  },
  {
    id: "DL-8823",
    store: "Sephora",
    discount: "Free Shipping",
    cashback: "8%",
    expiryDate: "2024-03-30",
    status: "Expired",
    views: "450",
  },
  {
    id: "DL-8824",
    store: "Noon",
    discount: "Buy 1 Get 1",
    cashback: "10%",
    expiryDate: "2024-06-10",
    status: "Active",
    views: "3,200",
  },
  {
    id: "DL-8825",
    store: "Zara",
    discount: "30% OFF",
    cashback: "4%",
    expiryDate: "2024-04-20",
    status: "Pending",
    views: "0",
  },
];

const DealsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">
            Deals & Promo Codes
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage active deals, create new promo codes, and track conversions.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00A1BF] text-white rounded-lg text-sm font-semibold hover:bg-[#008ba5] transition-all shadow-sm">
          <Plus size={18} />
          Create Deal
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search Header */}
        <div className="p-5 border-b border-gray-50">
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Search by store name..."
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
                  Deal ID
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Cashback
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DEALS_DATA.map((deal) => (
                <tr
                  key={deal.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-5 text-sm text-gray-400 font-medium">
                    {deal.id}
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[#111827]">
                    {deal.store}
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[#00A1BF]">
                    {deal.discount}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {deal.cashback}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                    {deal.expiryDate}
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={deal.status} />
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {deal.views}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <button className="hover:text-gray-600 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Section */}
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

/* Sub-component for Status Badges with logic matching your reference image */
const StatusBadge = ({ status }: { status: Deal["status"] }) => {
  const styles = {
    Active: "bg-[#DCFCE7] text-[#15803D]",
    Expired: "bg-[#FEE2E2] text-[#B91C1C]",
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

export default DealsManagement;
