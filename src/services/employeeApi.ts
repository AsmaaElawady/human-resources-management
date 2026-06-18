import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";
import type { Employee, CreateEmployeeInput, PaginatedEmployees } from "../types/employee.types";
import type { EmployeeFormData } from "../schemas/employee.schema";

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getEmployees: builder.query<PaginatedEmployees, { page: number, limit: number }>({
            query: ({ page, limit }) => ({
                url: `/employees?page=${page}&limit=${limit}`,
                method: 'GET'
            })
        }),
        getEmployeeById: builder.query<Employee, { id: string }>({
            query: ({ id }) => ({
                url: `/employees/${id}`,
                method: 'GET'
            }),
            transformResponse: (response: { data: Employee }) => {
                // Ensure dateOfBirth is YYYY-MM-DD for the form
                const employee = response.data;
                if (employee.dateOfBirth) {
                    employee.dateOfBirth = new Date(employee.dateOfBirth).toISOString().split('T')[0];
                }
                return employee;
            }
        }),
        addEmployee: builder.mutation<Employee, FormData>({
            query: (formData) => ({
                url: '/employees',
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }),
            transformResponse: (response: { data: Employee }) => response.data
        }),
        updateEmployee: builder.mutation<Employee, { id: string, data: EmployeeFormData}>({
            query: ({ id, data }) => ({
                url: `/employees/${id}`,
                method: 'PATCH',
                data: data
            }),
            transformResponse: (response: { data: Employee }) => response.data
        }),
        deleteEmployee: builder.mutation<null, { id: string }>({
            query: ({id}) => ({
                url: `/employees/${id}`,
                method: 'DELETE',
            })
        }),
        searchEmployees: builder.query<Employee [], { name: string }>({
            query: ({ name }) => ({
                url: `/employees/search?name=${name}`,
                method: 'GET'
            }),
            transformResponse: (response: { data: Employee[] }) => response.data
        }),
        uploadPhoto: builder.mutation<Employee, { id: string, photo: File }>({
            query: ({ id, photo }) => {
                const formData = new FormData();
                formData.append('photo', photo);
                return {
                    url: `/employees/${id}/photo`,
                    method: 'PATCH',
                    data: formData,
                };
            },
            transformResponse: (response: { data: Employee }) => response.data
        }),
    })
})


export const { 
    useGetEmployeesQuery, 
    useGetEmployeeByIdQuery, 
    useAddEmployeeMutation, 
    useUpdateEmployeeMutation, 
    useDeleteEmployeeMutation, 
    useSearchEmployeesQuery,
    useUploadPhotoMutation
    } = employeeApi;