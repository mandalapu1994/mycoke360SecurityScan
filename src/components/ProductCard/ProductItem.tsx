import {
    Image,
    ImageRequireSource,
    ImageURISource,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from "react-native";
import React, { useState } from "react";
import { FONT_FAMILY_I_REGULAR } from "../../utils/Theme";
import VerticalLine from "../../assets/images/VerticalLine";
import { useTranslation } from "react-i18next";
import MinusIcon from "../../assets/images/MinusIcon";
import SaveCard from "../../assets/images/SaveCard";
import PlusIcon from "../../assets/images/PlusIcon";
import DeleteIcon from "../../assets/images/DeleteIcon";
import QuantityManager from "../QuantityManager/QuantityManager";
import { Grayscale } from "react-native-color-matrix-image-filters";



type ProductItemType = {
    image: any
    productName: string;
    SKU: string;
    UPC: string;
    quantity: number;
    existingQuantityInCart: number;
    addQty?: () => void;
    minusQty?: () => void;
    addToCart?: () => void;
    inputeHandle?: (id: string, num: any) => void;
    navigateTo?: () => void;
    showBottomDetails?: boolean;
    showDeleteIcon?: boolean;
    Id: string;
    stockStatus: string;
};



export default function ProductItem({
    image,
    productName,
    SKU,
    UPC,
    quantity = 1,
    existingQuantityInCart = 0,
    addQty = () => { },
    minusQty = () => { },
    addToCart = () => { },
    inputeHandle = () => { },
    navigateTo = () => { },
    showBottomDetails = false,
    showDeleteIcon = true,
    Id,
    stockStatus
}: ProductItemType) {
    const { t } = useTranslation();
    const [error, setError] = useState<Boolean>(false)

    const handleImageError = () => {
        setError(true)
    }
    return (
        <View style={styles.parent}>
            <TouchableOpacity
                onPress={() => navigateTo()}
                style={{ alignSelf: "center" }}>

                {error ? (
                    stockStatus === 'outOfStock' ?
                        <Grayscale>
                            <Image
                                source={require("../../assets/images/CocaCola.png")}
                                style={{ width: 92, height: 100, marginRight: 4 }}
                            />
                        </Grayscale>
                        :
                        <Image
                            source={require("../../assets/images/CocaCola.png")}
                            style={{ width: 92, height: 100, marginRight: 4 }}
                        />
                ) : (
                    stockStatus === 'outOfStock' ?
                        <Grayscale>
                            <Image
                                // Replace with your image URL
                                source={image}
                                style={{ width: 92, height: 100, marginRight: 4 }}
                                onError={handleImageError}
                            />
                        </Grayscale>
                        :
                        <Image
                            // Replace with your image URL
                            source={image}
                            style={{ width: 92, height: 100, marginRight: 4 }}
                            onError={handleImageError}
                        />
                )}

            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => navigateTo()}>
                    <Text style={styles.productName}>{productName}</Text>
                </TouchableOpacity>

                {/* SKU & UPC*/}
                <View style={{ flexDirection: "row", marginVertical: 10, marginRight: 10, display:'flex', flexWrap:'wrap' }}>
                    <Text style={styles.skuText}>{t("PRODUCT_LIST.skuTitle")}</Text>
                    <Text style={styles.skuValue}>{SKU}</Text>
                    <View style={{ paddingHorizontal: 5 }}>
                        <VerticalLine />
                    </View>
                    <Text style={styles.upcTitle}>{t("PRODUCT_LIST.upcTitle")}</Text>
                    <Text style={styles.upcValue}>{UPC}</Text>
                </View>
                {
                    stockStatus === 'outOfStock' || stockStatus === 'lowstock' ?
                        (
                            <View style={{ alignItems: 'baseline' }}>
                                <View style={styles.pinkOutBox}>
                                    <Text style={styles.redtext}>
                                        {stockStatus === 'outOfStock' ? 'Out of Stock' : ''}
                                        {stockStatus === 'lowstock' ? 'Low Stock' : ''}

                                    </Text>
                                </View>
                            </View>
                        ) : ''
                }
                {/* Add qty Min qty */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={styles.productButtonWrapper}>
                        <QuantityManager
                            quantity={quantity}
                            Id={Id}
                            addQty={addQty}
                            minusQty={minusQty}
                            inputeHandle={inputeHandle}
                            buttonBorder={false}
                            editableInput={true}
                            isDisabled={stockStatus === 'outOfStock' ? true : false}
                        />
                        <TouchableOpacity
                            disabled={stockStatus === 'outOfStock' ? true : false}
                            onPress={() => addToCart()}
                            style={[styles.addToCartBtn, stockStatus === 'outOfStock' ? { backgroundColor: '#ECEBEA', borderColor: '#ECEBEA', } : { backgroundColor: '#000', borderColor: '#000' }]}
                        >
                            <Text style={[stockStatus === 'outOfStock' ? { textAlign: "center", color: 'black', } : { textAlign: "center", color: 'white' }]}>{t('PRODUCT_LIST.addtocartTitle')}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        showDeleteIcon && <View>
                            <TouchableOpacity
                                // onPress={addToCart}
                                style={{ marginHorizontal: 10 }}
                            >
                                <DeleteIcon />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                {showBottomDetails && (
                    <View style={styles.productExtraDataWrapper}>
                        {
                            existingQuantityInCart > 0 ?
                                <View style={styles.itemInCartWrapper}>
                                    <Text style={[styles.itemInCarttext, styles.fw700]}>
                                        {existingQuantityInCart}{" "}{t('PRODUCT_LIST.itemTitle')}{" "}
                                    </Text>
                                    <Text style={[styles.itemInCarttext, styles.fw400]}>
                                        {t('PRODUCT_LIST.cartTitle')}
                                    </Text>
                                </View>
                                : <View style={styles.itemInCartWrapper}></View>
                        }

                        {/* <View style={styles.saveShoppingListWrapper}>
                            <View style={styles.pr4}>
                                <SaveCard />
                            </View>
                            <Text style={styles.cartBottomtext}>{t('PRODUCT_LIST.saveTitle')}</Text>
                        </View> */}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles: any = StyleSheet.create({
    parent: {
        paddingVertical: 10,
        borderColor: "#DDDBDA",

        borderBottomWidth: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "flex-start",
        flex: 1,
    },
    productName: {
        color: "#000000",
        fontSize: 16,
        lineHeight: 19,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
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
    skuText: {
        color: "#757575",
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "500",
        lineHeight: 18,
        fontSize: 12,
    },
    skuValue: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "500",
        color: "#000",
    },
    upcTitle: {
        color: "#757575",
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "500",
        lineHeight: 18,
        fontSize: 12,
    },
    upcValue: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "500",
        color: "#000",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 6,
        marginRight: 30,
        paddingVertical: 5,
    },
    button: {
        paddingHorizontal: 20,
    },
    addToCartButton: {
        backgroundColor: "#000000",
        borderRadius: 6,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: "center",
        marginRight: 5,
    },
    addToCartButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 12,
        lineHeight: 15,
        fontWeight: "600",

    },
    bottomView: {
        flexDirection: "row",
        marginTop: 13,
        justifyContent: "space-between",
        paddingHorizontal: 5
    },
    label: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "500",
        lineHeight: 15,
    },
    productQuantityCount: {
        height: 30,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        alignItems: "center",
        justifyContent: "center"
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
        backgroundColor: "#000000",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 10,
        paddingVertical: 7,
    },
    addToCartBtnTxt: {
        color: "#FFFFFF",
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
    cartBottomtext: {
        fontSize: 10,
        color: "#000000",
        fontWeight: "500",
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
    redtext: {
        color: "#CC3333",
        fontSize: 12,
        fontFamily: FONT_FAMILY_I_REGULAR,
        fontWeight: "800",
        lineHeight: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

});
function setError(arg0: boolean) {
    throw new Error("Function not implemented.");
}

