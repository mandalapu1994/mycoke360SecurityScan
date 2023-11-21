import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
   Text,
   TouchableOpacity,
   TouchableHighlight,
   View,
   ScrollView,
   DeviceEventEmitter

} from 'react-native';
import styles from "./styles";
import TableCompo from './TableCompo';
import { useTranslation } from "react-i18next";


const OrderBuilder :React.FC<{navigation:any}>= ({ navigation }) => {



   //This Data is For Select Option
   const data:any = [
      { key: '1', value: 'All Products' },
      { key: '2', value: 'New Products' },
      { key: '3', value: 'Sparkling Soft Drinks' },
      { key: '4', value: 'Water' },
      { key: '5', value: 'Enhanced Water' },
      { key: '6', value: 'Tea' },

   ]


   //This Data is For Tab Option

   const DATA:any = [
      { image: require("../../assets/images/ProductListIcon.png"), tabName: 'Product List' },
      { image: require("../../assets/images/ProductListIcon.png"), tabName: 'Order Builder' },
      { image: require("../../assets/images/ProductListIcon.png"), tabName: 'Shopping List' },
     

   ];


   const clearAll = () => {
      DeviceEventEmitter.emit('cleared', "true")

   }



   const { t } = useTranslation();

   return (

      <View style={styles.bodyFlexStyle} testID='OrderBuilderWrapper' >
         <ScrollView style={{padding:0,margin:0}}>

            <View testID='OrderBuilderTableWrapper' style={{width:"100%"}} >
               <View style={{ padding: 20 }}>
                  <Text style={{ color: "black" }}>The order builder is not available.</Text>
               </View>
               {/* <TableCompo /> */}
               
            </View>

            {/* <View style={styles.footerContainer}>
               <View style={styles.footerBackground}>
                  <View style={styles.footerInnerDiv}>
                     <View style={styles.gapStyle}>
                        <TouchableOpacity onPress={() => clearAll()} testID='OrderBuilderClearAllButton' >

                           <Text style={styles.showText}>{t("ORDER_BUILDER.clearTitle")}</Text>
                        </TouchableOpacity>
                     </View>

                     <View style={styles.gapStyle}>
                        <TouchableHighlight
                           testID='OrderBuilderSaveAsDraft'
                           onPress={() => {
                              // navigation.navigate('ProductDetails');
                           }}
                           // color={"#0000"}
                           underlayColor={'#F40000'}
                           style={styles.saveDraftButton}>

                           <Text style={styles.blackText}>{t("ORDER_BUILDER.saveTitle")}</Text>
                        </TouchableHighlight>
                     </View>

                     <View style={styles.gapStyle}>
                        <TouchableHighlight
                           testID='orderBuilderAddToCart'
                           onPress={() => {
                              // navigation.navigate('ProductDetails');
                           }}
                           // color={"#FFFFFF"}
                           underlayColor={'#F40000'}
                           style={styles.roundButton}>

                           <Text style={styles.whiteText}>{t("ORDER_BUILDER.addTitle")}</Text>
                        </TouchableHighlight>
                     </View>
                  </View>
               </View>
            </View> */}
         </ScrollView>




      </View>

   );
};

export default OrderBuilder;



