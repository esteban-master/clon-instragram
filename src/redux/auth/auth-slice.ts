import { createSlice, createAction } from '@reduxjs/toolkit'

export interface Login {
  token: string | undefined
  user: User | undefined
}

export interface User {
  _id: string
  username: string
  name: string
  email: string
  avatar: null
  createdAt: string
  followers: number
  following: number
  desc: null
  siteWeb: null
}

export interface StateAuth {
  login: Login
  logged: boolean
}

const initialState: StateAuth = {
  login: {
    token: undefined,
    user: undefined
  },
  logged: false
}
export const loginAction = createAction<Login>('login')
export const logoutAction = createAction('logout')

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction, (state, action) => {
        state.login = action.payload
        state.logged = true
      })
      .addCase(logoutAction, (state) => {
        state.logged = false
        state.login = {
          token: undefined,
          user: undefined
        }
      })
  }
})

export default authSlice.reducer
