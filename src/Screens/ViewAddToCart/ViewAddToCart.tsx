import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Modal,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  // ToastAndroid,
  Alert,
  DeviceEventEmitter,
  ToastAndroid,
  Platform,
  Linking,
} from "react-native";


import styles from "./styles";
import DownArrow from "../../assets/images/DownArrow";
import VerticalLine from "../../assets/images/VerticalLine";
import AlertTriangle from "../../assets/images/AlertTriangle";
import DeleteIcon from "../../assets/images/DeleteIcon";
import MoreIcon from "../../assets/images/MoreIcon";
import SaveListIcon from "../../assets/images/SaveListIcon";
import ClearCart from "../../assets/images/ClearCart";
import ExportIcon from "../../assets/images/ExportIcon";
import { useTranslation } from "react-i18next";
import ReplaceProduct from "./ReplaceProduct";
import CheckoutTotal from "../../components/CheckoutTotal/CheckoutTotal";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_IN_CART_QUNTITY,
  REMOVE_ALL_CART,
  REMOVE_ALL_OUT_OF_STOCK_CART,
  REMOVE_MULTI_SELECTED_CART,
  REMOVE_SELECT_CART,
  ADD_To_CART,
  CART_LENGTH,
} from "../../redux/Reducer/cartReducer";
import ConformationModel from "../../components/ConformModel/ConformationModel";
import { querySoup, createUpdateSoup } from "../../Salesforce/SmartStore";
import CheckBox from "@react-native-community/checkbox";
// import CsvDownloadButton from 'react-json-to-csv';
import RNFetchBlob from 'rn-fetch-blob';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { doPost } from '../../Api/api';
import { deleteCartItem, updateCartItem } from '../../utils/CartFunctions';
import { syncDownCartItem } from '../../Salesforce/SmartSync';
import { Grayscale } from 'react-native-color-matrix-image-filters';
import QuantityManager from '../../components/QuantityManager/QuantityManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageComponent from '../../components/ImageComponent/ImageComponent';
import { imgAccessPath } from '../../components/ImageDownload/ImageDownload';
import CartSort from '../../components/SortCompo/CartSort';
import Loader from '../../components/Loader/loader';
import Toast from 'react-native-toast-message';
import { Toaster } from '../../components/Toaster/toaster';
import DeviceInfo from 'react-native-device-info';
import { getProductsBySKUWithImge, UpdateCart } from "../../Api/apiService";
import { store } from "../../redux/store";
import { SET_LOADER } from "../../redux/Reducer/loaderReducer";
import { oauth, net } from 'react-native-force';
import moment from "moment";



type UserDataType = {
  accountId: string;

  bottlerId: string;

  contactId: string;

  userId: string;
};

