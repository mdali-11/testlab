import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: (typeof window !== 'undefined'?localStorage.getItem("user"):"")||{},
    token:(typeof window !== 'undefined'?localStorage.getItem("token"):"")||"",
    testSeries:[]
  }

  
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginSuccess: (state,action) => {
        localStorage.setItem("user",JSON.stringify(action.payload.user))
        localStorage.setItem("token",action.payload.token)
        state.user=action.payload.user;
        state.token=action.payload.token;
      },
      loginFailed: (state) => {
        localStorage.setItem("user",{})
        localStorage.setItem("token","")
        state.user={};
        state.token="";
      },
      logoutSuccess: (state) => {
        localStorage.setItem("user",{})
        localStorage.setItem("token","")
        state.user={};
        state.token="";
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { loginSuccess,loginFailed,logoutSuccess } = userSlice.actions
  
  export default userSlice.reducer