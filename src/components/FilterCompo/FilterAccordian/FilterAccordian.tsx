import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import styles from "../styles";
import UpArrow from "../../../assets/images/UpArrow";
import DownArrow from "../../../assets/images/DownArrow";
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { addFilters } from '../../../redux/Reducer/filtersReducer';
import { useTranslation } from "react-i18next";


type AccordionItemProps = PropsWithChildren<{
  title: string,
  style:any
}>;

function AccordionItem({ children, title }: AccordionItemProps): JSX.Element {

  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;



  return (
    <View>

      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <View style={styles.projectListOuter}>
          <View style={styles.accordianflex}>
            {expanded ?
              <Text style={{ color: "#F00" }}>{title}</Text>
              :
              <Text style={styles.accordTitle}>{title}</Text>
            }
          </View>


          <View style={styles.accordianflex}>

            {expanded ? <UpArrow /> : <DownArrow />}

          </View>
        </View>

      </TouchableOpacity>



      {expanded && body}

    </View>
  );
}
// const Data :any = [
//   {
//     title: 'Brand',
//     products: [
//       { id: 1, productName: 'Diet Coke', quantity: 7, select: false },
//       { id: 2, productName: 'Mello Yello', quantity: 3, select: false },
//       { id: 3, productName: 'Segrams', quantity: 5, select: false },
//       { id: 4, productName: 'Coca-Cola', quantity: 15, select: false },
//       { id: 5, productName: 'Fanta', quantity: 14, select: false },
//       { id: 6, productName: 'Fresca', quantity: 3, select: false },
//       { id: 7, productName: 'Pibba Xtra', quantity: 13, select: false },
//       { id: 8, productName: 'Inca Kola', quantity: 1, select: false },
//       { id: 9, productName: 'Barqs', quantity: 7, select: false },
//       { id: 10, productName: 'Sprite', quantity: 1, select: false },
//     ],
//   },
//   {
//     title: 'Flavor',
//     products: [
//       { id: 11, productName: 'Diet Coke', quantity: 7, select: false },
//       { id: 12, productName: 'Mello Yello', quantity: 3, select: false },
//       { id: 13, productName: 'Segrams', quantity: 5, select: false },
//       { id: 14, productName: 'Coca-Cola', quantity: 15, select: false },
//       { id: 15, productName: 'Fanta', quantity: 14, select: false },
//       { id: 16, productName: 'Fresca', quantity: 3, select: false },
//       { id: 17, productName: 'Pibba Xtra', quantity: 13, select: false },
//       { id: 18, productName: 'Inca Kola', quantity: 1, select: false },
//       { id: 19, productName: 'Barqs', quantity: 7, select: false },
//       { id: 20, productName: 'Sprite', quantity: 1, select: false },
//     ],
//   },
//   {
//     title: 'Calories',
//     products: [
//       { id: 21, productName: 'Diet Coke', quantity: 7, select: false },
//       { id: 22, productName: 'Mello Yello', quantity: 3, select: false },
//       { id: 23, productName: 'Segrams', quantity: 5, select: false },
//       { id: 24, productName: 'Coca-Cola', quantity: 15, select: false },
//       { id: 25, productName: 'Fanta', quantity: 14, select: false },
//       { id: 26, productName: 'Fresca', quantity: 3, select: false },
//       { id: 27, productName: 'Pibba Xtra', quantity: 13, select: false },
//       { id: 28, productName: 'Inca Kola', quantity: 1, select: false },
//       { id: 29, productName: 'Barqs', quantity: 7, select: false },
//       { id: 30, productName: 'Sprite', quantity: 1, select: false },
//     ],
//   },
//   {
//     title: 'Package Type',
//     products: [
//       { id: 31, productName: 'Diet Cocke', quantity: 7, select: false },
//       { id: 32, productName: 'Mello Yello', quantity: 3, select: false },
//       { id: 33, productName: 'Segrams', quantity: 5, select: false },
//       { id: 34, productName: 'Coca-Cola', quantity: 15, select: false },
//       { id: 35, productName: 'Fanta', quantity: 14, select: false },
//       { id: 36, productName: 'Fresca', quantity: 3, select: false },
//       { id: 37, productName: 'Pibba Xtra', quantity: 13, select: false },
//       { id: 38, productName: 'Inca Kola', quantity: 1, select: false },
//       { id: 39, productName: 'Barqs', quantity: 7, select: false },
//       { id: 40, productName: 'Sprite', quantity: 1, select: false },
//     ],
//   },
//   {
//     title: 'Until Size',
//     products: [
//       { id: 41, productName: 'Diet Coke', quantity: 7, select: false },
//       { id: 42, productName: 'Mello Yello', quantity: 3, select: false },
//       { id: 43, productName: 'Segrams', quantity: 5 },
//       { id: 44, productName: 'Coca-Cola', quantity: 15, select: false },
//       { id: 45, productName: 'Fanta', quantity: 14, select: false },
//       { id: 46, productName: 'Fresca', quantity: 3, select: false },
//       { id: 47, productName: 'Pibba Xtra', quantity: 13, select: false },
//       { id: 48, productName: 'Inca Kola', quantity: 1, select: false },
//       { id: 49, productName: 'Barqs', quantity: 7, select: false },
//       { id: 50, productName: 'Sprite', quantity: 1, select: false },
//     ],
//   },
// ];



