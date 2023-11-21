import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, ScrollView, Image } from "react-native";

import styles from './styles';
 import OrderInfo from "./OrderInfo.json"

import ConfirmOrderProducts from "../../components/ConfirmOrderProducts/ConfirmOrderProducts";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Collapsible from "react-native-collapsible";
import Accordion from 'react-native-collapsible/Accordion';
import OrderConfirmed from '../../assets/images/OrderConfirmed'
import AccountInfo from '../../assets/images/AccountInfo'
import DeliveryInfo from '../../assets/images/DeliveryInfo'
import CheckoutTotal from "../../components/CheckoutTotal/CheckoutTotal";

import { useTranslation } from "react-i18next";
import ReviewOrder from "../CheckOut/ReviewOrder";
import Loader from "../../components/Loader/loader";
import { useSelector } from "react-redux";

const OrderConfirmation :React.FC<{navigation:any}>= ({ navigation }) => {

    const [showProduct, setShowProduct] = useState(false)
    const [isShowOrderSummary, setIsShowOrderSummary] = useState(false)
    const { t } = useTranslation();
    const toScrollRef = useRef(null);
    const loader = useSelector((state: any) => state.loader.isLoaderVisible);




    const onShowProducts = () => {
        setShowProduct(!showProduct)
        // if (!showProduct && toScrollRef.current) {

        //     toScrollRef.current.scrollToIndex({ index: 3, animated: true })
        //     console.log("FROM INSIDE")
        // }
        // console.log("showProduct state", showProduct)

    }

    return (
        <SafeAreaView
            style={styles.orderConfMainWrapper}
        >
            <ScrollView style={styles.orderConfInnerWrapper}>
                <ImageBackground
                    source={require("../../assets/images/BackgroundImage.png")}
                    style={styles.imgfirstdiv
                    }
                    imageStyle={{
                        resizeMode: "cover",
                        alignSelf: "center",
                        position: "absolute",
                        top: -30

                    }}>
                    <View style={styles.confirmedImg}>
                        <OrderConfirmed />
                    </View>
                </ImageBackground>
                <View style={styles.orderInfoWrap} testID="OrderConfrmWrapper" >
                    <View style={styles.orderPlacedTxtWrap}>
                        <Text style={styles.orderPlacedTxt}>{t("ORDERCONFIRM.orderPlacedTxt")}</Text>
                        <Text style={styles.emailReceivedTxt}>{t("ORDERCONFIRM.emailReceivedTxt")}</Text>
                    </View>
                    <View style={styles.orderDateMainWrapper}>
                        <View style={styles.orderDateWrapper}>
                            <Text style={styles.orderDateText}>{t("ORDERCONFIRM.orderDate")}</Text>
                            <Text style={styles.orderDateString}>{OrderInfo.order_date}</Text>
                        </View>
                        <View style={styles.orderDateWrapper}>
                            <Text style={styles.orderDateText}>{t("ORDERCONFIRM.orderNumber")}</Text>
                            <Text style={styles.orderDateString}>{OrderInfo.order_number}</Text>
                        </View>
                        <View style={styles.orderDateWrapper}>
                            <Text style={styles.orderDateText}>{t("ORDERCONFIRM.status")}</Text>
                            <Text style={styles.orderDateString}>{OrderInfo.status}</Text>
                        </View>
                    </View>
                    <View style={styles.accountInfoTextWrap}>

                        <AccountInfo />

                        <Text style={styles.accountInfoTxt}>{t("ORDERCONFIRM.accountInfo")}</Text>
                    </View>
                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.buyerAdd")}</Text>
                        <Text style={styles.deliveryDateTxt}>{OrderInfo.account_info.buyer_address}</Text>
                    </View>
                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.billingAdd")}</Text>
                        <Text style={styles.deliveryDateTxt}>{OrderInfo.account_info.billing_address}</Text>
                    </View>
                    <View style={styles.accountInfoTextWrap}>

                        <DeliveryInfo />

                        <Text style={styles.accountInfoTxt}>{t("ORDERCONFIRM.deliveryInfo")}</Text>
                    </View>
                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.deliveryDate")}</Text>
                        <Text style={styles.deliveryDateTxt}>{OrderInfo.delivery_info.delivery_date}</Text>
                    </View>
                    <View style={styles.shippingMethodMainWrapper}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.shippingMethod")}</Text>
                        <View style={styles.shippingMethodWrapper}>
                            <Image source={require('../../assets/images/UPSLogo.png')} />
                            {/* <View style={styles.shippingMethodImg}></View> */}
                            <Text style={styles.shippingMethodTxt}>{OrderInfo.delivery_info.shipping_method}</Text>
                        </View>
                    </View>
                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.shipppingAdd")}</Text>
                        <Text style={styles.deliveryDateTxt}>{OrderInfo.delivery_info.shipping_add}</Text>
                    </View>
                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.driverNotes")}</Text>
                        <Text style={styles.deliveryDateTxt}>{OrderInfo.delivery_info.Driver_notes}</Text>
                    </View>
                    <View style={styles.pickupOptnWrap}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.pickup")}</Text>
                        <Text style={styles.pickupSubTxt}>{t("ORDERCONFIRM.co2Cylinders")}</Text>
                        <Text style={styles.deliveryDateTxt}>{OrderInfo.delivery_info.pickup_option}</Text>
                    </View>
                    <View style={styles.accountInfoTextWrap}>

                        <Image source={require('../../assets/images/Payment.png')} />
                        <Text style={styles.accountInfoTxt}>{t("ORDERCONFIRM.paymentInfo")}</Text>
                    </View>
                    <View style={styles.deliveryDatee}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.paymentMethod")}</Text>
                        <Text style={styles.deliveryDateTxt}>{OrderInfo.payment_info.payment_method}</Text>
                    </View>
                    <View style={styles.paymentInfoWrapper}>
                        <Text style={styles.dateString}>{t("ORDERCONFIRM.poNo")}</Text>
                        <Text style={styles.deliveryDateTxt}>{OrderInfo.payment_info["PO Number"]}</Text>
                    </View>
                    <TouchableOpacity
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

                    <Collapsible collapsed={!showProduct} style={{ width: "100%" }} >
                        <ConfirmOrderProducts toScrollRef={toScrollRef} />
                    </Collapsible>
                </View>
            </ScrollView>
            <CheckoutTotal  isShowOrderSummary={true} isFromCart={false} navigation={navigation}/>







            {/* <View style={styles.orderSummaryContainer}>
                <TouchableOpacity
                    onPress={() => setIsShowOrderSummary(!isShowOrderSummary)}
                    
                >
                    <View style={styles.orderSummaryHeader}>

                        <Text style={styles.orderHiglight}>{OrderInfo.orderSummary.orderHighlight}</Text>
                        {
                            isShowOrderSummary ?
                                <Image source={require('./../../assets/images/Uparrow.png')} />
                                :
                                <Image source={require('./../../assets/images/downArrow.png')} />
                        }
                    </View>
                    </TouchableOpacity>

                    <View style={styles.orderSummmaryContent}>
                        {isShowOrderSummary && (
                            <>
                                <View style={styles.expandedContent}>
                                    <View style={styles.orderDetails} >
                                        <Text style={styles.orderBoldText} >Subtotal: </Text>
                                        <Text style={styles.orderBoldText} >$1576.84</Text>
                                    </View>
                                    <View style={styles.orderDetails} >
                                        <Text style={styles.orderBoldText} >Delivery Charge:</Text>
                                        <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText} >$0.00</Text>

                                    </View>
                                    <View style={styles.orderDetails} >
                                        <Text style={styles.orderBoldText} >Deposit:</Text>
                                        <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText} >$0.00</Text>
                                    </View>
                                    <View style={styles.orderDetails} >
                                        <Text style={styles.orderBoldText} >Tax:</Text>
                                        <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText} >$0.00</Text>
                                    </View>
                                </View>
                                
                            </>
                        )}


                    </View>
                <OrderSummary isShowOrderSummary={isShowOrderSummary} />
            </View > */}




{loader &&  <Loader message="Please wait..." />}
        </SafeAreaView >

    )


}
export default OrderConfirmation