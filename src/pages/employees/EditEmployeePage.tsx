import { useNavigate, useParams } from "react-router-dom"
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "@/services/employeeApi"
import EmployeeForm from "@/components/employees/EmployeeForm"
import ProfilePhotoUpload from "@/components/employees/ProfilePhotoUpload"
import type { EmployeeFormData } from "@/schemas/employee.schema"
import { useAppSelector } from "@/store/hooks"

const EditEmployeePage = () => {
  const { id } = useParams()
  const { data, isLoading: isFetching } = useGetEmployeeByIdQuery({ id: id! })
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  
  const isEmployeeEditingSelf = user?.role === "employee"

  const onSubmit = async (data: EmployeeFormData) => {
    await updateEmployee({ id: id!, data }).unwrap()
    if (isEmployeeEditingSelf) {
      navigate("/")
    } else {
      navigate("/employees")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-strong tracking-tight">{isEmployeeEditingSelf ? "My Profile" : "Edit Employee"}</h1>
          <p className="text-sm text-text-muted mt-1">{isEmployeeEditingSelf ? "View and update your personal information." : "Modify employee records or upload a new photo."}</p>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border bg-white text-text-strong font-bold text-xs rounded-sm hover:bg-slate-50 hover:text-primary transition-all duration-200 cursor-pointer shadow-sm"
          onClick={() => isEmployeeEditingSelf ? navigate("/") : navigate("/employees")}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-surface border border-border/80 rounded-md p-6 sm:p-8 shadow-premium">
        {isFetching || !data ? (
          <div className="flex items-center justify-center p-12">
            <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : (
          <>
            <ProfilePhotoUpload employeeId={id!} currentPhoto={data.profilePhoto} employeeName={data.name} />
            <EmployeeForm defaultValues={data} onSubmit={onSubmit} isLoading={isLoading} isEmployeeEditingSelf={isEmployeeEditingSelf} />
          </>
        )}
      </div>
    </div>
  )
}

export default EditEmployeePage