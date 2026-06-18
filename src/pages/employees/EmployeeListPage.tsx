import { useNavigate } from "react-router-dom"
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from "@/services/employeeApi"

const EmployeeListPage = () => {
  const { data, isLoading, isError } = useGetEmployeesQuery({ page: 1, limit: 10 })
  const [deleteEmployee] = useDeleteEmployeeMutation()
  const navigate = useNavigate()

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Employees</h1>
        <button className="btn btn-primary" onClick={() => navigate("/employees/add")}>
          + Add Employee
        </button>
      </div>

      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
          <span className="spinner" style={{ width: 32, height: 32 }} />
        </div>
      )}

      {isError && (
        <div className="card" style={{ padding: "20px", color: "var(--danger)", textAlign: "center" }}>
          Something went wrong while loading employees.
        </div>
      )}

      {!isLoading && !isError && (
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
                <th>Appr. Days</th>
                <th>Salary</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 && (
                <tr>
                  <td colSpan={10} className="empty-state">No employees found.</td>
                </tr>
              )}
              {data?.data?.map((employee) => (
                <tr key={employee._id}>
                  <td style={{ fontWeight: 500, color: "var(--text-strong)" }}>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td style={{ textTransform: "capitalize" }}>{employee.gender}</td>
                  <td style={{ textTransform: "capitalize" }}>{employee.maritalStatus}</td>
                  <td>{employee.availableVacationDays}</td>
                  <td>{employee.approvedVacationDays}</td>
                  <td>${employee.salary.toLocaleString()}</td>
                  <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: "0.8rem" }} onClick={() => navigate(`/employees/${employee._id}`)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" style={{ padding: "4px 10px", fontSize: "0.8rem" }} onClick={() => deleteEmployee({ id: employee._id })}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default EmployeeListPage
