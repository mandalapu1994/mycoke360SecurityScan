
import { StyleSheet } from "react-native";

const styles:any = StyleSheet.create({
    orderSummaryMainWrap: {
        borderBottomColor: "#dddbda",
        width:"100%",
        padding:5,
        
    },
    totalInfoWrapper:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:25,
        paddingRight:25,
        borderBottomWidth:1,
        padding:5,
        borderStyle:"dashed",
        height:44,
        alignItems:"center",
        backgroundColor:"#F8F8F8",
        borderBottomColor:"#DDDBDA"

    },
    totalTxt:{
        fontWeight:"700",
        fontSize:16,
        color:"#000000",
        
    },
    contiShoppingMainWrapper:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ffffff"

    },
    finalAmtTxt:{
        fontSize:12

    },
    contiShoppingWrapper:{

        backgroundColor:"#000000",
        width:"95%",
        padding:8,
        borderRadius:25,
        marginTop:18
    },
    contiShoppingTxt:{
        fontWeight:"600",
        fontSize:14,
        lineHeight:20,
        color:"#ffffff",
        textAlign:"center"
    },
    parentContainer: {
   
        // Center content horizontally
       
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        // height: 30,
        // background:' #DFFBEF',
        borderWidth: 1 ,
        borderColor:  '#0C8359',
        borderRadius:8,
        alignItems:"center",
        backgroundColor:"#DFFBEF",
        marginTop:14,
        marginBottom:14,
        padding: 10
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
        textAlign:"center"
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
        marginLeft:10,
        alignItems:"center",
        backgroundColor:"yellow",
        
    },
    savedMoney:{
        color:"#0C8359",
        fontWeight:"800",
        textAlign:"center"
    },
    discountIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10
    },
    buttonGroup:{
        flexDirection: "row",
        alignItem: "center",
        justifyContent: "space-around",
        // backgroundColor:"green",

    },
    updatecartButton:{
        backgroundColor:"#fff",
         paddingVertical:14,    
        paddingHorizontal:20,
        borderRadius:25,
        marginTop:18,
        borderWidth: 1 ,
        borderColor:  '#000',
      
    },
    proceedCheckoutButton:{
        opacity:1,
        backgroundColor:"#000",
        paddingVertical:14,    
        paddingHorizontal:20,
        borderRadius:25,
      
        marginTop:18
    },
    disableProceedCheckoutButton:{
        opacity:0.5,
        backgroundColor:"#B3B3B3",
        paddingVertical:14,    
        paddingHorizontal:20,
        borderRadius:25,
      
        marginTop:18
    },
    blackTxt:{
        fontWeight:"600",
        fontSize:14,
        lineHeight:20,
        color:"#000",
        textAlign:"center"
    },
    whiteText:{
        fontWeight:"600",
        fontSize:14,
        lineHeight:20,
        color:"#fff",
        textAlign:"center"
    }


})
export default styles