import { useGetMyVacationsQuery } from "@/services/vacationApi"

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200"
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200"
    default:
      return "bg-amber-50 text-amber-700 border-amber-200"
  }
}

const MyVacationsPage = () => {
  const { data, isLoading } = useGetMyVacationsQuery()

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-text-strong tracking-tight">My Vacations</h1>
        <p className="text-sm text-text-muted mt-1">Review the status of your submitted vacation requests.</p>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center p-12">
          <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}

      {/* Vacations List */}
      {!isLoading && (
        <div className="bg-surface border border-border/80 rounded-md shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-border/50 text-xs font-bold text-text-muted">
                  <th className="px-6 py-3.5">From Date</th>
                  <th className="px-6 py-3.5">To Date</th>
                  <th className="px-6 py-3.5">Reason</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(!data || data.length === 0) && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-text-muted font-medium bg-slate-50/10">
                      You have not submitted any vacation requests yet.
                    </td>
                  </tr>
                )}
                {data?.map((vacation) => (
                  <tr key={vacation._id} className="hover:bg-slate-50/40 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-text-strong">
                      {new Date(vacation.fromDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-text-strong">
                      {new Date(vacation.toDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-text-body max-w-xs truncate">
                      {vacation.reason}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${getStatusBadge(vacation.status)}`}>
                        {vacation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyVacationsPage
