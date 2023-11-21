// CheckOut
import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Switch,
  TextInput,
  Pressable
} from 'react-native';
import Checkbox from '@react-native-community/checkbox'
import StringsConst from './stringConstant.json'
import styles from "./styles";
import { SelectList } from "react-native-dropdown-select-list";
import DownArrow from "../../assets/images/DownArrow";
// import { TextInput } from 'react-native-gesture-handler';
import ReviewOrder from "./ReviewOrder";
import ProductListIcon from "../../assets/images/ProductListIcon";
import CardIcon from "../../assets/images/CardIcon";
import InformationIcon from "../../assets/images/InformationIcon";
import CalendarIcon from "../../assets/images/CalendarIcon";
import DiscountIcon from "../../assets/images/DiscountIcon";
import DeliveryInfo from "../../assets/images/DeliveryInfo";
import BlackCross from "../../assets/images/Cross";
import AlertTriangle from "../../assets/images/AlertTriangle";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { querySoup, createUpdateSoup } from "../../Salesforce/SmartStore";
import { NavigationProp } from "@react-navigation/native";
import FullScreenModal from '../../components/Calendar/FullScreenModal';
import CustomCalendar from '../../components/Calendar/CustomCalendar';
import { fetchingDetailsForDayOff, getDates, getDatesBySpecificDay, getSpecificDays, getSpecificDaysArr, isDateWithinRange } from './helper';
import moment from 'moment';
import Loader from '../../components/Loader/loader';
import { useSelector } from 'react-redux';

const Separator = () => <View style={styles.separator} />;

interface CheckOutProps {
  navigation: any; // Change the type to the correct navigation type
  route: any;
}

