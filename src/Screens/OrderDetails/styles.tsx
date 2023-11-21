import { StyleSheet, Dimensions } from "react-native";
import { ThemeColors } from "../../utils/Theme";

const screenWidth = Dimensions.get("window").width
const styles :any= StyleSheet.create({

    orderDetailsMainWrapper: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        // justifyContent:"center"
    },
    orderDetailsInnerWrapper: {
        flex: 1,
        backgroundColor: "#ffffff",
        width: "95%",
        marginTop: 25,

    },
    orderInfoWrap: {
        flex: 1,

        // alignItems: "center",


    },
    sectionSeperator: {
        width: 56,
        height: 2.55,
        backgroundColor: '#DDDBDA',

    },

    sectionSeperator2: {
        width: 56,
        height: 2.55,
        backgroundColor: '#DDDBDA',
        marginLeft: -10

    },
    unTrackedOrderProgress: {
        width: 15,
        height: 15,
        backgroundColor: '#DDDBDA',
        borderRadius: 25,
        marginRight: 5,
        marginBottom: 12


    },
    completedProcess: {
        width: 30,
        height: 30

    },
    processTrajectory: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        marginTop: 20,
        padding: 30,
        // paddingBottom:20,
        borderBottomWidth: 1,
        borderStyle: "dashed",

    },
    processWrapper: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        position: "relative",
        left: 5,
        top: 15,

    },
    processWrapper2: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        position: "relative",
        left: -5,
        top: 15,
    },
    processWrapper3: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        position: "relative",
        left: -10,
        top: 15,


    },


    orderDateMainWrapper: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        marginTop: 25,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderStyle: "dashed"
    },
    orderDateWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20

    },

    orderDateString: {
        lineHeight: 16,
        fontSize: 13,
        fontWeight: "500"
    },

    orderDateText: {
        fontSize: 13

    },
    accountInfoTextWrap: {
        width: "100%",
        height: 44,
        backgroundColor: "#f8f8f8",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 25,
        paddingRight: 25,
        borderBottomWidth: 1.2,
        borderBottomColor: "#dddbda",
    },

    accountInfoTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000000",
        marginLeft: 25,

    },
    deliveryDatee: {
        display: "flex",
        alignSelf: "flex-start",
        paddingLeft: 25,
        marginTop: 15
    },
    dateString: {
        lineHeight: 16,
        fontSize: 12,
        fontWeight: '400'

    },
    deliveryDateTxt: {
        fontSize: 13,
        lineHeight: 18,
        color: "#000000",
        marginBottom: 27
    },
    shippingMethodImg: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    shippingMethodMainWrapper: {
        width: "100%",
        paddingLeft: 25,
        marginTop: 12
    },
    shippingMethodWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 8
    },
    shippingMethodTxt: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000000",
        marginLeft: 25,
    },
    pickupOptnWrap: {
        display: "flex",
        alignSelf: "flex-start",
        paddingLeft: 25,
        marginTop: 20,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        width: "100%"

    },
    paymentInfoWrapper: {
        display: "flex",
        alignSelf: "flex-start",
        paddingLeft: 25,
        marginTop: 20,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        width: "100%"
    },

  
    stepIndicatorContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width:30,
        height:30
        
        
    },
    stepIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    stepLabel: {
        marginTop: 8,
        fontSize: 12,
        color: '#999999',
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderStyle: 'dashed'
      },

      paymentSpecificInfo:{
        flexDirection:"row"
      },
      paymentCardLogo:{
        marginRight:7
      }











})
export default styles