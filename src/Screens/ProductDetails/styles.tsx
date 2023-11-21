import { StyleSheet, Dimensions } from "react-native";
import {
  FONT_FAMILY_G_REGULAR,
  FONT_FAMILY_I_REGULAR,
  ThemeColors,
} from "../../utils/Theme";

const styles: any = StyleSheet.create({
  bodyFlexStyle: {
    flex: 1,
    backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
    width: "100%",
    margin: 0,
    padding: 0,
    fontFamily: FONT_FAMILY_I_REGULAR,
  },

  projectListHeader: {
    // paddingLeft: 12,
    marginTop: 0,
    // paddingTop: 12,
    // paddingRight: 12,
    // marginBottom: 10,
    backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
  },

  projectListOuter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectListInnerHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 10,
  },
  searchOuterBox: {
    marginTop: 10,
    margin: 12,
  },

  selectboxsaluation: {
    margin: 12,
    marginBottom: 0,
    height: 55,
    borderWidth: 1,
    borderColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
  },
  FilterOuterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    marginTop: 0,
    paddingTop: 12,
    paddingRight: 20,
    margin: 18,
    marginBottom: 10,
  },
  smallTextStyle: {
    color: "#000000",
    fontSize: 14,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    lineHeight: 20,
  },
  BlockWhite: {
    marginTop: 0,
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 10,
    backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
    borderRadius: 5,
    paddingBottom: 20,
  },
  productStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  smallTextPara: {
    color: "#000000",
    fontSize: 18,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    lineHeight: 20,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 0,
  },
  productNumber: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
  },
  productPara: {
    color: "#757575",
    fontSize: 12,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "600",
    lineHeight: 20,
  },
  roundButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    backgroundColor: "#000000",
  },
  whiteText: {
    color: "#FFFFFF",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  shoppinglistOuter: {
    flexDirection: "row",
    marginTop: 0,
    alignItems: "center",
  },
  shoppinglistInner: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  shoppinglistPara: {
    color: "#000000",
    fontSize: 12,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "600",
    lineHeight: 20,
  },
  orangeBoxDiv: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "rgba(239, 127, 0, 0.1)",
  },
  orangetext: {
    color: "#E65100",
    fontSize: 12,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    lineHeight: 20,
  },
  pinkBoxDiv: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "rgba(204, 51, 51, 0.1)",
  },
  redtext: {
    color: "#CC3333",
    fontSize: 12,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    lineHeight: 20,
  },

  showText: {
    color: "#000000",
    fontSize: 12,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "600",
    lineHeight: 20,
    textDecorationLine: "underline",
  },

  whiteBoxDiv: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: "#DDDBDA",
    backgroundColor: "#FFFFFF",
  },
  darkGrayText: {
    color: "#757575",
  },
  // Counter

  decrementButton: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
    // borderColor: '#E3E7ED',
    // borderWidth: 0.5,
    // backgroundColor: '#FFFFFF',
  },
  incrementButton: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    // borderColor: '#E3E7ED',
    // borderWidth: 0.5,
    // backgroundColor: '#FFFFFF',
  },
  incrementDecrementButtons: {
    width: 35,
    height: 35,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  incrementDecrementOuter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  incrementDecrementtextOuter: {
    width: 40,
    height: 35,
    borderColor: "#B3B3B3",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  incrementDecrementtext: {
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 16,
    fontWeight: "400",
    color: "#313131",
    textAlign: "center",
  },
  incrementDecrementButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#242424",
  },

  roundGrayButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 30,
    backgroundColor: "#B3B3B3",
  },
  grayText: {
    color: "#000000",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  viewBtnStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    margin: 20,
  },

  roundWhiteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
  },

  selectItemInner: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },

  // Horizontal Cards
  cardWhiteContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  whiteCards: {
    width: 300,
    height: "100%",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  whiteCardelevated: {
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 10,
  },
  viewText: {
    paddingLeft: 5,
    paddingBottom: 10,
    paddingTop: 5,
  },
  separator: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#B3B3B3",
  },
  productDetailOuter: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flex:1,
    // flexWrap:"wrap",
    width:"100%",
    // justifyContent:"space-between"
    flexDirection:"row"
  },
  productDetailHeader: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 10,
  },
  productDetailsInner: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width:"50%",
  },
  productDetailPara: {
    color: "#000000",
    fontSize: 18,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    lineHeight: 20,
  },
  productParaBrand: {
    // flex: 1,
    width:"50%"
  },
  brandTitle: {
    color: "#757575",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 12,
    fontWeight: "600",
  },
  brandName: {
    color: "#000000",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 16,
    fontWeight: "600",
  },
  // tabOuter: {

  //     alignItems: 'center',
  //     flexDirection: 'row'
  // },
  productScroll: {
    margin: 15,
  },
  scrollBorder: {
    borderWidth: 1,
    borderColor: "red",
    margin: 10,
  },
  scrollWithoutBorder: {
    margin: 10,
  },
  scrollImageStyle: {
    width: 120,
    height: 120,
    padding: 20,
  },
  gapStyle: {
    margin: 5,
  },
  gapFlexStyle: {
    margin: 10,
  },
  arrowButton: {
    paddingHorizontal: 10,
  },

  selectedImage: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#F40000",
    margin: 5,
  },
  unselectedImage: {
    borderRadius: 4,
    margin: 5,
  },
  selectedProductImg: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  itemQuantity: {
    fontWeight: "bold",
  },
  productScrollOuter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  projectlistBackInnerHeader: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    margin: 10,
  },
  projectlistBackTextHeader: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 14,
  },
  smallTextParagraph: {
    color: "#000000",
    fontSize: 18,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    lineHeight: 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 12,
    paddingBottom: 0,
    textAlign: "center",
  },
  pinkOutBox: {
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "rgba(204, 51, 51, 0.1)",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
},
whitetext: {
    color: "#FFFFFF",
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
},
redTextSecondry: {
    color: "#CC3333",
    fontSize: 12,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    lineHeight: 20,
    justifyContent:'flex-start',
    alignItems: 'flex-start',
  },
  modalContainerAddToCart: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalbox: {
    backgroundColor: "#fff",
    width: 370,
    borderRadius: 10
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
    marginBottom: 5,
  },
  sortInnerDiv: {
    paddingHorizontal: 20,
    marginTop: 0,
    paddingTop: 5,
    marginBottom: 10,
  },   
  blackText: {
    color: '#000'
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 17
  },
  roundButton2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000'
  },
  backButtonOuter:{
    display:'flex',
    margin:10,
    flexDirection:'row',
    marginLeft:18,
    marginBottom:15,
    alignItems:'center'
  },
  backText:{
    fontSize: 14,
    paddingLeft:5
  }
});

export default styles;
