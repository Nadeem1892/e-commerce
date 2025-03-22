
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('auth') || null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('auth', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('auth');
        },
       
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;