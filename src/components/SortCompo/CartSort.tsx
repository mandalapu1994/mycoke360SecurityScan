import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ScrollView,
    Image,
    Button,
    Pressable,
    ImageBackground,
    TouchableWithoutFeedback
} from 'react-native';
import styles from "./styles";
import MenuIcon from "../../assets/images/MenuIcon";
import SearchIcon from "../../assets/images/SearchIcon";
import AddToCart from "../../assets/images/AddToCart";
import BlackCross from "../../assets/images/BlackCross";
import { useDispatch } from 'react-redux';
import { addSort } from '../../redux/Reducer/filtersReducer';
import { useTranslation } from "react-i18next";
import { ADDSORT } from '../../redux/Reducer/cartReducer';

interface SortType {
    id: number;
    Sorttype: string;
    name: string;
}

interface SortCompoProps {
    navigation: any; // You can replace 'any' with the appropriate type for navigation.
    cartSortModalToggle:any
}

const CartSort: React.FC<SortCompoProps> = ({ navigation, cartSortModalToggle }) => {

    const dispatch = useDispatch();
    const Separator = () => <View style={styles.separator} />;
    const { t } = useTranslation();
    const [selected, setSelected] = React.useState("");
    const [searchedText, setSearchedText] = React.useState('');

    const sortData = [
        { id: 1002, Sorttype: 'Name', name: "Product Name (Ascending)", Ascending: true },
        { id: 1003, Sorttype: 'Name', name: "Product Name (Descending)", Ascending: false },
        { id: 1004, Sorttype: 'Sku', name: "Product SKU (Ascending)", Ascending: true },
        { id: 1005, Sorttype: 'Sku', name: "Product SKU (Descending)", Ascending: false },
        { id: 1006, Sorttype: 'EANUPC__c', name: "Product EAN/UPC (Ascending)", Ascending: true },
        { id: 1007, Sorttype: 'EANUPC__c', name: "Product EAN/UPC (Descending)", Ascending: false },
    ]

    const buttonClickedHandler = () => {
        console.log('You have been clicked a button!');
        // do something
    };
    const [selectedsort, setSelectedSort] = useState<any>(null);

    const selectSort = (item: any) => {
        setSelectedSort(item)
    }
    const applySort = () => {
        if (selectedsort) {
            dispatch(ADDSORT(selectedsort));
            cartSortModalToggle()
            // navigation.navigate('ViewAddToCart')
        } else {
            // navigation.navigate('ViewAddToCart')
            cartSortModalToggle()
        }
    }

    return (
        <View style={styles.bodyFlexStyle} testID='sortCompoWrapper' >
            <ScrollView>
                {/* Main Header */}
                <View style={styles.projectListHeader}>
                    <View style={styles.projectListOuter}>
                        <View style={styles.projectListInnerHeader}>
                            <Pressable onPress={() => cartSortModalToggle()} testID='sortCompoCloseButton' >
                                {({ pressed }) => (
                                    <View style={styles.gapStyle}>
                                        <BlackCross />
                                    </View>
                                )}
                            </Pressable>
                            <View style={styles.gapStyle}>
                                <Text style={styles.sortTextStyle}>{t('SORT.sortTitle')}</Text>
                            </View>
                        </View>
                        <TouchableHighlight
                            testID='sortCompoApplyButton'
                            onPress={applySort}
                            // color={"#FFFFFF"}
                            underlayColor={'#F40000'}
                            style={styles.roundButton}>

                            <Text style={styles.whiteText}>{t('SORT.applyTitle')}</Text>
                        </TouchableHighlight>
                    </View>


                </View>
                <Separator />

                {
                    sortData.map((item, i) => {
                        return (
                            <TouchableOpacity onPress={() => selectSort(item)} key={i}>
                                <View style={styles.sortInnerDiv}>
                                    <Text style={[styles.sortTextPara, selectedsort?.id === item.id ? { fontWeight: "800" } : null]}>{item.name}</Text>
                                </View>
                                <Separator />
                            </TouchableOpacity>)
                    })
                }
            </ScrollView>
        </View>
    );
};

export default CartSort;