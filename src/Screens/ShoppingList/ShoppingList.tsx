import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import styles from "./styles";
import FooterComponent from "../../components/FooterComponent";
import SearchBar from "../../components/SearchBar";
import { useTranslation } from "react-i18next";
import DownArrow from "../../assets/images/DownArrow";
import BlackCross from "../../assets/images/BlackCross";
import CheckBox from "@react-native-community/checkbox";
import EditCircularIcon from "../../assets/images/EditCircularIcon";

import allProducts from "../OrderConfirmation/Products";
import ProductItem from "../../components/ProductCard/ProductItem";

// import DeleteIcon from "../../assets/images/DeleteIcon";
// import allProducts from "../OrderConfirmation/Products";
// import ProductItem from "../../components/ProductCard/ProductItem";




type ProductListObject = {
  id: number;
  productTitle: string;
  sku: string;
  upc: string;
  price: string;
  savedPrice: string;
  quantity: number;
};
type ShoppingListObject = {
  id: number;
  listName: string;
  description: string;
};

const ShoppingList: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [disabled, setDisable] = useState(false);
  const [searchedText, setSearchedText] = useState<any>("");
  const [addNewTicketModal, setAddNewTicketModal] = useState(false);
  const [editNewTicketModal, setEditNewTicketModal] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [ListName, setListName] = useState<string>("");
  const [isCheck, setIsCheck] = useState(false);
  const [isEditClick, setIsEditClick] = useState(false);
  const [productList, setProductList] =
    useState<ProductListObject[]>(allProducts);
  const { t } = useTranslation();
  const initializeShopingList = () => {
    let finalList: ShoppingListObject[] = [];
    let tempObj1 = {
      id: 0,
      listName: t("SHOPPING_LIST.shoppingHeading"),
      description: t("SHOPPING_LIST.descriptiontxt"),
      [t("SHOPPING_LIST.datecreatedHeading")]: t(
        "SHOPPING_LIST.dateCreatedPara"
      ),
      [t("SHOPPING_LIST.lastUpdatedPara")]: t("SHOPPING_LIST.dateCreatedPara"),
    };
    let tempObj2 = {
      id: 1,
      listName: t("SHOPPING_LIST.shoppingsecondHeading"),
      description: t("SHOPPING_LIST.descriptiontxt"),
      [t("SHOPPING_LIST.datecreatedHeading")]: t(
        "SHOPPING_LIST.dateCreatedPara"
      ),
      [t("SHOPPING_LIST.lastUpdatedPara")]: t("SHOPPING_LIST.dateCreatedPara"),
    };
    let tempObj3 = {
      id: 2,
      listName: t("SHOPPING_LIST.shoppingthirdHeading"),
      description: t("SHOPPING_LIST.descriptiontxt"),
      [t("SHOPPING_LIST.datecreatedHeading")]: t(
        "SHOPPING_LIST.dateCreatedPara"
      ),
      [t("SHOPPING_LIST.lastUpdatedPara")]: t("SHOPPING_LIST.dateCreatedPara"),
    };
    let tempObj4 = {
      id: 3,
      listName: t("SHOPPING_LIST.shoppingfourthHeading"),
      description: t("SHOPPING_LIST.descriptiontxt"),
      [t("SHOPPING_LIST.datecreatedHeading")]: t(
        "SHOPPING_LIST.dateCreatedPara"
      ),
      [t("SHOPPING_LIST.lastUpdatedPara")]: t("SHOPPING_LIST.dateCreatedPara"),
    };

    finalList.push(tempObj1);
    finalList.push(tempObj2);
    finalList.push(tempObj3);
    finalList.push(tempObj4);
    return finalList;
  };

  const [shoppingList, setShoppingList] = useState<ShoppingListObject[]>(
    initializeShopingList()
  );

  const handleCheck = (newValue: any) => {
    newValue
      ? (setIsCheck(newValue), setDisable(true))
      : (setIsCheck(newValue), setDisable(false));
  };

  const handleFirstName = (text: string) => {
    setFirstName(text);
  };

  const handleListName = (text: string) => {
    setListName(text);
  };

  const onChangeSearchedText = (text: any) => {
    setSearchedText(text);
  };

  const clearSearch = () => {
    setSearchedText("");
  };

  const handleQuantityChange = (id: number, type: string) => {
    console.log({ id }, { type });

    let updatedProductList:any = productList
      .map((item:any) => {
        if (item.id === id) {
          // if pressed id is then same do the following changes
          let quantity = parseInt(item.quantity, 10);
          let newQuantity =
            type === "add" ? quantity + 1 : Math.max(0, quantity - 1);
            return newQuantity === 0 ? 0 : { ...item, quantity: newQuantity };
        }
        // else return the item unchanged
        return item;
      })
      .filter((item) => item !== null);
    setProductList(updatedProductList);
  };

  const deleteProductList = (indexToDelete: number) => {
    let updatedProductList = productList.filter(
      (item) => item.id !== indexToDelete
    );
    setProductList(updatedProductList);
  };

  const deleteShoppingList = (indexToDelete: number) => {
    let updatedShoppingList = shoppingList.filter(
      (item) => item.id !== indexToDelete
    );
    setShoppingList(updatedShoppingList);
  };

  const getShoppingList = () => {
    return shoppingList.map((item, index) => {
      const getDateKey = () => {
        return Object.keys(item);
      };

      return (
        <View key={index} style={styles.borderbottom}>
          <Text style={styles.shoppinglisttxt}>{item.listName}</Text>
          <View style={styles.shoppinglistOuter}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dateTxt}>
                {getDateKey()[3] === "dateCreated"
                  ? "Date Created"
                  : "Date Created"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.datedarkTxt}>
                {t("SHOPPING_LIST.dateCreatedPara")}
              </Text>
            </View>
          </View>
          <View style={styles.shoppinglistOuter}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dateTxt}>
                {getDateKey()[4] === "lastUpdated"
                  ? "Last Updated"
                  : "Last Updated"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.datedarkTxt}>
                {t("SHOPPING_LIST.dateCreatedPara")}
              </Text>
            </View>
          </View>
          <View style={[styles.buttonWrapper]}>
            <TouchableOpacity
              style={styles.cancelModalBtn}
              onPress={() => {
                deleteShoppingList(index);
              }}
            >
              <Text style={styles.cancelTicketTxt}>
                {t("SHOPPING_LIST.delete")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => setIsEditClick(true)}
            >
              <Text style={styles.rescheduleTxt}>
                {t("SHOPPING_LIST.edit")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const addShoppingList = () => {
    let listNumber = shoppingList?.length;
    let tempObj = {
      id: listNumber + 1,
      listName: `${firstName}`,
      description: `${ListName}`,
      dateCreated: new Date(),
      lastUpdated: new Date(),
    };
    console.log({ tempObj });
    setShoppingList([...shoppingList, tempObj]);
  };

  return (
    <View style={styles.bodyFlexStyle}>
      <View style={{ padding: 20 }}>
        <Text style={{ color: "black" }}>The Shopping List is not available.</Text>
      </View>
    </View>
  );    

  // return (
  //   <View style={styles.bodyFlexStyle}>
  //     <ScrollView>
  //       {isEditClick ? (
  //         <View>
  //           <View style={styles.shoppingTitleOuter}>
  //             <View style={styles.projectListOuter}>
  //               <Text style={styles.shoppingTitleStyle}>
  //                 {t("SHOPPING_LIST.shoppingHeading")}
  //               </Text>
  //               <TouchableOpacity onPress={() => setEditNewTicketModal(true)}>
  //                 <EditCircularIcon />
  //               </TouchableOpacity>
  //             </View>
  //             <Text style={styles.shoppingTitleParaStyle}>
  //               {t("SHOPPING_LIST.shoppingHeadingPara")}
  //             </Text>
  //           </View>
  //           {/* Search bar */}
  //           <View style={styles.searchOuterBox}>
  //             <SearchBar
  //               placeholder="Search Products"
  //               searchedText={searchedText}
  //               onChangeSearchedText={(text: any) => {
  //                 setSearchedText(text);
  //               }}
  //               clearSearch={clearSearch}
  //             />
  //           </View>

  //           <View style={styles.FilterOuterHeader}>
  //             {/* <View style={styles.gapFlexStyle}></View> */}
  //             {/* <Pressable onPress={() => navigation.navigate('SortCompo')}> */}

  //             {/* Sort by */}
  //             <Pressable style={styles.projectListInnerHeader}>
  //               <View style={styles.gapStyle}>
  //                 <Text style={styles.smallTextStyle}>
  //                   {t("SHOPPING_LIST.sortTitle")}
  //                 </Text>
  //               </View>
  //               <View style={styles.gapStyle}>
  //                 <DownArrow />
  //               </View>
  //             </Pressable>
  //           </View>

  //           {productList.length > 0 && (
  //             <View style={{}}>
  //               <FlatList
  //                 data={productList.filter((item) => {
  //                   return item.productTitle
  //                     .toLowerCase()
  //                     .startsWith(searchedText);
  //                 })}
  //                 renderItem={({ item }: { item: any }) => {
  //                   return (
  //                     <ProductItem
  //                       image={require("../../assets/images/CocaCola.png")}
  //                       productName={item.productTitle}
  //                       SKU={item.sku}
  //                       UPC={item.upc}
  //                       quantity={item.quantity}
  //                       existingQuantityInCart={8}
  //                       addQty={() => {
  //                         // handleQuantityChange(item.id, "add");
  //                       }}
  //                       minusQty={() => {
  //                         // handleQuantityChange(item.id, "");
  //                       }}
  //                       addToCart={() => {}}
  //                       showBottomDetails={false}
  //                       Id={item.id}
  //                       stockStatus="inStock"
  //                     />

                      
  //                   );
  //                 }}
  //                 keyExtractor={(item: any, index: any) => index}
  //               />
  //             </View>
  //           )}

  //           <View style={styles.whiteOuterDiv}>
  //             <View style={styles.txtCenter}>
  //               <Pressable
  //                 style={styles.productNumber}
  //                 onPress={() => {
  //                   setProductList([]);
  //                 }}
  //               >
  //                 {/* <DeleteIcon /> */}
  //                 <Text style={styles.deletetitle}>
  //                   {t("SHOPPING_LIST.deleteTitle")}
  //                 </Text>
  //               </Pressable>
  //             </View>
  //             <View style={styles.txtCenter}>
  //               <TouchableOpacity
  //                 testID="cancelTicketModalCancelButton"
  //                 style={styles.continueModalBtn}
  //                 onPress={() => setAddNewTicketModal(false)}
  //               >
  //                 <Text style={styles.continueTicketTxt}>
  //                   {t("SHOPPING_LIST.continueTitle")}{" "}
  //                 </Text>
  //               </TouchableOpacity>
  //             </View>

  //             <View style={styles.txtCenter}>
  //               <TouchableOpacity style={styles.addAllBtn}>
  //                 <Text style={styles.rescheduleTxt}>
  //                   {t("SHOPPING_LIST.addAllTitle")}
  //                 </Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </View>
  //       ) : (
  //         <View>
  //           <View style={styles.searchOuterBox}>
  //             <SearchBar
  //               placeholder="Search List"
  //               searchedText={searchedText}
  //               onChangeSearchedText={(text: any) => onChangeSearchedText(text)}
  //               clearSearch={clearSearch}
  //             />
  //           </View>

  //           <View style={styles.FilterOuterHeader}>
  //             {/* <Pressable onPress={() => navigation.navigate('SortCompo')}> */}

  //             <Pressable style={styles.projectListInnerHeader}>
  //               <View style={styles.gapStyle}>
  //                 <Text style={styles.smallTextStyle}>
  //                   {t("SHOPPING_LIST.sortTitle")}
  //                 </Text>
  //               </View>
  //               <View style={styles.gapStyle}>
  //                 <DownArrow />
  //               </View>
  //             </Pressable>
  //             <View style={styles.gapFlexStyle}>
  //               <TouchableHighlight
  //                 onPress={() => setAddNewTicketModal(true)}
  //                 // color={"#FFFFFF"}
  //                 underlayColor={"#F40000"}
  //                 style={styles.roundButton}
  //               >
  //                 <Text style={styles.whiteText}>
  //                   {t("SHOPPING_LIST.addNewList")}
  //                 </Text>
  //               </TouchableHighlight>
  //             </View>
  //           </View>

  //           <View style={styles.whiteBoxDiv}>
  //             <View>{getShoppingList()}</View>
  //             {/* <View style={[styles.borderbottom, { backgroundColor: "red" }]}>
  //               <Text style={styles.shoppinglisttxt}>
  //                 {t("SHOPPING_LIST.shoppingHeading")}
  //               </Text>

  //               <View style={styles.shoppinglistOuter}>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.dateTxt}>
  //                     {t("SHOPPING_LIST.datecreatedHeading")}
  //                   </Text>
  //                 </View>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.datedarkTxt}>
  //                     {t("SHOPPING_LIST.dateCreatedPara")}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={styles.shoppinglistOuter}>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.dateTxt}>
  //                     {t("SHOPPING_LIST.lastUpdatedPara")}
  //                   </Text>
  //                 </View>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.datedarkTxt}>
  //                     {t("SHOPPING_LIST.dateCreatedPara")}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={[styles.buttonWrapper]}>
  //                 <TouchableOpacity style={styles.cancelModalBtn}>
  //                   <Text style={styles.cancelTicketTxt}>
  //                     {t("SHOPPING_LIST.delete")}{" "}
  //                   </Text>
  //                 </TouchableOpacity>

  //                 <TouchableOpacity
  //                   style={styles.confirmBtn}
  //                   onPress={() => setIsEditClick(true)}
  //                 >
  //                   <Text style={styles.rescheduleTxt}>
  //                     {t("SHOPPING_LIST.edit")}
  //                   </Text>
  //                 </TouchableOpacity>
  //               </View>
  //             </View>
  //             <View
  //               style={[styles.borderbottom, { backgroundColor: "orange" }]}
  //             >
  //               <Text style={styles.shoppinglisttxt}>
  //                 {t("SHOPPING_LIST.shoppingsecondHeading")}
  //               </Text>

  //               <View style={styles.shoppinglistOuter}>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.dateTxt}>
  //                     {t("SHOPPING_LIST.datecreatedHeading")}
  //                   </Text>
  //                 </View>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.datedarkTxt}>
  //                     {t("SHOPPING_LIST.dateCreatedPara")}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={styles.shoppinglistOuter}>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.dateTxt}>
  //                     {t("SHOPPING_LIST.lastUpdatedPara")}
  //                   </Text>
  //                 </View>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.datedarkTxt}>
  //                     {t("SHOPPING_LIST.dateCreatedPara")}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={[styles.buttonWrapper]}>
  //                 <TouchableOpacity style={styles.cancelModalBtn}>
  //                   <Text style={styles.cancelTicketTxt}>
  //                     {t("SHOPPING_LIST.delete")}{" "}
  //                   </Text>
  //                 </TouchableOpacity>

  //                 <TouchableOpacity
  //                   style={styles.confirmBtn}
  //                   onPress={() => setIsEditClick(true)}
  //                 >
  //                   <Text style={styles.rescheduleTxt}>
  //                     {t("SHOPPING_LIST.edit")}
  //                   </Text>
  //                 </TouchableOpacity>
  //               </View>
  //             </View>
  //             <View
  //               style={[styles.borderbottom, { backgroundColor: "yellow" }]}
  //             >
  //               <Text style={styles.shoppinglisttxt}>
  //                 {t("SHOPPING_LIST.shoppingthirdHeading")}
  //               </Text>

  //               <View style={styles.shoppinglistOuter}>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.dateTxt}>
  //                     {t("SHOPPING_LIST.datecreatedHeading")}
  //                   </Text>
  //                 </View>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.datedarkTxt}>
  //                     {t("SHOPPING_LIST.dateCreatedPara")}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={styles.shoppinglistOuter}>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.dateTxt}>
  //                     {t("SHOPPING_LIST.lastUpdatedPara")}
  //                   </Text>
  //                 </View>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.datedarkTxt}>
  //                     {t("SHOPPING_LIST.dateCreatedPara")}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={[styles.buttonWrapper]}>
  //                 <TouchableOpacity style={styles.cancelModalBtn}>
  //                   <Text style={styles.cancelTicketTxt}>
  //                     {t("SHOPPING_LIST.delete")}{" "}
  //                   </Text>
  //                 </TouchableOpacity>

  //                 <TouchableOpacity
  //                   style={styles.confirmBtn}
  //                   onPress={() => setIsEditClick(true)}
  //                 >
  //                   <Text style={styles.rescheduleTxt}>
  //                     {t("SHOPPING_LIST.edit")}
  //                   </Text>
  //                 </TouchableOpacity>
  //               </View>
  //             </View>
  //             <View style={[styles.borderbottom, { backgroundColor: "gray" }]}>
  //               <Text style={styles.shoppinglisttxt}>
  //                 {t("SHOPPING_LIST.shoppingfourthHeading")}
  //               </Text>

  //               <View style={styles.shoppinglistOuter}>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.dateTxt}>
  //                     {t("SHOPPING_LIST.datecreatedHeading")}
  //                   </Text>
  //                 </View>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.datedarkTxt}>
  //                     {t("SHOPPING_LIST.dateCreatedPara")}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={styles.shoppinglistOuter}>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.dateTxt}>
  //                     {t("SHOPPING_LIST.lastUpdatedPara")}
  //                   </Text>
  //                 </View>
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={styles.datedarkTxt}>
  //                     {t("SHOPPING_LIST.dateCreatedPara")}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={[styles.buttonWrapper]}>
  //                 <TouchableOpacity style={styles.cancelModalBtn}>
  //                   <Text style={styles.cancelTicketTxt}>
  //                     {t("SHOPPING_LIST.delete")}{" "}
  //                   </Text>
  //                 </TouchableOpacity>

  //                 <TouchableOpacity
  //                   style={styles.confirmBtn}
  //                   onPress={() => setIsEditClick(true)}
  //                 >
  //                   <Text style={styles.rescheduleTxt}>
  //                     {t("SHOPPING_LIST.edit")}
  //                   </Text>
  //                 </TouchableOpacity>
  //               </View>
  //             </View> */}
  //           </View>
  //         </View>
  //       )}

  //       {/* Footer */}

  //       {/* {<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Add New List Modal}>>>>>>>>>>>>>>>>>>>>> */}

  //       <View style={styles.container}>
  //         <Modal
  //           visible={addNewTicketModal}
  //           onRequestClose={() => setAddNewTicketModal(false)}
  //           animationType={"slide"}
  //           transparent={true}
  //         >
  //           <View style={styles.cancelModalMainWrapper}>
  //             <View style={styles.modalContent}>
  //               <View style={styles.cancelTicketHeader}>
  //                 <Text style={styles.addNewTitle}>
  //                   {t("SHOPPING_LIST.addNewList")}
  //                 </Text>
  //                 <TouchableOpacity
  //                   style={styles.closeIcon}
  //                   onPress={() => setAddNewTicketModal(false)}
  //                   testID="cancelTicketMOdalClose"
  //                 >
  //                   <BlackCross />
  //                 </TouchableOpacity>
  //               </View>
  //               <Text style={styles.reasonTxt}>
  //                 {t("SHOPPING_LIST.listName")}
  //               </Text>
  //               <TextInput
  //                 style={styles.input}
  //                 value={firstName}
  //                 onChangeText={handleFirstName}
  //               />

  //               <Text style={styles.reasonTxt}>
  //                 {t("SHOPPING_LIST.descriptiontxt")}
  //               </Text>
  //               <TextInput
  //                 multiline
  //                 numberOfLines={2}
  //                 style={styles.textInputContainer}
  //                 value={ListName}
  //                 onChangeText={handleListName}
  //               />

  //               <View style={styles.checkboxContainer}>
  //                 <CheckBox
  //                   disabled={false}
  //                   value={isCheck}
  //                   onValueChange={handleCheck}
  //                 />
  //                 <Text style={styles.checkBoxText}>
  //                   {t("SHOPPING_LIST.setasText")}
  //                 </Text>
  //               </View>

  //               <View style={[styles.buttonWrapper]}>
  //                 <TouchableOpacity
  //                   testID="cancelTicketModalCancelButton"
  //                   style={styles.cancelModalBtn}
  //                   onPress={() => setAddNewTicketModal(false)}
  //                 >
  //                   <Text style={styles.cancelTicketTxt}>
  //                     {t("SHOPPING_LIST.cancel")}{" "}
  //                   </Text>
  //                 </TouchableOpacity>

  //                 <TouchableOpacity
  //                   style={styles.confirmBtn}
  //                   testID="cancelTicketModalConfirmButton"
  //                   onPress={() => {
  //                     if (firstName.length > 0) addShoppingList();
  //                   }}
  //                 >
  //                   <Text style={styles.rescheduleTxt}>
  //                     {t("SHOPPING_LIST.confirm")}
  //                   </Text>
  //                 </TouchableOpacity>
  //               </View>
  //             </View>
  //           </View>
  //         </Modal>
  //       </View>

  //       {/* {<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Edit New List Modal}>>>>>>>>>>>>>>>>>>>>> */}

  //       <View style={styles.container}>
  //         <Modal
  //           visible={editNewTicketModal}
  //           onRequestClose={() => setEditNewTicketModal(false)}
  //           animationType={"slide"}
  //           transparent={true}
  //         >
  //           <View style={styles.cancelModalMainWrapper}>
  //             <View style={styles.modalContent}>
  //               <View style={styles.cancelTicketHeader}>
  //                 <Text style={styles.addNewTitle}>
  //                   {t("SHOPPING_LIST.editNewList")}
  //                 </Text>
  //                 <TouchableOpacity
  //                   style={styles.closeIcon}
  //                   onPress={() => setEditNewTicketModal(false)}
  //                   testID="cancelTicketMOdalClose"
  //                 >
  //                   <BlackCross />
  //                 </TouchableOpacity>
  //               </View>
  //               <Text style={styles.reasonTxt}>
  //                 {t("SHOPPING_LIST.listName")}
  //               </Text>
  //               <TextInput
  //                 style={styles.input}
  //                 value={firstName}
  //                 onChangeText={handleFirstName}
  //               />

  //               <Text style={styles.reasonTxt}>
  //                 {t("SHOPPING_LIST.descriptiontxt")}
  //               </Text>
  //               <TextInput
  //                 multiline
  //                 numberOfLines={2}
  //                 style={styles.textInputContainer}
  //                 value={ListName}
  //                 onChangeText={handleListName}
  //               />

  //               <View style={styles.checkboxContainer}>
  //                 <CheckBox
  //                   disabled={false}
  //                   value={isCheck}
  //                   onValueChange={handleCheck}
  //                 />
  //                 <Text style={styles.checkBoxText}>
  //                   {t("SHOPPING_LIST.setasText")}
  //                 </Text>
  //               </View>

  //               <View style={[styles.buttonWrapper]}>
  //                 <TouchableOpacity
  //                   testID="cancelTicketModalCancelButton"
  //                   style={styles.cancelModalBtn}
  //                   onPress={() => {
  //                     setAddNewTicketModal(false);
  //                     setEditNewTicketModal(false);
  //                   }}
  //                 >
  //                   <Text style={styles.cancelTicketTxt}>
  //                     {t("SHOPPING_LIST.cancel")}{" "}
  //                   </Text>
  //                 </TouchableOpacity>

  //                 <TouchableOpacity
  //                   style={styles.confirmBtn}
  //                   testID="cancelTicketModalConfirmButton"
  //                 >
  //                   <Text style={styles.rescheduleTxt}>
  //                     {t("SHOPPING_LIST.update")}
  //                   </Text>
  //                 </TouchableOpacity>
  //               </View>
  //             </View>
  //           </View>
  //         </Modal>
  //       </View>

  //       <FooterComponent navigation={navigation} />
  //     </ScrollView>
  //   </View>
  // );
};

export default ShoppingList;
