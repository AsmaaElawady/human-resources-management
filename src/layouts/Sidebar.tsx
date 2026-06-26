import { NavLink } from "react-router-dom"
import { useAppSelector } from "@/store/hooks"

const links = [
  {
    to: "/",
    label: "Dashboard",
    allowedRoles: ["admin", "hr", "employee"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
      </svg>
    ),
  },
  {
    to: "/employees",
    label: "Employees",
    allowedRoles: ["admin", "hr"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5.197-3.762M9 20H4v-2a4 4 0 015.197-3.762M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 13v-2a4 4 0 00-3-3.87" />
      </svg>
    ),
  },
  {
    to: "/employees/add",
    label: "Add Employee",
    allowedRoles: ["admin", "hr"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    to: "/employees/search",
    label: "Search",
    allowedRoles: ["admin", "hr"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
      </svg>
    ),
  },
  {
    to: "/vacations",
    label: "Submit Vacation",
    allowedRoles: ["admin", "hr", "employee"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    to: "/vacations/my",
    label: "My Vacations",
    allowedRoles: ["employee"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: "/vacations/submitted",
    label: "Vacations List",
    allowedRoles: ["admin", "hr"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.auth)

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-50 text-red-600 border-red-200"
      case "hr": return "bg-amber-50 text-amber-600 border-amber-200"
      default: return "bg-green-50 text-green-600 border-green-200"
    }
  }

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 bg-surface border-r border-border py-6 px-4 flex flex-col justify-between overflow-y-auto z-40">
      <div className="flex flex-col gap-1.5">
        {links
          .filter((link) => user?.role && link.allowedRoles.includes(user.role))
          .map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-primary-light text-primary border-l-4 border-primary pl-3" 
                    : "text-text-body hover:bg-slate-50 hover:text-text-strong"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}

        {user?.role === "employee" && user?.employeeId && (
          <NavLink
            to={`/employees/${user.employeeId}`}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive 
                  ? "bg-primary-light text-primary border-l-4 border-primary pl-3" 
                  : "text-text-body hover:bg-slate-50 hover:text-text-strong"
              }`
            }
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Profile
          </NavLink>
        )}
      </div>

      {user?.role && (
        <div className={`mt-auto p-3 border rounded-md text-center ${getRoleColor(user.role)}`}>
          <p className="text-xs font-bold capitalize">{user.role} workspace</p>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
