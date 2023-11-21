import {StyleSheet} from "react-native";
import { FONT_FAMILY_I_REGULAR } from "../../utils/Theme";

const styles:any = StyleSheet.create({
    footerContainer: {
        paddingTop: 10,
        backgroundColor: '#ffffff',
        borderTopWidth: 2,
        borderColor: "#EE0000",
        marginTop: 0

    },
    footerInnerContainer: {
        justifyContent: 'center',
        alignItems: 'center'

    },

    footerFlexContainer: {
        flexDirection: "row",  
        alignItems: "center",
        paddingTop: 0,
        marginBottom: 10
    },
    menuListStyle: {
        color: "#000000",
        fontSize: 16,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 20
    },
    separator: {
        marginVertical: 8,
        borderBottomWidth: 1,
        marginLeft: 18,
        marginRight: 18,
        borderBottomColor: '#B3B3B3'

    },
    copyRightText: {
        color: "#000000",
        fontSize: 11,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20
    },
    footerMenuStyle: {
        color: "#000000",
        fontSize: 11,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "600",
        lineHeight: 20,
        textDecorationLine: "underline"
    },
    imgfirstdiv: {
        width: "100%",
        height: 80,
        paddingVertical: 10,
        backgroundPosition: "center"
    },
    gapStyle: {
        margin: 5
    },
    gapFlexStyle: {
        margin: 10
    },
    gapFlexFooter: {
        marginLeft: 20,
        marginRight: 20,
        marginTop:0,
        marginBottom:5
    },
    gapFlex: {
        marginTop:5,
        marginBottom:5,
        marginLeft:5,
        marginRight:5
    },
});

export default styles;
