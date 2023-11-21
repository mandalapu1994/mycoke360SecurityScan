import { StyleSheet } from "react-native";
import { FONT_FAMILY_I_REGULAR, ThemeColors } from "../../utils/Theme";

const styles :any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
    paddingHorizontal:10,
    paddingVertical:30
},
heading:{
    color: "#000000",
    fontSize: 26,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "500",
    lineHeight: 31,
  
},
headerBox:{
    flex: 1,
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
},
subHeading:{
    color: "#000000",
    fontSize: 16,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "700",
    lineHeight: 24,
    marginVertical:20,
    letterSpacing:0.1
},
input: {
    height: 40,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 5,
    borderColor: "#DDDBDA",
    fontSize: 16,
    // backgroundColor: "#F8F8F8"
},
inputContainer: {
    marginVertical: 10
},
label: {
    color: '#3E3E3C',
    marginBottom: 5
},
divider:{
    borderBottomColor:"#EAEAEA",
    borderWidth:1,
    opacity:0.1,
   marginTop:20
    

},
checkbox:{
    // transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }], 
    width:20,
    height:20
  },
  remiderBox:{
    flex:1,
    flexDirection:"row",
    justifyContent:"flex-start",
    marginVertical:20
  },
  smallHeading:{
    color: "#000000",
    fontSize: 16,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "500",
    lineHeight: 20,
    
  },
  simpleText:{
    color:"#757575",
    fontSize: 14,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "500",
    lineHeight: 20,
  },
  remiderTextBox:{
    marginLeft:20,
    flex:1,
    paddingRight:1,
    
  },
  cancelButton:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 30,
    borderWidth:1,
    borderColor:"#000",
    marginRight:15

  },updateButton:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 30,
    backgroundColor: '#000000'

  },
  buttonBox:{
flexDirection:"row",
justifyContent:"flex-end"
  },
  buttonText:{
    fontSize: 14,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "700",
    lineHeight: 20,
  }

});

export default styles;