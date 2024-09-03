import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'dark'
}

const modeSlice = createSlice({
    name: 'mode',
    initialState: initialState,
    reducers: {
        changeModee: (state) => {
            if(state.mode === 'dark') state.mode = 'light'
            else state.mode = 'dark'
        }
    }
})

export default modeSlice.reducer;
export const { changeModee } = modeSlice.actions