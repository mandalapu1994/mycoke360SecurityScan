import { StyleSheet, Dimensions } from "react-native";
import { FONT_FAMILY_G_REGULAR, FONT_FAMILY_I_REGULAR, ThemeColors } from "../../utils/Theme";

const styles :any= StyleSheet.create({

    bodyFlexStyle: {
        flex: 1,
        backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: FONT_FAMILY_I_REGULAR
    },

    myProfileStyle: {
        color: "#000000",
        fontSize: 26,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
       
    },

    myProfileHeader: {
        paddingLeft: 15,
        marginTop: 12,  
        paddingRight: 15,
        marginBottom: 12,
       
    },
   
    myProfileSmallText:{
        color: "#000000",
        fontSize: 16,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
       
    },
    prefferedHeader:{
        paddingLeft: 2,
        marginTop: 5,  
        paddingRight: 12,
        marginBottom: 12,
    },
    prefferedSmallText:{
        color: "#000000",
        fontSize: 14,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
       
    },
    myProfileInner: {
        flexDirection: "row",
        alignItems: "center"
    },

    projectListHeader: {
        paddingLeft: 12,
        marginTop: 0,
        paddingTop: 12,
        paddingRight: 12,
        marginBottom: 10,
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND
    },

    myProfileOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    projectListInnerHeader: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        paddingTop: 10,
        marginBottom: 10
    },
    searchOuterBox: {
        marginTop: 10,
        margin: 12

    },

    selectboxsaluation: {

        margin: 12,
        marginBottom: 0,
        height: 55,
        borderWidth: 1,
        borderColor: '#F8F8F8',
        backgroundColor: "#F8F8F8",
        borderRadius: 12
    },
    FilterOuterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 20,
        marginTop: 0,
        paddingTop: 12,
        paddingRight: 20,
        margin: 18,
        marginBottom: 10
    },
    smallTextStyle: {
        color: "#000000",
        fontSize: 14,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 20
    },
    BlockWhite: {
        marginTop: 0,
        marginLeft: 18,
        marginRight: 18,
        marginBottom: 20,
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
        borderRadius: 5,
        
    },
    productStyle: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15
    },
    smallTextPara: {
        color: "#000000",
        fontSize: 18,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 20,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12,
        paddingBottom: 0
    },
    productNumber: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,

    },
    productPara: {
        color: "#757575",
        fontSize: 12,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20

    },
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        backgroundColor: '#000000'

    },
    whiteText: {
        color: "#FFFFFF",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center'
    },
    shoppinglistOuter: {
        flexDirection: "row",
        marginTop: 0,
        alignItems: "center"
    },
    shoppinglistInner: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center"
    },
    shoppinglistPara: {
        color: "#000000",
        fontSize: 12,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20
    },
    orangeBoxDiv: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        margin: 10,
        backgroundColor: "rgba(239, 127, 0, 0.1)"
    },
    orangetext: {
        color: "#E65100",
        fontSize: 12,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 20
    },
    pinkBoxDiv: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        margin: 10,
        backgroundColor: "rgba(204, 51, 51, 0.1)"
    },
    redtext: {
        color: "#CC3333",
        fontSize: 12,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 20
    },

    showText: {
        color: "#000000",
        fontSize: 12,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20,
        textDecorationLine: "underline"
    },

    whiteBoxDiv: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        margin: 10,
        borderWidth: 1,
        borderColor: "#DDDBDA",
        backgroundColor: "#FFFFFF"
    },
    darkGrayText: {
        color: "#757575"
    },
    // Counter

    decrementButton: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: "#B3B3B3",
        borderTopStartRadius: 8,
        borderBottomStartRadius: 8
        // borderColor: '#E3E7ED',
        // borderWidth: 0.5,
        // backgroundColor: '#FFFFFF',
    },
    incrementButton: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderWidth: 1,
        borderColor: "#B3B3B3",
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8
        // borderColor: '#E3E7ED',
        // borderWidth: 0.5,
        // backgroundColor: '#FFFFFF',
    },
    incrementDecrementButtons: {
        width: 45,
        height: 45,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    incrementDecrementOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    incrementDecrementtextOuter: {
        width: 76,
        height: 45,
        borderColor: '#B3B3B3',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    incrementDecrementtext: {
        fontFamily:FONT_FAMILY_G_REGULAR,
        fontSize: 16,
        fontWeight: '400',
        color: '#313131',
        textAlign: 'center'
    },
    incrementDecrementButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#242424'
    },

    roundGrayButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        backgroundColor: '#B3B3B3'

    },
    grayText: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center'
    },
    viewBtnStyle: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15,
        margin: 20
    },

    roundWhiteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 30,
        backgroundColor: '#FFFFFF'

    },

    selectItemInner: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center"


    },


    // Horizontal Cards
    cardWhiteContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10

    },
    whiteCards: {
        width: 350,
        height: "100%",
        borderRadius: 5,
        marginHorizontal: 5
    },
    whiteCardelevated: {
        backgroundColor: "#FFFFFF",
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 10
    },
    viewText: {
        paddingLeft: 5,
        paddingBottom:10,
        paddingTop:5

    },
    separator: {
        marginVertical: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: '#EAEAEA'

    },
    productDetailOuter: {
        paddingTop: 0,
        padding: 20
    },
    productDetailsInner: {

        flexDirection: 'row',
        alignItems: "center",
        marginTop: 10
    },
    productDetailPara: {
        color: "#000000",
        fontSize: 18,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 20,
    },
    productParaBrand: {
        flex: 1
    },
    brandTitle: {
        color: "#757575",
        fontFamily:FONT_FAMILY_G_REGULAR,
        fontSize: 12,
        fontWeight: '600'

    },
    brandName: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 16,
        fontWeight: '600'

    },
    // tabOuter: {

    //     alignItems: 'center',
    //     flexDirection: 'row'
    // },
    productScroll: {
        margin: 15
    },
    scrollBorder: {
        borderWidth: 1,
        borderColor: "red",
        margin: 10
    },
    scrollWithoutBorder: {
        margin: 10
    },
    scrollImageStyle: {
        width: 120,
        height: 120,
        padding: 20
    },
    gapStyle: {
        margin: 5
    },
    gapFlexStyle: {
        marginLeft: 15,
        marginRight: 2
    },
    arrowButton: {
        paddingHorizontal: 10,
    },

    selectedImage: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#F40000",
        margin: 5
    },
    unselectedImage: {
        borderRadius: 4,
        margin: 5
    },
    selectedProductImg: {
        width: 200,
        height: 200,
        marginBottom: 30
    },
    itemQuantity: {
        fontWeight: "bold"
    },
    productScrollOuter:{ 
        flex: 1, 
        flexDirection: "row", 
        alignItems: "center" 
    },
    roundchangeButton:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 30,
        backgroundColor: '#000000'
 
    }


});

export default styles;
