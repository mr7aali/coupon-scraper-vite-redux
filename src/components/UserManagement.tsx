import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CreditCard, Filter, Globe, Search, Users } from "lucide-react";
import Pagination from "./Pagination";
import { useGetAdminUsersQuery } from "../features/users/usersApi";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [languageName, setLanguageName] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const pageSize = 10;
  const deferredSearchTerm = useDeferredValue(searchTerm.trim());

  useEffect(() => {
    setCurrentPage(1);
  }, [deferredSearchTerm, languageName, subscriptionPlan, subscriptionStatus]);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetAdminUsersQuery({
      page: currentPage,
      pageSize,
      search: deferredSearchTerm,
      languageName,
      subscriptionPlan,
      subscriptionStatus,
    });

  const users = data?.data.items ?? [];
  const pagination = data?.data;

  const summary = useMemo(() => {
    const totalUsers = pagination?.total ?? 0;
    const activeSubscribers = users.filter(
      (user) => user.subscriptionActive,
    ).length;
    const usersWithLocation = users.filter((user) =>
      Boolean(user.location),
    ).length;

    return {
      totalUsers,
      activeSubscribers,
      usersWithLocation,
    };
  }, [pagination?.total, users]);

  const errorMessage =
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data
      ? String(error.data.message)
      : "Failed to load users.";

  const handleResetFilters = () => {
    setSearchTerm("");
    setLanguageName("");
    setSubscriptionPlan("");
    setSubscriptionStatus("");
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">
            Users Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse all registered Coupon app users with admin-only search,
            filters, and pagination.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          icon={<Users className="h-5 w-5" />}
          title="Matched Users"
          value={String(summary.totalUsers)}
        />
        <SummaryCard
          icon={<CreditCard className="h-5 w-5" />}
          title="Active On Page"
          value={String(summary.activeSubscribers)}
        />
        <SummaryCard
          icon={<Globe className="h-5 w-5" />}
          title="Locations On Page"
          value={String(summary.usersWithLocation)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="border-b border-gray-50 px-5 py-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, user ID, or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-[#00A1BF] focus:outline-none focus:ring-2 focus:ring-[#00A1BF]/20 xl:w-[320px]"
              />
            </div>

            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap xl:flex-nowrap">
              <select
                value={languageName}
                onChange={(e) => setLanguageName(e.target.value)}
                className="h-10 min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#00A1BF] focus:ring-2 focus:ring-[#00A1BF]/20 sm:min-w-[150px] xl:flex-1"
              >
                <option value="">All Languages</option>
                <option value="ENGLISH">English</option>
                <option value="FRENCH">French</option>
                <option value="ARABIC">Arabic</option>
              </select>

              <select
                value={subscriptionPlan}
                onChange={(e) => setSubscriptionPlan(e.target.value)}
                className="h-10 min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#00A1BF] focus:ring-2 focus:ring-[#00A1BF]/20 sm:min-w-[130px] xl:flex-1"
              >
                <option value="">All Plans</option>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
              </select>

              <select
                value={subscriptionStatus}
                onChange={(e) => setSubscriptionStatus(e.target.value)}
                className="h-10 min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#00A1BF] focus:ring-2 focus:ring-[#00A1BF]/20 sm:min-w-[150px] xl:flex-1"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="trialing">Trialing</option>
                <option value="not_started">Not Started</option>
                <option value="past_due">Past Due</option>
                <option value="canceled">Canceled</option>
                <option value="unpaid">Unpaid</option>
              </select>

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

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
                  Location
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                  Join Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-14 text-center text-sm text-gray-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5 text-sm text-gray-400 font-medium">
                      {user.id}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-[#111827]">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                      {user.location || "N/A"}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {formatLabel(user.languageName)}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {formatLabel(user.subscriptionPlan)}
                    </td>
                    <td className="px-6 py-5">
                      <SubscriptionBadge
                        status={user.subscriptionStatus}
                        isActive={user.subscriptionActive}
                      />
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {!isLoading && users.length === 0 && !isError && (
            <div className="py-12 text-center text-gray-500 text-sm">
              No users found for the current search and filters.
            </div>
          )}
          {isError ? (
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <p className="text-sm text-red-600">{errorMessage}</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Try again
              </button>
            </div>
          ) : null}
          <Pagination
            currentPage={pagination?.page ?? currentPage}
            totalPages={pagination?.totalPages ?? 1}
            totalItems={pagination?.total ?? 0}
            pageSize={pagination?.pageSize ?? pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
        {isFetching && !isLoading ? (
          <div className="border-t border-gray-50 px-6 py-3 text-xs text-gray-400">
            Updating results...
          </div>
        ) : null}
      </div>
    </div>
  );
};

const SummaryCard = ({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) => (
  <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-2xl font-bold text-[#111827]">{value}</p>
      </div>
      <div className="rounded-lg bg-[#E0F7FA] p-3 text-[#00A1BF]">{icon}</div>
    </div>
  </div>
);

const SubscriptionBadge = ({
  status,
  isActive,
}: {
  status: string | null;
  isActive: boolean;
}) => {
  const displayStatus = status ? formatLabel(status) : "No Subscription";
  const styles = isActive
    ? "bg-[#DCFCE7] text-[#15803D]"
    : status
      ? "bg-[#FEF3C7] text-[#92400E]"
      : "bg-[#F3F4F6] text-[#6B7280]";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${styles}`}
    >
      {displayStatus}
    </span>
  );
};

const formatLabel = (value: string | null) => {
  if (!value) {
    return "N/A";
  }

  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export default UserManagement;
