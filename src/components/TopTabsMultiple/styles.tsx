import { StyleSheet, Dimensions } from "react-native";
import { FONT_FAMILY_I_BOLD } from "../../utils/Theme";

const styles:any = StyleSheet.create({
      buttonContainer: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 0
      },
      selectedBtn:{
        
        justifyContent:'center',
        alignItems:'center',
        
      },
      firstBtn:{
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,
      },
      lastBtn:{
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
      },
      buttonTextContainer: {
        fontFamily: FONT_FAMILY_I_BOLD,
        fontSize: 14,
        color: '#01182D',
        lineHeight: 17,
        textAlign:'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 13,
        paddingBottom: 13, 
        flexDirection:"row",
        alignItems:"center",
        marginRight:0   
      },
      selectedButtonTextContainer: {
        fontFamily: FONT_FAMILY_I_BOLD,
        fontSize: 14,
        color: '#EE0000',
        lineHeight: 17,
        textAlign:'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 13,
        paddingBottom: 13,   
        borderBottomWidth:2,
        borderColor:'#EE0000', 
        flexDirection:"row",
        alignItems:"center",
        marginRight:0   
      },
      selectedTextStyle:{
        color: '#EE0000',
      },
      listContainer:{
        width:'100%',
        // height: 50,
        marginTop: 0,
        marginBottom: 0
      },
});

export default styles;