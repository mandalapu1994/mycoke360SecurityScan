import React, { useCallback, useEffect } from "react";

import FooterComponent from "../../components/FooterComponent";
import CallToActionSection from "./CallToActionSection";

import { Alert, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, View,DeviceEventEmitter, AppState } from "react-native";
import { FONT_FAMILY_I_BOLD } from "../../utils/Theme";
// import CustomButton from "../../components/CustomButton";
import HowItWorksSection from "./HowItWorksSection";
import PlatformBenefitsSection from "./PlatformBenefitsSection";
import CustomerStoriesSection from "./CustomerStoriesSection";
import CustomButton from "../../components/CustomButton/CustomButton";
import DashBoardHeader from "../../components/Header/DashBoardHeader";
import { oauth, net } from "react-native-force";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncData, SYNC_SUCCESS } from '../../Salesforce/SmartSync';
import { STOREWEBSTORE, User, UserResponse } from '../../redux/Reducer/cartReducer';
import { querySoup } from "../../Salesforce/SmartStore";
import { getCategoryList } from "../../Api/apiService";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../components/Loader/loader";
import { store } from "../../redux/store";
import { SET_LOADER } from "../../redux/Reducer/loaderReducer";
import Analytics from 'appcenter-analytics';

const Dashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
 
  const dispatch = useDispatch();
  const loader = useSelector((state: any) => state.loader.isLoaderVisible);

  const handleAuthenticate = useCallback(() => {
    store.dispatch(SET_LOADER(true))
    oauth.getAuthCredentials(
      (resp) => {
          console.log('getAuthCredentials success=', resp)
          AsyncStorage.setItem("userToken",JSON.stringify(resp.accessToken));
             getUserDetailsFromUserID(resp.userId);
            

            //  getUserDetailsFromUserID("0058M000001lorYQAQ"); //Community User Id of Absarh@coreflexsolutions.com user.
        }, // you should get here if login succeeds or if already login
        (error) => {
          store.dispatch(SET_LOADER(false));

        });
  },[])

  useEffect(() => {
    console.log("DASH");
    // SetuserIdentity()
    // checkAuth();
    // onSalesforceLogin();
    // askStoragePermission()
    handleAuthenticate()
  }, [navigation,handleAuthenticate]);

  useEffect(() => {
    AppState.addEventListener('change', () => {
      handleAuthenticate()
    });
  }, []);
  

  const getUserDetailsFromUserID = (userId:string) =>{

    console.log("getUserDetailsFromUserID Query=", `SELECT FIELDS(ALL), Account.BottlerId__c FROM User where Id = '${userId}' LIMIT 100`)

    net.query(`SELECT FIELDS(ALL), Account.BottlerId__c FROM User where Id = '${userId}' LIMIT 100`,
      (response: UserResponse) => {
        console.log("getUserDetailsFromUserID = ", response);
        if (response.done) {

          let foundUser = response.records.find((ele: User) => ele.Id === userId);
          if (foundUser) {
            setUserIdentity(foundUser);
          }
        } else {
          store.dispatch(SET_LOADER(false))
        }
      },
      (error) => {
        store.dispatch(SET_LOADER(false))
        console.log("getUserDetailsFromUserID Error= ", error);
      });

  };

  const setUserIdentity = async (user: User) => {
    console.log("setUserIdentity User=", user);
    const userIdentity = {
      bottlerId: user.Account.BottlerId__c,
      userId: user.Id,
      accountId:user.AccountId,
      contactId: user.ContactId,
      firstName: user.FirstName,
  }
    await AsyncStorage.setItem('userIdentity', JSON.stringify(userIdentity))
    await AsyncStorage.setItem("selectedAccountId", user.AccountId);
    console.log("ON LOGIN OUTSIDEE =>", userIdentity)
    await Analytics.startSession();
   await syncData();
   getWebStoreData(userIdentity.bottlerId)
  //  setTimeout(()=>{
  // getWebStoreData()
  //  },3500)
  
  }

  const getWebStoreData = (bottlerId:any) =>{
    // querySoup('WebStore', (success: any) => saveWebStoreData(success.currentPageOrderedEntries), (error: any) =>( store.dispatch(SET_LOADER(false)), console.log("querySoup WebStore Error----error", error)), "Name");
    const query = `SELECT Id, Enable_Co2_Cylinders__c, Enable_Glass_Bottles__c, BottlerId__c FROM WebStore where BottlerId__c  = '${bottlerId}' LIMIT 2000`
    
    net.query(query,
      (response: any) => {
        saveWebStoreData(response.records)
      },
      (error) => {
        store.dispatch(SET_LOADER(false))
        console.log("getUserDetailsFromUserID Error= ", error);
      });
  }

  const saveWebStoreData = async(data: any) =>{
    console.log('saveWebStoreData###',data)
    await AsyncStorage.setItem("webStoreData", JSON.stringify(data[0]));
    dispatch(STOREWEBSTORE(data[0].Id))
    getCategoryList(dispatch)

    DeviceEventEmitter.emit(SYNC_SUCCESS, "Success");
    // store.dispatch(SET_LOADER(false))
  }



  return (
    <View style={styles.parent}>
      <DashBoardHeader navigation={navigation} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Refresh your experience with myCoke Payments
          </Text>
          {/* <CustomButton
            label="Become a Customer"
            containerStyle={styles.buttonContainer}
            labelStyle={{ color: "#000", fontSize: 14, lineHeight: 20 }}
          /> */}
        </View>
        <PlatformBenefitsSection />
        <HowItWorksSection />
        <CustomerStoriesSection />
        <CallToActionSection />
        <FooterComponent navigation={navigation} isScreenFrom="Dashboard" />
      </ScrollView>
      {loader && <Loader message="Please wait..." />}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  banner: {
    backgroundColor: "#e3e3e3",
    paddingLeft: 16,
    paddingRight: 27,
    paddingTop: 56,
    paddingBottom: 184,
  },
  bannerText: {
    fontSize: 48,
    lineHeight: 65,
    fontWeight: "600",
    color: "#000",
    fontFamily: FONT_FAMILY_I_BOLD,
  },
  buttonContainer: {
    backgroundColor: "#FFF",
    alignSelf: "baseline",
    marginTop: 38,
    paddingHorizontal: 34,
    paddingVertical: 14,
  },
});

export default Dashboard;
