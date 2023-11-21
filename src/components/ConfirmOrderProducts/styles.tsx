import {StyleSheet, Dimensions} from "react-native";

const styles:any = StyleSheet.create({
    productInfoMainWrapper:{
        width:"100%",   
    },

    productInfoWrapper:{
        width:"100%",
        
        flexDirection:"row",
        borderBottomWidth:1.2,
        borderBottomColor:"#dddbda",
        padding:18,
        marginBottom:5,
        // backgroundColor:"yellow"
    },
    productImg:{
        width:80,
        height:80,  
        marginRight:20,
       
    },
    orderTitle:{
        fontWeight:"bold",
        fontSize:14,
        color:"#000000"
    },
    productInfoRight:{
       
        flexWrap:"wrap",
        // paddingRight:5,
        
    },
    skuMainWrapper:{
        flexDirection:"row"

    },
    skuWrapper:{
        flexDirection:"row",
        alignItems:"center",
      
    },
    upcWrapper:{
        flexDirection:"row",
        alignItems:"center",
        marginLeft:18,
       

    },
    sectionSeperator:{
        marginLeft:19,
        fontSize:18
    },
    skuTxt:{
        fontSize:12
    },
    skuNo:{
        fontSize:12,
        fontWeight:"bold",
        color:"#000000"
    },
    productPriceWrapper:{
        flexDirection:"row",
        alignItems:"center"

    },
    savedMoneyWrapper:{
        flexDirection:"row",
        marginLeft:20
    },
    productPriceTxt:{
        fontWeight:"bold",
        fontSize:16,
        color:"#000000"
       
    },
    moneySaved:{
        fontSize:12
    }




})
export default styles