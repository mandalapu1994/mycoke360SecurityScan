import { StyleSheet, Dimensions } from "react-native";
import {
  FONT_FAMILY_G_MEDIUM,
  FONT_FAMILY_G_REGULAR,
  FONT_FAMILY_I_BOLD,
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
    paddingLeft: 12,
    marginTop: 0,
    paddingTop: 12,
    paddingRight: 12,
    marginBottom: 10,
    backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
  },
  outOfStockHeading: {
    color: "#000000",
    fontSize: 18,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "700",
    letterSpacing: 0.6,
    paddingLeft: 5,
  },

  viewCartOuter: {
    flexDirection: "row",
    // padding: 10,
    paddingVertical:10,
    alignItems: "center",
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    // backgroundColor: 'yellow'
  },
  projectListInnerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 10,
  },
  searchOuterBox: {
    marginTop: 10,
    margin: 15,
  },
  viewCartHeading: {
    color: "#000000",
    fontSize: 18,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "700",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 0,
    paddingTop: 8,
    // flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    letterSpacing: 0.6,
  },
  viewCartPara: {
    color: "#000000",
    fontSize: 12,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "400",

    flexWrap: "wrap",
    paddingLeft: 5,

    width: "94%",

    lineHeight: 16,
  },
  moneyHeading: {
    color: "#000000",
    fontSize: 16,
    fontFamily: FONT_FAMILY_I_BOLD,
    fontWeight: "700",
  },

  selectboxsaluation: {
    // marginLeft: 15,
    // marginRight: 15,
    // marginBottom: 0,
    borderWidth: 1,
    borderColor: "#F8F8F8",
    backgroundColor: "#FFFFFF",
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
    marginLeft: 18,
    marginRight: 18,
  },
  viewCardCounterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    margin: 0,
    // paddingLeft: 20,
    // paddingTop: 12,
    // paddingRight: 20,
    paddingHorizontal: 8,
    // paddingLeft: 10,
    // paddingRight: 8,
    // paddingBottom: 15,
    marginHorizontal: 5,
    marginBottom: 8,
    // backgroundColor: '#bfbfbf'
  },
  deleteSelectedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    // paddingTop: 12,
    paddingRight: 10,
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
    marginBottom: 18,
    backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
    borderRadius: 5,
    // paddingBottom: 20
  },
  blockYellow: {
    marginTop: 10,
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 5,
    backgroundColor: "#FFFCF5",
    borderRadius: 5,
    // paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#EFA432",
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10
    // backgroundColor: "#000",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 4,
    // marginVertical: 15,
    // backgroundColor: '#bfbfbf'
  },

  image: {
    padding: 20,
  },
  productStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  smallTextPara: {
    color: "#000000",
    fontSize: 12,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
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
  replaceProductPara: {
    color: "#757575",
    fontSize: 10,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "600",
    // lineHeight: 20
  },
  viewCardNumber: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 0,

    // flex: 1,
    // flexWrap: "wrap",
    // backgroundColor: 'green'
  },
  deleteSelectedItemsOuter: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewProductNumber: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    paddingLeft: 5,
  },
  roundButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: "#000000",
  },
  blackText: {
    color: "#000000",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  replaceProductBtn: {
    color: "#FFFFFF",
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 10,
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
  orangeOutBox: {
    padding: 5,
    borderRadius: 5,
    // margin: 5,
    backgroundColor: "#EF7F00",
  },
  pinkOutBox: {
    padding: 5,
    borderRadius: 5,
    // margin: 5,
    backgroundColor: "rgba(204, 51, 51, 0.1)",
  },
  redtext: {
    color: "#CC3333",
    fontSize: 10,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    // lineHeight: 20
  },
  whitetext: {
    color: "#FFFFFF",
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    // lineHeight: 20
  },

  showText: {
    color: "#000000",
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    // textDecorationLine: "underline",
    paddingLeft: 5,
    lineHeight: 16,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignSelf: "flex-start",
  },
  clearAllTxt: {
    fontSize: 12,
  },
  replaceTxt: {
    fontSize: 10,
  },
  contractedSmall: {
    fontSize: 10,
  },
  contractedLarge: {
    fontSize: 12,
    letterSpacing: 0.6,
    paddingHorizontal: 4,
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
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    // borderColor: '#E3E7ED',
    // borderWidth: 0.5,
    // backgroundColor: '#FFFFFF',
  },
  incrementButton: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    // borderColor: '#E3E7ED',
    // borderWidth: 0.5,
    // backgroundColor: '#FFFFFF',
  },
  incrementDecrementButtons: {
    width: 36,
    height: 42,
    fontSize: 16,
    borderColor: "#B3B3B3",
    borderWidth: 1,
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
    width: 70,
    height: 42,
    borderColor: "#B3B3B3",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"blue"
  },
  incrementDecrementtext: {
    fontFamily: FONT_FAMILY_G_REGULAR,
    fontSize: 16,
    fontWeight: "700",
    color: "#313131",
    textAlign: "center",
  },
  incrementDecrementButtonText: {
    fontSize: 20,
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
  roundBorderButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
    color: "#000",
    backgroundColor: "#FFFFFF",
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
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
  },

  selectItemInner: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  separator: {
    // marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDBDA",
  },

  gapStyle: {
    margin: 5,
  },
  gapFlexStyle: {
    margin: 10,
  },
  // Horizontal Cards
  cardWhiteContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
  },
  whiteCards: {
    width: 150,
    // height: "100%",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  whiteCardelevated: {
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 5,
  },
  moreIconOuter: {
    position: "absolute",
    top: 10,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  moreSectionOuter: {
    height: "100%",
    borderRadius: 10,
  },
  firstMenu: {
    borderTopLeftRadius: 10,
    borderTopRighRadius: 10,
    borderColor: "rgba(226,232,238,0.23)",
  },
  lastMenu: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "rgba(226,232,238,0.23)",
  },
  moreSectionInner: {
    position: "absolute",
    right: 20,
    backgroundColor: "#FFFFFF",
    // borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(226,232,238,0.23)",
    shadowColor: "rgba(0,0,0,0.07)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  moreInnerSectionSelected: {
    backgroundColor: "#FFFCF",
    paddingHorizontal: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#E2E9EE",
    paddingVertical: 5,
    paddingRight: 40,
  },
  moreOptionTextSelected: {
    fontSize: 15,
    color: "#000",
    fontFamily: FONT_FAMILY_G_MEDIUM,
  },
  moreInnerSection: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#E2E9EE",
    paddingVertical: 5,
    paddingRight: 40,
  },
  moreOptionText: {
    fontSize: 15,
    color: "#2E2E2E",
    fontFamily: FONT_FAMILY_G_MEDIUM,
  },
  lastMoreInnerSection: {
    // marginHorizontal: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    paddingVertical: 5,
    paddingRight: 15,
  },
  accordianOuter: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  accordianInner: {
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderBottomColor: "#DDDBDA",
  },
  accordianView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  accordianFontStyle: {
    fontSize: 16,
    fontWeight: "800",
    fontFamily: FONT_FAMILY_I_REGULAR,
  },
  titleStyles: {
    alignItems: "center",
    margin: 10,
  },
  buttonPosition: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    backgroundColor: "#FF000050",
  },
  imageContainer: {
    width: 100,
  },
  minOrderWrapper:{
    flex:1,
    width:"100%",
    backgroundColor: "#FFFCF5",
    borderRadius: 5,
    // paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#EFA432",
    flexDirection:"row",
    padding:3
  },
  minOrderFirstBlock:{
    width:"65%",
    flexDirection:"row"
  },
  alertImg:{
    marginRight:5,
    marginLeft:2
  },
  minOrderSecondBlock:{
    width:"35%",
    alignItems:"center",
    justifyContent:"center"

  },
  contiShoppingTxt:{
    textAlign:"center"
  },
  customCheckbox:{
    margin:10,
    marginTop: 15,
    height: 16,
    width: 16
},
addToCartBtn: {
  width: "48%",
  
  borderWidth: 1,
  borderRadius: 6,
  marginVertical: 10,
  paddingVertical: 7,
},

});

export default styles;
