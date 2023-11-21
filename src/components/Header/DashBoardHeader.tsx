import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  DeviceEventEmitter,
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
import CustomSearchBar from '../../components/CustomSearchBar';
import { SelectList } from 'react-native-dropdown-select-list';
import FilterIcon from "../../assets/images/FilterIcon";
import DownArrow from "../../assets/images/DownArrow";
import VerticalLine from "../../assets/images/VerticalLine";
import SaveCard from "../../assets/images/SaveCard";
import Cross from "../../assets/images/Cross";
import FooterComponent from '../../components/FooterComponent';
import { useSelector } from 'react-redux';
import { oauth, net } from 'react-native-force';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncData } from '../../Salesforce/SmartSync';
import { User, UserResponse } from '../../redux/Reducer/cartReducer';


const DashBoardHeader: React.FC<{ navigation: any }> = ({ navigation }) => {
  const AllCart = useSelector((state: any) => state.cart.Carts);
  const CartCount = AllCart.length
  console.log("AllCart=", AllCart, CartCount)
  const [shouldShow, setShouldShow] = useState(false);

  // oauth.authenticate(
  //     (response) => {
  //         console.log("login completed", response);

  //         syncData();
  //         // this.setState({ loggedIn: true })
  //         this.setState({isLoaderVisible: false});
  //         this.props.navigation.navigate('ProductsListing');
  //     },
  //     (error) => console.log('login failed:' + error)
  // );



  // console.log('navigation=', navigation)

  


  useEffect(() => {
    // clreard reset date and sort

    DeviceEventEmitter.addListener('sync_success', async e => {
      if (e) {
        console.log("sync_success======", e);
        AsyncStorage.setItem("login", JSON.stringify(true));
      //   AsyncStorage.setItem("selectedAccountId", '0018M00000LJTNuQAP');

      //   let         userIdentity = {
      //     bottlerId: 4200,
      //     userId: "0058M000001knNVQAY",
      //     // contactId: "0038M00000NsIv7QAF",
      //     // accountId:'0018M00000LJTNuQAP',
      //     // 0038M00000NsIv7QAF
      //     // plantCode: "a2S8M000000BpvYUAS"
      // }

      //   console.log("ON LOGIN OUTSIDEE =>", userIdentity)

      //   await AsyncStorage.setItem('userIdentity', JSON.stringify(userIdentity))
      //     .then(() => {
      //       console.log("It was saved successfully")
      //     })
      //     .catch(() => {
      //       console.log("There was an error saving the product")
      //     })

        navigation.navigate('Allscreen');
        DeviceEventEmitter.removeAllListeners();
      }
    });
  }, [])

  const getUserDetailsFromUserID = (userId:string) =>{
    console.log("getUserDetailsFromUserID Query=", `SELECT FIELDS(ALL), Account.BottlerId__c FROM User where Id = '${userId}' LIMIT 100`)
      net.query(`SELECT FIELDS(ALL), Account.BottlerId__c FROM User where Id = '${userId}' LIMIT 100`,
      (response:UserResponse) => {
          console.log("getUserDetailsFromUserID = ",response);

          if(response.done){

            let foundUser = response.records.find((ele:User)=> ele.Id === userId);

            console.log("foundUser = ",foundUser);

            if(foundUser)

              setUserIdentity(foundUser);

          }

      },

      (error) => {

        console.log("getUserDetailsFromUserID Error= ", error);

      });

  };

  const setUserIdentity = async (user: User) => {
    console.log("setUserIdentity User=", user);
    const userIdentity = {
      bottlerId: user.Account.BottlerId__c,
      userId: user.Id,
      accountId:user.AccountId,
      contactId: user.ContactId
  }
    await AsyncStorage.setItem('userIdentity', JSON.stringify(userIdentity))
    await AsyncStorage.setItem("selectedAccountId", user.AccountId);
    console.log("ON LOGIN OUTSIDEE =>", userIdentity)
    syncData();

  }

  const onLoginPress = () => {
    console.log("Login proceed")
    try {
      oauth.getAuthCredentials(
        (resp) => {
          console.log('getAuthCredentials success=', resp)
          AsyncStorage.setItem("userToken",JSON.stringify(resp.accessToken));
          getUserDetailsFromUserID(resp.userId);
          // getUserDetailsFromUserID("0058M000001lorYQAQ"); //Community User Id of Absarh@coreflexsolutions.com user.
        }, // you should get here if login succeeds or if already login
        (error) => {
          oauth.authenticate(
            (response: any) => {
              console.log("error login completed", response);
              AsyncStorage.setItem("userToken",JSON.stringify(response.accessToken));
              getUserDetailsFromUserID(response.userId);
              //  getUserDetailsFromUserID("0058M000001lorYQAQ"); //Community User Id of Absarh@coreflexsolutions.com user.
            },
            (error: any) => {
              console.log("error=", error);
            }
          );
        })
    } catch (error) {
      console.log("error", error)
    }
  }

  const [selected, setSelected] = React.useState("");

  const [searchedText, setSearchedText] = React.useState('');
  /**
  * The function sets the value of a state variable to the input text.
  * @param text - The `text` parameter is a string that represents the new value of the searched text.
  * It is passed as an argument to the `onChangeSearchedText` function. The function then sets the
  * state of `searchedText` to this new value using the `setSearchedText`
  */
  const onChangeSearchedText = (text: any) => {
    setSearchedText(text);
  };


  /**
   * The function clears the searched text.
   */
  const clearSearch = () => {
    setShouldShow(!shouldShow);
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
              <View style={[styles.projectListInnerHeader, { flex: 1, justifyContent: "space-between" }]}>

                <View style={styles.gapStyle}>
                  <Image source={require('../../assets/images/Logo.png')} />
                </View>
                <View>
                  <TouchableHighlight
                    onPress={onLoginPress}
                    // color={"#FFFFFF"}
                    underlayColor={'#F40000'}
                    style={styles.roundButton2}>

                    <Text style={styles.whiteText}>SignIn</Text>
                  </TouchableHighlight>
                </View>
              </View>

              {/* <View style={styles.projectListInnerHeader}>
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

                        <Text style={styles.CartCount}>{CartCount}</Text>
                      </View>
                    </View>
                  )}
                </Pressable>
              </View> */}
            </View>
          </View>
        }

      </ScrollView>
    </View>


  );
};

export default DashBoardHeader;



