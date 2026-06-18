import { z } from 'zod'

export const employeeSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
    phone: z.string().min(10, { message: 'Phone must be at least 10 characters' }),
    gender: z.enum(['male', 'female']),
    maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
    availableVacationDays: z.coerce.number().min(0),
    approvedVacationDays: z.coerce.number().min(0),
    salary: z.coerce.number().min(0),
    dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>