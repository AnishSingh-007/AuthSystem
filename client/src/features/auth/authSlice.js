// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//     loginAPI,
//     logoutAPI,
//     getProfileAPI,
// } from "./authAPI";

// export const login = createAsyncThunk("auth/login", async (data) => {
//     const res = await loginAPI(data);
//     return res.data;
// });

// export const fetchProfile = createAsyncThunk("auth/fetchProfile", async () => {
//     const res = await getProfileAPI();
//     return res.data;
// });

// export const logout = createAsyncThunk("auth/logout", async () => {
//     await logoutAPI();
// });

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         user: null,
//         loading: false,
//         isAuthenticated: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // login
//             .addCase(login.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.isAuthenticated = true;
//                 state.user = action.payload.user;
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })

//             // fetch profile (rehydrate session)
//             .addCase(fetchProfile.fulfilled, (state, action) => {
//                 state.isAuthenticated = true;
//                 state.user = action.payload.user;
//             })
//             .addCase(fetchProfile.rejected, (state) => {
//                 state.isAuthenticated = false;
//                 state.user = null;
//             })

//             // logout
//             .addCase(logout.fulfilled, (state) => {
//                 state.isAuthenticated = false;
//                 state.user = null;
//             });
//     },
// });

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, logoutThunk, loadUserThunk } from "./authThunks"

const initialState = {
    user: null,
    roles: [],
    trustLevel: null,
    isAuthenticated: false,
    loading: false
}

const authSlice = createSlice({

    name: "auth",
    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(loginThunk.pending, (state) => {
                state.loading = true
            })

            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.roles = action.payload.roles
                state.trustLevel = action.payload.trustLevel
                state.isAuthenticated = true
            })

            .addCase(loginThunk.rejected, (state) => {
                state.loading = false
                state.isAuthenticated = false
            })

            .addCase(loadUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.roles = action.payload.roles
                state.trustLevel = action.payload.trustLevel
                state.isAuthenticated = true
            })

            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null
                state.roles = []
                state.trustLevel = null
                state.isAuthenticated = false
            })

    }

})

export default authSlice.reducer