


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
  Modal,



} from 'react-native';
import styles from "./styles";
import MenuIcon from "../../assets/images/MenuIcon";
import SearchIcon from "../../assets/images/SearchIcon";
import AddToCart from "../../assets/images/AddToCart";
import BackArrow from "../../assets/images/BackArrow";
import MenuAccordian from './MenuAccordian';
import MenuWithoutAccordian from './MenuWithoutAccordian/MenuWithoutAccordian';
import SearchBar from '../../components/SearchBar';
import Close from "../../assets/images/Close";
import { SelectList } from 'react-native-dropdown-select-list';
import CorrectIcon from "../../assets/images/CorrectIcon";
import { useTranslation } from "react-i18next";
import { net } from 'react-native-force';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSoups, querySoup, saveDataLocally } from '../../Salesforce/SmartStore';
import { useDispatch } from 'react-redux';
import { getUserSpecifics } from '../../redux/Reducer/orderHistryReducer';
import { SELECTEDACC } from '../../redux/Reducer/cartReducer';
import { getUserDetails } from '../../utils/User';





interface AccountData {
  Name: string;
  AccountNumber: any;
  ShippingCity: any;
  // Add other properties if needed
}



const CustomDrawer: React.FC<{ props: any, navigation: any }> = ({ navigation, props }) => {

  // Modal window show hide
  const [showModal, setShowModal] = useState(false);

  // Separator

  const Separator = () => <View style={styles.separator} />;
  const SeparatorModal = () => <View style={styles.separatorModal} />;


  const [selected, setSelected] = React.useState("");

  const [searchedText, setSearchedText] = React.useState('');





  useEffect(() => {
    getUserDetailsFromLocal();
  }, [])

  const getUserDetailsFromLocal = async () => {
    let user: any = await AsyncStorage.getItem('userIdentity')
    saveUserData(JSON.parse(user));
  }

  const saveUserData = (data: any) => {
    if (data) {
      getDataFromStore(data)

    }
  };


  /**
   * The function clears the searched text.
   */
  const clearSearch = () => {
    setSearchedText("");
    setAccount(accountListForSearch)
  }

  //  Tab Index

  const [selectedIndex, setSelectedIndex] = useState('0');

  // Counter
  const [quantity, setQuantity] = useState('1');
  const [quantityCokaCola, setQuantityCokaCola] = useState('1');
  const [account, setAccount] = useState([])
  const [accountListForSearch, setAccountListForSearch] = useState([])
  const [selectedAccount, setSelectedAccount] = useState<any>({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [accountRelationData, setAccountRelationData] = useState([])

  // const [state, setstate] = useState(initialState)

  const dispatch = useDispatch()

  //This Data is For Select Option
  const language = [
    { key: '1', value: 'EN' },
    { key: '2', value: 'MR' },
    { key: '3', value: 'HINDI' },


  ]

  const onChangeSearchedText = (text: any) => {
    setSearchedText(text);
    // let searchedItem=selectedAccount.filter((ele,i)=>{
    //   ele.Name.inclu
    // })

    var lowSearch: any = text ? text.toLowerCase() : text;
    if (text) {

      let searchedItem: any = accountListForSearch.filter((ele: any) =>
        ele.Name?.toLowerCase().includes(lowSearch) || ele.AccountNumber?.includes(lowSearch) || ele.ShippingCity?.toLowerCase().includes(lowSearch)
      );
      setAccount(searchedItem)

    } else {
      setAccount(accountListForSearch)
    }
    // console.log("searchedItem",searchedItem)

  };


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


  const [selectedBtn, setSelectedBtn] = useState(false);


  const { t } = useTranslation();





  const checkPrimaryTag = async (success: any, Accountdata: any, userData: any) => {
    // const userIdentity: any = await AsyncStorage.getItem('userIdentity')
    const ContactId = userData ? userData.contactId : undefined
    const AccountID = userData ? userData.accountId : undefined

    const RelationData = success.currentPageOrderedEntries || []

    const FilterContactAccount = RelationData.filter((relObj: any) => relObj.ContactId === ContactId);
    // Create an array to store the filtered and merged objects
    const filteredAccounts: any = [];

    // Iterate through the Account Contact Relation data
    FilterContactAccount.forEach((relationObj: any) => {
      // Find the matching Account object
      let matchingAccount = Accountdata.find((account: any) => account.Id === relationObj.AccountId);


      if (matchingAccount) {
        // Create the merged object and add it to the filteredAccounts array
        filteredAccounts.push({ ...matchingAccount, IsDirect: relationObj.IsDirect });
      }
    });

    setLoggedIn(true)
    setAccount(filteredAccounts)

    let accountDataFromAsyncStorage:any = await AsyncStorage.getItem("selectedAcc")
    let selectedAccFromStore = filteredAccounts.filter((account: any) => account.Id === AccountID)
     let parsedObj=JSON.parse(accountDataFromAsyncStorage)
    // console.log('accountDataFromAsyncStorage1--------------',parsedObj,typeof(parsedObj) )
    
    let parsedSelectedAccount = JSON.parse(accountDataFromAsyncStorage)

    !accountDataFromAsyncStorage && onAccountPressed(selectedAccFromStore[0])
    accountDataFromAsyncStorage && setSelectedAccount(parsedSelectedAccount)
    // accountDataFromAsyncStorage && onAccountPressed(JSON.parse(accountDataFromAsyncStorage))

    setAccountListForSearch(filteredAccounts)


    // await AsyncStorage.setItem("selectedAcc", JSON.stringify(filteredAccounts.find((account: any) => account.Id === AccountID)));

  }

  const saveRelationData = (AccountData: any, userData: any) => {
    const getAcoountData: any = AccountData || [];
    querySoup('accountcontactrelation', (success: any) => checkPrimaryTag(success, getAcoountData, userData), (error: any) => console.log("querySoup----error", error), "AccountNumber")
  }
  const saveData = (data: any, userData: any) => {

    saveRelationData(data.currentPageOrderedEntries, userData)
    accountSpecificData(data.currentPageOrderedEntries)
  }

  const accountSpecificData = (accounts: any) => {
    let getUserSpecificDetails = accounts.filter((ele: any) => {
      return ele.Id === "0018M00000LJTNuQAP" ? ele : ""
    })
    dispatch(getUserSpecifics(getUserSpecificDetails))
  }


  const getDataFromStore = async (userData: any) => {

    let checkSelectedAcc: any = await AsyncStorage.getItem("selectedAcc") ? await AsyncStorage.getItem("selectedAcc") : ""
        //  console.log("checkSelectedAcc====",checkSelectedAcc)
    setSelectedAccount(checkSelectedAcc)
    querySoup('account', (success: any) => (saveData(success, userData)), (error: any) => console.log("querySoup----error", error), "AccountNumber")

  }

  const fetchAccounts = async () => {

    let checkSelectedAcc: any = await AsyncStorage.getItem("selectedAcc") ? await AsyncStorage.getItem("selectedAcc") : ""

    setSelectedAccount(checkSelectedAcc)

    net.query('SELECT FIELDS(ALL) FROM Account LIMIT 1',
      (response: any) => {
        console.log("ACCCOUNTS FETCHED NEW", response);
        if (response && response.records.length > 0) {
          setAccount(response.records)
          setAccountListForSearch(response.records)


        }
        // this.setState({ loggedIn: true, data: response.records })
      },
      (error) => {
        console.log("error:--- ", JSON.stringify(error));
        // this.setState({ loggedIn: false, data: [] });
      });

  }
  // AsyncStorage.setItem("selectedAccountId", '0018M00000LJTNuQAP')

  const onAccountPressed = async (item: any) => {
    setSelectedAccount(item)

    await clearSelectedSoups()
    await AsyncStorage.setItem("selectedAcc", JSON.stringify(item));

    setShowModal(false)

    // await AsyncStorage.setItem("selectedAccountId", item.Id);


    dispatch(SELECTEDACC(item))
    
    getUserDetails();

  }

  const clearSelectedSoups = async() => {
    await clearSoups(['PlantProductInventory__c','CartDeliveryGroup','CartItem'], (success:any)=> console.log(success), (err:any)=> console.log(err))
  }

  const renderAccounts = ({ item, index }: { item: any, index: any }) => {
    return <>
      <View style={styles.accountlistWrapper}>
        <View style={styles.checkedWrapper}>
          {
            item === selectedAccount || item.Id === selectedAccount?.Id ?
              <CorrectIcon />
              : ""

          }
        </View>
        <View style={styles.modalInnerFlexDiv}>
          <View style={styles.modalListFlexOuter}>
            <TouchableOpacity style={{ flex: 2 }} onPress={() => onAccountPressed(item)}>
              <Text style={styles.modalOptionHeading}>{item.Name} | {item.AccountNumber} </Text>
              <Text style={styles.modalOptionPara}>{item.ShippingCity} </Text>
            </TouchableOpacity>
            {item?.IsDirect && <View style={{ flex: 1 }}>
              <TouchableHighlight

                // color={"#FFFFFF"}
                underlayColor={'#F40000'}
                style={styles.roundRedButton}>

                <Text style={styles.whiteText}>{t("MENU_COMPONENT.primaryTitle")}</Text>
              </TouchableHighlight>
            </View>}
          </View>
        </View>

      </View>
      <SeparatorModal />
    </>




  }



  return (

    <View style={styles.bodyFlexStyle}>
      <ScrollView>



        {/* Main Header */}
        <View style={styles.projectListHeader}>

          <View style={styles.projectListOuter}>
            <View style={styles.projectListInnerHeader}>
              <TouchableOpacity onPress={() => navigation.closeDrawer()} >
                <View style={styles.gapStyle}>
                  <BackArrow />
                </View>

              </TouchableOpacity>

            </View>

          </View>



          <View style={styles.projectListOuter}>
            <View style={styles.projectListInnerHeader}>

              <View style={styles.gapStyle}>
                <Text style={styles.currentTextStyle}>{t("MENU_COMPONENT.currentTitle")}{"\n"}
                  <Text style={styles.currentTextPara}>{selectedAccount ? selectedAccount.Name : ""} {selectedAccount ? `(${selectedAccount.AccountNumber})` : ""}</Text></Text>
              </View>
            </View>

            <Text style={styles.showText} onPress={() => {
              setShowModal(!showModal);
            }}>{t("MENU_COMPONENT.changeTitle")}</Text>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(false)
              console.log('Modal has been closed.');
            }}>
            {/*All views of Modal*/}
            {/*Animation can be slide, slide, none*/}
            <View style={{ backgroundColor: "#000000aa", flex: 1,  paddingTop:20 }}>
              <View style={styles.modal}>
                <View style={styles.modalListOuter}>
                  <Text style={styles.modalTitle}>{t("MENU_COMPONENT.switchTitle")}</Text>
                  <Text onPress={() => {
                    setShowModal(!showModal);
                  }}>
                    <Close />
                  </Text>

                </View>
                {/* Search Option */}
                <View style={styles.searchOuterBox}>
                  <SearchBar
                    placeholder={t("MENU_COMPONENT.searchTitle")}
                    searchedText={searchedText}
                    onChangeSearchedText={(text: any) => onChangeSearchedText(text)}
                    clearSearch={clearSearch}

                  />
                </View>
                <View style={styles.modalCurrentDiv}>
                  <Text style={styles.modalTextHeading}>{t("MENU_COMPONENT.currentTitle")}</Text>
                  <Text style={styles.modalTextPara}>{selectedAccount ? selectedAccount.Name : ""} {selectedAccount ? `(${selectedAccount.AccountNumber})` : ""}</Text>
                </View>
                <SeparatorModal />

                <FlatList
                  data={account}
                  keyExtractor={(item: any, index: any) => index}
                  renderItem={renderAccounts}
                // animationType="slide"

                />



              </View>
            </View>
          </Modal>








        </View>


        <MenuAccordian navigation={navigation} />
        <MenuWithoutAccordian navigation={navigation} />


      </ScrollView>
      {/* <View style={styles.bottom}>
                   <View style={styles.FooterStyle}>
     <View style={{paddingHorizontal:10}}>
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={language} 
        save="value"
        boxStyles={styles.selectboxsaluation}  
        dropdownStyles={{backgroundColor:"#FFFFFF",borderWidth:1,borderColor: '#DDDBDA',color:"#000"}}
        
        // dropdownItemStyles={{borderBottomWidth:0.8,borderBottomColor:"#DDDBDA"}}
        
        
      />
      </View>
   </View>
   </View> */}
    </View>




  );
};

export default CustomDrawer;








