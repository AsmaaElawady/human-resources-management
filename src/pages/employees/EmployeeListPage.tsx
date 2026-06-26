import { useNavigate } from "react-router-dom"
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from "@/services/employeeApi"

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

const getAvatarColors = (name: string) => {
  const gradients = [
    "from-indigo-500 to-purple-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-red-500 to-rose-500",
    "from-violet-500 to-fuchsia-500",
    "from-pink-500 to-rose-400",
  ]
  const index = name.charCodeAt(0) % gradients.length
  return gradients[index]
}

const EmployeeListPage = () => {
  const { data, isLoading, isError } = useGetEmployeesQuery({ page: 1, limit: 20 })
  const [deleteEmployee] = useDeleteEmployeeMutation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-strong">Employees</h1>
          <p className="text-sm text-text-muted mt-1">
            {data?.data?.length ?? 0} active team member{data?.data?.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-sm shadow-md shadow-primary/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
          onClick={() => navigate("/employees/add")}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </button>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface border border-border/80 rounded-md h-[270px] animate-pulse flex flex-col">
              <div className="h-1.5 w-full bg-slate-200" />
              <div className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
              <div className="p-6 pt-0 flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-full" />
                <div className="h-3 bg-slate-200 rounded w-5/6" />
                <div className="h-3 bg-slate-200 rounded w-4/5" />
              </div>
              <div className="h-12 bg-slate-50 border-t border-slate-100 mt-auto" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center text-danger flex flex-col items-center gap-3">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="font-semibold">Something went wrong while loading employee list.</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && data?.data?.length === 0 && (
        <div className="bg-surface border border-border/80 rounded-md p-12 text-center flex flex-col items-center gap-4 shadow-premium">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-5-3.87M9 20H4v-1a4 4 0 015-3.87M15 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-strong">No Employees Registered</h3>
            <p className="text-sm text-text-muted mt-1 max-w-sm mx-auto">Get started by registering your first employee to the workspace directory.</p>
          </div>
          <button
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-sm shadow-md shadow-primary/10 transition-all cursor-pointer"
            onClick={() => navigate("/employees/add")}
          >
            Add Employee
          </button>
        </div>
      )}

      {/* Employee Cards Grid */}
      {!isLoading && !isError && data?.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((employee) => {
            const gradient = getAvatarColors(employee.name)
            return (
              <div
                key={employee._id}
                className="bg-surface border border-border/80 rounded-md overflow-hidden shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                {/* Accent Top Bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

                {/* Profile Header */}
                <div className="p-5 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} text-white font-bold text-lg flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden`}>
                    {employee.profilePhoto ? (
                      <img src={employee.profilePhoto} alt={employee.name} className="w-full h-full object-cover" />
                    ) : (
                      getInitials(employee.name)
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-text-strong truncate">{employee.name}</h3>
                    <span className="text-xs text-text-muted truncate block mt-0.5">{employee.email}</span>
                  </div>
                </div>

                {/* Info List */}
                <div className="px-5 pb-4 flex flex-col gap-2.5 flex-1">
                  <div className="flex items-center gap-2.5 text-xs text-text-body font-medium">
                    <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{employee.phone}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-text-body font-medium">
                    <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(employee.dateOfBirth).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-text-body font-medium">
                    <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="capitalize">{employee.gender} · {employee.maritalStatus}</span>
                  </div>
                </div>

                {/* Stats Summary Panel */}
                <div className="grid grid-cols-3 border-t border-b border-border/50 bg-slate-50/40 text-center py-2.5 px-2">
                  <div className="flex flex-col gap-0.5 border-r border-border/40">
                    <span className="text-[10px] font-bold text-text-muted">Salary</span>
                    <span className="text-xs font-semibold text-text-strong">${employee.salary.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-r border-border/40">
                    <span className="text-[10px] font-bold text-text-muted">Avail. Days</span>
                    <span className="text-xs font-semibold text-emerald-600">{employee.availableVacationDays}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-text-muted">Appr. Days</span>
                    <span className="text-xs font-semibold text-primary">{employee.approvedVacationDays}</span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-3 flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-border bg-white text-text-strong font-bold text-xs rounded-md hover:bg-slate-50 hover:text-primary transition-all duration-200 cursor-pointer shadow-sm"
                    onClick={() => navigate(`/employees/${employee._id}`)}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-red-200 bg-white text-red-600 font-bold text-xs rounded-md hover:bg-red-50 hover:border-red-300 transition-all duration-200 cursor-pointer shadow-sm"
                    onClick={() => deleteEmployee({ id: employee._id })}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default EmployeeListPage
