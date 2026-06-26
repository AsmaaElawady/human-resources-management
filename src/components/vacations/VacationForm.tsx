import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { vacationSchema, type VacationFormData } from "../../schemas/vacation.schema"

interface VacationFormProps {
  onSubmit: (data: VacationFormData) => void
  isLoading?: boolean
  defaultEmployeeId?: string
  lockEmployeeId?: boolean
}

const VacationForm = ({ onSubmit, isLoading, defaultEmployeeId, lockEmployeeId }: VacationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacationFormData>({
    resolver: zodResolver(vacationSchema),
    defaultValues: { employeeId: defaultEmployeeId ?? "" },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      {/* Employee ID — hidden for employees, visible for admins */}
      {lockEmployeeId ? (
        <input type="hidden" {...register("employeeId")} />
      ) : (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="employeeId" className="text-sm font-medium text-text-strong">
            Employee ID
          </label>
          <input
            id="employeeId"
            {...register("employeeId")}
            placeholder="Employee ID"
            readOnly={!!defaultEmployeeId}
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm read-only:bg-slate-100 read-only:text-text-muted read-only:cursor-not-allowed"
          />
          {errors.employeeId && <span className="text-xs text-danger font-medium mt-1">{errors.employeeId.message}</span>}
        </div>
      )}

      {/* Date fields row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* From Date */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fromDate" className="text-sm font-medium text-text-strong">
            From Date
          </label>
          <input
            id="fromDate"
            type="date"
            {...register("fromDate")}
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
          />
          {errors.fromDate && <span className="text-xs text-danger font-medium mt-1">{errors.fromDate.message}</span>}
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="toDate" className="text-sm font-medium text-text-strong">
            To Date
          </label>
          <input
            id="toDate"
            type="date"
            {...register("toDate")}
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
          />
          {errors.toDate && <span className="text-xs text-danger font-medium mt-1">{errors.toDate.message}</span>}
        </div>

      </div>

      {/* Reason */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reason" className="text-sm font-medium text-text-strong">
          Reason for Request
        </label>
        <textarea
          id="reason"
          {...register("reason")}
          placeholder="Describe the reason for the vacation request..."
          className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm min-h-[110px] resize-y"
        />
        {errors.reason && <span className="text-xs text-danger font-medium mt-1">{errors.reason.message}</span>}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-border/60">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </button>
      </div>
    </form>
  )
}

export default VacationForm