interface FilterAccordianProps {
  setFilters: any; // Adjust the type of filters
}



function FilterAccordian({ setFilters }: FilterAccordianProps): JSX.Element {
  const filterList = useSelector((state:any) => state.filters.filters);
  const availableFilters = useSelector((state:any) => state.filters.createAllFilters);
  const dispatch = useDispatch();
  //Checkbox Values

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleFresca, setToggleFresca] = useState(false);
  const [toggleMelloYello, setToggleMelloYello] = useState(false);
  const [togglePibbXtra, setTogglePibbXtra] = useState(false);
  const [toggleSeagram, setToggleSeagram] = useState(false);
  const [toggleInca, setToggleInca] = useState(false);
  const [toggleCoca, setToggleCoca] = useState(false);
  const [toggleBarq, setToggleBarq] = useState(false);
  const [toggleFanta, setToggleFanta] = useState(false);
  const [toggleSprite, setToggleSprite] = useState(false);
  const [data, setData] = useState(availableFilters);



  useEffect(() => {
    isCheckFillter()

  }, [])



  const { t } = useTranslation();


  /**
   * The function AddFilter sets the filters based on the selected products in the updatedData.
   * @param updatedData - user select checkbox this data is updated data only filter the product/category
   */
  const AddFilter = (updatedData:any) => {

    if (updatedData?.length > 0) {
      const filteres = updatedData.flatMap((category:any) =>
        category.filters.filter((product:any) => product.select)
      );
      setFilters(filteres)


    }
  }

  /**
      * The function updates the main array based on the products array and a filter list.
      */
  const isCheckFillter = () => {
    // Update mainArray based on productsArray
    if (filterList?.length != 0) {
      const updatedMainArray = data.map((brand:any )=> {
        const updatedProducts = brand.filters.map((filter:any )=> {
         
          const matchedProduct = filterList.find((pro:any) => pro.id === filter.id);
          if (matchedProduct) {
            return { ...filter, select: matchedProduct.select };
          }
          return { ...filter, select: false };
        });
        return { ...brand, filters: updatedProducts };
      });
      setData(updatedMainArray)
      setFilters(filterList)
    }

  }



  /**
   * The function handles the selection of a checkbox and updates the data accordingly while also
   * calling another function to add filters.
   * @param value - The value of the checkbox that was clicked, which will be either true or false
   * depending on whether the checkbox is checked or unchecked.
   * @param mainIndex - The index of the main item in the data array that contains the sub-items.
   * @param subIndex - subIndex is the index of the child element in the products array of the main
   * element at the mainIndex in the data array.
   */
  const handleCheckBox = (value:any, mainIndex:any, subIndex:any) => {
    console.log(value, "value")
    const CloneData = [...data];
    const updatedData = CloneData.map((item, index) => {
      if (item && index === mainIndex) {
        const updatedChildren = item.filters.map((child:any, subIn:any) => {
          if (subIn === subIndex) {
            return { ...child, select: value };
          }
          return child;
        });
        return { ...item, filters: updatedChildren };
      }
      return item;
    });

    setData(updatedData)

    AddFilter(updatedData)
  }




  const Separator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.accordiancontainer} testID='filterAccordianWrapper' >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <Separator />
        {
          data && data.length > 0 && data.map((Item:any, index:any) => {

            return (<View key={index}>
              <View style={{ backgroundColor: "#FFFFFF", marginLeft: 12, marginRight: 12, marginBottom: 8, }} testID='filterAccordianHolder' >
                <AccordionItem title={Item?.title} style={styles.sortTextPara}>

                 {Item?.filters?.length > 0 && <Separator />} 
                  <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", justifyContent: "space-around" }}>

                    {
                      Item?.filters?.length > 0 && Item.filters.map((element:any, i:any) => {
                        return (

                          <View key={i} style={{ alignItems: "center", flexDirection: "row", width: "45%" }}>
                            <Text>
                              <CheckBox
                                testID='filterAccordianCheckBox'
                                style={styles.editcheckboxdata}
                                disabled={false}
                                value={element.select}
                                onValueChange={(newValue) => handleCheckBox(newValue, index, i)}
                              />
                            </Text>
                            <Text style={styles.brandName}>{element?.filter} ({element?.productCount})</Text>
                          </View>

                        );
                      })

                    }
                  </View>



                </AccordionItem>
              </View>


              <Separator />
            </View>)
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
}

export default FilterAccordian;