import { StyleSheet, Dimensions } from "react-native";
import {
  FONT_FAMILY_G_REGULAR,
  FONT_FAMILY_I_REGULAR,
  FONT_FAMILY_I_SEMIBOLD,
  ThemeColors,
} from "../../utils/Theme";

const styles: any = StyleSheet.create({
  bodyFlexStyle: {
    backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
    width: "100%",
    margin: 0,
    padding: 0,
    fontFamily: FONT_FAMILY_I_REGULAR,
    flex: 1,
  },
  projectListHeader: {
    paddingLeft: 12,
    marginTop: 0,
    // paddingTop: 12,
    paddingRight: 12,
    marginBottom: 10,
    backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
    // borderTopWidth: 1,
  },

  projectListOuter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  BlockWhite: {
    flex: 1,
    maxHeight: 800,
    minHeight: 300,
    // marginLeft: 18,
    // marginRight: 18,
    width:"93%",
    marginBottom: 18,
    backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
    borderRadius: 5,
    paddingBottom: 20,
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
    justifyContent:'flex-start',
    alignItems: 'flex-start',
  },

  showText: {
    color: "#000000",
    fontSize: 12,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "600",
    lineHeight: 20,
    textDecorationLine: "underline",
    marginLeft: 25,
    paddingRight: 10,
    width: 60,
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
  topContentWrapper: {
    marginHorizontal: 18,
    marginVertical: 12,
  },
  darkGrayText: {
    color: "#757575",
  },
  drinkTypeWrapper: {
    width: "80%",
    // backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  filterandSortWrapper: {
    width: "15%",
    // backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#FFF",
    // padding: 4,
  },
  drinkTypeText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "500",
    // fontFamily: "Inter-ExtraBold",
  },

  incrementDecrementOuter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
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

    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
  },

  roundWhiteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
  },

  selectItemInner: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },

  gapStyle: {
    margin: 5,
  },
  itemQuantity: {
    fontWeight: "bold",
  },
  productTitle: {
    color: "#000000",
    fontSize: 18,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "700",
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 0,
    paddingTop: 8,
    // flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    letterSpacing: 0.6,
  },
  productSKUUPCText: {
    color: "#757575",
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "600",
    lineHeight: 20,
    fontSize: 12,
  },
  productSKUUPCTDataext: {
    color: "#000",
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "600",
    lineHeight: 20,
    paddingLeft: 4,
    fontSize: 12,
  },
  cartBottomtext: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "500",
  },
  itemInCarttext: {
    fontSize: 10,
    color: "#000000",
  },
  productDataRenderWrapper: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DDDBDA",
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  productImageWrapper: {
    paddingVertical: 20,
    width: "30%",
    alignItems: "center",
  },
  productRightWrapper: {
    paddingVertical: 10,
    paddingRight: 5,
    width: "70%",
  },
  productSkuUpcWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
  },
  flexRowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  paddingHorizontal: {
    paddingHorizontal: 10,
  },
  productButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  incAndDecBtnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "44%",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 10,
  },
  padding12: {
    padding: 12,
  },
  addToCartBtn: {
    width: "48%",
    
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 10,
    paddingVertical: 7,
  },
  addToCartDisabled: {
    backgroundColor: "#ECEBEA",
    borderColor: "#ECEBEA",
  },
  addToCartActive: {
    backgroundColor: "black",
    borderColor: "black",
  },
  addToCartBtnTxtActive: {
    color: "white",
    textAlign: "center",
  },
  addToCartBtnTxtDisabled: {
    color: "black",
    textAlign: "center",
  },
  productExtraDataWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  itemInCartWrapper: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fw700: {
    fontWeight: "700",
  },
  fw400: {
    fontWeight: "400",
  },
  saveShoppingListWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  pr4: {
    paddingRight: 4,
  },
  productQuantityCount: {
    height: 30,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    height: "100%",
    backgroundColor: "#fff"


    // justifyContent: 'space-between'


  },
  pinkOutBox: {
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "rgba(204, 51, 51, 0.1)",
    // width:'fit-content',
    justifyContent:'flex-start',
    alignItems: 'flex-start',

  },
  // redtext: {
  //   color: "#CC3333",
  //   fontSize: 10,
  //   fontFamily: FONT_FAMILY_I_REGULAR,
  //   fontWeight: "800",
  //   // lineHeight: 20
  // },
  whitetext: {
    color: "#FFFFFF",
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "800",
    // lineHeight: 20
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
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000'
  },
});

export default styles;
