import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name:'notifications',
    initialState: null,
    reducers: {
        changeNotification(state, action) {
            const message = action.payload
            return state = message
        }
    }
})


export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer