import { createSlice } from "@reduxjs/toolkit";

interface EmployeeState{
    searchQuery: string;
    currentPage: number;
}

const initialState: EmployeeState = {
    searchQuery: "",
    currentPage: 1
}

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setSearchQuery: (state, action) =>{
            state.searchQuery = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
})

export default employeeSlice.reducer;
export const {setSearchQuery, setCurrentPage} = employeeSlice.actions;