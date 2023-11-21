import { StyleSheet } from "react-native";
import { FONT_FAMILY_I_BOLD, FONT_FAMILY_I_REGULAR, ThemeColors, FONT_FAMILY_G_REGULAR } from "../../utils/Theme";

const styles :any= StyleSheet.create({
    SupportHistoryMainWrap: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
        // alignItems:"center"
    },
    supportHistoryContentWrap: {
        flex: 1,
        width: "90%",
        // backgroundColor:"yellow"

    },
    ticketWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    },
    newEquipTicketWrapper: {
        backgroundColor: "#000000",
        width: 167,
        borderRadius: 25,
        padding: 10,
        marginRight: 10

    },
    createTicketOuter: {
        backgroundColor: "#000000",
        width: 120,
        padding: 8,
        borderRadius: 25

    },

    newCustomerTicketWrapper: {
        backgroundColor: "#000000",
        width: 167,
        borderRadius: 25,
        padding: 10,

    },
    ticketText: {
        color: "#ffffff",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 12
    },
    supportHistoryTxtWrapper: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    supportHistoryTxt: {
        fontSize: 25,
        fontWeight: "600",
        color: "#000000",
        lineHeight: 40,

    },

    sectionWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    equiServiceWrapper: {
        width: "50%",
        padding: 8,
        backgroundColor: "#000000",
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6

    },
    equiServiceWrapperToggle: {
        width: "50%",
        padding: 8,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6

    },

    customerSupportWrapper: {
        width: "50%",
        padding: 8,
        backgroundColor: "#ffffff",
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6

    },
    customerSupportWrapperToggle: {
        width: "50%",
        padding: 8,
        backgroundColor: "#000000"


    },

    equipServiceTxt: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: 14
    },
    equipServiceTxtToggle: {
        textAlign: "center",
        color: "#000000",
        fontSize: 14
    },

    customerText: {
        textAlign: "center",
        fontSize: 14,
        color: "#000000",
        fontWeight: "600"


    },
    customerTextToggle: {
        textAlign: "center",
        fontSize: 14,
        color: "#ffffff",
        fontWeight: "600"
    },
    searchbar: {
        marginTop: 16
    },
    filterIconWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10,
        marginTop: 27,
        marginBottom: 20,

    },
    historyWrapper: {
        flex: 1,
    },
    historyContentHolder: {
        flex: 1,
        backgroundColor: "#ffffff",
        // paddingLeft:20
        padding: 20
    },
    caseNo: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: "600",
        color: "#000000",
        marginBottom: 5
    },

    historyKeyValueWrapper: {

        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: 10

    },
    keyWrapper: {
        width: "50%",
        // marginLeft:10

    },
    valueWrapper: {
        width: "50%",
        marginLeft: 5,


    },
    historyKey: {
        fontSize: 14,
        color: "#000000",

    },
    statusString: {
        fontSize: 14,
        color: "#000000",
        // backgroundColor:"green",
        textAlign: "left",
        paddingLeft: 20,
        backgroundColor: "#DAFBF0",

    },
    statusWrapper: {
        backgroundColor: "#DAFBF0",
        width: 100,
        alignItems: "center",

        padding: 6,
        borderRadius: 8

    },
    statusTxt: {
        fontSize: 12,
        color: "#7C154B",
        textAlign: "center"
    },
    showLessWrapper: {
        backgroundColor: "#ffffff",
        alignItems: "center",
        padding: 10,
        width: 120,
        marginTop: 20,
        alignSelf: "center",
        borderRadius: 25,
        marginBottom: 10
    },
    lessMoreTxt: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000000"
    },
    supportHistoryContentHolder: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    equipModalMainWrapper: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        padding: 20,

    },
    equipContentWrapper: {
        flex: 1,
        // alignItems:"center",
        // backgroundColor:"yellow",
        width: "100%",
        padding: 2

    },
    equipNoWrapper: {
        width: "100%",
        flexDirection: "row",
        // backgroundColor:"green",
        // justifyContent:"space-between",
        alignItems: "center",
        marginBottom: 20

    },
    equipDetails: {
        marginRight: 'auto',
        flexDirection: "row",
        alignItems: "center"

    },
    caseNoDetails: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: "600",
        color: "#000000",
        marginRight: 20
    },
    closeIcon: {

        // backgroundColor:"green",
        marginLeft: 10,
    },
    lastModifiedWrapper: {
        backgroundColor: "#DDDBDA",
        padding: 10,
        width: "100%",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#757575",
        marginBottom: 20
    },
    lastModifiedTxt: {
        color: "#757575",

    },
    cancelTicketMainWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 30,

    },

    cancelTicketWrapper: {
        padding: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000000",
        backgroundColor: "#ffffff",
        paddingRight: 24,
        paddingLeft: 24,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center"
    },

    rescheduleWrapper: {
        padding: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000000",
        backgroundColor: "#000000",
        paddingRight: 24,
        paddingLeft: 24,
        paddingBottom: 10,
        paddingTop: 10

    },
    cancelTicketTxt: {
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontSize: 14,
        fontWeight: "700",
        color: "#000000",
        letterSpacing: 0.42,
        textAlign: "center",
    },
    cancelTicketTitle: {
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontSize: 30,
        fontWeight: "500",
        color: "#000000",
        letterSpacing: -0.9,
        textAlign: "center",


    },
    rescheduleTxt: {
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontSize: 14,
        fontWeight: "700",
        color: "#ffffff",
        textAlign: "center",
        letterSpacing: 0.42
    },
    cancelModalMainWrapper: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',



    },
    cancelTicketHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: "95%"
    },
    reasonTxt: {
        fontSize: 12,
        fontFamily: FONT_FAMILY_I_REGULAR,
        letterSpacing: 0.12,
        marginBottom: 10
    },
    cancelModalBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 25,
        backgroundColor: "#ffffff",
        marginRight: 10
    },
    confirmBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 25,
        backgroundColor: "#000000"
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 20,
        marginTop: 30

    },
    mButton: {
        justifyContent: "center",
        alignItems: "center",
        color: "#000",
        borderWidth: 1,
        paddingHorizontal: 26,
        paddingVertical: 10,
        borderColor: "gray",

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
    label: {
        color: "#000",
        marginBottom: 5
    },
    dropDownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: "green",
        paddingHorizontal: 0,
        justifyContent: "space-between"
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
        // flex: 1,
        height: 42,
        width: 140,
        fontSize: 12,
        // borderColor: '#B3B3B3',
        borderWidth: 1,
        borderColor: '#ccc',
        color: "#000",
    },
    optionText2: {
        color: "#000",
        fontSize: 13,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "400",
    },
    dropdownStyles: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 99,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginTop: 4,
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
        // height: 262,
        maxHeight: 240,

    },
    disabledOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 4,
        borderColor: '#B3B3B3',
        borderWidth: 1,
        marginHorizontal: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        opacity: 0.1
    },
    gapFlexStyle: {
        margin: 10
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
    messageCount: {
        fontSize: 10,
        fontWeight: '400'
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
    whiteText: {
        color: "#FFFFFF",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center'
    },
    multibuttons: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    availabilityWrapper: {
        borderColor: '#DDDBDA',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 5,
    },
    bodyFlexStyle: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: FONT_FAMILY_I_REGULAR
    },
    filterHeader: {
        paddingLeft: 12,
        marginTop: 0,
        paddingTop: 12,
        paddingRight: 12,
        marginBottom: 10,
        backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND
    },
    filterInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    filterHeaderData: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        marginBottom: 10
    },
    gapStyle: {
        margin: 5
    },
    filterTextStyle: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center'
    },

    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 8,
        borderRadius: 30,
        backgroundColor: '#000000'

    },
    resetButton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 8,
        borderRadius: 30,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#fff',
        marginVertical: 15,
        alignSelf: 'flex-end',
        marginHorizontal: 15

    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DDDBDA',
    },
    dateText: {
        flex: 1,
        marginRight: 10,
        textAlign: 'left',
        color: '#000000',
        fontSize: 14,
        fontWeight: '700'
    },
    calendarIcon: {
        padding: 5,
        borderRadius: 5,
    },
    blackText: {
        color: "#000000",
        fontFamily: FONT_FAMILY_G_REGULAR,
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center'
    },
    filerMain: {
        borderBottomWidth: 1,
        borderColor: '#DDDBDA',
    },
    caseStatusCotainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#DDDBDA',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dateRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderColor: '#DDDBDA',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    filterHeading: {
        fontSize: 16,
        // color: '#F40000',
        fontWeight: '700',
        paddingLeft: 15
    },
    checkBoxWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateMain: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 12
    },
    dateTopText: {
        color: "#000000",
        lineHeight: 20,
        paddingLeft: 12,
        paddingTop: 12,
        paddingBottom: 0
    },
    caseStatusWrapper: {
        borderBottomWidth: 1,
        borderColor: '#DDDBDA',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    filterListMainWrapper:{
        marginBottom:14

    },

    filterListWrapper: {
        backgroundColor: '#FFF',
        marginHorizontal: 4,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterText: {
        color: '#000'
    },
    crossWrapper: {
        marginHorizontal: 8
    },
    footerWidthStyle:{
        width:"100%" ,
        margin:0}
})

export default styles