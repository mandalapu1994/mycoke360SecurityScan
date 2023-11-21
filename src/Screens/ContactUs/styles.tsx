import { StyleSheet, Dimensions } from "react-native";
import { FONT_FAMILY_G_REGULAR, FONT_FAMILY_I_REGULAR, ThemeColors } from "../../utils/Theme";

const styles:any = StyleSheet.create({
    contactusHeader: {
        paddingLeft: 10,
        marginTop: 0,
        paddingTop: 0,
        paddingRight: 5,
        marginBottom: 0,
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND
    },
    contactusOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    contactusInnerHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        marginBottom: 10
    },
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        backgroundColor: '#000000'
    },
    whiteText: {
        color: "#FFFFFF",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center'
    },
    BlackText: {
        color: "#000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center'
    },
    contactusPara: {
        color: "#000000",
        fontSize: 16,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20
    },
    background: {

        // backgroundColor: "#BBD1E9",
        width: '100%',


    },
    mainContainer: {
        margin: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
        // minHeight: 800,
        padding: 14,
        paddingVertical: 20



    },
    contactHeading: {
        color: "#000000",
        fontSize: 30,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 40,
        marginVertical: 15,
        letterSpacing: -0.03,
        fontStyle: "normal"
    },
    subHeadingCommonbox: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: 30

    },
    commonHeading: {
        fontSize: 20,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        color: "#000",
        paddingHorizontal: 10
    },
    countbox: {
        backgroundColor: "#BBD1E9",
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderRadius: 30,
    },
    count: {
        fontSize: 16,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        color: "#000"
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#DDDBDA",
        fontSize: 16,
        //  backgroundColor: "#F8F8F8"
    },
    inputContainer: {
        marginVertical: 10
    },
    label: {
        color: "#000",
        marginBottom: 5
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        // color: '#333',
    },
    selectboxsaluation: {
        borderColor: '#B3B3B3',
        backgroundColor:  ThemeColors.THEME_WHITE_BACKGROUND,
        borderWidth: 1,
        borderRadius: 8,
        color: "#000",
        
    },
    optionText:{
        color: "#000",
        fontSize: 16,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "400",
        lineHeight:16,
          
      
    },
    dropDownStyle: {
        backgroundColor:  ThemeColors.THEME_WHITE_BACKGROUND,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dropdownItem: {
        borderBottomWidth: 0.8,
        borderBottomColor: "#DDDBDA",
        color: '#000',
        paddingVertical:12
    },
    multibuttons: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    mButton: {
        justifyContent: "center",
        alignItems: "center",
        color: "#000",
        borderWidth: 1,
        // paddingHorizontal: 30,
        paddingVertical: 10,
        borderColor: "gray",
        // flex:1,
        width:"33%"

    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start",
        marginVertical: 20

    },
    checkBoxText: {
        color: "#000",
        fontWeight: '400'

    },
    datebox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 0,
        margin: 0,
        width: "100%",
        marginVertical: 5

    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        width: '43%',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    dateText: {
        flex: 1,
        marginRight: 10,
        textAlign: 'left',
        color: '#000000',
        fontSize: 14,
        fontWeight: '500'
    },
    calendarIcon: {
        padding: 5,
        borderRadius: 5,
        // backgroundColor: '#e0e0e0',
    },

    messageInput: {
        color: "gray",
        padding: 10,
        borderRadius: 5,
        borderColor: "#DDDBDA",
        fontSize: 16,
        borderWidth: 1,
        textAlignVertical: "top"

    },
    messageBox: {

        borderBottomColor: '#000000',
        borderBottomWidth: 1,

    },
    messageCount: {
        fontSize: 10,
        fontWeight: '400'
    },
    submitRoundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 38,
        backgroundColor: '#000000',
        width: 99
    },
    submit: {

        lineHeight: 20,
        letterSpacing: 0.03,

        fontFamily: FONT_FAMILY_I_REGULAR,
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center'

    },
    submitDisable: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 38,
        backgroundColor: '#DDDBDA',
        width: 99
    },
    supportText: {
        fontSize: 14,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "500",
        color: "#000",
        paddingHorizontal: 10,
        lineHeight: 17,
        marginVertical: 20
    },
    callUsBox: {
        backgroundColor: '#F8F8F8',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginBottom: 0,
        paddingHorizontal: 30,
        paddingVertical: 23.5


    },
    callusText: {
        fontSize: 32,
        fontFamily:FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        color: "#000",
        paddingHorizontal: 10,
        lineHeight: 39,
        // marginVertical:20
    },
    callTimeText: {
        fontSize: 14,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        color: "#000",
        paddingHorizontal: 10,
        lineHeight: 24,
        letterSpacing: 0.01,
        width: 277
    },
    boldText: {
        fontWeight: "800",
        color:"#000"

    },
    countryText: {
        fontSize: 24,
        fontFamily:FONT_FAMILY_I_REGULAR,
        fontWeight: "100",
        color: "#000",
        paddingHorizontal: 10,

    },
    countryText2: {
        fontSize: 24,
        fontFamily:FONT_FAMILY_I_REGULAR,
        fontWeight: "400",
        color: "#000",
        paddingHorizontal: 10,


    },
    disabled: {
        color: '#DDDBDA',
        borderColor: "#DDDBDA"
    },
    reciveContainer: {
        paddingHorizontal: 28,
        paddingVertical: 30,
        backgroundColor: '#fff',
        margin: 20
    },
    resiveBoxTitel: {
        color: "#000000",
        fontSize: 24,
        fontFamily:FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 30,
        marginRight:5,

        letterSpacing: -0.03,
        fontStyle: "normal"
    },
    resiveCstText: {
        color: "#000000",
        fontSize: 12,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "700",
        lineHeight: 14,
        textDecorationLine: "underline",

        letterSpacing: -0.03,
        fontStyle: "normal"
    },
    flexbox: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    resiveText:{
        color: "#000000",
        fontSize: 10,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "700",
        lineHeight: 12,
        textDecorationLine: "underline",
        letterSpacing: -0.03,
        fontStyle: "normal",
        marginLeft:10,
       
    },
    backHistoryText:{
        color: "#000000",
        fontSize: 12,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "700",
        lineHeight: 20,
        textDecorationLine: "underline",
        letterSpacing: -0.03,
        fontStyle: "normal",
       
       
    },
    greenBox:{
    borderColor:"#5E9F1A",
    borderWidth:1,
    borderRadius:5,
    flexDirection:"row",
    alignItems:"center",
    padding:8,
    backgroundColor:"#F1FFE2",
    marginTop:29

    },
    serviceInfoText:{
        color: "#000000",
        fontSize: 13,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "500",
        lineHeight: 13,
       
        letterSpacing: 0.01,
        fontStyle: "normal",
       marginVertical:29
    },
    newTikitButton:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 11,
        paddingBottom: 11,
        borderRadius: 30,
        borderWidth:1,
       
    },
    container: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: "green",
        paddingHorizontal:0,
        justifyContent:"space-between"
      },
      selectWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 4,
        // paddingHorizontal: 10,
        position: 'relative',
      },
      dselectboxsaluation: {
        flex: 1,
        height: 42,
        width:140,
        fontSize: 12,
       
        backgroundColor:  ThemeColors.THEME_WHITE_BACKGROUND,
       borderWidth: 1,
        borderColor: '#ccc',
        color: "#000",
        alignItems:"center",
        
      },
        dselectboxsaluation2: {
        flex: 1,
        height: 42,
        width:140,
        fontSize: 12,
       
        backgroundColor:  ThemeColors.THEME_WHITE_BACKGROUND,
       borderWidth: 1,
        borderColor: '#ccc',
        color: "#000",
        alignItems:"center",
        justifyContent: "center" 
      },
      optionText2: {
        color: "#000",
        fontSize: 13,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "400",
        lineHeight:14,
        alignItems:"center",
        justifyContent:"center"
      },
      dropdownStyles: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginTop: 4,
        backgroundColor:  ThemeColors.THEME_WHITE_BACKGROUND,
        // height: 262,
        maxHeight: 240,
        
      },
      disabledOverlay: {
        ...StyleSheet.absoluteFillObject,
     
        borderRadius: 4,
        borderColor: '#B3B3B3',
        borderWidth: 1,
        marginHorizontal:0,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"gray",opacity:0.1
      },
    gapStyle: {
        margin: 5
    },
    gapFlexStyle: {
        margin: 10
    }
});

export default styles;
