import {
  smartstore,
  mobilesync,
  forceUtil,
  MobileSyncReactBridge,
} from "react-native-force";
import EventEmitter from "./events";
import { NativeModules, DeviceEventEmitter } from "react-native";
import { syncList, syncUpFieldList, getSyncDownList } from "./SyncObjects";
import { store } from "../redux/store";
import { SET_LOADER } from "../redux/Reducer/loaderReducer";

const registerSoup = forceUtil.promiser(smartstore.registerSoup);
const getSyncStatus = forceUtil.promiser(mobilesync.getSyncStatus);
const syncDown = forceUtil.promiserNoRejection(mobilesync.syncDown);
const syncUp = forceUtil.promiserNoRejection(mobilesync.syncUp);
const reSync = forceUtil.promiserNoRejection(mobilesync.reSync);

const { SalesforceMobileSDKManager } = NativeModules;
// const soupManager = new SFSmartStoreReactBridge.SFSoupManager();

const syncName = "mobileSyncExplorerSyncDown";
const syncNameProduct = "syncProducts";
let syncInFlight = false;
const eventEmitter = new EventEmitter();
const SMARTSTORE_CHANGED = "smartstoreChanged";
const SYNC_SUCCESS = "sync_success";
let syncDownfieldList = [];
function emitSmartStoreChanged() {
  eventEmitter.emit(SMARTSTORE_CHANGED, {});
}

function emitSyncSuccess() {
  DeviceEventEmitter.emit(SYNC_SUCCESS, "Success");
  // store.dispatch(SET_LOADER(false))
}

function addStoreChangeListener(listener) {
  console.log("addStoreChangeListener", listener);
  eventEmitter.addListener(SMARTSTORE_CHANGED, listener);
}

const syncUpObjects = async () => {
  if (syncInFlight) {
    console.log("Not starting syncUp - sync already in fligtht");
    return Promise.resolve();
  }
  let testSyncNames = new Date().getTime().toString();

  console.log("Starting syncUp");
  syncInFlight = true;
  syncUpFieldList.map((ele) => {
  return syncUp(
      false,
      {},
      ele.soupNames,
      { mergeMode: mobilesync.MERGE_MODE.OVERWRITE, fieldlist: ele.fieldList },
      (resp) => {
        console.log("syncUpObjects => syncUp completed ", resp);
        syncInFlight = false;
        emitSmartStoreChanged();
      },
      (err) => {
        console.log("syncUpObjects failed", err);
      }
    );
  });

  // createFieldlist: ["ExternalId__c","Id"], updateFieldlist: ["FirstName","LastName","Email","Phone","Id","Name","ExternalId__c"]
};

// const syncUpObjects = async () => {
//     if (syncInFlight) {
//         console.log("Not starting syncUp - sync already in flight");
//         return;
//     }

//     console.log("Starting syncUp");
//     syncInFlight = true;

//     const syncPromises = syncUpFieldList.map(async (ele) => {
//         try {
//             const syncResult = await syncUp(false, {}, ele.soupNames, {
//                 mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
//                 fieldlist: ele.fieldList
//             });

//             console.log("syncUpObjects => syncUp completed",  syncResult);
//             emitSmartStoreChanged();
//         } catch (err) {
//             console.log("syncUpObjects failed", err);
//         }
//     });

//     // Wait for all sync operations to complete
//     try {
//         await Promise.all(syncPromises);
//     } finally {
//         syncInFlight = false;
//     }
// };

const contactSyncDown = () => {
  syncInFlight = true;
  const fieldlist = ["firstName", "lastName", "email", "phone"];
  const target = {
    type: "soql",
    query: `SELECT ${fieldlist.join(",")} FROM Contact LIMIT 10000`,
  };
  syncDown(
    false,
    target,
    "contacts",
    { mergeMode: mobilesync.MERGE_MODE.OVERWRITE },
    syncName
  ).then((resp) => {
    console.log("contactSyncDown completed or failed", resp);
    syncInFlight = false;
    emitSmartStoreChanged();
  });
};

