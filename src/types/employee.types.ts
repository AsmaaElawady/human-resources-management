export interface Employee {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    gender: 'male' | 'female';
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    availableVacationDays: number;
    approvedVacationDays: number;
    salary: number;
    dateOfBirth: string;
    profilePhoto?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedEmployees {
    data: Employee[]
    meta: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

export interface CreateEmployeeInput {
    name: string;
    email: string;
    address: string;
    phone: string;
    gender: 'male' | 'female';
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    availableVacationDays: number;
    approvedVacationDays: number;
    salary: number;
    dateOfBirth: string;
    profilePhoto?: string;
}