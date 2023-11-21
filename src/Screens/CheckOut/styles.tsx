import { StyleSheet } from "react-native";
import { FONT_FAMILY_G_REGULAR, FONT_FAMILY_I_REGULAR, ThemeColors } from "../../utils/Theme";

const styles:any = StyleSheet.create({
    bodyFlexStyle: {
        backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: FONT_FAMILY_I_REGULAR
    },
    heading: {
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
        paddingTop: 16,
        paddingLeft: 16
    },
    projectListHeader: {
        paddingLeft: 12,
        marginTop: 0,
        paddingTop: 12,
        paddingRight: 12,
        marginBottom: 10,
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND
    },

    projectListOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    projectListInnerHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        marginBottom: 10
    },
    gapStyle: {
        margin: 5
    },
    gapFlexStyle: {
        margin: 10
    },

    BlockWhite: {
        // marginTop: 15,
        marginLeft: 18,
        marginRight: 18,
        marginBottom: 18,
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
        borderRadius: 5,
    },
    productStyle: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15
    },
    checkOutHeader: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: "#DDDBDA"
    },
    headerText: {
        color: "#000000",
        fontSize: 16,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 18,
        paddingLeft: 5,
        paddingBottom: 0
    },
    smallText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: '700',
        fontFamily: FONT_FAMILY_I_REGULAR,
        lineHeight: 20,
        paddingLeft: 12,
        paddingTop: 12,
        paddingBottom: 0
    },
    cardDetails: {
        color: "#000000",
        fontSize: 12,
        fontWeight: '700',
        fontFamily: FONT_FAMILY_I_REGULAR,
        lineHeight: 16,
        paddingTop: 12,
        paddingBottom: 0
    },
    textHeading: {
        fontWeight: '800',
    },
    dataBox: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#DDDBDA",
        margin: 10,
    },
    dataBoxTop: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    smallTextPara: {
        color: "#000000",
        fontSize: 14,
        fontFamily: FONT_FAMILY_I_REGULAR,
        lineHeight: 20,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 14,
        paddingBottom: 0
    },
    input: {
        height: 40,
        marginHorizontal: 12,
        marginTop: 10,
        marginBottom: 18,
        borderWidth: 1,
        padding: 10,
        borderColor: "#DDDBDA",
        borderRadius: 5,
    },
    smallInput: {
        width: 270,
    },
    cvvInput: {
        width: 100,
        backgroundColor: '#FFFFFF',
        height: 40,
        marginHorizontal: 12,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        borderColor: "#DDDBDA",
        borderRadius: 5,
    },
    addressInput: {
        marginHorizontal: 12,
        marginVertical: 5,
        borderWidth: 1,
        padding: 10,
        borderColor: "#DDDBDA",
        borderRadius: 5,
        textAlignVertical: 'top'
    },
    ShippingAdd: {
        backgroundColor: '#F8F8F8',
        color: 'black'
    },
    shippingcontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#DDDBDA",
        margin: 10,
    },
    shippingImgContainer: {
        width: '15%',
        marginRight: 10,
        paddingVertical: 4,
    },
    shippingImg: {
        flex: 1,
        width: 50,
        height: 50,
        paddingVertical: 4
    },
    shippingTextContainer: {
        flex: 1,
        fontSize: 14,
        textAlign: 'left',
        lineHeight: 21,
        paddingRight: 20,
        color: '#3E3E3C'
    },
    shippingText: {
        color: '#000000',
    },
    infoText: {
        color: '#3E3E3C'
    },
    boldText: {
        fontWeight: 'bold',
    },
    redText: {
        color: '#F40000'
    },
    colorBold: {
        color: '#000000'
    },
    view: {
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        margin: 12,
        borderColor: '#DDDBDA',
    },
    activeView: {
        borderColor: '#F40000',
    },
    text: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 12,
        fontWeight: '500',
        // width: 85
    },
    termsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    icon: {
        width: '6%',
        marginLeft: 5,
        marginTop: 5,
        marginRight: 0,
        paddingRight: 0
    },
    savedCardsWrapper: {
        margin: 10,
        padding: 10,
        backgroundColor: "#F8F8F8",
        borderRadius: 5
    },
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    triggerText: {
        fontSize: 16,
        color: '#333',
    },
    arrowDown: {
        fontSize: 14,
        color: '#666',
        padding: 10,
        backgroundColor: 'blue',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    selectboxsaluation: {
        borderColor: '#B3B3B3',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        color: '#000000'
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#000000',
        marginLeft: 'auto',
        marginBottom: 10,
        fontSize: 14
    },
    roundButton: {
        borderRadius: 30,
        marginRight: 10,
        marginTop: 10,
        width: 120,
    },
    tempSubmitButton: {
        marginTop: 'auto',
    },
    squareButton: {
        width: 100,
    },
    whiteText: {
        color: "#FFFFFF",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center',
    },
    separator: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDBDA',
        marginHorizontal: 14

    },
    reviewOrderTitle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        margin: 5
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productInfoMainWrapper: {
        width: "100%",
    },
    productInfoWrapper: {
        width: "100%",
        flexDirection: "row",
        padding: 5,
        marginVertical: 20
    },
    productImg: {
        width: 80,
        height: 80,
        marginRight: 25
    },
    orderTitle: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#000000",
        flex: 1,
        textAlign: 'left',
        lineHeight: 17,
    },
    productInfoRight: {
        display: "flex",
        flexWrap: "wrap"
    },
    skuMainWrapper: {
        flexDirection: "row"
    },
    skuWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 3
    },
    upcWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 12
    },
    sectionSeperator: {
        marginLeft: 12,
        fontSize: 16
    },
    skuTxt: {
        fontSize: 12
    },
    skuNo: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#000000"
    },
    productPriceWrapper: {
        flexDirection: "row"
    },
    savedMoneyWrapper: {
        flexDirection: "row",
        marginLeft: 20,
        paddingTop: 1
    },
    productPriceTxt: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000000"
    },

    orderSummaryContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        // paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: 20
    },
    orderSummaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
        paddingHorizontal: 15,
        borderStyle: 'dashed',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "#DDDBDA"
    },
    orderSummaryTitle: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
        flex: 1,
    },
    orderSummmaryContent: {
        marginBottom: 16,
        // paddingHorizontal: 15
    },
    orderSummaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#F8F8F8',
        borderStyle: 'dashed',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "#DDDBDA"
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 3
    },
    total: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 16,
        paddingHorizontal: 5
    },
    finalAmount: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY_I_REGULAR,
        color: '#000000',
        fontSize: 13
    },
    expandedContent: {
        paddingVertical: 16,
    },
    expandedRow: {
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        marginHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    parentContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    savedOfferContent: {
        borderWidth: 1,
        borderColor: '#0C8359',
        backgroundColor: '#DFFBFF',
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    savedOfferText: {
        marginLeft: 5,
        color: '#0C8359'
    },
    orderBoldText: {
        fontWeight: 'bold',
        color: '#000000'
    },
    valueZero: {
        color: '#B3B3B3'
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DDDBDA',
    },
    dateText: {
        flex: 1,
        marginRight: 10,
        textAlign: 'left',
        color: '#000000',
        fontSize: 14,
        fontWeight: '700'
    },
    calendarIcon: {
        padding: 5,
        borderRadius: 5,
    },
    BlockAlert: {
        marginTop: 15,
        paddingLeft: 10,
        paddingRight: 18,
        marginBottom: 18,
        // backgroundColor: '#FFFCF5',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EFA432',
        flexDirection: 'row', backgroundColor: 'yellow'
    },
    alertBox: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#EFA432",
        marginHorizontal: 18,
        marginVertical: 15,
        backgroundColor: '#FFFCF5'
    },
    alertText: {
        color: "#000000",
        fontSize: 14,
        fontFamily: FONT_FAMILY_I_REGULAR,
        lineHeight: 20,
        paddingHorizontal: 12,
    },
    alertHeading: {
        color: "#000000",
        fontSize: 18,
        fontWeight: '700',
        fontFamily: FONT_FAMILY_I_REGULAR,
        lineHeight: 20,
        paddingLeft: 12,
        paddingRight: 12,
        // paddingTop: 14,
        paddingBottom: 0
    }
});

export default styles;
