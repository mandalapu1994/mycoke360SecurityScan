import { StyleSheet } from "react-native";
import { FONT_FAMILY_G_REGULAR, FONT_FAMILY_I_REGULAR, ThemeColors } from "../../utils/Theme";

const styles :any= StyleSheet.create({
  orderHistMainWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  orderHistInnerWrapper: {
    flex: 1,
    width: "100%",
    marginTop: 25,
    marginHorizontal: 18,
    // marginBottom: 18,
    borderRadius: 5,
  },
  orderHistInfoWrap: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5
  },
  invoiceNumberContainer: {
    backgroundColor: '#FFE6F3',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8
  },
  cardButtonGroup: {
    flex: 1,
    width: '100%',
    flexDirection: "row",
    marginBottom: 17,
  },

  card: {
    paddingLeft: 20,
    paddingVertical: 10,
    

  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    alignSelf: 'flex-start'
  },
  boldWithUnderlineText: {
    fontWeight: '500',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    alignSelf: 'flex-start'
  },
  orderHistContentWrapper: {
    borderRadius: 10,
    backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
    flex: 1,
    paddingVertical: 20
  },

  heading: {
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  deleteSelectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    // paddingLeft: 10,
    // paddingTop: 12,
    // paddingRight: 20,
  },
  viewCardNumber: {
    flexDirection: "row",
    // flex: 1,
    // flexWrap: "wrap",
    // backgroundColor: 'green'
  },
  gapStyle: {
    margin: 5
  },
  projectListInnerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 10
  },
  smallTextStyle: {
    color: "#000000",
    fontSize: 14,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    lineHeight: 20
  },
  separator: {
    width: '100%',
    padding: 0,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDBDA',
    // marginHorizontal: 14

  },
  viewBtnStyle: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  roundWhiteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 30,
    backgroundColor: '#FFFFFF'

  },
  grayText: {
    color: "#000000",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',

  },

  
  closeButton: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
  },

  sortInnerDiv: {
    paddingHorizontal: 20,
    marginTop: 0,
    paddingTop: 5,
    marginBottom: 10,
  },
  modalHeader: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalText: {
    color: "#000000",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 24,
    fontWeight: '600',
     marginBottom: 20,
  },
  sortTextPara: {
    color: "#000000",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 14,
    fontWeight: '500',

  },
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000'
  },
  buttonText: {
    // color: "#fff",
    fontWeight: "800"

  },

  modalbox: {
    backgroundColor: "#fff",
    width: 370,
    borderRadius: 10
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    // marginHorizontal: 10,
    marginBottom: 17
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
  filterTextStyle: {
    color: "#000000",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  },

  roundButton2: {
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
  whiteText: {
    color: "#FFFFFF",
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
  filterHeading: {
    fontSize: 16,
    color: '#F40000',
    fontWeight: '700',
    paddingLeft: 15
  },
  caseStatusWrapper: {
    borderBottomWidth: 1,
    borderColor: '#DDDBDA',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
    flex: 1
    // flexDirection:'row'
  },
  checkBoxWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandChild1: {
    width: '50%'
  },
  brandChild2: {
    width: '50%'
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    padding: 8,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDDBDA',
  },
  dateTopText: {
    color: "#000000",
    lineHeight: 20,
    paddingLeft: 12,
    paddingTop: 12,
    paddingBottom: 0
  },
  dateMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  calendarIcon: {
    padding: 5,
    borderRadius: 5,
  },
  dateText: {
    flex: 1,
    marginRight: 10,
    textAlign: 'left',
    color: '#000000',
    fontSize: 14,
    fontWeight: '700'
  },
  gridItem: {
    flex: 1,
    margin: 5,
    height: 150, // Adjust the height as per your requirements
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  filterCardList: {
    flex: 1,
    marginVertical: 10,
    flexDirection: 'row'
  },
  filerHorizontalWrapper: {
    backgroundColor: '#FFF',
    marginHorizontal: 4,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterHorizontalText: {
    color: '#000',
    padding: 6
  },
  filterHorizontalCross: {
    padding: 8
  },
  deliveryText: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  boldText: {
    fontWeight: '500'
  },
  paddingGap: {
    paddingHorizontal: '4%'
  },
  deliveryArrowWrapper: {
    paddingVertical: 7,
    paddingHorizontal: 3
  },
  width40: {
    width: '40%'
  },
  width80: {
    width: '80%'
  },
  wh100: {
    width: '100%',
    height: '100%'
  },
  clearAllText: {
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  clearAllPress: {
    justifyContent: 'center',
    padding: 10
  },
  filterSortIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchExportWrapper: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  exportIconWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '2%'
  },
  exportText: {
    fontWeight: '700',
    color: '#000',
    fontSize: 15,
    paddingLeft: '5%'
  },
  changeOrderButton: {
    backgroundColor: "#000",
    marginHorizontal: 15,
    marginTop: 15
  },
  cancelOrderButton: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15
  },
 
  blackText: {
    color: '#000'
  },
  footerWidthStyle: {
    width: "100%",
    margin: 0
  },
  mainContentWrapper:{
    flex:1,
    flexDirection:"row",
    width:"100%",
    justifyContent:"center",
    alignContent:"center"
  },
  contentHolder:{
    width:"99%"

  },
  editcheckboxdata:{
    width:"1%",
    // padding:5,
    paddingHorizontal:5,
    marginTop:5

    // paddingTop:5

  }



})

export default styles;
