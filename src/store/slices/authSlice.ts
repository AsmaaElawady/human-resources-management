import  {type User} from '@/types/auth.types'
import { createSlice,type PayloadAction } from '@reduxjs/toolkit'


interface AuthState{
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: !!localStorage.getItem('accessToken')
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{user:User, accessToken: string, refreshToken: string}>)=>{
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            state.isAuthenticated = true;
        },
        logout: (state)=>{
            state.user = null;
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            state.isAuthenticated = false;
        }
    }
})


export default authSlice.reducer;
export const {setCredentials, logout} = authSlice.actions;