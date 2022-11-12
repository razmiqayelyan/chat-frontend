import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import chatAPI from './chatAPI'

const initialState = {
    chats:null,
    error:null,
    selectedChat:null,
    createGroupPopup:false,
    searchedChat:null,
    groupMembersPopup:false
}

export const chatState = (state) => state.chat

export const getChatsByToken = createAsyncThunk(
    'chats',
    async (thunkAPI) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const response = await chatAPI.getChats(token)
    return response.data
    }
  )

export const createGroupChat = createAsyncThunk(
    'chats/createGroupChat',
    async (data ,thunkAPI) => {
    const {token} = thunkAPI.getState().user
    if(!data.users || !data.name || !token) return
    const response = await chatAPI.newGroupChat(data, token)
    return response.data
    }
  )

export const removeFromGroup = createAsyncThunk(
    'chats/removeFromGroup',
    async (data ,thunkAPI) => {
    const {token} = thunkAPI.getState().user
    if(!data.userId || !data.chatId || !token) return
    const response = await chatAPI.groupMemberRemove(data, token)
    return response.data
    }
)

export const removeMemberFromGroup = createAsyncThunk(
    'chats/removeMemberFromGroup',
    async (data ,thunkAPI) => {
    const {token} = thunkAPI.getState().user
    if(!data.userId || !data.chatId || !token) return
    const response = await chatAPI.groupMemberRemove(data, token)
    return response.data
    }
)

export const addMemberToGroup = createAsyncThunk(
    'chats/addMemberToGroup',
    async (data ,thunkAPI) => {
    const {token} = thunkAPI.getState().user
    if(!data.userId || !data.chatId || !token) return
    const response = await chatAPI.groupMemberAdd(data, token)
    return response.data
    }
)


export const editGroupName = createAsyncThunk(
    'chats/editGroupName',
    async (data ,thunkAPI) => {
    const {token} = thunkAPI.getState().user
    if(!data.chatId || !data.chatName || !token) return
    const response = await chatAPI.groupNameEdit(data, token)
    return response.data
    }
)

export const OneToOneChat = createAsyncThunk(
    'chats/OneToOneChat',
    async (user ,thunkAPI) => {
    const {token} = thunkAPI.getState().user
    if(!user || !token) return
    const response = await chatAPI.accessChat(user, token)
    return response.data
    }
  )

const chatSlice = createSlice({
    name:"chat/get",
    initialState,
    reducers:{
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload?.chat || null
        },
        toggleAddGroupModel: (state) => {
            state.createGroupPopup = !state.createGroupPopup
        },
        removeSearchedChat: (state) => {
            state.searchedChat = null
        },
        chatInitial: (state) => {
            state = initialState
        },
        toggleGroupMembersPopup: (state) => {
            state.groupMembersPopup = !state.groupMembersPopup
        },
        unshiftChats: (state, action) => {
            state.chats.unshift(action.payload)
        }

    },
    extraReducers:(builder) => {
        builder
        .addCase(getChatsByToken.fulfilled, (state, action) => {
            state.chats = action.payload
        })
        .addCase(createGroupChat.fulfilled, (state, action) => {
            if(!action.payload) return
            state.chats.unshift(action.payload)
        })
        .addCase(OneToOneChat.fulfilled, (state, action) => {
            if(!action.payload) return
            if(state.chats.filter((ch) => ch._id === action.payload._id).length > 0){
                state.selectedChat = action.payload
            }
            else {
                state.chats.unshift(action.payload)
                state.selectedChat = action.payload
            }

        })
        .addCase(removeFromGroup.fulfilled, (state, action) => {
            if(!action.payload) return
            state.chats = state.chats.filter(chat => chat._id !== action.payload._id)
            state.selectedChat = null
        })
        .addCase(removeMemberFromGroup.fulfilled, (state, action) => {
            if(!action.payload) return
            state.chats = state.chats.map(chat => {
                if(chat._id === action.payload._id) return action.payload
                else return chat
            })
            state.selectedChat = action.payload
        })
        .addCase(addMemberToGroup.fulfilled, (state, action) => {
            if(!action.payload) return
            state.chats = state.chats.map(chat => {
                if(chat._id === action.payload._id) return action.payload
                else return chat
            })
            state.selectedChat = action.payload
        })
        .addCase(editGroupName.fulfilled, (state, action) => {
            if(!action.payload) return
            state.chats = state.chats.map(chat => {
                if(chat._id === action.payload._id) return action.payload
                else return chat
            })
            state.selectedChat = action.payload
        })
    }
})

export const {setSelectedChat, toggleAddGroupModel, chatInitial, removeSearchedChat, toggleGroupMembersPopup, unshiftChats} = chatSlice.actions

export default chatSlice.reducer