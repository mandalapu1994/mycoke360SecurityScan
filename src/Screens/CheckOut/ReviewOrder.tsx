import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from "./styles";




interface Product {
  product_id: string;
  productTitle: string;
  productQuantity: string;
  sku: string;
  upc: string;
  price: string;
  savedPrice: string;
}
const ReviewOrder: React.FC = () => {

    const OrderInfo:Product[] = [
        {
            "product_id": 'order_11',
            "productTitle": "Diet Coke Bottles",
            "productQuantity": "20 fl oz,24 Pack",
            "sku": "119827",
            "upc": "490000400458",
            "price": "$150.37",
            "savedPrice": "$50.42"
        },
        {
            "product_id": 'order_22',
            "productTitle": "Diet Coke Bottles",
            "productQuantity": "20 fl oz,24 Pack",
            "sku": "119827",
            "upc": "490000400458",
            "price": "$150.37",
            "savedPrice": "$50.42"
        },
        {
            "product_id": 'order_33',
            "productTitle": "Diet Coke Bottles",
            "productQuantity": "20 fl oz,24 Pack",
            "sku": "119827",
            "upc": "490000400458",
            "price": "$150.37",
            "savedPrice": "$50.42"
        },
        {
            "product_id": 'order_44',
            "productTitle": "Diet Coke Bottles",
            "productQuantity": "20 fl oz,24 Pack",
            "sku": "119827",
            "upc": "490000400458",
            "price": "$150.37",
            "savedPrice": "$50.42"
        },
        {
            "product_id": 'order_55',
            "productTitle": "Diet Coke Bottles",
            "productQuantity": "20 fl oz,24 Pack",
            "sku": "119827",
            "upc": "490000400458",
            "price": "$150.37",
            "savedPrice": "$50.42"
        },
        {
            "product_id": 'order_66',
            "productTitle": "Diet Coke Bottles",
            "productQuantity": "20 fl oz,24 Pack",
            "sku": "119827",
            "upc": "490000400458",
            "price": "$150.37",
            "savedPrice": "$50.42"
        },
        {
            "product_id": 'order_77',
            "productTitle": "Diet Coke Bottles",
            "productQuantity": "20 fl oz,24 Pack",
            "sku": "119827",
            "upc": "490000400458",
            "price": "$150.37",
            "savedPrice": "$50.42"
        },
        {
            "product_id": 'order_88',
            "productTitle": "Diet Coke Bottles",
            "productQuantity": "20 fl oz,24 Pack",
            "sku": "119827",
            "upc": "490000400458",
            "price": "$150.37",
            "savedPrice": "$50.42"
        },
    ]
    console.log(OrderInfo.length, '====<<<<<')

    return (
        <View style={styles.productInfoMainWrapper}>
            {
                OrderInfo.map((product:Product, index:number) => {
                    return (
                        <View key={product.product_id} >
                            <View style={styles.productInfoWrapper} >
                                <Image source={require('../../assets/images/DietCoke.png')} style={styles.productImg} />
                                <View style={styles.productInfoRight}>
                                    <Text style={styles.orderTitle}>{product.productTitle}</Text>
                                    <Text style={styles.orderTitle}>{product.productQuantity}</Text>
                                    <View style={styles.skuMainWrapper}>

                                        <View style={styles.skuWrapper}>

                                            <Text style={styles.skuTxt}>SKU: </Text>
                                            <Text style={styles.skuNo}>{product.sku}</Text>
                                            <Text style={styles.sectionSeperator}>|</Text>
                                        </View>

                                        <View style={styles.upcWrapper}>

                                            <Text style={styles.skuTxt}>UPC: </Text>
                                            <Text style={styles.skuNo}>{product.sku}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.productPriceWrapper}>

                                        <Text style={styles.productPriceTxt}>{product.price}</Text>
                                        <View style={styles.savedMoneyWrapper}>

                                            <Text >Money Saved: </Text>
                                            <Text>{product.savedPrice}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                </View>
                            </View>
                            {(OrderInfo.length - 1 > index) ? <Separator /> : ''}

                        </View>
                    )
                })
            }

        </View>
    )
}

export default ReviewOrder;

const Separator = () => <View style={styles.separator} />;