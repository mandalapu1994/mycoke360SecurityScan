import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ScrollView,
    Image,
    Button,
    Pressable,
    Dimensions,
    useColorScheme,
    ImageBackground,
    TouchableWithoutFeedback,
    Platform,
    Modal as ReactNativeModal


} from 'react-native';
import styles from "./styles";
import MenuIcon from "../../assets/images/MenuIcon";
import SearchIcon from "../../assets/images/SearchIcon";
import AddToCart from "../../assets/images/AddToCart";
import SearchBar from '../../components/SearchBar';
import ForwardScrollArrow from '../../assets/images/ForwardScrollArrow'
import BackwardScrollArrow from '../../assets/images/BackwardScrollArrow'
import VerticalLine from "../../assets/images/VerticalLine";
import SaveCard from "../../assets/images/SaveCard";
import FooterComponent from '../../components/FooterComponent';
import TopTabsMultiple from '../../components/TopTabsMultiple';
import OrderBuilder from '../OrderBuilder';
import ShoppingList from '../ShoppingList';
import ProductListIcon from "../../assets/images/ProductListIcon";
import OrderBuilderIcon from "../../assets/images/OrderBuilderIcon";
import ShopListIcon from "../../assets/images/ShopListIcon";
import { useTranslation } from "react-i18next";
// import {FlatListSlider} from 'react-native-flatlist-slider';
import Header from '../../components/Header';
import { ProductList } from '../../utils/DumProductListData';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { useIsFocused } from '@react-navigation/native';
import { AddToCartFunc } from '../../utils/CartFunctions';
import QuantityManager from '../../components/QuantityManager/QuantityManager';
import ImageComponent from '../../components/ImageComponent/ImageComponent';


import { postCreateCartItem } from '../../Api/apiService';
import { CART_LENGTH } from '../../redux/Reducer/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '../../assets/images/Close'
import Loader from '../../components/Loader/loader';
import { findMatchingKey } from '../../utils/FiltterEnum';

const ProductDetails: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const Product: any = route.params.product || {}
    const itemInCartCount: any = route.params.itemInCart
    const stockStatus: any = route.params.stockStatus
    const cartId: any = route.params.cartId;
    const cartItems: any = route.params.cartItems;
    const selectedAccId: any = route.params.selectedAccId
    const webStoreId: any = route.params.webStoreId


    const Focued = useIsFocused()
    // console.log(route.params.product, 'CHECK THE PRODUCT WE GOT --------------------------')

    const [selectedIndex, setSelectedIndex] = useState('0');
    const [quantity, setQuantity] = useState(Product.Quantity ? Number(Product.Quantity): 1);
    const [productsImages, setProductsImages] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [productList, setProductList] = useState(ProductList)
    const flatListRef = useRef<any>(null);
    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const dispatch = useDispatch()
    const cartLength = useSelector((state: any) => state.cart.CartLength);
    const [addToCartModal, setAddToCartModal] = useState<boolean>(false)
    const loader = useSelector((state: any) => state.loader.isLoaderVisible);
    const [filteredProductDetailsData, setFilteredProductDetailsData] = useState<any[]>([])


console.log("ProductDetails===Product=",Product.Quantity ,Number(Product.Quantity),'ProductDetails===Product',Product);

const{Name = '',StockKeepingUnit ='', EANUPC__c = '',Brand__c = '',FlavorFormula__c ='',CalorieCategory__c = '',
Caffeine__c = '',Case_Quantity__c = '', PackSize__c = '',PackType__c = '',Flavor_Cona__c = '',
BrandLookUpName__c = '',Unit_Size__c = ''}=Product.fields
const{id = ''} = Product

const CalorieCategory = findMatchingKey('Calorie Category',CalorieCategory__c)
console.log('======CalorieCategory====',CalorieCategory)

const PackSize = findMatchingKey('package Size',PackSize__c)
console.log('======PackSize====',PackSize__c)

