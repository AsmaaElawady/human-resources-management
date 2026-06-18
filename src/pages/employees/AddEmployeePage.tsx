import { useNavigate } from "react-router-dom"
import type { EmployeeFormData } from "@/schemas/employee.schema"
import { useAddEmployeeMutation } from "@/services/employeeApi"
import EmployeeForm from "@/components/employees/EmployeeForm"

const AddEmployeePage = () => {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation()
  const navigate = useNavigate()

  const onSubmit = async (data: EmployeeFormData, photo?: File) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      if (photo) {
        formData.append("photo", photo)
      }
      await addEmployee(formData).unwrap()
      navigate("/employees")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add Employee</h1>
        <button className="btn btn-ghost" onClick={() => navigate("/employees")}>
          ← Back
        </button>
      </div>

      <div className="card" style={{ padding: "28px" }}>
        <EmployeeForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default AddEmployeePage