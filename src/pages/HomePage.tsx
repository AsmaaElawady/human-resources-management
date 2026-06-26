import { Link } from "react-router-dom"
import { useGetVacationStatsQuery, useGetMyVacationsQuery } from "@/services/vacationApi"
import { useGetEmployeesQuery, useGetEmployeeByIdQuery } from "@/services/employeeApi"
import { useAppSelector } from "@/store/hooks"

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

const HomePage = () => {
  const user = useAppSelector((state) => state.auth.user)
  const isEmployee = user?.role === "employee"
  const employeeId = user?.employeeId
  
  // Admin queries (skip if employee)
  const { data: employeeData } = useGetEmployeesQuery({ page: 1, limit: 1 }, { skip: isEmployee })
  const { data: vacationStatsData } = useGetVacationStatsQuery(undefined, { skip: isEmployee })

  // Employee queries (skip if not employee or no employeeId)
  const { data: myEmployeeData } = useGetEmployeeByIdQuery({ id: employeeId as string }, { skip: !isEmployee || !employeeId })
  const { data: myVacationsData } = useGetMyVacationsQuery(undefined, { skip: !isEmployee })

  // Admin stats
  const totalEmployees = employeeData?.meta?.total ?? "—"
  const pendingVacations = vacationStatsData?.stats.find((s) => s._id === "submitted")?.count ?? 0
  const approvedVacations = vacationStatsData?.stats.find((s) => s._id === "approved")?.count ?? 0

  const adminStats = [
    {
      label: "Total Employees",
      value: totalEmployees,
      bg: "bg-indigo-50 border-indigo-100",
      text: "text-indigo-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5.197-3.762M9 20H4v-2a4 4 0 015.197-3.762M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 13v-2a4 4 0 00-3-3.87" />
        </svg>
      )
    },
    {
      label: "Pending Vacations",
      value: pendingVacations,
      bg: "bg-amber-50 border-amber-100",
      text: "text-amber-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "Approved Vacations",
      value: approvedVacations,
      bg: "bg-emerald-50 border-emerald-100",
      text: "text-emerald-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-text-strong">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">
          {isEmployee 
            ? "Overview of your personal profile and vacation requests." 
            : "Overview of your team structure and vacation schedules."}
        </p>
      </div>

      {isEmployee ? (
        // Employee Dashboard
        <div className="flex flex-col gap-6">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Available Days */}
             <div className="bg-surface border border-border/80 rounded-md p-6 flex items-center gap-5 shadow-premium hover:shadow-premium-hover transition-all duration-300">
                <div className="w-12 h-12 rounded-md border flex items-center justify-center flex-shrink-0 bg-emerald-50 border-emerald-100 text-emerald-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-strong">{myEmployeeData?.availableVacationDays ?? "—"}</div>
                  <div className="text-xs font-semibold text-text-muted mt-0.5">Available Days</div>
                </div>
             </div>
             {/* Approved Days */}
             <div className="bg-surface border border-border/80 rounded-md p-6 flex items-center gap-5 shadow-premium hover:shadow-premium-hover transition-all duration-300">
                <div className="w-12 h-12 rounded-md border flex items-center justify-center flex-shrink-0 bg-indigo-50 border-indigo-100 text-indigo-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-strong">{myEmployeeData?.approvedVacationDays ?? "—"}</div>
                  <div className="text-xs font-semibold text-text-muted mt-0.5">Approved Days</div>
                </div>
             </div>
          </div>
        </div>
      ) : (
        // Admin Dashboard
        <div className="flex flex-col gap-6">
            {/* Stats Cards Grid (Admin Only) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {adminStats.map(({ label, value, bg, text, icon }) => (
                <div
                  key={label}
                  className="bg-surface border border-border/80 rounded-md p-6 flex items-center gap-5 shadow-premium hover:shadow-premium-hover transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-md border flex items-center justify-center flex-shrink-0 ${bg} ${text}`}>
                    {icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-strong">{value}</div>
                    <div className="text-xs font-semibold text-text-muted mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Welcome & Info Banner */}
            <div className="bg-surface border border-border/80 rounded-md p-6 md:p-8 shadow-premium flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-bold text-text-strong">Welcome to the Human Resources Portal</h2>
                <p className="text-sm text-text-body mt-2 leading-relaxed max-w-3xl">
                  This platform enables you to easily manage employee profiles, track vacation allocations, and process time-off requests in real-time. Use the sidebar menu to get started.
                </p>
              </div>

              {/* Top Vacation Usage Table (Admin Only) */}
              {vacationStatsData?.topEmployees && vacationStatsData.topEmployees.length > 0 && (
                <div className="border border-border/60 rounded-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-border/60 bg-slate-50/50">
                    <h3 className="text-sm font-bold text-text-strong tracking-wide">Top Employees (Vacation Usage)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50/30 border-b border-border/50 text-xs font-bold text-text-muted">
                          <th className="px-6 py-3.5">Employee Name</th>
                          <th className="px-6 py-3.5">Approved Days</th>
                          <th className="px-6 py-3.5">Available Days</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {vacationStatsData.topEmployees.map((emp) => (
                          <tr key={emp._id} className="hover:bg-slate-50/50 transition-colors duration-150">
                            <td className="px-6 py-4 font-semibold text-text-strong">{emp.name}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-light text-primary">
                                {emp.approvedVacationDays} days
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                                {emp.availableVacationDays} days
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
        </div>
      )}

      {/* Common Welcome Banner for Employees */}
      {isEmployee && (
        <div className="bg-surface border border-border/80 rounded-md p-6 md:p-8 shadow-premium flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-text-strong">Welcome to the Human Resources Portal</h2>
            <p className="text-sm text-text-body mt-2 leading-relaxed max-w-3xl">
              This platform enables you to easily view your profile, check your vacation balances, and submit time-off requests. Use the quick actions above or the sidebar menu to get started.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage