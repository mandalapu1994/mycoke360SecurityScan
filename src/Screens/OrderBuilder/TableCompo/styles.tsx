
import { StyleSheet, Dimensions } from "react-native";
import { FONT_FAMILY_G_REGULAR, FONT_FAMILY_I_REGULAR, ThemeColors } from "../../../utils/Theme";
import { responsiveFont } from "../../../utils/responsiveFont";


const styles :any= StyleSheet.create({
  bodyFlexStyle: {
    flex: 1,
    backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
    width: "100%",
    margin: 0,
    padding: 0,
    fontFamily: FONT_FAMILY_I_REGULAR
  },
  container: {
    width: '100%',
    height: 300,
    padding: 16,
    paddingTop: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // order builder style
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#F6F8FA',

  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: '#C1C0B9',

  },
  // cell: {
  //     flex: 1,
  //     alignItems: 'center',
  // },
  image: {
    width: 52,
    height: 52,
    resizeMode: 'contain'
  },
  smallTextPara: {
    color: "#000000",
    fontSize: responsiveFont(10),
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    lineHeight: 20,
    paddingLeft: 5,
    paddingRight: 5,
    marginVertical: 8
  },
  productPara: {
    color: "#757575",
    fontSize: responsiveFont(8),
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "600",
    lineHeight: 20
  },
  productNumber: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    paddingVertical: 0
  },
  recentDeliText: {
    color: "#000",
    fontSize: responsiveFont(16),
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    // lineHeight: 19
  },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0

  },
  incrementDecrementButtons: {
    width: 26,
    height: 30,
    borderColor: '#E3E7ED',
    borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center'
  },
  decrementButton: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  incrementDecrementtextOuter: {
    width: 50,
    height: 30,
    borderColor: '#E3E7ED',
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  incrementDecrementtext: {
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    lineHeight: 14
  },
  incrementButton: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,

  },
  incrementDecrementButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#242424'
  },
  shoppinglistPara: {
    color: "#000000",
    fontSize: responsiveFont(10),
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "600",


  },
  column1: {
    width: '33.33%',
    height: 200,
    backgroundColor: "#FFFFFF",
    padding: 12,
    alignItems: "center",
    borderColor: "gray",
    borderTopWidth: 0.8,
    borderLeftWidth: 0.8,
    borderRightWidth: 0.8,

  },
  column2: {
    width: '33.33%',
    height: 200,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    // borderBottomWidth:0.8,
    borderTopWidth: 0.8,
  },
  column3: {
    width: '33.33%',
    height: 200,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderTopWidth: 0.8,
    borderLeftWidth: 0.8,
    borderRightWidth: 0.8,
  },
  sortText: {
    color: "#000"
  },
  dateText: {
    color: "#000",

    fontSize: 14,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "700",
    lineHeight: 19
  },
  infoText: {
    color: "#000000",
    fontSize: 9,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "400",
  },

  openButton: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
  },
  seperotor: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDBDA'
  },
  sortInnerDiv: {
    paddingLeft: 12,
    marginTop: 0,
    paddingTop: 12,
    paddingRight: 12,
    marginBottom: 10,
  },
  sortTextPara: {
    color: "#000000",
    fontFamily:FONT_FAMILY_G_REGULAR,
    fontSize: 14,
    fontWeight: '500',

  },
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800"

  },
  CustomHeaderBox: {
    width: '33.33%',
    height: 50,
    backgroundColor: "#DDDBDA",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderTopWidth: 0.8,
  },
  commanFlexContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontWeight: "bold", color: "#000"
  },
  CustomRowCol1: {
    width: '33.33%',
     height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderTopWidth: 0.8,
    borderLeftWidth: 0.8,
    borderRightWidth: 0.8,
  },
  CustomRowCol2: {
    width: '33.33%',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderTopWidth: 0.8,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  CustomRowCol3: {
    width: '33.33%',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderTopWidth: 0.8,
    borderLeftWidth: 0.8,
    borderRightWidth: 0.8,
    padding:5
  },

  downBlackArrow: {
    height: 4,
    width: 8,
    paddingHorizontal: 8
  },
  dateContainer: {
    flex: 1,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  modalbox: {
    backgroundColor: "#fff",
    width: 250,
    borderRadius: 10
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    marginBottom: 17
  },
  container2: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',

  },
  boxContainer: {
    flex: 1,
    margin: 0.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },



});

export default styles;