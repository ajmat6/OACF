import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/axios";

const initialState = {
    loading: false,
    notesTopics: [],
    notesByParent: [],
    message: ''
}


export const getFrontTopics = createAsyncThunk('getFrontTopics', async () => {
    const token = localStorage.getItem("otoken");
    const headers = {"auth-token": token ? token : null}
    const res = await axiosInstance.get('/getnotes', {headers});
    // console.log(res.data);
    return res.data
})

export const getNotesByParent = createAsyncThunk('getNotesByParent', async (parent) => {
    const token = localStorage.getItem("otoken");
    const headers = {"auth-token": token ? token : null}
    const res = await axiosInstance.get(`/getnotes/${parent}`, {headers});
    console.log(res.data);
    return res.data
})


const notesSlice = createSlice({
    name: 'notes',
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(getFrontTopics.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getFrontTopics.fulfilled, (state, action) => {
            state.loading = false
            state.notesTopics = action.payload
        })

        builder.addCase(getFrontTopics.rejected, (state, aciton) => {
            state.loading = false
            state.error = "Products fetching failed"
        })

        builder.addCase(getNotesByParent.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getNotesByParent.fulfilled, (state, action) => {
            state.loading = false
            state.notesByParent = action.payload
        })

        builder.addCase(getNotesByParent.rejected, (state, aciton) => {
            state.loading = false
            state.error = "Products fetching failed"
        })
    }
})

export default notesSlice.reducer;