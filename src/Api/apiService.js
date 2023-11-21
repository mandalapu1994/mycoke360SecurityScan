import AsyncStorage from "@react-native-async-storage/async-storage";
import { doGet, doPost, doDelete, doPut, doGetNew } from "./api";
import { API_URL, AUTH_TOKEN, ORDER_CANCEL_API } from "@env";
// import { useDispatch, useSelector } from 'react-redux';
import { SET_CATEGORY_LIST,SET__PRODUCT_CATEGORY } from "../redux/Reducer/searchReducer";

/**doGet, doPost, doDelete, doPut  sequence of parameters--  url, body, headers */

/** Ge Request Api Services */
// const dispatch = useDispatch();

// let SF_API_BASE_URL="https://cona--sdpn009.sandbox.my.salesforce.com/services/data/v58.0/commerce/";
let SF_API_BASE_URL="https://cona--mprn002.sandbox.my.salesforce.com/services/data/v58.0/commerce/";
// let SF_API_BASE_URL="https://cona--lfln011.sandbox.my.salesforce.com/services/data/v58.0/commerce/"; //LFLN011


// QA SAP BASE URL 
let SAP_API_BASE_URL_="https://sa-cona-int-q.prod.apimanagement.us20.hana.ondemand.com/api/orderdisplay/"

// LFLN011 SAP BASE URL 
// let SAP_API_BASE_URL_="https://sa-cona-int-q.prod.apimanagement.us20.hana.ondemand.com/api/orderdisplay/"

// DEV SAP BASE_URL
// let SAP_API_BASE_URL_="https://cona-int-d.prod.apimanagement.us20.hana.ondemand.com/api/orderdisplay/"

// SAP API HEADER FOR DEV
// const ApiHeaders = {
//   "x-cona-application-key": "EpQoV0W5tKkCTX49Qj7rS493IA4HpqjT",
//   "x-cona-application-secret": "pqI5FRZAE5wmNt3f",
// };

// SAP API HEADER FOR QA
const SAPApiHeaders = {
  "x-cona-application-key": "hrrMCxmGhvVyh1FlpyD9Cv2bS7pfZPwT",
  "x-cona-application-secret": "TUAY94V0moJOl95S",
};

// SAP API HEADER FOR LFLN011
// const SAPApiHeaders = {
//   "x-cona-application-key": "hrrMCxmGhvVyh1FlpyD9Cv2bS7pfZPwT",
//   "x-cona-application-secret": "TUAY94V0moJOl95S",
// };



export const getExample = () => {
  return doGet(API_URL + "appointments/created");
};

export const UpdateCart = (updateCartRequestBody) => {
  return doPost(SAP_API_BASE_URL_ + "v5/order/simulate",updateCartRequestBody,SAPApiHeaders);
};

export const getProductImge = async (productId) => {
  const token = await AsyncStorage.getItem("userToken");
  const webstore = await AsyncStorage.getItem("webStoreData");
  const parceToken = JSON.parse(token);
  const parcewebstore =( JSON.parse(webstore))?.Id;
  // console.log("productId=--------",productId);
  const Headers = {Authorization:`Bearer ${parceToken}`}

  return doGetNew(SF_API_BASE_URL+`webstores/${parcewebstore}/products/${productId}`,{},Headers);
};


 export const getProductList = async(webStoreId,categoryId,accountFocus) => {

  const token = await AsyncStorage.getItem("userToken");
  // const webstore = await AsyncStorage.getItem("webStoreData");
  let onAccountSwitched = await AsyncStorage.getItem("selectedAcc")? await AsyncStorage.getItem("selectedAcc"):""
  
  let parseObj= await JSON.parse(onAccountSwitched)

  let switchedAccountId=parseObj?.Id

  const userIdentity = await AsyncStorage.getItem("userIdentity");
  const parceToken = JSON.parse(token);
  const webstoreId = webStoreId;
  const accountId = JSON.parse(userIdentity)?.accountId;
  const finalAccountIdForAPI = switchedAccountId ? switchedAccountId : accountId
  // const accountId = accountFocus.Id
  const Headers = {Authorization:`Bearer ${parceToken}`}
  // console.log("webStoreData!!",webstoreId);
  // console.log("categoryId!!",categoryId);
  // console.log("accountId!!",accountId);
  return doGet(SF_API_BASE_URL+`webstores/${webstoreId}/search/products?effectiveAccountId=${finalAccountIdForAPI}&categoryId=${categoryId}`,{},Headers);

};

