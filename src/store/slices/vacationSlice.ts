import { createSlice } from "@reduxjs/toolkit";

interface VacationState {
    statusFilter: string;
}

const initialState: VacationState = {
    statusFilter: "all"
}

const vacationSlice = createSlice({
    name: "vacation",
    initialState,
    reducers: {
        setStatusFilter: (state, action) =>{
            state.statusFilter = action.payload
        }
    }
})

export default vacationSlice.reducer;
export const {setStatusFilter} = vacationSlice.actions;