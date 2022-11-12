import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import userAPI from './userAPI'



export const userLogin = createAsyncThunk(
    'user/login',
    async (user, thunkAPI) => {
      try {
        const response = await userAPI.login(user)
        return response.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
      }
    }
  )

export const userRegister = createAsyncThunk(
    'user/register',
    async (user, thunkAPI) => {
      try {
        const response = await userAPI.register(user)
        return response.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
      }
    }
  )


export const profileEdit = createAsyncThunk(
    'user/profileEdit',
    async (data, thunkAPI) => {
    try {
        let {token} = thunkAPI.getState().user
        if((!data.name && !data.pic) || !token) return
        const response = await userAPI.editUser(data, token)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
    }
  )

export const userValidation = createAsyncThunk(
    'user/validate',
    async (token, thunkAPI) => {
      try {
        const response = await userAPI.validateToken(token)
        return response.data 
      } catch (error) {
        return thunkAPI.rejectWithValue("Session Expired")
      }
    }
  )

export const getUsers = createAsyncThunk(
    'get/users',
    async (query, thunkAPI) => {
      let {token} = thunkAPI.getState().user
      if(!token) return
      const response = await userAPI.allUsers(token)
      return response.data
    }
  )



export const userState = (state) => state.user

let token = JSON.parse(localStorage.getItem("token")) || null

const initialState = {
    user: null,
    loading:false,
    error:null,
    token,
    allUsers:null,
    withUser:null,
    userModal:false,
    leftDrawer:false
}

const userSlice = createSlice({
    name:"user/all",
    initialState,
    reducers:{
      userInitial:(state) => {
        state = initialState
      },
      setWithUser: (state, action) => {
        state.withUser = action.payload
      },
      toggleUserModal:(state) => {
        state.userModal = !state.userModal
      } ,
      unsetWithUser: (state) => {
        state.withUser = null
      },
      toggleLeftDrawer: (state, action) => {
        if(action.payload === 'close') state.leftDrawer = false
        else state.leftDrawer = !state.leftDrawer
      }

    },
    extraReducers:(builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user = action.payload
                state.token = action.payload?.token
                state.error = null
                localStorage.setItem("token", JSON.stringify(action.payload.token))

            })
            .addCase(userLogin.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.error = action.payload
            })
            .addCase(userValidation.fulfilled, (state, action) => {
                state.user = action.payload
                state.error = null
            })
            .addCase(userValidation.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.error = action.payload
                localStorage.removeItem("token")
            })
            .addCase(getUsers.fulfilled, (state, action) => {
              state.allUsers = action.payload
            })
            .addCase(userRegister.fulfilled, (state, action) => {
              state.user = action.payload
              state.token = action.payload?.token
              state.error = null
              localStorage.setItem("token", JSON.stringify(action.payload.token))

          })
          .addCase(userRegister.rejected, (state, action) => {
              state.user = null
              state.token = null
              state.error = action.payload
          })
          .addCase(profileEdit.fulfilled, (state, action)=> {
            if(!action.payload) return
            state.user = action.payload
            state.error = null
          })
          .addCase(profileEdit.rejected, (state, action) => {
            state.error = action.payload
          })
    }
})

export const { userInitial, setWithUser, unsetWithUser, toggleUserModal, toggleLeftDrawer } = userSlice.actions

export default userSlice.reducer