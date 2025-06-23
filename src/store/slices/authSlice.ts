import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    isAuthenticated: boolean
    email: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    email: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (
            state,
            action: PayloadAction<{ isAuthenticated: boolean; email: string | null }>
        ) => {
            state.isAuthenticated = action.payload.isAuthenticated
            state.email = action.payload.email
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.email = null
        },
    },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer
