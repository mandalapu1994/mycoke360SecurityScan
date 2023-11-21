import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ImagePickerIOS, FlatList, Modal, Pressable, TouchableHighlight } from "react-native";
import styles from "./styles";
import SupportHistoryDetails from "./SupportHistoryDetails.json";
import { useTranslation } from "react-i18next";
import SearchBar from "../../components/SearchBar";
import FilterIcon from "../../assets/images/FilterIcon"
import FooterComponent from "../../components/FooterComponent";
import BlackCross from "../../assets/images/BlackCross"
import { SelectList } from 'react-native-dropdown-select-list';
import CheckBox from '@react-native-community/checkbox';
import DropDownSelect from '../ContactUs/DropDownSelect';
import {
    SelectProblem_Damaged, SelectDays, ProblemCategory, AssetNumber, SelectEqupment, ReasonForRequest,
    ProblemType, DeliveryRelatedInquiryAndIssue, FutureDeliveries, ChangeIReceiveMyProduct, FutureDeliveries2, Time_Form, Time_To
} from '../../utils/FormOtions';
import Clock from '../../assets/images/Clock';

import DownArrow from '../../assets/images/DownArrow'
import UpArrow from '../../assets/images/UpArrow'
import CalendarIcon from '../../assets/images/CalendarIcon'
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDateTimeSeperatedString } from "../../utils/DateTimeFormator";
import moment from "moment";
import Cross from '../../assets/images/Cross'
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/loader";

interface EquipmentService {
  created_on: string;
  description: string;
  status: string;
  // Add other properties as needed
}

interface CustomerSupport {
  case_number: string;
  subject: string;
  status: string;
  // Add other properties as needed
}

