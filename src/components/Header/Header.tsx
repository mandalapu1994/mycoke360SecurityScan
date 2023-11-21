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
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import styles from "./styles";
import MenuIcon from "../../assets/images/MenuIcon";
import SearchIcon from "../../assets/images/SearchIcon";
import AddToCart from "../../assets/images/AddToCart";
import RefreshIcon from "../../assets/images/RefreshIcon";
import CustomSearchBar from '../../components/CustomSearchBar';
import { SelectList } from 'react-native-dropdown-select-list';
import FilterIcon from "../../assets/images/FilterIcon";
import DownArrow from "../../assets/images/DownArrow";
import VerticalLine from "../../assets/images/VerticalLine";
import SaveCard from "../../assets/images/SaveCard";
import Cross from "../../assets/images/Cross";
import FooterComponent from '../../components/FooterComponent';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_TEXT } from '../../redux/Reducer/searchReducer';
import { syncData, syncDownFull } from '../../Salesforce/SmartSync';
import { DATAREFRESHED } from '../../redux/Reducer/cartReducer';
import { clearCartSoup } from '../../Salesforce/SmartStore';





const Header: React.FC<{ navigation: any }> = ({ navigation }) => {
  const AllCart = useSelector((state:any) => state.cart.Carts);
  const searchText = useSelector((state:any) => state.search.searchText);
  console.log("searchText=",searchText)
  const CartCount = AllCart.length
  // console.log("AllCart=", AllCart, CartCount)
  
  const cartLength = useSelector((state: any) => state.cart.CartLength);
  // const CartCount = AllCart.length

  const [shouldShow, setShouldShow] = useState(false);

  // console.log('navigation=', navigation)
  
  const [selected, setSelected] = React.useState("");

  const [searchedText, setSearchedText] = React.useState(searchText);
  const dispatch = useDispatch()
  const isDataRefreshed = useSelector((state: any) => state.cart.isDataRefreshed);
  /**
  * The function sets the value of a state variable to the input text.
  * @param text - The `text` parameter is a string that represents the new value of the searched text.
  * It is passed as an argument to the `onChangeSearchedText` function. The function then sets the
  * state of `searchedText` to this new value using the `setSearchedText`
  */
  const onChangeSearchedText = (text:any) => {
    // setSearchedText(text);
    dispatch(SEARCH_TEXT(text));
  };


  /**
   * The function clears the searched text.
   */
  const clearSearch = () => {
    setShouldShow(!shouldShow);
    dispatch(SEARCH_TEXT(""));
  }



  //  Tab Index

  const [selectedIndex, setSelectedIndex] = useState('0');

  // Counter
  const [quantity, setQuantity] = useState('1');
  const [quantityCokaCola, setQuantityCokaCola] = useState('1');


  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!');
    // do something
  };


  const [selectedBtn, setSelectedBtn] = useState(false);

  useEffect(() => {
    setSearchedText(searchText);
  }, [searchText])

  const clearSoup = (soupNamesData:any) => {
    soupNamesData.map((soupName:any, index:number) => {
      clearCartSoup((success: any) => console.log('cart soup clear', success), (error: any) => console.log("cart soup clear error", error), soupName)
      if(index === soupNamesData.length - 1) {
        syncData()
        dispatch(DATAREFRESHED(!isDataRefreshed))
      }
    })
  }


  // const successClearCartSoup = (data: any) => {
    
  // }


  return (

    <View testID='headerWrapper' >
      <ScrollView>

        {/* Main Header */}
        {shouldShow ? (
          <View style={styles.whiteBackgroundDiv} testID='headerCustomeWrapper' >
            <View style={styles.customPadding}>
              <CustomSearchBar
                placeholder="Search"
                searchedText={searchedText}
                onChangeSearchedText={(text: any) => onChangeSearchedText(text)}
                clearSearch={clearSearch}
              />
            </View>
          </View>
        ) :
          <View style={styles.projectListHeader}>
            <View style={styles.projectListOuter}>
              <View style={styles.projectListInnerHeader}>
                <TouchableOpacity
                  testID='headerDrawerOpnerButton'
                  style={styles.gapStyle}
                  onPress={() => navigation.openDrawer()}
                >
                  <MenuIcon />
                </TouchableOpacity>
                <View style={styles.gapStyle}>
                  <Image source={require('../../assets/images/Logo.png')} />
                </View>
              </View>

              <View style={styles.projectListInnerHeader}>
                <TouchableOpacity onPress={() => clearSoup(['CartItem'])}
                // testID='headerSearchIconHolder'
                >
                  <View style={styles.gapStyle}>
                    <RefreshIcon />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShouldShow(!shouldShow)} testID='headerSearchIconHolder' >
                  <View style={styles.gapStyle}>
                    <SearchIcon />
                  </View>
                </TouchableOpacity>

                <Pressable onPress={() => navigation.navigate('ViewAddToCart')} testID='headerCartIconHolder' >
                  {({ pressed }) => (
                    <View style={[styles.gapStyle, { position: "relative" }]}>
                      <AddToCart />
                      <View style={styles.cartBadge}>

                        <Text style={styles.CartCount}>{cartLength}</Text>
                      </View>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        }

      </ScrollView>
    </View>


  );
};

export default Header;