const customerSyncDown = () => {
  syncInFlight = true;
  const fieldlist = ["Name"];
  const target = {
    type: "soql",
    query: `SELECT ${fieldlist.join(",")} FROM Customer LIMIT 10000`,
  };
  syncDown(
    false,
    target,
    "customers",
    { mergeMode: mobilesync.MERGE_MODE.OVERWRITE },
    syncName
  ).then((resp) => {
    console.log("customerSyncDown completed or failed", resp);
    syncInFlight = false;
    emitSmartStoreChanged();
  });
};

const syncDownFull = async () => {
  if (syncInFlight) {
    console.log("Not starting syncDown - sync already in fligtht");
    return Promise.resolve();
  }

   getSyncDownList((response)=>{
    //  console.log("getSyncDownList response=", response)
    syncDownfieldList = [...response];
    
    // console.log("Starting syncDown");

    // console.log(syncDownfieldList, "TEST ME=====================");
    console.log("syncDownfieldList====",syncDownfieldList)
    syncDownfieldList && syncDownfieldList.map((ele, index) => {
      let target = { type: "soql", query: ele.query };
      console.log("syncDownFull ==target", target);
      ///  working func
      return syncDown(
        false,
        target,
        ele.smartStoreKey,
        { mergeMode: mobilesync.MERGE_MODE.OVERWRITE },
        ele.syncName
      ).then((resp) => {
        console.log("syncDown completed or failed", ele.smartStoreKey);
        console.log("response==", resp);
        if (syncDownfieldList.length - 1 === index) {
          console.log("before emitSyncSuccess");
          emitSyncSuccess();
        }
        emitSmartStoreChanged();
      });
    });
  });
};

const syncDownOrdersItem = async (orderId) => {
  console.log("Starting syncDown");
  let target = {
    type: "soql",
    query: `SELECT OrderItemNumber,Quantity,RejectionReason__c,Usage__c,Product2Id,TotalPromoAdjustmentAmount__c,TotalPrice,Description FROM OrderItem where OrderId = '${orderId}'  LIMIT 100`,
  };

  console.log("syncDownContacts ==target", target);
  ///  working func
  return syncDown(false, target, "OrderItem", {
    mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
  }).then((resp) => {
    console.log("response==", resp);
    syncData();
    // if (syncDownfieldList.length - 1 === index) {
    //   emitSyncSuccess();
    // }
    emitSmartStoreChanged();
  });
};

const getAssortmentProductsList = async (productSKU, AssortmentIdsArray) => {
  // const target = { type: "soql", query: `SELECT Id, AssortmentId, Name, DeleteIndicator__c, Assortment.ListingType__c, Assortment.Id, Product.StockKeepingUnit, Product.ProductCode, Product.ProductExternalId__c, Product.MaterialIdNumber__c, Product.Type__c FROM AssortmentProduct WHERE DeleteIndicator__c = false AND Product.StockKeepingUnit IN ('146040','137076','2102','SKU1851','SKU1852') AND Product.Type__c IN ('ZAP', 'ZFER') AND AssortmentId IN ('0aO8M000000002RUAQ','0aO8M000000003KUAQ') AND (StartDate__c <= TODAY OR StartDate__c = NULL) AND (EndDate__c >= TODAY OR EndDate__c = NULL)`}

  let sku1 = productSKU
  let sku = productSKU.toString()
  console.log("sku==target", sku);
  console.log("sku1==target", sku1);

  const skuString = productSKU.map(value => {
    return `'${value}'`;
  }).join(',');
  console.log("sku1==skuString", skuString);

  const AssortmentIds = AssortmentIdsArray.map(value => {
    return `'${value}'`;
  }).join(',');
  console.log("sku1==skuString", AssortmentIds);

  const currentDate = new Date().getTime().toString();
  console.log("sku1==currentDate", currentDate);
  //                                            Id,IsActive, IsDeleted, LastModifiedDate, Name, MaterialIdNumber__c,SalesOrganization__c,EANUPC__c,StockKeepingUnit,ProductCode,ProductExternalId__c,Type__c
  const target = { type: "soql", query: `SELECT Id, AssortmentId, Name, DeleteIndicator__c, Assortment.ListingType__c, Assortment.Id, Product.StockKeepingUnit, Product.ProductCode, Product.ProductExternalId__c, Product.MaterialIdNumber__c, Product.Type__c FROM AssortmentProduct WHERE DeleteIndicator__c = false AND Product.StockKeepingUnit IN (${skuString}) AND Product.Type__c IN ('ZAP', 'ZFER') AND AssortmentId IN (${AssortmentIds}) AND (StartDate__c <= TODAY OR StartDate__c = NULL) AND (EndDate__c >= TODAY OR EndDate__c = NULL)` }
  console.log("getAssortmentProductsList==target", target);
  const resp = await syncDown(false, target, "AssortmentProduct", { mergeMode: mobilesync.MERGE_MODE.OVERWRITE }, currentDate);
  console.log("getAssortmentProductsList ** resp", resp);
}


