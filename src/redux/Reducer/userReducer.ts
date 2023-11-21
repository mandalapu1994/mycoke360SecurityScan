import { createSlice } from '@reduxjs/toolkit'

const initialState :any= {
userDetails : null
}

export const UserReducer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    SET_USER_DETAILS: (state, action) => {
         state.userDetails = action.payload 
      },
   
  },
});

// Action creators are generated for each case reducer function
export const {SET_USER_DETAILS} = UserReducer.actions ;

export default UserReducer.reducer ;