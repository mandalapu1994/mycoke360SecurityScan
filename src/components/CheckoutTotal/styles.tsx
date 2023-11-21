import { StyleSheet } from "react-native";
import { FONT_FAMILY_I_REGULAR } from "../../utils/Theme";


const styles:any=StyleSheet.create({

    orderSummaryContainer: {
        backgroundColor: '#FFFFFF',

        // paddingHorizontal: 16,
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
        paddingHorizontal: 16,
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


})

export default styles