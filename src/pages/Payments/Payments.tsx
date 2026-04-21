import { ExternalLink, Search } from 'lucide-react';
import { useDeferredValue, useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { useGetAdminPaymentsQuery } from '../../features/payments/paymentsApi';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const deferredSearchTerm = useDeferredValue(searchTerm.trim());

  useEffect(() => {
    setCurrentPage(1);
  }, [deferredSearchTerm, statusFilter]);

  const { data, isLoading, isFetching, isError, error, refetch } = useGetAdminPaymentsQuery({
    page: currentPage,
    pageSize,
    search: deferredSearchTerm,
    status: statusFilter,
  });

  const payments = data?.data.items ?? [];
  const pagination = data?.data;

  const errorMessage =
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data
      ? String(error.data.message)
      : 'Failed to load payments.';

  return (
    <div className="bg-[#FAFAFA] min-h-full">
      <div className="mb-8">
        <h1 className="mb-2 font-sans text-[20.4px] font-bold text-[#111827]">Payments & Invoices</h1>
        <p className="text-[15px] text-[#6B7280]">Track subscription payments and Stripe-linked billing activity.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#F3F4F6] bg-white shadow-sm">
        <div className="border-b border-[#F3F4F6] p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by payment ID, user, email, or customer ID"
                className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white pl-10 pr-4 text-sm text-[#111827] outline-none transition-colors placeholder-[#9CA3AF] focus:border-[#00A1BF] focus:ring-2 focus:ring-[#00A1BF]/15"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#4B5563] outline-none transition-colors focus:border-[#00A1BF] focus:ring-2 focus:ring-[#00A1BF]/15"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="trialing">Trialing</option>
              <option value="past_due">Past Due</option>
              <option value="incomplete">Incomplete</option>
              <option value="canceled">Canceled</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F3F4F6] bg-[#F9FAFB] text-left">
                <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Payment ID</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">User</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Amount</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Payment Method</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Date</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Status</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Stripe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center text-sm text-[#6B7280]">
                    Loading payments...
                  </td>
                </tr>
              ) : payments.map((payment) => (
                <tr key={payment.id} className="transition-colors hover:bg-[#F9FAFB]">
                  <td className="px-6 py-5 font-mono text-[13px] text-[#6B7280]">{payment.id}</td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#111827]">{payment.user}</td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#111827]">{payment.amount}</td>
                  <td className="px-6 py-5 text-[14px] text-[#6B7280]">{payment.paymentMethod}</td>
                  <td className="px-6 py-5 text-[14px] text-[#6B7280]">
                    {payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${
                      payment.status === 'Success'
                        ? 'bg-[#F0FDF4] text-[#15803D]'
                        : payment.status === 'Failed'
                          ? 'bg-[#FEF2F2] text-[#B91C1C]'
                          : payment.status === 'Canceled'
                            ? 'bg-[#F3F4F6] text-[#4B5563]'
                            : 'bg-[#FEF3C7] text-[#92400E]'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {payment.stripeUrl ? (
                      <a
                        href={payment.stripeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[13px] font-medium text-[#00A1BF] transition-colors hover:text-[#008ba5]"
                      >
                        View
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-[13px] text-[#9CA3AF]">Unavailable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isLoading && payments.length === 0 && !isError ? (
            <div className="px-6 py-12 text-center text-sm text-[#6B7280]">
              No payments found for the current search.
            </div>
          ) : null}

          {isError ? (
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <p className="text-sm text-[#B91C1C]">{errorMessage}</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#4B5563] transition-colors hover:bg-[#F9FAFB]"
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
          <div className="border-t border-[#F3F4F6] px-6 py-3 text-xs text-[#9CA3AF]">
            Updating results...
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Payments;
