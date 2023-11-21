import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import StringsConst from '../../../StringsConst.json';
import OrderInfo from '../../Screens/OrderConfirmation/OrderInfo.json';
import DiscountIcon from '../../assets/images/DiscountIcon';

interface OrderSummaryProps {
  isShowOrderSummary: boolean;
  isFromCart: boolean;
  onUpdateCartPress?: () => void;
  navigation: any; // Replace with actual navigation type
  orderSummaryData?: any;
  webCartData?: any;
  isCartUpdated?:boolean
}

const OrderSummary: React.FC<OrderSummaryProps> = (props) => {
  const { orderSummaryData, webCartData } = props;
  // console.log("Order summary Data", orderSummaryData);
  return (
    <View style={styles.orderSummaryMainWrap}>
      <View style={styles.totalInfoWrapper}>
        <Text style={styles.totalTxt}>{StringsConst.total}</Text>
        {
          orderSummaryData?.totalPrice?
          
        <Text style={styles.totalTxt}>
          ${Number(orderSummaryData?.totalPrice).toFixed(2) ?? 0.00}
        </Text>:<Text style={styles.totalTxt}>
          $0.00
        </Text>
        }
      </View>

      {props.isShowOrderSummary && orderSummaryData?.totalDiscounts < 0 && (
        <View style={styles.parentContainer}>
          <View style={styles.discountIcon}>
            <DiscountIcon />
          </View>

          <Text style={styles.savedMoney}>
            ${orderSummaryData?.totalDiscounts ? Math.abs(Number(orderSummaryData?.totalDiscounts)): 0.00} Saved!{' '}
          </Text>
          <Text style={styles.savedOfferText}>with this order </Text>
        </View>
      )}
      <View style={styles.contiShoppingMainWrapper}>
        <Text style={styles.finalAmtTxt}>
          {OrderInfo.orderSummary.finalAmtTxt}
        </Text>
      </View>
      {props.isFromCart ? (
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            testID='updateCartButton'
            style={styles.updatecartButton}
            onPress={props.onUpdateCartPress}
          >
            <Text style={styles.blackTxt}>Update Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            disabled={!props.isCartUpdated}
            testID='proceedToCheckOutButton'
            style={props.isCartUpdated? styles.proceedCheckoutButton :styles.disableProceedCheckoutButton } 
            onPress={() =>
              props.navigation.navigate('CheckOut', {
                webCartData: webCartData,
                orderSummaryData: orderSummaryData,
              })
            }
          >
            <Text style={[props.isCartUpdated ? styles.whiteText :styles.blackTxt]}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contiShoppingMainWrapper}>
          <TouchableOpacity
            testID='contShoppingButton'
            style={styles.contiShoppingWrapper}
          >
            <Text style={styles.contiShoppingTxt}>
              {StringsConst.continueShopping}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default OrderSummary;
