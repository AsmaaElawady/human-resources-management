import { useState } from "react"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeeSchema, type EmployeeFormData } from "../../schemas/employee.schema"
import type { Employee } from "../../types/employee.types"

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData, photoFile?: File) => void
  defaultValues?: Partial<Employee>
  isLoading?: boolean
  isEmployeeEditingSelf?: boolean
}

const EmployeeForm = ({ onSubmit, defaultValues, isLoading, isEmployeeEditingSelf = false }: EmployeeFormProps) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema) as Resolver<EmployeeFormData>,
    defaultValues,
  })

  const handleFormSubmit = (data: EmployeeFormData) => {
    onSubmit(data, photoFile || undefined)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-bold text-text-strong tracking-wide">
            Full Name
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="John Doe"
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
          />
          {errors.name && <span className="text-xs text-danger font-medium mt-1">{errors.name.message}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-bold text-text-strong tracking-wide">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@company.com"
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
          />
          {errors.email && <span className="text-xs text-danger font-medium mt-1">{errors.email.message}</span>}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-bold text-text-strong tracking-wide">
            Phone Number
          </label>
          <input
            id="phone"
            {...register("phone")}
            placeholder="+2 (555) 000-0000"
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
          />
          {errors.phone && <span className="text-xs text-danger font-medium mt-1">{errors.phone.message}</span>}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="address" className="text-xs font-bold text-text-strong tracking-wide">
            Address
          </label>
          <input
            id="address"
            {...register("address")}
            placeholder="123 Main St, City"
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
          />
          {errors.address && <span className="text-xs text-danger font-medium mt-1">{errors.address.message}</span>}
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gender" className="text-xs font-bold text-text-strong tracking-wide">
            Gender
          </label>
          <select
            id="gender"
            {...register("gender")}
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <span className="text-xs text-danger font-medium mt-1">{errors.gender.message}</span>}
        </div>

        {/* Marital Status */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="maritalStatus" className="text-xs font-bold text-text-strong tracking-wide">
            Marital Status
          </label>
          <select
            id="maritalStatus"
            {...register("maritalStatus")}
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
          >
            <option value="">Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
          {errors.maritalStatus && <span className="text-xs text-danger font-medium mt-1">{errors.maritalStatus.message}</span>}
        </div>

        {/* Salary */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="salary" className="text-xs font-bold text-text-strong tracking-wide">
            Salary ($)
          </label>
          <input
            id="salary"
            type="number"
            {...register("salary")}
            placeholder="0.00"
            readOnly={isEmployeeEditingSelf}
            className={`w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm ${isEmployeeEditingSelf ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}`}
          />
          {errors.salary && <span className="text-xs text-danger font-medium mt-1">{errors.salary.message}</span>}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="dateOfBirth" className="text-xs font-bold text-text-strong tracking-wide">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth")}
            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm"
          />
          {errors.dateOfBirth && <span className="text-xs text-danger font-medium mt-1">{errors.dateOfBirth.message}</span>}
        </div>

        {/* Available Vacation Days */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="availableVacationDays" className="text-xs font-bold text-text-strong tracking-wide">
            Available Vacation Days
          </label>
          <input
            id="availableVacationDays"
            type="number"
            {...register("availableVacationDays")}
            placeholder="0"
            readOnly={isEmployeeEditingSelf}
            className={`w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm ${isEmployeeEditingSelf ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}`}
          />
          {errors.availableVacationDays && <span className="text-xs text-danger font-medium mt-1">{errors.availableVacationDays.message}</span>}
        </div>

        {/* Approved Vacation Days */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="approvedVacationDays" className="text-xs font-bold text-text-strong tracking-wide">
            Approved Vacation Days
          </label>
          <input
            id="approvedVacationDays"
            type="number"
            {...register("approvedVacationDays")}
            placeholder="0"
            readOnly={isEmployeeEditingSelf}
            className={`w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md text-sm text-text-strong placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 shadow-sm ${isEmployeeEditingSelf ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}`}
          />
          {errors.approvedVacationDays && <span className="text-xs text-danger font-medium mt-1">{errors.approvedVacationDays.message}</span>}
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="photo" className="text-xs font-bold text-text-strong tracking-wide">
            Profile Photo
          </label>
          <input
            id="photo"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-indigo-100 cursor-pointer border border-border border-dashed p-3 rounded-md bg-slate-50/20"
          />
        </div>

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
              Saving...
            </>
          ) : (
            "Save Employee"
          )}
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm