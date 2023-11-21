import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
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
  Dimensions,
  useColorScheme,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import styles from "./styles";
import MenuIcon from "../../assets/images/MenuIcon";
import SearchIcon from "../../assets/images/SearchIcon";
import AddToCart from "../../assets/images/AddToCart";
import SearchBar from '../../components/SearchBar';
import ForwardScrollArrow from '../../assets/images/ForwardScrollArrow'
import BackwardScrollArrow from '../../assets/images/BackwardScrollArrow'
import VerticalLine from "../../assets/images/VerticalLine";
import SaveCard from "../../assets/images/SaveCard";
import FooterComponent from '../../components/FooterComponent';
import TopTabsMultiple from '../../components/TopTabsMultiple';
import OrderBuilder from '../OrderBuilder';
import ShoppingList from '../ShoppingList';
import ProductListIcon from "../../assets/images/ProductListIcon";
import OrderBuilderIcon from "../../assets/images/OrderBuilderIcon";
import ShopListIcon from "../../assets/images/ShopListIcon";
import { useTranslation } from "react-i18next";
// import {FlatListSlider} from 'react-native-flatlist-slider';
import Header from '../../components/Header';
import EditCircularIcon from "../../assets/images/EditCircularIcon";
import CheckRed from "../../assets/images/CheckRed";
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/loader';


interface MyProfileProps {
       navigation: any; // Change 'any' to the correct type if possible.
     }

const MyProfile: FC<MyProfileProps> = ({ navigation }) => {

       const Separator: FC = () => <View style={styles.separator} />;

const [selected, setSelected] = React.useState("");

  
 
const flatListRef = useRef(null);
const { t } = useTranslation();
const loader = useSelector((state: any) => state.loader.isLoaderVisible);
const goToEdit=()=>{
      navigation.navigate("EditProfile")
 }

return (

  <View style={styles.bodyFlexStyle}>
      <ScrollView>    
               <View>
                   <View style={styles.myProfileHeader}>     
                          <Text style={styles.myProfileStyle}>{t("VIEW_PROFILE.profileTitle")}</Text>
                  </View>  
                  <View style={styles.BlockWhite}>
                         <View style={styles.myProfileHeader}>    
                                <View style={styles.myProfileOuter}>
                                        <Text  style={styles.myProfileSmallText}>{t("VIEW_PROFILE.basicTitle")}</Text>
                                  <View style={styles.myProfileInner}>
                                               <View style={styles.gapFlexStyle}>
                                                      <TouchableOpacity onPress={goToEdit }>
                                                          <EditCircularIcon />
                                                     </TouchableOpacity>
                                               </View>
                                     <View style={styles.gapStyle}>
                                        <TouchableHighlight
                                             onPress={() => {
                                                navigation.navigate('');
                                             }}
                                             color={"#FFFFFF"}
                                             underlayColor={'#F40000'}
                                             style={styles.roundchangeButton}>

                                             <Text style={styles.whiteText}>{t("VIEW_PROFILE.changeTitle")}</Text>
                                        </TouchableHighlight>
                                    </View>
                                 </View>
                               </View>
                         </View>
                   <View style={styles.productDetailOuter}> 
                          <View style={styles.productDetailsInner}>
                                  <View style={styles.productParaBrand}>
                                         <Text style={styles.brandTitle}>{t("VIEW_PROFILE.firstnameTitle")}</Text>
                                         <Text style={styles.brandName}>{t("VIEW_PROFILE.nameTitle")}</Text>
                                  </View>
                                  <View style={styles.productParaBrand}>
                                         <Text style={styles.brandTitle}>{t("VIEW_PROFILE.lastnameTitle")}</Text>
                                         <Text style={styles.brandName}>{t("VIEW_PROFILE.smithTitle")}</Text>
                                </View>
                          </View>

                          <View style={styles.productDetailsInner}>
                                 <View style={styles.productParaBrand}>
                                        <Text style={styles.brandTitle}>{t("VIEW_PROFILE.contactTitle")}</Text>
                                        <Text style={styles.brandName}>{t("VIEW_PROFILE.emailTitle")}</Text>
                                 </View>
                                 <View style={styles.productParaBrand}>
                                        <Text style={styles.brandTitle}>{t("VIEW_PROFILE.contactNumberTitle")}</Text>
                                        <Text style={styles.brandName}>{t("VIEW_PROFILE.NumberConTitle")}</Text>
                                </View>
                         </View>

                         <View style={styles.productDetailsInner}>
                                 <View style={styles.productParaBrand}>
                                        <Text style={styles.brandTitle}>{t("VIEW_PROFILE.languageTitle")}</Text>
                                        <Text style={styles.brandName}>{t("VIEW_PROFILE.englanguageTitle")}</Text>
                                </View>
                                <View style={styles.productParaBrand}>
                   
                                </View>
                         </View>

                         <Separator />
                        <View style={styles.prefferedHeader}>
                                <Text  style={styles.prefferedSmallText}>{t("VIEW_PROFILE.prefferedTitle")}</Text>   
                        </View>
                       <View style={styles.productDetailsInner}>
                              <View style={styles.productParaBrand}>
                                     <Text style={styles.brandTitle}>{t("VIEW_PROFILE.prefferedemailTitle")}</Text>
                                     <Text style={styles.brandName}>{t("VIEW_PROFILE.prefferednameTitle")}</Text>
                              </View>
                              <View style={styles.productParaBrand}>
                                     <Text style={styles.brandTitle}>{t("VIEW_PROFILE.prefferedtextTitle")}</Text>
                                     <Text style={styles.brandName}>{t("VIEW_PROFILE.prefferednumTitle")}</Text>
                           </View>
                      </View>

                     <Separator />

                   <View style={styles.prefferedHeader}>
                          <Text  style={styles.prefferedSmallText}>{t("VIEW_PROFILE.prefferedcommTitle")}</Text>      
                  </View>

                 <View style={styles.prefferedHeader}>
                        <View style={styles.myProfileInner}>
                                <View style={styles.gapStyle}>
                                        <CheckRed />
                                </View>
                                <View style={styles.gapStyle}>
                                       <Text style={styles.brandName}>{t("VIEW_PROFILE.promotionTitle")}</Text>
                              </View>
                         </View>

                         <View style={styles.myProfileInner}>
                                <View style={styles.gapStyle}>
                                        <CheckRed />
                               </View>
                               <View style={styles.gapStyle}>
                                      <Text style={styles.brandName}>{t("VIEW_PROFILE.generalTitle")}</Text>
                              </View>
                         </View>
                 </View>
              </View>
      </View>

  

  {/* Footer */}

  <FooterComponent />
  </View>                       
  
   

   </ScrollView>
   {loader &&  <Loader message="Please wait..." />}
   </View>
     
      
  );
};

export default MyProfile;



