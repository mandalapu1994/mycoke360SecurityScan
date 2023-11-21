import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './Reducer/filtersReducer'
import cartReducer from './Reducer/cartReducer';
import orderHistryReducer from './Reducer/orderHistryReducer';
import searchReducer from './Reducer/searchReducer';
import PlantProductInventoryReducer from './Reducer/PlantInventory';
import loaderReducer from './Reducer/loaderReducer';
import  UserReducer  from './Reducer/userReducer';


export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart:cartReducer,
    orderHistrySort: orderHistryReducer,
    search: searchReducer,
    plantProductInventory: PlantProductInventoryReducer,
    loader: loaderReducer,
    user:UserReducer
  },
});