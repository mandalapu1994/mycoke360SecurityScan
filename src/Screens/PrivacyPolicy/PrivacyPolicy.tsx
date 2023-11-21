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

interface PrivacyPolicyProps {}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
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

                    <Text style={styles.titleText} >{t("PRIVACY_POLICY.pageTitle")}</Text>
                    <Text style={styles.dateText} >{t("PRIVACY_POLICY.lastUpdate")}: {t("PRIVACY_POLICY.updateDate")}</Text>
                    <View style={styles.bodyFlexStyle} >

                        <Text>
                            <Text style={styles.startingText} >{t("PRIVACY_POLICY.startingText1")}</Text>
                            <Text style={[styles.startingText, styles.boldText]} >{t("PRIVACY_POLICY.startingText2")}</Text>
                            <Text style={styles.startingText} >{t("PRIVACY_POLICY.startingText3")}</Text>
                        </Text>

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.accRegistration")}</Text>
                        <Text style={styles.childText} >{t("PRIVACY_POLICY.accRegistrationText")}</Text>

                        <Text style={styles.childHeading}>{t("PRIVACY_POLICY.dataProtection")}</Text>
                        <Text style={styles.childText} >{t("PRIVACY_POLICY.dataProtectionText")}</Text>

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.rulesofConduct")}</Text>
                        <Text style={styles.childText} >{t("PRIVACY_POLICY.rulesofConductText")}</Text>

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.DisclAndLimitation")}</Text>
                        <Text style={styles.childText} >
                            {isDisclAndLimitationExpanded ? t("PRIVACY_POLICY.DisclAndLimitationText") : t("PRIVACY_POLICY.DisclAndLimitationText").substring(0, 366)}
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

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.ConfidentialityOfCommunication")}</Text>
                        <Text style={styles.childText} >{t("PRIVACY_POLICY.ConfidentialityOfCommunicationText")}</Text>

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.IntellectualProperty")}</Text>
                        <Text style={styles.childText} >{t("PRIVACY_POLICY.IntellectualPropertyText")}</Text>

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.SubmissionsAndCreations")}</Text>
                        <Text style={styles.childText} >
                            {isSubmissionsAndCreationsExpanded ? t("PRIVACY_POLICY.SubmissionsAndCreationsText") : t("PRIVACY_POLICY.SubmissionsAndCreationsText").substring(0, 285)}
                        </Text>
                        <TouchableOpacity
                            // color={"#000000"}
                            // underlayColor={'#F40000'}
                            onPress={handleSubmissionsAndCreationsReadMoreClick}>
                            <Text style={styles.readMore} >
                                {isSubmissionsAndCreationsExpanded ? "- Show Less" : "+ Read More"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.TermsOfSaleAllSites")}</Text>
                        <Text style={styles.childText} >
                            {isTermsOfSaleAllSitesExpanded ? t("PRIVACY_POLICY.TermsOfSaleAllSitesText") : t("PRIVACY_POLICY.TermsOfSaleAllSitesText").substring(0, 285)}
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

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.TermsOfSalesCokeGo")}</Text>
                        <Text style={styles.childText} >
                            {isTermsOfSalesCokeGoExpanded ? t("PRIVACY_POLICY.TermsOfSalesCokeGoText") : t("PRIVACY_POLICY.TermsOfSalesCokeGoText").substring(0, 285)}
                        </Text>
                        <TouchableOpacity
                            // color={"#000000"}
                            // underlayColor={'#F40000'}
                            onPress={handleTermsOfSaleAllSitesTextReadMoreClick}>
                            <Text style={styles.readMore} >
                                {isTermsOfSalesCokeGoExpanded ? "- Show Less" : "+ Read More"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.DisputeResolutionTerms")}</Text>
                        <Text style={styles.childText} >{t("PRIVACY_POLICY.DisputeResolutionTermsText")}</Text>

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.Miscellaneius")}</Text>
                        <Text style={styles.childText} >
                            {isMiscellaneiusExpanded ? t("PRIVACY_POLICY.MiscellaneiusText") : t("PRIVACY_POLICY.MiscellaneiusText").substring(0, 285)}
                        </Text>
                        <TouchableOpacity
                            // color={"#000000"}
                            // underlayColor={'#F40000'}
                            onPress={handleMiscellaneiusReadMoreClick}>
                            <Text style={styles.readMore} >
                                {isMiscellaneiusExpanded ? "- Show Less" : "+ Read More"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.childHeading} >{t("PRIVACY_POLICY.Changes")}</Text>
                        <Text style={styles.childText} >{t("PRIVACY_POLICY.ChangesText")}</Text>

                    </View>
                </View>
                <FooterComponent />
            </ScrollView>
            {loader &&  <Loader message="Please wait..." />}
        </SafeAreaView>
    )
}

export default PrivacyPolicy