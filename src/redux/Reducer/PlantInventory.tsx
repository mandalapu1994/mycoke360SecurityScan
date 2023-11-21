import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    PlantProductInventory: [],
}

export const PlantProductInventoryReducer = createSlice({
    name: 'plantProductInventory',
    initialState,
    reducers: {
        SET_PLANT_PRODUCT_INVENTORY: (state, action) => {
            state.PlantProductInventory = action.payload
        },
    },
})

export const {
    SET_PLANT_PRODUCT_INVENTORY,
} = PlantProductInventoryReducer.actions

export default PlantProductInventoryReducer.reducer