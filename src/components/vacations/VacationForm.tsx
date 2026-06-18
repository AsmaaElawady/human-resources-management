import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { vacationSchema, type VacationFormData } from "../../schemas/vacation.schema"

interface VacationFormProps {
  onSubmit: (data: VacationFormData) => void
  isLoading?: boolean
  defaultEmployeeId?: string
}

const VacationForm = ({ onSubmit, isLoading, defaultEmployeeId }: VacationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacationFormData>({
    resolver: zodResolver(vacationSchema),
    defaultValues: { employeeId: defaultEmployeeId ?? "" },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div className="field">
        <label htmlFor="employeeId">Employee ID</label>
        <input
          id="employeeId"
          {...register("employeeId")}
          placeholder="Employee ID"
          readOnly={!!defaultEmployeeId}
        />
        {errors.employeeId && <span className="field-error">{errors.employeeId.message}</span>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div className="field">
          <label htmlFor="fromDate">From Date</label>
          <input id="fromDate" type="date" {...register("fromDate")} />
          {errors.fromDate && <span className="field-error">{errors.fromDate.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="toDate">To Date</label>
          <input id="toDate" type="date" {...register("toDate")} />
          {errors.toDate && <span className="field-error">{errors.toDate.message}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="reason">Reason</label>
        <textarea id="reason" {...register("reason")} placeholder="Describe the reason for the vacation request…" />
        {errors.reason && <span className="field-error">{errors.reason.message}</span>}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading
            ? <><span className="spinner" style={{ borderTopColor: "#fff" }} /> Submitting…</>
            : "Submit Request"}
        </button>
      </div>
    </form>
  )
}

export default VacationForm