const ViewAddToCart: React.FC<{ navigation: any }> = ({ navigation }) => {
  const focus = useIsFocused();
  const ref = useRef();
  const AllCart = useSelector((state: any) => state.cart.Carts);
  const mySort = useSelector((state: any) => state.cart.CartSort);
  const mySortTitle = useSelector((state: any) => state.cart.CartSortTitle);
  const WebCart = useSelector((state: any) => state.cart.WebCart);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isShowMoreSection, setIsShowMoreSection] = useState(false);
  const [menuTopPosition, setMenuTopPosition] = useState(0);
  const [selectedCardID, setSelectedCardID] = useState(null);
  const [outOfStockProducts, setOutOfStockProducts] = useState<string[]>([]);
  const [inStockProducts, setInStockProducts] = useState<string[]>([]);
  const [selctedCarts, setSelctedCarts] = useState<string[]>([]);
  const [conformmodel, setConformmodel] = useState(false);
  const [webCart, setWebCart] = useState<any>([]);
  const [plantProductInventory, setPlantProductInventory] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [finalCartItem, setFinalCartItem] = useState([]);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [mov, setMov] = useState<any>("");
  const [moq, setMoq] = useState<any>("");
  const [updatedOrderSummary, setUpdatedOrderSummary] = useState<any>({});
  const ProductList = useSelector((state: any) => state.cart.ProductList);
  const CartId = useSelector((state: any) => state.cart.WebCart);
  const PlantProductInventoryData = useSelector(
    (state: any) => state.plantProductInventory.PlantProductInventory
  );
  const [openSortModal, setOpenSortModal] = useState<boolean>(false);
  const cartLength = useSelector((state: any) => state.cart.CartLength);
  const [userData, setUserData] = useState<UserDataType>({
    accountId: "",

    bottlerId: "",

    contactId: "",

    userId: "",
  });
  const [isDataLoading, setIsDataLoading] = useState(true);
  const loader = useSelector((state: any) => state.loader.isLoaderVisible);
  const [deliveryCharge, setDeliveryCharge] = useState<any>("")
  const [deviceVersion, setDeviceVersion] = useState(DeviceInfo.getSystemVersion())
  const [isCartUpdated, setIsCartUpdated] = useState<boolean>(false)
  const isDataRefreshed = useSelector((state: any) => state.cart.isDataRefreshed);
  const webStoreData = useSelector((state: any) => state.cart.webStore);

  const [orderSimulateData, setOrderSimulateData] = useState({
    orderSimulate: {
      return: {
        type: "",
        messageClass: "",
        text: "",
      },
      header: {
        subTotal: "264.0000",
        totalDiscounts: "0",
        totalFees: "0",
        totalNetPrice: "276.0000",
        totalDeposits: "12.0000",
        totalTaxes: "0",
        totalPrice: "276.0000",
        totalQuantity: "0000000007",
      },
      item: [
        {
          number: "000010",
          highLevel: "000000",
          material: "000000000000146721",
          requestedQuantity: "4.000",
          requestedQuantityUom: "CS",
          salesUnit: "CS",
          category: "ZN11",
          text: "23Z CN 12LS_PCE T SNO BRY_PP2 TST",
          netValue: "156.0000",
          currency: "USD",
          subtotal1: "144.0000",
          subtotal2: "0",
          subtotal3: "0",
          subtotal4: "4.0000",
          subtotal5: "12.0000",
          subtotal6: "0",
          subtotal7: "0",
          subtotal8: "0",
          subtotal9: "0",
          subtotal10: "0",
          subtotal11: "0",
          subtotal12: "156.0000",
          subtotal13: "144.0000",
          subtotal14: "0",
          subtotal15: "0",
          subtotal16: "0",
          subtotal17: "0",
          salesTax: "0",
          plant: "C001",
          subTotal: "144.0000",
          totalDiscounts: "0",
          totalFees: "0",
          totalNetPrice: "156.0000",
          totalDeposits: "12.0000",
          totalTaxes: "0",
          totalPrice: "156.0000",
        },
        {
          number: "000020",
          highLevel: "000000",
          material: "000000000000146722",
          requestedQuantity: "3.000",
          requestedQuantityUom: "CS",
          salesUnit: "CS",
          category: "ZN11",
          text: "23ZCAN12LS PCE T GA P_PP-VENDPRIME test",
          netValue: "120.0000",
          currency: "USD",
          subtotal1: "120.0000",
          subtotal2: "0",
          subtotal3: "0",
          subtotal4: "3.0000",
          subtotal5: "0",
          subtotal6: "0",
          subtotal7: "0",
          subtotal8: "0",
          subtotal9: "0",
          subtotal10: "0",
          subtotal11: "0",
          subtotal12: "120.0000",
          subtotal13: "120.0000",
          subtotal14: "0",
          subtotal15: "0",
          subtotal16: "0",
          subtotal17: "0",
          salesTax: "0",
          plant: "C001",
          subTotal: "120.0000",
          totalDiscounts: "0",
          totalFees: "0",
          totalNetPrice: "120.0000",
          totalDeposits: "0",
          totalTaxes: "0",
          totalPrice: "120.0000",
        },
      ],
      moq: {},
      condition: [],
    },
  });

  useEffect(() => {
    if (inStockProducts.length > 0) {
      SORT(inStockProducts);
    }
  }, [mySort]);

  useEffect(() => {
    store.dispatch(SET_LOADER(true))
    setIsCartUpdated(false);
    getDataFromStore();

    setTimeout(() => {
      setIsDataLoading(false);
    }, 2800);
  }, [focus, isDataRefreshed]);

  // useEffect(() => {
  //   checkforOutandInStock()
  // }, [plantProductInventory])

  let testJson: any = {
    orderSimulate: {
      return: {
        type: "",
        messageClass: "",
        text: "",
      },
      header: {
        subTotal: "80.0000",
        totalDiscounts: "0",
        totalFees: "22.0000",
        totalNetPrice: "105.0000",
        totalDeposits: "3.0000",
        totalTaxes: "0",
        totalPrice: "105.0000",
        totalQuantity: "0000000001",
      },
      item: [
        {
          number: "000010",
          highLevel: "000000",
          material: "000000000000146721",
          requestedQuantity: "1.000",
          requestedQuantityUom: "CS",
          salesUnit: "CS",
          category: "ZN11",
          text: "23Z CN 12LS_PCE T SNO BRY_PP2 TST",
          netValue: "105.0000",
          currency: "USD",
          subtotal1: "80.0000",
          subtotal2: "0",
          subtotal3: "0",
          subtotal4: "1.0000",
          subtotal5: "3.0000",
          subtotal6: "0",
          subtotal7: "0",
          subtotal8: "0",
          subtotal9: "0",
          subtotal10: "22.0000",
          subtotal11: "0",
          subtotal12: "105.0000",
          subtotal13: "80.0000",
          subtotal14: "0",
          subtotal15: "0",
          subtotal16: "0",
          subtotal17: "0",
          salesTax: "0",
          plant: "C001",
          subTotal: "80.0000",
          totalDiscounts: "0",
          totalFees: "22.0000",
          totalNetPrice: "105.0000",
          totalDeposits: "3.0000",
          totalTaxes: "0",
          totalPrice: "105.0000",
        },
      ],
      moq: [{ fee: 6.0 }, { fee: 2.0 }],
      condition: [
        {
          itemNumber: "000010",
          type: "ZPRE",
          rate: "80.000000000",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "80.000000000",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZEAW",
          rate: "0",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "80.000000000",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZCRO",
          rate: "0",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZMOV",
          rate: "22.000000000",
          rateUnit: "USD",
          pricingUnit: "0",
          unit: "",
          value: "12.000000000",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "UTXD",
          rate: "100.000000000",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "102.000000000",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "UTXE",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR9",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR15",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR1",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR2",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR3",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR4",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR5",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR6",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR7",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR8",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "XR13",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZDP1",
          rate: "3.000000000",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "3.000000000",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZMOD",
          rate: "0",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZMO1",
          rate: "0",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZMO2",
          rate: "0",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZSF0",
          rate: "0",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "SKTO",
          rate: "0",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "VPRS",
          rate: "16900.000000000",
          rateUnit: "USD",
          pricingUnit: "1000",
          unit: "CS",
          value: "16.900000000",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZACD",
          rate: "0",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZTXA",
          rate: "1.900000000",
          rateUnit: "%",
          pricingUnit: "0",
          unit: "",
          value: "1.520000000",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZCST",
          rate: "0",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "0",
          currency: "USD",
          isInactive: "",
        },
        {
          itemNumber: "000010",
          type: "ZOBC",
          rate: "1.000000000",
          rateUnit: "USD",
          pricingUnit: "1",
          unit: "CS",
          value: "1.000000000",
          currency: "USD",
          isInactive: "",
        },
      ],
    },
  };

  useEffect(() => {
    setOutOfStockProducts(
      finalCartItem.filter(
        (product: any) => product.stockStatus === "outOfStock"
      )
    );
    setInStockProducts(
      finalCartItem.filter(
        (product: any) => product.stockStatus !== "outOfStock"
      )
    );
  }, [finalCartItem]);

  useEffect(() => {
    DeviceEventEmitter.addListener("Deleted_Success", async (e) => {
      if (e && e.data) {
        await setFinalCartItem((prev) =>
          prev.filter((product: any) => product.Id !== e.data.Id)
        );
      }
    });

    {
      () => {
        DeviceEventEmitter.removeAllListeners();
      };
    }
  }, [deliveryCharge]);

  const getUserAccount = useCallback(async () => {
    const data = await AsyncStorage.getItem("selectedAcc");
    if (data) {
      const accountData = JSON.parse(data);

      setAccountNumber(accountData?.AccountNumber ?? "");
    }
  }, []);

  const getUserIdentity = useCallback(async () => {
    const data = await AsyncStorage.getItem("userIdentity");

    if (data) {
      const userIdentity = JSON.parse(data);

      setUserData(userIdentity ?? {});
    }
  }, []);

  useEffect(() => {
    getUserAccount();
    getUserIdentity();
  }, [getUserAccount, getUserIdentity]);

  const saveCartItemData = async (data: any) => {
    try {
      dispatch(CART_LENGTH(data?.length));
     console.log()
     if(data?.length > 0){

     
      let cartItemSKU: any = [];
  
      data &&
        data?.map((ele: any, index: number) => {
          cartItemSKU.push(ele?.Sku);
        });
  
      const productListFromSKU: any = await getProductsBySKUWithImge(
        webStoreData?.Id,
        cartItemSKU
      );

      // Add missing key and value from Product List to Cart
      const updatedCart =
        data &&
        data?.map((cartItem: any) => {
          const product =
            productListFromSKU?.products &&
            productListFromSKU?.products.find(
              (productItem: any) => productItem.id === cartItem.Product2Id
            );
            console.log("PRODUCT +++======>>>>>>>",product)
  
          if (product) {
            return {
              ...cartItem,
              EANUPC__c: product.fields.EANUPC__c,
              sku:product.fields.StockKeepingUnit,
              requestedQuantityUom:  product.fields.QuantityUnitOfMeasure,
            };
          }
          return cartItem;
        });
  
      setFinalCartItem([]);
      setFinalCartItem(updatedCart);
  
      checkforOutandInStock(updatedCart);
     }else{
      dispatch(SET_LOADER(false))

     }
    } catch (error) {
      // Handle the promise rejection here
      console.error("An error occurred:", error);
    dispatch(SET_LOADER(false))

    }
  };
  
  

  // const saveInventoryData = (data: any) => {
  //   console.log(
  //     data.currentPageOrderedEntries,
  //     "INVENTORY DATA ========================"
  //   );
  //   setPlantProductInventory(data.currentPageOrderedEntries);

  //   dispatch(CART_LENGTH(data.currentPageOrderedEntries.length));

  //   // Add missing key and value from Product List to Cart
  //   const updatedCart =
  //     data.currentPageOrderedEntries &&
  //     data.currentPageOrderedEntries.map((cartItem: any) => {
  //       const product =
  //         ProductList &&
  //         ProductList.find(
  //           (productItem: any) => productItem.Id === cartItem.Product2Id
  //         );
  //       if (product) {
  //         return {
  //           ...cartItem,
  //           MaterialIdNumber__c: product.MaterialIdNumber__c,
  //           EANUPC__c: product.EANUPC__c,
  //         };
  //       }
  //       return cartItem;
  //     });

  //   setFinalCartItem(updatedCart);

  //   checkforOutandInStock(updatedCart);
  // };

  const getDataFromStore = () => {

    net.query(`SELECT CartId,Product2Id,Quantity,Id,IsDeleted,Sku,TotalPrice,Name,UnitAdjustedPrice,TotalAmount,CreatedDate FROM CartItem where CartId = '${CartId}' LIMIT 2000`,
      (response: any) => {
        if (response?.done) {

         saveCartItemData(response?.records)
        //  setCartItems(response.records)

      // getProductFromStore(data.currentPageOrderedEntries, inventoryData)


        } else {
          store.dispatch(SET_LOADER(false))
        }
      },
      (error:any) => {
        store.dispatch(SET_LOADER(false))
        console.log("getUserDetailsFromUserID Error= ", error);
      });



    // syncDownCartItem(CartId);
    // setTimeout(() => {
    //   getCartItemData();
    // }, 1000);

    setPlantProductInventory(PlantProductInventoryData);
  };

  const getCartItemData = () => {
    querySoup(
      "CartItem",
      (success: any) => saveCartItemData(success),
      (error: any) => console.log("querySoup----error", error),
      "CartId"
    );

    // querySoup(
    //   "PlantProductInventory__c",
    //   (success: any) => saveInventoryData(success),
    //   (error: any) => console.log("querySoup----error", error),
    //   "PlantCode__c"
    // );
  };

  // const getCartItemFromStoreData = () => {
  // const matchingCartItems = cartItem.filter(cart =>
  //   webCart.some(webCartItem => webCartItem.Id === cart.CartId)
  // );

  // console.log(matchingCartItems, 'FINAL MATCHING PRODUCTS FORM WEBCART AND CART ITEM =============================')

  // if (matchingCartItems.length > 0) {
  //   matchingCartItems.map((ele) => {
  //     dispatch(ADD_To_CART(ele))
  //   })
  // }

  // setFinalCartItem([...cartItem])
  // }

  // const updateCartItem = (selectedCartItem: any) => {
  //   // console.log(selectedCartItem, 'SELECTED CART ITEM =======================')
  //   const updatedDetails = {
  //     // CartId: selectedCartItem.CartId,
  //     Id: selectedCartItem.Id,
  //     IsDeleted: selectedCartItem.IsDeleted,
  //     LastModifiedDate: selectedCartItem.LastModifiedDate,
  //     Name: selectedCartItem.Name,
  //     Product2Id: selectedCartItem.Product2Id,
  //     Quantity: selectedCartItem.Quantity,
  //     Sku: selectedCartItem.Sku,
  //     // TotalAmount: selectedCartItem.TotalAmount,
  //     TotalPrice: selectedCartItem.TotalPrice,
  //     UnitAdjustedPrice: selectedCartItem.UnitAdjustedPrice,
  //     _soupEntryId: selectedCartItem._soupEntryId,
  //     __local__: true,
  //     __locally_created__: false,
  //     __locally_updated__: true,
  //     __locally_deleted__: false,
  //     attributes: { type: "CartItem" },
  //   };
  //   createUpdateSoup(
  //     updatedDetails,
  //     "CartItem",
  //     (updatedContact: any) => {
  //       console.log("CarItem updated successfully:", updatedContact);
  //     },
  //     (error: any) => {
  //       console.log("Error updating CarItem:", error);
  //     }
  //   );
  // };

  // const deleteCartItem = (selectedCartItem: any) => {
  //   console.log(selectedCartItem, 'SELECTED CART ITEM =======================')
  //   const updatedDetails = {
  //     // CartId: selectedCartItem.CartId,
  //     Id: selectedCartItem.Id,
  //     IsDeleted: true,
  //     LastModifiedDate: selectedCartItem.LastModifiedDate,
  //     Name: selectedCartItem.Name,
  //     Product2Id: selectedCartItem.Product2Id,
  //     Quantity: selectedCartItem.Quantity,
  //     Sku: selectedCartItem.Sku,
  //     // TotalAmount: selectedCartItem.TotalAmount,
  //     TotalPrice: selectedCartItem.TotalPrice,
  //     UnitAdjustedPrice: selectedCartItem.UnitAdjustedPrice,
  //     _soupEntryId: selectedCartItem._soupEntryId,
  //     __local__: true,
  //     __locally_created__: false,
  //     __locally_updated__: false,
  //     __locally_deleted__: true,
  //     attributes: { type: "CartItem" }
  //   }
  //   createUpdateSoup(
  //     updatedDetails,
  //     'CartItem',
  //     (updatedCart: any) => {
  //       console.log('CarItem DELETED successfully:', updatedCart);

  //       const finalCartItemClone = [...finalCartItem]

  //       setFinalCartItem((prev) =>
  //         prev.filter((product: any) => product.Id !== selectedCartItem.Id)
  //       );
  //     },
  //     (error: any) => {
  //       console.log('Error updating CarItem:', error);
  //     }
  //   );
  // }

  const checkforOutandInStock = (cartData: any) => {
    // Create a mapping of test values to corresponding values
    const inventoryMapping = new Map();

    PlantProductInventoryData.forEach((item: any) => {
      if (!inventoryMapping.has(item.Product2__c)) {
        inventoryMapping.set(item.Product2__c, []);
      }
      inventoryMapping
        .get(item.Product2__c)
        .push(item.LowThreshold__c, item.OutThreshold__c, item.ATP__c);
    });

    // Function to find corresponding value for a given value
    function findCorrespondingTest2(testValue: any) {
      return inventoryMapping.get(testValue);
    }

    // // find corresponding values
    const finalCartItemClone = [...cartData];
    const finalCartItemWithStockStatus: any = finalCartItemClone.map(
      (product: any) => {
        if (inventoryMapping.has(product.Product2Id)) {
          const correspondingTest2Value = findCorrespondingTest2(
            product.Product2Id
          );
          let LowThreshold__c = correspondingTest2Value[0];
          let OutThreshold__c = correspondingTest2Value[1];
          let ATP__c = correspondingTest2Value[2];
          let stockStatus;

          if (ATP__c <= LowThreshold__c) stockStatus = "lowstock"; //out of stok
          if (ATP__c < OutThreshold__c) stockStatus = "outOfStock"; //low stock

          return {
            ...product,
            stockStatus: stockStatus,
            IsSelected: false,
          };
        }
        return {
          ...product,
          stockStatus: "inStock",
          IsSelected: false,
        };
      }
    );
    setFinalCartItem(finalCartItemWithStockStatus);
    getCartWithStockStatus([...finalCartItemWithStockStatus]);
  };

  const getCartWithStockStatus = (finalCartItemWithStockStatus: any) => {
    setOutOfStockProducts(
      finalCartItemWithStockStatus.filter(
        (product: any) => product.stockStatus === "outOfStock"
      )
    );

    setInStockProducts(
      finalCartItemWithStockStatus.filter(
        (product: any) => product.stockStatus !== "outOfStock"
      )
    );
  };
  // console.log(finalCartItem.filter((product: any) => product.stockStatus !== 'outOfStock'), 'OUT OF STOCKKKKKKKKKKKKKKKKKKKk====================')

  const removeSelectedFromFinalCart = (productId: any) => {
    const finalCartClone = [...finalCartItem];
    const updatedItems = finalCartClone.filter(
      (product: any) => product.Id !== productId
    );
    // setFinalCartItem(updatedItems);
    setFinalCartItem((prev) =>
      prev.filter((product: any) => product.Id !== productId)
    );
    getCartWithStockStatus(updatedItems);
    // setInStockProducts(finalCartItem.filter((product: any) => product.stockStatus !== 'outOfStock'))
  };

  const SORT = (inStockData: any) => {
    const list: any = [...inStockData];

    if (mySort != null) {
      const sortKey = mySort.Sorttype;
      const Ascending = mySort.Ascending;

      if (list.length > 0) {
        const sortedProducts: any = list.sort((a: any, b: any) => {
          if (Ascending) {
            if (a[sortKey] < b[sortKey]) return -1;
            if (a[sortKey] > b[sortKey]) return 1;
          } else {
            // console.log(sortKey,Ascending,"=====else desending")
            if (a[sortKey] > b[sortKey]) return -1;
            if (a[sortKey] < b[sortKey]) return 1;
          }
          return 0;
        });
        setInStockProducts(sortedProducts);
      }
    }
  };

  // console.log(mySort, 'MY SORT======================')

  // const handleReplaceProduct = (Id: any) => {
  //   if (selectedCardID === Id) {
  //     setSelectedCardID(null);
  //   } else {
  //     setSelectedCardID(Id);
  //   }
  // };

  // dispatch(ADD_IN_CART_QUNTITY({ productId: product.Id, count: count }));
  const handleQuantityChange = (Id: any, count: any, isInputValue: boolean) => {
    setIsCartUpdated(false);
    const updatedList: any = finalCartItem.map((product2: any) => {
      if (product2.Id === Id) {
        const updatedProduct = { ...product2 };
        if (
          updatedProduct.Quantity != undefined ||
          updatedProduct.Quantity != null
        ) {
          isInputValue
            ? (updatedProduct.Quantity = count)
            : (updatedProduct.Quantity += count);

          if (updatedProduct.Quantity < 0) {
            updatedProduct.Quantity = 0;
          }
        } else {
          updatedProduct.Quantity = 1;
        }
        // updateCartItem(updatedProduct)
        updateCartItem(updatedProduct, "Cart");
        return updatedProduct;
      }
      // console.log(product2, 'PRODUCT GOT UPDATED22222222222222-------------------------')

      return product2;
    });
    setFinalCartItem(updatedList);
  };

  const clearCart = () => {
    // dispatch(REMOVE_ALL_CART());
    if (finalCartItem.length > 0) {
      setIsCartUpdated(false);
      finalCartItem.map((product: any, index: any) => {
        deleteCartItem(product);
      });
    }
  };

  const outOfStockRemoveAll = () => {
    if (outOfStockProducts.length > 0) {
      outOfStockProducts.map((product: any, index: any) => {
        deleteCartItem(product);
      });
    }
  };

  const storeSelected = (product: any) => {
    // console.log('-------------------')
    // console.log(product)
    // console.log('-------------------')

    const existingProduct = selctedCarts.find(
      (item: any) => item.Id == product.Id
    );
    if (existingProduct) {
      const updatedArray = selctedCarts.filter(
        (item: any) => item.Id != product.Id
      );
      setSelctedCarts(updatedArray);
    } else {
      setSelctedCarts((prev) => [...prev, product]);
    }
  };

  const ConformModelOpen = () => {
    if (selctedCarts.length > 0) {
      setConformmodel(true);
    }
  };

  const removeMultisected = () => {
    setIsCartUpdated(false);
    if (selctedCarts.length > 0) {
      selctedCarts.map((product: any, index: any) => {
        deleteCartItem(product);
      });
    }
  };
  const handleInput = (Id: any, num: any) => {
    console.log(">>>>HandleInput>>>>", Id, num);
    setIsCartUpdated(false);
    handleQuantityChange(Id, Number(num), true);
  };

  const showToast = (errMsg: string) => {
    Toast.show({
      type: "success",
      text1: "",
      text2: errMsg,
      visibilityTime: 3000,
    });
  };

  const onUpdateCartClick = () => {
    
    dispatch(SET_LOADER(true))


    let cartItems: any = [];
    finalCartItem.map((item: any, index: number) => {
      console.log("item finalCartItem ",item)

      cartItems.push({
        number: ((index + 1) * 10).toString(),
        material: item?.Sku,
        requestedQuantity: item?.Quantity,
        requestedQuantityUom: item?.requestedQuantityUom,
      });
    });

     console.log("Cart items: =====", cartItems);
    let date=new Date()
    let reqDeliveryDate= moment(date).format('YYYY/MM/DD')
    let getNewUpdatedDateString=reqDeliveryDate.replace(/\//g,'')
    console.log("reqDeliveryDate",getNewUpdatedDateString,typeof(getNewUpdatedDateString))

    const updateCartRequestBody = {
      salesOrg: userData.bottlerId,
      orderSimulate: {
        header: {
          documentType: "ZOR",
          requestedDeliveryDate: getNewUpdatedDateString,
          distributionChannel: "Z1",
        },
        partner: [{ number: accountNumber }],
        items: cartItems,
      },
    };

    console.log(
      "updateCartRequestBody ==>",
      JSON.stringify(updateCartRequestBody)
    );

   

    UpdateCart(updateCartRequestBody).then((result: any) => {
      if (result) {
          console.log("result ==>", result.orderSimulate);
          if (result.orderSimulate.return.type == "E") {
            showToast(result.orderSimulate.return.text);
            Alert.alert("", result.orderSimulate.return.text, [
              {
                text: "Close",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              // {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);

            // ToastAndroid.show(result.orderSimulate.return.text, ToastAndroid.SHORT);
          } else {
            if (result && result.orderSimulate.header) {
              if (
                result.orderSimulate.moq &&
                result.orderSimulate.moq.length > 0
              ) {
                let extraFees = 0;
                let totalExtraFees = 0;
                result.orderSimulate.moq.map((ele: any, i: any) => {
                  ele.fee ? (extraFees += Number(ele.fee)) : null;
                  if (result.orderSimulate.moq.length - 1 == i) {
                    setMoq(extraFees);
                    totalExtraFees =
                      Number(result.orderSimulate.header.totalFees) - Number(extraFees);
                      console.log("totalExtraFees=>",totalExtraFees,typeof(result.orderSimulate.header.totalFees),"extraFees =>",extraFees,typeof(extraFees))
                    setDeliveryCharge(totalExtraFees);
                  }
                });
              } else if (
                result.orderSimulate.condition &&
                result.orderSimulate.condition.length > 0
              ) {
                console.log(
                  "INSIDE ELSE IF CONDITION",
                  result.orderSimulate.condition
                );
                let extraFees = 0;
                let totalExtraFees = 0;
                result.orderSimulate.condition.map((ele: any, i: any) => {
                  if (ele.isInactive == "" && ele.type == "ZMOV") {
                    console.log("FROM SECOND CONDITION", ele);
                    ele.value ? (extraFees += Number(ele.value)) : "";
                  }

                  // console.log("result.orderSimulate.condition.length",result.orderSimulate.condition.length,"INDEZXXX",i,result.orderSimulate.header.totalFees)
                  if (result.orderSimulate.condition.length - 1 == i) {
                    setMov(extraFees);
                    totalExtraFees =
                      Number(result.orderSimulate.header.totalFees) - Number(extraFees);
                    console.log("FINAL TOATLCHARGES =>", totalExtraFees);
                    setDeliveryCharge(totalExtraFees);
                  }
                });
              }

              setUpdatedOrderSummary(result.orderSimulate.header);
              setIsCartUpdated(true);
            }
            if(result && result?.orderSimulate?.item){
              let updatedFinalCartItem:any = finalCartItem.map((ele:any) => {
                let foundOrderSimulateItem = result?.orderSimulate?.item?.find((element:any) => element?.material === ele.Sku)

                return {...ele, youSaved:foundOrderSimulateItem?.totalDiscounts, TotalAmount:foundOrderSimulateItem?.subTotal}

              })

              setFinalCartItem(updatedFinalCartItem);
            }

            // ToastAndroid.show("Cart Updated Successfully!", ToastAndroid.SHORT);
          }
          setOrderSimulateData(result.orderSimulate.header);
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
        setIsCartUpdated(false);
      });
  };

  const handleCheckBox = (value: any, productId: any) => {
    const CloneData = [...finalCartItem];
    const updatedData: any = CloneData.map((item: any, index) => {
      if (item.Id === productId) {
        storeSelected({ ...item, IsSelected: !item.IsSelected });
        return { ...item, IsSelected: !item.IsSelected };
      }
      return item;
    });

    getCartWithStockStatus(updatedData);
    setFinalCartItem(updatedData);
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const handleDownload = async () => {
    const mockData: any = [];

    inStockProducts.map((product: any) => {
      const productName = product.Name.replace(/,.*$/, "");
      mockData.push({
        Name: productName,
        Quantity: product.Quantity,
        "Item Price": product.TotalPrice,
        "Invoice Amount": product.invoiceNo || "00",
        SKU: product.StockKeepingUnit || "00",
        UPC: product.EANUPC__c || "00",
      });
    });

    try {
      if (mockData) {
        const csvContent = convertToCsv(mockData);
        // const path = `${RNFetchBlob.fs.dirs.DownloadDir}/Cart Export.csv`;
        const basePath = RNFetchBlob.fs.dirs.DownloadDir;
        const fileName = 'Cart Export.csv';
        if (Platform.OS === 'ios') {
          console.log('IOS device permission code required')
          RNFetchBlob.fs
          .writeFile(basePath, csvContent, 'utf8')
          .then(() => {
            console.log(`wrote file ${basePath}`);
            // wrote file /storage/emulated/0/Download/data.csv
          })
          .catch(error => console.error(error));
        } else {
          // let isPErmissionofStorageGranted = await PermissionsAndroid.check(
          //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          // );
          let newVersion = deviceVersion.toString()
          console.log("VERSION NUMBER", newVersion)
          let checkVersion = newVersion > '12'
          if (checkVersion) {
            let isPErmissionofStorageGranted = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            );

            if (!isPErmissionofStorageGranted) {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // await RNFetchBlob.fs.writeFile(path, csvContent);
                await saveCsvFileWithUniqueName(basePath, fileName, csvContent);
                Toaster('Download in Progress. Check your /downloads path.')
              } else {
                Alert.alert(
                  'Storage Permission Required',
                  'You need to give storage permission to download and display product images. \n \n 1. Click open settings and select the permissions, \n 2. Select storage permissions or Photos and video option. \n 3. Click on allow.',
                  [
                    { text: 'Open Settings', onPress: openSettings },
                  ],
                );
              }
            }
            else {
              // await RNFetchBlob.fs.writeFile(path, csvContent);
              await saveCsvFileWithUniqueName(basePath, fileName, csvContent);
              Toaster('Download in Progress. Check your /downloads path.')
            }

          } else {
            let isPErmissionofStorageGranted = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );

            if (!isPErmissionofStorageGranted) {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // await RNFetchBlob.fs.writeFile(path, csvContent);
                await saveCsvFileWithUniqueName(basePath, fileName, csvContent);
                Toaster('Download in Progress. Check your /downloads path.')
              } else {
                Alert.alert(
                  'Storage Permission Required',
                  'You need to give storage permission to download and display product images. \n \n 1. Click open settings and select the permissions, \n 2. Select storage permissions or Photos and video option. \n 3. Click on allow.',
                  [
                    { text: 'Open Settings', onPress: openSettings },
                  ],
                );
              }
            }
            else {
              // await RNFetchBlob.fs.writeFile(path, csvContent);
              await saveCsvFileWithUniqueName(basePath, fileName, csvContent);
              Toaster('Download in Progress. Check your /downloads path.')
            }

          }

        }
      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  console.log(finalCartItem, '--------------------------', inStockProducts, '----------------------', outOfStockProducts)

  async function saveCsvFileWithUniqueName(
    basePath: any,
    fileName: any,
    content: any
  ) {
    let currentName = fileName;
    let suffix = 1;

    while (true) {
      try {
        const fullPath = `${basePath}/${currentName}`;
        const fileExists = await RNFetchBlob.fs.exists(fullPath);
        console.log(fileExists, fullPath)
        if (!fileExists) {
          // Save the content with the current name
          await RNFetchBlob.fs.writeFile(fullPath, content);
          break;
        }

        // File with the same name exists, increment the suffix
        currentName = `${fileName.replace(".csv", `(${suffix}).csv`)}`;
        suffix++;
      } catch (error) {
        console.error("Error while saving CSV:", error);
        break;
      }
    }
  }

  const convertToCsv = (data: any) => {
    const headers = Object.keys(data[0]).join(",") + "\n";
    const rows = data.map((row: any) => Object.values(row).join(","));
    return headers + rows.join("\n");
  };

  const showToastDownload = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Download in Progress. Check your /downloads path.",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  // Separator line
  const Separator = () => <View style={styles.separator} />;
  return (
    <View style={styles.bodyFlexStyle}>
      <ScrollView>
        {finalCartItem.length === 0 && (
          <View style={{ alignItems: "center", marginTop: 15 }}>
            {isDataLoading ? (
              <Text style={styles.viewCartHeading}>Loading...</Text>
            ) : (
              <Text style={styles.viewCartHeading}>Your Cart is Empty</Text>
            )}

            {
              !isDataLoading && inStockProducts.length === 0 && outOfStockProducts.length === 0 && finalCartItem.length === 0 &&
              (<TouchableOpacity
                onPress={() => navigation.navigate('ProductsListing')}
                style={[styles.addToCartBtn, { backgroundColor: '#000', borderColor: '#000' }]}
              >
                <Text style={{ textAlign: "center", color: 'white' }}>Continue Shopping</Text>
              </TouchableOpacity>)
            }
          </View>
        )}

        {/* out of stack Alert box */}

        {outOfStockProducts?.length > 0 && (
          <View style={styles.blockYellow}>
            <View style={styles.viewCartOuter}>
              <View style={{ paddingTop: 15 }}>
                <AlertTriangle />
              </View>
              <View style={styles.gapFlexStyle}>
                <Text style={styles.outOfStockHeading}>
                  {t("VIEW_CART.firstTitle")}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.viewCartPara}>
                    {t("VIEW_CART.firstPara")}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ marginTop: 10 }}
                  onPress={outOfStockRemoveAll}
                >
                  <Text style={[styles.showText, styles.clearAllTxt]}>
                    {t("VIEW_CART.clearTitle")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* //Minimum order Value Part */}

        {mov && mov > 0 ? (
          <View style={styles.minOrderWrapper}>
            <View style={styles.minOrderFirstBlock}>
              <View style={styles.alertImg}>
                <AlertTriangle />
              </View>
              <View>
                <Text>{t("VIEW_CART.minOrderVal")}</Text>
                <Text>{t("VIEW_CART.minOrderDescription")}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.minOrderSecondBlock}
              onPress={() => navigation.navigate("ProductsListing")}
            >
              <Text style={styles.contiShoppingTxt}>
                {t("VIEW_CART.continueShopping")}
              </Text>
            </TouchableOpacity>
          </View>
          
        ):null}

        {moq && moq > 0 ? (
          <View style={styles.minOrderWrapper}>
            <View style={styles.minOrderFirstBlock}>
              <View style={styles.alertImg}>
                <AlertTriangle />
              </View>
              <View>
                <Text>{t("VIEW_CART.minOrderCharge")}</Text>
                <Text>{t("VIEW_CART.minOrderDescription")}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.minOrderSecondBlock}
              onPress={() => navigation.navigate("ProductsListing")}
            >
              <Text style={styles.contiShoppingTxt}>
                {t("VIEW_CART.continueShopping")}
              </Text>
            </TouchableOpacity>
          </View>
        ):null}

        <View
          style={[
            styles.blockYellow,
            outOfStockProducts?.length == 0 && { borderWidth: 0 },
          ]}
        >
          {outOfStockProducts &&
            outOfStockProducts.map((product: any, prodIndex: number) => {
              const Id = product.Id;
              const image = require("../../assets/images/CocaCola.png"); //product.image;
              const productName = product.Name;
              const UPC = product?.EANUPC__c;
              const stock = product.stock;
              const quantity = product.Quantity || 0;
              const isReplacementListVisible = selectedCardID === Id;
              return (
                <View key={prodIndex}>
                  <View style={[styles.container, { marginLeft: 10 }]}>
                    <View style={{ paddingTop: 16 }}>
                      <Grayscale>
                        {/* <Image
                          source={require("../../assets/images/CocaCola.png")}
                          style={{ width: 90 }}
                        /> */}
                        <ImageComponent
                          url={{
                            uri: imgAccessPath(product.Product2Id, `0_0`),
                          }}
                          style={{ width: 92, height: 120, marginRight: 4 }}
                        />
                      </Grayscale>
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.viewCartHeading}>
                        {" "}
                        {product?.Name}
                      </Text>
                      <View style={styles.viewCardNumber}>
                        <View style={styles.gapStyle}>
                          <Text style={styles.productPara}>
                            {t("VIEW_CART.skuTitle")}
                            <Text style={{ fontWeight: "bold", color: "#000" }}>
                              {product?.StockKeepingUnit}
                            </Text>
                          </Text>
                        </View>
                        <View
                          style={{ marginVertical: 10, marginHorizontal: 5 }}
                        >
                          <VerticalLine />
                        </View>
                        <View style={styles.gapStyle}>
                          <Text style={styles.productPara}>
                            {t("VIEW_CART.upcTitle")}
                            <Text style={{ fontWeight: "bold", color: "#000" }}>
                              {UPC}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View style={styles.viewCardNumber}>
                        <View style={styles.viewProductNumber}>
                          {/* <View style={styles.orangeOutBox}>
                            <Text
                              style={[styles.whitetext, styles.contractedSmall]}
                            >
                              {t("VIEW_CART.contractedTitle")}
                            </Text>
                          </View> */}

                          <View style={[styles.pinkOutBox, styles.gapStyle]}>
                            <Text style={styles.redtext}>
                              {t("VIEW_CART.outstockTitle")}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.viewCardCounterHeader]}>
                    <QuantityManager
                      quantity={product.Quantity}
                      Id={Id}
                      addQty={() => handleQuantityChange(Id, 1, false)}
                      minusQty={() => {
                        handleQuantityChange(Id, -1, false);
                      }}
                      inputeHandle={handleInput}
                      buttonBorder={true}
                      editableInput={false}
                      isDisabled={
                        product?.stockStatus === "outOfStock" ? true : false
                      }
                    />
                    <View style={[styles.viewCartOuter]}>
                      <View style={styles.gapStyle}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "600",
                            textAlign: "right",
                            color: "#000",
                          }}
                        >
                         ${product?.TotalAmount
                              ? Number(product?.TotalAmount).toFixed(2)
                              : 0.00}
                        </Text>

                          {
                            Math.abs(Number(product?.youSaved)) > 0 &&
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            textAlign: "right",
                          }}
                        >
                          {t("VIEW_CART.moneysavedTitle")}{" "}
                          ${product?.youSaved ? Math.abs(Number(product?.youSaved)).toFixed(2) : 0.00}
                        </Text>

                          }
                      </View>
                      <TouchableOpacity
                        style={{ marginHorizontal: 10, marginVertical: 20 }}
                        onPress={() => deleteCartItem(product)}
                      >
                        <DeleteIcon />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {outOfStockProducts.length - 1 !== prodIndex &&
                    !isReplacementListVisible ? (
                    <Separator />
                  ) : (
                    ""
                  )}
                </View>
              );
            })}
        </View>

        {/* Delete selected item Row and sort by button there */}
        {finalCartItem.length !== 0 && (
          <View style={styles.deleteSelectedHeader}>
            <View style={styles.viewCardNumber}>
              <TouchableOpacity
                style={[styles.gapStyle, styles.deleteSelectedItemsOuter]}
                onPress={ConformModelOpen}
              >
                <DeleteIcon />
                <View style={styles.gapStyle}>
                  <Text>{t("VIEW_CART.deleteTitle")}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.projectListInnerHeader}>
              <Pressable
                onPress={() => {
                  // navigation.navigate("SortCompo");
                  setOpenSortModal(true);
                }}
              >
                {({ pressed }) => (
                  <View style={styles.projectListInnerHeader}>
                    <View style={styles.gapStyle}>
                      <Text style={styles.smallTextStyle}>
                        {t("VIEW_CART.sortbyTitle")}
                        {mySortTitle ? `-${mySortTitle}` : ""}
                      </Text>
                    </View>

                    <View style={styles.gapStyle}>
                      <DownArrow />
                    </View>
                  </View>
                )}
              </Pressable>

              <View style={styles.gapStyle}>
                <TouchableOpacity
                  onPress={(event) => {
                    const { pageY } = event.nativeEvent;
                    setMenuTopPosition(pageY - 30);
                    setIsShowMoreSection(true);
                  }}
                // style={styles.moreIconOuter}
                >
                  <View style={styles.gapStyle}>
                    <MoreIcon />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* inStockProducts list  */}
        <View style={styles.BlockWhite}>
          {inStockProducts &&
            inStockProducts.map((product: any, prodIndex: any) => {
              const CheckSelected = selctedCarts.includes(product.Id);
              const Id = product.Id;
              const image = { uri: imgAccessPath(product.Product2Id, `0_0`) };
              // console.log("cartItem query re=== cart item ===")
              if (!product.IsDeleted) {
                return (
                  // <TouchableOpacity
                  //   key={prodIndex}
                  //   onLongPress={() => selectMultipleLongPress(product)}
                  //   style={[CheckSelected && styles.selectedItem]}
                  // >
                  <View key={prodIndex}>
                    <View style={[styles.container]}>
                      <View style={{ paddingTop: 16 }}>
                        <CheckBox
                          style={Platform.OS === "ios" ? styles.customCheckbox : {}}
                          disabled={false}
                          boxType={'square'}
                          value={product.IsSelected}
                          onValueChange={(value) =>
                            handleCheckBox(value, product.Id)
                          }
                        />
                      </View>
                      <View style={{ paddingTop: 16 }}>
                        {/* <Image
                          source={require("../../assets/images/CocaCola.png")}
                          style={{ width: 90 }}
                        /> */}
                        <ImageComponent
                          url={image}
                          style={{ width: 92, height: 120, marginRight: 4 }}
                        />
                      </View>

                      <View style={styles.textContainer}>
                        <Text style={styles.viewCartHeading}>
                          {" "}
                          {product?.Name}
                        </Text>
                        <View style={styles.viewCardNumber}>
                          <View style={styles.gapStyle}>
                            <Text style={styles.productPara}>
                              {t("VIEW_CART.skuTitle")}
                              <Text
                                style={{ fontWeight: "bold", color: "#000" }}
                              >
                                {product?.Sku}
                              </Text>
                            </Text>
                          </View>
                          <View
                            style={{ marginVertical: 10, marginHorizontal: 5 }}
                          >
                            <VerticalLine />
                          </View>
                          <View style={styles.gapStyle}>
                            <Text style={styles.productPara}>
                              {t("VIEW_CART.upcTitle")}
                              <Text
                                style={{ fontWeight: "bold", color: "#000" }}
                              >
                                {product?.EANUPC__c}
                              </Text>
                            </Text>
                          </View>
                        </View>
                        <View style={styles.viewCardNumber}>
                          <View style={styles.viewProductNumber}>
                            {/* <View style={styles.orangeOutBox}>
                              <Text
                                style={[
                                  styles.whitetext,
                                  styles.contractedSmall,
                                ]}
                              >
                                {t("VIEW_CART.contractedTitle")}
                              </Text>
                            </View> */}

                            {product?.stockStatus === "lowstock" && (
                              <View
                                style={[styles.pinkOutBox, styles.gapStyle]}
                              >
                                <Text style={styles.redtext}>
                                  {t("VIEW_CART.lowStockTitle")}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.viewCardCounterHeader]}>
                      <QuantityManager
                        quantity={product.Quantity}
                        Id={Id}
                        addQty={() => handleQuantityChange(Id, 1, false)}
                        minusQty={() => {
                          handleQuantityChange(Id, -1, false);
                        }}
                        inputeHandle={handleInput}
                        buttonBorder={true}
                        editableInput={true}
                        isDisabled={
                          product?.stockStatus === "outOfStock" ? true : false
                        }
                      />
                      <View style={[styles.viewCartOuter]}>
                        <View style={styles.gapStyle}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "600",
                              textAlign: "right",
                              color: "#000",
                            }}
                          >
                            ${product?.TotalAmount
                              ? Number(product?.TotalAmount).toFixed(2)
                              : 0.00}
                          </Text>
                          {
                            Math.abs(Number(product?.youSaved)) > 0 &&
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            textAlign: "right",
                          }}
                        >
                          {t("VIEW_CART.moneysavedTitle")}{" "}
                          ${product?.youSaved ? Math.abs(Number(product?.youSaved)).toFixed(2) : 0.00}
                        </Text>

                          }
                        </View>
                        <TouchableOpacity
                          style={{ marginHorizontal: 10, marginVertical: 20 }}
                          onPress={() => (
                            deleteCartItem(product), setIsCartUpdated(false)
                          )}
                        >
                          <DeleteIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {inStockProducts.length - 1 !== prodIndex ? (
                      <Separator />
                    ) : (
                      ""
                    )}
                  </View>
                );
              }
            })}
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "white" }}>
        {/* <ViewAccordian /> */}
        <CheckoutTotal
          isShowOrderSummary={true}
          isFromCart={true}
          navigation={navigation}
          onUpdateCartPress={() => onUpdateCartClick()}
          orderSummaryData={updatedOrderSummary}
          webCartData={WebCart}
          totalCartItemCount={finalCartItem.length}
          deliveryCharge={deliveryCharge}
          mov={mov?mov:moq?moq:0} //minimum order value
          isCartUpdated={isCartUpdated}
        />
      </View>

      {/* More options modal */}
      <Modal
        transparent={true}
        visible={isShowMoreSection}
        onRequestClose={() => {
          setIsShowMoreSection(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setIsShowMoreSection(false);
          }}
          style={styles.moreSectionOuter}
        >
          <View
            style={[
              {
                top:
                  menuTopPosition < Dimensions.get("window").height / 1.2
                    ? menuTopPosition
                    : menuTopPosition - 150,
              },
              styles.moreSectionInner,
            ]}
          >
            {/* <TouchableOpacity
              onPress={() => {
                setIsShowMoreSection(false);
              }}
              style={[styles.moreInnerSectionSelected, styles.firstMenu]}
            >
              <View style={styles.viewProductNumber}>
                <View style={styles.gapStyle}>
                  <SaveListIcon />
                </View>
                <View style={styles.gapStyle}>
                  <Text style={styles.moreOptionTextSelected}>
                    {t("VIEW_CART.saveTitle")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                setIsShowMoreSection(false);
                clearCart();
              }}
              style={styles.moreInnerSection}
            >
              <View style={styles.viewProductNumber}>
                <View style={styles.gapStyle}>
                  <ClearCart />
                </View>
                <View style={styles.gapStyle}>
                  <Text style={styles.moreOptionText}>
                    {t("VIEW_CART.clearcartTitle")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDownload}
              style={[styles.lastMoreInnerSection, styles.lastMenu]}
            >
              <View style={styles.viewProductNumber}>
                <View style={styles.gapStyle}>
                  <ExportIcon />
                </View>
                <View style={styles.gapStyle}>
                  <Text style={styles.moreOptionText}>
                    {t("VIEW_CART.exportTitle")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        transparent={true}
        visible={openSortModal}
        onRequestClose={() => {
          setOpenSortModal(false);
        }}
      >
        <CartSort
          navigation={navigation}
          cartSortModalToggle={() => setOpenSortModal(false)}
        />
      </Modal>

      {/* conformation model  */}
      <ConformationModel
        modalVisible={conformmodel}
        setmodalVisible={setConformmodel}
        ConformAction={removeMultisected}
      />
      {loader && <Loader message="Please wait..." />}
    </View>
  );
};

export default ViewAddToCart;
