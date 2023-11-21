// import React from 'react';
// import {
//     Text,
//     TouchableHighlight,
//     View,
//     ScrollView,
//     Image,
// } from 'react-native';
// import styles from "./styles";
// import { useTranslation } from "react-i18next";
// import { ProductList } from '../../utils/DumProductListData';
// import { useDispatch } from 'react-redux';
// import { REPLACE_CART } from '../../redux/Reducer/cartReducer';



// const ReplaceProduct = ({productId}) => {
// const dispatch = useDispatch()
//     const { t } = useTranslation();

//   const replaceProduct = (replacePoduct) =>{
   
//         dispatch(REPLACE_CART({replacePoduct:replacePoduct,productId:productId}))
        
//   }
//     return (
//         <ScrollView horizontal={true} style={styles.cardWhiteContainer} showsHorizontalScrollIndicator={false}>
//             {
//                 ProductList.map((product, prodIndex) => {
                      
//                         const image = product.image;
//                         const productName = product.productTitle;
//                         const SKU = product.sku;
//                         const UPC = product.upc;
//                         const stock = product.stock;
//                         const quantity = parseInt(product.quantity)
                       
//                     return (
//                         <View style={[styles.whiteCards, styles.whiteCardelevated]} key={prodIndex} >
//                             <View style={styles.productStyle}>
//                                 <Image style={{ width: 90, height: 90 }} source={image} />
//                                 <Text style={styles.smallTextPara}>{productName}</Text>
//                                 <View>
//                                     <Text style={styles.replaceProductPara}>{t('VIEW_CART.skuTitle')}<Text style={{ fontWeight: "bold" }}>{SKU}</Text></Text>
//                                 </View>
//                                 <View>
//                                     <Text style={styles.replaceProductPara}>{t('VIEW_CART.upcTitle')}<Text style={{ fontWeight: "bold" }}>{UPC}</Text></Text>
//                                 </View>
//                                 <View style={{ marginVertical: 10 }} >
//                                     <TouchableHighlight
//                                         color={"#FFFFFF"}
//                                         underlayColor={'#F40000'}
//                                         style={styles.roundButton}
//                                         onPress={()=>replaceProduct(product)}
//                                         >

//                                         <Text style={styles.replaceProductBtn}>{t('VIEW_CART.addtocartTitle')}</Text>
//                                     </TouchableHighlight>
//                                 </View>
//                             </View>
//                         </View>
//                     )
//                 })
//             }

//         </ScrollView>
//     )
// }

// export default ReplaceProduct


import React from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    ScrollView,
    Image,
} from 'react-native';
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { ProductList } from '../../utils/DumProductListData';
import { useDispatch } from 'react-redux';
import { REPLACE_CART } from '../../redux/Reducer/cartReducer';

interface ReplaceProductProps {
    productId: string;
  }

  const ReplaceProduct: React.FC<ReplaceProductProps> = ({ productId }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
  

  const replaceProduct = (replacePoduct: any) =>{
   
        dispatch(REPLACE_CART({replacePoduct:replacePoduct,productId:productId}))
        
  }
    return (
        <ScrollView horizontal={true} style={styles.cardWhiteContainer} showsHorizontalScrollIndicator={false}>
            {
                ProductList.map((product:any, prodIndex:any) => {
                      
                        const image = product.image;
                        const productName = product.productTitle;
                        const SKU = product.sku;
                        const UPC = product.upc;
                        const stock = product.stock;
                        const quantity = parseInt(product.quantity)
                       
                    return (
                        <View style={[styles.whiteCards, styles.whiteCardelevated]} key={prodIndex} >
                            <View style={styles.productStyle}>
                                <Image style={{ width: 90, height: 90 }} source={image} />
                                <Text style={styles.smallTextPara}>{productName}</Text>
                                <View>
                                    <Text style={styles.replaceProductPara}>{t('VIEW_CART.skuTitle')}<Text style={{ fontWeight: "bold" }}>{SKU}</Text></Text>
                                </View>
                                <View>
                                    <Text style={styles.replaceProductPara}>{t('VIEW_CART.upcTitle')}<Text style={{ fontWeight: "bold" }}>{UPC}</Text></Text>
                                </View>
                                <View style={{ marginVertical: 10 }} >
                                    <TouchableHighlight
                                        // color={"#FFFFFF"}
                                        underlayColor={'#F40000'}
                                        style={styles.roundButton}
                                        onPress={()=>replaceProduct(product)}
                                        >

                                        <Text style={styles.replaceProductBtn}>{t('VIEW_CART.addtocartTitle')}</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    )
                })
            }

        </ScrollView>
    )
}

export default ReplaceProduct