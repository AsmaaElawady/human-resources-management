import { z } from 'zod'

export const vacationSchema = z.object({
    employeeId: z.string().optional(),
    fromDate: z.string().min(1, 'From date is required'),
    toDate: z.string().min(1, 'To date is required'),
    reason: z.string().min(5, 'Reason must be at least 5 characters'),
})

export type VacationFormData = z.infer<typeof vacationSchema>