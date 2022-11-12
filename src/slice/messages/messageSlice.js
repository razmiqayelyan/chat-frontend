import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import messageAPI from './messageAPI'


const initialState = {
    messages:null,
    lastCreatedMessage:null,
    emitTime:false,
    typing:false,
}

export const messageState = (state) => state.message


// get all messages in first render
export const getAllMessages = createAsyncThunk(
    'messages/getAll',
    async (chatID, thunkAPI) => {
    const {token} = thunkAPI.getState().user
    if(!chatID || !token) return localStorage.removeItem("token")
    const response = await messageAPI.getMessages(chatID, token)
    return response.data
    }
  )


// create new message
export const createNewMessage = createAsyncThunk(
    'messages/create',
    async ({content, chatId}, thunkAPI) => {
    const {token} = thunkAPI.getState().user
    if(!chatId || !token || !content) return
    const response = await messageAPI.createMessage(content, chatId, token)
    return response.data
    }
  )




const messageSlice = createSlice({
    name:"getMessages",
    initialState,
    reducers:{
        clearMessages: (state) => {
            state.messages = null
        },
        addMessage: (state, action) => {
            if(!state.messages) return
            state.messages.push(action.payload)
        },
        offEmiting: (state) => {
            state.emitTime = false
        },
        startTyping:(state) => {
            state.typing = true
        },
        finishTyping:(state) => {
            state.typing = false
        },
        messageInitial: (state) => {
            state = initialState
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.messages = action.payload
            })

            // create Message
            .addCase(createNewMessage.fulfilled, (state, action) => {
                state.lastCreatedMessage = action.payload
                state.messages = [...state.messages, action.payload]
                state.emitTime = true
            })
    }
})

export const { addMessage, offEmiting, messageInitial, startTyping, finishTyping ,clearMessages} = messageSlice.actions

export default messageSlice.reducer