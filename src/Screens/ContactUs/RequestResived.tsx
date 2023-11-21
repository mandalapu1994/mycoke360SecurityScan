import React from 'react';
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
    ScrollView,
    Image,
    DeviceEventEmitter
} from 'react-native';
import styles from "./styles";
import { useTranslation } from "react-i18next";

interface  RequestResivedProps {
type:string,
number:any
}

const RequestResived :React.FC<RequestResivedProps> = ({ type, number }) => {
    const { t } = useTranslation();
    // const NumberText = type == "CST" ? t("CONTACT_US.cstNumber") : t("CONTACT_US.estNumber");
    const NumberText=  t("CONTACT_US.Ticket_Number")
    const InfoText = type == "CST" ? t("CONTACT_US.cstInfoText") : t("CONTACT_US.estInfoText");
    const newTikitButton = t("CONTACT_US.createTikitText");
    const Number = number
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.reciveContainer}>
                    <View style={styles.flexbox}>
                        <Text style={styles.resiveBoxTitel}>{t("CONTACT_US.tikitTitle")}</Text>
                        <Text style={styles.resiveCstText}>{NumberText} - {Number}</Text>
                    </View>
                    <View style={styles.greenBox}>
                        <Image source={require("../../assets/images/CheckGreenIcon.png")} style={{ width: 18, height: 18 }} />
                        <Text style={styles.resiveText}>{t("CONTACT_US.received")}</Text>

                    </View>
                    <Text style={styles.serviceInfoText}>{InfoText}</Text>
                    <View style={{ justifyContent: "space-between", alignItems: "center", flex: 1,flexDirection:"row" }}>
                    <View>
                        <Text style={styles.backHistoryText}>Back to Support History</Text>
                    </View>
                        <View >
                            <TouchableHighlight
                                onPress={() => {
                                    // navigation.navigate('ProductDetails');
                                }}
                                // color={"#FFFFF"}
                                underlayColor={'#F40000'}
                                style={styles.newTikitButton}>

                                <Text style={styles.BlackText}>{newTikitButton}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )



};

export default RequestResived;



