import { createSlice } from '@reduxjs/toolkit'

const initialState:any = {
  filters: [],
  mysort:null,
  mysortTitle:null,
  orderDetails:null
}

export const orderHistryReducer = createSlice({
  name: 'orderHistrySort',
  initialState,
  reducers: {
    clearOrderHistroySort: (state) => {
     
      state.mysort = null
      mysortTitle: null
    },
    

    addOrderHistroySort:(state, action) => {
      console.log("action.payload",action.payload)
      
      state.mysort = action.payload.Sorttype
      state.mysortTitle = action.payload.name
    },

    getUserSpecifics:(state, action) => {
    
      state.orderDetails = action.payload

    },

  },
})

// Action creators are generated for each case reducer function
export const { clearOrderHistroySort, addOrderHistroySort,getUserSpecifics} = orderHistryReducer.actions

export default orderHistryReducer.reducer