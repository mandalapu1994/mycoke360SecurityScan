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
import { useDispatch, useSelector } from 'react-redux';
import { addSort } from '../../redux/Reducer/filtersReducer';
import { useTranslation } from "react-i18next";
import CorrectIcon from "../../assets/images/CorrectIcon";

interface SortType {
  id: number;
  Sorttype: string;
  name: string;
}

interface SortCompoProps {
  navigation: any; // You can replace 'any' with the appropriate type for navigation.
}

const SortCompo: React.FC<SortCompoProps> = ({ navigation }) => {
  const mySortTitle = useSelector((state: any) => state.filters.sortTitle);
  const mySort = useSelector((state: any) => state.filters.mysort);
 

  const dispatch = useDispatch();
  const Separator = () => <View style={styles.separator} />;

  const { t } = useTranslation();

  const [selected, setSelected] = React.useState("");

  const [searchedText, setSearchedText] = React.useState('');
  /**
  * The function sets the value of a state variable to the input text.
  * @param text - The `text` parameter is a string that represents the new value of the searched text.
  * It is passed as an argument to the `onChangeSearchedText` function. The function then sets the
  * state of `searchedText` to this new value using the `setSearchedText`
  */
  const onChangeSearchedText = (text:any) => {
    setSearchedText(text);
  };


  /**
   * The function clears the searched text.
   */
  const clearSearch = () => {
    setSearchedText("");
  }

  //  Tab Index

  const [selectedIndex, setSelectedIndex] = useState('0');

  // Counter
  const [quantity, setQuantity] = useState('1');
  const [quantityCokaCola, setQuantityCokaCola] = useState('1');


  //This Data is For Select Option
  const data = [
    { key: '1', value: 'All Products' },
    { key: '2', value: 'New Products' },
    { key: '3', value: 'Sparkling Soft Drinks' },
    { key: '4', value: 'Water' },
    { key: '5', value: 'Enhanced Water' },
    { key: '6', value: 'Tea' },

  ]

  
  const sortData = [
    // { id: 1001, Sorttype: 'Best Match', name: "Best Match" ,Ascending:true},
    { id: 1002, Sorttype: 'Name', name: "Product Name (Ascending)" ,Ascending:true},
    { id: 1003, Sorttype: 'Name', name: "Product Name (Descending)",Ascending:false },
    { id: 1004, Sorttype: 'StockKeepingUnit', name: "Product SKU (Ascending)" ,Ascending:true},
    { id: 1005, Sorttype: 'StockKeepingUnit', name: "Product SKU (Descending)" ,Ascending:false},
    { id: 1006, Sorttype: 'EANUPC__c', name: "Product EAN/UPC (Ascending)",Ascending:true },
    { id: 1007, Sorttype: 'EANUPC__c', name: "Product EAN/UPC (Descending)" ,Ascending:false},
  ]

  //This Data is For Tab Option

  const DATA = [
    { image: require("../../assets/images/ProductListIcon.png"), tabName: 'Product List' },
    { image: require("../../assets/images/ProductListIcon.png"), tabName: 'Order Builder' },
    { image: require("../../assets/images/ProductListIcon.png"), tabName: 'Shopping List' },

  ];




  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!');
    // do something
  };


  const [selectedsort, setSelectedSort] = useState<any>(null);

  const selectSort = (item:any) => {
    setSelectedSort(item)
  }
  const applySort = () => {
    if (selectedsort) {
      dispatch(addSort(selectedsort));
      navigation.navigate('ProductsList')
    } else {
      navigation.navigate('ProductsList')
    }


  }
  return (

    <View style={styles.bodyFlexStyle} testID='sortCompoWrapper' >
      <ScrollView>



        {/* Main Header */}
        <View style={styles.projectListHeader}>
          <View style={styles.projectListOuter}>
            <View style={styles.projectListInnerHeader}>
              <Pressable onPress={() => navigation.navigate('ProductsList')} testID='sortCompoCloseButton' >
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
            const prevSelected = mySortTitle === item.name

            return (
              <TouchableOpacity onPress={() => selectSort(item)} key={i} style={{width:"100%"}}>
                <View style={styles.sortInnerDiv}>
                  <Text style={[styles.sortTextPara, (selectedsort || prevSelected)?.id === item.id ? { fontWeight: "800" } : null]}>{item.name}</Text>
                 {prevSelected && <CorrectIcon/>}
                </View>
                <Separator />
              </TouchableOpacity>)
          })
        }






      </ScrollView>
    </View>


  );
};

export default SortCompo;



