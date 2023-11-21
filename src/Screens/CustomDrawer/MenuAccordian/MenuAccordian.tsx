import React, { useEffect, useState } from 'react';
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


type AccordionItemPros = PropsWithChildren<{
  title: any,
  children:any,
  style:any
}>;


function AccordionItem({ children, title ,style}: AccordionItemPros): JSX.Element {

const [ expanded, setExpanded ] = useState(false);

function toggleItem() {
    setExpanded(!expanded);

}

const body = <View style={styles.accordBody}>{ children }</View>;

 

return (
    <View>
       
      <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
        <View style={styles.projectListOuter}>
        <View style={styles.accordianflex}>
        <View style={styles.projectListOuter}>
            <View style={styles.gapStyle}>
            <Image source = {require('../../../assets/images/user.png')} />
             </View> 
             <View style={styles.gapStyle}>
             <Text style={{ color: "#000000",
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        fontWeight: "600",
        lineHeight: 20,}}>{ title }</Text>
             </View>
             </View>
        
        </View>
        
        
        <View style={styles.accordianflex}>
               
        {expanded ? <UpBlackArrow /> : <DownBlackArrow />}
       
        </View>
        </View>
        
      </TouchableOpacity> 
    
    
    
      { expanded && body }
     
    </View>
  );
}

interface Props {
  navigation: any;
}

function MenuAccordian(props:Props): JSX.Element {

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
    const [firstName, setFirstName] = useState('');

    


    
   
    
 const { t } = useTranslation();

const Separator = () => <View style={styles.separator} />;


useEffect(() => {
  console.log('')
  getValueFromAsyncStorage()
}, []);

const getValueFromAsyncStorage = async () => {
  try {
    const value:any = await AsyncStorage.getItem('userIdentity');
    let userInfo = JSON.parse(value)
    if (userInfo !== null) {
      // Value exists in AsyncStorage, you can use it here
      console.log('Retrieved value:', userInfo.firstName);
      setFirstName(userInfo.firstName)
    } else {
      // userInfo does not exist in AsyncStorage
      console.log('userInfo not found in AsyncStorage');
    }
  } catch (error) {
    // Error retrieving data
    console.error('Error retrieving data from AsyncStorage:', error);
  }
};

const logoutAction = async () => {

  await  oauth.logout(
    async () => {
      console.log("LOGOUT SUCCESS")
      await AsyncStorage.clear()
      
    },
    () => {
       console.log("LOGOUT FAILED")
   
    }
  );

  props.navigation.navigate('Test')
}
return (
    <SafeAreaView>
      <ScrollView
       contentInsetAdjustmentBehavior="automatic"
       >
       
       <View style={{paddingLeft:15,paddingRight:12,marginTop:5,backgroundColor:"#FFFFFF"}}>
       
        <AccordionItem title= {`Hi ${firstName}`}  style={styles.sortTextPara}>
        <Separator/>
           <View>
           {/* <TouchableOpacity  onPress={()=>props.navigation.navigate("OrderHistory")}><Text style={styles.accordianTxt}>{t("MENU_COMPONENT.orderhistoryTitle")}</Text></TouchableOpacity>

            <Text style={styles.accordianTxt}>{t("MENU_COMPONENT.servicehistoryTitle")}</Text>
            <Text  style={styles.accordianTxt}>{t("MENU_COMPONENT.shoppinglistTitle")}</Text>
            <TouchableOpacity
              onPress={()=> props.navigation.navigate("MyProfile")}
             ><Text  style={styles.accordianTxt}>{t("MENU_COMPONENT.myprofileTitle")}</Text>
             </TouchableOpacity>
            <Text  style={styles.accordianTxt}>{t("MENU_COMPONENT.paymentTitle")}</Text>
            <Text style={styles.accordianTxt}>{t("MENU_COMPONENT.userTitle")}</Text>
            <Text style={styles.accordianTxt}>{t("MENU_COMPONENT.accountTitle")}</Text>
            <TouchableOpacity
              onPress={()=>props.navigation.navigate("OrderDetails")}
             >
            <Text style={styles.accordianTxt}>{"OrderDetails"}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={logoutAction}
             ><Text style={styles.accordianTxt}>{t("MENU_COMPONENT.logoutTitle")}</Text>
             </TouchableOpacity>
           </View>
            
        
        

            
        </AccordionItem>
        </View>

       

      
       
       
       
        
       
       
      </ScrollView>

    
    </SafeAreaView>

    
  );
}

export default MenuAccordian;