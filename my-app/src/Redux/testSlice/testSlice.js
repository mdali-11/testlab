import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    test:[]
  }

  
export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
      fetchData: (state,action) => {
      state.test=action.payload;
     },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { fetchData } = testSlice.actions
  export default testSlice.reducer