// const clearSoup = (successCallback,errorCallback)=>{
//   smartstore.clearSoup(false,"contacts",
//   (success) => successCallback(success),
//   (error) => errorCallback(error)
//   );
// }

// const syncDownProducts = async() => {
//     if (syncInFlight) {
//         console.log("Not starting syncDown - sync already in fligtht");
//         return Promise.resolve();
//     }

//     console.log("Starting syncDown");
//     // syncInFlight = true;

//     const fieldlist = [

//             {
//                 selector:"Name",
//                 keyExtractor:"Product2",
//                 smartStoreKey:"product2"
//             }
//     ];

//     fieldlist.map((ele)=>{

//         const target = { type: "soql", query: `SELECT ${ele.selector} FROM ${ele.keyExtractor} LIMIT 10000` };
//         // const target = { type: "mru", sobjectType:"Contact",fieldlist: fieldlist };
//         console.log("syncDownProducts ==target", target);

//         ///  working func
//         return syncDown(false, target, ele.smartStoreKey, { mergeMode: mobilesync.MERGE_MODE.OVERWRITE }, syncNameProduct)
//             .then((resp) => {
//                 console.log("syncDownProducts completed or failed",ele.smartStoreKey );
//                 syncInFlight = false;
//                 emitSmartStoreChanged();
//             });
//     })

// }

const reSyncContacts = () => {
  console.log("reSyncContacts--");
  if (syncInFlight) {
    console.log("Not starting reSync - sync already in fligtht");
    emitSyncSuccess();
    return Promise.resolve();
  }

  // console.log("Starting reSync");
  // syncInFlight = true;

  syncList.map((ele, index) => {
    return reSync(false, ele)
      .then((resp) => {
        console.log("reSync=", resp);
        syncInFlight = false;
        if (syncList.length - 1 === index) {
          console.log("reSync emitSyncSuccess");
          emitSyncSuccess();
        }
        emitSmartStoreChanged();
      })
      .catch((err) => {
        console.log("reSyncContacts failed", err);
      });
  });
};

