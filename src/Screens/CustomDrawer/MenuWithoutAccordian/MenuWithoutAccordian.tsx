import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
} from 'react-native';

import styles from "../styles";
import UpBlackArrow from "../../../assets/images/UpBlackArrow";
import DownBlackArrow from "../../../assets/images/DownBlackArrow";
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from "react-i18next";
import { oauth } from 'react-native-force';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AccordionItemProps = PropsWithChildren<{
  title: string;
}>;

function AccordionItem({ children, title }: AccordionItemProps): JSX.Element {

  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);

  }

  const body = <View style={styles.accordBody}>{children}</View>;



  return (
    <View>

      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <View style={styles.projectListOuter}>
          <View style={styles.accordianflex}>
            <View style={styles.projectListOuter}>


              <View style={styles.gapStyle}>
                <Text style={styles.accordTitle}>{title}</Text>
              </View>
            </View>

          </View>


          <View style={styles.accordianflex}>

            {expanded ? <UpBlackArrow /> : <DownBlackArrow />}

          </View>
        </View>

      </TouchableOpacity>



      {expanded && body}

    </View>
  );
}
function MenuWithoutAccordian(props: { navigation: any }): JSX.Element {
  //Checkbox Values

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleFresca, setToggleFresca] = useState(false);
  const [toggleMelloYello, setToggleMelloYello] = useState(false);
  const [togglePibbXtra, setTogglePibbXtra] = useState(false);
  const [toggleSeagram, setToggleSeagram] = useState(false);
  const [toggleInca, setToggleInca] = useState(false);
  const [toggleCoca, setToggleCoca] = useState(false);
  const [toggleBarq, setToggleBarq] = useState(false);
  const [toggleFanta, setToggleFanta] = useState(false);
  const [toggleSprite, setToggleSprite] = useState(false);







  const { t } = useTranslation();


  const Separator = () => <View style={styles.separator} />;


  const logoutAction = async () => {
    await oauth.logout((success) => { console.log(success) }, (err) => { console.log(err) });
    console.log('--------------logout----------')
    await AsyncStorage.clear()
    // props.navigation.navigate("Test");
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >





        {/* <View style={{padding:20,paddingRight:8,marginTop:10,backgroundColor:"#FFFFFF",}}>
       
       <Text style={styles.accordTitle}>{t("MENU_COMPONENT.dashboardTitle")}</Text>
       
       </View>

       <View style={{paddingLeft:20,paddingRight:8,backgroundColor:"#FFFFFF"}}>
       
       <Text style={styles.accordTitle}>{t("MENU_COMPONENT.invoicesTitle")}</Text>
       
       </View> */}




        {/* <View style={{paddingTop:20,paddingLeft:20,paddingRight:8,backgroundColor:"#FFFFFF"}}>
       
       <Text style={styles.accordTitle}>{t("MENU_COMPONENT.ordersTitle")}</Text>
       
       </View> */}

{/* 
        <TouchableOpacity
          style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 8, backgroundColor: "#FFFFFF" }}
          onPress={() => props.navigation.navigate("ContactList")}
        >
          <Text style={styles.accordTitle}>{"Contacts"}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 8, backgroundColor: "#FFFFFF" }}
          onPress={() => props.navigation.navigate("ProductsListing")}
        >
          <Text style={styles.accordTitle}>{"Orders"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 8, backgroundColor: "#FFFFFF" }}
          onPress={() => props.navigation.navigate("TermsAndConditions")}
          >
            <Text style={styles.accordTitle}>{t("MENU_COMPONENT.termsTitle")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 8, paddingBottom: 25, backgroundColor: "#FFFFFF" }}
          onPress={() => props.navigation.navigate("PrivacyPolicy")}
          >
            <Text style={styles.accordTitle}>{t("MENU_COMPONENT.privacyPolicy")}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{ paddingTop: 20, paddingBottom: 10, paddingLeft: 20, paddingRight: 8, backgroundColor: "#FFFFFF" }}
          onPress={() => logoutAction()}
        >
          <Text style={styles.accordTitle}>{"LogOut"}</Text>
        </TouchableOpacity> */}

        {/* <View style={{padding:20,paddingRight:8,backgroundColor:"#FFFFFF"}}>
       
       <Text style={styles.accordTitle}>Support</Text>
       
       </View> */}


       {/* <View style={{ paddingLeft: 15, paddingRight: 12, backgroundColor: "#FFFFFF", paddingBottom: 10, paddingTop:10 }}>

          <AccordionItem title={t("MENU_COMPONENT.helpTitle")}>

            <View style={{paddingTop:5}}>
               <Text style={styles.accordianTxtTwo}
                onPress={() => props.navigation.navigate('ContactUs')}
              >{t("MENU_COMPONENT.contactTitle")}</Text>
              <Text style={styles.accordianTxtTwo}>{t("MENU_COMPONENT.faqTitle")}</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("CheckOut")}
              >
                <Text style={styles.accordianTxtTwo}>{t("MENU_COMPONENT.checkoutTitle")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("OrderConfirm")}
              >
                <Text style={styles.accordianTxtTwo}>{t("MENU_COMPONENT.orderTitle")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("OrderDetails")}
              >
                <Text style={styles.accordianTxtTwo}>{t("MENU_COMPONENT.orderdetailTitle")}</Text>
              </TouchableOpacity> 
              <TouchableOpacity
                onPress={() => props.navigation.navigate("TermsAndConditions")}
              >
                <Text style={styles.accordianTxtTwo}>{t("MENU_COMPONENT.termsTitle")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("TermsAndConditions")}
              >
                <Text style={styles.accordianTxtTwo}>{t("MENU_COMPONENT.privacyPolicy")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("SupportHistory")}
              >
                <Text style={styles.accordianTxtTwo}>{t("MENU_COMPONENT.supportTitle")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("OrderHistory")}
              >
                <Text style={styles.accordianTxtTwo}>{t("MENU_COMPONENT.orderhistoryTitle")}</Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => props.navigation.navigate("Test")}
              >
                <Text style={styles.accordianTxtTwo}>{t("MENU_COMPONENT.testTitle")}</Text>
              </TouchableOpacity> 
            </View>



          </AccordionItem>
        </View>*/}

      </ScrollView>


    </SafeAreaView>


  );
}

export default MenuWithoutAccordian;