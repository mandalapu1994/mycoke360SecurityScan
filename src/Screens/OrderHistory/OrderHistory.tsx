import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableHighlight,
  Pressable,
  PermissionsAndroid,
  Alert,
  ToastAndroid
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import SearchBar from "../../components/SearchBar";
import DeleteIcon from "../../assets/images/DeleteIcon";
import DownArrow from "../../assets/images/DownArrow";
import FooterComponent from "../../components/FooterComponent";
import OrderInfo from "../OrderConfirmation/OrderInfo.json";
import ExportIcon from "../../assets/images/ExportIcon";
import UpBlackArrow from "../../assets/images/UpArrow";
import FilterIcon from "../../assets/images/FilterIcon";
import CloseIcon from "../../assets/images/Close";
import UpArrow from "../../assets/images/UpArrow";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from "@react-native-community/checkbox";
import BlackCross from "../../assets/images/BlackCross";
import CalendarIcon from "../../assets/images/CalendarIcon";
import Cross from "../../assets/images/Cross";
import { getDateTimeSeperatedString } from "../../utils/DateTimeFormator";
import moment from "moment";
import OrderHistorySort from "./OrderHistorySort";
import { clearOrderHistroySort } from "../../redux/Reducer/orderHistryReducer";
import { createUpdateSoup, querySoup } from "../../Salesforce/SmartStore";





import RNFetchBlob from 'rn-fetch-blob';
import { syncDownDeliveryMethod, syncDownOrdersItem } from "../../Salesforce/SmartSync";
import { postExample } from "../../Api/apiService";
import Loader from "../../components/Loader/loader";


const Separator = () => <View style={styles.separator} />;

const OrderHistory: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const mySort = useSelector((state: any) => state.orderHistrySort.mysort);
  const mySortTitle = useSelector((state: any) => state.orderHistrySort.mysortTitle);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [orderHistoryData, setOrderHistoryData] = useState<any>([]);
  const [orderHistoryDataBackup, setOrderHistoryDataBackup] = useState([]);

  const [searchedText, setSearchedText] = useState("");
  const [changeOrderModal, setChangeOrderModal] = useState(false);
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [orderHistoryLength, setOrderHistoryLength] = useState(1);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState()
  const [selctedCarts, setSelctedCarts] = useState<any>([])
  const [orderDeliveryDetails, setOrderDeliveryDetails] = useState([])
  const [allProducts, setAllProducts] = useState<any>({})
  const [specificOrderData, setSpecificOrderData] = useState<any>({})
  const loader = useSelector((state: any) => state.loader.isLoaderVisible);


  // search functionality
  const onChangeSearchedText = (text: string) => {
    setSearchedText(text);
    if (text === "") {
      setOrderHistoryData(orderHistoryDataBackup);
    } else {
      const filteredServices = orderHistoryData.filter((item: any) =>
        // console.log("ITEM = = >",item)
        item.OrderNumber.includes(text)
      );
      setOrderHistoryData(filteredServices);
    }
  };


  const handleDownload = async () => {
    // console.log("DISABLED ROGHT NOW")
    const mockData: any = []

    selctedCarts.map((product: any) => {
      // const productName = product.Name.replace(/,.*$/, '');
      mockData.push({
        'Order Number': product.OrderNumber,
        'Order Date': product.OrderedDate,
        'Amount': product.GrandTotalAmount,
        'Status': product.Status,
      })
    })

    try {
      console.log("INSIDE TRYY")
      if (mockData) {
        console.log(mockData, 'OUR MOCK DATA--------------------------------')
        const csvContent = convertToCsv(mockData);
        // const path = `${RNFetchBlob.fs.dirs.DownloadDir}/Cart Export.csv`;
        const basePath = RNFetchBlob.fs.dirs.DownloadDir;
        const fileName = 'Order Export.csv';

        let isPErmissionofStorageGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        console.log('checking permissions...............')

        if (!isPErmissionofStorageGranted) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storgae Permission Needed',
              buttonNegative: `Don't Allow`,
              buttonPositive: 'Allow',
              message: 'Allow myCoke360 to access Files and Media on this Device',
            }
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // await RNFetchBlob.fs.writeFile(path, csvContent);
            await saveCsvFileWithUniqueName(basePath, fileName, csvContent);

            showToastDownload()
          }
          else {
            // console.log('NOT GRANTEDDDDD')
            Alert.alert('Storgae Permission Needed', 'myCoke360 is not allowed to access Files and Media on this Device', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'Ok', onPress: () => console.log('Ok Pressed') },
            ]);
          }
        }
        else {
          // await RNFetchBlob.fs.writeFile(path, csvContent);
          await saveCsvFileWithUniqueName(basePath, fileName, csvContent);
          showToastDownload()
        }
      }
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  const showToastDownload = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Download in Progress. Check your /downloads path.',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  async function saveCsvFileWithUniqueName(basePath: any, fileName: any, content: any) {
    let currentName = fileName;
    let suffix = 1;

    while (true) {
      try {
        const fullPath = `${basePath}/${currentName}`;
        const fileExists = await RNFetchBlob.fs.exists(fullPath);

        if (!fileExists) {
          // Save the content with the current name
          await RNFetchBlob.fs.writeFile(fullPath, content);
          console.log(`CSV saved as ${currentName}`);
          break;
        }

        // File with the same name exists, increment the suffix
        currentName = `${fileName.replace('.csv', `(${suffix}).csv`)}`;
        suffix++;
      } catch (error) {
        console.error('Error while saving CSV:', error);
        break;
      }
    }
  }

  const convertToCsv = (data: any) => {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map((row) => Object.values(row).join(','));
    return headers + rows.join('\n');
  };


