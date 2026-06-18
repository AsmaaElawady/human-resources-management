import { useNavigate, useSearchParams } from "react-router-dom"
import VacationForm from "@/components/vacations/VacationForm"
import type { VacationFormData } from "@/schemas/vacation.schema"
import { useSubmitVacationMutation } from "@/services/vacationApi"

const VacationFormPage = () => {
  const [submitVacation, { isLoading }] = useSubmitVacationMutation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const employeeId = searchParams.get("employeeId") ?? ""

  const onSubmit = async (data: VacationFormData) => {
    try {
      await submitVacation(data).unwrap()
      navigate("/vacations/submitted")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Submit Vacation Request</h1>
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="card" style={{ padding: "28px", maxWidth: 640 }}>
        <VacationForm onSubmit={onSubmit} isLoading={isLoading} defaultEmployeeId={employeeId} />
      </div>
    </div>
  )
}

export default VacationFormPage