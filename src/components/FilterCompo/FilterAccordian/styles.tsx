import { StyleSheet, Dimensions } from "react-native";
import { ThemeColors } from "../../../utils/Theme";

const styles: any = StyleSheet.create({
  bodystyle: {
    backgroundColor: ThemeColors.THEME_BACKGROUND_COLOR,
    width: "100%",
    margin: 0,
    padding: 0,
    fontFamily: "Gilroy-Regular",
  },

  managecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 18,
    paddingTop: 10,
    paddingRight: 18,
    marginBottom: 0,
  },
  manageheader: {
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 8,
    paddingTop: 10,
    paddingRight: 18,
    marginBottom: 0,
    flexDirection: "row",
    gap: 15,
  },
  managetitle: {
    color: "#01182D",
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Gilroy-Semibold",
  },
  manageimages: {
    marginTop: 15,
  },
  accordiancontainer: {
    margin: 15,
  },
  accordianflex: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  accordiantitle: {
    color: "#01182D",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Gilroy-Regular",
    backgroundColor: "#FFFFFF",
  },
  listaccordianstyle: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderRadius: 10,
  },
  accordContainer: {
    marginTop: 5,
  },
  whitebackground: {
    backgroundColor: "#FFFFFF",
  },
  accordHeader: {
    padding: 15,
    color: "#01182D",
    fontWeight: "600",
    fontSize: 14,
    margin: 8,
    backgroundColor: "#FFFFFF",
    fontFamily: "Gilroy-Regular",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accordTitle: {
    fontSize: 20,
    backgroundColor: "#FFFFFF",
  },
  accordBody: {
    padding: 15,
  },
  textSmall: {
    fontSize: 16,
  },
  textcontentflex: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    alignItems: "center",
  },
  accordtxt: {
    color: "#929292",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "Gilroy-Semibold",
    flex: 1,
    textAlign: "center",
  },

  projectListOuter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  separator: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDBDA",
  },
  sortTextPara: {
    color: "#000000",
    fontFamily: "Gilroy-Regular",
    fontSize: 14,
    fontWeight: "500",
  },

  productDetailOuter: {
    padding: 20,
  },
  productDetailsInner: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  productDetailPara: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Inter-Regular",
    fontWeight: "800",
    lineHeight: 20,
  },
  paraBrand: {
    flex: 1,
  },

  // Accordian Background
  accordianBackground: {
    backgroundColor: "#FFFFFF",
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
  },
  brandName: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Inter-Regular",
    fontWeight: "500",
    lineHeight: 20,
  },
  changeTitleColor: {
    color: "#F00",
  },
});

export default styles;
