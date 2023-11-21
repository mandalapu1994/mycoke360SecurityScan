import { StyleSheet } from "react-native";
import { FONT_FAMILY_I_REGULAR } from "../../utils/Theme";

const styles:any = StyleSheet.create({
    orderConfMainWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    orderConfInnerWrapper: {
        flex: 1,
        backgroundColor: "#ffffff",
        width: "95%",
        marginTop: 25,
    },
    orderInfoWrap: {
        flex: 1,
        alignItems: "center",

    },

    imgfirstdiv: {
        width: "100%",
        height: 80,
        paddingVertical: 10,
        backgroundPosition: "center"
    },
    confirmedImg: {
        backgroundColor: "#ffffff",
        marginTop: 30,
        position: "absolute",
        right: "45%",
        top: -20
    },
    orderPlacedTxtWrap: {

        alignItems: "center"

    },
    orderPlacedTxt: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000000"


    },
    emailReceivedTxt: {
        fontSize: 12

    },
    orderDateString: {
        lineHeight: 16,
        fontSize: 13,
        fontWeight: "500"
    },

    orderDateText: {
        fontSize: 13

    },
    orderDateMainWrapper: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        marginTop: 25,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderStyle: "dashed"
    },
    orderDateWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20

    },
    accountInfoTextWrap: {
        width: "100%",
        height: 44,
        backgroundColor: "#f8f8f8",
        flexDirection: "row",
        alignItems: "center",
      

        paddingLeft: 25,
        paddingRight: 25,
        borderBottomWidth: 1.2,
        borderBottomColor: "#dddbda",
    },

    userImg: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 25,

    },
    accountInfoTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000000",
        marginLeft: 25,

    },
    pickupOptnWrap: {
        display: "flex",
        alignSelf: "flex-start",
        paddingLeft: 25,
        marginTop: 20,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        width: "100%"
        
    },
    deliveryDatee: {
        display: "flex",
        alignSelf: "flex-start",
        paddingLeft: 25,
        marginTop: 20
    },
    dateString: {
        lineHeight: 16,
        fontSize: 12,
        fontWeight: '400'

    },
    deliveryDateTxt: {
        fontSize: 13,
        lineHeight: 18,
        color: "#000000",
        marginBottom: 27
    },
    shippingMethodWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 8

    },
    shippingMethodImg: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    shippingMethodMainWrapper: {
        width: "100%",
        paddingLeft: 25,
        marginTop: 12
    },
    shippingMethodTxt: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000000",
        marginLeft: 25,
    },
    pickupSubTxt: {
        fontSize: 13
    },
    paymentInfoWrapper: {
        display: "flex",
        alignSelf: "flex-start",
        paddingLeft: 25,
        marginTop: 20,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        width: "100%"
    },
    orderSummaryText: {
        marginTop: 20,
        width: "100%",
        height: 70,
        backgroundColor: "#ffffff",
        justifyContent: "space-between",

        alignItems: "center",
        paddingLeft: 25,
        flexDirection: "row",
        paddingRight: 25


    },
    orderHiglight: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000000"
    },
    downArrow: {
        width: 9,
        height: 9
    },
    orderSummaryContainer: {
        backgroundColor: '#FFFFFF',

        paddingHorizontal: 16,
        // paddingVertical: 10,
        marginTop: 20,
        width: "100%"
    },
    orderSummaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
        borderStyle: 'dashed',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "#DDDBDA",
        justifyContent: "space-between",
        paddingRight: 20
    },
    orderSummaryTitle: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
        
    },
    arrow: {
        fontSize: 18,
    },
    orderSummmaryContent: {
        // marginBottom: 16,
    },
    orderSummaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 20,
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
        paddingHorizontal: 20,
        paddingVertical: 3
    },
    total: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 16
    },
    finalAmount: {
        textAlign: 'center',
        // marginBottom: 4,
        fontFamily: FONT_FAMILY_I_REGULAR,
        color: '#000000',
        fontSize: 13
    },
    expandedContent: {
        // marginTop: 16,
        paddingVertical: 16,
    },
    expandedRow: {
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    parentContainer: {
   
        // Center content horizontally
       
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        width: 256,
        height: 30,
        background:' #DFFBEF',
        borderWidth: 1 ,
        borderColor:  '#0C8359',
        borderRadius:8,
        alignItems:"center",
        backgroundColor:"#DFFBEF"
    },
    savedOfferContainer: {
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
    },
    savedOffer: {
        borderWidth: 1,
        borderColor: '#0C8359',
        backgroundColor: '#DFFBFF',
        borderRadius: 8,
        padding: 10,
        alignSelf: 'flex-start', // Adjusts width to the content size
    },
    savedOfferContent: {
        flexDirection: 'row',
        alignItems: 'center', // Center content vertically
        padding: 8,
        justifyContent: "center",
      
    },
    savedOfferText: {
        marginLeft: 5,
        color: '#0C8359',
    },
    orderBoldText: {
        fontWeight: 'bold',
        color: '#000000'
    },
    valueZero: {
        color: '#B3B3B3'
    },
    offerText:{
        flexDirection:"row",
        marginLeft:10
    },
    savedMoney:{
        color:"#0C8359",
        fontWeight:"800"
    }






    // temp CSS





})
export default styles;