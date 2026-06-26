import  {type User} from '@/types/auth.types'
import { createSlice,type PayloadAction } from '@reduxjs/toolkit'


interface AuthState{
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

const savedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
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
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            state.isAuthenticated = true;
        },
        logout: (state)=>{
            state.user = null;
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
            state.isAuthenticated = false;
        }
    }
})


export default authSlice.reducer;
export const {setCredentials, logout} = authSlice.actions;