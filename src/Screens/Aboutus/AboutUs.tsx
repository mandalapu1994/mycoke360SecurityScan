import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";


import { useTranslation } from "react-i18next";

import styles from "./styles";
import CustomButton from "../../components/CustomButton/CustomButton";
import FooterComponent from "../../components/FooterComponent";


const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <ScrollView style={[styles.background, { backgroundColor: "#e8e8e8" }]}>
        <Image
          source={require("../../assets/images/AboutUs.png")}
          resizeMode="cover"
          style={{ alignSelf: "center" }}
        />
        <View
          style={{
            marginHorizontal: 15,
            marginBottom: 60,
          }}
        >
          <View
            style={{
              paddingHorizontal: 25,
              backgroundColor: "#fff",
              paddingVertical: 25,
            }}
          >
            <Text style={styles.contactHeading}>{t("ABOUT_US.title")}</Text>
            <View style={{}}>
              <Text style={styles.contactusPara}>
                Welcome to myCoke Payments, the first part of a journey to
                deliver a world-class online experience to engage with Coca-Cola
                Bottlers and our portfolio of brands.
              </Text>
              <Text></Text>
              <Text style={styles.contactusPara}>
                myCoke Payments is designed to be your go-to platform for all of
                your business needs - from managing accounts to reviewing
                invoices and making payments - while providing you with the
                highest level of customer service.
              </Text>
              <Text></Text>
              <Text style={styles.contactusPara}>
                Enjoy the perks of managing your accounts, invoices, and
                payments at your fingertips. Later this year, you'll be able to
                place orders and submit equipment repair and customer service
                requests right here at any time.
              </Text>
              <Text></Text>
              <Text style={styles.contactusPara}>
                Come experience the myCoke Payments difference as we continue to
                refresh the world and make a difference.
              </Text>
            </View>
            <View
              style={{
                paddingTop: 40,
                alignItems: "center",
              }}
            >
              <CustomButton label={"Sign In"} onPress={() => { }} />
            </View>
          </View>
        </View>
        <FooterComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
