import { StyleSheet } from "react-native";
import { FONT_FAMILY_G_REGULAR, FONT_FAMILY_I_REGULAR, ThemeColors } from "../../utils/Theme";

const styles:any = StyleSheet.create({

    bodyFlexStyle: {
        flex: 1,
        backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: FONT_FAMILY_I_REGULAR
    },

    projectListHeader: {
        paddingLeft: 12,
        marginTop: 0,
        paddingTop: 5,
        paddingRight: 12,
        marginBottom: 5,
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND
    },

    projectListOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    projectListInnerHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 0,
        marginBottom: 0
    },
    searchOuterBox: {
        marginTop: 10,
        margin: 15

    },

    // selectboxsaluation: {

    //     marginLeft: 15,
    //     marginRight: 15,
    //     marginBottom: 0,
    //     borderWidth: 1,
    //     borderColor: '#F8F8F8',
    //     backgroundColor: "#F8F8F8",
    //     borderRadius: 12
    // },
    FilterOuterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 20,
        marginTop: 0,
        paddingTop: 12,
        paddingRight: 20,
        marginLeft: 18,
        marginRight: 18,

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
        marginBottom: 18,
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
        borderRadius: 5,
        paddingBottom: 20
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
    roundRedButton: {

        padding: 5,
        width: 80,
        borderRadius: 30,
        backgroundColor: '#F40000'

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
        color: "#757575",
    },
    // Counter

    decrementButton: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        // borderColor: '#E3E7ED',
        // borderWidth: 0.5,
        // backgroundColor: '#FFFFFF',
    },
    incrementButton: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        // borderColor: '#E3E7ED',
        // borderWidth: 0.5,
        // backgroundColor: '#FFFFFF',
    },
    incrementDecrementButtons: {
        width: 45,
        height: 45,
        backgroundColor: '#E4E4E4',
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
        width: 45,
        height: 45,
        borderColor: '#E3E7ED',
        borderTopWidth: 1,
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    incrementDecrementtext: {
        fontFamily: FONT_FAMILY_G_REGULAR,
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
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        backgroundColor: '#FFFFFF'

    },

    selectItemInner: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",

    },
    tabOuter: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    gapStyle: {
        margin: 5
    },
    gapFlexStyle: {
        margin: 10
    },
    currentTextStyle: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 20

    },
    currentTextPara: {
        color: "#000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 20

    },
    separator: {
        marginVertical: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DDDBDA'

    },
    separatorModal: {
        marginVertical: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDBDA'

    },
    sortInnerDiv: {
        paddingLeft: 12,
        marginTop: 0,
        paddingTop: 12,
        paddingRight: 12,
        marginBottom: 10,
    },
    sortTextPara: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '500',
        borderBottomWidth: 1,
        borderBottomColor: "red"


    },
    accordTitle: {
        color: "#000000",
        fontSize: 16,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20,
    },

    modal: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        margin: 20
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
    },


    bottom: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        width: "100%",
        left: 0,
        right: 0,
        padding: 10,

    },
    selectboxsaluation: {
        borderWidth: 1,
        borderColor: '#DDDBDA',
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        color: "#000",
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600"

    },
    accordianTxt: {
        padding: 10,
        paddingLeft: 20,
        color: "#000000",
        fontSize: 14,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20
    },
    accordianTxtTwo: {
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        color: "#000000",
        fontSize: 14,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20
    },

    FooterStyle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderRadius: 10,

    },

    modalListOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 15
    },
    modalListFlexOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",

    },
    modalTitle: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 20
    },
    modalCurrentDiv: {
        paddingLeft: 15,
        marginTop: 0,
        paddingTop: 12,
        paddingRight: 12,
        marginBottom: 10,
    },
    modalInnerDiv: {
        paddingLeft: 35,
        marginTop: 0,
        paddingTop: 12,
        paddingRight: 12,
        marginBottom: 10,
    },
    modalInnerFlexDiv: {
        flex: 1,
        // paddingLeft: 30,
        marginTop: 0,
        paddingTop: 12,
        paddingRight: 0,
        marginBottom: 10,
        width: "90%",
        alignSelf: "flex-end",
        // backgroundColor:"green"


    },
    checkedWrapper: {
        width: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    modalTextHeading: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 12,
        fontWeight: '500',
    },
    modalTextPara: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '600',

    },
    modalOptionHeading: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '500',
    },
    modalOptionPara: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '400',
    },
    accountlistWrapper: {
        alignItems: "center",
        // justifyContent:"center"
        flex: 1,
        // backgroundColor:"yellow",
        flexDirection: "row",
        width: "100%"
    }


})
export default styles;