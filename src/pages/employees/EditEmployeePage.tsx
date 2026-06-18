import { useNavigate, useParams } from "react-router-dom"
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "@/services/employeeApi"
import EmployeeForm from "@/components/employees/EmployeeForm"
import ProfilePhotoUpload from "@/components/employees/ProfilePhotoUpload"
import type { EmployeeFormData } from "@/schemas/employee.schema"

const EditEmployeePage = () => {
  const { id } = useParams()
  const { data, isLoading: isFetching } = useGetEmployeeByIdQuery({ id: id! })
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation()
  const navigate = useNavigate()

  const onSubmit = async (data: EmployeeFormData) => {
    await updateEmployee({ id: id!, data }).unwrap()
    navigate("/employees")
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Edit Employee</h1>
        <button className="btn btn-ghost" onClick={() => navigate("/employees")}>
          ← Back
        </button>
      </div>

      <div className="card" style={{ padding: "28px" }}>
        {isFetching || !data ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <span className="spinner" style={{ width: 32, height: 32 }} />
          </div>
        ) : (
          <>
            <ProfilePhotoUpload employeeId={id!} currentPhoto={data.profilePhoto} employeeName={data.name} />
            <EmployeeForm defaultValues={data} onSubmit={onSubmit} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  )
}

export default EditEmployeePage