import { Search, Bell } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAppSelector } from '../hooks';

/** Utility for clean class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  title?: string;
  className?: string;
  onSearch?: (query: string) => void;
  hasNotification?: boolean;
}

const Header = ({ 
  title = "Categories", 
  className, 
  onSearch, 
  hasNotification = true 
}: HeaderProps) => {
  const admin = useAppSelector((state) => state.auth.admin);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 flex h-[64px] w-full items-center justify-between border-b border-[#F3F4F6] bg-[#FFF] px-6 py-[12.5px]",
        className
      )}
    >
      {/* Left Side: Title */}
      <h1 className="text-[18px] font-semibold text-[#1F2937] shrink-0">
        {title}
      </h1>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative group">
          <input
            type="text"
            placeholder="Search anywhere..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="h-[36px] w-[280px] rounded-full border border-[#E5E7EB] bg-[#F9FAFB] pl-4 pr-10 text-sm outline-none transition-all focus:border-[#00A1BF] focus:ring-1 focus:ring-[#00A1BF]/20 placeholder:text-[#9CA3AF]"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#00A1BF]" />
        </div>

        {/* Notification Icon */}
        <button className="relative p-1 transition-colors hover:bg-gray-50 rounded-full">
          <Bell className="h-6 w-6 text-[#4B5563]" />
          {hasNotification && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-[#EF4444]" />
          )}
        </button>

        {admin ? (
          <div className="hidden min-w-[160px] rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2 text-right md:block">
            <p className="text-sm font-semibold text-[#0F172A]">{admin.fullName}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#0891B2]">{admin.role}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
