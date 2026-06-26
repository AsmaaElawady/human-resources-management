import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useDebounce from "@/hooks/useDebounce"
import { useSearchEmployeesQuery } from "@/services/employeeApi"

const EmployeeSearchPage = () => {
  const [name, setName] = useState("")
  const debouncedSearch = useDebounce(name, 300)
  const { data, isLoading } = useSearchEmployeesQuery(
    { name: debouncedSearch },
    { skip: debouncedSearch.length < 2 }
  )
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-text-strong">Search Employees</h1>
        <p className="text-sm text-text-muted mt-1">Look up employee records and submit vacation requests.</p>
      </div>

      {/* Search Input Box */}
      <div className="relative max-w-md w-full">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
        </span>
        <input
          type="search"
          placeholder="Search by name (min 2 characters)..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-surface border border-border/80 rounded-md text-sm text-text-strong placeholder-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
        />
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex items-center justify-center p-12">
          <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}

      {/* Search Results */}
      {!isLoading && debouncedSearch.length >= 2 && (
        <div className="bg-surface border border-border/80 rounded-md shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-border/50 text-xs font-bold text-text-muted">
                  <th className="px-6 py-3.5">Name</th>
                  <th className="px-6 py-3.5">Email / Phone</th>
                  <th className="px-6 py-3.5">Gender / Status</th>
                  <th className="px-6 py-3.5 text-center">Avail. Days</th>
                  <th className="px-6 py-3.5">Salary</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(!data || data.length === 0) && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-muted font-medium bg-slate-50/10">
                      No employees found matching "{debouncedSearch}".
                    </td>
                  </tr>
                )}
                {data?.map((employee) => (
                  <tr key={employee._id} className="hover:bg-slate-50/40 transition-colors duration-150">
                    <td className="px-6 py-4 font-bold text-text-strong">{employee.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-text-strong">{employee.email}</span>
                        <span className="text-xs text-text-muted">{employee.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize font-medium text-text-body">
                      {employee.gender} · {employee.maritalStatus}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                        {employee.availableVacationDays} days
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-text-strong">
                      ${employee.salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/vacations?employeeId=${employee._id}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-sm shadow-sm transition-all duration-200 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Submit Vacation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Initial/Empty search prompt */}
      {debouncedSearch.length < 2 && !isLoading && (
        <div className="bg-surface/50 border border-dashed border-border rounded-md p-10 text-center text-sm font-semibold text-text-muted">
          Type at least 2 characters in the search box to begin searching.
        </div>
      )}
    </div>
  )
}

export default EmployeeSearchPage