const CheckOut: React.FC<CheckOutProps> = (props) => {
  const { t } = useTranslation();
  const { webCartData, orderSummaryData } = props.route.params;
  const [isCo2CylinderEnabled, setIsCo2CylinderEnabled] = useState(false);
  const [isGlassBottleEnabled, setIsGlassBottleEnabled] = useState(false);
  const [co2Cylinders, setCo2Cylinders] = useState();
  const [glassBottles, setGlassBottles] = useState();
  const [shippingAdd, setShippingAdd] = useState(
    `Coke Florida Parcel \n2953 Ridge Way \nLake Wales, FL 33859`
  );
  const [shippingNotes, setShippingNotes] = useState("");
  const [PONumber, setPONumber] = useState("");
  const [pickupOptions, setPickupOptions] = useState<any>();
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "VISA-1111" },
    { key: "2", value: "VISA-2222" },
    { key: "3", value: "VISA-3333" },
    { key: "4", value: "VISA-4444" },
  ];

  const [activeView, setActiveView] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [showList, setShowList] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const loader = useSelector((state: any) => state.loader.isLoaderVisible);
  const userDetailsObj = useSelector((state: any) => state.user.userDetails);
  console.log("userDetailsObj",userDetailsObj)
  const handleDateSelectorClick = () => {
    setShowDatePicker(true);
  };
  const formattedDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const handleDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const saveData = (data: any) => {
    // console.log("querySoup----data", JSON.stringify(data) );
    setPickupOptions(data);
  };
  const getDataFromStore = () => {
    querySoup(
      "WebStore",
      (success: any) => saveData(success),
      (error: any) => console.log("querySoup----error", error),
      "Enable_Co2_Cylinders__c"
    );
  };
  useEffect(() => {
    getDataFromStore();
  }, []);

  const onSubmitPress = () => {
    const checkoutData = {
      ...webCartData,
      Id: webCartData?.Id || "",
      OwnerId: webCartData?.AccountId,
      IsDeleted: false,
      Name: "Cart",
      CreatedDate: formattedDate,
      CreatedById: webCartData?.AccountId,
      LastModifiedDate: formattedDate,
      LastModifiedById: webCartData?.AccountId,
      SystemModstamp: formattedDate,
      WebStoreId: webCartData?.WebStoreId,
      AccountId: webCartData?.AccountId,
      Type: "Cart",
      PoNumber: PONumber,
      BillingStreet: null,
      BillingCity: null,
      BillingState: null,
      BillingPostalCode: null,
      BillingCountry: null,
      BillingLatitude: null,
      BillingLongitude: null,
      BillingGeocodeAccuracy: null,
      BillingAddress: shippingAdd,
      TotalAmount: orderSummaryData.totalPrice,
      TotalTaxAmount: orderSummaryData.totalTaxes,
      TotalAmountAfterAllAdjustments: 0.01,
      GrandTotalAmount: orderSummaryData.totalPrice,
      TotalProductCount: orderSummaryData.totalQuantity,
      UniqueProductCount: 1,
      Test__c: null,
      Co2_Cylinders__c: co2Cylinders,
      Glass_Bottles__c: glassBottles,
      Driver_Notes__c: shippingNotes,
      Total_Tax__c: orderSummaryData.totalTaxes,
      Shipping_Charge__c: null,
      Order_Charge__c: null,
      TotalPromoAdjustmentAmount__c: 0,
      PaymentMethod__c: null,
      TotalDiscounts__c: null,
      TotalPrice__c: null,
      ContactIDCartToOrder__c: null,
      Contact_ID__c: null,
      Tax__c: null,
      DeliveryFee__c: null,
      DeliveryDate__c: null,
      MOQFee__c: null,
      MOVFee__c: null,
      Fees__c: null,
      SpecialDeliveryFee__c: null,
      OneTimeDeliveryNotes__c: null,
      DiscountsFees__c: null,
      OrderOrigin__c: null,
      BottlerId__c: 4200,
      SalesDocumentType__c: null,
      TotalSavings__c: 0,
      Payment_Terms__c: null,
      POTypeValue__c: null,
      CartId__c: props.route.params.webCartData?.Id,
      __local__: true,
      __locally_created__: false,
      __locally_deleted__: false,
      __locally_updated__: true,
    };
    createUpdateSoup(
      checkoutData,
      "WebCart",
      (updatedContact: any) => {
        console.log("WebCart updated successfully:", updatedContact);
      },
      (error: any) => {
        console.log("Error updating Webcart:", error);
      }
    );
  };
  return (
    <View style={styles.bodyFlexStyle} testID="checkOutWrapper">
      <ScrollView>
        <View>
          <Text style={styles.heading}>{t("CHECK_OUT.checkOutPageTitle")}</Text>
        </View>

        <View style={styles.alertBox}>
          <View style={styles.dataBoxTop}>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
                paddingVertical: 10,
                width: "92%",
              }}
            >
              <AlertTriangle />
              <View>
                <Text style={styles.alertHeading}>Alert!</Text>
                <Text
                  style={styles.alertText}
                >{`Depending upon the contents of your \norder, it may be delivered by a 3rd Party`}</Text>
                {/* <Text style={styles.alertText} >order, it may be delivered by a 3rd Party</Text> */}
              </View>
            </View>
            <TouchableOpacity style={{ padding: 10, width: "8%" }}>
              <BlackCross />
            </TouchableOpacity>
          </View>
        </View>

        {/* CheckOut page Start */}
        <View style={styles.BlockWhite}>
          <View style={styles.checkOutHeader}>
            <View style={styles.gapStyle}>
              <DeliveryInfo />
            </View>
            <View style={styles.gapStyle}>
              <Text style={styles.headerText}>
                {t("CHECK_OUT.deliveryInformation")}
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.smallText, styles.textHeading]}>
              {t("CHECK_OUT.pickupOptions")}
            </Text>
            {pickupOptions?.currentPageOrderedEntries[0]
              .Enable_Co2_Cylinders__c ? (
              <View style={styles.dataBox}>
                <View style={styles.dataBoxTop}>
                  <Checkbox
                    value={isCo2CylinderEnabled}
                    onValueChange={() =>
                      setIsCo2CylinderEnabled(!isCo2CylinderEnabled)
                    }
                    style={{ marginTop: 10, marginLeft: 10 }}
                  />
                  <Text style={styles.smallTextPara}>
                    {t("CHECK_OUT.co2Cylinders")}
                  </Text>
                  {/* <View style={{ paddingTop: 8 }} >
                                    <Switch
                                        trackColor={{ false: '#B0ADAB', true: '#0C8359' }}
                                        thumbColor='#f4f3f4'
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => setIsCo2CylinderEnabled(!isCo2CylinderEnabled)}
                                        value={isCo2CylinderEnabled}
                                    />
                                </View> */}
                </View>
                <TextInput
                  testID='co2CylindersTextInput'
                  style={[styles.input, styles.smallInput]}
                  onChangeText={(number: any) => setCo2Cylinders(number)}
                  value={co2Cylinders}
                  placeholder={t("CHECK_OUT.co2InputPlaceHolder").toString()}
                  keyboardType="numeric"
                  editable={isCo2CylinderEnabled ? true : false}
                />

              </View>
            ) : null}
            {pickupOptions?.currentPageOrderedEntries[0]
              .Enable_Glass_Bottles__c ? (
              <View style={styles.dataBox}>
                <View style={styles.dataBoxTop}>
                  <Checkbox
                    value={isGlassBottleEnabled}
                    onValueChange={() =>
                      setIsGlassBottleEnabled(!isGlassBottleEnabled)
                    }
                    style={{ marginTop: 10, marginLeft: 10 }}
                  />
                  <Text style={styles.smallTextPara}>
                    {t("CHECK_OUT.glassBottles")}
                  </Text>
                </View>
                <TextInput
                  testID="glassBottlesTextInput"
                  style={[styles.input, styles.smallInput]}
                  onChangeText={(number: any) => setGlassBottles(number)}
                  value={glassBottles}
                  placeholder={t("CHECK_OUT.glassInputPlaceHolder").toString()}
                  keyboardType="numeric"
                  editable={isGlassBottleEnabled ? true : false}
                />
              </View>
            ) : null}
          </View>
          <View>
            <Text style={[styles.smallText, styles.textHeading]}>
              {t("CHECK_OUT.deliveryDate")}
            </Text>
            <TouchableOpacity
              onPress={handleDateSelectorClick}
              testID="checkOutDatePicker"
            >
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                <View style={styles.calendarIcon}>
                  <CalendarIcon />
                </View>
              </View>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <View>
            <Text style={[styles.smallText, styles.textHeading]}>
              {t("CHECK_OUT.shippingAddress")}
            </Text>
            <TextInput
              style={[styles.addressInput, styles.ShippingAdd]}
              editable={false}
              multiline
              numberOfLines={3}
              // onChangeText={text => setShippingAdd(text)}
              value={shippingAdd}
            />
          </View>
          <View>
            <Text style={[styles.smallText, styles.textHeading]}>
              {t("CHECK_OUT.driverShippingNotes")}
            </Text>
            <TextInput
              testID="checkOutShippingNotesTextInput"
              editable
              multiline
              numberOfLines={3}
              style={styles.addressInput}
              onChangeText={(text: string) => setShippingNotes(text)}
              value={shippingNotes}
            />
          </View>
          <View>
            <Text style={[styles.smallText, styles.textHeading]}>
              {t("CHECK_OUT.shippingMethod")}
            </Text>
            <View style={styles.shippingcontainer}>
              <View style={styles.shippingImgContainer}>
                <Image
                  source={require("../../assets/images/UPSLogo.png")}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.shippingTextContainer, styles.shippingText]}>
                Your order will be delivered on{" "}
                <Text style={styles.boldText}>Friday, 18 October, 2023</Text>{" "}
                using <Text style={styles.boldText}>UPS Ground Service</Text>
              </Text>
            </View>
          </View>
          <View style={styles.checkOutHeader}>
            <View style={styles.gapStyle}>
              <CardIcon />
            </View>
            <View style={styles.gapStyle}>
              <Text style={styles.headerText}>
                {t("CHECK_OUT.paymentInformation")}
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.smallText, styles.textHeading]}>
              {t("CHECK_OUT.paymentMethod.title")}
            </Text>
            <ScrollView horizontal>
              <TouchableOpacity
                testID="checkOutCardPaymentButton"
                style={[styles.view, activeView === 1 && styles.activeView]}
                onPress={() => setActiveView(1)}
              >
                <Text style={styles.text}>
                  {t("CHECK_OUT.paymentMethod.card")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="checkOutECheckPaymentButton"
                style={[styles.view, activeView === 2 && styles.activeView]}
                onPress={() => setActiveView(2)}
              >
                <Text style={styles.text}>
                  {t("CHECK_OUT.paymentMethod.eCheck")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="checkOutInvoiceMePaymentButton"
                style={[styles.view, activeView === 3 && styles.activeView]}
                onPress={() => setActiveView(3)}
              >
                <Text style={styles.text}>
                  {t("CHECK_OUT.paymentMethod.invoiceMe")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="checkOutNetDueUponPaymentButton"
                style={[styles.view, activeView === 4 && styles.activeView]}
                onPress={() => setActiveView(4)}
              >
                <Text style={styles.text}>
                  {t("CHECK_OUT.paymentMethod.netDueUponDelivery")}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View>
            <Text style={[styles.smallText, styles.textHeading]}>
              {t("CHECK_OUT.PONum")}
            </Text>
            <TextInput
              testID="checkOutPoNumberTextInput"
              style={styles.input}
              // onChangeText={(number:any) => onChangeCo2CylindersNum(number)}
              value={co2Cylinders}
              keyboardType="numeric"
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            {activeView === 1 && (
              <View>
                <View style={styles.savedCardsWrapper}>
                  <View>
                    <Text style={[styles.smallText, styles.textHeading]}>
                      {t("CHECK_OUT.Saved_cards")}*
                    </Text>
                    <View style={{ width: 260, marginTop: 6 }}>
                      <SelectList
                        // testID='CheckOutSavedCardsDropDown'
                        setSelected={(val: any) => setSelected(val)}
                        data={data}
                        save="value"
                        // value={selected}
                        search={false}
                        defaultOption={{ key: "1", value: "VISA-1111" }}
                        boxStyles={styles.selectboxsaluation}
                        dropdownTextStyles={styles.optionText}
                        dropdownStyles={{
                          backgroundColor: "#FFFFFF",
                          borderWidth: 0,
                        }}
                        dropdownItemStyles={{
                          borderBottomWidth: 0.8,
                          borderBottomColor: "#DDDBDA",
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardDetails}>
                        Expires on 12/2023{"\n"}
                        Brad Customer{"\n"}
                        1156 Inverness #123{"\n"}
                        Naperville, IL 60504 US{"\n"}
                        1234567890{"\n"}
                        brad.sommerfeld@fiserv.com
                      </Text>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={[styles.smallText, styles.textHeading]}>
                          {t("CHECK_OUT.cvv")}
                        </Text>
                        <View
                          style={{ flexDirection: "row", paddingRight: 10 }}
                        >
                          <Text style={[styles.smallText, styles.textHeading]}>
                            Edit
                          </Text>
                          <Text style={[styles.smallText, styles.textHeading]}>
                            New
                          </Text>
                        </View>
                      </View>
                      <TextInput
                        testID="checkOutCvvTextInput"
                        style={styles.cvvInput}
                        // onChangeText={(number:any) => onChangeCo2CylindersNum(number)}
                        value={co2Cylinders}
                        keyboardType="numeric"
                      />
                    </View>
                    <View>
                      <TouchableHighlight
                        testID="cardSubmitButton"
                        // color={"#FFFFFF"}
                        underlayColor={"#F40000"}
                        style={[styles.submitButton, styles.squareButton]}
                        onPress={onSubmitPress}
                      >
                        <Text style={styles.whiteText}>
                          {t("CHECK_OUT.submitBtnTxt")}
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
                <View style={styles.termsWrapper}>
                  <View style={styles.icon}>
                    <InformationIcon width={18} height={18} />
                  </View>
                  <Text style={styles.shippingTextContainer}>
                    {t("CHECK_OUT.infoText").substring(0, 49)}{" "}
                    <Text style={[styles.boldText, styles.redText]}>
                      {t("CHECK_OUT.infoText").substring(50, 64)}
                    </Text>{" "}
                    {t("CHECK_OUT.infoText").substring(65, 68)}{" "}
                    <Text style={[styles.boldText, styles.redText]}>
                      {t("CHECK_OUT.infoText").substring(69)}
                    </Text>
                  </Text>
                </View>
              </View>
            )}
            {activeView === 2 && (
              <View>
                <View style={styles.savedCardsWrapper}>
                  <View style={{ height: 200 }}>
                    <TouchableHighlight
                      testID="eCheckSubmitButton"
                      // color={"#FFFFFF"}
                      underlayColor={"#F40000"}
                      style={[
                        styles.submitButton,
                        styles.squareButton,
                        styles.tempSubmitButton,
                      ]}
                      onPress={onSubmitPress}
                    >
                      <Text style={styles.whiteText}>
                        {t("CHECK_OUT.submitBtnTxt")}
                      </Text>
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.termsWrapper}>
                  <View style={styles.icon}>
                    <InformationIcon width={18} height={18} />
                  </View>
                  <Text style={styles.shippingTextContainer}>
                    {t("CHECK_OUT.infoText").substring(0, 49)}{" "}
                    <Text style={[styles.boldText, styles.redText]}>
                      {t("CHECK_OUT.infoText").substring(50, 64)}
                    </Text>{" "}
                    {t("CHECK_OUT.infoText").substring(65, 68)}{" "}
                    <Text style={[styles.boldText, styles.redText]}>
                      {t("CHECK_OUT.infoText").substring(69)}
                    </Text>
                  </Text>
                </View>
              </View>
            )}
            {activeView === 3 && (
              <View>
                <View>
                  <View style={styles.termsWrapper}>
                    <View style={styles.icon}>
                      <InformationIcon width={18} height={18} />
                    </View>

                    <Text style={styles.shippingTextContainer}>
                      {t("CHECK_OUT.infoText").substring(0, 49)}{" "}
                      <Text style={[styles.boldText, styles.redText]}>
                        {t("CHECK_OUT.infoText").substring(50, 64)}
                      </Text>{" "}
                      {t("CHECK_OUT.infoText").substring(65, 68)}{" "}
                      <Text style={[styles.boldText, styles.redText]}>
                        {t("CHECK_OUT.infoText").substring(69)}
                      </Text>
                    </Text>
                  </View>
                  <Separator />
                  <TouchableHighlight
                    testID="invoiceMEPlaceOrderButton"
                    // color={"#FFFFFF"}
                    underlayColor={"#F40000"}
                    style={[styles.submitButton, styles.roundButton]}
                    onPress={onSubmitPress}
                  >
                    <Text style={styles.whiteText}>
                      {t("CHECK_OUT.placeOrderBtnTxt")}
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
            {activeView === 4 && (
              <View>
                <View>
                  <View style={styles.termsWrapper}>
                    <View style={styles.icon}>
                      <InformationIcon width={18} height={18} />
                    </View>
                    <Text style={styles.shippingTextContainer}>
                      {t("CHECK_OUT.infoText2").substring(0, 85)}{" "}
                      <Text style={[styles.boldText, styles.redText]}>
                        {t("CHECK_OUT.infoText2").substring(86, 100)}
                      </Text>{" "}
                      {t("CHECK_OUT.infoText2").substring(101, 104)}{" "}
                      <Text style={[styles.boldText, styles.redText]}>
                        {t("CHECK_OUT.infoText2").substring(105)}
                      </Text>
                    </Text>
                  </View>
                  <Separator />
                  <TouchableHighlight
                    testID="netDueUponDeliveryPlaceOrderButton"
                    // color={"#FFFFFF"}
                    underlayColor={"#F40000"}
                    style={[styles.submitButton, styles.roundButton]}
                    onPress={onSubmitPress}
                  >
                    <Text style={styles.whiteText}>
                      {t("CHECK_OUT.placeOrderBtnTxt")}
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={() => setShowList(!showList)}>
            <View style={styles.checkOutHeader}>
              <View style={styles.reviewOrderTitle}>
                <View style={styles.headerLeft}>
                  <View style={styles.gapStyle}>
                    <ProductListIcon />
                  </View>
                  <Text style={styles.headerText}>
                    {t("CHECK_OUT.review_order")} (8 Items)
                  </Text>
                </View>
                <View style={{ paddingRight: 15 }}>
                  <DownArrow />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <ScrollView testID="checkOutReviewOrderWrapper">
            {showList === true && <ReviewOrder />}
          </ScrollView>
        </View>
        <View
          style={styles.orderSummaryContainer}
          testID="checkOutOrderSummaryWrapper"
        >
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <View style={styles.orderSummaryHeader}>
              <Text style={styles.orderSummaryTitle}>
                {t("CHECK_OUT.orderSummary.title")} (8 items | 24 Creates)
              </Text>
              <DownArrow />
            </View>
          </TouchableOpacity>
          <View style={styles.orderSummmaryContent}>
            {expanded && (
              <View style={styles.expandedContent}>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderBoldText}>
                    {t("CHECK_OUT.orderSummary.subtotal")}:{" "}
                  </Text>
                  <Text style={styles.orderBoldText}>$1576.84</Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderBoldText}>
                    {t("CHECK_OUT.orderSummary.deliveryCharge")}:
                  </Text>
                  <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                    $0.00
                  </Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderBoldText}>
                    {t("CHECK_OUT.orderSummary.deposit")}:
                  </Text>
                  <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                    $0.00
                  </Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderBoldText}>
                    {t("CHECK_OUT.orderSummary.tax")}:
                  </Text>
                  <Text style={1 > 0 ? styles.valueZero : styles.orderBoldText}>
                    $0.00
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.orderSummaryRow}>
              <Text style={styles.total}>
                {t("CHECK_OUT.orderSummary.total")}:
              </Text>
              <Text style={styles.total}>$0.00</Text>
            </View>
            <Text style={styles.finalAmount}>
              *{t("CHECK_OUT.orderSummary.finalText")}
            </Text>
          </View>
          {expanded && (
            <View>
              <View style={styles.parentContainer}>
                <View style={styles.savedOfferContent}>
                  <DiscountIcon />
                  <Text style={styles.savedOfferText}>
                    <Text style={{ fontWeight: "800" }}>
                      {t("CHECK_OUT.orderSummary.savedAmt")}
                    </Text>
                    with this order
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                testID="checkOutContinueShopping"
              >
                <Text style={styles.buttonText}>
                  {t("CHECK_OUT.orderSummary.buttonText")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      {loader &&  <Loader message="Please wait..." />}
    </View>
  );
};

export default CheckOut;
