import React, { useState } from 'react'
import styles from "./styles";

import {
    SafeAreaView,
    View,
    TouchableHighlight,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
   
    ScrollView
} from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    SelectProblem_Damaged, SelectDays, ProblemCategory, AssetNumber, SelectEqupment, ReasonForRequest,
    ProblemType, DeliveryRelatedInquiryAndIssue, FutureDeliveries, ChangeIReceiveMyProduct, FutureDeliveries2, Time_Form, Time_To
} from '../../utils/FormOtions';
import Clock from '../../assets/images/Clock'
import FooterComponent from '../../components/FooterComponent';
import { getFormatTime } from '../../utils/DateTimeFormator';
import { useTranslation } from "react-i18next";
import RequestResived from './RequestResived';
import DropDownSelect from './DropDownSelect';
import { dialCall } from '../../utils/CommonServices';
import { AnyAction } from '@reduxjs/toolkit';
import Loader from '../../components/Loader/loader';
import { useSelector } from 'react-redux';


interface ContactUsProps{
    navigation:any,
    route:any
}
const ContactUs :React.FC<ContactUsProps>= ({ navigation, route }) => {
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [reasonForRequest, setReasonForRequest] = useState(null);
    const [selectEqupment, setSelectEqupment] = useState(null);
    const [assetNumber, setAssetNumber] = useState(null);
    const [problemCategory, setProblemCategory] = useState(null);
    const [selectProblem, setSelectProblem] = useState(null);
    // CST State
    const [problemtype, setProblemtype] = useState(null);
    const [deliveryRelatedissue, setDeliveryRelatedissue] = useState(null)
    const [futureDeliveryRelated, setFutureDeliveryRelated] = useState(null)
    const [selectIssue, setSelectIssue] = useState(null)
    const [selectIssue2, setSelectIssue2] = useState(null)


    const [availability, setAvailability] = useState(1);
    const [isCheck, setIsCheck] = useState(false);

    // Date Picker States
    const [timeFrom, setTimeFrom] = useState(null);
    const [timeTo, setTimeTo] = useState(null);

    const [showTimeFrom, setShowTimeFrom] = useState(false);
    const [showTimeTo, setShowTimeTo] = useState(false);

    const [selectDays, setSelectDays] = useState([]);
    const [message, setMessage] = useState('');
    const [disabled, setDisable] = useState(false);
    const [submitDisabled, setSubmitDisable] = useState(true);
    console.log(selectDays)
    const loader = useSelector((state: any) => state.loader.isLoaderVisible);
    const submitCheckValidation = () => {
        const isEquipmentRequestValid =
            reasonForRequest === 'Equipment' &&
            selectEqupment !== null &&
            assetNumber !== null &&
            problemCategory !== null &&
            selectProblem !== null &&
            availability === 3 &&
            selectDays.length > 0;

        const isCustomServiceRequestValid =
            reasonForRequest === 'Custom Service' &&
            problemtype !== null &&
            deliveryRelatedissue !== null &&
            futureDeliveryRelated !== null &&
            selectIssue !== null &&
            selectIssue2 !== null;

        const isGeneralInquiryRequestValid = reasonForRequest === 'General Inquiry';

        return (
            !firstName ||
            !lastName ||
            !email ||
            !zipCode ||
            !accountNumber ||
            !reasonForRequest ||
            (!isEquipmentRequestValid &&
                !isCustomServiceRequestValid &&
                !isGeneralInquiryRequestValid)
        );
    };


    const geTimeFrom = (event:any, Date:any) => {
        const selectedDate = Date
        if (event.type === "set") {
            setShowTimeFrom(false)
            setTimeFrom(selectedDate)
        }
        if (event.type === "dismissed") {
            setShowTimeTo(false)

        }


    }

    const geTimeTo = (event:any, Date:any) => {
        const selectedDate = Date
        if (event.type === "set") {
            setShowTimeTo(false)
            setTimeTo(selectedDate)
        }
        if (event.type === "dismissed") {
            setShowTimeTo(false)

        }


    }

    //  SHOW THE TIME PICKER MODEL FOR TIME FROM 
    const openTimerFrom = () => {
        setShowTimeFrom(true)

    }
    //  SHOW THE TIME PICKER MODEL FOR TIME TO
    const openTimerTo = () => {
        setShowTimeTo(true)
    }

    /** Handle Input */

    const handleFirstName = (Text:string) => { setFirstName(Text) };
    const handleLastName = (Text:string) => { setLastName(Text) };
    const handleEmail = (Text:string) => { setEmail(Text) };
    const handlePhone = (Text:string )=> { setPhone(Text) };
    const handleZipCode = (Text:string) => { setZipCode(Text) };
    const handleAccountNumber = (Text:string) => { setAccountNumber(Text) };
    const handleMessage = (Text:string) => { Text.length < 501 ? setMessage(Text) : null };
    const handleCheck = (newValue:any) => { newValue ? (setIsCheck(newValue), setDisable(true)) : (setIsCheck(newValue), setDisable(false)) };
    //    EST Handle
    const handleReasonForRequest = (val:any) => { setReasonForRequest(val) }
    const handleSelectEqupment = (val:any) => { setSelectEqupment(val) }
    const handleAssetNumber = (val:any) => { setAssetNumber(val) }
    const handleProblemCategory = (val:any) => { setProblemCategory(val) }
    const handleSelectProblem_Damaged = (val:any) => { setSelectProblem(val) }
    //    CST Handle
    const handleProblemtype = (val:any) => { setProblemtype(val) };
    const handleDeliveryRelatedissue = (val:any) => { setDeliveryRelatedissue(val) }
    const handleFutureDeliveryRelated = (val:any) => { setFutureDeliveryRelated(val) }
    const handleSelectIssue = (val:any) => { setSelectIssue(val) }
    const handleSelectIssue2 = (val:any) => { setSelectIssue2(val) }
    const handlesSelectDays = (val:any) => { setSelectDays(val) }





    const Divider = () => {
        return <View style={{ borderStyle: "dashed", borderBottomWidth: 1, borderBottomColor: "gray", marginTop: 30 }}></View>
    }
    const CommonHeading = ({ count, heading }:{ count:any, heading:any}) => {
        return (
            <View style={styles.subHeadingCommonbox}>
                <View style={styles.countbox}>
                    <Text style={styles.count}>{count}</Text>
                </View>
                <Text style={styles.commonHeading}>{heading}</Text>
            </View>)
    }
    return (
        <SafeAreaView>

            <ScrollView style={styles.background}>

                <ImageBackground source={require("../../assets/images/Contactusbackgraound.jpg")} resizeMode="cover" imageStyle={{
                    resizeMode: "cover",
                    alignSelf: "center",
                }}>
                    {/* <RequestResived type={"EST"} number={"09292440"} /> */}

                    <View style={styles.mainContainer} testID='contactUsWrapper' >
                        <Text style={styles.contactHeading}>{t("CONTACT_US.title")}</Text>
                        <Text style={styles.contactusPara}>{t("CONTACT_US.startingText")}</Text>
                        {/* common heading */}
                        <CommonHeading count={1} heading={t("CONTACT_US.contactInfo.title")} />
                        {/* Form */}

                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{t("CONTACT_US.contactInfo.firstName")}*</Text>
                                <TextInput
                                    testID='contactUsFNameInput'
                                    style={styles.input}
                                    value={firstName}
                                    onChangeText={handleFirstName}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{t("CONTACT_US.contactInfo.lastName")}*</Text>
                                <TextInput
                                    testID='contactUsLNameInput'
                                    style={styles.input}
                                    value={lastName}
                                    onChangeText={handleLastName}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{t("CONTACT_US.contactInfo.email")}* </Text>
                                <TextInput
                                    testID='contactUsEmailInput'
                                    style={styles.input}
                                    value={email}
                                    onChangeText={handleEmail}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{t("CONTACT_US.contactInfo.phoneNumber")}*</Text>
                                <TextInput
                                    testID='contactUsPhoneNumInput'
                                    style={styles.input}
                                    value={phone}
                                    keyboardType="numeric"
                                    onChangeText={handlePhone}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{t("CONTACT_US.contactInfo.zipCode")}*</Text>
                                <TextInput
                                    testID='contactUsZipCodeInput'
                                    style={styles.input}
                                    value={zipCode}
                                    keyboardType="numeric"
                                    onChangeText={handleZipCode}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{t("CONTACT_US.contactInfo.accNumber")}*</Text>
                                <TextInput
                                    testID='contactUsAccNumInput'
                                    style={styles.input}
                                    value={accountNumber}
                                    keyboardType="numeric"
                                    onChangeText={handleAccountNumber}
                                />
                            </View>
                        </View>
                        <Divider />
                        {/* Description SECTION */}
                        <CommonHeading count={2} heading={t("CONTACT_US.description.title")} />

                        <DropDownSelect
                            value={reasonForRequest}
                            data={ReasonForRequest}
                            setSelected={handleReasonForRequest}
                            label={"CONTACT_US.description.reasonForRequest"}
                            placeholder={"CONTACT_US.description.reasonForRequest"}
                             important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                        />
                        {/* CST contact us */}

                        {(reasonForRequest === 'Equipment' || reasonForRequest === null) ?

                            <View>
                                {/* EST contact us */}

                                <DropDownSelect
                                    value={selectEqupment}
                                    data={SelectEqupment}
                                    setSelected={handleSelectEqupment}
                                    label={"CONTACT_US.description.selectEquipment"}
                                    placeholder={"CONTACT_US.description.selectEquipment"}
                                     important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                                />

                                <DropDownSelect
                                    value={assetNumber}
                                    data={AssetNumber}
                                    setSelected={handleAssetNumber}
                                    label={"CONTACT_US.description.assetNum"}
                                    placeholder={"CONTACT_US.description.assetNum"}
                                     important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                                />

                                <DropDownSelect
                                    value={problemCategory}
                                    data={ProblemCategory}
                                    setSelected={handleProblemCategory}
                                    label={"CONTACT_US.description.problemCateg"}
                                    placeholder={"CONTACT_US.description.problemCateg"}
                                     important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                                />

                                <DropDownSelect
                                    value={selectProblem}
                                    data={SelectProblem_Damaged}
                                    setSelected={handleSelectProblem_Damaged}
                                    label={"CONTACT_US.description.selectProb"}
                                    placeholder={"CONTACT_US.description.selectProb"}
                                     important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                                />
                            </View>
                            :
                            (reasonForRequest === 'Custom Service') ?
                                <View>

                                    <DropDownSelect
                                        value={problemtype}
                                        data={ProblemType}
                                        setSelected={handleProblemtype}
                                        label={"CONTACT_US.description.problemtype"}
                                        placeholder={"CONTACT_US.description.problemtype"}
                                         important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                                    />

                                    <DropDownSelect
                                        value={deliveryRelatedissue}
                                        data={DeliveryRelatedInquiryAndIssue}
                                        setSelected={handleDeliveryRelatedissue}
                                        label={"CONTACT_US.description.selectDeliveryRelated"}
                                        placeholder={"CONTACT_US.description.selectDeliveryRelated"}
                                         important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                                    />

                                    <DropDownSelect
                                        value={futureDeliveryRelated}
                                        data={FutureDeliveries}
                                        setSelected={handleFutureDeliveryRelated}
                                        label={"CONTACT_US.description.selectFutureDeliveryRelated"}
                                        placeholder={"CONTACT_US.description.selectFutureDeliveryRelated"}
                                         important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                                    />

                                    <DropDownSelect
                                        value={selectIssue}
                                        data={ChangeIReceiveMyProduct}
                                        setSelected={handleSelectIssue}
                                        label={"CONTACT_US.description.selectIssue"}
                                        placeholder={"CONTACT_US.description.selectIssue"}
                                         important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                                    />

                                    <DropDownSelect
                                        value={selectIssue2}
                                        data={FutureDeliveries2}
                                        setSelected={handleSelectIssue2}
                                        label={"CONTACT_US.description.selectIssue"}
                                        placeholder={"CONTACT_US.description.selectIssue"}
                                         important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             multiselect={false}
                             selectedLabel=""
                                    />
                                </View>
                                : <View></View>
                        }

                        {/* conditional Render on EST And CST */}
                        {reasonForRequest === 'Equipment' &&
                            <View>
                                <Divider />
                                {/* Availability of Equipment */}
                                <CommonHeading count={3} heading={t("CONTACT_US.equipAvailability.title")} />
                                {/* <Text>Please select available days and times, when the facility,where the equipment is loacated, is open and the equipment is accessible.</Text> */}
                                <Text style={styles.label}>{t("CONTACT_US.equipAvailability.selectAvailability")}*</Text>
                                <View style={styles.multibuttons}>

                                    <TouchableOpacity
                                        style={[styles.mButton, { borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }, { backgroundColor: availability === 1 ? "#000" : "#fff", }]}
                                        onPress={() => setAvailability(1)}
                                    >
                                        <Text style={{ color: availability === 1 ? "#ffff" : "#000" }}>{t("CONTACT_US.equipAvailability.monFriText")}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.mButton, { backgroundColor: availability === 2 ? "#000" : "#fff" }]}
                                        onPress={() => setAvailability(2)}
                                    >
                                        <Text style={{ color: availability === 2 ? "#ffff" : "#000" }}>{t("CONTACT_US.equipAvailability.allDays")}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.mButton, { borderTopRightRadius: 5, borderBottomRightRadius: 5 }, { backgroundColor: availability === 3 ? "#000" : "#fff" }]}
                                        onPress={() => setAvailability(3)}
                                    >
                                        <Text style={{ color: availability === 3 ? "#ffff" : "#000" }}>{t("CONTACT_US.equipAvailability.pickDays")}</Text>
                                    </TouchableOpacity>
                                </View>


                                {
                                    availability === 3 &&
                                    <View style={{ marginTop: 20 }}>

                                        <DropDownSelect
                                            selectedLabel="Selected Days"
                                            multiselect={true}
                                            value={selectDays}
                                            data={SelectDays}
                                            setSelected={handlesSelectDays}
                                            label={"CONTACT_US.equipAvailability.selectDays"}
                                            placeholder={"CONTACT_US.equipAvailability.selectDays"}
                                             important={false}
                            
                             defaultOption={false}
                             save='value'
                             search={false}
                             
                            
                                        />
                                    </View>
                                }




                                {/* checkbox  */}
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        disabled={false}
                                        value={isCheck}
                                        onValueChange={handleCheck}
                                    />
                                    <Text style={styles.checkBoxText}>{t("CONTACT_US.equipAvailability.anyHourText")}</Text>
                                </View>



                                <Text style={styles.label}>{t("CONTACT_US.equipAvailability.selectTimeText")}*</Text>
                                {/* <View style={styles.datebox} >
                                    <View style={[styles.dateContainer, disabled ? styles.disabled : null]}>
                                        <Text style={[styles.dateText, disabled ? styles.disabled : null]}>{getFormatTime(timeFrom)}</Text>
                                        <TouchableOpacity
                                            onPress={openTimerFrom}
                                            style={[styles.calendarIcon]}
                                            disabled={disabled}
                                        >
                                            <Clock />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ fontSize: 18 }}> {t("CONTACT_US.equipAvailability.toText")} </Text>
                                    <View style={[styles.dateContainer, disabled ? styles.disabled : null]}>
                                        <Text style={[styles.dateText, disabled ? styles.disabled : null]}>{getFormatTime(timeTo)}</Text>
                                        <TouchableOpacity
                                            onPress={openTimerTo}
                                            style={styles.calendarIcon}
                                            disabled={disabled}
                                        >
                                            <Clock />
                                        </TouchableOpacity>
                                    </View>
                                </View> */}
                                {/* <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
  <SelectList
    setSelected={(value) => setTimeFrom(value)}
    disabled={disabled}
    data={Time_Form}
    save="value"
    search={false}
    placeholder={" "}
    boxStyles={[styles.selectboxsaluation, { alignItems: "center" }]}
    dropdownTextStyles={[styles.optionText]}
    dropdownStyles={styles.dropDownStyle}
    dropdownItemStyles={styles.dropdownItem}
    arrowicon={<View><Clock width={"14"} height={"14"} /></View>}
    inputStyles={{ color: "gray" }}
  />
  <Text style={{ fontSize: 18, marginTop: 8, paddingHorizontal: 15 }}>{t("CONTACT_US.equipAvailability.toText")}</Text>
  <View style={{ position: "relative" }}>
    <SelectList
      setSelected={(value) => setTimeTo(value)}
      disabled={disabled}
      data={Time_To}
      save="value"
      search={false}
      placeholder={" "}
      boxStyles={styles.selectboxsaluation}
      dropdownTextStyles={styles.optionText}
      dropdownStyles={styles.dropDownStyle}
      dropdownItemStyles={styles.dropdownItem}
      arrowicon={<View><Clock width={"14"} height={"14"} /></View>}
      inputStyles={{ color: "gray" }}
    />
  </View>
</View> */}

                                <View style={styles.container}>
                                    <View style={styles.selectWrapper}>
                                        <SelectList
                                            setSelected={(value:any) => setTimeFrom(value)}
                                            data={Time_Form}
                                            save="value"
                                            search={false}
                                            placeholder=""
                                            // editable={disabled}
                                            // disabled={disabled}
                                            boxStyles={styles.dselectboxsaluation}
                                            dropdownStyles={styles.dropdownStyles}
                                            dropdownItemStyles={styles.dselectboxsaluation}
                                            dropdownTextStyles={styles.optionText2}
                                            inputStyles={{ color: "black", fontSize: 12 }}
                                            arrowicon={<View style={{ paddingTop: 2, marginLeft: 2 }}><Clock width={"14"} height={"14"} /></View>}
                                        />
                                        {disabled && <View style={styles.disabledOverlay} />}
                                        {/* <Icon name="angle-down" size={20} color="#000" style={styles.icon} /> */}
                                    </View>
                                    <Text>To</Text>
                                    <View style={styles.selectWrapper}>
                                        <SelectList
                                            setSelected={(value:any) => setTimeTo(value)}
                                            data={Time_To}
                                            save="value"
                                            search={false}
                                            // editable={disabled}
                                            // disabled={disabled}
                                            placeholder=""
                                            boxStyles={styles.dselectboxsaluation}
                                            dropdownStyles={styles.dropdownStyles}
                                             dropdownItemStyles={styles.dselectboxsaluation2}
                                           
                                            dropdownTextStyles={styles.optionText2}
                                            inputStyles={{ color: "black", fontSize: 12 }}
                                            arrowicon={<View style={{ paddingTop: 2 }}><Clock width={"14"} height={"14"} /></View>}
                                        />
                                        {disabled && <View style={styles.disabledOverlay} ><Text>-- --</Text></View>}
                                        {/* <Icon name="angle-down" size={20} color="#000" style={styles.icon} /> */}
                                    </View>
                                </View>

                            </View>
                        }


                        {/* message Box */}
                        <View style={styles.gapFlexStyle}>
                            <Text style={styles.label}>{t("CONTACT_US.equipAvailability.messageText")}</Text>
                            <TextInput
                                testID='contactUsMessageInput'
                                style={styles.messageInput}
                                editable
                                multiline
                                placeholder={t("CONTACT_US.equipAvailability.messageInputPlaceHolder").toString()}
                                numberOfLines={8}
                                onChangeText={handleMessage}
                                value={message}
                            />
                            <Text style={styles.messageCount}>{message.length}/500</Text>
                        </View>

                        <Text style={[styles.supportText]}>{t("CONTACT_US.contactSupportText")}<TouchableOpacity onPress={() => dialCall("1-800-260-2653")}><Text style={{ color: "#000" }} >1-800-260-2653</Text></TouchableOpacity></Text>

                        <View style={[styles.gapFlexStyle, { justifyContent: "flex-end", flexDirection: "row" }]}>
                            <TouchableHighlight
                                testID='contactUsSubmitButton'
                                onPress={() => {
                                    // navigation.navigate('');
                                }}
                                // color={"#FFFFFF"}
                                underlayColor={'#F40000'}
                                style={submitCheckValidation() ? styles.submitDisable : styles.submitRoundButton}
                                disabled={submitCheckValidation()}
                            >

                                <Text style={[submitCheckValidation() ? { color: "gray" } : styles.whiteText, , styles.submit,]}>{t("CONTACT_US.submitBtnTxt")}</Text>
                            </TouchableHighlight>
                        </View>

                        {/* Date Picker
                        {showTimeFrom &&
                            <DateTimePicker
                                value={timeFrom ? timeFrom : new Date()}
                                mode={"time"}
                                is12Hour={true}
                                display="default"
                                onChange={geTimeFrom}

                            />}

                        {showTimeTo &&
                            <DateTimePicker
                                value={timeTo ? timeTo : new Date()}
                                mode={"time"}
                                is12Hour={true}
                                display="default"
                                onChange={geTimeTo}

                            />} */}

                    </View>

                    {/* Footer */}

                    <View style={{ padding: 0, marginTop: 0, paddingTop: 0 }} testID='contactUsFooterWrapper' >
                        <View style={styles.callUsBox}>
                            <Text style={styles.callusText}>{t("CONTACT_US.callUs")}</Text>
                            <Text style={styles.callTimeText}><Text style={styles.boldText}>{t("CONTACT_US.callUsText").substring(0, 6)}</Text>{t("CONTACT_US.callUsText").substring(6, 9)}<Text style={styles.boldText}>{t("CONTACT_US.callUsText").substring(9, 15)}</Text>{t("CONTACT_US.callUsText").substring(15, 24)}<Text style={styles.boldText}>{t("CONTACT_US.callUsText").substring(24, 27)}</Text>{t("CONTACT_US.callUsText").substring(27, 31)}<Text style={styles.boldText}>{t("CONTACT_US.callUsText").substring(31, 34)}</Text>{t("CONTACT_US.callUsText").substring(34)}</Text>
                            <TouchableOpacity testID='contactUsCallUSANumber' onPress={() => dialCall(t("CONTACT_US.usaNumber"))}><Text style={styles.countryText}>{t("CONTACT_US.usaTitle")}<Text style={styles.boldText}>{t("CONTACT_US.usaNumber")}</Text></Text></TouchableOpacity>
                            <TouchableOpacity testID='contactUsCallCanadaNumber' onPress={() => dialCall(t("CONTACT_US.canadaNumber"))}><Text style={styles.countryText}>{t("CONTACT_US.canadaTitle")}<Text style={styles.boldText}>{t("CONTACT_US.canadaNumber")}</Text></Text></TouchableOpacity>
                        </View>
                        <FooterComponent />
                    </View>

                </ImageBackground>
            </ScrollView>
            {loader &&  <Loader message="Please wait..." />}
        </SafeAreaView>
    )
}

export default ContactUs