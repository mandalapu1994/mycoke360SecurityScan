import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import styles from "./styles";
import FooterComponent from "../../components/FooterComponent";
import { useTranslation } from "react-i18next";

const UnAuthContactus = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <ScrollView style={[styles.background, { backgroundColor: "#e8e8e8" }]}>
        <Image
          source={require("../../assets/images/ContactUs.png")}
          resizeMode="cover"
          style={{ alignSelf: "center", height: 150, width: "100%" }}
        />
        <View
          style={{
            marginHorizontal: 15,
            marginTop: -50,
          }}
        >
          <View
            style={{
              paddingHorizontal: 25,
              backgroundColor: "#fff",
              borderRadius: 8,
              marginBottom: 60,
              paddingVertical: 25,
              paddingTop: 30,
            }}
          >
            <Text style={styles.contactHeading}>{t("CONTACT_US.title")}</Text>
            <View style={{}}>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text style={styles.contactusPara}>Call us from </Text>
                <Text style={[styles.contactusPara, { fontWeight: "bold" }]}>
                  Monday to Friday
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text style={styles.contactusPara}>Between </Text>
                <Text style={[styles.contactusPara, { fontWeight: "bold" }]}>
                  8AM to 6PM{" "}
                </Text>
                <Text style={styles.contactusPara}>(Eastern Time)</Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text style={styles.contactusPara}>US: </Text>
                <Text style={[styles.contactusPara, { fontWeight: "bold" }]}>
                  1-888-369-COKE
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text style={styles.contactusPara}>Canada: </Text>
                <Text style={[styles.contactusPara, { fontWeight: "bold" }]}>
                  800-218-2653
                </Text>
              </View>
            </View>
          </View>
        </View>

        <FooterComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UnAuthContactus;
