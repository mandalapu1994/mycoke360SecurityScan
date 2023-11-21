import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import OrderInfo from '../../Screens/OrderConfirmation/OrderInfo.json'

import AccountInfo from '../../assets/images/AccountInfo'
import DeliveryInfo from '../../assets/images/DeliveryInfo'
import Collapsible from "react-native-collapsible";
import ConfirmOrderProducts from "../../components/ConfirmOrderProducts/ConfirmOrderProducts";
import CheckoutTotal from "../../components/CheckoutTotal/CheckoutTotal";
import StepIndicator from 'react-native-step-indicator';
import StepIndicatorComponent from "./StepIndicatorComponent";
import { useTranslation } from "react-i18next";
import { querySoup } from "../../Salesforce/SmartStore";
import { useSelector } from "react-redux";
import moment from "moment";
import { syncDownDeliveryMethod, syncDownOrderPaymentMethod, syncDownOrderSummaryId, syncDownShipmentMethod } from "../../Salesforce/SmartSync";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../../components/Loader/loader";


const OrderDetails: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [showProduct, setShowProduct] = useState(false)
    const [currentPosition, setCurrentPosition] = useState(0);
    const [orderHistoryData, setOrderHistoryData] = useState([]);
    const [orderDetails, setOrderDetails] = useState<any>({})
    const [accountRelatedDetails, setAccountRelatedDetails] = useState<any>({})
    const [orderPaymentMethod, setorderPaymentMethod] = useState<any>({})
    const [shippingMethod, setShippingMethod] = useState<any>({})
    const userOrderDetails = useSelector((state: any) => state.orderHistrySort.orderDetails);
    const focused=useIsFocused()
    const { t } = useTranslation();
    const loader = useSelector((state: any) => state.loader.isLoaderVisible);
    useEffect(() => {
        getDataFromStore()
        console.log("userorderDETSILSSSS =>>>>>>", userOrderDetails)
        console.log("PROPS =======>", route.params.orderDetails)

        if(route && route.params && route.params.orderDetails){
            console.log("FROM route.params.orderDetails CONDITION ",route.params.orderDetails.Id)
            setOrderDetails(route?.params?.orderDetails ? route.params.orderDetails : "")
            syncDownOrderSummaryId(route.params.orderDetails.Id)
            // syncDownDeliveryMethod(route.params.orderDetails.Id)

           

            setTimeout(() => {
                getOrderSummary()
                // getOrderDeliveryMethodFromStore()
                
            }, 1000);


        }

        setAccountRelatedDetails(userOrderDetails[0])
        console.log("orderPaymentMethod",orderPaymentMethod)

    }, [focused])
    console.log("accountRelatedDetails ------", accountRelatedDetails)


    const onShowProducts = () => {
        setShowProduct(!showProduct)
        console.log("showProduct state", showProduct)

    }

    // let saveDeliveryMethodData = (data: any) => {
    //     console.log("data.currentPageOrderedEntries DELIVERY METHOD", data.currentPageOrderedEntries)
    //     if (data.currentPageOrderedEntries) {
    //         setShippingMethod(data.currentPageOrderedEntries[0])

    //     }
    
    //   }
    
    
    
    //   let getOrderDeliveryMethodFromStore = () => {
    //     querySoup('orderdeliverygroup', (success: any) => (saveDeliveryMethodData(success)), (error: any) => console.log("querySoup----error", error), "Name")
    
    
    //   }




   /**
    * The function `saveOrderSummaryId` logs the success message and then calls two other functions,
    * `syncDownShipmentMethod` and `getPaymentMethod`, after a delay.
    * @param {any} data - The `data` parameter is an object that contains information about the current
    * page's ordered entries.
    */

    const saveOrderSummaryId = (data: any) => {
        console.log("querySoup----success ORDERSUMMARYID", data.currentPageOrderedEntries)
        if(data.currentPageOrderedEntries.length >0){
            console.log("data.currentPageOrderedEntries[data.currentPageOrderedEntries",data.currentPageOrderedEntries[data.currentPageOrderedEntries],data.currentPageOrderedEntries[data.currentPageOrderedEntries.length-1],"IDD",data.currentPageOrderedEntries[data.currentPageOrderedEntries.length-1].Id)
            syncDownShipmentMethod(data.currentPageOrderedEntries[data.currentPageOrderedEntries.length-1].Id)
            setTimeout(() => {
                getPaymentMethod()
                
            }, 1000);
        }
       

    }

    const getOrderSummary = () => {
        querySoup('ordersummary', (success: any) => (saveOrderSummaryId(success)), (error: any) => console.log("querySoup----error", error), "Name")
    }


    



    const getOrderPaymentMethod = () => {
        querySoup('cardpaymentmethod', (success: any) => (saveOrderPaymentMethod(success)), (error: any) => console.log("querySoup----error", error), "Name")
    }


    const saveOrderPaymentMethod = (data: any) => {
        console.log("querySoup----success FINALORDERDETAILS", data.currentPageOrderedEntries)
        if(data.currentPageOrderedEntries){
            setorderPaymentMethod(data.currentPageOrderedEntries[0])

        }
        // setOrderHistoryData(data.currentPageOrderedEntries)

    }

    console.log("orderPaymentMethod",orderPaymentMethod)



    const savePaymentMethod = (data: any) => {
        console.log("querySoup----success getPaymentMethod", data.currentPageOrderedEntries)

        if(data.currentPageOrderedEntries){
            syncDownOrderPaymentMethod(data.currentPageOrderedEntries[0]?data.currentPageOrderedEntries[0].PaymentMethodId:"")

            setTimeout(() => {
                getOrderPaymentMethod()
                
            }, 1000);
        }
       

    }

    const getPaymentMethod = () => {
        querySoup('orderpaymentsummary', (success: any) => (savePaymentMethod(success)), (error: any) => console.log("querySoup----error", error), "OrderSummaryId")
    }


    const saveData = (data: any) => {
        console.log("querySoup----success ORDERSSSSSSS", data.currentPageOrderedEntries)
        setOrderHistoryData(data.currentPageOrderedEntries)

    }

    const getDataFromStore = () => {
        querySoup('order', (success: any) => (saveData(success)), (error: any) => console.log("querySoup----error", error), "Name")
    }

    const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

    const customStyles = {
        stepIndicatorSize: 35,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 3,
        // separatorStrokeLength: 100,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fff',
        stepStrokeWidth: 4,
        stepStrokeFinishedColor: '#fff',
        stepStrokeUnFinishedColor: '#fff',
        separatorFinishedColor: '#ffffff',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#bfbfbf',
        stepIndicatorCurrentColor: '#000',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#ffffff',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013'
    }
    return (
        <ScrollView
            contentContainerStyle={styles.orderDetailsMainWrapper}
        >
            <View style={styles.orderDetailsInnerWrapper} testID="orderDetailsWrapper" >
                <View style={styles.orderInfoWrap}> 
                    <StepIndicatorComponent navigation={navigation} route={route} orderDetails={orderDetails} />
                    <View style={styles.orderDateMainWrapper}>
                        <View style={styles.orderDateWrapper}>
                            <Text style={styles.orderDateText}>{t("ORDERCONFIRM.orderDate")}</Text>
                            <Text style={styles.orderDateString}>{orderDetails.OrderedDate ? moment(orderDetails.OrderedDate).format('D M YYYY') : ""}</Text>
                        </View>
                        <View style={styles.orderDateWrapper}>
                            <Text style={styles.orderDateText}>{t("ORDERCONFIRM.orderNumber")}</Text>
                            <Text style={styles.orderDateString}>{orderDetails.OrderNumber ? orderDetails.OrderNumber : ""}</Text>
                        </View>
                    </View>

                    <View style={styles.accountInfoTextWrap}>

                        <AccountInfo />

                        <Text style={styles.accountInfoTxt}>{t("ORDERCONFIRM.accountInfo")}</Text>
                    </View>

                    {/* <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.buyerAdd")}</Text>
                        <Text style={styles.deliveryDateTxt}>{OrderInfo.account_info.buyer_address}</Text>
                    </View> */}

                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.billingAdd")}</Text>
                        <Text style={styles.deliveryDateTxt}>
                            {
                                accountRelatedDetails.BillingAddress ?
                                    (accountRelatedDetails.BillingAddress.street + "\n" +
                                        accountRelatedDetails.BillingAddress.city + " "
                                        + accountRelatedDetails.BillingAddress.state + "\n" +
                                        accountRelatedDetails.BillingAddress.country + "\n" +
                                        accountRelatedDetails.BillingAddress.postalCode) : ""}
                        </Text>
                    </View>


                    <View style={styles.accountInfoTextWrap}>

                        <DeliveryInfo />

                        <Text style={styles.accountInfoTxt}>{t("ORDERCONFIRM.deliveryInfo")}</Text>
                    </View>


                    <View style={styles.shippingMethodMainWrapper}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.shippingMethod")}</Text>
                        <View style={styles.shippingMethodWrapper}>
                        {
                               orderDetails.deliveryMethod == 'Coca-Cola Truck' ?
                                <Image source={require('../../assets/images/CocaCola_logo.png')} /> :
                                orderDetails.deliveryMethod == 'UPS' ?
                                <Image source={require('../../assets/images/UPSLogo.png')} />:""


                            }
                            {/* {
                                shippingMethod && shippingMethod.OrderDeliveryMethod && shippingMethod.OrderDeliveryMethod.Name == 'Coca-Cola Truck' ?
                                <Image source={require('../../assets/images/CocaCola_logo.png')} /> : ""

                            } */}
                            {/* <Text style={styles.shippingMethodTxt}>{OrderInfo.delivery_info.shipping_method}</Text> */}
                        </View>
                    </View>

                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.shipppingAdd")}</Text>
                        <Text style={styles.deliveryDateTxt}> {
                            accountRelatedDetails.ShippingAddress ?
                                (accountRelatedDetails.ShippingAddress.street + "\n" +
                                    accountRelatedDetails.ShippingAddress.city + " "
                                    + accountRelatedDetails.ShippingAddress.state + "\n" +
                                    accountRelatedDetails.ShippingAddress.country + "\n" +
                                    accountRelatedDetails.ShippingAddress.postalCode) : ""}
                        </Text>
                    </View>

                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.driverNotes")}</Text>
                        <Text style={styles.deliveryDateTxt}>{orderDetails.Driver_Notes__c}</Text>
                    </View>

                    <View style={styles.pickupOptnWrap}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.pickup")}</Text>
                        {/* <Text style={styles.pickupSubTxt}>{t("ORDERCONFIRM.co2Cylinders")}</Text> */}
                        <Text style={styles.deliveryDateTxt}>{orderDetails.Glass_Bottles__c &&orderDetails.Co2_Cylinders__c ? orderDetails.Glass_Bottles__c &&orderDetails.Co2_Cylinders__c:orderDetails.Co2_Cylinders__c  ? orderDetails.Co2_Cylinders__c:orderDetails.Glass_Bottles__c?orderDetails.Glass_Bottles__c:"" }</Text>
                    </View>

                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.paymentMethod")}</Text>
                        <View style={styles.paymentSpecificInfo}>
                            <>
                            {/* {console.log("orderPaymentMethod in HTML",orderPaymentMethod)} */}
                            </>
                           

                        {
                           orderPaymentMethod && Object.keys(orderPaymentMethod).length !== 0 && orderPaymentMethod.CardType == 'Visa' ?
                            <Image style={styles.paymentCardLogo} source={require('../../assets/images/Visalogo.png')} />:""
                        }
                        
                        <Text style={styles.deliveryDateTxt}>{orderPaymentMethod && Object.keys(orderPaymentMethod).length !== 0 ?orderPaymentMethod.CardType + " " + 'XXXX' + "-" + orderPaymentMethod.DisplayCardNumber.substring(orderPaymentMethod.DisplayCardNumber.length-4):""}</Text>
                        </View>

                    </View>


                    <View style={styles.paymentInfoWrapper}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.poNo")}</Text>
                        <Text style={styles.deliveryDateTxt}>{orderDetails.PoNumber}</Text>
                    </View>


                    <TouchableOpacity
                        testID='orderDetailsShowProductList'
                        onPress={() => onShowProducts()}
                        style={styles.accountInfoTextWrap}>
                        <Image source={require('../../assets/images/Products.png')} />

                        <Text style={styles.accountInfoTxt}>{t("ORDERCONFIRM.products")}</Text>
                        <View style={{ marginLeft: "auto" }}>

                            {
                                showProduct ?
                                    <Image source={require('../../assets/images/Uparrow.png')} />
                                    :
                                    <Image source={require('../../assets/images/downArrow.png')} />
                            }

                        </View>

                    </TouchableOpacity>

                    <Collapsible collapsed={!showProduct}  >
                        <ConfirmOrderProducts  orderDetails={orderDetails} />
                    </Collapsible>
                    <CheckoutTotal isShowOrderSummary={true} isFromCart={false} navigation={navigation} />
                </View>

            </View>
            {loader &&  <Loader message="Please wait..." />}
        </ScrollView >




    )

}
export default OrderDetails