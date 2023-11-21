import { createSlice } from '@reduxjs/toolkit'

const initialState :any= {
 searchText:"",
 productCategory:{},
 categoryList :[]
}

export const searchReducer = createSlice({
  name: 'search',
  initialState,
  reducers: {
    SEARCH_TEXT: (state, action) => {
         state.searchText = action.payload 
      },
      SET__PRODUCT_CATEGORY: (state, action) => {
        state.productCategory = action.payload 
     },
     SET_CATEGORY_LIST: (state, action) => {
      state.categoryList = action.payload 
      
   },
  },
})

// Action creators are generated for each case reducer function
export const {SEARCH_TEXT,SET__PRODUCT_CATEGORY,SET_CATEGORY_LIST} = searchReducer.actions

export default searchReducer.reducer