const firstTimeSyncData = () => {
  console.log("firstTimeSyncData--");
  let registerAllSoup = [
    // {
    //   name: "product2",
    //   path: [
    //     { path: "Id", type: "string" },
    //     { path: "Name", type: "full_text" },

    //     { path: "IsActive", type: "full_text" },
    //     { path: "IsDeleted", type: "full_text" },
    //     { path: "LastModifiedDate", type: "full_text" },
    //     { path: "MaterialIdNumber__c", type: "full_text" },
    //     { path: "SalesOrganization__c", type: "full_text" },
    //     { path: "EANUPC__c", type: "full_text" },
    //     { path: "BrandLookUpName__c", type: "full_text" },
    //     { path: "Flavor_Cona__c", type: "full_text" },
    //     { path: "PackType__c", type: "full_text" },
    //     { path: "Unit_Size__c", type: "full_text" },
    //     { path: "BrandOwner__c", type: "full_text" },
    //     { path: "Brand__c", type: "full_text" },
    //     { path: "StockKeepingUnit", type: "full_text" },
    //     { path: "Case_Quantity__c", type: "full_text" },
    //     { path: "FlavorFormula__c", type: "full_text" },
    //     { path: "CalorieCategory__c", type: "full_text" },
    //     { path: "Caffeine__c", type: "full_text" },
    //     { path: "PackSize__c", type: "full_text" },
    //     { path: "__local__", type: "string" },
    //   ],
    // },
    {
      name: "account",
      path: [
        { path: "Id", type: "string" },
        { path: "AccountNumber", type: "full_text" },
        { path: "Name", type: "full_text" },
        { path: "__local__", type: "string" },
      ],
    },
    // {
    //   name: "contact",
    //   path: [
    //     { path: "FirstName", type: "full_text" },
    //     { path: "LastName", type: "full_text" },
    //     { path: "Email", type: "full_text" },
    //     { path: "Phone", type: "full_text" },
    //     { path: "Id", type: "string" },
    //     { path: "Name", type: "full_text" },
    //     { path: "ExternalId__c", type: "full_text" },

    //     { path: "__local__", type: "string" },
    //     { path: "__locally_created__", type: "string" },
    //     { path: "__locally_updated__", type: "string" },
    //     { path: "__locally_deleted__", type: "string" },
    //     { path: "attributes", type: "json1" },
    //   ],
    // },
    {
      name: "order",
      path: [
        { path: "Id", type: "string" },
        { path: "OrderNumber", type: "full_text" },
        { path: "OrderedDate", type: "full_text" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "accountcontactrelation",
      path: [
        { path: "Id", type: "string" },
        { path: "AccountId", type: "full_text" },
        { path: "IsActive", type: "full_text" },
        { path: "IsDeleted", type: "full_text" },
        { path: "Roles", type: "full_text" },
        { path: "IsDirect", type: "full_text" },
        { path: "ContactId", type: "full_text" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "WebCart",
      path: [
        { path: "AccountId", type: "full_text" },
        { path: "Status", type: "full_text" },
        { path: "WebStoreId", type: "full_text" },
        { path: "Id", type: "string" },
        { path: "IsDeleted", type: "full_text" },
        { path: "OwnerId", type: "full_text" },
        { path: "GrandTotalAmount", type: "full_text" },

        { path: "__local__", type: "string" },
        { path: "__locally_created__", type: "string" },
        { path: "__locally_updated__", type: "string" },
        { path: "__locally_deleted__", type: "string" },
        { path: "attributes", type: "json1" },
      ],
    },
    {
      name: "CartItem",
      path: [
        { path: "CartId", type: "full_text" },
        { path: "Product2Id", type: "full_text" },
        { path: "Quantity", type: "full_text" },
        { path: "Id", type: "string" },
        { path: "IsDeleted", type: "full_text" },
        { path: "Sku", type: "full_text" },
        { path: "TotalPrice", type: "full_text" },
        { path: "Name", type: "full_text" },
        { path: "UnitAdjustedPrice", type: "full_text" },
        { path: "CartDeliveryGroupId", type: "full_text" },

        { path: "__local__", type: "string" },
        { path: "__locally_created__", type: "string" },
        { path: "__locally_updated__", type: "string" },
        { path: "__locally_deleted__", type: "string" },
        { path: "attributes", type: "json1" },
      ],
    },
    // {
    //   name: "productcategory",
    //   path: [
    //     { path: "Id", type: "string" },
    //     { path: "ParentCategoryId", type: "full_text" },
    //     { path: "Name", type: "full_text" },
    //     { path: "IsActive__c", type: "full_text" },
    //     { path: "CreatedById", type: "full_text" },
    //     { path: "__local__", type: "string" },
    //   ],
    // },

    {
      name: "OrderItem",
      path: [
        { path: "TotalPrice", type: "full_text" },
        { path: "TotalPromoAdjustmentAmount__c", type: "full_text" },
        { path: "Quantity", type: "full_text" },
        { path: "Id", type: "string" },
        { path: "RejectionReason__c", type: "full_text" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "productcategory",
      path: [
        { path: "Id", type: "string" },
        { path: "ParentCategoryId", type: "full_text" },
        { path: "Name", type: "full_text" },
        { path: "IsActive__c", type: "full_text" },
        { path: "CreatedById", type: "full_text" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "PlantProductInventory__c",
      path: [
        { path: "Id", type: "string" },
        { path: "OwnerId", type: "full_text" },
        { path: "IsDeleted", type: "full_text" },
        { path: "Product2__c", type: "full_text" },
        { path: "PlantCode__c", type: "full_text" },
        { path: "LowThreshold__c", type: "full_text" },
        { path: "OutThreshold__c", type: "full_text" },
        { path: "ATP__c", type: "full_text" },
      ],
    },
    {
      name: "CartDeliveryGroup",
      path: [
        { path: "Id", type: "full_text" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "orderdeliverygroup",
      path: [
        { path: "OrderDeliveryMethod", type: "full_text" },
        { path: "Name", type: "full_text" },
        { path: "Quantity", type: "full_text" },
        { path: "Id", type: "string" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "WebStore",
      path: [
        { path: "Id", type: "string" },
        { path: "Enable_Co2_Cylinders__c", type: "full_text" },
        { path: "Enable_Glass_Bottles__c", type: "full_text" },
        { path: "BottlerId__c", type: "full_text" },
        { path: "__local__", type: "string" },
      ],
    },

    {
      name: "productcategoryproduct",
      path: [
        { path: "Id", type: "string" },
        { path: "ProductCategoryId", type: "full_text" },
        { path: "ProductId", type: "full_text" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "orderpaymentsummary",
      path: [
        { path: "OrderSummaryId", type: "full_text" },
        { path: "PaymentMethodId", type: "full_text" },
        { path: "Id", type: "string" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "cardpaymentmethod",
      path: [
        { path: "CardType", type: "full_text" },
        { path: "DisplayCardNumber", type: "full_text" },
        { path: "Id", type: "string" },
        { path: "CardCategory", type: "string" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "User",
      path: [
        { path: "Id", type: "string" },
        { path: "AccountId", type: "full_text" },
        { path: "ContactId", type: "full_text" },
        { path: "__local__", type: "string" },
      ],
    },
    {
      name: "ordersummary",
      path: [
        { path: "Id", type: "string" },
        { path: "__local__", type: "string" },
      ],
    },



    {
      name: 'TimeSlot',
      path: [
        { path: "Id", type: "string" },
        { path: "DayOfWeek", type: "full_text" },

        { path: "__local__", type: "string" },
        { path: "__locally_created__", type: "string" },
        { path: "__locally_updated__", type: "string" },
        { path: "__locally_deleted__", type: "string" },
        { path: "attributes", type: "json1" }

      ]
    },
    {
      name: 'OperatingHours',
      path: [
        { path: "Id", type: "string" },
        { path: "Frequency__c", type: "full_text" },
        { path: "ValidFrom__c", type: "full_text" },
        { path: "ValidTo__c", type: "string" },

        { path: "__local__", type: "string" },
        { path: "__locally_created__", type: "string" },
        { path: "__locally_updated__", type: "string" },
        { path: "__locally_deleted__", type: "string" },
        { path: "attributes", type: "json1" }

      ]
    },
    {
      name: 'HolidayManagement__c',
      path: [
        { path: "Id", type: "string" },
        { path: "HolidayDate__c", type: "full_text" },
        { path: "ValidFrom__c", type: "full_text" },
        { path: "ValidTo__c", type: "string" },

        { path: "__local__", type: "string" },
        { path: "__locally_created__", type: "string" },
        { path: "__locally_updated__", type: "string" },
        { path: "__locally_deleted__", type: "string" },
        { path: "attributes", type: "json1" }

      ]
    },

    {
      name: 'StoreAssortment',
      path: [
        { path: "Id", type: "string" },
        { path: "AssortmentId", type: "full_text" },
        { path: "Name", type: "full_text" },

        { path: "__local__", type: "string" },
        { path: "__locally_created__", type: "string" },
        { path: "__locally_updated__", type: "string" },
        { path: "__locally_deleted__", type: "string" },
        { path: "attributes", type: "json1" }

      ]
    },
    {
      name: 'Assortment',
      path: [
        { path: "Id", type: "string" },
        { path: "ListingType__c", type: "full_text" },

        { path: "__local__", type: "string" },
        { path: "__locally_created__", type: "string" },
        { path: "__locally_updated__", type: "string" },
        { path: "__locally_deleted__", type: "string" },
        { path: "attributes", type: "json1" }

      ]
    },
    {
      name: 'AssortmentProduct',
      path: [
        { path: "Id", type: "string" },
        { path: "AssortmentId", type: "full_text" },
        { path: "Name", type: "full_text" },
        { path: "DeleteIndicator__c", type: "full_text" },

        { path: "__local__", type: "string" },
        { path: "__locally_created__", type: "string" },
        { path: "__locally_updated__", type: "string" },
        { path: "__locally_deleted__", type: "string" },
        { path: "attributes", type: "json1" }

      ]
    }
  ]

  // {
  //     name: 'ExternalString',
  //     path: [
  //         { path: "Id", type: "string" },
  //         { path: "Name", type: "full_text" },
  //         { path: "Value", type: "full_text" },

  //         { path: "__local__", type: "string" },
  //         { path: "__locally_created__", type: "string" },
  //         { path: "__locally_updated__", type: "string" },
  //         { path: "__locally_deleted__", type: "string" },
  //         { path: "attributes", type: "json1" }

  //     ]
  // },

  const promises = registerAllSoup.map(async (ele, index) => {
    await registerSoup(false, ele.name, ele.path);

    // await syncDownProducts()
    if (registerAllSoup.length - 1 === index) {
      await syncDownFull();
    }
  });

  return Promise.all(promises);
};

const reSyncData = async () => {
  console.log("reSyncData--");
  return await syncUpObjects().then(reSyncContacts);
};

const syncData = async () => {
  const sync = await getSyncStatus(false, syncName);

  console.log("syncData--", sync);
  if (sync == null) {
    return firstTimeSyncData();
  } else {
    syncDownFull()
    return reSyncData();
  }
};

const registerSoups = () => {
  const contacts = {
    soupName: "contacts",
    indexes: [
      { path: "Id", type: "string" },
      { path: "firstName", type: "full_text" },
      { path: "lastName", type: "full_text" },
      { path: "email", type: "full_text" },
      { path: "phone", type: "full_text" },
      { path: "__local__", type: "string" },
    ],
  };
  const customers = {
    soupName: "customers",
    indexes: [
      { path: "Id", type: "string" },
      { path: "firstName", type: "full_text" },
      { path: "lastName", type: "full_text" },
      { path: "email", type: "full_text" },
      { path: "phone", type: "full_text" },
      { path: "__local__", type: "string" },
    ],
  };

  registerSoup(contacts);
  registerSoup(customers);
};

const syncDownCartItem = async (cartId) => {
  let target = {
    type: "soql",
    query: `SELECT CartId,Product2Id,Quantity,Id,IsDeleted,Sku,TotalPrice,Name,UnitAdjustedPrice,TotalAmount,CreatedDate FROM CartItem where CartId = '${cartId}' LIMIT 2000`,
  };

  return syncDown(false, target, "CartItem", {
    mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
  }).then((resp) => {
    syncData();
    // if (syncDownfieldList.length - 1 === index) {
    //   emitSyncSuccess();
    // }
    emitSmartStoreChanged();
  });
};

const syncDownDeliveryMethod = async (orderId) => {
  let target = {
    type: "soql",
    query: `SELECT OrderDeliveryMethod.Name FROM OrderDeliveryGroup where orderId = '${orderId}' LIMIT 100`,
  };

  return syncDown(false, target, "orderdeliverygroup", {
    mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
  }).then((resp) => {
    syncData();
    // if (syncDownfieldList.length - 1 === index) {
    //   emitSyncSuccess();
    // }
    emitSmartStoreChanged();
  });
};

const syncDownCartDeliveryGroup = async (cartId) => {
  let target = {
    type: "soql",
    query: `SELECT Id FROM CartDeliveryGroup where CartId = '${cartId}' LIMIT 2000`,
  };

  return syncDown(false, target, "CartDeliveryGroup", {
    mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
  }).then((resp) => {
    syncData();
    // if (syncDownfieldList.length - 1 === index) {
    //   emitSyncSuccess();
    // }
    emitSmartStoreChanged();
  });
};

const syncDownShipmentMethod = async (orderSummaryId) => {
  let target = {
    type: "soql",
    query: `Select Id, OrderSummaryId, PaymentMethodId From OrderPaymentSummary where OrderSummaryId ='${orderSummaryId}' LIMIT 100`,
  };

  return syncDown(false, target, "orderpaymentsummary", {
    mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
  }).then((resp) => {
    syncData();
    // if (syncDownfieldList.length - 1 === index) {
    //   emitSyncSuccess();
    // }
    emitSmartStoreChanged();
  });
};

const syncDownPlantProductInventory = async (PlantCode__c) => {
  let target = {
    type: "soql",
    query: `SELECT Id,OwnerId,IsDeleted,Product2__c,PlantCode__c, LowThreshold__c, OutThreshold__c,ATP__c FROM PlantProductInventory__c where PlantCode__c = '${PlantCode__c}' LIMIT 2000`,
  };

  console.log("syncDownContacts ==target plant product invwentory", target);
  return syncDown(false, target, "PlantProductInventory__c", {
    mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
  }).then((resp) => {
    syncData();
    // if (syncDownfieldList.length - 1 === index) {
    //   emitSyncSuccess();
    // }
    emitSmartStoreChanged();
  });
};

const syncDownOrderPaymentMethod = async (PaymentMethodId) => {
  let target = {
    type: "soql",
    query: `Select CardType, DisplayCardNumber, CardCategory From CardPaymentMethod Where Id ='${PaymentMethodId}' LIMIT 100`,
  };

  console.log("syncDownContacts ==target", target);
  return syncDown(false, target, "cardpaymentmethod", {
    mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
  }).then((resp) => {
    syncData();
    // if (syncDownfieldList.length - 1 === index) {
    //   emitSyncSuccess();
    // }
    emitSmartStoreChanged();
  });
};

const syncDownOrderSummaryId = async (orderId) => {
  let target = {
    type: "soql",
    query: `select Id from OrderSummary where OriginalOrderId = '${orderId}'LIMIT 100`,
  };

  return syncDown(false, target, "ordersummary", {
    mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
  }).then((resp) => {
    console.log("response==", resp);
    syncData();
    // if (syncDownfieldList.length - 1 === index) {
    //   emitSyncSuccess();
    // }
    emitSmartStoreChanged();
  });
};

export {
  syncData,
  syncUpObjects,
  addStoreChangeListener,
  registerSoups,
  syncDownCartItem,
  syncDownCartDeliveryGroup,
  syncDownPlantProductInventory,
  syncDownOrdersItem,
  syncDownDeliveryMethod,
  syncDownShipmentMethod,
  syncDownOrderSummaryId,
  syncDownOrderPaymentMethod,
  getAssortmentProductsList,
  SYNC_SUCCESS,
  syncDownFull
};
