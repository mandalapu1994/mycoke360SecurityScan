import { StyleSheet } from "react-native";
import { FONT_FAMILY_I_REGULAR, ThemeColors } from "../../utils/Theme";

const styles :any= StyleSheet.create({
    bodyFlexStyle: {
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: FONT_FAMILY_I_REGULAR,
        paddingVertical: 30,
        paddingHorizontal: 20,
    },

    parent: {
        flex: 1,
        alignItems: "center",
    },
    mainContainer: {
        flex: 1,
        backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
        width: '100%'
    },
    BlockWhite: {
        padding: 10,
        marginTop: 15,
        marginLeft: 18,
        marginRight: 18,
        marginBottom: 18,
        backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
        borderRadius: 5,
    },
    titleText: {
        color: "#000000",
        fontSize: 26,
        fontWeight: '600'
    },
    dateText: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "400",
        paddingVertical: 10
    },
    startingText: {
        color: '#000000',
        fontSize: 16,
        lineHeight: 22
    },
    boldText: {
        fontWeight: "bold"
    },
    childHeading: {
        fontSize: 16,
        color: '#000000',
        fontWeight: "600",
        paddingTop: 20
    },
    childText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: "400",
    },
    readMore: {
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        paddingTop: 2,
        color: '#000',
        alignSelf: 'flex-start'
    },
});

export default styles;
