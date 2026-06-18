import { createApi } from '@reduxjs/toolkit/query/react';
import { type Vacation, type VacationStats } from '../types/vacation.types';
import { axiosBaseQuery } from './baseQuery';
import type { VacationFormData } from '../schemas/vacation.schema';


export const vacationApi = createApi({
    reducerPath: 'vacationApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder)=>({
        submitVacation: builder.mutation<Vacation, VacationFormData>({
            query: (credentials)=>({
                url: '/vacations',
                method: 'POST',
                data: credentials
            }),
            transformResponse: (response: { data: Vacation }) => response.data
        }),
        getSubmittedVacations: builder.query<Vacation [], void>({
            query: ()=>({
                url: '/vacations/submitted',
                method: 'GET',
            }),
            transformResponse: (response: { data: Vacation[] }) => response.data
        }),
        getVacationStats: builder.query<VacationStats, void>({
            query: ()=>({
                url: '/vacations/stats',
                method: 'GET',
            }),
            transformResponse: (response: { data: VacationStats }) => response.data
        }),
        getMyVacations: builder.query<Vacation[], void>({
            query: ()=>({
                url: '/vacations/my',
                method: 'GET',
            }),
            transformResponse: (response: { data: Vacation[] }) => response.data
        }),
        approveVacation: builder.mutation<Vacation, {id: string}>({
            query: ({id})=>({
                url: `/vacations/${id}/approve`,
                method: 'PATCH',
            }),
            transformResponse: (response: { data: Vacation }) => response.data
        }),
        rejectVacation: builder.mutation<Vacation, {id: string}>({
            query: ({id})=>({
                url: `/vacations/${id}/reject`,
                method: 'PATCH',
            }),
            transformResponse: (response: { data: Vacation }) => response.data
        }),
    })
})

export const {
    useSubmitVacationMutation,
    useGetSubmittedVacationsQuery,
    useApproveVacationMutation,
    useRejectVacationMutation,
    useGetVacationStatsQuery,
    useGetMyVacationsQuery
} = vacationApi