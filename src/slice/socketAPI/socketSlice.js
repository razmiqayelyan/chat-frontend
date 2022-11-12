import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import { DOMAIN } from '../user/userAPI'



const initialState = {
    socket:null,
    selectedChatCompare:null,
    socketActivated:false
}

export const socketState = (state) => state.socket


const socketSlice = createSlice({
    name:"create/socketAPI",
    initialState,
    reducers:{
        setSocket: (state) => {
            state.socket = io(DOMAIN)
        },
        removeSocket: (state) => {
            state.socket = null
        },
        activateSocket: (state) => {
            state.socketActivated = true
        },
        deactivateSocket: (state) => {
            state.socketActivated = false
        },
        socketInitial: (state) => {
            state = initialState
        }
        // setSelectedChatCompare: (state, action) => state.selectedChatCompare = action.payload,
        // removeSelectedChatCompare: (state) => state.selectedChatCompare = null
    }
})

// export const { setSocket, removeSocket, setSelectedChatCompare, removeSelectedChatCompare } = socketSlice.actions
export const { setSocket, removeSocket, socketInitial, activateSocket, deactivateSocket } = socketSlice.actions

export default socketSlice.reducer