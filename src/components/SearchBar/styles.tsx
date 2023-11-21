import { StyleSheet, Dimensions, Platform } from "react-native";

const styles :any= StyleSheet.create({
    searchContainer:{
        flexDirection:'row',
        width: "100%",
        borderWidth: 1,
        borderColor: '#F8F8F8',
        backgroundColor:"#F8F8F8",
        borderRadius: 12,
        paddingTop: Platform.OS === "android" ? 5 : 10,
        paddingBottom: Platform.OS === "android" ? 0 : 10
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