const PackType = findMatchingKey('Pack Type',PackType__c)
console.log('======PackSize====',PackType)

    const handleQuantityChange = (id: any, quantity: any) => {

        const CloneData = [...productList]
        const updatedProducts = CloneData.map(product => {
            if (product.Id === id) {
                return { ...product, quantity };
            }
            return product;
        });
        setProductList(updatedProducts);
    };


    const handleInput = (Id: any, num: any) => {
        setQuantity(Number(num))
    }
    // Function to find images by product ID
    // Function to get all images by product ID
    const findImagesByProductId = async (productId: any) => {
        console.log("productId=", productId)
        try {
            const destDir = `${Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.CacheDir}/testImage`;

            // List all files in the directory
            const { config, fs } = RNFetchBlob;
            // let PictureDir = fs.dirs.PictureDir;
            let PictureDir = `${Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir}`
            const files = await RNFetchBlob.fs.ls(PictureDir);

            const matchingImages: any = [];
            console.log(">files>>>", files);
            // Iterate through the files and check for the product ID in their names
            for (const file of files) {
                if (file.includes(`image_${productId}_`)) {
                    matchingImages.push(`${PictureDir}/${file}`);
                    console.log(">>>>", `${PictureDir}/${file}`);
                }
            }


            // matchingImages will contain the paths of all images with the specified product ID
            return matchingImages;
        } catch (error) {
            console.error('Error finding images by product ID:', error);
            return [];
        }
    };


    const productDetailsData = [
        { key: 'brandTitle', label: 'ADD_TO_CART.brandTitle', value: BrandLookUpName__c },
        { key: 'flavorTitle', label: 'ADD_TO_CART.flavorTitle', value: Flavor_Cona__c },
        { key: 'caloriesTitle', label: 'ADD_TO_CART.caloriesTitle', value: CalorieCategory__c },
        { key: 'caffeineTitle', label: 'ADD_TO_CART.caffeineTitle', value: Caffeine__c },
        { key: 'caseTitle', label: 'ADD_TO_CART.caseTitle', value: Case_Quantity__c },
        { key: 'unitsizeTitle', label: 'ADD_TO_CART.unitsizeTitle', value: Unit_Size__c },
        { key: 'packagetypeTitle', label: 'ADD_TO_CART.packagetypeTitle', value: PackType__c },
      ];



    useEffect(() => {
        console.log('starts:',);
        setImages([]);
        setProductsImages(null)
        setQuantity(Product.Quantity ? Number(Product.Quantity): 1);
        setCurrentIndex(0);
        setSelectedItemIndex(null)
        findImagesByProductId(Product.Id)
            .then((matchingImages) => {
                console.log('Matching image paths:', matchingImages);

                setImages(matchingImages);
                matchingImages.length > 0 && setProductsImages(matchingImages[0]);
                // Do something with the matching image paths, such as displaying them in your app
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        console.log('end:',);

        setFilteredProductDetailsData(productDetailsData.filter(obj => obj.value !== undefined && obj.value !== null && obj.value !== ''))

    }, [Focued]);

    const DATA = [
        { image: require("../../assets/images/ProductListIcon.png"), "tabName": t('ADD_TO_CART.TABS.productlistTab'), icon: <ProductListIcon />, selectedIcon: <ProductListIcon color="red" /> },
        { image: require("../../assets/images/ProductListIcon.png"), "tabName": t('ADD_TO_CART.TABS.orderbuilderTab'), icon: <OrderBuilderIcon />, selectedIcon: <OrderBuilderIcon color="red" /> },
        { image: require("../../assets/images/ProductListIcon.png"), "tabName": t('ADD_TO_CART.TABS.shoppinglistTab'), icon: <ShopListIcon />, selectedIcon: <ShopListIcon color="red" /> },
    ]




    const onImagePressed = (item: any, index: any) => {

        setProductsImages(item)

        setSelectedItemIndex(index);

    }






    const goForward = () => {
        if (currentIndex < images.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
            setCurrentIndex(currentIndex + 1);
        }

    };



    const goBackward = () => {
        if (currentIndex > 0) {
            flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
            setCurrentIndex(currentIndex - 1);
        }

    };


    const addToCartHandler = () => {
        const productClone = { ...Product, Quantity: quantity }

        const bodyObject = {
            "productId": productClone.id,
            "quantity": productClone.Quantity,
            "type": "Product"
        }

        console.log(webStoreId, cartId, selectedAccId, bodyObject, 'cldskvhfbdkv')

        postCreateCartItem(webStoreId, cartId, selectedAccId, bodyObject)
            .then((res) => {
                if (res) {
                    console.log(res, 'res----')

                    let foundProductinCart = cartItems.filter((cartItem: any) => cartItem.Product2Id === productClone.Id)
                    console.log(foundProductinCart, 'found--------------')
                    if (foundProductinCart.length < 1) {
                        console.log(foundProductinCart, 'found2222--------------')
                        dispatch(CART_LENGTH(cartLength + 1))
                    }
                    setAddToCartModal(true)
                }
            })
            .catch((err) => {
                console.log(err, 'err-----')
            })


        // AddToCartFunc(productClone, cartId, cartDeliveryGroupId, cartItems)
    };

    const renderImages = ({ item, index }: { item: any, index: number }) => {
        return <TouchableOpacity onPress={() => onImagePressed(item, index)}
            style={
                selectedItemIndex === index ? styles.selectedImage : styles.unselectedImage
            }
        >
            <Image source={{ uri: `file://${item}` }} style={{ width: 100, height: 100, }} />
        </TouchableOpacity>
    }

    const Separator = () => <View style={styles.separator} />;

    // const ProductRender = ({ item }: { item: any }) => {
    //     const image = require("../../assets/images/CocaCola.png")
    //     const productName = item?.Name;
    //     const SKU = item.StockKeepingUnit // item?.sku;
    //     const UPC = item?.EANUPC__c // item?.upc;
    //     const stock = item?.stock;
    //     const quantity = parseInt(item?.Quantity || 0)


    //     return (
    //         <View style={[styles.whiteCards, styles.whiteCardelevated]}>
    //             <View style={styles.productStyle}>
    //                 <Image source={image} />


    //                 <Text style={styles.smallTextPara}>{productName}</Text>

    //                 <View style={styles.productNumber}>
    //                     <View style={styles.gapStyle}>
    //                         <Text style={styles.productPara}>{t('ADD_TO_CART.skuTitle')}<Text style={{ fontWeight: "bold" }}>{SKU}</Text></Text>
    //                     </View>
    //                     <View style={styles.gapStyle}>
    //                         <VerticalLine />
    //                     </View>
    //                     <View style={styles.gapStyle}>
    //                         <Text style={styles.productPara}>{t('ADD_TO_CART.upcTitle')}<Text style={{ fontWeight: "bold" }}>{UPC}</Text></Text>
    //                     </View>
    //                 </View>

    //                 <View style={styles.productNumber}>
    //                     <Pressable
    //                         onPress={() => handleQuantityChange(item.id, quantity > 0 ? quantity - 1 : 1)}
    //                         style={[styles.incrementDecrementButtons, styles.decrementButton]}>
    //                         {({ pressed }) => (
    //                             <Text style={styles.incrementDecrementButtonText}>-</Text>
    //                         )}
    //                     </Pressable>
    //                     <View style={styles.incrementDecrementtextOuter}>
    //                         <Text style={styles.incrementDecrementtext}>{quantity}</Text>
    //                     </View>
    //                     <Pressable
    //                         onPress={() => handleQuantityChange(item.id, quantity + 1)}
    //                         style={[styles.incrementDecrementButtons, styles.incrementButton]}>
    //                         {({ pressed }) => (
    //                             <Text style={styles.incrementDecrementButtonText}>+</Text>
    //                         )}
    //                     </Pressable>
    //                     <View style={styles.gapFlexStyle}>
    //                         <TouchableHighlight
    //                             onPress={() => addToCartHandler()}
    //                             // color={"#FFFFFF"}
    //                             underlayColor={'#F40000'}
    //                             style={styles.roundButton}>

    //                             <Text style={styles.whiteText}>{t('ADD_TO_CART.addtocartTitle')}</Text>
    //                         </TouchableHighlight>
    //                     </View>
    //                 </View>

    //                 <View style={styles.shoppinglistOuter}>
    //                     <View style={styles.gapStyle}>
    //                         <Text style={styles.shoppinglistPara}>{" "}{t('ADD_TO_CART.itemsTitle')}</Text>
    //                     </View>
    //                     <View style={[styles.shoppinglistInner, styles.gapFlexStyle]}>
    //                         <View style={styles.gapStyle}>
    //                             <SaveCard />
    //                         </View>

    //                         <Text style={styles.shoppinglistPara}>{t('ADD_TO_CART.savetoTitle')}</Text>

    //                     </View>
    //                 </View>
    //             </View>

    //         </View>)
    // }


      
      const renderProductDetails = ({ item, index }: { item: any, index: number })  => {
            return <View style={styles.productDetailsInner}>
          <View style={styles.productParaBrand}>
            <Text style={styles.brandTitle}>{t(item.label)}</Text>
            <Text style={styles.brandName}>{item.value ? item.value : "- - -"}</Text>
          </View>
        </View>
      };

    return (

        <View style={styles.bodyFlexStyle}>
            <ScrollView>


                <View style={styles.projectListHeader}>
                    <TopTabsMultiple
                        data={DATA}
                        selectedIndex={parseInt(selectedIndex)}
                        onPress={(index: any) => setSelectedIndex(index + '')}
                    />
                    {selectedIndex === '1' && <OrderBuilder navigation={navigation} />}
                    {selectedIndex === '2' && <ShoppingList navigation={navigation} />}
                </View>

                {selectedIndex === '0' &&
                    <TouchableOpacity 
                        style={styles.backButtonOuter}
                        onPress={()=>navigation.navigate('ProductsListing')}
                        >
                            <BackwardScrollArrow />
                            <Text style={styles.backText}>{" Back "}</Text>
                    </TouchableOpacity>
                }

                {selectedIndex === '0' &&
                    <View>
                        <View style={styles.BlockWhite}>
                            <View style={styles.productStyle}>
                                {/* <Image source={{ uri: `file://${productsImages}` }} style={styles.selectedProductImg} /> */}
                                {
                                    productsImages ?
                                        <ImageComponent productsImages={productsImages} style={styles.selectedProductImg} />
                                        :
                                        <Image
                                            source={require("../../assets/images/CocaCola.png")}
                                            style={styles.selectedProductImg}
                                        />
                                }


                                <View style={styles.productScrollOuter}>
                                    <TouchableOpacity style={styles.arrowButton} onPress={goBackward}>
                                        <BackwardScrollArrow />
                                    </TouchableOpacity>
                                    <FlatList
                                        data={images}
                                        renderItem={renderImages}
                                        horizontal={true}
                                        keyExtractor={(item: any, index: number) => index + ""}
                                        ref={flatListRef}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                    <TouchableOpacity style={styles.arrowButton} onPress={goForward}>
                                        <ForwardScrollArrow />
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.smallTextPara}>{Name}</Text>

                                <View style={styles.productNumber}>
                                    <View style={styles.gapStyle}>
                                        <Text style={styles.productPara}>{t('ADD_TO_CART.skuTitle')} <Text style={{ fontWeight: "bold" }}>{StockKeepingUnit}</Text></Text>
                                    </View>
                                    <View style={styles.gapStyle}>
                                        <VerticalLine />
                                    </View>
                                    <View style={styles.gapStyle}>
                                        <Text style={styles.productPara}>{t('ADD_TO_CART.upcTitle')}<Text style={{ fontWeight: "bold" }}>{EANUPC__c}</Text></Text>
                                    </View>
                                </View>

                                <View style={styles.productNumber}>

                                    <QuantityManager
                                        quantity={quantity}
                                        Id={id}
                                        minusQty={() => setQuantity(quantity > 1 ? Number(quantity) - 1 : 1)}
                                        addQty={() => { setQuantity(Number(quantity) + 1) }}
                                        inputeHandle={handleInput}
                                        buttonBorder={true}
                                        editableInput={true}
                                        isDisabled={stockStatus === 'outOfStock' ? true : false}
                                    />
                                    <View style={styles.gapFlexStyle}>
                                        <TouchableHighlight
                                            disabled={stockStatus === 'outOfStock' ? true : false}
                                            onPress={() => addToCartHandler()}
                                            // color={"#FFFFFF"}
                                            underlayColor={'#F40000'}
                                            style={styles.roundButton}>

                                            <Text style={styles.whiteText}>Add to Cart</Text>
                                        </TouchableHighlight>
                                    </View>

                                </View>

                                <View style={styles.shoppinglistOuter}>
                                    {
                                        itemInCartCount > 0 &&
                                        <View style={styles.gapStyle}>
                                            <Text style={styles.shoppinglistPara}>{itemInCartCount}{t('ADD_TO_CART.itemsTitle')}</Text>
                                        </View>
                                    }
                                    <View style={[styles.shoppinglistInner, styles.gapFlexStyle]}>
                                        {
                                            stockStatus === 'outOfStock' || stockStatus === 'lowstock' ?
                                                (
                                                    <View style={{ alignItems: 'baseline' }}>
                                                        <View style={styles.pinkOutBox}>
                                                            <Text style={styles.redTextSecondry}>
                                                                {stockStatus === 'outOfStock' ? 'Out of Stock' : ''}
                                                                {stockStatus === 'lowstock' ? 'Low Stock' : ''}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                ) : ''
                                        }
                                    </View>
                                    {/* <View style={[styles.shoppinglistInner, styles.gapFlexStyle]}>
                                        <View style={styles.gapStyle}>
                                            <SaveCard />
                                        </View>

                                        <Text style={styles.shoppinglistPara}>{t('ADD_TO_CART.savetoTitle')}</Text>

                                    </View> */}
                                </View>
                            </View>
                            <Separator />
                            {/* Product Details COntainer */}
                            <View style={styles.productDetailHeader}>
                                <Text style={styles.productDetailPara}>{t('ADD_TO_CART.productdetailTitle')}</Text>
                            </View>

                            <View style={styles.productDetailOuter}>
                                <FlatList
                                    data={filteredProductDetailsData}
                                    renderItem={renderProductDetails}
                                    keyExtractor={(item:any, index:any) => index}
                                    numColumns={2} 
                                    columnWrapperStyle={styles.productDetailOuter} 
                                />

                            </View>

                        </View>

                        {/* <View style={styles.viewText}>
                            <Text style={styles.smallTextPara}>{t('ADD_TO_CART.thoseTitle')} </Text>
                        </View> */}


                        {/* <View style={styles.cardWhiteContainer}>
                            <FlatList
                                data={productList}
                                renderItem={ProductRender}
                                horizontal={true}
                                keyExtractor={(item:any,index:any) => index}
                                ref={flatListRef}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View> */}


                        {/* Footer */}

                        <FooterComponent />
                    </View>
                }

                <ReactNativeModal
                    visible={addToCartModal}
                    transparent={true}
                    onRequestClose={() => setAddToCartModal(false)}
                >
                    <View style={styles.modalContainerAddToCart}>
                        <View style={styles.modalbox}>
                            <View style={styles.modalHeader}>
                                <Text style={[styles.modalText]}>Add to Cart</Text>
                                <TouchableOpacity
                                    onPress={() => setAddToCartModal(false)}
                                >
                                    <CloseIcon />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.sortInnerDiv}>
                                <Text style={[styles.blackText]}>
                                    Item was added to Cart
                                </Text>
                            </View>
                            <View style={styles.buttonGroup}>
                                <TouchableHighlight
                                    testID="OrderHistoryCancelOrderYes"
                                    // onPress={}
                                    // color={"#FFFFFF"}
                                    underlayColor={"#F40000"}
                                    style={[styles.roundButton2]}
                                    onPress={() => setAddToCartModal(false)}
                                >
                                    <Text style={[styles.buttonText, { color: "#000" }]}>
                                        Continue Shopping
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    testID="OrderHistoryCancelOrderNo"
                                    onPress={() => {
                                        setAddToCartModal(false)
                                        navigation.navigate('ViewAddToCart')
                                    }}
                                    // color={"#FFFFFF"}
                                    underlayColor={"#F40000"}
                                    style={[
                                        styles.roundButton2,
                                        { backgroundColor: "#000", marginHorizontal: 15 },
                                    ]}
                                >
                                    <Text style={[styles.buttonText, { color: "#FFF" }]}>View Cart</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </ReactNativeModal>


            </ScrollView>
            {loader &&  <Loader message="Please wait..." />}
        </View>


    );
};

export default ProductDetails;



