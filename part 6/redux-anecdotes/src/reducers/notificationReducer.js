import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const notificationSlice = createSlice({
    name: 'notifications',
    initialState, 
    reducers: {
        setNotification (state, action) {
            state = action.payload
            return state
        },
        removeNotification (state, action) {
            state = null
            return state
        }
    }

})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer