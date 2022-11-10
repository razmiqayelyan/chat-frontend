import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    notifications: JSON.parse(localStorage.getItem("notifications")) || []
}

export const notificationState = (state) => state.notification


const notificationSlice = createSlice({
    name:"create/notifications",
    initialState,
    reducers:{
        setNotifications: (state, action) => {
            const newMessageRecieved = action.payload
            state.notifications = ({...state.notifications, [newMessageRecieved.chat._id]: newMessageRecieved})
        },
        removeNotification: (state , action) => {
            const chatId = action.payload
            if(state.notifications[chatId]) delete state.notifications[chatId];
        },
        notificationsInitial: (state) => {
            state = initialState
        }
    }
})

// export const { setSocket, removeSocket, setSelectedChatCompare, removeSelectedChatCompare } = socketSlice.actions
export const { notificationsInitial, setNotifications, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer