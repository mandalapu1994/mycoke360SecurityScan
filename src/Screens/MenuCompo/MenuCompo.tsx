import React, {useState , useEffect,useRef,useCallback} from 'react';
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
import SearchBar from '../../components/SearchBar';
import Close from "../../assets/images/Close";
import { SelectList } from 'react-native-dropdown-select-list';
import { useTranslation } from "react-i18next";
import Loader from '../../components/Loader/loader';
import { useSelector } from 'react-redux';






const MenuCompo:React.FC<{navigation:any}>= ({navigation}) => {

// Modal window show hide
const [showModal, setShowModal] = useState(false);

// Separator

const Separator = () => <View style={styles.separator} />;
const SeparatorModal = () => <View style={styles.separatorModal} />;

    
const [selected, setSelected] = React.useState("");
const loader = useSelector((state: any) => state.loader.isLoaderVisible);
const [searchedText, setSearchedText] = React.useState(''); 
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




//This Data is For Select Option
 const language :any= [
   {key:'1', value:'EN'},
   {key:'2', value:'MR'},
   {key:'3', value:'HINDI'},
    
]


//This Data is For Tab Option

const DATA :any= [
   {image: require("../../assets/images/ProductListIcon.png"),tabName: 'Product List'},
   {image: require("../../assets/images/ProductListIcon.png"),tabName: 'Order Builder'},
   {image: require("../../assets/images/ProductListIcon.png"),tabName: 'Shopping List'},
   
];



 const { t } = useTranslation();
 
   
  return (

   <View style={styles.bodyFlexStyle}>
   <ScrollView>
    
   
  
     {/* Main Header */}
    <View style={styles.projectListHeader}>
    <Separator />
      <View style={styles.projectListOuter}>
           <View style={styles.projectListInnerHeader}>
               <Pressable onPress={() => navigation.navigate('ProductsList') }>
                        {({pressed}) => (
                <View style={styles.gapStyle}>
                    <BackArrow />
                </View>
                        )}
                </Pressable>
               
            </View>
            
      </View> 
      <Separator />
     

      <View style={styles.projectListOuter}>
           <View style={styles.projectListInnerHeader}>
               
                <View style={styles.gapStyle}>
                  <Text style={styles.currentTextStyle}>{t("MENU_COMPONENT.currentTitle")}{"\n"}
                  <Text style={styles.currentTextPara}>{t("MENU_COMPONENT.cokeTitle")}</Text></Text>
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
            console.log('Modal has been closed.');
          }}>
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View style={{backgroundColor:"#000000aa",flex:1}}>
          <View style={styles.modal}>
          <View style={styles.modalListOuter}>
            <Text style={styles.modalTitle}>{t("MENU_COMPONENT.switchTitle")}</Text>
            <Text  onPress={() => {
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
                        onChangeSearchedText={(text:string)=>onChangeSearchedText(text)}
                        clearSearch={clearSearch}
                        
                    />
      </View>
      <View style={styles.modalCurrentDiv}>
        <Text style={styles.modalTextHeading}>{t("MENU_COMPONENT.currentTitle")}</Text>
        <Text style={styles.modalTextPara}>{t("MENU_COMPONENT.cokeTitle")}</Text>
    </View>
    <SeparatorModal />
    <View style={styles.modalInnerFlexDiv}>
    <View style={styles.modalListFlexOuter}>
        <View style={{flex:2}}>
        <Text style={styles.modalOptionHeading}>Sushi Ceff | 95010243999 </Text>
        <Text style={styles.modalOptionPara}>Miami</Text>
        </View>
        <View style={{flex:1}}>
        <TouchableHighlight
        
        // color={"#FFFFFF"}
        underlayColor={'#F40000'}
        style={styles.roundRedButton}>
        
       <Text style={styles.whiteText}>Primary</Text>
     </TouchableHighlight>   
        </View>
    </View>
    </View>
    <SeparatorModal />
    <View style={styles.modalInnerDiv}>
        <View>
        <Text style={styles.modalOptionHeading}>Bistro Resto | 9001054876</Text>
        <Text style={styles.modalOptionPara}>Orlando</Text>
        </View>
    </View>
    <SeparatorModal />
    <View style={styles.modalInnerDiv}>
    <View>
        <Text style={styles.modalOptionHeading}>Willow-vale Diner | 8881014321</Text>
        <Text style={styles.modalOptionPara}>Miami</Text>
    </View>
    </View>
    <SeparatorModal />
    <View style={styles.modalInnerDiv}>
        <View>
        <Text style={styles.modalOptionHeading}>Fedex Office | 90220512222</Text>
        <Text style={styles.modalOptionPara}>Miami</Text>
        </View>
    </View>
    <SeparatorModal />
    <View style={styles.modalInnerDiv}>
        <View>
        <Text style={styles.modalOptionHeading}>Coke Florida Parcel | 0501024680</Text>
        <Text style={styles.modalOptionPara}>Thampa</Text>
        </View>
    </View>
    <SeparatorModal />
    <View style={styles.modalInnerDiv}>
        <View>
        <Text style={styles.modalOptionHeading}>Bento Cafe | 8111054888</Text>
        <Text style={styles.modalOptionPara}>Orlando</Text>
        </View>
    </View>
    <SeparatorModal />
    <View style={styles.modalInnerDiv}>
        <View>
        <Text style={styles.modalOptionHeading}>Bistro Cafe | 9001894610 </Text>
        <Text style={styles.modalOptionPara}>Thampa</Text>
        </View>
    </View>
    <SeparatorModal />
          </View>
          </View>
        </Modal>
       
      
          

            
      
     
     
    </View>
   

<MenuAccordian />


   </ScrollView>
   <View style={styles.bottom}>
                   <View style={styles.FooterStyle}>
     {/* Select Option */}
     <View style={{paddingHorizontal:10}}>
      <SelectList 
        setSelected={(val:any) => setSelected(val)} 
        data={language} 
        save="value"
        boxStyles={styles.selectboxsaluation}  
        dropdownStyles={{backgroundColor:"#FFFFFF",borderWidth:1,borderColor: '#DDDBDA'}}
        // dropdownItemStyles={{borderBottomWidth:0.8,borderBottomColor:"#DDDBDA"}}
        
        
      />
      </View>
   </View>
   </View>
   {loader &&  <Loader message="Please wait..." />}
   </View>

   
     
      
  );
};

export default MenuCompo;



