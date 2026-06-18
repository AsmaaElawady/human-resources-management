import { useGetVacationStatsQuery } from "@/services/vacationApi"
import { useGetEmployeesQuery } from "@/services/employeeApi"

const HomePage = () => {
  const { data: employeeData } = useGetEmployeesQuery({ page: 1, limit: 1 })
  const { data: vacationStatsData } = useGetVacationStatsQuery()

  const totalEmployees = employeeData?.meta?.total ?? "—"
  const pendingVacations = vacationStatsData?.stats.find((s) => s._id === "submitted")?.count ?? 0
  const approvedVacations = vacationStatsData?.stats.find((s) => s._id === "approved")?.count ?? 0

  const stats = [
    { label: "Total Employees", value: totalEmployees, icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5.197-3.762M9 20H4v-2a4 4 0 015.197-3.762M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 13v-2a4 4 0 00-3-3.87" />
      </svg>
    )},
    { label: "Pending Vacations", value: pendingVacations, icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { label: "Approved Vacations", value: approvedVacations, icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {stats.map(({ label, value, icon }) => (
          <div key={label} className="card" style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "var(--radius)", background: "var(--primary-light)", color: "var(--primary)" }}>
              {icon}
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-strong)" }}>{value}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: "24px" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "24px" }}>
          Welcome to the HR Management System. Use the sidebar to navigate between employees and vacation requests.
        </p>
        
        {vacationStatsData?.topEmployees && vacationStatsData.topEmployees.length > 0 && (
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "16px", color: "var(--text-strong)" }}>Top Employees (Vacation Usage)</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Approved Days</th>
                    <th>Available Days</th>
                  </tr>
                </thead>
                <tbody>
                  {vacationStatsData.topEmployees.map((emp) => (
                    <tr key={emp._id}>
                      <td style={{ fontWeight: 500, color: "var(--text-strong)" }}>{emp.name}</td>
                      <td>{emp.approvedVacationDays}</td>
                      <td>{emp.availableVacationDays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage