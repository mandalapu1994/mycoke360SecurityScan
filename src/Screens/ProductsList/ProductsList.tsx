import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
   FlatList,
   SafeAreaView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   TouchableHighlight,
   View,
   ScrollView,
   Image,
   Button,
   Pressable,
   ImageBackground,
   TouchableWithoutFeedback,
   DeviceEventEmitter,
   TextInput,
   NativeModules,
   Modal as ReactNativeModal,
   PermissionsAndroid,
   Linking,
   Alert,
   Platform
} from 'react-native';
import DeviceInfo from 'react-native-device-info'
// import styles from "./styles";
import MenuIcon from "../../assets/images/MenuIcon";
import SearchIcon from "../../assets/images/SearchIcon";
import AddToCart from "../../assets/images/AddToCart";
import PlusIcon from "../../assets/images/PlusIcon";
import MinusIcon from "../../assets/images/MinusIcon";
import SortIcon from "../../assets/images/SortIcon";
import SearchBar from '../../components/SearchBar';
import { SelectList } from 'react-native-dropdown-select-list';
import FilterIcon from "../../assets/images/FilterIcon";
import DownArrow from "../../assets/images/DownArrow";
import VerticalLine from "../../assets/images/VerticalLine";
import SaveCard from "../../assets/images/SaveCard";
import Cross from "../../assets/images/Cross";
import FooterComponent from '../../components/FooterComponent';
import TopTabsMultiple from '../../components/TopTabsMultiple';
import OrderBuilder from '../OrderBuilder';
import ShoppingList from '../ShoppingList';
import { useDispatch, useSelector } from 'react-redux';
import { SET_API_FILTER, SET_CREATE_ALL_FILTERS, clearAllFilter, removeSelectFilter } from '../../redux/Reducer/filtersReducer';
import { useTranslation } from "react-i18next";
import ProductListIcon from "../../assets/images/ProductListIcon";
import OrderBuilderIcon from "../../assets/images/OrderBuilderIcon";
import ShopListIcon from "../../assets/images/ShopListIcon";
import DownArrowBroad from "../../assets/images/DownArrowBroad";
import styles from './styles';
import Modal from 'react-native-modal';
// import AddToCart from '../../utils/AddToCart'
import { SheetProvider, SheetManager } from 'react-native-actions-sheet';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import Header from '../../components/Header';
import { ADD_To_CART, CART_LENGTH, SELECTEDACC, SET_PRODUCT_LIST, SET_WEBCART, STOREWEBSTORE } from '../../redux/Reducer/cartReducer';
// import { ProductList } from '../../utils/DumProductListData';
import { oauth, net } from 'react-native-force';
import { querySoup, createUpdateSoup, clearSoup, clearSoups } from '../../Salesforce/SmartStore';
import FilterComponent from './FiltterComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddToCartFunc } from '../../utils/CartFunctions';
import { SET_PLANT_PRODUCT_INVENTORY } from '../../redux/Reducer/PlantInventory';
import { syncData, syncDownCartDeliveryGroup, syncDownCartItem, syncDownFull, syncDownPlantProductInventory } from '../../Salesforce/SmartSync';
import { getProductImge, getProductList, getProductsBySKUWithImge, postCreateCartItem, postCreateWebCart } from '../../Api/apiService';
import { checkPermission, imgAccessPath } from '../../components/ImageDownload/ImageDownload';
import ProductItem from '../../components/ProductCard/ProductItem';
// import { checkPermission, imgAccessPath } from '../../components/ImageDownload/ImageDownload';
// import ProductItem from '../../components/ProductCard/ProductItem';
import { getAssortmentIds, getAssortmentIdsArray, getProductsBySKU, getSKUData, getUniqueSKUs } from './helper';
import { getAssortmentProductsList } from '../../Salesforce/SmartSync';
import CloseIcon from '../../assets/images/Close'
import { SET_LOADER } from '../../redux/Reducer/loaderReducer';
import Loader from '../../components/Loader/loader';
import FilterComponent2 from './FilterComponent2';
import { Toaster } from '../../components/Toaster/toaster';
import { SET_USER_DETAILS } from '../../redux/Reducer/userReducer';
import { getUserDetails } from '../../utils/User';
import { createFiltersFormApi, getMatchValue } from '../../utils/FiltterEnum';
import { store } from '../../redux/store';

