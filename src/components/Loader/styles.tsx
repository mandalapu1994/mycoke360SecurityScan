import { StyleSheet, Dimensions } from "react-native";
import { FONT_FAMILY_G_REGULAR, FONT_FAMILY_I_REGULAR, ThemeColors } from "../../utils/Theme";

const styles: any = StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.85)"
      },
      messageText : {
        color : "#fff",
        fontSize : 18
      }    
});

export default styles;