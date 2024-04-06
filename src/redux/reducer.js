import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAllCategories: (state, action) => {
            state.categories = action.payload
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
          }

    },
})

export const { setAllCategories,setAuthenticated } = userSlice.actions

export default userSlice.reducer