const SupportHistory: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { t } = useTranslation();
    const [toggleButton, setToggleButton] = useState(true)
    const [searchedText, setSearchedText] = useState('');
    const [equipmentServices, setEquipmentServices] = useState<any>([]);
    const [customerSupport, setCustomerSupport] = useState<any>([]);
    const [productListIndex, setProductListIndex] = useState(1)
    const [openEquipmentInfoModal, setOpenEquipmentInfoModal] = useState(false)
    const [euipmentDetails, setEquipmentDetails] = useState<any>({})
    const [cancelTicketModal, setCancelTicketModal] = useState(false)
    const [selected, setSelected] = React.useState("");
    const [openCustomerSuppInfoModal, setOpenCustomerSuppInfoModal] = useState(false)
    const [openRescheduleModal, setOpenRescheduleModal] = useState(false)
    const [availability, setAvailability] = useState(1);
    const [isCheck, setIsCheck] = useState(false);
    const [selectDays, setSelectDays] = useState<any>([]);
    const [message, setMessage] = useState('');
    const [disabled, setDisable] = useState(false);
    const [timeFrom, setTimeFrom] = useState(null);
    const [timeTo, setTimeTo] = useState(null);
    const [startDateOnSelect, setstartDateOnSelect] = useState("")
    const [endDateOnSelect, setEndDateOnSelect] = useState("")

    const [selectedData, setSelectedData] = useState<any>([]);
    const [isCaseStatusOpen, setIsCaseStatusOpen] = useState(true);
    const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const [open, setOpen] = useState(false)
    const [closed, setClosed] = useState(false)
    const [cancelled, setCancelled] = useState(false)
    const [isSortModalOpen, setIsSortModalOpen] = useState(false)

    const [filterByStatus, setFilterByStatus] = useState<any>([]);
    const loader = useSelector((state: any) => state.loader.isLoaderVisible);
    const toggleCaseStatusAccordion = () => {
        setIsCaseStatusOpen(!isCaseStatusOpen);
    };

    const toggleDateRangeAccordion = () => {
        setIsDateRangeOpen(!isDateRangeOpen);
    };

    const handleStartDateSelectorClick = () => {
        setShowStartDatePicker(true)
    }
    const handleEndDateSelectorClick = () => {
        setShowEndDatePicker(true)
    }

    const handleStartDateChange = (event: any, selectedDate: any | undefined) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            console.log("selectedDate", selectedDate)
            setStartDate(selectedDate);
            setstartDateOnSelect(selectedDate)
        }
    };

    const handleEndDateChange = (event: any, selectedDate: any | undefined) => {
        console.log("selectedDate", selectedDate)
        setShowEndDatePicker(false);
        if (selectedDate) {
            console.log("SELECTED DATE &&", selectedDate)
            setEndDate(selectedDate);
            setEndDateOnSelect(selectedDate)
        }
    };

    const handleReset = () => {
        setOpen(false)
        setCancelled(false)
        setClosed(false)
        setStartDate(new Date())
        setEndDate(new Date())
        setstartDateOnSelect("")
        setEndDateOnSelect("")
        setSelectedData([])
        setEquipmentServices(SupportHistoryDetails.equipmentService)
        setCustomerSupport(SupportHistoryDetails.customerSupport)

    }


    useEffect(() => {
        setEquipmentServices(SupportHistoryDetails.equipmentService)
        setCustomerSupport(SupportHistoryDetails.customerSupport)

        // SupportHistoryDetails.equipmentService.filter((ele) => {
        //     const date = ele.created_on.split(',')[0];
        //     const parts=date.split("/");
        //     const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
        //     console.log("FORMATTED DATE",formattedDate)
        //     const createdDate = new Date(formattedDate);
        //     console.log("createdDate DATE",createdDate)

        // })
        // console.log("ISO STRING", new Date("05/03/2023").toISOString())



    }, [setEquipmentServices, setCustomerSupport])


    const toggleSection = (toggleSlug: string) => {
        if (toggleSlug === "equipService") {
            setToggleButton(true)
        } else if (toggleSlug === "customerSupport") {
            setToggleButton(false)
        }
    }

    const onChangeSearchedText = (text: string) => {
        setSearchedText(text);
        if (text === "") {
            if (toggleButton) {

                setEquipmentServices(SupportHistoryDetails.equipmentService);
            } else {
                setCustomerSupport(SupportHistoryDetails.customerSupport)

            }
        } else {
            if (toggleButton) {

                const filteredServices = SupportHistoryDetails.equipmentService.filter((service:any) =>
                    service.case_no.includes(text)
                );
                setEquipmentServices(filteredServices);
            } else {
                const filteredServices = customerSupport.filter((service:any) =>
                    service.case_no.includes(text)
                );
                setCustomerSupport(filteredServices);

            }
        }

    };


    const renderCustomerSupportProblemType = ({ item, index }: { item: string, index: number }) => {
        const borderColors = ["#000000", "#757575", "#B3B3B3", "#DDDBDA", "#EAEAEA"];
        const borderColor = borderColors[index % borderColors.length];

        return <View style={{ borderLeftWidth: 2, borderLeftColor: borderColor, paddingLeft: 5 }}>
            <Text style={{ color: "#000" }}>{item}</Text>
        </View>
    }

    const clearSearch = () => {
        setSearchedText("");
        setEquipmentServices(SupportHistoryDetails.equipmentService)
        setCustomerSupport(SupportHistoryDetails.customerSupport)
    }

    const productQuantity = (slug: string) => {

        if (slug === "ViewMore") {
            if (toggleButton) {
                setProductListIndex(equipmentServices.length - 1)
            } else {
                setProductListIndex(customerSupport.length)
            }
        } else if (slug === "ShowLess") {
            setProductListIndex(1)
        }
    }

    const onItemClicked = (item: any, index: any) => {
        setEquipmentDetails(item)
        toggleButton ? setOpenEquipmentInfoModal(true) : setOpenCustomerSuppInfoModal(true);
    }

    const renderProductListItem = ({ item, index }: { item: any , index: any }) => {
        if (index <= productListIndex) {

            return <TouchableOpacity style={styles.historyContentHolder}
                testID='supportHistoryViewTicket'
                onPress={() => onItemClicked(item, index)}
            >
                <Text style={styles.caseNo}>{item.case_no}</Text>

                <View style={styles.historyKeyValueWrapper}>
                    <View style={styles.keyWrapper} >
                        <Text>{t("SupportHistory.createdOn")} :</Text>
                    </View>
                    <View style={styles.valueWrapper}>
                        <Text style={styles.historyKey}>{getDateTimeSeperatedString(item.created_on).split(",")[0] + "\n" + getDateTimeSeperatedString(item.created_on).split(",")[1]}</Text>
                    </View>
                </View>

                <View style={styles.historyKeyValueWrapper}>

                    <View style={styles.keyWrapper} >
                        <Text>{t("SupportHistory.businessContact")} :</Text>
                    </View>
                    <View style={styles.valueWrapper}>
                        <Text style={styles.historyKey}>{item.business_contact}</Text>
                    </View>
                </View>

                {
                    toggleButton ?

                        <View style={styles.historyKeyValueWrapper}>

                            <View style={styles.keyWrapper} >
                                <Text>{t("SupportHistory.equipmentType")} :</Text>
                            </View>

                            <View style={styles.valueWrapper}>
                                <Text style={styles.historyKey}>{item.equipmen_type}</Text>
                            </View>
                        </View> : ""
                }

                <View style={styles.historyKeyValueWrapper}>

                    <View style={styles.keyWrapper} >
                        <Text>{toggleButton ? t("SupportHistory.problemDesc") : "Problem Type"} :</Text>
                    </View>
                    <View style={styles.valueWrapper}>
                        <Text style={styles.historyKey}>{toggleButton ? item.problem_desc : item.problem_type[0]}</Text>
                    </View>
                </View>


                <View style={styles.historyKeyValueWrapper}>

                    <View style={styles.keyWrapper} >
                        <Text>{t("SupportHistory.status")} :</Text>
                    </View>

                    <View style={styles.valueWrapper}>
                        <View style={styles.statusWrapper}>

                            <Text style={styles.statusTxt} >{item.status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        }else{
        return <View></View>
      }

    }

   interface CommonHeadingProps {
  count: number;
  heading: string;
}

const CommonHeading: React.FC<CommonHeadingProps> = ({ count, heading }:{ count:any, heading:string }) => {
        return (
            <View style={styles.subHeadingCommonbox}>
                <View style={styles.countbox}>
                    <Text style={styles.count}>{count}</Text>
                </View>
                <Text style={styles.commonHeading}>{heading}</Text>
            </View>)
    }

    const handlesSelectDays = (val: any) => { setSelectDays(val) }

    const handleCheck = (newValue: boolean) => { newValue ? (setIsCheck(newValue), setDisable(true)) : (setIsCheck(newValue), setDisable(false)) };


    const toSortByStatus = (sortSlug: string) => {
        if (sortSlug === "fromOpen") {
            setOpen(!open)
        } else if (sortSlug === "fromClosed") {
            setClosed(!closed)

        } else if (sortSlug === "fromCancel") {
            setCancelled(!cancelled)
        }

    }


    const onApplySort = () => {
        filterListByDateRange(open, closed, cancelled, startDateOnSelect, endDateOnSelect)
        setIsSortModalOpen(false)

    }

    // const [selectedData, setSlectedData] = useState

    const filterListByDateRange = (
         open: boolean,
         closed: boolean,
         cancelled: boolean,
         startDateOnSelect: string,
         endDateOnSelect: string
    ) => {
        console.log("filterListByDateRange =>", startDate, "endDate", endDate)
         let tempSelectedData: any = [];
         let dateFilter:any = [];



        if (open) {
            tempSelectedData.push("Open")
        }
        if (closed) {
            tempSelectedData.push("Closed")
            console.log("FROM CLOSED BLOCK")
        }
        if (cancelled) {
            tempSelectedData.push("Cancel")
        } if (startDateOnSelect && endDateOnSelect) {
            let formattedStartDate = moment(startDateOnSelect).format("DD/MM/YYYY");
            let formattedEndDate = moment(endDateOnSelect).format("DD/MM/YYYY");
            dateFilter.push(`${formattedStartDate}-${formattedEndDate}`)
            console.log("startDateOnSelect", formattedStartDate, "endDateOnSelect", formattedEndDate)

        }

        console.log("selectedData =>", selectedData, "closed", closed)

        const SupportHistoryDateRangeList = SupportHistoryDetails.equipmentService
        const customerSupportDateRangeList = SupportHistoryDetails.customerSupport

        if (startDateOnSelect && endDateOnSelect && tempSelectedData.length < 1) {
            const start = moment(startDateOnSelect).startOf('day');
            const end = moment(endDateOnSelect).endOf('day');
            console.log("start inside", start, "end inside", end)
            if (toggleButton) {
                let finalFilteredArray :any= SupportHistoryDateRangeList.filter((item:any) => {
                    const itemDate = moment(item.created_on);
                    console.log("FINAL RESULT", itemDate.isBetween(start, end, null, '[]'))
                    return itemDate.isBetween(start, end, null, '[]');
                });

                console.log("DateRangeList", finalFilteredArray)
                setEquipmentServices(finalFilteredArray)

            } else {
                let finalFilteredArray :any= customerSupportDateRangeList.filter((item:any) => {
                    const itemDate = moment(item.created_on);
                    console.log("FINAL RESULT", itemDate.isBetween(start, end, null, '[]'))
                    return itemDate.isBetween(start, end, null, '[]');
                });

                console.log("DateRangeList", finalFilteredArray)
                setCustomerSupport(finalFilteredArray)

            }
        } else if (startDateOnSelect && endDateOnSelect && tempSelectedData.length > 0) {

            const start = moment(startDateOnSelect).startOf('day');
            const end = moment(endDateOnSelect).endOf('day');
            console.log("start inside", start, "end inside", end)

            if (toggleButton) {
                let filteredItem
                let finalFilteredArray :any= SupportHistoryDateRangeList.filter((item:any) => {
                    const itemDate = moment(item.created_on);
                    console.log("itemDate.isBetween", itemDate.isBetween(start, end, null, '[]'))
                    return itemDate.isBetween(start, end, null, '[]');
                });

                filteredItem = finalFilteredArray.filter((ele:any) => {
                    return tempSelectedData.includes(ele.status) ? ele : ""
                })

                console.log("DateRangeList", finalFilteredArray)
                console.log("filteredItem from BOTH", filteredItem)
                setEquipmentServices(filteredItem)
                // setEquipmentServices(finalFilteredArray)

            } else {
                let filteredItem
                let finalFilteredArray :any= customerSupportDateRangeList.filter((item:any) => {
                    const itemDate = moment(item.created_on);
                    return itemDate.isBetween(start, end, null, '[]');
                });

                filteredItem = finalFilteredArray.filter((ele:any) => {
                    return tempSelectedData.includes(ele.status) ? ele : ""
                })

                console.log("DateRangeList", finalFilteredArray)
                console.log("finalFILTERED BOTH CUSTOMERSUPPORT", filteredItem)

                setCustomerSupport(filteredItem)

            }

        } else {
            let filteredItem :any
            if (toggleButton) {

                filteredItem = SupportHistoryDateRangeList.filter((ele:any) => {
                    return tempSelectedData.includes(ele.status) ? ele : ""
                })
                setEquipmentServices(filteredItem)
            } else {
                filteredItem = customerSupportDateRangeList.filter((ele:any) => {
                    return tempSelectedData.includes(ele.status) ? ele : ""
                })
                setCustomerSupport(filteredItem)

            }
            console.log("filteredItem", filteredItem)
        }

        //   return DateRangeList;
        setSelectedData([...tempSelectedData.concat(dateFilter)])


    }

    const onCrossClicked = (item: string, index: number) => {

        const updatedSelectedData = selectedData.filter((i:any, ind:any) => ind !== index)
        let formattedStartDate = moment(startDateOnSelect).format("DD/MM/YYYY");
        let formattedEndDate = moment(endDateOnSelect).format("DD/MM/YYYY");
        let finalDateFilterStr = `${formattedStartDate}-${formattedEndDate}`



        let updatedOpen = open;
        let updatedClosed = closed;
        let updatedCancelled = cancelled;
        console.log("ITEM +>", item)
        if (item == "Open") {
            updatedOpen = false
            setOpen(false)
        } if (item === "Closed") {
            updatedClosed = false
            setClosed(false)

        } if (item === "Cancelled") {
            updatedCancelled = false
            setCancelled(false)
        } if (finalDateFilterStr === item) {
            setstartDateOnSelect("")
            setEndDateOnSelect("")
        }

        setSelectedData([...updatedSelectedData])
        if (updatedSelectedData.length > 0) {

            filterListByDateRange(updatedOpen, updatedClosed, updatedCancelled, startDateOnSelect, endDateOnSelect)
        } else {

            setEquipmentServices(SupportHistoryDetails.equipmentService)
            setCustomerSupport(SupportHistoryDetails.customerSupport)


        }




    }

    const filterListRender = ({ item, index }: { item: string; index: number }) => {

        return <View style={styles.filterListWrapper} >

            <Text style={styles.filterText}  >{item}</Text>

            <Pressable style={styles.crossWrapper} onPress={() => onCrossClicked(item, index)} >

                <Cross />

            </Pressable>

        </View>

    }

    return (
        <SafeAreaView style={styles.SupportHistoryMainWrap}>
            <ScrollView contentContainerStyle={styles.supportHistoryContentHolder}>

                <View style={styles.supportHistoryContentWrap} testID="supportHistoryWrapper" >


                    <View style={styles.supportHistoryTxtWrapper}>

                        <Text style={styles.supportHistoryTxt}>{t("SupportHistory.supportHistory")}</Text>


                    </View>

                    <View style={styles.sectionWrapper}>
                        <TouchableOpacity testID='equipmentServiceToggle' style={toggleButton ? styles.equiServiceWrapper : styles.equiServiceWrapperToggle} onPress={() => toggleSection("equipService")}>
                            <Text style={toggleButton ? styles.equipServiceTxt : styles.equipServiceTxtToggle} >{t("SupportHistory.equipmentService")}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity testID='customerSupportToggle' style={toggleButton ? styles.customerSupportWrapper : styles.customerSupportWrapperToggle} onPress={() => toggleSection("customerSupport")}>
                            <Text style={toggleButton ? styles.customerText : styles.customerTextToggle}>{t("SupportHistory.customerSupport")}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchbar}>
                        <SearchBar
                            testID='supportHistorySearch'
                            placeholder="Search by Case Number"
                            searchedText={searchedText}
                            onChangeSearchedText={(text:string) => onChangeSearchedText(text)}
                            clearSearch={clearSearch}
                        />
                    </View>
                    {/* SupportHistoryFilter */}
                    <View style={styles.filterIconWrapper}>
                        <Pressable onPress={() => setIsSortModalOpen(true)} testID="supportHistoryFilterButton" >
                            {({ pressed }) => (
                                <FilterIcon />
                            )}
                        </Pressable>

                        <TouchableOpacity style={styles.createTicketOuter} testID='supportHistoryCreateTicket' >
                            <Text style={styles.ticketText} >{t("SupportHistory.createTicket")}</Text>

                        </TouchableOpacity>

                    </View>


                    <View style={styles.filterListMainWrapper} testID="supportHistorySelectedFilterData" >

                        <FlatList
                            data={selectedData}
                            keyExtractor={(item:any, index:any) => index}
                            renderItem={filterListRender}
                            horizontal
                        />
                    </View>


                    <View style={styles.historyWrapper}>

                        <FlatList
                            data={toggleButton ? equipmentServices : customerSupport}
                            renderItem={renderProductListItem}
                            keyExtractor={(item:any, index:any) => index}
                        />

                    </View>
                    {
                        productListIndex > 1 ?

                            <TouchableOpacity
                                testID='showLessButtonSupportHistory'
                                style={styles.showLessWrapper}
                                onPress={() => productQuantity("ShowLess")}
                            >
                                <Text style={styles.lessMoreTxt} >
                                    {t("SupportHistory.showLess")}
                                </Text>
                            </TouchableOpacity> :


                            <TouchableOpacity
                                testID='showMoreButtonSupportHistory'
                                style={styles.showLessWrapper}
                                onPress={() => productQuantity("ViewMore")}
                            >
                                <Text style={styles.lessMoreTxt}>
                                    {t("SupportHistory.showMore")}
                                </Text>
                            </TouchableOpacity>
                    }
                </View>


                {/* {<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Product Details modal>>>>>>>>>>>>>>>>>>>} */}

                <Modal
                    visible={openEquipmentInfoModal}
                    onRequestClose={() => setOpenEquipmentInfoModal(false)}
                    animationType="slide"

                >
                    <View style={styles.equipModalMainWrapper}>
                        <ScrollView style={styles.equipContentWrapper} >
                            <View style={styles.equipNoWrapper}>
                                <View style={styles.equipDetails}>
                                    <Text style={styles.caseNoDetails}>{euipmentDetails.case_no}</Text>
                                    <View style={styles.statusWrapper}>
                                        <Text style={styles.statusTxt}>{euipmentDetails.status}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.closeIcon} onPress={() => setOpenEquipmentInfoModal(false)}>
                                    <BlackCross />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.createDate")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.created_on}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.equipment")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.equipmen_type}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.problemType")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.problem_type + "-" + euipmentDetails.problem_desc}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.availability")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.availability}</Text>
                                </View>
                            </View>


                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.equipAvailability.messageText")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.message}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.contactName")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.contactName}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.email")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.email}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.phone")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.phoneNo}</Text>
                                </View>

                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.zipCode")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.zipCode}</Text>
                                </View>

                            </View>
                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.account")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.accNo}</Text>
                                </View>

                            </View>

                            <View style={styles.lastModifiedWrapper}>
                                <Text style={styles.lastModifiedTxt}>{euipmentDetails.last_modified}</Text>

                            </View>
                            <View style={styles.cancelTicketMainWrapper}>
                                <TouchableOpacity style={styles.cancelTicketWrapper}
                                    testID='EquipmentServTicketCancelButton'
                                    onPress={() => setCancelTicketModal(true)}
                                >
                                    <Text style={styles.cancelTicketTxt}>{t("SupportHistory.cancelTicket")} </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.rescheduleWrapper}
                                    testID='EquipmentServTicketRescheduleButton'
                                    onPress={() => setOpenRescheduleModal(true)}
                                >
                                    <Text style={styles.rescheduleTxt}>{t("SupportHistory.reschedule")}</Text>
                                </TouchableOpacity>
                            </View>




                        </ScrollView>

                    </View>

                </Modal>



                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<reschedule modal >>>>>>>>>>>>>>>>>>>>>>>> */}

                <Modal
                    visible={openRescheduleModal}
                    onRequestClose={() => setOpenRescheduleModal(false)}
                    animationType="slide"

                >
                    <View style={styles.equipModalMainWrapper}>
                        <ScrollView style={styles.equipContentWrapper} >
                            <View style={styles.equipNoWrapper}>
                                <View style={styles.equipDetails}>
                                    <Text style={styles.caseNoDetails}>Reschedule {euipmentDetails.case_no}</Text>
                                    <View style={styles.statusWrapper}>
                                        <Text style={styles.statusTxt}>{euipmentDetails.status}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.closeIcon} onPress={() => setOpenRescheduleModal(false)} testID='rescheduleModalCloseButton' >
                                    <BlackCross />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.availabilityWrapper} >
                                <Text style={styles.label}>{t("SupportHistory.equipAvailability.selectAvailability")}*</Text>
                                <View style={styles.multibuttons}>

                                    <TouchableOpacity
                                        style={[styles.mButton, { borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }, { backgroundColor: availability === 1 ? "#000" : "#fff", }]}
                                        onPress={() => setAvailability(1)}
                                    >
                                        <Text style={{ color: availability === 1 ? "#ffff" : "#000" }}>{t("SupportHistory.equipAvailability.monFriText")}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.mButton, { backgroundColor: availability === 2 ? "#000" : "#fff" }]}
                                        onPress={() => setAvailability(2)}
                                    >
                                        <Text style={{ color: availability === 2 ? "#ffff" : "#000" }}>{t("SupportHistory.equipAvailability.allDays")}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.mButton, { borderTopRightRadius: 10, borderBottomRightRadius: 10 }, { backgroundColor: availability === 3 ? "#000" : "#fff" }]}
                                        onPress={() => setAvailability(3)}
                                    >
                                        <Text style={{ color: availability === 3 ? "#ffff" : "#000" }}>{t("SupportHistory.equipAvailability.pickDays")}</Text>
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
                                            label={"SupportHistory.equipAvailability.selectDays"}
                                            placeholder={"SupportHistory.equipAvailability.selectDays"}
                                              important={false}
                                              save='value'
                                              search={false}
                                              defaultOption={""}
                                         
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
                                    <Text style={styles.checkBoxText}>{t("SupportHistory.equipAvailability.anyHourText")}</Text>
                                </View>



                                <Text style={styles.label}>{t("SupportHistory.equipAvailability.selectTimeText")}*</Text>
                                <View style={styles.dropDownContainer}>
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
                                            // dropdownStyles={styles.dropdownStyles}
                                            // dropdownItemStyles={styles.dselectboxsaluation}
                                            // dropdownTextStyles={styles.optionText2}
                                            inputStyles={{ color: "black", fontSize: 12 }}
                                            arrowicon={<View style={{ paddingTop: 2, marginLeft: 2 }}><Clock width={"14"} height={"14"} /></View>}
                                        />
                                        {disabled && <View style={styles.disabledOverlay} />}
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
                                            // dropdownStyles={styles.dropdownStyles}
                                            // dropdownItemStyles={[styles.dselectboxsaluation, { justifyContent: "center" }]}
                                            // dropdownTextStyles={styles.optionText2}
                                            inputStyles={{ color: "black", fontSize: 12 }}
                                            arrowicon={<View style={{ paddingTop: 2 }}><Clock width={"14"} height={"14"} /></View>}
                                        />
                                        {disabled && <View style={styles.disabledOverlay} ><Text>-- --</Text></View>}
                                    </View>
                                </View>

                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.createDate")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.created_on}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.equipment")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.equipmen_type}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.problemType")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.problem_type + "-" + euipmentDetails.problem_desc}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.availability")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.availability}</Text>
                                </View>
                            </View>


                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.equipAvailability.messageText")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.message}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.contactName")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.contactName}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.email")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.email}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.phone")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.phoneNo}</Text>
                                </View>

                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.zipCode")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.zipCode}</Text>
                                </View>

                            </View>
                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.account")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.accNo}</Text>
                                </View>

                            </View>

                            <View style={styles.lastModifiedWrapper}>
                                <Text style={styles.lastModifiedTxt}>{euipmentDetails.last_modified}</Text>

                            </View>
                            <View style={styles.cancelTicketMainWrapper}>
                                <TouchableOpacity style={styles.cancelTicketWrapper}
                                // onPress={() => setCancelTicketModal(true)}
                                >
                                    <Text style={styles.cancelTicketTxt}>Back</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.rescheduleWrapper}
                                // onPress={() => setOpenRescheduleModal(true)}
                                >
                                    <Text style={styles.rescheduleTxt}>Confirm</Text>
                                </TouchableOpacity>
                            </View>




                        </ScrollView>

                    </View>

                </Modal>



                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<CustomerSupport Modal>>>>>>>>>>>>>>>>>>>> */}

                <Modal
                    visible={openCustomerSuppInfoModal}
                    onRequestClose={() => setOpenCustomerSuppInfoModal(false)}
                    animationType="slide"

                >
                    <View style={styles.equipModalMainWrapper}>
                        <ScrollView style={styles.equipContentWrapper}>
                            <View style={styles.equipNoWrapper}>
                                <View style={styles.equipDetails}>
                                    <Text style={styles.caseNoDetails}>{euipmentDetails.case_no}</Text>
                                    <View style={styles.statusWrapper}>
                                        <Text style={styles.statusTxt}>{euipmentDetails.status}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.closeIcon} onPress={() => setOpenCustomerSuppInfoModal(false)}>
                                    <BlackCross />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.createDate")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.created_on}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.problemType")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <FlatList
                                        data={euipmentDetails.problem_type}
                                        renderItem={renderCustomerSupportProblemType}
                                        keyExtractor={(item:any, index:any) => index}
                                    />
                                    {/* <Text style={styles.historyKey}>{euipmentDetails.problem_type + "-" + euipmentDetails.problem_desc}</Text> */}
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.equipAvailability.messageText")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.message}</Text>
                                </View>
                            </View>
                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.contactName")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.contactName}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.email")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.email}</Text>
                                </View>
                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.phone")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.phoneNo}</Text>
                                </View>

                            </View>

                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.zipCode")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.zipCode}</Text>
                                </View>

                            </View>
                            <View style={styles.historyKeyValueWrapper}>
                                <View style={styles.keyWrapper} >
                                    <Text>{t("SupportHistory.account")} :</Text>
                                </View>
                                <View style={styles.valueWrapper}>
                                    <Text style={styles.historyKey}>{euipmentDetails.accNo}</Text>
                                </View>

                            </View>


                            <View style={styles.lastModifiedWrapper}>
                                <Text style={styles.lastModifiedTxt}>{euipmentDetails.last_modified}</Text>

                            </View>
                            <View style={styles.cancelTicketMainWrapper}>
                                <TouchableOpacity style={styles.cancelTicketWrapper}
                                    onPress={() => setCancelTicketModal(true)}
                                >
                                    <Text style={styles.cancelTicketTxt}>{t("SupportHistory.cancelTicket")} </Text>
                                </TouchableOpacity>
                            </View>



                        </ScrollView>

                    </View>

                </Modal>


                {/* {<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Cancel Ticket Modal}>>>>>>>>>>>>>>>>>>>>> */}

                <View style={styles.container}>

                    <Modal
                        visible={cancelTicketModal}
                        onRequestClose={() => setCancelTicketModal(false)}
                        animationType={"slide"}
                        transparent={true}

                    >
                        <View style={styles.cancelModalMainWrapper}>
                            <View style={styles.modalContent}>
                                <View style={styles.cancelTicketHeader}>
                                    <Text style={styles.cancelTicketTitle}>{t("SupportHistory.cancelTicket")}</Text>
                                    <TouchableOpacity style={styles.closeIcon} onPress={() => setCancelTicketModal(false)} testID='cancelTicketMOdalClose' >
                                        <BlackCross />
                                    </TouchableOpacity>

                                </View>
                                <Text style={styles.reasonTxt}>{t("SupportHistory.cancellationReason")}</Text>
                                <SelectList
                                    setSelected={(val:any) => setSelected(val)}
                                    data={SupportHistoryDetails.cancelTicketResons}
                                    search={false}
                                    save="value"
                                    // testID='cancelTicketModalOpenList'
                                />

                                <View style={[styles.buttonWrapper]}>
                                    <TouchableOpacity
                                        testID='cancelTicketModalCancelButton'
                                        style={styles.cancelModalBtn}
                                        onPress={() => setCancelTicketModal(false)}
                                    >
                                        <Text style={styles.cancelTicketTxt}>{t("SupportHistory.cancel")} </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.confirmBtn} testID='cancelTicketModalConfirmButton' >
                                        <Text style={styles.rescheduleTxt}>{t("SupportHistory.confirm")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </Modal>
                </View>


                {/* {<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Filter Modal>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>} */}
                <Modal
                    visible={isSortModalOpen}
                    onRequestClose={() => setIsSortModalOpen(false)}
                    animationType="slide"
                >
                    <View style={styles.bodyFlexStyle}>
                        <ScrollView>
                            {/* Main Header */}
                            <View style={styles.filterHeader}>
                                <View style={styles.filterInner}>
                                    <View style={styles.filterHeaderData}>
                                        <Pressable onPress={() => setIsSortModalOpen(false)} testID="SupportHistoryFilterCloseButton" >
                                            {({ pressed }) => (
                                                <View style={styles.gapStyle}>
                                                    <BlackCross />
                                                </View>
                                            )}
                                        </Pressable>
                                        <View style={styles.gapStyle}>
                                            <Text style={styles.filterTextStyle}>Filter</Text>
                                        </View>
                                    </View>
                                    <TouchableHighlight
                                        testID='supportHistoryFilterButton'
                                        // color={"#FFFFFF"}
                                        underlayColor={'#F40000'}
                                        style={styles.roundButton}
                                        onPress={onApplySort}
                                    >

                                        <Text style={styles.whiteText}>Apply</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View style={styles.filerMain} >
                                <TouchableOpacity
                                    onPress={toggleCaseStatusAccordion}
                                    style={styles.caseStatusCotainer}
                                >
                                    <Text style={[styles.filterHeading, { color: '#F40000' }]} >Case Status</Text>
                                    {isCaseStatusOpen ? <UpArrow /> : <DownArrow />}
                                </TouchableOpacity>

                                {isCaseStatusOpen && (
                                    <View
                                        style={styles.caseStatusWrapper}
                                    >

                                        <View style={styles.checkBoxWrapper} >
                                            <CheckBox
                                                value={open}
                                                onValueChange={() => toSortByStatus("fromOpen")}
                                                style={{ alignSelf: 'center' }}
                                            />
                                            <Text style={{ color: '#000' }} >Open</Text>
                                        </View>

                                        <View style={styles.checkBoxWrapper} >
                                            <CheckBox
                                                value={closed}
                                                onValueChange={() => toSortByStatus("fromClosed")}
                                                style={{ alignSelf: 'center' }}
                                            />
                                            <Text style={{ color: '#000' }} >Closed</Text>
                                        </View>

                                        <View style={styles.checkBoxWrapper} >
                                            <CheckBox
                                                value={cancelled}
                                                onValueChange={() => toSortByStatus("fromCancel")}
                                                style={{ alignSelf: 'center' }}
                                            />
                                            <Text style={{ color: '#000' }} >Cancelled</Text>
                                        </View>
                                    </View>
                                )}

                                <TouchableOpacity
                                    onPress={toggleDateRangeAccordion}
                                    style={styles.dateRangeContainer}
                                >
                                    <Text style={[styles.filterHeading, { color: '#000000' }]} >Date Range</Text>
                                    {isDateRangeOpen ? <UpArrow /> : <DownArrow />}
                                </TouchableOpacity>

                                {isDateRangeOpen && (
                                    <View style={styles.dateMain} >
                                        <View style={{ width: '50%' }} >
                                            <Text style={styles.dateTopText} >Start Date</Text>
                                            <TouchableOpacity onPress={handleStartDateSelectorClick} >
                                                <View style={styles.dateContainer}>
                                                    <Text style={styles.dateText}>{startDate && startDate.toLocaleDateString()}</Text>
                                                    <View style={styles.calendarIcon} >
                                                        <CalendarIcon />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            {showStartDatePicker && (
                                                <DateTimePicker
                                                    value={startDate}
                                                    mode="date"
                                                    display="default"
                                                    onChange={handleStartDateChange}
                                                />
                                            )}
                                        </View>
                                        <View style={{ width: '50%' }} >
                                            <Text style={styles.dateTopText} >End Date</Text>
                                            <TouchableOpacity onPress={handleEndDateSelectorClick} >
                                                <View style={styles.dateContainer}>
                                                    <Text style={styles.dateText}>{endDate && endDate.toLocaleDateString()}</Text>
                                                    <View style={styles.calendarIcon} >
                                                        <CalendarIcon />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            {showEndDatePicker && (
                                                <DateTimePicker
                                                    value={endDate}
                                                    mode="date"
                                                    display="default"
                                                    minimumDate={startDate}
                                                    onChange={handleEndDateChange}
                                                />
                                            )}
                                        </View>
                                    </View>
                                )}
                                <TouchableHighlight
                                    testID='supportHistoryFilterResetButton'
                                    onPress={() => handleReset()}
                                    style={styles.resetButton}>
                                    <Text style={styles.blackText}>Reset</Text>
                                </TouchableHighlight>
                            </View>

                        </ScrollView>
                    </View>

                </Modal>



                <View style={styles.footerWidthStyle}>
                    <FooterComponent />
                </View>
            </ScrollView>
            {loader &&  <Loader message="Please wait..." />}
        </SafeAreaView >

    )

}
export default SupportHistory