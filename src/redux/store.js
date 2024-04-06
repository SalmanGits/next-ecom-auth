import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer.js'


export const makeStore = configureStore({
    reducer: {
        app: reducer
    },
})