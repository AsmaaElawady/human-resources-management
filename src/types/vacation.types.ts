export interface Vacation {
    _id: string;
    employeeId: {
    _id: string
    name: string
    email: string
}
    fromDate: string;
    toDate: string;
    reason: string;
    status: "submitted" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
}

export interface CreateVacationInput {
    employeeId: string;
    fromDate: string;
    toDate: string;
    reason: string;
    status: "submitted" | "approved" | "rejected";
}

export interface VacationStats {
    stats: { _id: "submitted" | "approved" | "rejected"; count: number }[];
    topEmployees: { _id: string; name: string; approvedVacationDays: number; availableVacationDays: number }[];
}