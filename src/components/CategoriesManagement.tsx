import React from "react";
import { Plus, GripVertical, Pencil, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  count: number;
  icon: string; // Emoji or image URL
}

const CATEGORIES_DATA: Category[] = [
  { id: "1", name: "Fashion", count: 145, icon: "👕" },
  { id: "2", name: "Electronics", count: 89, icon: "💻" },
  { id: "3", name: "Beauty", count: 64, icon: "💄" },
  { id: "4", name: "Travel", count: 32, icon: "✈️" },
  { id: "5", name: "Home", count: 112, icon: "🏠" },
  { id: "6", name: "Food", count: 56, icon: "🍔" },
  { id: "7", name: "Sports", count: 45, icon: "⚽" },
  { id: "8", name: "Kids", count: 28, icon: "🧸" },
];

const CategoriesManagement = () => {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize stores and deals into intuitive categories for users.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00A1BF] text-white rounded-lg text-sm font-semibold hover:bg-[#008ba5] transition-all shadow-sm">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {CATEGORIES_DATA.map((category) => (
          <div
            key={category.id}
            className="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#00A1BF]/30 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {/* Drag Handle */}
              <GripVertical
                className="text-gray-300 group-hover:text-gray-400 transition-colors"
                size={20}
              />

              {/* Category Icon Placeholder */}
              <div className="w-12 h-12 rounded-lg bg-[#E0F7FA] flex items-center justify-center text-2xl shadow-inner">
                {category.icon}
              </div>

              {/* Text Info */}
              <div>
                <h3 className="font-bold text-[#111827] text-sm md:text-base leading-tight">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {category.count} stores
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-gray-400 hover:text-[#00A1BF] hover:bg-blue-50 rounded-lg transition-all">
                <Pencil size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesManagement;
