import React, { useRef, useState, PropsWithChildren, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    Image,
    DeviceEventEmitter
} from 'react-native';
import ActionSheet, {
    ActionSheetRef,
    SheetManager,
    SheetProps,
    useScrollHandlers,
} from 'react-native-actions-sheet';
import { FONT_FAMILY_G_REGULAR, FONT_FAMILY_G_SEMIBOLD, FONT_FAMILY_I_REGULAR, ThemeColors } from "../../utils/Theme";


import UpBlackArrow from "../../assets/images/UpBlackArrow";
import DownBlackArrow from "../../assets/images/DownBlackArrow";
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from "react-i18next";
import Close from "../../assets/images/Close"
import { useDispatch, useSelector } from 'react-redux';
import { addFilters, addSort } from '../../redux/Reducer/filtersReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET__PRODUCT_CATEGORY } from '../../redux/Reducer/searchReducer';
import { getCategoryList } from '../../Api/apiService';



type AccordionItemPros = PropsWithChildren<{
    title: any,
    children: any,
    style: any
}>;


function AccordionItem({ children, title, style }: AccordionItemPros): JSX.Element {
 
    const [expanded, setExpanded] = useState(false);
    
  
    function toggleItem() {
        setExpanded(!expanded);

    }

    const body = <View style={styles.accordBody}>{children}</View>;

    const closeSheet = () => {
        SheetManager.hide('ProductCategory');
    }

    return (
        <View>

            <View style={styles.accordHeader} >
                <View style={[styles.projectListOuter, { flex: 1 }]}>
                    <View style={styles.accordianflex}>
                        <View style={styles.projectListOuter}>
                            {/* <View style={styles.gapStyle}>
                                <Image source={require('../../assets/images/AvatarImage.png')} />
                            </View> */}
                            <View style={styles.gapStyle}>
                                <Text style={{
                                    color: "#000000",
                                    fontSize: 16,
                                    paddingLeft: 5,
                                    fontFamily: 'Inter-Regular',
                                    fontWeight: "800",
                                    lineHeight: 20,
                                }}>{title}</Text>
                            </View>
                        </View>

                    </View>
                    <View >
                        <TouchableOpacity
                            onPress={closeSheet}>
                            <Text style={{ fontWeight: "bold" }}>  <Close /></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {body}

        </View>
    );
}








function ProductCategorySheet() {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
    const PLP_Category = useSelector((state:any) => state.search.productCategory);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const Separator = () => <View style={styles.separator} />;
    // const [category,setCategory] = useState( []);
  console.log("AsyncStorage.getItem(productCategory)",AsyncStorage.getItem("productCategory"))
    //This Data is For Select Option
    const categoryList = useSelector((state: any) => state.search.categoryList);

    // console.log("categoryList.>>>>>",categoryList)
    
    // const getProductCategory=async()=>{
    //    let list =await AsyncStorage.getItem("productCategory")
    //    let ParceList =  list !=null ? JSON.parse(list) : []
    //    setCategory(ParceList)
    // }

useEffect(()=>{
    // getProductCategory()
    // getCategoryList(dispatch)
},[])

useEffect(()=>{
},[categoryList])

const setProductCategory=(item:any)=>{

    let obj ={
        id:item.id,
        Name: item.fields.Name
    }
    console.log(">>>>>setProductCategory",obj)
    dispatch(SET__PRODUCT_CATEGORY(obj));
    dispatch(addFilters([]));
    addFilters
    SheetManager.hide('ProductCategory');
  
}
    return (
        <ActionSheet
            // id={sheetId}
            ref={actionSheetRef}
            //   onBeforeShow={() => {
            //     console.log('sheet payload', payload?.data);
            //   }}
            //   snapPoints={[]}
            containerStyle={{height:'75%'}}
            initialSnapIndex={0}
            statusBarTranslucent
            drawUnderStatusBar={true}
            gestureEnabled={true}
            defaultOverlayOpacity={0.3}>
            <View
                style={{

                    maxHeight: '100%',
                    paddingBottom: 20
                }}>
                <AccordionItem title="Select Products" style={styles.sortTextPara}>
                        <Separator />
                    </AccordionItem>
                <ScrollView {...scrollHandlers} style={styles.scrollview}>
                    <View style={{paddingBottom:25}}>
                        {
                           categoryList.length > 0 && categoryList.map((item: any, i: any) => {
                                return (
                                    <TouchableOpacity
                                     onPress={() => setProductCategory(item)} key={i}
                                    >
                                        <Text style={[styles.accordianTxt,{fontWeight:PLP_Category?.Name == item.fields.Name ? "800" :"600"}]}>{item.fields.Name}</Text>
                                        <Separator />
                                    </TouchableOpacity>)
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({



    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    scrollview: {
        width: '100%',
       

    },
    sortTextPara: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '500',

    },
    accordianTxt: {
        padding: 10,
        paddingLeft: 20,
        color: "#000000",
        paddingVertical: 15,
        fontSize: 14,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20
    },
    accordianflex: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    accordHeader: {
        color: "#01182D",
        fontWeight: "600",
        fontSize: 14,
        margin: 8,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },

    accordBody: {
        padding: 0
    },
    projectListOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDDBDA'
    },
    // Accordian Background
    gapStyle: {
        margin: 5
    },


});

export default ProductCategorySheet;













