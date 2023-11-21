// OrderHistorySort
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import BlackCross from "../../assets/images/BlackCross";
import { ThemeColors } from "../../utils/Theme";
import { useDispatch, useSelector } from "react-redux";
import { addOrderHistroySort } from "../../redux/Reducer/orderHistryReducer";

const OrderHistorySort: React.FC<{ toggleModal: any }> = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const mySort = useSelector((state: any) => state.orderHistrySort.mysort);

  console.log("mysort====", mySort);
  const sortData = [
    { id: 1001, Sorttype: "Invoice_Number__c", name: "Invoice No" },
    { id: 1002, Sorttype: "OrderNumber", name: "Order No" },
    { id: 1003, Sorttype: "OrderedDate", name: "Order Date" },
    { id: 1004, Sorttype: "Status", name: "Order Status" },
    { id: 1005, Sorttype: "GrandTotalAmount", name: "Amount" },
  ];

  const [selectedsort, setSelectedSort] = useState(null);

  const selectSort = (item: any) => {
    setSelectedSort(item);
  };
  const applySort = () => {
    console.log("selectedsort=", selectedsort);
    if (selectedsort) {
      dispatch(addOrderHistroySort(selectedsort));
    }
    toggleModal();
  };
  useEffect(() => {
    if (mySort) {
      setSelectedSort(mySort);
    }
  }, []);
  return (
    <View style={styles.bodyFlexStyle}>
      <ScrollView>
        {/* Main Header */}
        <View style={styles.projectListHeader}>
          <View style={styles.projectListOuter}>
            <View style={styles.projectListInnerHeader}>
              <Pressable onPress={() => toggleModal()}>
                {({ pressed }) => (
                  <View style={styles.gapStyle}>
                    <BlackCross />
                  </View>
                )}
              </Pressable>
              <View style={styles.gapStyle}>
                <Text style={styles.sortTextStyle}>Sort</Text>
              </View>
            </View>
            <TouchableHighlight
              onPress={applySort}
              // color={"#FFFFFF"}
              underlayColor={"#F40000"}
              style={styles.roundButton}
            >
              <Text style={styles.whiteText}>Apply</Text>
            </TouchableHighlight>
          </View>
        </View>
        <Separator />
        {sortData.map((item, i) => {
          return (
            <TouchableOpacity onPress={() => selectSort(item)} key={i}>
              <View style={styles.sortInnerDiv}>
                <Text
                  style={[
                    styles.sortTextPara,
                    selectedsort === item.Sorttype
                      ? { fontWeight: "800" }
                      : null,
                  ]}
                >
                  {item.name}
                </Text>
              </View>
              <Separator />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default OrderHistorySort;

const Separator = () => <View style={styles.separator} />;

const styles: any = StyleSheet.create({
  bodyFlexStyle: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
    margin: 0,
    padding: 0,
    fontFamily: "Inter-Regular",
  },

  projectListHeader: {
    paddingLeft: 12,
    marginTop: 0,
    paddingTop: 12,
    paddingRight: 12,
    marginBottom: 10,
    backgroundColor: ThemeColors.THEME_WHITE_BACKGROUND,
  },

  projectListOuter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  selectboxsaluation: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 0,
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
    marginLeft: 18,
    marginRight: 18,
  },
  smallTextStyle: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "Inter-Regular",
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
    fontFamily: "Inter-Regular",
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
    fontFamily: "Inter-Regular",
    fontWeight: "600",
    lineHeight: 20,
  },
  roundButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    backgroundColor: "#000000",
  },
  whiteText: {
    color: "#FFFFFF",
    fontFamily: "Gilroy-Regular",
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
    alignItems: "center",
  },
  shoppinglistPara: {
    color: "#000000",
    fontSize: 12,
    fontFamily: "Inter-Regular",
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
    fontFamily: "Inter-Regular",
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
    fontFamily: "Inter-Regular",
    fontWeight: "800",
    lineHeight: 20,
  },

  showText: {
    color: "#000000",
    fontSize: 12,
    fontFamily: "Inter-Regular",
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
    // borderColor: '#E3E7ED',
    // borderWidth: 0.5,
    // backgroundColor: '#FFFFFF',
  },
  incrementButton: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    // borderColor: '#E3E7ED',
    // borderWidth: 0.5,
    // backgroundColor: '#FFFFFF',
  },
  incrementDecrementButtons: {
    width: 45,
    height: 45,
    backgroundColor: "#E4E4E4",
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
    width: 45,
    height: 45,
    borderColor: "#E3E7ED",
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  incrementDecrementtext: {
        fontFamily: 'Gilroy-Regular',
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
        fontFamily: 'Gilroy-Regular',
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
  tabOuter: {
    alignItems: "center",
    flexDirection: "row",
  },
  gapStyle: {
    margin: 5,
  },
  gapFlexStyle: {
    margin: 10,
  },
  sortTextStyle: {
    color: "#000000",
        fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  separator: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDBDA",
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
        fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    fontWeight: "500",
  },
});
