import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/axiosClient"

export const loginThunk = createAsyncThunk(

    "auth/login",

    async (data) => {

        const res = await api.post("/auth/login", data)

        return res.data

    }

)

export const loadUserThunk = createAsyncThunk(

    "auth/loadUser",

    async () => {

        const res = await api.get("/auth/me")

        return res.data

    }

)

export const logoutThunk = createAsyncThunk(

    "auth/logout",

    async () => {

        await api.post("/auth/logout")

    }

)