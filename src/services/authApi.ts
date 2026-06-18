import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './baseQuery'
import type { LoginResponse, User } from '../types/auth.types'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder)=>({
        login: builder.mutation<LoginResponse, {email: string, password: string}>({
            query: (credentials)=>({
                url: '/auth/login',
                method: 'POST',
                data: credentials
            }),
            transformResponse: (response: { data: LoginResponse['data'] }) => {
                // Return data directly as previously handled
                return { status: "SUCCESS", data: response.data } as any
            }
        }),
        register: builder.mutation<User, {email: string, password?: string, role?: string, employeeId?: string}>({
            query: (data)=>({
                url: '/auth/register',
                method: 'POST',
                data
            }),
            transformResponse: (response: { data: User }) => response.data
        }),
        refresh: builder.mutation<{accessToken: string}, {refreshToken: string}>({
            query: (data)=>({
                url: '/auth/refresh',
                method: 'POST',
                data
            }),
            transformResponse: (response: { data: { accessToken: string } }) => response.data
        }),
        getMe: builder.query<User, void>({
            query: ()=>({
                url: '/auth/me',
                method: 'GET',
            }),
            transformResponse: (response: { data: User }) => response.data
        }),
        changePassword: builder.mutation<{message: string}, {currentPassword: string, newPassword: string}>({
            query: (data)=>({
                url: '/auth/changePassword',
                method: 'PATCH',
                data
            }),
            transformResponse: (response: { data: { message: string } }) => response.data
        }),
    })
})

export const { 
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useGetMeQuery,
    useChangePasswordMutation
} = authApi