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
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-strong">Add Employee</h1>
          <p className="text-sm text-text-muted mt-1">Register a new profile in the company directory.</p>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border bg-white text-text-strong font-bold text-xs rounded-sm hover:bg-slate-50 hover:text-primary transition-all duration-200 cursor-pointer shadow-sm"
          onClick={() => navigate("/employees")}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-surface border border-border/80 rounded-md p-6 sm:p-8 shadow-premium">
        <EmployeeForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default AddEmployeePage