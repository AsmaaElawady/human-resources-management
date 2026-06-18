import { useState } from "react"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeeSchema, type EmployeeFormData } from "../../schemas/employee.schema"
import type { Employee } from "../../types/employee.types"

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData, photoFile?: File) => void
  defaultValues?: Partial<Employee>
  isLoading?: boolean
}

const EmployeeForm = ({ onSubmit, defaultValues, isLoading }: EmployeeFormProps) => {
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
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input id="name" {...register("name")} placeholder="John Doe" />
          {errors.name && <span className="field-error">{errors.name.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} placeholder="john@example.com" />
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" {...register("phone")} placeholder="+1 555 000 0000" />
          {errors.phone && <span className="field-error">{errors.phone.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="address">Address</label>
          <input id="address" {...register("address")} placeholder="123 Main St, City" />
          {errors.address && <span className="field-error">{errors.address.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register("gender")}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <span className="field-error">{errors.gender.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="maritalStatus">Marital Status</label>
          <select id="maritalStatus" {...register("maritalStatus")}>
            <option value="">Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
          {errors.maritalStatus && <span className="field-error">{errors.maritalStatus.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="salary">Salary</label>
          <input id="salary" type="number" {...register("salary")} placeholder="0.00" />
          {errors.salary && <span className="field-error">{errors.salary.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && <span className="field-error">{errors.dateOfBirth.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="availableVacationDays">Available Vacation Days</label>
          <input id="availableVacationDays" type="number" {...register("availableVacationDays")} placeholder="0" />
          {errors.availableVacationDays && <span className="field-error">{errors.availableVacationDays.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="approvedVacationDays">Approved Vacation Days</label>
          <input id="approvedVacationDays" type="number" {...register("approvedVacationDays")} placeholder="0" />
          {errors.approvedVacationDays && <span className="field-error">{errors.approvedVacationDays.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="photo">Profile Photo</label>
          <input 
            id="photo" 
            type="file" 
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
          />
        </div>

      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? <><span className="spinner" style={{ borderTopColor: "#fff" }} /> Saving…</> : "Save Employee"}
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm