import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import BackArrow from "../../assets/images/BackArrow";
import { useTranslation } from 'react-i18next';
import { addFilters, clearAllFilter } from '../../redux/Reducer/filtersReducer';

const FilterComponent: React.FC<{ setModalVisible: any }> = ({ setModalVisible }) => {
    const filterList = useSelector((state: any) => state.filters.filters);
    const availableFilters = useSelector((state: any) => state.filters.createAllFilters); 
    // console.log("availableFilters=", availableFilters)
    const [data, setData] = useState(availableFilters);
    const [filters, setFilters] = useState([])
    const [selected, setSelected] = useState("Brand")
    const dispatch = useDispatch();
    const filterAttributes = [
        { name: 'Brand', query: 'BrandLookUpName__c' },
        { name: 'Flavor', query: 'Flavor_Cona__c' },
        { name: 'Package Type', query: 'PackType__c' },
        { name: 'Unit Size', query: 'Unit_Size__c' }
    ];
    const Separator = () => <View style={styles.separator} />;


    const closeModal = () => {
        // console.log("trigger");
        setModalVisible(false)
    }

    useEffect(() => {
        isCheckFillter()
        
    }, [])

    

    const { t } = useTranslation();


    /**
     * The function AddFilter sets the filters based on the selected products in the updatedData.
     * @param updatedData - user select checkbox this data is updated data only filter the product/category
     */
    const AddFilter = (updatedData: any) => {

        if (updatedData?.length > 0) {
            const filteres = updatedData.flatMap((category: any) =>
                category.filters.filter((product: any) => product.select)
            );
            setFilters(filteres);


        }
    }

    /**
        * The function updates the main array based on the products array and a filter list.
        */
    const isCheckFillter = () => {
        // Update mainArray based on productsArray
        if (filterList?.length != 0) {
            const updatedMainArray = data.map((brand: any) => {
                const updatedProducts = brand.filters.map((filter: any) => {

                    const matchedProduct = filterList.find((pro: any) => pro.id === filter.id);
                    if (matchedProduct) {
                        return { ...filter, select: matchedProduct.select };
                    }
                    return { ...filter, select: false };
                });
                return { ...brand, filters: updatedProducts };
            });


            // console.log("updatedMainArray=", updatedMainArray)
            setData(updatedMainArray)
            setFilters(filterList)
        }

    }



    /**
     * The function handles the selection of a checkbox and updates the data accordingly while also
     * calling another function to add filters.
     * @param value - The value of the checkbox that was clicked, which will be either true or false
     * depending on whether the checkbox is checked or unchecked.
     * @param mainIndex - The index of the main item in the data array that contains the sub-items.
     * @param subIndex - subIndex is the index of the child element in the products array of the main
     * element at the mainIndex in the data array.
     */
    const handleCheckBox = (value: any, mainIndex: any, subIndex: any) => {
        // console.log(value, "value")
        const CloneData = [...data];
        const updatedData = CloneData.map((item, index) => {
            if (item && index === mainIndex) {
                const updatedChildren = item.filters.map((child: any, subIn: any) => {
                    if (subIn === subIndex) {
                        return { ...child, select: value };
                    }
                    return child;
                });
                return { ...item, filters: updatedChildren };
            }
            return item;
        });

        setData(updatedData)
        // console.log("handleCheckBox=", updatedData)
        AddFilter(updatedData)
    }

    const applyFiltter = () => {

        dispatch(addFilters(filters))
        closeModal()

        // navigation.navigate('ProductsList')
    }

    const clearFilter = () => {
        dispatch(clearAllFilter());
        clearCheckboxData();
    };

    
/**
 * The function `clearCheckboxData` clears the checkbox data by setting the `select` property of each
 * item in the `data` array to `false` and resetting the `filters` array.
 */
    const clearCheckboxData = () => {
        const CloneData = [...data];
        const updatedData = CloneData.map((item, index) => {
                const updatedChildren = item.filters.map((child: any, subIn: any) => {
                        return { ...child, select: false };
                });
                return { ...item, filters: updatedChildren };
        });
        setData(updatedData)
        setFilters([]);
    }



    return (
    <SafeAreaView>
        <View style={{ height: "100%" }}>
            <View style={styles.header}>
                <View style={[styles.headingBox,]}>
                    <TouchableOpacity
                        onPress={closeModal}
                        style={{ marginHorizontal: 8 }}
                    >

                        <BackArrow />
                    </TouchableOpacity>
                    <Text style={styles.headingTxt}>Filter</Text>

                </View>
                <TouchableOpacity
                    onPress={clearFilter}
                    style={{ marginHorizontal: 8 }}
                >
                    <Text>CLEAR ALL</Text>
                </TouchableOpacity>

            </View>
            <Separator />

            <View style={styles.container}>

                <View style={{ flex: 0, flexDirection: "row" }}>

                    <View style={[styles.leftBox]} >
                        {
                            filterAttributes.map((item, i) => {
                                const checkSelected = selected === item.name
                                return (
                                    <View key={i + 1}>
                                        <TouchableOpacity
                                            onPress={() => setSelected(item.name)}
                                            style={{ paddingVertical: 10, paddingLeft: 10, backgroundColor: checkSelected ? "#fff" : "#EAEAEA" }}>
                                            <Text style={{ fontWeight: checkSelected ? "800" : "500" }}>{item.name}</Text>

                                        </TouchableOpacity>
                                        <Separator />
                                    </View>

                                )
                            })
                        }
                    </View>
                    <ScrollView style={[styles.rightBox]} >
                        {
                            data && data.length > 0 && data.map((Item: any, index: any) => {
                             
                                return (
                                    <View key={index}>
                                        {
                                            Item?.filters?.length > 0 && Item.filters.map((element: any, i: any) => {
                                                if (selected === Item.title) {
                                                    return (
                                                        <View key={i} style={{ alignItems: "center", flexDirection: "row", marginLeft: 10 }}>
                                                            <Text>
                                                                <CheckBox
                                                                    testID='filterAccordianCheckBox'
                                                                    style={Platform.OS === "ios" ? styles.customCheckbox : {}}
                                                                    disabled={false}
                                                                    boxType={'square'}
                                                                    value={element.select}
                                                                    onValueChange={(newValue) => handleCheckBox(newValue, index, i)}
                                                                />
                                                            </Text>
                                                            <Text style={styles.brandName}>{element?.filter} ({element?.productCount})</Text>
                                                        </View>
                                                    );
                                                }
                                            })
                                        }
                                    </View>)
                            })
                        }

                    </ScrollView>
                </View>

                <View style={styles.footer} >
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeModal}
                    >
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={applyFiltter}
                    >
                        <Text style={styles.applyText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
    )
}

export default FilterComponent



const styles: any = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',

        // backgroundColor: "green"
    },
    header: {
        flex: 0,
        flexDirection: 'row',
        // backgroundColor: "red",
        justifyContent: "space-between",
        paddingVertical: 8

    },
    headingTxt: {
        fontWeight: '800',
        fontSize: 17,
        marginLeft: 8

    }
    ,
    box: {
        width: "100%",
        // height: 500
    },
    headingBox: {
        flex: 0,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    leftBox: {
        backgroundColor: '#EAEAEA',
        width: "35%",
        height: "90%",
        borderBottomColor: "gray",
        // borderWidth: 1,
        borderBottomWidth: 1
        // Customize the color if needed
    },
    rightBox: {
        // backgroundColor: 'green',
        width: "65%",// Customize the color if needed
        height: '90%',
        paddingTop: 10,
        borderBottomColor: "gray",
        // borderWidth: 1,
        borderBottomWidth: 1
    },
    footer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 99,
        flex: 1,
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingBottom: 10
        // Customize the color if needed
    },
    closeButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: "gray"
    },
    closeText: {
        color: "#000",

    },
    applyButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: "#000",
        borderRadius: 5,
        marginHorizontal: 10

    },
    applyText: {
        color: "#fff",

    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDDBDA'
    },
    customCheckbox:{
        margin:10,
        marginTop: 15,
        height: 16,
        width: 16
    }
}); 