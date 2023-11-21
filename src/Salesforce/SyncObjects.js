import AsyncStorage from "@react-native-async-storage/async-storage"
import { mobilesync, forceUtil } from 'react-native-force';


const syncDown = forceUtil.promiserNoRejection(mobilesync.syncDown);
function emitSmartStoreChanged() {
    eventEmitter.emit(SMARTSTORE_CHANGED, {});
}


let syncDownfieldList;
let limit = 2000


const getSyncDownList = async (updateSyncList) => {
  let syncDownList = [];
    AsyncStorage.getItem('userIdentity').then(async data => {
        console.log('userIdentityfromLogin type=',typeof(data));
        let userIdentityfromLogin = JSON.parse(data);
        console.log('userIdentityfromLogin=',userIdentityfromLogin);
      if (userIdentityfromLogin) {
        syncDownList = [
            {
                keyExtractor: "Account",
                smartStoreKey: "account",
                syncName: "mobileSyncExplorerSyncDown",
                query: `SELECT AccountNumber,Name,ShippingCity,BottlerId__c,BillingAddress,ShippingAddress,CommentsNotes__c,DeliveryPlant__c FROM Account where BottlerId__c = '${userIdentityfromLogin.bottlerId}' LIMIT ${limit}`,
            },
            // {
            //     keyExtractor: "Product2",
            //     smartStoreKey: "product2",
            //     syncName: "syncProducts",
            //     query: `SELECT Id,IsActive,BrandOwner__c,Brand__c, IsDeleted, LastModifiedDate, Name, MaterialIdNumber__c,SalesOrganization__c,EANUPC__c,BrandLookUpName__c,Flavor_Cona__c,PackType__c,Unit_Size__c,StockKeepingUnit,Case_Quantity__c,FlavorFormula__c,CalorieCategory__c,Caffeine__c,PackSize__c,QuantityUnitOfMeasure,ProductCode FROM Product2 where IsActive=true LIMIT ${limit}`,
            // },
            {
                keyExtractor: "Contact",
                smartStoreKey: "contact",
                syncName: "syncContacts",
                query: `SELECT Name,FirstName,LastName,Phone,Email,Id,ExternalId__c FROM Contact where BottlerId__c ='${userIdentityfromLogin.bottlerId}' LIMIT ${limit}`,
            },
            {
                keyExtractor: "WebCart",
                smartStoreKey: "WebCart",
                syncName: "syncWebCart",
                query: `SELECT AccountId,Status,WebStoreId,Id,IsDeleted,OwnerId,GrandTotalAmount FROM WebCart where Status='Active' and OwnerId='${userIdentityfromLogin.userId}' LIMIT ${limit}`,
            },
            {
                keyExtractor: "accountContactRelation",
                smartStoreKey: "accountcontactrelation",
                syncName: "syncAccountContactRelation",
                query: `SELECT Id,AccountId,IsActive,IsDeleted,Roles,IsDirect,ContactId FROM accountContactRelation  LIMIT ${limit}`,
            },
            // {
            //     keyExtractor: "ProductCategory",
            //     smartStoreKey: "productcategory",
            //     syncName: "syncProductCategory",
            //     query: `SELECT Id,Name,ParentCategoryId,IsActive__c,CreatedById FROM ProductCategory where IsActive__c = true and ParentCategoryId !='' LIMIT ${limit}`,
            // },
            {
                keyExtractor: "WebStore",
                smartStoreKey: "WebStore",
                syncName: "syncWebStore",
                query: `SELECT Id, Enable_Co2_Cylinders__c, Enable_Glass_Bottles__c, BottlerId__c FROM WebStore where BottlerId__c  = '${userIdentityfromLogin.bottlerId}' LIMIT ${limit}`,
            },
            // {
            //     keyExtractor: "ProductCategoryProduct",
            //     smartStoreKey: "productcategoryproduct",
            //     syncName: "syncProductCategoryProduct",
            //     query: `SELECT Id,ProductCategoryId,ProductId FROM ProductCategoryProduct LIMIT ${limit}`,
            // },
            // {
            //     keyExtractor: "Order",
            //     smartStoreKey: "order",
            //     syncName: 'syncUserOrders',
            //     // query: `SELECT OrderNumber,OrderedDate,GrandTotalAmount,Status,Driver_Notes__c,PaymentMethod__c,PoNumber,Co2_Cylinders__c,Glass_Bottles__c,ECCOrderNumber__c,Invoice_Number__c,DeliveryDate__c,MinimumIndicator__c,TotalPromoAdjustmentAmount__c FROM Order where BottlerId__c ='${userIdentityfromLogin.bottlerId}' LIMIT ${limit}`
            //     query: `SELECT OrderNumber,OrderedDate,GrandTotalAmount,Status,Driver_Notes__c,PaymentMethod__c,PoNumber,Co2_Cylinders__c,Glass_Bottles__c,ECCOrderNumber__c,Invoice_Number__c,DeliveryDate__c,MinimumIndicator__c FROM Order where BottlerId__c ='${userIdentityfromLogin.bottlerId}' LIMIT ${limit}`
            // },
            {
                keyExtractor: "OrderDeliveryGroup",
                smartStoreKey: "orderdeliverygroup",
                syncName: 'syncDeliveryMethod',
                query: `SELECT OrderDeliveryMethod.Name,orderId FROM OrderDeliveryGroup LIMIT ${limit}`
            },
            // {
               
            //     keyExtractor: "StoreAssortment",
            //     smartStoreKey: "StoreAssortment",
            //     syncName: 'syncStoreAssortment',
            //     query: `SELECT Id, AssortmentId FROM StoreAssortment WHERE AccountId = '${userIdentityfromLogin.accountId}' AND (StartDate <= TODAY OR StartDate = NULL) AND (EndDate >= TODAY OR EndDate = NULL) LIMIT 2000`
            // },
            // {
            //     keyExtractor: "Assortment",
            //     smartStoreKey: "Assortment",
            //     syncName: 'syncAssortment',
            //     query: `SELECT Id, ListingType__c FROM Assortment  LIMIT 200`
            // },
        ];
      }
      updateSyncList(syncDownList);
    });


    return syncDownList;
};

const syncUpFieldList = [
    {
        fieldList: [
            "FirstName",
            "LastName",
            "Email",
            "Phone",
            "Id",
            "ExternalId__c",
            "BottlerId__c",
            "__sync_id__",
        ],
        soupNames: "contact",
        syncName: "syncContacts1",
    },
    {
        fieldList: [
            "CartId",
            "Product2Id",
            "Quantity",
            "Id",
            "Sku",
            "TotalPrice",
            "Name",
            "UnitAdjustedPrice",
            "TotalAmount",
            "CartDeliveryGroupId",
            "Type",
            "__sync_id__",
        ],
        soupNames: "CartItem",
        syncName: "syncCartItem",
    },
    {
        fieldList: [
            "AccountId",
            "Name",
            "WebStoreId",
            "__sync_id__",
          ],
        soupNames: "WebCart",
        syncName: "syncWebCart",
    },
  
];

const syncList = [
    "mobileSyncExplorerSyncDown",
    "syncProducts",
    "syncContacts",
    "syncCartItem",
    "syncWebCart",
    "syncUserOrders",
    "syncCartDeliveryGroup",
    "syncAccountContactRelation",
    "syncProductCategory",
    "syncUser",
    "syncWebStore",
    'syncOrderItems',
    'syncDeliveryMethod'
];

export { syncDownfieldList, syncList, syncUpFieldList, getSyncDownList };
