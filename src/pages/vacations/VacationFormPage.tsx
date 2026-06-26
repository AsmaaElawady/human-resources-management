import { useNavigate, useSearchParams } from "react-router-dom"
import VacationForm from "@/components/vacations/VacationForm"
import type { VacationFormData } from "@/schemas/vacation.schema"
import { useSubmitVacationMutation } from "@/services/vacationApi"
import { useAppSelector } from "@/store/hooks"

const VacationFormPage = () => {
  const [submitVacation, { isLoading }] = useSubmitVacationMutation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const user = useAppSelector((state) => state.auth.user)

  // For employees: always use their own employeeId from auth
  // For admins: allow the URL param or manual entry
  const isEmployee = user?.role === "employee"
  const employeeId = isEmployee
    ? user?.employeeId ?? ""
    : searchParams.get("employeeId") ?? ""

  const onSubmit = async (data: VacationFormData) => {
    try {
      await submitVacation(data).unwrap()
      navigate("/vacations/submitted")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-strong">Submit Vacation</h1>
          <p className="text-sm text-text-muted mt-1">Submit a new request for time-off.</p>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border bg-white text-text-strong font-medium text-xs rounded-md hover:bg-slate-50 hover:text-primary transition-all duration-200 cursor-pointer shadow-sm"
          onClick={() => navigate(-1)}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Form Card Container */}
      <div className="bg-surface border border-border/80 rounded-md p-6 sm:p-8 max-w-2xl shadow-premium">
        <VacationForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          defaultEmployeeId={employeeId}
          lockEmployeeId={isEmployee}
        />
      </div>
    </div>
  )
}

export default VacationFormPage