export const getProductsBySKUWithImge = async(webStoreId,skuList) => {
  const token = await AsyncStorage.getItem("userToken");
  const webstore = await AsyncStorage.getItem("webStoreData");
  const parceToken = JSON.parse(token);
  const parcewebstore =( JSON.parse(webstore))?.Id;

  const params = {skus : skuList.join(',')}
  // console.log("params=))",params);
  const Headers = {Authorization:`Bearer ${parceToken}`}

  return doGet(SF_API_BASE_URL+`webstores/${webStoreId}/products`,params,Headers);
};

export const getCategoryList = async(dispatch) => {
  const token = await AsyncStorage.getItem("userToken");
  const webstoreData = await AsyncStorage.getItem("webStoreData");
  const webStore = JSON.parse(webstoreData);
  const parceToken = JSON.parse(token);
  const Headers = {Authorization:`Bearer ${parceToken}`}

  
  // console.log('Headers',Headers)
  // console.log('webStore',webStore)

  const categoryDataList = await doGet(SF_API_BASE_URL+`webstores/`+webStore.Id+`/product-categories/children`,{},Headers);
  // sdpn009.sandbox.my.salesforce.com/services/data/v58.0/commerce/webstores/0ZE8M000000Gmn8WAC/product-categories/children
  // console.log('getCategoryList++++',JSON.stringify(categoryDataList))

  // console.log('getCategoryList++++',JSON.stringify(categoryDataList))

  dispatch(SET_CATEGORY_LIST(categoryDataList?.productCategories))

  if(categoryDataList.productCategories.length > 0){
  
  let obj ={
    id:categoryDataList.productCategories[0].id,
    Name: categoryDataList.productCategories[0].fields.Name
}
// console.log(">>>>>setProductCategory",obj)
  dispatch(SET__PRODUCT_CATEGORY(obj));
  }
};
// const parcewebstore = JSON.parse(webstore)?.Id;
// // console.log("productId=",productId,"parcewebstore=",parcewebstore);
// const Headers = { Authorization: `Bearer ${parceToken}` };

// return doGetNew(
//   `https://cona--sdpn009.sandbox.my.salesforce.com/services/data/v58.0/commerce/webstores/0ZE8M000000GmmoWAC/products/${productId}`,
//   {},
//   Headers
// );


/**Post Request Api Services */

export const postExample = (bodyParams) => {
  const headers = {
    "x-cona-application-key": "EpQoV0W5tKkCTX49Qj7rS493IA4HpqjT",
    "x-cona-application-secret": "pqI5FRZAE5wmNt3f",
  };
  // console.log("bodyParams =>", bodyParams);
  return doPost(ORDER_CANCEL_API, bodyParams, headers);
};

/** Delete Request Api Services*/
export const deletExample = (ids) => {
  return doDelete(API_URL + `notifications/setDelete`, ids);
};

/** Put request Api Services*/

export const putExample = (appointment, id) => {
  return doPut(API_URL + `appointments/${id}`, appointment);
};

/*End here*/

export const postCreateCartItem = async (
  webStoreId,
  cartId,
  accountId,
  bodyObject
) => {
  const token = await AsyncStorage.getItem("userToken");
  const parceToken = JSON.parse(token);

  const Headers = { Authorization: `Bearer ${parceToken}` };


  // console.log(webStoreId, cartId, accountId, bodyObject, Headers);
  return doPost(
    SF_API_BASE_URL+`webstores/${webStoreId}/carts/${cartId}/cart-items?effectiveAccountId=${accountId}`,
    bodyObject,
    Headers
  );
};

export const postCreateWebCart = async (webStoreId, bodyObject) => {
  const token = await AsyncStorage.getItem("userToken");
  const parceToken = JSON.parse(token);

  const Headers = {
    Authorization: `Bearer ${parceToken}`,
  };

  // console.log(webStoreId, bodyObject,Headers, "WEB CART API DATA111------------------");

  return doPost(
    SF_API_BASE_URL+`webstores/${webStoreId}/carts`,
    bodyObject,
    Headers
  );
};




