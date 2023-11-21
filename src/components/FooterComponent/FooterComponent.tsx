import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Button,
    Pressable,
    ImageBackground,
    TouchableWithoutFeedback,

} from 'react-native';
import styles from "./styles";
import { useTranslation } from "react-i18next";


const Separator = () => <View style={styles.separator} />;
const FooterComponent: React.FC<{navigation?:any,isScreenFrom?:any}> = () => {
    const { t } = useTranslation();



    return (
        <></>
        // <View style={styles.footerContainer} testID='footerWrapper' >

        //     <View style={styles.footerInnerContainer}>

        //         <Image source={require('../../assets/images/FooterLogo.png')} />

        //     </View>


        //     <ImageBackground
        //         source={require("../../assets/images/BackgroundImage.png")}
        //         style={styles.imgfirstdiv
        //         }
        //         imageStyle={{
        //             resizeMode: "cover",
        //             alignSelf: "center",
        //             position: "absolute",
        //             top: -30

        //         }}>

        //     </ImageBackground>



        //     <View style={styles.footerInnerContainer}>
        //         <View style={styles.footerFlexContainer}>
        //             <Pressable 
        //             >
        //                 {({ pressed }) => (
        //                     <View style={styles.gapFlexFooter}>
        //                         <Text style={styles.menuListStyle}>{t("FOOTER_COMPONENT.aboutTitle")}</Text>
        //                     </View>
        //                 )}
        //             </Pressable>
        //             <View style={styles.gapFlexFooter}>
        //                 <Text style={styles.menuListStyle}>{t("FOOTER_COMPONENT.contactTitle")}</Text>
        //             </View>
        //             <View style={styles.gapFlexFooter}>
        //                 <Text style={styles.menuListStyle}>{t("FOOTER_COMPONENT.faqTitle")}</Text>
        //             </View>

        //         </View>
        //     </View>
        //     <Separator />

        //     <View style={styles.footerInnerContainer}>
        //         <Text style={styles.copyRightText}>{t("FOOTER_COMPONENT.copyrightTitle")}</Text>

        //         <View style={styles.footerFlexContainer}>
        //             <View style={styles.gapFlex}>
        //                 <Text style={styles.footerMenuStyle}>{t("FOOTER_COMPONENT.privacyTitle")}</Text>
        //             </View>
        //             <View style={styles.gapFlex}>
        //                 <Text style={styles.footerMenuStyle}>{t("FOOTER_COMPONENT.donotTitle")}</Text>
        //             </View>
        //             <View style={styles.gapFlex}>
        //                 <Text style={styles.footerMenuStyle}>{t("FOOTER_COMPONENT.termsTitle")}</Text>
        //             </View>

        //         </View>
        //     </View>

        // </View>


    );
};

export default FooterComponent;