/**
 * The function `getAllProducts` queries a database for product data and saves it in a specific format.
 * This data we are retriving to pass in CancelOrder Api
 */

  const getAllProducts = () => {
    querySoup('product2', (success: any) => (saveAllProducts(success)), (error: any) => console.log("querySoup----error", error), "Name")

  }
  const saveAllProducts = (data: any) => {
    // console.log("querySoup----success ORDERPRODUCTS", data.currentPageOrderedEntries)
    let resultObject: any = {}

    if (data.currentPageOrderedEntries) {
      data.currentPageOrderedEntries.forEach((ele: any, index: Number) => {
        resultObject[ele.Id] = {
          "ProductCode": ele.ProductCode,
          "QuantityUnitOfMeasure": ele.QuantityUnitOfMeasure,
          "SalesOrganization": ele.SalesOrganization__c
        }

        if (data.currentPageOrderedEntries.length - 1 == index) {

          console.log("resultObject PRODUCTS NEWW =>", resultObject)
          setAllProducts(resultObject)
        }

      });

    }





  }

  


/**
 * The code defines several functions related to retrieving and saving order item data in a TypeScript
 * React application.
 * @param {any} orderData - The `orderData` parameter is an object that contains information about an
 * order. It is used in various parts of the code to perform operations related to the order, such as
 * retrieving order items and saving order items.Using this data from orderitem,Order and Product2  we are trying to cancel an order
 */
  const getOrderCancelData = (orderData:any) => {
    syncDownOrdersItem(orderData.Id)

    setTimeout(() => {
      getOrderItemData(orderData)

    }, 700);



  }

  const saveOrderItems = (data: any, orderData: any) => {

    // console.log("querySoup----success ORDERITEMSSS", data.currentPageOrderedEntries)
    console.log("querySoup----success orderData saveOrderItems", orderData)
    console.log("querySoup----success orderData EXISTINGORDERITEM", data.currentPageOrderedEntries)

    if (data.currentPageOrderedEntries.length > 0) {
      console.log("FROKM IF BLOCKKK")
      data.currentPageOrderedEntries.map((ele: any, index: any) => {
        console.log("ELE ITEMSSSSSSSS ==== >",ele)      

        let prodData = allProducts[ele.Product2Id]

        console.log("prodData saveOrderItems", prodData)
        
        
        let apiBody = {
          "salesOrg": prodData.SalesOrganization,
          "orderUpdate": [
            {
              "header": {
                "salesOrderNo": orderData.ECCOrderNumber__c,
                "requestedDeliveryDate": orderData.DeliveryDate__c,
                "customerPoNumber": orderData.PoNumber,
                "minIndicator": orderData.MinimumIndicator__c,
              },
              "items": [
                {
                  "number": ele.OrderItemNumber__c?ele.OrderItemNumber__c:"",
                  "material": prodData.ProductCode?prodData.ProductCode : "" ,
                  "targetQuantity": ele.Quantity?ele.Quantity:"",
                  "targetQuantityUom": prodData.QuantityUnitOfMeasure?prodData.QuantityUnitOfMeasure:"",
                  "rejectionReason": ele.RejectionReason__c?ele.RejectionReason__c:"",
                  "usage": ele.Usage__c?ele.Usage__c:""
                }
              ],
              "text": [{}
              ],
              "feeOverrideCodes":[{}]
              
            }
          ]
          
        }
        // console.log("API BODY",apiBody.orderUpdate[0].header,apiBody.orderUpdate[0].items)

        // let apiBody = {
        //   "salesOrg": 4200,
        //   "orderUpdate": [
        //     {
        //       "header": {
        //         "salesOrderNo": "2000344514",
        //         "requestedDeliveryDate": "2022-08-30",
        //         "customerPoNumber": "",
        //         "minIndicator": "C1",
        //       },
        //       "items": [
        //         {
        //           "number": "000010",
        //             "material": "000000000000100009",
        //             "targetQuantity": 8,
        //             "targetQuantityUom": "CS",
        //             "rejectionReason": "r1",
        //             "usage": ""
        //         }
        //       ],
        //       "text": [{}
        //       ],
        //       "feeOverrideCodes":[{}]

        //     }
        //   ]

        // }

        postExample(apiBody).then((res)=>{
          console.log("RESPONSE CREATE ORDER",res)
        }).catch((err)=>{
          console.log("ERROR CREATE ORDER",err)
        })
      })
    }else{
      console.log("FROM ELSE BLOCK")
      let apiBody = {
        "salesOrg": '4200',
        "orderUpdate": [
          {
            "header": {
              "salesOrderNo": orderData.ECCOrderNumber__c,
              "requestedDeliveryDate": orderData.DeliveryDate__c,
              "customerPoNumber": orderData.PoNumber,
              "minIndicator": orderData.MinimumIndicator__c,
            },
            "items": [
              {
                "number": "",
                "material":  "" ,
                "targetQuantity":0,
                "targetQuantityUom": "",
                "rejectionReason": "",
                "usage":""
              }
            ],
            "text": [{}
            ],
            "feeOverrideCodes":[{}]
            
          }
        ]
        
      }
       console.log("API BODY",apiBody.orderUpdate[0].header,apiBody.orderUpdate[0].items)

      postExample(apiBody).then((res)=>{
        
        if(res){
          cancelOrderFunction(orderData)
        }
        console.log("RESPONSE CANCEL ORDER",res)
      }).catch((err)=>{
        console.log("ERROR CANCEl ORDER",err)
      })

    }




  }

  const cancelOrderFunction =(orderData:any)=>{
    console.log("orderData",orderData)


  }


  const getOrderItemData = (orderData: any) => {
    querySoup('OrderItem', (success: any) => (saveOrderItems(success, orderData)), (error: any) => console.log("querySoup----error OrderITEMS", error), "Name")
  }
  // console.log("orderHistoryDATAATATATATTATTATAT=>",orderHistoryData)











  let updatedOrderDeliveryDetails: any = []



  const saveData = (data: any) => {
    console.log("querySoup----success ORDERSSSSSSS", data.currentPageOrderedEntries)

    if (data.currentPageOrderedEntries) {
      console.log("orderDeliveryDetails inside SAVEDATA =>", orderDeliveryDetails, updatedOrderDeliveryDetails)
      console.log("orderDeliveryDetails inside SAVEDATA updatedOrderDeliveryDetails=>", updatedOrderDeliveryDetails)
      let allOrders = data.currentPageOrderedEntries.map((item: any) => {
        console.log("deliveryMethod:updatedOrderDeliveryDetails[item.Id]", updatedOrderDeliveryDetails[item.Id], "ITEMIDDDD", item.Id)

        return { ...item, IsSelected: false, deliveryMethod: updatedOrderDeliveryDetails[item.Id] };

      })
      setOrderHistoryData(allOrders)
      setOrderHistoryDataBackup(allOrders)

      // data.currentPageOrderedEntries.map(async(item: any) => {

      //         await syncDownDeliveryMethod(item.Id)
      //         await getOrderDeliveryMethodFromStore()

      // })

    }

  }


  console.log("orderHistoryDATAATATATATTATTATAT=>", orderHistoryData)
  const getDataFromStore = () => {
    querySoup('order', (success: any) => (saveData(success)), (error: any) => console.log("querySoup----error", error), "Name")
  }





  const clearSearch = () => {
    setSearchedText("");
    setOrderHistoryData(orderHistoryDataBackup);
  };

  // show and hide delivery data
  const showDeliveryData = (index: any) => {
    if (selectedCardIndex === index) {
      setSelectedCardIndex(null);
    } else {
      setSelectedCardIndex(index);
    }
  };
  const viewMoredHandler = (str: string) => {
    if (str === "Show Less") {
      setOrderHistoryLength(1);
    } else {
      setOrderHistoryLength(orderHistoryData.length - 1);
    }
  };

  const [sortedData, setSortedData] = useState([])

  const sortArray: any = (key: any, list: any) => {
    console.log("KEY SORTARRAY", key, "LISTTTTTTTTT", list)
    const sortedArray = list.sort((a: any, b: any) => {
      if (key === "OrderedDate") {
        console.log("DATESSSSSSSSSSSSSSSSSSSSSS a[key]", a[key], " b[key]", b[key])
        const dateA: any = new Date(
          a[key]
        );
        const dateB: any = new Date(
          b[key]
        );
        return dateA - dateB;
      } else {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      }
    });
    setOrderHistoryLength(1)
    setOrderHistoryData(sortedArray);
    setSortedData(sortedArray)
  };

  const applySort = (dataToSort: any) => {
    const list = dataToSort ? dataToSort : [...orderHistoryData];
    if (mySort) {
      if (list.length > 0) {
        console.log("mySort applySort", mySort)
        sortArray(mySort, list);
      }
    }
  };


  useEffect(() => {
    applySort(false);


    getOrderDeliveryMethodFromStore()


    setTimeout(() => {

      getDataFromStore()
    }, 1000);

    getAllProducts()






  }, [mySort]);



  // ****   filter modal  ****
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(true);
  const [isDeliveryMethodOpen, setIsDeliveryMethodOpen] = useState(false);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [startDate, setStartDate] = useState<any>(undefined);
  const [endDate, setEndDate] = useState<any>(undefined);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [orderStatus, setOrderStatus] = useState([
    ...OrderInfo.ORDER_STATUS_DATA,
  ]);
  const [deliveryData, setDeliveryData] = useState([
    ...OrderInfo.DELIVERY_METHOD_DATA,
  ]);
  const [filterRenderData, setFilterRenderData] = useState([]);

  const handleStartDateChange = (event: any, selectedDate: any) => {
    setShowStartDatePicker(false);

    if (event.type === "dismissed") return;
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleEndDateChange = (event: any, selectedDate: any) => {
    setShowEndDatePicker(false);

    if (event.type === "dismissed") return;
    if (selectedDate) setEndDate(selectedDate);
  };

  const handleReset = () => {
    const updatedOrderStatus = orderStatus.map((item) => ({
      ...item,
      checked: false,
    }));

    const updatedDeliveryData = deliveryData.map((item) => ({
      ...item,
      checked: false,
    }));

    setOrderStatus(updatedOrderStatus);
    setDeliveryData(updatedDeliveryData);

    setFilterRenderData([]);

    setStartDate(null);
    setEndDate(null);
  };

  const handelOrderStatusCheck = (index: any) => {
    const updatedOrderStatus = [...orderStatus];
    updatedOrderStatus[index].checked = !updatedOrderStatus[index].checked;
    setOrderStatus(updatedOrderStatus);
  };

  const handelDeliveryCheck = (index: any) => {
    const updateDelivery = [...deliveryData];
    updateDelivery[index].checked = !updateDelivery[index].checked;
    setDeliveryData(updateDelivery);
  };

  // filter modal order status checkbox render item
  const renderFilterModalOrderStatus = ({ item, index }: { item: any, index: any }) => (
    <View style={styles.checkBoxWrapper}>
      <CheckBox
        value={item.checked}
        onValueChange={() => handelOrderStatusCheck(index)}
        style={{ alignSelf: "center" }}
      />
      <Text style={{ color: "#000" }}>{item.title}</Text>
    </View>
  );


  const fetchDeliveryMethod = (orderDetails: any) => {
    //    syncDownDeliveryMethod(orderDetails.Id)
    //    setTimeout(() => {
    //     return getOrderDeliveryMethodFromStore()
    // }, 1000);

  }

  let saveDeliveryMethodData = (data: any) => {
    console.log("data.currentPageOrderedEntries DELIVERY METHOD ORDERHISTORY", data.currentPageOrderedEntries)
    let OrderMethods: any = {}
    if (data.currentPageOrderedEntries) {
      data.currentPageOrderedEntries.forEach((ele: any, i: any) => {

        { OrderMethods[ele.OrderId] = ele.OrderDeliveryMethod.Name }
        if (data.currentPageOrderedEntries.length - 1 == i) {
          updatedOrderDeliveryDetails = OrderMethods
          setOrderDeliveryDetails(OrderMethods)

        }

      })
    }


    console.log("OrderMethods ==>", OrderMethods)


    // setOrderDeliveryDetails(...data.currentPageOrderedEntries,data.currentPageOrderedEntries)
    // return OrderMethods.push({ele.OrderId=ele.OrderDeliveryMethod.Name})
    // return data.currentPageOrderedEntries[0].OrderDeliveryMethod.Name
    //     setShippingMethod(data.currentPageOrderedEntries[0])

    // }

  }



  let getOrderDeliveryMethodFromStore = () => {
    querySoup('orderdeliverygroup', (success: any) => (saveDeliveryMethodData(success)), (error: any) => console.log("querySoup----error", error), "Name")


  }

  // filter modal delivery render item
  const renderFilterModalDelivery = ({ item, index }: { item: any, index: any }) => (
    <View style={styles.checkBoxWrapper}>
      <CheckBox
        value={item.checked}
        onValueChange={() => handelDeliveryCheck(index)}
        style={{ alignSelf: "center" }}
      />
      <Text style={{ color: "#000" }}>{item.title}</Text>
    </View>
  );

  /**
   * The `handleApplyFilter` function filters order history data based on selected order statuses,
   * delivery methods, and date range.
   * @param orderStatus - An array of objects representing different order statuses. Each object has
   * a "checked" property indicating whether it is selected or not, and a "title" property
   * representing the status title.
   * @param deliveryData - An array of objects representing delivery methods. Each object has a
   * "checked" property indicating whether it is selected, and a "title" property representing the
   * delivery method title.
   * @param startDate - The start date for filtering the order history data.
   * @param endDate - The `endDate` parameter is a date that represents the end of a date range for
   * filtering data.
   */
  const handleApplyFilter = (orderStatus: any, deliveryData: any, startDate: any, endDate: any) => {
    const checkedStatus =
      orderStatus?.filter((item: any) => item.checked).map((item: any) => item.title) ||
      [];
    const checkedDeliveryMethod =
      deliveryData?.filter((item: any) => item.checked).map((item: any) => item.title) ||
      [];
    const filterData = [...checkedStatus, ...checkedDeliveryMethod];

    let tempDateData: any = [];
    if (startDate && endDate) {
      const startDateTime = getDateTimeSeperatedString(startDate).split(",")[0];
      const endDateTime = getDateTimeSeperatedString(endDate).split(",")[0];
      const dateToRenderforFlatlist = `${startDateTime} - ${endDateTime}`;
      tempDateData.push(dateToRenderforFlatlist);
    }

    tempDateData.push(...checkedStatus);
    tempDateData.push(...checkedDeliveryMethod);

    setFilterRenderData(tempDateData);

    const dataFilteredWithDate = [];
    const datatToSort = mySort
      ? [...sortedData]
      : [...OrderInfo.orderHistory];
    if (startDate && endDate) {
      const start = moment(startDate).startOf("day");
      const end = moment(endDate).endOf("day");

      let finalFilteredArray = datatToSort.filter((item) => {
        const itemDate = moment(item.orderDate);
        return itemDate.isBetween(start, end, null, "[]");
      });
      dataFilteredWithDate.push(...finalFilteredArray);
    }

    let temporderHistoryData: any = dataFilteredWithDate.length
      ? [...dataFilteredWithDate]
      : datatToSort;

    const statusLength = checkedStatus.length;
    const deliveryLength = checkedDeliveryMethod.length;

    const filteredtemp = temporderHistoryData?.filter((obj: any) => {
      const status = obj.status;
      const deliveryMethod = obj.deliveryMethod.methodTitle;

      if (statusLength && !deliveryLength) {
        return filterData.includes(status);
      }
      if (!statusLength && deliveryLength) {
        return filterData.includes(deliveryMethod);
      }
      if (statusLength && deliveryLength) {
        return (
          filterData.includes(status) && filterData.includes(deliveryMethod)
        );
      }
    });

    setOpenFilterModal(false);
    setOrderHistoryData(
      filteredtemp.length ? filteredtemp : temporderHistoryData
    );
    setOrderHistoryLength(1)
  };

  /**
   * The function `filterListRender` renders a view with a text item and a cross icon, and allows the
   * user to remove the item from the list when the cross icon is pressed.
   * @returns a View component with a background color, margin, border radius, padding, and flexDirection
   * styles. Inside the View, there is a Text component displaying the value of the "item" variable.
   * There is also a Pressable component with a Cross icon, which is used to remove the item when
   * pressed.
   */
  const filterListRender = ({ item, index }: { item: any, index: any }) => {
    return (
      <View style={styles.filerHorizontalWrapper}>
        <Text style={styles.filterHorizontalText}>{item}</Text>
        <Pressable
          style={styles.filterHorizontalCross}
          onPress={() => filterRemove(index, item)}
        >
          <Cross />
        </Pressable>
      </View>
    );
  };

  /**
   * The function `filterRemove` removes a filter from the `filterRenderData` array, updates the
   * `orderStatus` and `deliveryData` arrays by unchecking the removed filter, and then calls the
   * `handleApplyFilter` function with the updated arrays and date range.
   * @param index - The index parameter represents the index of the filter to be removed from the
   * filterRenderData array.
   * @param title - The `title` parameter is a string that represents the title of the filter that
   * needs to be removed.
   */

  const filterRemove = (index: any, title: string) => {
    const tempFilterData = filterRenderData.filter((e, i) => i !== index);
    setFilterRenderData([...tempFilterData]);

    // Update orderStatus array
    const updatedOrderStatus = orderStatus.map((item) => {
      if (item.title === title) {
        return { ...item, checked: false }; // Uncheck the removed filter
      }
      return item;
    });

    // Update deliveryData array
    const updatedDeliveryData = deliveryData.map((item) => {
      if (item.title === title) {
        return { ...item, checked: false }; // Uncheck the removed filter
      }
      return item;
    });

    setOrderStatus([...updatedOrderStatus]);
    setDeliveryData([...updatedDeliveryData]);

    if (startDate && endDate && index === 0) {
      setStartDate(null);
      setEndDate(null);
      handleApplyFilter(orderStatus, deliveryData, undefined, undefined);
    } else if (index === 0 && filterListRender.length - 1 === 0) {
      if (startDate && endDate && index === 0) {
        setStartDate(null);
        setEndDate(null);
        applySort([...OrderInfo.orderHistory]);
        //    handleApplyFilter(orderStatus, deliveryData, undefined, undefined);
      } else {
        applySort([...OrderInfo.orderHistory]);
      }
    } else {
      handleApplyFilter(
        updatedOrderStatus,
        updatedDeliveryData,
        startDate,
        endDate
      );
    }
  };

  // clear all unction to remove all selected filters
  const handleClearAll = () => {
    handleReset();
    dispatch(clearOrderHistroySort());

    setOrderHistoryData(orderHistoryDataBackup);
    setOrderHistoryLength(1)
  };

  //close sort modal
  const handleCloseSortModal = () => {
    setSortModalOpen(false);
  };

  // helper render function for renderItem function
  const RenderItemChild = ({ label, value }: { label: string, value: any }) => {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.width40}>
          <Text>{label}: </Text>
        </View>
        <View>
          <Text style={styles.blackText}>{value}</Text>
        </View>
      </View>
    );
  };
  const selectMultipleLongPress = (product: any) => {
    // console.log('-------------------')
    console.log("selectMultipleLongPress", product)
    // console.log('-------------------')

    const existingProduct = selctedCarts.find((item: any) => item.Id == product.Id);
    if (existingProduct) {
      const updatedArray = selctedCarts.filter((item: any) => item.Id != product.Id);
      setSelctedCarts(updatedArray);
    } else {
      setSelctedCarts((prev: any) => [...prev, product]);
    }

  };
  console.log("selectedcart =+++>", selctedCarts)

  const handleCheckBox = (value: any, productId: any) => {
    const CloneData = [...orderHistoryData];
    const updatedData = CloneData.map((item: any, index) => {
      if (item.Id === productId) {

        console.log(productId, item, 'CALLED+===================')
        selectMultipleLongPress({ ...item, IsSelected: !item.IsSelected })
        return { ...item, IsSelected: !item.IsSelected }
      }
      return item;
    });

    console.log("updatedData ==>", updatedData)
    // getCartWithStockStatus(updatedData)
    setOrderHistoryData(updatedData)

  }

  // main card render function
  const renderItem = ({ item, index }: { item: any, index: any }) => {

    let element = item;
    // console.log("ELEMENET MODIFIED",element)
    if (index <= orderHistoryLength) {
      return (
        <View style={styles.mainContentWrapper}>
          <CheckBox
            style={styles.editcheckboxdata}
            disabled={false}
            value={element.IsSelected}
            onValueChange={(value) => handleCheckBox(value, element.Id)}
          />

          <TouchableOpacity key={index}
            style={styles.contentHolder}
            onPress={() => navigation.navigate('OrderDetails', { orderDetails: element })}
          >
            <View style={styles.card}>

              <Text style={styles.cardTitle}>{element?.OrderNumber}</Text>
              <View>
                <RenderItemChild
                  label={t("ORDER_HISTORY.cardData.orderDate")}
                  value={
                    element?.OrderedDate ? getDateTimeSeperatedString(element.OrderedDate) : '-' +
                      "\n" +
                      '-'
                  }
                />
                <View style={styles.dataContainer}>
                  <View style={styles.width40}>
                    <Text>{t("ORDER_HISTORY.cardData.invoiceNo")}: </Text>
                  </View>
                  <TouchableOpacity onPress={() => console.log('INCOICE NUMBER CLICKED')} >
                    <View>
                      <Text style={styles.blackText}>{element.Invoice_Number__c ? element.Invoice_Number__c : ""}</Text>
                    </View>
                  </TouchableOpacity>
                </View>


                <RenderItemChild
                  label={t("ORDER_HISTORY.cardData.transactionId")}
                  value={element.ECCOrderNumber__c}
                />
                <RenderItemChild
                  label={t("ORDER_HISTORY.cardData.amount")}
                  value={"$" + element.GrandTotalAmount}
                />

                <View style={[styles.dataContainer, { alignItems: 'center' }]}>
                  <View style={styles.width40}>
                    <Text>{t("ORDER_HISTORY.cardData.status")}: </Text>
                  </View>
                  <View style={styles.invoiceNumberContainer} >
                    <Text style={styles.blackText}>{element.Status}</Text>
                  </View>
                </View>


                <View style={styles.dataContainer}>
                  <View style={styles.width40}>
                    <Text>{t("ORDER_HISTORY.cardData.deliveryMethod")}: </Text>
                  </View>
                  <View>
                    <Text style={styles.blackText}>
                      {element.deliveryMethod}
                    </Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      {/* <Text
                        style={[styles.blackText, styles.boldWithUnderlineText]}
                      >
                        -
                      </Text> */}
                      {/* {
                    <TouchableOpacity
                      onPress={() => showDeliveryData(index)}
                      style={styles.paddingGap}
                    >
                      <View style={styles.deliveryText}>
                        {selectedCardIndex === index ? (
                          ""
                        ) : (
                          <Text style={[styles.blackText, styles.boldText]}>
                            +3
                          </Text>
                        )}
                        <View style={styles.deliveryArrowWrapper}>
                          {selectedCardIndex === index ? (
                            <UpBlackArrow />
                          ) : (
                            <DownArrow />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  } */}
                    </View>
                    {/* {selectedCardIndex === index && (
                  <>
                    <Text
                      style={[styles.blackText, styles.boldWithUnderlineText]}
                    >
                      {element.deliveryMethod.extraData2}
                    </Text>
                    <Text
                      style={[styles.blackText, styles.boldWithUnderlineText]}
                    >
                      {element.deliveryMethod.extraData3}
                    </Text>
                  </>
                )} */}
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.cardButtonGroup}>
                <TouchableHighlight
                  testID="orderHistoryCancelOrder"
                  onPress={() => {
                    setCancelOrderModal(!cancelOrderModal)
                    setSelectedOrderNumber(element?.OrderNumber)
                    setSpecificOrderData(element)
                  }}

                  underlayColor={"#F40000"}
                  style={[styles.roundButton, styles.cancelOrderButton]}
                >
                  <Text style={[styles.buttonText, styles.blackText]}>
                    {t("ORDER_HISTORY.cancelOrderButton")}
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  testID="orderHistoryChnageOrder"
                  onPress={() => {
                    setChangeOrderModal(!changeOrderModal)
                    setSelectedOrderNumber(element?.OrderNumber)
                  }}

                  underlayColor={"#F40000"}
                  style={[styles.roundButton, styles.changeOrderButton]}
                >
                  <Text style={[styles.buttonText, styles.whiteText]}>
                    {t("ORDER_HISTORY.changeOrderButton")}
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            {orderHistoryData.length > 1 ? (
              orderHistoryLength === 1 ? (
                orderHistoryLength !== index ? (
                  <Separator />
                ) : null
              ) : orderHistoryData.length - 1 !== index ? (
                <Separator />
              ) : null
            ) : null}
          </TouchableOpacity>
        </View>
      );
    } else {
      return <View></View>
    }
  };

  return (
    <SafeAreaView style={styles.orderHistMainWrapper}>
      <ScrollView style={styles.orderHistInnerWrapper}>

        <View style={styles.orderHistInfoWrap} testID="OrderHistoryWrapper" >
          <View>
            <Text style={styles.heading}>{t("ORDER_HISTORY.pageTitle")}</Text>
          </View>
          <View style={styles.searchExportWrapper}>
            <View style={styles.width80}>
              <SearchBar
                // testID='orderHistorySearchBar'
                placeholder={t("ORDER_HISTORY.searchPlaceHolder")}
                searchedText={searchedText}
                onChangeSearchedText={(text: any) => onChangeSearchedText(text)}
                clearSearch={clearSearch}
              />
            </View>
            <TouchableOpacity style={styles.exportIconWrapper} onPress={() => handleDownload()} disabled={selctedCarts.length > 0 ? false : true} >
              <ExportIcon />
              <Text style={styles.exportText}>{t("ORDER_HISTORY.export")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.deleteSelectedHeader}>
            <TouchableOpacity testID="orderHistoryDeleteItem" >
              <View style={styles.viewCardNumber}>
                <View style={styles.gapStyle}>
                  <DeleteIcon />
                </View>
                <View style={styles.gapStyle}>
                  <Text>{t("ORDER_HISTORY.deleteText")}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.filterSortIconWrapper}>
              <Pressable onPress={() => setOpenFilterModal(true)} testID="orderHistoryFilter" >
                {({ pressed }) => (
                  <View style={styles.gapStyle}>
                    <FilterIcon />
                  </View>
                )}
              </Pressable>

              <Pressable
                onPress={() => setSortModalOpen(true)}
                testID="orderHistorySort"
              // navigation.navigate('OrderHistorySort')
              >
                {({ pressed }) => (
                  <View style={styles.projectListInnerHeader}>
                    <View style={styles.gapStyle}>
                      <Text style={styles.smallTextStyle}>
                        {t("ORDER_HISTORY.sortText")}
                        {mySortTitle && ` - ${mySortTitle}`}
                      </Text>
                    </View>

                    <View style={styles.gapStyle}>
                      <DownArrow />
                    </View>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
          <View style={styles.filterCardList} testID="orderHistoryFilterList" >
            {filterRenderData?.length > 0 && (
              <>
                <FlatList
                  data={filterRenderData}
                  horizontal
                  renderItem={filterListRender}
                  keyExtractor={(item: any, index: any) => index.toString()}
                />
                <Pressable
                  testID="orderHistoryRemoveSignleFilter"
                  onPress={() => handleClearAll()}
                  style={styles.clearAllPress}
                >
                  <Text style={styles.clearAllText} testID="orderHistoryRemoveAllFilter" > Clear all</Text>
                </Pressable>
              </>
            )}
          </View>

          <View style={styles.orderHistContentWrapper}>
            <FlatList
              data={orderHistoryData}
              renderItem={renderItem}
              keyExtractor={(item: any, index: any) => index + 10}
            />
          </View>
          {orderHistoryData.length - 1 > 1 ? (
            orderHistoryLength === 1 ? (
              <View style={styles.viewBtnStyle}>
                <TouchableOpacity
                  testID="orderHistoryShowMore"
                  onPress={() => viewMoredHandler("View More")}
                  style={styles.roundWhiteButton}
                >
                  <Text style={styles.grayText}>
                    {t("ORDER_HISTORY.viewMoreButton")}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.viewBtnStyle}>
                <TouchableOpacity
                  testID="orderHistoryShowLess"
                  onPress={() => viewMoredHandler("Show Less")}
                  style={styles.roundWhiteButton}
                >
                  <Text style={styles.grayText}>
                    {t("ORDER_HISTORY.showLessButton")}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          ) : null}
        </View>


        {/* *** Modals *** */}
        <Modal
          visible={cancelOrderModal}
          transparent={true}
          onRequestClose={() => setCancelOrderModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalbox}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalText]}>Cancel Order</Text>
                <TouchableOpacity onPress={() => setCancelOrderModal(false)} testID="OrderHistoryCancelOrderClose" >
                  <CloseIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.sortInnerDiv}>
                <Text style={[styles.blackText]}>
                  myCoke Order Number {selectedOrderNumber}
                </Text>
                <Text style={{ paddingVertical: 10 }}>
                  Are you sure you want to Cancel this order?
                </Text>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableHighlight
                  testID="OrderHistoryCancelOrderYes"
                  // onPress={}
                  // color={"#FFFFFF"}
                  underlayColor={"#F40000"}
                  style={[styles.roundButton]}
                  onPress={()=> getOrderCancelData(specificOrderData)}
                >
                  <Text style={[styles.buttonText, { color: "#000" }]}>
                    Yes
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  testID="OrderHistoryCancelOrderNo"
                  onPress={() => setCancelOrderModal(false)}
                  // color={"#FFFFFF"}
                  underlayColor={"#F40000"}
                  style={[
                    styles.roundButton,
                    { backgroundColor: "#000", marginHorizontal: 15 },
                  ]}
                >
                  <Text style={[styles.buttonText, { color: "#FFF" }]}>No</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={changeOrderModal}
          transparent={true}
          onRequestClose={() => setChangeOrderModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalbox}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalText]}>Change Order</Text>
                <TouchableOpacity onPress={() => setChangeOrderModal(false)} testID="OrderHistoryChangeOrderClose" >
                  <CloseIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.sortInnerDiv}>
                <Text style={[styles.blackText]}>
                  This Order Cannot be Modified
                </Text>
                <Text style={{ paddingVertical: 10 }}>
                  myCoke Order Number{" "}
                  <Text style={[styles.blackText]}>{selectedOrderNumber}</Text>
                </Text>
                <Text style={{ paddingVertical: 2 }}>
                  Please contact myCoke customer support team
                </Text>
                <Text style={{ paddingVertical: 2 }}>
                  USA:{" "}
                  <Text style={styles.blackText}>1-888-369-COKE(2653)</Text>
                </Text>
                <Text style={{ paddingVertical: 2 }}>
                  Canada: <Text style={styles.blackText}>1-800-218-2653</Text>
                </Text>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableHighlight
                  testID="OrderHistoryChangeOrderReturn"
                  onPress={() => setChangeOrderModal(false)}
                  // color={"#FFFFFF"}
                  underlayColor={"#F40000"}
                  style={[
                    styles.roundButton,
                    {
                      backgroundColor: "#000",
                      marginHorizontal: 15,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text style={[styles.buttonText, { color: "#FFF" }]}>
                    Return to Order History
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        {/* ******    filter modal    ****** */}
        <Modal
          visible={openFilterModal}
          transparent={false}
          onRequestClose={() => setOpenFilterModal(false)}
        >
          <View style={styles.bodyFlexStyle}>
            <ScrollView>
              {/* Main Header */}
              <View style={styles.filterHeader}>
                <View style={styles.filterInner}>
                  <View style={styles.filterHeaderData}>
                    <Pressable onPress={() => setOpenFilterModal(false)} testID="orderHistoryCloseFilter" >
                      {({ pressed }) => (
                        <View style={styles.gapStyle}>
                          <BlackCross />
                        </View>
                      )}
                    </Pressable>
                    <View style={styles.gapStyle}>
                      <Text style={styles.filterTextStyle}>Filter</Text>
                    </View>
                  </View>
                  <TouchableHighlight
                    testID="orderHistoryApplyFilter"
                    // color={"#FFFFFF"}
                    underlayColor={"#F40000"}
                    onPress={() =>
                      handleApplyFilter(
                        orderStatus,
                        deliveryData,
                        startDate,
                        endDate
                      )
                    }
                    style={styles.roundButton2}
                  >
                    <Text style={styles.whiteText}>Apply</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.filerMain}>
                <TouchableOpacity
                  onPress={() => setIsOrderStatusOpen(!isOrderStatusOpen)}
                  style={styles.caseStatusCotainer}
                >
                  <Text style={styles.filterHeading}>Brand</Text>
                  {isOrderStatusOpen ? <UpArrow /> : <DownArrow />}
                </TouchableOpacity>
                {isOrderStatusOpen && (
                  <View style={styles.caseStatusWrapper}>
                    <FlatList
                      data={orderStatus}
                      renderItem={renderFilterModalOrderStatus}
                      keyExtractor={(item: any) => item.id}
                      numColumns={2}
                    />
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setIsDeliveryMethodOpen(!isDeliveryMethodOpen)}
                  style={styles.caseStatusCotainer}
                >
                  <Text style={styles.filterHeading}>Flavor</Text>
                  {isDeliveryMethodOpen ? <UpArrow /> : <DownArrow />}
                </TouchableOpacity>
                {isDeliveryMethodOpen && (
                  <View style={styles.caseStatusWrapper}>
                    <FlatList
                      data={deliveryData}
                      renderItem={renderFilterModalDelivery}
                      keyExtractor={(item: any) => item.id}
                    />
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => setIsDateRangeOpen(!isDateRangeOpen)}
                  style={styles.dateRangeContainer}
                >
                  <Text style={styles.filterHeading}>Date Range</Text>
                  {isDateRangeOpen ? <UpArrow /> : <DownArrow />}
                </TouchableOpacity>

                {isDateRangeOpen && (
                  <View style={styles.dateMain}>
                    <View style={{ width: "50%" }}>
                      <Text style={styles.dateTopText}>Start Date</Text>
                      <TouchableOpacity
                        onPress={() => setShowStartDatePicker(true)}
                      >
                        <View style={styles.dateContainer}>
                          {!startDate ? (
                            <Text style={styles.dateText}>Select Date</Text>
                          ) : (
                            <Text style={styles.dateText}>
                              {startDate && startDate.toLocaleDateString()}
                            </Text>
                          )}
                          <View style={styles.calendarIcon}>
                            <CalendarIcon />
                          </View>
                        </View>
                      </TouchableOpacity>
                      {showStartDatePicker && (
                        <DateTimePicker
                          value={startDate || new Date()}
                          mode="date"
                          display="default"
                          onChange={handleStartDateChange}
                        />
                      )}
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text style={styles.dateTopText}>End Date</Text>
                      <TouchableOpacity
                        onPress={() => setShowEndDatePicker(true)}
                      >
                        <View style={styles.dateContainer}>
                          {!endDate ? (
                            <Text style={styles.dateText}>Select Date</Text>
                          ) : (
                            <Text style={styles.dateText}>
                              {endDate && endDate.toLocaleDateString()}
                            </Text>
                          )}
                          <View style={styles.calendarIcon}>
                            <CalendarIcon />
                          </View>
                        </View>
                      </TouchableOpacity>
                      {showEndDatePicker && (
                        <DateTimePicker
                          value={endDate || new Date()}
                          mode="date"
                          display="default"
                          minimumDate={startDate}
                          onChange={handleEndDateChange}
                        />
                      )}
                    </View>
                  </View>
                )}
                <TouchableHighlight
                  testID="orderHistoryResetFilter"
                  onPress={() => handleReset()}
                  style={styles.resetButton}
                >
                  <Text style={styles.blackText}>Reset</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>
        </Modal>
        <Modal
          visible={sortModalOpen}
          transparent={true}
          onRequestClose={() => setSortModalOpen(false)}
        >
          <View style={styles.wh100}>
            <OrderHistorySort toggleModal={handleCloseSortModal} />
          </View>
        </Modal>


        {/* <View style={styles.footerWidthStyle}>
        </View> */}
        <FooterComponent />
      </ScrollView>
      {loader &&  <Loader message="Please wait..." />}
    </SafeAreaView>
  );
};

export default OrderHistory;
