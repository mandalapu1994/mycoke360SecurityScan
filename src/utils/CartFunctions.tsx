import { DeviceEventEmitter } from "react-native";
import { createUpdateSoup } from "../Salesforce/SmartStore";
import { syncData } from "../Salesforce/SmartSync";
import { store } from "../redux/store";
import { CART_LENGTH } from "../redux/Reducer/cartReducer";
import { SET_LOADER } from "../redux/Reducer/loaderReducer";

// const createCartItemUsingAPI = (webStoreId: any, cartId: any, selectedAccId: any, bodyObject: any) => {

//     postCreateCartItem(webStoreId, cartId, selectedAccId, bodyObject)
//         .then((res) => {
//             console.log(res, 'res----')
//         })
//         .catch((err) => {
//             console.log(err, 'err-----')
//         })

// }

// export const AddToCartWithApi = (item: any, cartId: any, cartDeliveryGroupId: any, cartItems: any, webStoreId: any, selectedAccId: any) => {

//     const bodyObject = {
//         "productId": item.Id,
//         "quantity": item.Quantity,
//         "type": "Product"
//     }
//     createCartItemUsingAPI(webStoreId, cartId, selectedAccId, bodyObject)
// };

export const AddToCartFunc = (item: any, cartId: any, cartDeliveryGroupId: any, cartItems: any, webStoreId: any, selectedAccId: any) => {
    store.dispatch(SET_LOADER(true))
    if (item && cartItems) {

        let foundProductinCart = cartItems.filter((cartItem: any) => cartItem.Product2Id === item.Id)
        console.log(foundProductinCart, 'founmd in cart----------------')
        if (foundProductinCart.length > 0) {
            let productWithQuantityChange = { ...item, Quantity: (item.Quantity + foundProductinCart[0].Quantity) }
            updateCartItem(productWithQuantityChange, 'product')
        }
        else {
            const updatedDetails = {
                CartId: cartId,
                Name: item.Name,
                Product2Id: item.Id,
                Quantity: item.Quantity,
                Sku: item.StockKeepingUnit,
                CartDeliveryGroupId: cartDeliveryGroupId, // if removed \"REQUIRED_FIELD_MISSING\",\"message\":\"Required fields are missing: [CartDeliveryGroupId]\

                __local__: true,
                __locally_created__: true,
                __locally_updated__: false,
                __locally_deleted__: false,
                attributes: { type: "CartItem" }
            }
            item.Quantity > 0 && createUpdateSoup(
                updatedDetails,
                'CartItem',
                (addProductToCart: any) => {
                    console.log('Contact Created successfully:', addProductToCart);
                    // getCartItem()

                    const bodyObject = {
                        "productId": item.Id,
                        "quantity": item.Quantity,
                        "type": "Product"
                    }

                    // createCartItemUsingAPI(webStoreId, cartId, selectedAccId, bodyObject)
                    store.dispatch(SET_LOADER(false))
                    syncData()
                },
                (error: any) => {
                    console.log('Error updating contact:', error);
                    store.dispatch(SET_LOADER(false))
                }
            );
        }

    } else {
        return "";
    }
};

export const updateCartItem = (selectedProduct: any, componentName: string) => {

    store.dispatch(SET_LOADER(true))
    // if (selectedProduct.relatedCartData.StockKeepingUnit) extraParams.Sku = selectedProduct.StockKeepingUnit;
    // if (selectedProduct.relatedCartData.TotalPrice) extraParams.TotalPrice = selectedProduct.TotalPrice;
    // if (selectedProduct.relatedCartData.UnitAdjustedPrice) extraParams.UnitAdjustedPrice = selectedProduct.UnitAdjustedPrice;

    const updatedDetails = {
        // CartId: selectedProduct.CartId,
        Id: selectedProduct.Id,
        IsDeleted: selectedProduct.IsDeleted,
        LastModifiedDate: selectedProduct.LastModifiedDate,
        Name: selectedProduct.Name,
        Product2Id: selectedProduct.Product2Id,
        Quantity: selectedProduct.Quantity,
        Sku: selectedProduct.StockKeepingUnit,
        TotalPrice: selectedProduct.TotalPrice,
        UnitAdjustedPrice: selectedProduct.UnitAdjustedPrice,
        _soupEntryId: selectedProduct._soupEntryId,
        __local__: true,
        __locally_created__: false,
        __locally_updated__: true,
        __locally_deleted__: false,
        attributes: { type: "CartItem" },
    };
    createUpdateSoup(
        updatedDetails,
        "CartItem",
        (updatedContact: any) => {
            console.log("CarItem updated successfully:", updatedContact);
            store.dispatch(SET_LOADER(false))
            syncData()
        },
        (error: any) => {
            console.log("Error updating CarItem:", error);
            store.dispatch(SET_LOADER(false))
        }
    );
};

export const deleteCartItem = (selectedProduct: any) => {
    store.dispatch(SET_LOADER(true))
    const updatedDetails = {
        // CartId: selectedProduct.CartId,
        Id: selectedProduct.Id,
        IsDeleted: true,
        LastModifiedDate: selectedProduct.LastModifiedDate,
        Name: selectedProduct.Name,
        Product2Id: selectedProduct.Product2Id,
        Quantity: selectedProduct.Quantity,
        Sku: selectedProduct.Sku,
        // TotalAmount: selectedProduct.TotalAmount,
        TotalPrice: selectedProduct.TotalPrice,
        UnitAdjustedPrice: selectedProduct.UnitAdjustedPrice,
        _soupEntryId: selectedProduct._soupEntryId,
        __local__: true,
        __locally_created__: false,
        __locally_updated__: false,
        __locally_deleted__: true,
        attributes: { type: "CartItem" }
    }
    createUpdateSoup(
        updatedDetails,
        'CartItem',
        (updatedCart: any) => {
            console.log('CarItem DELETED successfully:', updatedCart);
                        DeviceEventEmitter.emit('Deleted_Success', { data: selectedProduct })
            syncData()

            const storeData: any = store.getState()

            store.dispatch(CART_LENGTH(storeData.cart.CartLength - 1))
            store.dispatch(SET_LOADER(false))
            // setFinalCartItem((prev) =>
            //     prev.filter((product: any) => product.Id !== selectedProduct.Id)
            // );
        },
        (error: any) => {
            console.log('Error updating CarItem:', error);
            store.dispatch(SET_LOADER(false))
        }
    );
}
