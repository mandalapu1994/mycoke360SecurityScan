import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    isLoaderVisible: false
}

export const loaderReducer = createSlice({
    name: 'Loader',
    initialState,
    reducers: {
        SET_LOADER: (state, action) => {
            state.isLoaderVisible = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { SET_LOADER } = loaderReducer.actions

export default loaderReducer.reducer