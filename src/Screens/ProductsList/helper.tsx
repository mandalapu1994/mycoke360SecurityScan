
interface StoreAssortment {
    AssortmentId: string;
    // Other properties from storeassortment...
  }
  
  interface AssortmentItem {
    Id: string;
    // Other properties from Assortment...
  }

const getSKUData = (productList: any[]) => {
  // console.log('getSKUData=productList====',productList)
  // console.log('getSKUData=productList==length',productList.length)
    const stockKeepingUnits: string[] = [];
    for (const item of productList) {
      // console.log('getSKUData=item====',item.fields.StockKeepingUnit.value)
        // if (item.StockKeepingUnit) {
            stockKeepingUnits.push(item.fields.StockKeepingUnit.value);
        // }
    }
    // console.log('getSKUData=stockKeepingUnits !!',stockKeepingUnits)
    return stockKeepingUnits
}

// const getAssortmentIds = (StoreAssortment: any[],Assortment: any[]) =>{
//     console.log('getAssortmentIds=StoreAssortment',StoreAssortment)
//     console.log('getAssortmentIds=Assortment',Assortment)
//     const idSet = new Set(StoreAssortment.map(item => item.AssortmentId));

//   // Filter arr1 to get matching elements
//   const matchingElements = Assortment.filter(item1 => idSet.has(item1.ID));

//   console.log('getAssortmentIds=matchingElements',matchingElements)
//   return matchingElements;
// }

const getAssortmentIds = (storeAssortment: any[], assortment: any[]): AssortmentItem[] =>{
    // Create a map to store Assortment items by Id for faster lookup
       
    const assortmentMap: { [key: string]: AssortmentItem } = {};
  
    // Populate the map with Assortment items using their Id as the key
    assortment.forEach((item) => {
      assortmentMap[item.Id] = item;
    });
  
    // Filter storeAssortment based on the AssortmentId, keeping only matching items
    const matchingItems: AssortmentItem[] = storeAssortment
      .filter((storeItem) => assortmentMap[storeItem.AssortmentId]);
  
     
    return matchingItems;
    //  getAssortmentIdsArray(matchingItems)
  }

  const getAssortmentIdsArray = (matchingItems: any[]) =>{
    // console.log('getSKUData=productList',matchingItems)
    const AssortmentIdArray: string[] = [];
    for (const item of matchingItems) {
        if (item.AssortmentId) {
          AssortmentIdArray.push(item.AssortmentId);
        }
    }
    return AssortmentIdArray
  }

  const getUniqueSKUs = (AssortmentProducts: any[]) => {
    const uniqueSKUs = new Set<string>();
  
    AssortmentProducts.forEach((entry) => {
      const assortment = entry.Assortment;
  
      if (
        assortment &&
        assortment.ListingType__c &&
        assortment.ListingType__c !== 'ZipcodeExcl' &&
        (assortment.ListingType__c === 'BusinessPartner' || assortment.ListingType__c === 'Listing')
      ) {
        const product = entry.Product;
  
        if (product && product.StockKeepingUnit) {
          uniqueSKUs.add(product.StockKeepingUnit);
        }
      }
    });
  
    return Array.from(uniqueSKUs);
  };

  const getProductsBySKU = (product2Array: any[], skuArray: string[]) => {
    // console.log('getProductsBySKU==product2Array',product2Array)
    const resultArray: any[] = [];
  
    skuArray.forEach((sku) => {
      const product = product2Array.find((item) => item.StockKeepingUnit === sku);
  
      if (product) {
        resultArray.push(product);
      }
    });
  
    return resultArray;
  };

export {getSKUData,getAssortmentIds,getAssortmentIdsArray,getUniqueSKUs,getProductsBySKU} 