import { useApproveVacationMutation, useGetSubmittedVacationsQuery, useRejectVacationMutation } from "@/services/vacationApi"

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

const SubmittedVacationsPage = () => {
  const { data, isLoading } = useGetSubmittedVacationsQuery()
  const [approveVacation] = useApproveVacationMutation()
  const [rejectVacation] = useRejectVacationMutation()

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-text-strong tracking-tight">Submitted Vacations</h1>
        <p className="text-sm text-text-muted mt-1">Manage and respond to vacation requests from employees.</p>
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

      {/* Vacation Request Table */}
      {!isLoading && (
        <div className="bg-surface border border-border/80 rounded-md shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-border/50 text-xs font-bold text-text-muted">
                  <th className="px-6 py-3.5">Employee</th>
                  <th className="px-6 py-3.5">From Date</th>
                  <th className="px-6 py-3.5">To Date</th>
                  <th className="px-6 py-3.5">Reason</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(!data || data.length === 0) && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-muted font-medium bg-slate-50/10">
                      No submitted vacation requests available.
                    </td>
                  </tr>
                )}
                {data?.map((vacation) => (
                  <tr key={vacation._id} className="hover:bg-slate-50/40 transition-colors duration-150">
                    <td className="px-6 py-4 font-bold text-text-strong">
                      {vacation.employeeId?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-text-body">
                      {new Date(vacation.fromDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-text-body">
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
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => approveVacation({ id: vacation._id })}
                          disabled={vacation.status === "approved"}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs rounded-sm shadow-sm transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => rejectVacation({ id: vacation._id })}
                          disabled={vacation.status === "rejected"}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold text-xs rounded-sm shadow-sm transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </div>
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

export default SubmittedVacationsPage