import { createSlice } from '@reduxjs/toolkit'

const initialState :any= {
  filters: [],
  mysort:null,
  sortTitle:null,
  createAllFilters:[],
  apiFilter:[]
}

export const filtersReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    clearAllFilter: (state) => {
        // alert("all")
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.filters = [],
      state.mysort = null,
      state.sortTitle = null
    },
    removeSelectFilter: (state, action) => {
      
        const updateArray = state.filters.filter((item:any)=>item.id != action.payload);
         console.log("remove filter as per id",updateArray,action.payload)
        state.filters = updateArray 
    },
    addFilters: (state, action) => {
       
      state.filters  = action.payload
    },
    addSort:(state, action) => {
       
      state.mysort = action.payload
      state.sortTitle = action.payload.name
    },
    SET_CREATE_ALL_FILTERS :(state, action) => {
       
      state.createAllFilters = action.payload
     
    },
    SET_API_FILTER:(state, action)=>{
      state.apiFilter =action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clearAllFilter, removeSelectFilter, addFilters ,addSort,SET_CREATE_ALL_FILTERS, SET_API_FILTER} = filtersReducer.actions

export default filtersReducer.reducer