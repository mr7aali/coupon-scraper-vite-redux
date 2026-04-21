import { NavLink } from "react-router";
import {
  LayoutGrid,
  Users,
  CreditCard,
  Store,
  Tag,
  Grid2X2,
  Gift,
  Bell,
  DollarSign,
  AlertTriangle,
  FileText,
  Settings,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility for clean class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Define the Menu Configuration for easy maintenance
const MENU_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, to: "/" },
  { label: "Users", icon: Users, to: "/users" },
  { label: "Subscriptions", icon: CreditCard, to: "/subscriptions" },
  { label: "Partners", icon: Store, to: "/partners" },
  { label: "Deals & Promo Codes", icon: Tag, to: "/deals" },
  { label: "Categories", icon: Grid2X2, to: "/categories" },
  { label: "Referrals", icon: Gift, to: "/referrals" },
  { label: "Notifications", icon: Bell, to: "/notifications" },
  { label: "Payments", icon: DollarSign, to: "/payments" },
  { label: "Reports", icon: AlertTriangle, to: "/reports" },
  { label: "Content Management", icon: FileText, to: "/content" },
  { label: "Settings", icon: Settings, to: "/settings" },
  { label: "Admin Roles", icon: ShieldCheck, to: "/admin-roles" },
];

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-[280px] flex-col border-r border-[#F3F4F6] bg-white px-4 py-6">
      {/* Brand Logo */}
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="text-[#00A1BF]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.93694 15.4998C9.84766 15.1537 9.66728 14.8379 9.41456 14.5851C9.16184 14.3324 8.84601 14.152 8.49994 14.0628L2.36494 12.4808C2.26027 12.4511 2.16815 12.388 2.10255 12.3012C2.03696 12.2144 2.00146 12.1086 2.00146 11.9998C2.00146 11.891 2.03696 11.7851 2.10255 11.6983C2.16815 11.6115 2.26027 11.5485 2.36494 11.5188L8.49994 9.93576C8.84589 9.84657 9.16163 9.66633 9.41434 9.4138C9.66705 9.16127 9.84751 8.84565 9.93694 8.49976L11.5189 2.36476C11.5483 2.25968 11.6113 2.1671 11.6983 2.10116C11.7852 2.03521 11.8913 1.99951 12.0004 1.99951C12.1096 1.99951 12.2157 2.03521 12.3026 2.10116C12.3896 2.1671 12.4525 2.25968 12.4819 2.36476L14.0629 8.49976C14.1522 8.84583 14.3326 9.16166 14.5853 9.41438C14.838 9.6671 15.1539 9.84748 15.4999 9.93676L21.6349 11.5178C21.7404 11.5469 21.8335 11.6098 21.8998 11.6968C21.9661 11.7839 22.002 11.8903 22.002 11.9998C22.002 12.1092 21.9661 12.2156 21.8998 12.3027C21.8335 12.3898 21.7404 12.4527 21.6349 12.4818L15.4999 14.0628C15.1539 14.152 14.838 14.3324 14.5853 14.5851C14.3326 14.8379 14.1522 15.1537 14.0629 15.4998L12.4809 21.6348C12.4515 21.7398 12.3886 21.8324 12.3016 21.8984C12.2147 21.9643 12.1086 22 11.9994 22C11.8903 22 11.7842 21.9643 11.6973 21.8984C11.6103 21.8324 11.5473 21.7398 11.5179 21.6348L9.93694 15.4998Z"
              stroke="#00A1BF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 3V7"
              stroke="#00A1BF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 5H18"
              stroke="#00A1BF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 17V19"
              stroke="#00A1BF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 18H3"
              stroke="#00A1BF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span className="text-xl font-bold text-[#00A1BF]">CashAdmin</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-[#00A1BF] text-white shadow-sm"
                  : "text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#00A1BF]",
              )
            }
          >
            <item.icon className={cn("h-5 w-5")} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="mt-auto border-t border-[#F3F4F6] pt-6">
        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-4">
          Profile
        </p>

        <div className="flex items-center gap-3 px-2 mb-6">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-[#1F2937] truncate">
              Jenny Wilson
            </span>
            <span className="text-xs text-[#6B7280] truncate">
              jen.wilson@example.co...
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E0F7FA] py-2.5 text-sm font-bold text-[#111827] hover:bg-[#B2EBF2] transition-colors">
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
