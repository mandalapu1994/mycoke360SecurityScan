import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
// import StringsConst from './stringConstant.json'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import FooterComponent from '../../components/FooterComponent'
import { useTranslation } from "react-i18next";
import Loader from '../../components/Loader/loader'
import { useSelector } from 'react-redux'

interface TermsAndConditionsProps {}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = () => {
    const { t } = useTranslation();

 const [isDisclAndLimitationExpanded, setIsDisclAndLimitationExpanded] = useState<boolean>(false);
  const [isSubmissionsAndCreationsExpanded, setIsSubmissionsAndCreationsExpanded] = useState<boolean>(false);
  const [isTermsOfSaleAllSitesExpanded, setIsTermsOfSaleAllSitesExpanded] = useState<boolean>(false);
  const [isTermsOfSalesCokeGoExpanded, setIsTermsOfSalesCokeGoExpanded] = useState<boolean>(false);
  const [isMiscellaneiusExpanded, setIsMiscellaneiusExpanded] = useState<boolean>(false);
  const loader = useSelector((state: any) => state.loader.isLoaderVisible);

    const handleDisclAndLimitationReadMoreClick = () => {
        setIsDisclAndLimitationExpanded(!isDisclAndLimitationExpanded)
    }

    const handleSubmissionsAndCreationsReadMoreClick = () => {
        setIsSubmissionsAndCreationsExpanded(!isSubmissionsAndCreationsExpanded)
    }

    const handleTermsOfSaleAllSitesReadMoreClick = () => {
        setIsTermsOfSaleAllSitesExpanded(!isTermsOfSaleAllSitesExpanded)
    }

    const handleTermsOfSaleAllSitesTextReadMoreClick = () => {
        setIsTermsOfSalesCokeGoExpanded(!isTermsOfSalesCokeGoExpanded)
    }

    const handleMiscellaneiusReadMoreClick = () => {
        setIsMiscellaneiusExpanded(!isMiscellaneiusExpanded)
    }

    return (
        <SafeAreaView style={styles.parent} >
            <ScrollView style={styles.mainContainer} >
                <View style={styles.BlockWhite} >

                    <Text style={styles.titleText} >{t("TERMS_AND_CONDITIONS.pageTitle")}</Text>
                    <Text style={styles.dateText} >{t("TERMS_AND_CONDITIONS.lastUpdate")}: {t("TERMS_AND_CONDITIONS.updateDate")}</Text>
                    <View style={styles.bodyFlexStyle} >

                        <Text>
                            <Text style={styles.startingText} >{t("TERMS_AND_CONDITIONS.startingText1")}</Text>
                            <Text style={[styles.startingText, styles.boldText]} >{t("TERMS_AND_CONDITIONS.startingText2")}</Text>
                            <Text style={styles.startingText} >{t("TERMS_AND_CONDITIONS.startingText3")}</Text>
                        </Text>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.accRegistration")}</Text>
                        <Text style={styles.childText} >{t("TERMS_AND_CONDITIONS.accRegistrationText")}</Text>

                        <Text style={styles.childHeading}>{t("TERMS_AND_CONDITIONS.dataProtection")}</Text>
                        <Text style={styles.childText} >{t("TERMS_AND_CONDITIONS.dataProtectionText")}</Text>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.rulesofConduct")}</Text>
                        <Text style={styles.childText} >{t("TERMS_AND_CONDITIONS.rulesofConductText")}</Text>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.DisclAndLimitation")}</Text>
                        <Text style={styles.childText} >
                            {isDisclAndLimitationExpanded ? t("TERMS_AND_CONDITIONS.DisclAndLimitationText") : t("TERMS_AND_CONDITIONS.DisclAndLimitationText").substring(0, 366)}
                        </Text>
                        <TouchableOpacity
                            // color={"#000000"}
                            // underlayColor={'#F40000'}
                            onPress={handleDisclAndLimitationReadMoreClick}
                        >
                            <Text style={styles.readMore} >
                                {isDisclAndLimitationExpanded ? "- Show Less" : "+ Read More"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.ConfidentialityOfCommunication")}</Text>
                        <Text style={styles.childText} >{t("TERMS_AND_CONDITIONS.ConfidentialityOfCommunicationText")}</Text>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.IntellectualProperty")}</Text>
                        <Text style={styles.childText} >{t("TERMS_AND_CONDITIONS.IntellectualPropertyText")}</Text>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.SubmissionsAndCreations")}</Text>
                        <Text style={styles.childText} >
                            {isSubmissionsAndCreationsExpanded ? t("TERMS_AND_CONDITIONS.SubmissionsAndCreationsText") : t("TERMS_AND_CONDITIONS.SubmissionsAndCreationsText").substring(0, 285)}
                        </Text>
                        <TouchableOpacity
                            // color={"#000000"}
                            // underlayColor={'#F40000'}
                            onPress={handleSubmissionsAndCreationsReadMoreClick}>
                            <Text style={styles.readMore} >
                                {isSubmissionsAndCreationsExpanded ? "- Show Less" : "+ Read More"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.TermsOfSaleAllSites")}</Text>
                        <Text style={styles.childText} >
                            {isTermsOfSaleAllSitesExpanded ? t("TERMS_AND_CONDITIONS.TermsOfSaleAllSitesText") : t("TERMS_AND_CONDITIONS.TermsOfSaleAllSitesText").substring(0, 285)}
                        </Text>
                        <TouchableOpacity
                            // color={"#000000"}
                            // underlayColor={'#F40000'}
                            onPress={handleTermsOfSaleAllSitesReadMoreClick}
                        >
                            <Text style={styles.readMore} >
                                {isTermsOfSaleAllSitesExpanded ? "- Show Less" : "+ Read More"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.TermsOfSalesCokeGo")}</Text>
                        <Text style={styles.childText} >
                            {isTermsOfSalesCokeGoExpanded ? t("TERMS_AND_CONDITIONS.TermsOfSalesCokeGoText") : t("TERMS_AND_CONDITIONS.TermsOfSalesCokeGoText").substring(0, 285)}
                        </Text>
                        <TouchableOpacity
                            // color={"#000000"}
                            // underlayColor={'#F40000'}
                            onPress={handleTermsOfSaleAllSitesTextReadMoreClick}>
                            <Text style={styles.readMore} >
                                {isTermsOfSalesCokeGoExpanded ? "- Show Less" : "+ Read More"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.DisputeResolutionTerms")}</Text>
                        <Text style={styles.childText} >{t("TERMS_AND_CONDITIONS.DisputeResolutionTermsText")}</Text>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.Miscellaneius")}</Text>
                        <Text style={styles.childText} >
                            {isMiscellaneiusExpanded ? t("TERMS_AND_CONDITIONS.MiscellaneiusText") : t("TERMS_AND_CONDITIONS.MiscellaneiusText").substring(0, 285)}
                        </Text>
                        <TouchableOpacity
                            // color={"#000000"}
                            // underlayColor={'#F40000'}
                            onPress={handleMiscellaneiusReadMoreClick}>
                            <Text style={styles.readMore} >
                                {isMiscellaneiusExpanded ? "- Show Less" : "+ Read More"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.childHeading} >{t("TERMS_AND_CONDITIONS.Changes")}</Text>
                        <Text style={styles.childText} >{t("TERMS_AND_CONDITIONS.ChangesText")}</Text>

                    </View>
                </View>
                <FooterComponent />
            </ScrollView>
            {loader &&  <Loader message="Please wait..." />}
        </SafeAreaView>
    )
}

export default TermsAndConditions