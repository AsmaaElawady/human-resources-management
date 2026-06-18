import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice"
import employeeReducer from "../store/slices/employeeSlice"
import vacationReducer from "../store/slices/vacationSlice"
import { authApi } from "../services/authApi";
import { employeeApi } from "../services/employeeApi";
import { vacationApi } from "../services/vacationApi";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeeReducer,
        vacations: vacationReducer,
        [authApi.reducerPath]: authApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [vacationApi.reducerPath]: vacationApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    .concat(authApi.middleware)
    .concat(employeeApi.middleware)
    .concat(vacationApi.middleware)
})


