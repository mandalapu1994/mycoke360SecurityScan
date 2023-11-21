import React, { useEffect, useRef ,FC, useState} from "react";
import { View, Text, Image, TextInput, ScrollView, FlatList } from "react-native";
import styles from "./styles";
import OrderInfo from '../../Screens/OrderConfirmation/OrderInfo.json'
import StringsConst from '../../../StringsConst.json'
// import { TextInput } from "react-native-gesture-handler";
import allProducts from "../../Screens/OrderConfirmation/Products";
import { useTranslation } from "react-i18next";
import { syncDownOrdersItem } from "../../Salesforce/SmartSync";
import { useIsFocused } from "@react-navigation/native";
import { querySoup } from "../../Salesforce/SmartStore";


interface Product {
  productTitle: string;
  sku: string;
  price: string;
  savedPrice: string;
}
interface Props {

  orderDetails:any
}
const ConfirmOrderProducts: FC<Props> = (props) => {
    const { t } = useTranslation();
   const [tS,setTS]= useState()
   const focused=useIsFocused()
   const [orderItems, setOrderItems] = useState([])
    // const toScrollRef = useRef()
    // useEffect(() => {
    //     if (toScrollRef.current) {
    //         const indexToScroll = 2; // Example index to scroll to
    //         toScrollRef.current.scrollToIndex({ index: indexToScroll, animated: true });
    //     }

    // }, [])

    // const getItemLayout = (data, index) => {
    //     const itemHeight = 60 // Replace ITEM_HEIGHT with the actual height of each item
    //     const offset = itemHeight * index;
    //     const length = itemHeight * data.length;
    //     return { length, offset, index };
    // };





    useEffect(() => {
        console.log("PROPS FROM ORDERPRODUCTS",props.orderDetails)
        if(props && props.orderDetails){

            syncDownOrdersItem(props.orderDetails.Id)
            getDataFromStore()
        }

    
    }, [focused])

    const saveData = (data: any) => {
        console.log("querySoup----success ORDERSSSSSSS SPECIFIC", data.currentPageOrderedEntries)
        setOrderItems([])
        setOrderItems(data.currentPageOrderedEntries)

    }

    const getDataFromStore = () => {
        querySoup('OrderItem', (success: any) => (saveData(success)), (error: any) => console.log("querySoup----error", error), "Name")
    }


   
    return (
        <View style={styles.productInfoMainWrapper} testID="confirmOrderProductsWrapper" >
            <FlatList
                data={orderItems}
                renderItem={({ item }:{ item : any}) =>
                    <View style={styles.productInfoWrapper}>
                        <Image source={require('../../assets/images/DietCoke.png')} style={styles.productImg} />
                        <View style={styles.productInfoRight}>
                            <Text style={styles.orderTitle}>{item.Description}</Text>
                            <View style={styles.skuMainWrapper}>

                                <View style={styles.skuWrapper}>

                                    <Text style={styles.skuTxt}>{t("ORDERCONFIRM.sku")}</Text>
                                    <Text style={styles.skuNo}>{item.sku?item.sku:""}</Text>
                                    <Text style={styles.sectionSeperator}>|</Text>
                                </View>

                                <View style={styles.upcWrapper}>

                                    <Text style={styles.skuTxt}>{t("ORDERCONFIRM.upc")}:</Text>
                                    <Text style={styles.skuNo}>{item.sku?item.sku:""}</Text>
                                </View>
                            </View>

                            <View style={styles.productPriceWrapper}>

                                <Text style={styles.productPriceTxt}>${item.TotalPrice}</Text>
                                <View style={styles.savedMoneyWrapper}>

                                    <Text style={styles.moneySaved} >{t("ORDERCONFIRM.moneySaved")}</Text>
                                    <Text style={styles.moneySaved}>{item.TotalPromoAdjustmentAmount__c}</Text>
                                </View>
                            </View>
                        </View>
                        <View>


                        </View>
                    </View>
                }

                keyExtractor={(item:any, index:any) => index}
            />




        </View>
    )
}
export default ConfirmOrderProducts