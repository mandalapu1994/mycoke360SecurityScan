import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import OrderSummary from '../OrderSummary/OrderSummary';
import styles from './styles';

import OrderInfo from '../../Screens/OrderConfirmation/OrderInfo.json';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';


interface CheckoutTotalProps {
  isShowOrderSummary: boolean;
  isFromCart: boolean;
  onUpdateCartPress?: () => void;
  navigation: any;
  orderSummaryData?: any;
  webCartData?: string;
  totalCartItemCount?: number;
  deliveryCharge?:any;
  mov?:any;
  isCartUpdated:boolean
}

const CheckoutTotal: React.FC<CheckoutTotalProps> = (props) => {
  const [isShowOrderSummary, setIsShowOrderSummary] = useState<boolean>(false);
  const { t } = useTranslation();
  const { orderSummaryData } = props;
  const focused=useIsFocused()

  useEffect(() => {


    console.log("deliveryCharge",props.deliveryCharge,"deliveryCharge TYpe",typeof(props.deliveryCharge))
    
  }, [props.deliveryCharge]);

 
  return (
    <View style={styles.orderSummaryContainer} testID='checkOutTotalWrapper'>
      <TouchableOpacity
        testID='checkOutExapander'
        onPress={() => setIsShowOrderSummary(!isShowOrderSummary)}
      >
        <View
          style={[
            styles.orderSummaryHeader,
            isShowOrderSummary
              ? {
                  borderBottomWidth: 1,
                  borderColor: '#DDDBDA',
                }
              : null,
          ]}
        >
          <Text style={styles.orderHiglight}>
            {`Order Summary (${props.totalCartItemCount ?? 0} ${
              (props.totalCartItemCount ?? 0) > 1 ? 'items' : 'item'
            })`}
          </Text>
          {isShowOrderSummary ? (
            <Image source={require('./../../assets/images/Uparrow.png')} />
          ) : (
            <Image source={require('./../../assets/images/downArrow.png')} />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.orderSummmaryContent}>
        {isShowOrderSummary && (
          <>
            <View style={styles.expandedContent}>
              <View style={styles.orderDetails}>
                <Text style={styles.orderBoldText}>
                  {t('ORDERCONFIRM.Subtotal')} :{' '}
                </Text>
                {
                  orderSummaryData?.subTotal?
                <Text style={styles.orderBoldText}>
                  ${Number(orderSummaryData?.subTotal).toFixed(2)?? 0.00 }
                </Text>:<Text style={styles.orderBoldText}>$0.00</Text>

                }
              </View>

              <View style={styles.orderDetails}>
                <Text style={styles.orderBoldText}>
                  {t('ORDERCONFIRM.DeliveryCharge')} :
                </Text>
               
                <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                 ${props.deliveryCharge?props.deliveryCharge:0.00}
                </Text>
              </View>

              {
                props.mov && props.mov > 0 ?
                
              <View style={styles.orderDetails}>
                <Text style={styles.orderBoldText}>
                  {t('ORDERCONFIRM.MinOrderCharge')} :
                </Text>
                <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                 ${props.mov?Number(props.mov).toFixed(2):0}
                </Text>
              </View> :null

              }

              
              <View style={styles.orderDetails}>
                <Text style={styles.orderBoldText}>
                  {t('ORDERCONFIRM.Deposit')} :
                </Text>
                {
                  orderSummaryData?.totalDeposits ?

                <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                  ${Number(orderSummaryData?.totalDeposits).toFixed(2) ?? 0.0}
                </Text>:<Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>$0.00</Text>
                }
              </View>

              <View style={styles.orderDetails}>
                <Text style={styles.orderBoldText}>
                  {t('ORDERCONFIRM.Tax')} :
                </Text>
                {
                  orderSummaryData.totalTaxes?

                <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                  ${Number(orderSummaryData.totalTaxes).toFixed(2) ?? 0.0}
                </Text>:<Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>$0.00</Text>
                }
              </View>
            </View>
          </>
        )}
      </View>
      <OrderSummary
        isShowOrderSummary={isShowOrderSummary}
        isFromCart={props.isFromCart}
        navigation={props.navigation}
        onUpdateCartPress={props.onUpdateCartPress}
        orderSummaryData={orderSummaryData}
        isCartUpdated={props.isCartUpdated}
      />
      {/* </View>
      </TouchableOpacity> */}

      {/* <View style={styles.orderSummmaryContent}>
        {isShowOrderSummary && (
          <>
            <View style={styles.expandedContent}>
              <View style={styles.orderDetails}>
                <Text style={styles.orderBoldText}>
                  {t('ORDERCONFIRM.Subtota')} :{' '}
                </Text>
                <Text style={styles.orderBoldText}>$1576.84</Text>
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderBoldText}>
                  {t('ORDERCONFIRM.DeliveryCharge')} :
                </Text>
                <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                  $0.00
                </Text>
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderBoldText}>
                  {t('ORDERCONFIRM.Deposit')} :
                </Text>
                <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                  $0.00
                </Text>
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderBoldText}>
                  {t('ORDERCONFIRM.Tax')} :
                </Text>
                <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                  $0.00
                </Text>
              </View>
            </View>
          </>
        )}
      </View> */}
      {/* <OrderSummary
        isShowOrderSummary={isShowOrderSummary}
        isFromCart={props.isFromCart}
        navigation={props.navigation}
        onUpdateCartPress={props.onUpdateCartPress}
        orderSummaryData={props.orderSummaryData}
        webCartData={props.webCartData}
      /> */}
    </View>
  );
};
export default CheckoutTotal;