interface Product {
   id: any;
   Name: any;
   MaterialIdNumber__c: any;
   stock: any;
   quantity: any;
}
interface Props {
   navigation: any;
   route: any;
}
const CURRENT009 :Boolean= false  //True for SDPN009
export const ProductsList: React.FC<Props> = ({ navigation, route }) => {


   const myFilters = useSelector((state: any) => state.filters.filters);
   const mySort = useSelector((state: any) => state.filters.mysort);
   const mySortTitle = useSelector((state: any) => state.filters.sortTitle);
  const accountFocus = useSelector((state: any) => state.cart.selectedAcc);
  const AllFilters = useSelector((state: any) => state.filters.apiFilter); 
  

   const dispatch = useDispatch();
   const [selected, setSelected] = useState<any>("");
   const [searchedText, setSearchedText] = useState<any>('');
   const [productList, setProductList] = useState<any[]>([]);
   const [productListsearch, setProductListsearch] = useState<any[]>([]);
   const [firstRenderLength, setFirstRenderLength] = useState<any>(3);
   const [productListLength, setProductListLength] = useState<any>(firstRenderLength);
   const [productCategory, setProductCategory] = useState<any[]>([]);
   const [modalVisible, setModalVisible] = useState(false);
   const [deviceVersion, setDeviceVersion] = useState(DeviceInfo.getSystemVersion())
   const [cartId, setCartId] = useState<any>()
   const [cartDeliveryGroupId, setCartDeliveryGroupId] = useState<any>()
   const [cartItems, setCartItems] = useState<any[]>([])
   const searchText = useSelector((state: any) => state.search.searchText);
   const PLP_Category = useSelector((state: any) => state.search.productCategory);
   const [plantProductInventory, setPlantProductInventory] = useState<any[]>([])
   const [selectedAccountId, setSelectedAccountId] = useState<any>('')
   const [userData, setUserData] = useState<any[]>([])
   const [selectedAccountData, setSelectedAccountData] = useState<any>()
   const [webStore, setWebStore] = useState<any>()
   const focus = useIsFocused();
   const { t } = useTranslation();

   const [storeAssortment, setStoreAssortment] = useState<any[]>([]);
   const [assortment, setAssortment] = useState<any[]>([]);
   const [productSKU, setProductSKU] = useState<any[]>([]);
   const [AMLProductList, setAMLProductList] = useState<any[]>([]);
   const cartLength = useSelector((state: any) => state.cart.CartLength);
   const [addToCartModal, setAddToCartModal] = useState<boolean>(false)
   const loader = useSelector((state: any) => state.loader.isLoaderVisible);
   const isDataRefreshed = useSelector((state: any) => state.cart.isDataRefreshed);
   const webStoreID = useSelector((state: any) => state.cart.webStore);

   const [mainProductList, setMainProductList] = useState<any[]>([])
   const [productData,setProductData]=useState<any[]>([])




 useEffect(()=>{
   if(CURRENT009){

      createFiltersFormApi(AllFilters,productData)
   }
 
 },[productData])






   useEffect(() => {

      const getProductList = async () => {
         try {
            setProductList([])
            setMainProductList([])
            const webStoreData: any = await AsyncStorage.getItem('webStoreData');
            const webStore = JSON.parse(webStoreData);
            fetchProductListData(webStore.Id)
         }
         catch (err) {
         }
         // console.log("accountFocus =>",accountFocus)
      }
      getProductList()
      
   }, [PLP_Category,accountFocus])


   useEffect(() => {
      // applyFilterAndSort(ProductList);
      // fetchingProductList();
      // getDataFromStore(selectedAccountId)
      // getProductFromStore(cartItems, plantProductInventory) //PL
      // getCartItem();
      console.log("useEffetct Apply sort ==");
      if(searchText == null || searchText == ""){
         applyFilterAndSort(productData);

      }else{
         searchByName(searchText)

      }
   }, [ mySort,myFilters,searchText]);

   useEffect(() => {
      // getUserData()
      // getCartItem();
    
      getUserDetails();
      getUserDetailsFromLocal();

   }, [isDataRefreshed])

   // useEffect(() => {
   //    searchByName(searchText)
   // }, [searchText])

   useEffect(() => {

      if (mainProductList && plantProductInventory) {
         const productListWithStockStatus = checkforOutandInStock(mainProductList, plantProductInventory)


         applyFilterAndSort(productListWithStockStatus)
      }

   }, [mainProductList, plantProductInventory])


   const [imageUrls, setImageUrls] = useState<any>({});

   let userIDD = ''

   const getUserDetailsFromLocal = async () => {
      let user: any = await AsyncStorage.getItem('userIdentity')
      let parsedUserId = JSON.parse(user)
      userIDD = parsedUserId?.userId
      saveUserData(JSON.parse(user));
   }

   useEffect(() => {
      setTimeout(() => {
         fetchImageUrls();
      }, 1000)
   }, [])


   const askStoragePermission = async () => {
      try {
         const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
               title: 'Storage Permission',
               message: 'App needs access to your storage to read files',
               buttonPositive: 'OK',
            },
         );
         if (result === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage Permission Granted.');
         } else if (result === PermissionsAndroid.RESULTS.DENIED) {
            console.log('Storage Permission Denied with Reject.');
            Alert.alert(
               'Storage Permission Required',
               'You need to give storage permission to download the file',
               [
                  // { text: 'Cancel', style: 'cancel' },
                  { text: 'Open Settings', onPress: openSettings },
               ],
            );
         } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Storage Permission Denied with Never Ask Again.');
            Alert.alert(
               'Storage Permission Required',
               'You need to give storage permission to download the file ===========>',
               [
                  // { text: 'Cancel', style: 'cancel' },
                  { text: 'Open Settings', onPress: openSettings },
               ],
            );
         }
      } catch (err) {
         console.log(err);
      }
   };

   const openSettings = () => {
      Linking.openSettings();
    };

    const getAllProducts = ( ) => {
      
    }
   const fetchProductListData = async(webStore:any) =>{
      try {
         // const webStoreData: any = await AsyncStorage.getItem('webStoreData');
         // const webStore = JSON.parse(webStoreData);
         const CategoryId = PLP_Category.id
         if(webStore != null && CategoryId){
            const ProductList: any = await getProductList(webStore,CategoryId,accountFocus)
         
         //   Added Filters in  filterReducer, use in  Filter component (ps)
            if(ProductList.facets){
               let Uid: number = 1
               const added_Id_In= ProductList.facets.length > 0 ? ProductList.facets.map((item:any)=>{
                 
                  const Values =  item.values.map((child:any)=>{
                     Uid++
                    
                         return {...child,id:Uid,nameOrId:item.nameOrId,mainDisplayName:item.displayName}
                  })
                  Uid++
                  return {...item,id:Uid,values:Values}
               }):[]
              
              
               if(CURRENT009){
                   dispatch( SET_API_FILTER(added_Id_In))
               }else{
                   dispatch(SET_CREATE_ALL_FILTERS(added_Id_In));
               }
             }
             
            if(ProductList && ProductList.productsPage.products.length > 0){
               const getSKUlist = getSKUData(ProductList.productsPage.products)


               const allNull = getSKUlist.every((element) => element === null);
               if (allNull) {
                  clearAssortmentProductSoup([], [])
                  setProductList([]);
               }else{
                  saveAssortmentProductDataFromQuery(getSKUlist)
                  // querySoup('StoreAssortment', (success: any) => saveStoreAssortmentData(success), (error: any) => console.log("querySoup----error", error), "Id");
                  // querySoup('Assortment', (success: any) => saveAssortmentData(success,getSKUlist), (error: any) => console.log("querySoup----error", error), "Id");
               }

               // querySoup('StoreAssortment', (success: any) => saveStoreAssortmentData(success), (error: any) => console.log("querySoup----error", error), "Id");
               // querySoup('Assortment', (success: any) => saveAssortmentData(success,getSKUlist), (error: any) => console.log("querySoup----error", error), "Id");
            }
            else {
               // setAMLProductList([])
               setProductList([])
            }
         }



      } catch (error) {
         console.error('Error fetching data:fetchProductListData', error);
      }
   }
   // Define an async function to fetch image URLs
   const fetchImageUrls = async () => {
      if (Platform.OS === 'ios') {
         console.log('IOS device permission code required')
         const newImageUrls: any = {};
                  // Use Promise.all to fetch image URLs for all items in parallel
                  // console.log("AMLProductList=fetchImageUrls", AMLProductList)
                  await Promise.all(
                     AMLProductList.map(async (product) => {
                        try {
                           // console.log("product=fetchImageUrls", product)
                           // getProductImage function callApi  and get perticular product image url in response obj
                           getProductImge(product.id).then((res: any) => {
                              // newImageUrls[item.Id] = res?.defaultImage?.url
                              if (res?.mediaGroups.length > 0) {
                                 res?.mediaGroups.forEach((imgObject: any, mainInd: number) => {
                                    if (imgObject?.mediaItems.length > 0) {
                                       imgObject?.mediaItems.forEach((item: any, subInd: number) => {

                                          if (item.url && (res.defaultImage.url).startsWith("http")) {
                                             //   checkPermisttion function check permission for meadia and download image in device
                                             console.log("checkPermission CALL")
                                             checkPermission(product.Id, res.defaultImage.url, `${mainInd}_${subInd}`);
                                          }

                                       })
                                    }
                                 });
                              }
                           });
                        } catch (error) {
                           console.error(`Error fetching image URL for ID:`, error);
                        }
                     })
                  );

                  // Update the state with the fetched image URLs with Product Id 
                  setImageUrls(newImageUrls);
      } else {
         let newVersion = deviceVersion.toString()
         let checkVersion = newVersion > '12'
         if (checkVersion) {
            try {
               const result = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                  // {
                  //   title: 'Storage Permission',
                  //   message: 'App needs access to your storage to read files',
                  //   buttonPositive: 'OK',
                  // },
                  // {
                  //    title: 'Storage Permission',
                  //    message:
                  //      'App needs access to your storage in order to display actual product images.',
                  //    buttonNeutral: 'Ask Me Later',
                  //    buttonNegative: 'Cancel',
                  //    buttonPositive: 'OK',
                  //  },
               );
               if (result === PermissionsAndroid.RESULTS.GRANTED) {
                  Toaster("Permission Accepted")
                  const newImageUrls: any = {};
                  // Use Promise.all to fetch image URLs for all items in parallel
                  // console.log("AMLProductList=fetchImageUrls", AMLProductList)
                  await Promise.all(
                     AMLProductList.map(async (product) => {
                        try {
                           // console.log("product=fetchImageUrls", product)
                           // getProductImage function callApi  and get perticular product image url in response obj
                           getProductImge(product.id).then((res: any) => {
                              // newImageUrls[item.Id] = res?.defaultImage?.url
                              if (res?.mediaGroups.length > 0) {
                                 res?.mediaGroups.forEach((imgObject: any, mainInd: number) => {
                                    if (imgObject?.mediaItems.length > 0) {
                                       imgObject?.mediaItems.forEach((item: any, subInd: number) => {

                                          if (item.url && (res.defaultImage.url).startsWith("http")) {
                                             //   checkPermisttion function check permission for meadia and download image in device
                                             console.log("checkPermission CALL")
                                             checkPermission(product.Id, res.defaultImage.url, `${mainInd}_${subInd}`);
                                          }

                                       })
                                    }
                                 });
                              }
                           });
                        } catch (error) {
                           // console.error(`Error fetching image URL for ID:`, error);
                        }
                     })
                  );

                  // Update the state with the fetched image URLs with Product Id 
                  setImageUrls(newImageUrls);
               } else {
                  Toaster("Permission Rejected")
                  console.log('Storage Permission Denied with ' + result);
                  Alert.alert(
                     'Storage Permission Required',
                     'You need to give storage permission to download and display product images. \n \n 1. Click open settings and select the permissions, \n 2. Select storage permissions or Photos and video option. \n 3. Click on allow.',
                     [
                        { text: 'Open Settings', onPress: openSettings },
                     ],
                  );
               }
            } catch (error) { console.log(error) }
         } else {
            try {
               const result = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                  // {
                  //   title: 'Storage Permission',
                  //   message: 'App needs access to your storage to read files',
                  //   buttonPositive: 'OK',
                  // },
                  // {
                  //    title: 'Storage Permission',
                  //    message:
                  //      'App needs access to your storage in order to display actual product images.',
                  //    buttonNeutral: 'Ask Me Later',
                  //    buttonNegative: 'Cancel',
                  //    buttonPositive: 'OK',
                  //  },
               );
               if (result === PermissionsAndroid.RESULTS.GRANTED) {
                  Toaster("Permission Accepted")
                  const newImageUrls: any = {};
                  // Use Promise.all to fetch image URLs for all items in parallel
                  // console.log("AMLProductList=fetchImageUrls", AMLProductList)
                  await Promise.all(
                     AMLProductList.map(async (product) => {
                        try {
                           // console.log("product=fetchImageUrls", product)
                           // getProductImage function callApi  and get perticular product image url in response obj
                           getProductImge(product.id).then((res: any) => {
                              // newImageUrls[item.Id] = res?.defaultImage?.url
                              if (res?.mediaGroups.length > 0) {
                                 res?.mediaGroups.forEach((imgObject: any, mainInd: number) => {
                                    if (imgObject?.mediaItems.length > 0) {
                                       imgObject?.mediaItems.forEach((item: any, subInd: number) => {

                                          if (item.url && (res.defaultImage.url).startsWith("http")) {
                                             //   checkPermisttion function check permission for meadia and download image in device
                                             console.log("checkPermission CALL")
                                             checkPermission(product.Id, res.defaultImage.url, `${mainInd}_${subInd}`);
                                          }

                                       })
                                    }
                                 });
                              }
                           });
                        } catch (error) {
                           console.error(`Error fetching image URL for ID:`, error);
                        }
                     })
                  );

                  // Update the state with the fetched image URLs with Product Id 
                  setImageUrls(newImageUrls);
               } else {
                  Toaster("Permission Rejected")
                  // console.log('Storage Permission Denied with ' + result);
                  Alert.alert(
                     'Storage Permission Required',
                     'You need to give storage permission to download and display product images. \n \n 1. Click open settings and select the permissions, \n 2. Select storage permissions or Photos and video option. \n 3. Click on allow.',
                     [
                        { text: 'Open Settings', onPress: openSettings },
                     ],
                  );
               }
            } catch (error) { console.log(error) }
         }

      };
   }
   const saveUserData = (data: any) => {
    
      if (data) {
         setUserData(data)

         setSelectedAccountId(data?.accountId)

         getAccountInfo(data)
      }
   };


   const getAccountInfo = async (userDatafromQuery: any) => {

      let userData = userDatafromQuery;

      let accountDataFromAsyncStorage = await AsyncStorage.getItem("selectedAcc")
      let parsedAccount = accountDataFromAsyncStorage ? JSON.parse(accountDataFromAsyncStorage) : undefined

      if (parsedAccount) {

         console.log(parsedAccount, 'i parsed-----------------')
       
         setSelectedAccountId(parsedAccount?.Id)

         syncDownPlantProductInventory(parsedAccount?.DeliveryPlant__c)
         setTimeout(() => {
            getPlantProductInventoryData(parsedAccount?.Id, userData?.contactId)
         }, 1000)

      }
      else {
         console.log('not in parsed-----------------')


         // const userIdentity: any = await AsyncStorage.getItem('userIdentity')
         // const AccountID = userIdentity ? JSON.parse(userIdentity).accountId : undefined

         dispatch(SELECTEDACC(userData?.accountId))

         getAccountData(userData)
         setSelectedAccountData(userData?.accountId);
         // getDataFromStore(userData?.accountId, userData?.contactId)

      }
   }

   // let SKUListArray: string[] = []
   // let product2Array: string[] = []

   // const saveProduct2Data = (data: any) => {
   //    applyFilterAndSort(data.currentPageOrderedEntries);
   //    createFilters(data.currentPageOrderedEntries)
   //    product2Array = data.currentPageOrderedEntries
   //    if (data.currentPageOrderedEntries) {
   //       const SKUList = getSKUData(data.currentPageOrderedEntries)
   //       if (SKUList.length > 0) {

   //          setProductSKU(SKUList)
   //          SKUListArray = SKUList
   //       }
   //    }

   // };

   let storeAssortmentData: never[] = []
   let assortmentData: never[] = []

   const saveStoreAssortmentData = (data: any) => {
      if (data.currentPageOrderedEntries) {
         setStoreAssortment(data.currentPageOrderedEntries)
         storeAssortmentData = data.currentPageOrderedEntries
      }

   };

   const saveAssortmentData = (data: any, getSKUlist: any) => {
      if (data.currentPageOrderedEntries) {
         setAssortment(data.currentPageOrderedEntries)
         assortmentData = data.currentPageOrderedEntries
         checkIsDataAvailable(getSKUlist)
      }
   };

   // if(storeAssortmentData && assortmentData) {
   const checkIsDataAvailable = (getSKUlist: any) => {

      // if(storeAssortmentData && assortmentData){
      const assortmentIds = getAssortmentIds(storeAssortmentData, assortmentData)

      if (assortmentIds.length > 0) {
         const AssortmentIdsArray = getAssortmentIdsArray(assortmentIds)
         if (AssortmentIdsArray.length > 0) {
            getAssortmentProductData(AssortmentIdsArray, getSKUlist)
         }
      }
      // }
   }



   // const getDataFromStore = () => {
   //     querySoup('product2', (success: any) => saveProduct2Data(success), (error: any) => console.log("querySoup----error", error), "Name");
   //     querySoup('StoreAssortment', (success: any) => saveStoreAssortmentData(success), (error: any) => console.log("querySoup----error", error), "Id");
   //     querySoup('Assortment', (success: any) => saveAssortmentData(success), (error: any) => console.log("querySoup----error", error), "Id"); 
   // };

   const getAssortmentProductData = async (AssortmentIdsArray: string[], getSKUlist: any[]) => {
      await clearAssortmentProductSoup(getSKUlist, AssortmentIdsArray)

   }

   const clearAssortmentProductSoup = (getSKUlist: any[], AssortmentIdsArray: string[]) => {
      clearSoup((success: any) => clearSoupSuccessResponse(success, getSKUlist, AssortmentIdsArray), (error: any) => console.log("clearSoupSuccessResponse----error", error))
   }

   const clearSoupSuccessResponse = async (success: any, getSKUlist: any[], AssortmentIdsArray: string[]) => {

      await getAssortmentProductsList(getSKUlist, AssortmentIdsArray)
      setTimeout(() => {
         getAssortmentProductDataFromStore()
      }, 2000)
   }

   const getAssortmentProductDataFromStore = () => {
      querySoup('AssortmentProduct', (success: any) => saveAssortmentProductDataFromQuery(success), (error: any) => console.log("querySoup----error", error), "Name");

   };

   const saveAssortmentProductDataFromQuery = async(data: any) => {
   
      // if (data.currentPageOrderedEntries.length > 0) {
      //    const finalSKUList = getUniqueSKUs(data.currentPageOrderedEntries)
       
         //// passing sku list to api and get productlist details
         if (data.length > 0) {
            const webStoreData: any = await AsyncStorage.getItem('webStoreData');
            const webStore = JSON.parse(webStoreData);
       
         if(webStore != null){
            const finalProductList:any = await getProductsBySKUWithImge(webStore.Id,data)
         
            const filteredData = finalProductList.products.filter((item: { fields: {}; }) => Object.keys(item.fields).length > 0);
            // setAMLProductList(filteredData);
          
            dispatch(SET_PRODUCT_LIST(filteredData));
          
            setProductData(filteredData);
           
            applyFilterAndSort(filteredData)
            setMainProductList(filteredData)
            // applyFilterAndSort(filteredData)
            // setProductList(filteredData)
            // setAMLProductList(filteredData)
            setProductListsearch(filteredData)
          
         }
            
         // }
      }

   }

   // Function to handle fetching the product list
   const fetchingProductList = () => {
      try {
         net.query('SELECT FIELDS(ALL) FROM Product2 LIMIT 45',
            (response: any) => {
               console.log({ loggedIn: true, data: response?.records, data2: response?.records?.attributes });
               // applyFilterAndSort(response.records);
            },
            (error: any) => {
               console.log("error:--- ", JSON.stringify(error));
               setProductList([]);
            }
         );
      } catch (error: any) {
         console.log(JSON.stringify(error));
      }
   };

   // useEffect(() => {
   //    const getUserInfo = async () => {
   //       let userIdentityfromLogin = JSON.parse(await AsyncStorage.getItem("userIdentity"));
   //       setCartId(userIdentityfromLogin.cartId)
   //    }
   //    getUserInfo()
   // }, [])

   // const createFilters = (ProductList: any) => {
   //    let Uid: number = 1
   //    // type of filter
   //    const filterAttributes: any = [
   //       { name: "Brand", query: "BrandLookUpName__c" },
   //       { name: "Flavor", query: "Flavor_Cona__c" },
   //       { name: "Package Type", query: "PackType__c" },
   //       { name: "Unit Size", query: "Unit_Size__c" },
   //    ];


   //    const filtersData: any = filterAttributes.map((attribute: any) => {

   //       const filterObj: any = {
   //          title: attribute.name,
   //          filters: [],
   //       };
   //       ProductList.forEach((product: any) => {
   //          // console.log("==product==",product)
   //          const attributeValue: any = product[attribute.query];
   //          const existingFilter: any = filterObj.filters.find(
   //             (filter: any) => filter.filter == attributeValue,
   //          );
   //          // console.log("attributeValue=",attributeValue)
   //          if (!existingFilter) {
   //             if (attributeValue !== null) {
   //                filterObj.filters.push({
   //                   id: Uid,
   //                   filter: attributeValue,
   //                   filterQuery: attribute.query,
   //                   productCount: 1,
   //                   select: product.select || false,
   //                });

   //                Uid++
   //             }
   //          } else {
   //             existingFilter.productCount++;
   //          }
   //       });

   //       return filterObj;
   //    });

   //    // Decrement the productCount for similar filters
   //    filtersData.forEach((filterObj: any) => {
   //       filterObj.filters.forEach((filter: any) => {
   //          const similarFilters = filterObj.filters.filter(
   //             (f: any) => f.filter === filter.filter,
   //          );
   //          if (similarFilters.length > 1) {
   //             filter.productCount -= 1;
   //          }
   //       });
   //    });
   //    // console.log("filtersData=====",JSON.stringify(filtersData))
   //    dispatch(SET_CREATE_ALL_FILTERS(filtersData))
   //    //   console.log(">>>>>", JSON.stringify(filtersData));
   // };
  
   const SORT = (productList: any) => { 
      const list: any = [...productList]
      if (mySort != null) {
         const sortKey = mySort.Sorttype
         const Ascending = mySort.Ascending

         if (list.length > 0) {
            const sortedProducts: any = list.sort((a: any, b: any) => {
               if (Ascending) {
                  if (a.fields[sortKey] < b.fields[sortKey]) return -1;
                  if (a.fields[sortKey] > b.fields[sortKey]) return 1;
               } else {
                  if (a.fields[sortKey] > b.fields[sortKey]) return -1;
                  if (a.fields[sortKey] < b.fields[sortKey]) return 1;
               }

                  return 0;
               });
               setProductList(sortedProducts);
               setAMLProductList(sortedProducts)
               // setProductListsearch(sortedProducts)
            }else{
               setProductList([])
               setAMLProductList([])
               // setProductListsearch([])
            }
      }else{
         setProductList(productList)
         setAMLProductList(productList)
         // setProductListsearch(productList)
       
      }
   }

   /**
    * The function applies filtering and sorting to a product list based on selected filters.
    */
   const applyFilterAndSort = (productList: any) => {
      // Apply filtering
      const list: any = [...productList]
     
     
      if (myFilters.length > 0) {
       
      //  console.log("myFilters === ", myFilters);
         const checkArray2 = list.filter((product: any) =>{
         return   myFilters.some((filter: any) =>{ 
          return product.fields[filter.nameOrId] === ( CURRENT009 ? getMatchValue(filter.displayName,filter.mainDisplayName) :filter.displayName)  })
                  }  );
         // console.log("checkArray2 === ",checkArray2);
         //  const checkArray2 :any = [...productList]
         // setProductList(checkArray2);
         // setProductListsearch(checkArray2)
         // setAMLProductList(checkArray2)
         SORT(checkArray2);
      } else {
         // setProductList(productList);
         // setProductListsearch(productList)

         // setProductList(productList)
         // setAMLProductList(productList)
         // setProductListsearch(productList)


         SORT(productList)

      }
   }

   // const getProductCategoryProduct = (categoryproduct: any, ProductList: any) => {
   //    // Default product category object All Product showing list
   //    if (PLP_Category.Name === "Products") {
   //       // applyFilterAndSort(ProductList);
   //       // createFilters(ProductList);
        
   //    } else {
   //       const FilterbyCategoryId = categoryproduct.filter((item: any) => item.ProductCategoryId == PLP_Category?.id)
   //       const matchedProducts: any = [];

   //       FilterbyCategoryId.forEach((productCategory: any) => {
   //          const matchingProduct = ProductList.find((product: any) => product.Id === productCategory.ProductId);
   //          if (matchingProduct) {
   //             matchedProducts.push(matchingProduct);
   //          }

   //       });
   //       // applyFilterAndSort(matchedProducts);
   //       // createFilters(matchedProducts)
   //    }
   // }


   const checkforOutandInStock = (updatedProductList: any, inventoryData: any) => {
      // Create a mapping of test values to corresponding values
      const inventoryMapping = new Map();


      inventoryData.forEach((item: any) => {
         if (!inventoryMapping.has(item.Product2__c)) {
            inventoryMapping.set(item.Product2__c, []);
         }
         inventoryMapping.get(item.Product2__c).push(item.LowThreshold__c, item.OutThreshold__c, item.ATP__c);
      });

      // Function to find corresponding value for a given value
      function findCorrespondingTest2(testValue: any) {
         return inventoryMapping.get(testValue);
      }

      // // find corresponding values
      const finalCartItemClone = [...updatedProductList]
      const finalCartItemWithStockStatus: any = finalCartItemClone.map((product: any) => {
         if (inventoryMapping.has(product.id)) {
            const correspondingTest2Value = findCorrespondingTest2(product.id);
            let LowThreshold__c = correspondingTest2Value[0]
            let OutThreshold__c = correspondingTest2Value[1]
            let ATP__c = correspondingTest2Value[2]
            let stockStatus;

            if (ATP__c <= LowThreshold__c) stockStatus = 'lowstock'
            if (ATP__c < OutThreshold__c) stockStatus = 'outOfStock'


            return {
               ...product,
               stockStatus: stockStatus,
               IsSelected: false
            };

         }
         return {
            ...product,
            stockStatus: 'inStock',
            IsSelected: false
         };
      });

      return finalCartItemWithStockStatus
      // setProductList(finalCartItemWithStockStatus)
   }



   // const saveData = (data: any, cartItems: any, inventoryData:any) => {
      // const updatedProductList = data.currentPageOrderedEntries.map((product: any, index: number) => {

      //    let productFoundinCart = cartItems.find((item: any) => product.Id === item.Product2Id)

      //    let quantity = (!product?.Quantity || product?.Quantity === 0) ? 1 : product?.Quantity

      //    return { ...product, Quantity: quantity, relatedCartData: productFoundinCart }
      // })

      // const productWithStockStatus = updatedProductList && checkforOutandInStock(updatedProductList, inventoryData)
      // setProductList(productWithStockStatus)
      // updatedProductList && productWithStockStatus && querySoup('productcategoryproduct', (success: any) => getProductCategoryProduct(success.currentPageOrderedEntries, productWithStockStatus), (error: any) => console.log("querySoup productCategory----error", error), "Id");

      // dispatch(SET_PRODUCT_LIST(data.currentPageOrderedEntries));
      // applyFilterAndSort(data.currentPageOrderedEntries);
      // createFilters(data.currentPageOrderedEntries)
      // console.log(data.currentPageOrderedEntries.length,"=== PLP list length")
      // this.setState({loggedIn: true, data: data.currentPageOrderedEntries})
   // };

   const saveDataCartDeliveryGroup = (data: any) => {
      setCartDeliveryGroupId(data?.currentPageOrderedEntries[0]?.Id)
   };


   const saveCartItemData = (data: any) => {

      setCartItems(data.currentPageOrderedEntries)

      // getProductFromStore(data.currentPageOrderedEntries, inventoryData)

      dispatch(CART_LENGTH(data.currentPageOrderedEntries.length))
      // setFinalCartItem(data.currentPageOrderedEntries)
   };

   const getProductCategory = (data: any) => {
      const DefaultObject = { key: "Default", value: "Products" }
      let newArray = data.map((obj: any) => ({ ...obj, key: obj.Id, value: obj.Name }));
      // Add DefaultObject at the beginning of newArray
      newArray.unshift(DefaultObject);
      setProductCategory(newArray)
      AsyncStorage.setItem("productCategory", JSON.stringify(newArray));


   }

   const saveInventoryData = (data: any, accountId: any, contactId: any) => {
      if (data.currentPageOrderedEntries) {
         
         setPlantProductInventory(data.currentPageOrderedEntries)
         dispatch(SET_PLANT_PRODUCT_INVENTORY(data.currentPageOrderedEntries))
         getDataFromStore(accountId, contactId, data.currentPageOrderedEntries)

      }
   };

   const saveDataWebCart = (AccountID: string, userContactId: string, webStoreId: string) => {


      net.query(`SELECT AccountId,Status,WebStoreId,Id,IsDeleted,OwnerId,GrandTotalAmount FROM WebCart where Status='Active' and OwnerId='${userIDD}' LIMIT 2000`,
      (response: any) => {
        console.log("get web cart dataas = ", response);
        if (response.done) {



         if (response?.records?.length > 0 && AccountID) {

            let webCartForAccount = response?.records.find((ele:any, index:number) => ele.AccountId === AccountID)
   
   
            if (webCartForAccount) {
   
               let WebCartId = webCartForAccount.Id
               setCartId(WebCartId)
               getCartItem(WebCartId)
               dispatch(SET_WEBCART(WebCartId))
   
               syncDownCartDeliveryGroup(WebCartId)
   
               setTimeout(() => {
                  getCartDeliveryGroupData()
               }, 700);
            }
            else {
               if (AccountID) {
                  createWebCart(webStoreId, AccountID, userContactId)
               }
            }
         }
         else {
            createWebCart(webStoreId, AccountID, userContactId)
         }







        } else {
          store.dispatch(SET_LOADER(false))
        }
      },
      (error) => {
        store.dispatch(SET_LOADER(false))
        console.log("get web cart data = error ", error);
      });

      // if (data?.currentPageOrderedEntries?.length > 0 && AccountID) {

      //    let webCartForAccount = data?.currentPageOrderedEntries.find((ele:any, index:number) => ele.AccountId === AccountID)


      //    if (webCartForAccount) {

      //       let WebCartId = webCartForAccount.Id
      //       console.log(WebCartId, 'web cart id----------ADJKCV')
      //       setCartId(WebCartId)
      //       getCartItem(WebCartId)
      //       dispatch(SET_WEBCART(WebCartId))

      //       syncDownCartDeliveryGroup(data?.currentPageOrderedEntries[0]?.Id)

      //       setTimeout(() => {
      //          getCartDeliveryGroupData()
      //       }, 700);
      //    }
      //    else {
      //       if (AccountID) {
      //          createWebCart(webStoreId, AccountID, userContactId)
      //       }
      //    }
      // }
      // else {
      //    createWebCart(webStoreId, AccountID, userContactId)
      // }
   }

   const createWebCart = (webStoreId: string, AccountID: string, userContactId: string) => {

      dispatch(SET_WEBCART([]))
      dispatch(CART_LENGTH(0))

      const bodyObject = {
         "name":"My Cart AH",
         "effectiveAccountId": AccountID
      }


      postCreateWebCart(webStoreId, bodyObject)
      .then((res) => {
         if(res) {
            console.log(res, 'WEB CART CREATED-----')
            saveDataWebCart(AccountID, userContactId,webStoreId)
            // cartId

            // getWebCartFromStore()

            // clearSelectedSoups(AccountID, userContactId,webStoreId)

            // let WebCartId = res.cartId
            // setCartId(WebCartId)
            // getCartItem(WebCartId)
            // dispatch(SET_WEBCART(WebCartId))

            // syncDownCartDeliveryGroup(data?.currentPageOrderedEntries[0]?.Id)

            // setTimeout(() => {
            //    getCartDeliveryGroupData()
            // }, 700);

         }
      })
      .catch((err) => {
         if(err) {
            console.log(err, 'ERROR WHILE CREATING WEB CART----')
         }
      })

      // const updatedDetails = {
      //    AccountId: AccountID,
      //    Name: 'My Cart for AH',
      //    WebStoreId: webStoreId,
      //    Contact_ID__c: userContactId,
      //    __local__: true,
      //    __locally_created__: true,
      //    __locally_updated__: false,
      //    __locally_deleted__: false,
      //    attributes: { type: "WebCart" }
      // }
      // createUpdateSoup(
      //    updatedDetails,
      //    'WebCart',
      //    (addProductToCart: any) => {
      //       // getDataFromStore(AccountID)
      //       syncData()
      //      setTimeout(() => {
      //       clearSelectedSoups()
      //      })
      //    },
      //    (error: any) => {
      //       console.log('Error updating WEBCART:', error);
      //    }
      // );
   }


   const clearSelectedSoups = (AccountID: string, userContactId: string,webStoreId: string) => {
      const soupNames = ['WebCart', 'CartItem']
      clearSoups(soupNames, (success: any, index: number) => onSuccesSoupClear(success, index, soupNames, AccountID, userContactId,webStoreId))
   }

   const onSuccesSoupClear = (success: any, index: number, soupNames: any, AccountID: string, userContactId: string,webStoreId:string) => {
      if (index === soupNames.length - 1) {
         syncDownFull()
         .then((res) => {
               getWebCartFromStore(AccountID, userContactId,webStoreId)
         })
         .catch((err) => {
            console.log('error from clear soup' , err)
         })
         // await getUserDetailsFromLocal()
      }
   }

   const saveAccountData = async (data: any, userData: any) => {
      if (data.currentPageOrderedEntries && userData?.accountId) {
         let accountData = data.currentPageOrderedEntries.find((acc: any) => acc.Id === userData?.accountId)

         // setSelectedAccountId(accountData?.Id);
         await AsyncStorage.setItem("selectedAcc", JSON.stringify(accountData));

         
         syncDownPlantProductInventory(accountData?.DeliveryPlant__c)
         
         setTimeout(() => {
            getPlantProductInventoryData(userData?.accountId, userData?.contactId)
         }, 1000)
         
      }
   }
   const saveWebStoreData = async (data: any, AccountID: string, userContactId: string, inventoryData: any) => {

      if (data) {
         setProductList([])
         setMainProductList([])
         setWebStore(data[0])
         dispatch(STOREWEBSTORE(data[0]))
         // await AsyncStorage.setItem("webStoreData", JSON.stringify(data[0]));
         fetchProductListData(data[0].Id)
         getWebCartFromStore(AccountID, userContactId, data[0].Id)
      }

   }


   const getCartDeliveryGroupData = () => {
      querySoup('CartDeliveryGroup', (success: any) => saveDataCartDeliveryGroup(success), (error: any) => console.log("querySoup----error", error), "Name");
   };

   const getPlantProductInventoryData = (accountId: any, contactId: any) => {
      querySoup('PlantProductInventory__c', (success: any) => saveInventoryData(success, accountId, contactId), (error: any) => console.log("querySoup----error", error), "Name");
   };

   const getAccountData = (userData: any) => {
      querySoup('account', (success: any) => (saveAccountData(success, userData)), (error: any) => console.log("querySoup Account ----error", error), "AccountNumber")
   };



   const getDataFromStore = (AccountID: any, userContactId: string, inventoryData: any) => {

      querySoup('WebStore', (success: any) => saveWebStoreData(success.currentPageOrderedEntries, AccountID, userContactId, inventoryData), (error: any) => console.log("querySoup WebStore Error----error", error), "Name");
      // querySoup('StoreAssortment', (success: any) => saveStoreAssortmentData(success), (error: any) => console.log("querySoup----error", error), "Id");
      // querySoup('Assortment', (success: any) => saveAssortmentData(success), (error: any) => console.log("querySoup----error", error), "Id");
   };

   const getWebCartFromStore = (AccountID: string, userContactId: string, webStoreId: string) => {
      saveDataWebCart(AccountID, userContactId, webStoreId)
      // querySoup('WebCart', (success: any) => saveDataWebCart(success, AccountID, userContactId, webStoreId), (error: any) => console.log("querySoup WebCart ----error", error), "Name");
      // querySoup('productcategory', (success: any) => getProductCategory(success.currentPageOrderedEntries), (error: any) => console.log("querySoup productCategory----error", error), "Name");
   }

   // const getProductFromStore = (cartItems: any, inventoryData:any) => {
   //    querySoup('product2', (success: any) => saveData(success, cartItems, inventoryData), (error: any) => console.log("querySoup Product Error----error", error), "Name");
   // }

   const getCartItem = (CartId: any) => {

      net.query(`SELECT CartId,Product2Id,Quantity,Id,IsDeleted,Sku,TotalPrice,Name,UnitAdjustedPrice,TotalAmount,CreatedDate FROM CartItem where CartId = '${CartId}' LIMIT 2000`,
         (response: any) => {
            if (response.done) {

               setCartItems(response.records)
               // getProductFromStore(data.currentPageOrderedEntries, inventoryData)
               dispatch(CART_LENGTH(response.records.length))

            } else {
               store.dispatch(SET_LOADER(false))
            }
         },
         (error) => {
            store.dispatch(SET_LOADER(false))
            console.log("getUserDetailsFromUserID Error= ", error);
         });

      // syncDownCartItem(CartId)
      // setTimeout(() => {
      //    getCartItemData()
      // }, 1000)

      // querySoup(
      //    "CartItem",
      //    (success: any) => saveCartItemData(success),
      //    (error: any) => console.log("querySoup----error", error),
      //    "CartId"
      // );
   }

   const getCartItemData = () => {
      querySoup(
         "CartItem",
         (success: any) => saveCartItemData(success),
         (error: any) => console.log("querySoup----error", error),
         "CartId"
      );
   }

   // Function to handle fetching the product list
   // const fetchingProductList = () => {
   //    console.log("start fetching");
   //    try {
   //       net.query('SELECT FIELDS(ALL) FROM Product2 LIMIT 45',
   //          (response: any) => {
   //             console.log({ loggedIn: true, data: response?.records, data2: response?.records?.attributes });
   //             applyFilterAndSort(response.records);
   //          },
   //          (error: any) => {
   //             console.log("error:--- ", JSON.stringify(error));
   //             setProductList([]);
   //             setProductListsearch([])
   //          }
   // }



   /**
   * The function sets the value of a state variable to the input text.
   * @param text - The `text` parameter is a string that represents the new value of the searched text.
   * It is passed as an argument to the `onChangeSearchedText` function. The function then sets the
   * state of `searchedText` to this new value using the `setSearchedText`
   */
   const onChangeSearchedText = (text: any) => {
      setSearchedText(text);
      searchByName(text)

   };

   // Function to search for objects by name
   function searchByName(searchName: any) {
      const searchName2 = searchName.toLowerCase();
      const Result = productListsearch.length > 0 ? productListsearch.filter((obj: any) =>
      obj.fields.Name.toLowerCase().includes(searchName2  ) || obj.fields.StockKeepingUnit.toLowerCase().includes(searchName2) || obj.fields.EANUPC__c.toLowerCase().includes(searchName2)
       ) : [];
       applyFilterAndSort(Result)
      // setProductList(Result);
      // setAMLProductList(Result)
      
   }


   /**
    * The function clears the searched text.
    */
   const clearSearch = () => {
      setSearchedText("");
   }

   //  Tab Index
   const [selectedIndex, setSelectedIndex] = useState('0');

   // Counter
   const [quantity, setQuantity] = useState(1);
   const [quantityCokaCola, setQuantityCokaCola] = useState(1);


   /**
    * This function updates the quantity of a product in a list of products.
    * @param id - The id parameter is a unique identifier for a product in the productList array. It is
    * used to identify which product's quantity needs to be updated.
    * @param quantity - The quantity parameter represents the new quantity value that is being passed
    * in for a specific product with the given id. This function is used to update the quantity of a
    * product in the productList state.
    */
   const handleQuantityChange = (id: any, quantity: any) => {
      console.log("Id == ",id,"quantity==",quantity)
      if (quantity > 0) {

         const CloneData = [...productList]
         const updatedProducts = CloneData.map(product => {
            if (product.id === id) {
               return { ...product, 'Quantity': quantity };
            }
            return product;
         });
         setProductList(updatedProducts);
         setProductListsearch(updatedProducts)
      }
   };

   const getCartCount = (item: any) => {
      let found = cartItems.find((element: any) => item?.id === element.Product2Id);
      if (found) {
         return found?.Quantity
      } else {
         return 0
      }
   }


   // this function will remove filters 
   const filterRemove = (id: any) => {
      dispatch(removeSelectFilter(id))
   }

   const clearFilter = () => {
      dispatch(clearAllFilter())
   }

   const addToCart = (item: any) => {
      // dispatch(ADD_To_CART(item))


    store.dispatch(SET_LOADER(true))
      
      //add cart item with API
      const bodyObject = {
         "productId": item.id,
         "quantity": item?.Quantity ? item?.Quantity : 1,
         "type": "Product"
      }

      postCreateCartItem(webStoreID?.Id, cartId, selectedAccountId, bodyObject)
         .then((res) => {

            if (res) {
               console.log('CART ITEM ADDED----',webStoreID.Id, cartId, selectedAccountId, bodyObject )
               let foundProductinCart = cartItems.filter((cartItem: any) => cartItem.Product2Id === item.id)

               if (foundProductinCart.length < 1) {

                  dispatch(CART_LENGTH(cartLength + 1))
               }
               getCartItem(cartId)
               setAddToCartModal(true)
               store.dispatch(SET_LOADER(false))

               handleQuantityChange(item.id, 1)

            }
         })
         .catch((err) => {
            console.log(err, 'err-----')
            store.dispatch(SET_LOADER(false))
         })




      //add cart item with Sync Object
      // AddToCartFunc(item, cartId, cartDeliveryGroupId, cartItems, webStore.Id, selectedAccountId)


      // const updatedDetails = {
      //    CartId: cartId,
      //    Name: item.Name,
      //    Product2Id: item.Id,
      //    Quantity: item.Quantity,
      //    Sku: item.StockKeepingUnit,
      //    // type:'Product',
      //    CartDeliveryGroupId: cartDeliveryGroupId, // if removed \"REQUIRED_FIELD_MISSING\",\"message\":\"Required fields are missing: [CartDeliveryGroupId]\

      //    __local__: true,
      //    __locally_created__: true,
      //    __locally_updated__: false,
      //    __locally_deleted__: false,
      //    attributes: { type: "CartItem" }
      // }
      // item.Quantity > 0 && createUpdateSoup(
      //    updatedDetails,
      //    'CartItem',
      //    (addProductToCart: any) => {
      //       console.log('Contact Created successfully:', addProductToCart);
      //       getCartItem()
      //    },
      //    (error: any) => {
      //       console.log('Error updating contact:', error);
      //    }
      // );
   }


   //This Data is For Select Option
   const data: any = [
      { key: '1', value: 'All Products' },
      { key: '2', value: 'New Products' },
      { key: '3', value: 'Sparkling Soft Drinks' },
      { key: '4', value: 'Water' },
      { key: '5', value: 'Enhanced Water' },
      { key: '7', value: 'Tea' },
      { key: '8', value: 'Coffee & Coffee Drinks' },
      { key: '9', value: 'Energy Drinks' },
      { key: '10', value: 'Juice & Juice Drinks' },
      { key: '11', value: 'Sports Drinks' },
      { key: '12', value: 'Plant Based' },
      { key: '13', value: 'Dairy' },
      { key: '14', value: 'Liquid Flavor Enhancers' },
      { key: '15', value: 'Imports' },
      { key: '16', value: 'Flavors / Mixers / Sweetners' },
      { key: '16', value: 'Cups / Lids / Straws' },
      { key: '16', value: 'Co2' },

   ]


   //This Data is For Tab Option

   const DATA = [
      { image: require("../../assets/images/ProductListIcon.png"), "tabName": t('PRODUCT_LIST.TABS.productlistTab'), icon: <ProductListIcon />, selectedIcon: <ProductListIcon color="red" /> },
      { image: require("../../assets/images/ProductListIcon.png"), "tabName": t('PRODUCT_LIST.TABS.orderbuilderTab'), icon: <OrderBuilderIcon />, selectedIcon: <OrderBuilderIcon color="red" /> },
      { image: require("../../assets/images/ProductListIcon.png"), "tabName": t('PRODUCT_LIST.TABS.shoppinglistTab'), icon: <ShopListIcon />, selectedIcon: <ShopListIcon color="red" /> },
   ]
   const HandleFilter = () => {
      setModalVisible(true)
      // navigation.navigate("FilterCompo")
   }
   const HandleSort = () => {
      navigation.navigate('SortCompo')
   }
   const HandleCategorySheet = () => {
      SheetManager.show("ProductCategory")
   }



   const viewMoredHandler = (str: any) => {
      if (str === "Show Less") {
         setFirstRenderLength(3)
         setProductListLength(3)
      }
      else {
         const newLength = firstRenderLength + 10
         setFirstRenderLength(firstRenderLength + 10)
         if (newLength >= productList.length - 1) {
            setFirstRenderLength(productList.length - 1)
            setProductListLength(productList.length - 1)
         } else {
            setProductListLength(newLength)
         }
      }
   }

   // filter list items render
   const renderItem = ({ item, index }: { item: any; index: any }) => {

      return (
         <View style={styles.whiteBoxDiv} >
            <View style={styles.selectItemInner}>
               <View style={styles.gapStyle}>
                  <Text style={styles.darkGrayText}>{item.displayName} ({item.productCount})</Text>
               </View>
               <View style={styles.gapStyle}>
                  <Pressable onPress={() => filterRemove(item.id)}>
                     <Cross />
                  </Pressable>
               </View>
            </View>
         </View>
      );
   };


   const handleInput = (Id: any, num: any) => {
      console.log("Id == ",Id,"num==",num)
      handleQuantityChange(Id, Number(num));
   }
   const ProductrenderItem = ({ item, index }: { item: any; index: any }) => {
      const image = { uri: imgAccessPath(item.Id, `0_0`) } //   require("../../assets/images/CocaCola.png")     // item?.image;
      const productName = item?.Name;
      const SKU = item.StockKeepingUnit // item?.sku;
      const UPC = item?.EANUPC__c // item?.upc;
      const stock = item?.stock;
      const quantity = item?.Quantity ? item?.Quantity : 1;
      const itemCountInCart = getCartCount(item);
      const imageUrl = imageUrls[item.Id];

      const { Name = '', StockKeepingUnit = '', EANUPC__c = '' } = item.fields

      if (index <= productListLength) {
         return (
            <ProductItem
               image={image}
               productName={Name}
               SKU={StockKeepingUnit}
               UPC={EANUPC__c}
               quantity={quantity}
               existingQuantityInCart={itemCountInCart}
               addQty={() => {
                  // handleQuantityChange(item.Id, quantity + 1);
                  handleQuantityChange(item.id, quantity + 1);
               }}
               minusQty={() => {
                  // handleQuantityChange(item.Id, quantity > 0 ? quantity - 1 : 0);
                  handleQuantityChange(item.id, quantity > 0 ? quantity - 1 : 0);
               }}
               inputeHandle={handleInput}
               navigateTo={() => {
                  navigation.navigate('ProductDetails', { product: item, itemInCart: itemCountInCart, stockStatus: item.stockStatus, cartId: cartId, webStoreId: webStore.Id, cartItems: cartItems, selectedAccId: selectedAccountId })
               }}
               addToCart={() => addToCart(item)}
               showBottomDetails={true}
               showDeleteIcon={false}
               Id={item.id}
               stockStatus={item?.stockStatus}
            />
         );
      } else {
         return <View></View>;
      }
   };



   const EmptyListComponent = () => {
      return (
         <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ color: "black" }}>There are Currently no Products with the specified search criteria.</Text>
         </View>
      )
   }
   return (

      <View style={styles.bodyFlexStyle}>
         <TopTabsMultiple
            data={DATA}
            selectedIndex={parseInt(selectedIndex)}
            onPress={(index: any) => setSelectedIndex(index + "")}
         />
         {selectedIndex === "1" && <OrderBuilder navigation={navigation} />}
         {selectedIndex === "2" && <ShoppingList navigation={navigation} />}

         {selectedIndex === "0" && (
            <View style={styles.topContentWrapper}>
               <View
                  style={{
                     width: "100%",
                     flexDirection: "row",
                     alignItems: "center",
                     justifyContent: "space-between",
                  }}
               >
                  <TouchableOpacity
                     onPress={HandleCategorySheet}
                     style={styles.drinkTypeWrapper}>
                     <Text style={styles.drinkTypeText}>{PLP_Category?.Name}</Text>
                     <DownArrowBroad />
                  </TouchableOpacity>


                  <View style={styles.filterandSortWrapper}>
                     <TouchableOpacity
                        onPress={HandleFilter}
                     >
                        <FilterIcon />
                     </TouchableOpacity>

                     <TouchableOpacity
                        onPress={HandleSort}
                     >
                        <SortIcon />
                     </TouchableOpacity>
                  </View>
               </View>
               {
                  myFilters?.length > 0 && <Text style={styles.showText} onPress={clearFilter}>{t('PRODUCT_LIST.clearallTitle')}</Text>
               }
               <View style={styles.productNumber} >
                  {
                     myFilters?.length > 0 &&
                     <FlatList
                        data={myFilters}
                        horizontal
                        renderItem={renderItem}
                        keyExtractor={(item: any, index: any) => index.toString()}
                     />


                  }


               </View>
            </View>
         )}
         <ScrollView style={{ flex: 1 }}>
            {selectedIndex === "0" && (
               <View style={{ alignItems: "center" }}>
                  <ScrollView style={styles.BlockWhite} nestedScrollEnabled={true}>
                     <FlatList
                        data={productList}
                        renderItem={ProductrenderItem}
                        keyExtractor={(item: any, index: any) => index}
                        ListEmptyComponent={() => <EmptyListComponent />}
                     />
                  </ScrollView>

                  {productList.length - 1 >= firstRenderLength &&
                     productList.length !== 0 ? (
                     firstRenderLength != productList.length - 1 ? (
                        <View style={styles.viewBtnStyle}>
                           <TouchableOpacity
                              onPress={() => viewMoredHandler("View More")}
                              style={styles.roundWhiteButton}
                           >
                              <Text style={styles.grayText}>
                                 {t("PRODUCT_LIST.viewMoreBtn")}{" "}
                              </Text>
                           </TouchableOpacity>
                        </View>
                     ) : (
                        <View style={styles.viewBtnStyle}>
                           <TouchableOpacity
                              onPress={() => viewMoredHandler("Show Less")}
                              style={styles.roundWhiteButton}
                           >
                              <Text style={styles.grayText}>
                                 {t("PRODUCT_LIST.viewLessBtn")}
                              </Text>
                           </TouchableOpacity>
                        </View>
                     )
                  ) : <></>}

                  <Modal
                     isVisible={modalVisible}
                     animationIn="slideInRight" // Slide in from right
                     animationOut="slideOutRight" // Slide out to right
                     onBackdropPress={() => setModalVisible(false)}
                     backdropTransitionOutTiming={0} // Close modal instantly without fading
                     style={{ padding: 0, margin: 0 }}
                     onBackButtonPress={() => { setModalVisible(false) }}

                  >
                     <View style={styles.modalContainer}>

                        {/* <FilterComponent setModalVisible={setModalVisible} /> */}
                        <FilterComponent2 setModalVisible={setModalVisible} />

                     </View>


                  </Modal>


                  <FooterComponent />
               </View>
            )}

            <ReactNativeModal
               visible={addToCartModal}
               transparent={true}
               onRequestClose={() => setAddToCartModal(false)}
            >
               <View style={styles.modalContainerAddToCart}>
                  <View style={styles.modalbox}>
                     <View style={styles.modalHeader}>
                        <Text style={[styles.modalText]}>Add to Cart</Text>
                        <TouchableOpacity
                           onPress={() => setAddToCartModal(false)}
                        >
                           <CloseIcon />
                        </TouchableOpacity>
                     </View>
                     <View style={styles.sortInnerDiv}>
                        <Text style={[styles.blackText]}>
                           Item was added to Cart
                        </Text>
                     </View>
                     <View style={styles.buttonGroup}>
                        <TouchableHighlight
                           testID="OrderHistoryCancelOrderYes"
                           // onPress={}
                           // color={"#FFFFFF"}
                           underlayColor={"#F40000"}
                           style={[styles.roundButton]}
                           onPress={() => setAddToCartModal(false)}
                        >
                           <Text style={[styles.buttonText, { color: "#000" }]}>
                              Continue Shopping
                           </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                           testID="OrderHistoryCancelOrderNo"
                           onPress={() => {
                              setAddToCartModal(false)
                              navigation.navigate('ViewAddToCart')
                           }}
                           // color={"#FFFFFF"}
                           underlayColor={"#F40000"}
                           style={[
                              styles.roundButton,
                              { backgroundColor: "#000", marginHorizontal: 15 },
                           ]}
                        >
                           <Text style={[styles.buttonText, { color: "#FFF" }]}>View Cart</Text>
                        </TouchableHighlight>
                     </View>
                  </View>
               </View>
            </ReactNativeModal>
         </ScrollView>
         {loader && <Loader message="Please wait..." />}
      </View>


   );
};





