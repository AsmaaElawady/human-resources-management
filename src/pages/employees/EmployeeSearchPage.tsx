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
    <div>
      <div className="page-header">
        <h1 className="page-title">Search Employees</h1>
      </div>

      <div className="search-input-wrap" style={{ marginBottom: "24px" }}>
        <svg className="search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search by name (min 2 characters)…"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
          <span className="spinner" style={{ width: 28, height: 28 }} />
        </div>
      )}

      {!isLoading && debouncedSearch.length >= 2 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Marital Status</th>
                <th>Avail. Days</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={8} className="empty-state">No employees found for "{debouncedSearch}".</td>
                </tr>
              )}
              {data?.map((employee) => (
                <tr key={employee._id}>
                  <td style={{ fontWeight: 500, color: "var(--text-strong)" }}>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td style={{ textTransform: "capitalize" }}>{employee.gender}</td>
                  <td style={{ textTransform: "capitalize" }}>{employee.maritalStatus}</td>
                  <td>{employee.availableVacationDays}</td>
                  <td>${employee.salary.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ padding: "4px 12px", fontSize: "0.8rem" }}
                      onClick={() => navigate(`/vacations?employeeId=${employee._id}`)}
                    >
                      Submit Vacation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {debouncedSearch.length < 2 && !isLoading && (
        <div className="empty-state">Type at least 2 characters to search.</div>
      )}
    </div>
  )
}

export default EmployeeSearchPage