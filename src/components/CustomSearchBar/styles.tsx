import { StyleSheet, Dimensions } from "react-native";

const styles :any= StyleSheet.create({
    searchContainer:{
        flexDirection:'row',
        width: "100%",
        backgroundColor:"#FFFFFF",
       
    },
    searchIconOuter:{
        width: '10%',
        justifyContent:'center',
        alignItems:'center',
    },
    closeIconOuter:{
        width: '10%',
        justifyContent:'center',
        alignItems:'center'
    },
    searchInput:{
        width: '80%'
    },
    inputDetails:{
        color: '#01182D',
        fontSize: 14
    }
});

export default styles;