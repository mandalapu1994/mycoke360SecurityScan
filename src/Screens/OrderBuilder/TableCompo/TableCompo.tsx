
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, Pressable, TouchableOpacity, Modal, DeviceEventEmitter, TouchableHighlight, ScrollView } from 'react-native';

import styles from './styles';
import { useState } from 'react';
// import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
// import { ScrollView } from 'react-native-gesture-handler';
import DownBlackArrow from '../../../assets/images/DownBlackArrow'
import ForwardScrollArrow from '../../../assets/images/ForwardScrollArrow'
import BackwardScrollArrow from '../../../assets/images/BackwardScrollArrow'
import CopyIcon from "../../../assets/images/CopyIcon"
import DateTimePicker from '@react-native-community/datetimepicker';
import InformationIcon from "../../../assets/images/InformationIcon"
import { getFormatDate } from '../../../utils/DateTimeFormator';

import { useTranslation } from "react-i18next";
import { orderBuilderProductData } from '../../../utils/DumProductListData';

const sortData = [
    { id: 1003, Sorttype: "name", title: "Name" },
    { id: 1004, Sorttype: 'sku', title: 'SKU' },
    { id: 1005, Sorttype: 'upc', title: 'UPC' },
]
const TableCompo :React.FC<{}>= () => {

    const { t } = useTranslation();
    const [orderBuilderProducts, setOrderBuilderProducts] = useState(orderBuilderProductData)
    const [showDatePick, setShowDatePick] = useState(false);
    const [datePick, setDatePick] = useState(new Date());
    const [modalVisible, setmodalVisible] = useState(false);
    const [selected, setSelected] = useState("");
    const [conformSelect, setConformSelect] = useState("");



    useEffect(() => {
        FilterProductOnDate()


    }, [datePick, conformSelect,])

    useEffect(() => {
        // clreard reset date and sort

        DeviceEventEmitter.addListener('cleared', async e => {
            if (e) {
                setDatePick(new Date());
                setConformSelect("")
                console.log(e)
            }

            // do something
        });
    }, [])



    /**
     * The SORT function takes in data and a sorting parameter, sorts the data based on the parameter,
     * and sets the sorted data as the order builder products.
     * @param Data -Filters applyed data an array of objects containing product information such as product title, SKU, and
     * UPC.
     * @param conformSelect - The `conformSelect` parameter is a string that determines the type of
     * sorting to be applied to the `Data` array. It can have one of the following values: "name",
     * "sku", or "upc". Depending on the value of `conformSelect`, the `sortData
     */
    const SORT = (Data:any, conformSelect:any) => {
        const sortData = (filteredData:any, sortType:any) => {
            switch (sortType) {
                case 'name':
                    return filteredData.sort((a:any, b:any) => a.productTitle.localeCompare(b.productTitle));
                case 'sku':
                    return filteredData.sort((a:any, b:any) => parseInt(a.sku) - parseInt(b.sku));
                case 'upc':
                    return filteredData.sort((a:any, b:any) => parseInt(a.upc) - parseInt(b.upc));
                default:
                    return filteredData;
            }
        };
        const sortedData = sortData(Data, conformSelect);
        setOrderBuilderProducts(sortedData)
    }




    /**
     * The function filters product data based on a selected date and sorts it if a sorting option is
     * also selected.
     */
    const FilterProductOnDate = () => {
        const targetDate = datePick.toISOString()
        const filteredData = orderBuilderProductData.filter((item:any) => item.createdDate.substring(0, 10) === targetDate.substring(0, 10));
        setOrderBuilderProducts(filteredData)
        if (conformSelect != "" && filteredData.length > 0) {
            SORT(filteredData, conformSelect)
        }
    }



    /**
     * This function sets the selected date and updates the state based on the event type.
     * @param event - An object that represents the event that triggered the function. It could have a type
     * property with a value of "set" or "dismissed".
     * @param Date - The `Date` parameter is a variable that holds the selected date from a date picker.
     */


    const geDate = (event:any, Date:any) => {
        const selectedDate = Date
        if (event.type === "set") {
            setShowDatePick(false)
            setDatePick(selectedDate)
        }
        if (event.type === "dismissed") {
            setShowDatePick(false)
            // setDatePick(null)
        }
    }


    /**
     * The function adds one day to a selected date if it is in the past.
     */
    const addOneDay = () => {
        const currentDate = new Date();
        if (datePick) {
            const currentDateString = currentDate.toISOString().split('T')[0];
            const DatePick = new Date(datePick)
            const selected = DatePick.toISOString().split('T')[0];
            if (currentDateString > selected) {
                DatePick.setDate(DatePick.getDate() + 1);
                const newDate = DatePick
                setDatePick(newDate);
            }
        }
    };

    /**
     * This function subtracts one day from a given date.
     */
    const subtractOneDay = () => {
        const currentDate = new Date();

        if (datePick) {
            const DatePick = new Date(datePick)
            DatePick.setDate(DatePick.getDate() - 1);
            const newDate = DatePick
            setDatePick(newDate);
        }
    };


    //  SHOW THE TIME PICKER MODEL FOR TIME FROM 
    const openDatePicker = (EVENT:any) => {
        const date = new Date()
        setDatePick(datePick)
        setShowDatePick(true)

    }

    /**
     * This function updates the quantity of a product in an order builder.
     * @param id - The id parameter is a unique identifier for a product in the orderBuilderProducts
     * array. It is used to identify which product's quantity needs to be updated.
     * @param quantity - The quantity parameter is the new quantity value that is being passed in for a
     * specific product with the given id. This function is used to update the quantity of a product in
     * the orderBuilderProducts array.
     */
    const handleQuantityChange = (id:any, quantity:any) => {
        const CloneData = [...orderBuilderProducts]
        const updatedProducts = CloneData.map(product => {
            if (product.id === id) {
                return { ...product, quantity };
            }
            return product;
        });
        setOrderBuilderProducts(updatedProducts);
    };

    const applySort = () => {
        setConformSelect(selected);
        setmodalVisible(false)
    };



    // Header Component
    const CustomHeader = ({ name, index }:{ name:any, index:any }) => {
        return (
            <View
                style={[styles.CustomHeaderBox, { borderLeftWidth: index === 2 ? 0 : 0.8, borderRightWidth: index === 2 ? 0 : 0.8 }]}
            >
                <Text style={{ color: "#000" }}>{name}</Text>
            </View>

        )
    }


    // product card  Component For Table col
    const CustomDataBox = ({ item, index, Datalength }: {item:any, index:any, Datalength:any }) => {
        const quantity = item.quantity
        const image = item.image
        const productTitle = item.productTitle
        const sku = item.sku
        const upc = item.upc
        const stock = 30
        return (<>

            <View style={styles.container2}>
                
                <View style={[styles.boxContainer, { borderBottomWidth: Datalength - 1 === index ? 0.3 : 0 }]}>
                    <View>
                        <Image style={styles.image} source={image} />
                    </View>
                    <Text style={styles.smallTextPara}>{productTitle}</Text>
                    <View style={[styles.productNumber]}>
                        <Text style={styles.productPara}>SKU: <Text style={styles.boldText}>{sku}</Text></Text>
                        <Text style={styles.productPara}>UPC: <Text style={styles.boldText}>{upc}</Text></Text>

                    </View>

                </View>
                <View style={[styles.boxContainer, { borderBottomWidth: Datalength - 1 === index ? 0.3 : 0 }]}>
                    <Text style={styles.recentDeliText}>{item.recentOrders}</Text>
                </View>
                <View style={[styles.boxContainer, { borderBottomWidth: Datalength - 1 === index ? 0.3 : 0 }]}>
                    <View style={styles.counterBox}>

                        <Pressable
                            testID='orderBuilderItemQuantityDecrease'
                            onPress={() => handleQuantityChange(item.id, quantity > 0 ? quantity - 1 : 0)}

                            style={[styles.incrementDecrementButtons, styles.decrementButton]}>
                            {({ pressed }) => (
                                <Text style={styles.incrementDecrementButtonText}>-</Text>
                            )}
                        </Pressable>
                        <View style={styles.incrementDecrementtextOuter}>
                            <Text style={styles.incrementDecrementtext}>{quantity}</Text>
                        </View>
                        <Pressable
                            testID='orderBuilderItemQuantityIncrease'
                            onPress={() => handleQuantityChange(item.id, quantity + 1)}

                            style={[styles.incrementDecrementButtons, styles.incrementButton]}>
                            {({ pressed }) => (
                                <Text style={styles.incrementDecrementButtonText}>+</Text>
                            )}
                        </Pressable>

                    </View>
                    <Text style={styles.shoppinglistPara}><Text style={{ fontWeight: "600" }}>{stock} {t('TABLECOMPO.shoppinglistPara1')}</Text> {t('TABLECOMPO.shoppinglistPara2')}</Text>
                </View>
            </View>
        </>
        )
    }


    // sort and date filters row component

    const CustomRow = (index:any) => {
        return (
            <View style={styles.commanFlexContainer}>
                {/* CustomRow colomn 1st */}
                <View style={[styles.CustomRowCol1, { borderBottomWidth: orderBuilderProducts.length === 0 ? 0.8 : 0 }]}>
                    <TouchableOpacity
                        onPress={() => setmodalVisible(true)}
                        style={styles.commanFlexContainer}>
                        <Text style={styles.sortText}>Sort By {conformSelect}</Text>
                        <View style={styles.downBlackArrow}>
                            <DownBlackArrow />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* CustomRow colomn 2nd */}
                <View style={[styles.CustomRowCol2, { borderBottomWidth: orderBuilderProducts.length === 0 ? 0.8 : 0 }]}>
                    <View style={styles.dateContainer}>

                        <TouchableOpacity onPress={subtractOneDay}>
                            <BackwardScrollArrow />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openDatePicker}>
                            <Text style={styles.dateText}>{datePick ? getFormatDate(new Date(datePick).toISOString()) : "  "}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={addOneDay}>
                            <ForwardScrollArrow />
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}><CopyIcon /><Text style={{ color: "#F40000", fontSize: 12, fontWeight: "500", marginLeft: 5 }}>Copy</Text></TouchableOpacity>
                </View>

                {/* CustomRow colomn 3nd */}
                <View style={[styles.CustomRowCol3, { borderBottomWidth: orderBuilderProducts.length === 0 ? 0.8 : 0 }]}>
                    <View style={{ flex: 1, flexDirection: "row", }}>

                        <View style={{ paddingTop: 2, paddingRight: 2 }}>
                            <InformationIcon width={9} height={9} />
                        </View>
                        <Text style={styles.infoText}>{t('TABLECOMPO.infoText')}</Text>
                    </View>


                </View>

            </View>

        )
    }
    const Separator = () => <View style={styles.seperotor} />;





    return (
        <>

            <View style={{ flex: 1, backgroundColor: "#FFFFFF" }} testID='tableWrapper' >
                <ScrollView showsHorizontalScrollIndicator={false} >
                    <View style={{ flex: 1, paddingBottom: 1 }}>
                        <View style={styles.headerRow}>
                            <CustomHeader name={'Products'} index={1} />
                            <CustomHeader name={'Recent Deliveries'} index={2} />
                            <CustomHeader name={'Order Quantity'} index={3} />

                        </View>
                        <CustomRow />
                        {orderBuilderProducts?.length > 0 && orderBuilderProducts.map((item:any, i:any) => (
                            <View key={i}>
                                <CustomDataBox item={item} index={i} Datalength={orderBuilderProducts.length} />
                            </View>

                        ))}

                    </View>
                    {/* Date Picker */}
                    {showDatePick &&
                        <DateTimePicker
                            testID='orderBuilderTableDatePicker'
                            value={datePick ? new Date(datePick) : new Date()}
                            mode={"date"}
                            // is12Hour={true}
                            // format="YYYY-MM-DDTHH:mm:ss.sssZ"
                            display="default"
                            onChange={geDate}
                            maximumDate={new Date()}
                        />}

                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        onRequestClose={() => setmodalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalbox}>

                                {
                                    sortData.map((item, i) => {
                                        return <TouchableOpacity
                                            testID='OrderBuilderSortText'
                                            key={i}
                                            onPress={() => setSelected(item.Sorttype)}
                                        >
                                            <View style={styles.sortInnerDiv}>
                                                <Text style={[styles.sortTextPara, { fontWeight: selected === item.Sorttype ? "700" : "500" }]}>{item.title}</Text>
                                            </View>
                                            <Separator />
                                        </TouchableOpacity>

                                    })
                                }
                                <View style={styles.buttonGroup}>
                                    <TouchableHighlight
                                        testID='orderBuilderSortCancel'
                                        onPress={() => setmodalVisible(false)}
                                        // color={"#FFFFFF"}
                                        underlayColor={'#F40000'}
                                        style={[styles.roundButton, { backgroundColor: "red" }]}>

                                        <Text style={styles.buttonText}>{t('TABLECOMPO.cancel')}</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        testID='orderBuilderSortApply'
                                        onPress={applySort}
                                        // color={"#FFFFFF"}
                                        underlayColor={'#F40000'}
                                        style={[styles.roundButton, { backgroundColor: "#000" }]}>

                                        <Text style={styles.buttonText}>{t('TABLECOMPO.apply')}</Text>
                                    </TouchableHighlight>

                                </View>


                            </View>

                        </View>
                    </Modal>

                </ScrollView>


            </View>
        </>
    );
};



export default TableCompo;