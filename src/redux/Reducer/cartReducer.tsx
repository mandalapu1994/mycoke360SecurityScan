import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    Carts: [],
    CartLength: 0,
    ProductList: [],
    WebCart: [],
    CartSort: null,
    CartSortTitle: null,
    selectedAcc: '',
    isDataRefreshed: false,
    webStore:[]
}


export interface User {
    Id: string
    Username: string
    LastName: string
    FirstName: string
    MiddleName: any
    Suffix: any
    Name: string
    Email: string
    MobilePhone: any
    IsActive: boolean
    ContactId: string
    AccountId: string
    BottlerId__c: string
    Account:Account
}

export interface Account {
    BottlerId__c: string
    
}
export interface UserResponse {
    done: boolean
    records: User[]
    totalSize: number
}

export const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        REMOVE_ALL_CART: (state) => {

            state.Carts = []
        },
        REMOVE_SELECT_CART: (state, action) => {
            // action.payload is selected cart id
            const updatedArray = state.Carts.map((item: any) => {
                if (item.Id === action.payload) {
                    return { ...item, IsDeleted: true };
                }
                return item;
            });
            // const updateArray = state.Carts.filter((item) => item.Id != action.payload);
            state.Carts = updatedArray
        },
        ADD_To_CART: (state, action) => {
            const product = action.payload
            const existingProduct = state.Carts.find((item: any) => item.Id === product.Id);

            if (existingProduct) {
                // Replace the existing object with the new product object
                const index = state.Carts.indexOf(existingProduct);
                state.Carts[index] = product;
            } else {
                // Add the product object to the cart
                state.Carts.push(product);
            }
        },
        REPLACE_CART: (state, action) => {
            const { replacePoduct, productId } = action.payload


            const existingProduct = state.Carts.find((item: any) => item.Id === productId);

            if (existingProduct) {
                // Replace the existing object with the new product object
                const index = state.Carts.indexOf(existingProduct);
                state.Carts[index] = replacePoduct;
            }
        },
        ADD_IN_CART_QUNTITY: (state, action) => {
            const { productId, count } = action.payload
            const updatedList = state.Carts.map((product: any) => {
                console.log(product.Id, productId, 'skdbvskjd vjlsnkjvnskvksjbvk')
                if (product.Id === productId) {

                    const updatedProduct = { ...product };
                    if (updatedProduct.Quantity != undefined) {
                        updatedProduct.Quantity += count;
                        if (updatedProduct.Quantity < 0) {
                            updatedProduct.Quantity = 0;
                        }
                    } else {
                        updatedProduct.Quantity = 1;
                    }

                    return updatedProduct;
                }
                return product;
            });
            state.Carts = updatedList
        },
        REMOVE_ALL_OUT_OF_STOCK_CART: (state, action) => {

            const updatedList: any = state.Carts.filter((product: any) => !product.isOutOfStock)
            state.Carts = updatedList
        },
        REMOVE_MULTI_SELECTED_CART: (state, action) => {
            const selectedIds = action.payload
            const updatedList = state.Carts.filter((item: any) => !selectedIds.includes(item.Id));
            state.Carts = updatedList
        },
        CART_LENGTH: (state, action) => {
            state.CartLength = action.payload
        },
        SET_PRODUCT_LIST: (state, action) => {
            state.ProductList = action.payload
        },
        SET_WEBCART: (state, action) => {
            state.WebCart = action.payload
        },
        ADDSORT: (state, action) => {
            state.CartSort = action.payload
            state.CartSortTitle = action.payload.name
        },
        SELECTEDACC: (state, action) => {
            state.selectedAcc = action.payload
        },
        DATAREFRESHED: (state, action) => {
            state.isDataRefreshed = action.payload
        },
        STOREWEBSTORE:(state, action) => {
            state.webStore = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    REMOVE_ALL_CART,
    REMOVE_SELECT_CART,
    ADD_To_CART, REPLACE_CART,
    ADD_IN_CART_QUNTITY,
    REMOVE_ALL_OUT_OF_STOCK_CART,
    REMOVE_MULTI_SELECTED_CART,
    CART_LENGTH,
    SET_PRODUCT_LIST,
    SET_WEBCART,
    ADDSORT,
    SELECTEDACC,
    DATAREFRESHED,
    STOREWEBSTORE
} = cartReducer.actions

export default cartReducer.reducer