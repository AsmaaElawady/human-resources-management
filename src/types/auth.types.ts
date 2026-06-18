export interface User {
    _id: string;
    email: string;
    role: string;
    employeeId?: string;
}


export interface LoginResponse {
    status: string;
    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    }
}