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
import FilterAccordian from './FilterAccordian';
import { useDispatch } from 'react-redux';
import { addFilters } from '../../redux/Reducer/filtersReducer';
import { useTranslation } from "react-i18next";


interface FilterCompoProps {
  navigation: any; // Change the type to the appropriate navigation type if you know it
}





const FilterCompo: React.FC<FilterCompoProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const Separator = () => <View style={styles.separator} />;
  const [selected, setSelected] = React.useState("");
  const [searchedText, setSearchedText] = React.useState('');
  const [selectedBtn, setSelectedBtn] = useState(false);
  const [filters, setFilters] = useState([])

  // Counter
  const [quantity, setQuantity] = useState('1');
  const [quantityCokaCola, setQuantityCokaCola] = useState('1');
  //  Tab Index

  const [selectedIndex, setSelectedIndex] = useState('0');
  /**
  * The function sets the value of a state variable to the input text.
  * @param text - The `text` parameter is a string that represents the new value of the searched text.
  * It is passed as an argument to the `onChangeSearchedText` function. The function then sets the
  * state of `searchedText` to this new value using the `setSearchedText`
  */
  const onChangeSearchedText = (text:string) => {
    setSearchedText(text);
  };


  /**
   * The function clears the searched text.
   */
  const clearSearch = () => {
    setSearchedText("");
  }






  // //This Data is For Select Option
  //  const data = [
  //    {key:'1', value:'All Products'},
  //    {key:'2', value:'New Products'},
  //    {key:'3', value:'Sparkling Soft Drinks'},
  //    {key:'4', value:'Water'},
  //    {key:'5', value:'Enhanced Water'},
  //    {key:'6', value:'Tea'},

  // ]


  //This Data is For Tab Option

  // const DATA = [
  //    {image: require("../../assets/images/ProductListIcon.png"),tabName: 'Product List'},
  //    {image: require("../../assets/images/ProductListIcon.png"),tabName: 'Order Builder'},
  //    {image: require("../../assets/images/ProductListIcon.png"),tabName: 'Shopping List'},

  // ];




  // const buttonClickedHandler = () => {
  //    console.log('You have been clicked a button!');
  //    // do something
  //  };



  const applyFiltter = () => {

    dispatch(addFilters(filters))


    navigation.navigate('ProductsList')
  }


  const { t } = useTranslation();

  return (

    <View style={styles.bodyFlexStyle} testID='filterWrapper' >
      <ScrollView>

        {/* Main Header */}
        <View style={styles.projectListHeader}>
          <View style={styles.projectListOuter}>
            <View style={styles.projectListInnerHeader}>
              <Pressable onPress={() => navigation.navigate('ProductsList')} testID='filterCloseButton' >
                {({ pressed }) => (
                  <View style={styles.gapStyle}>
                    <BlackCross />
                  </View>
                )}
              </Pressable>
              <View style={styles.gapStyle}>
                <Text style={styles.sortTextStyle}>{t('FILTER.filterTitle')}</Text>
              </View>
            </View>
            <TouchableHighlight
              testID='filterApplyButton'
              onPress={applyFiltter}
              // color={"#FFFFFF"}
              underlayColor={'#F40000'}
              style={styles.roundButton}>

              <Text style={styles.whiteText}>{t('FILTER.applyTitle')}</Text>
            </TouchableHighlight>
          </View>


        </View>


        <FilterAccordian setFilters={setFilters} />


      </ScrollView>
    </View>


  );
};

export default FilterCompo;



