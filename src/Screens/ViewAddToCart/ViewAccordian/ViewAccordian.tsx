import React, { useState } from "react";
// import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import OrderSummary from "../../../components/OrderSummary/OrderSummary";
import styles from "../styles";
import UpBlackArrow from "../../../assets/images/UpBlackArrow";
import DownBlackArrow from "../../../assets/images/DownBlackArrow";
import CheckBox from "@react-native-community/checkbox";
import { useTranslation } from "react-i18next";

interface AccordionItemProps {
  title: string;
  children: any;
  style: any;
}

// type AccordionItemPros = PropsWithChildren<{
//   title: string;
// }>;

function AccordionItem({
  children,
  title,
}: React.PropsWithChildren<AccordionItemProps>) {
  const [expanded, setExpanded] = useState<boolean>(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View style={styles.accordianflex}>
            <View style={styles.projectListOuter}>
              <View style={styles.gapStyle}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "800",
                    fontFamily: "Inter-Regular",
                  }}
                >
                  {title}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.accordianflex}>
            {expanded ? <UpBlackArrow /> : <DownBlackArrow />}
          </View>
        </View>
      </TouchableOpacity>

      {expanded && body}
    </View>
  );
}

function ViewAccordian() {
  //Checkbox Values

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleFresca, setToggleFresca] = useState(false);
  const [toggleMelloYello, setToggleMelloYello] = useState(false);
  const [togglePibbXtra, setTogglePibbXtra] = useState(false);
  const [toggleSeagram, setToggleSeagram] = useState(false);
  const [toggleInca, setToggleInca] = useState(false);
  const [toggleCoca, setToggleCoca] = useState(false);
  const [toggleBarq, setToggleBarq] = useState(false);
  const [toggleFanta, setToggleFanta] = useState(false);
  const [toggleSprite, setToggleSprite] = useState(false);
  const Separator = () => <View style={styles.separator} />;
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.accordianOuter}>
          <AccordionItem
            title={t("VIEW_CART.orderTitle")}
            style={styles.sortTextPara}
          >
            <View style={styles.accordianInner}>
              <View style={styles.accordianView}>
                <Text style={styles.accordianFontStyle}>
                  {t("VIEW_CART.totalTitle")}
                </Text>
                <Text style={styles.accordianFontStyle}>
                  {t("VIEW_CART.countTitle")}
                </Text>
              </View>
            </View>
            <View style={styles.titleStyles}>
              <Text>{t("VIEW_CART.finalTitle")}</Text>
            </View>
            <View style={styles.buttonPosition}>
              <View style={styles.gapFlexStyle}>
                <TouchableHighlight
                  // color="#000000"
                  style={styles.roundBorderButton}
                >
                  <Text style={styles.blackText}>
                    {t("VIEW_CART.updateTitle")}
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.gapFlexStyle}>
                <TouchableHighlight
                  //  color={"#000000"}
                  underlayColor={"#F40000"}
                  style={styles.roundGrayButton}
                >
                  <Text style={styles.blackText}>
                    {t("VIEW_CART.proceedTitle")}
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </AccordionItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ViewAccordian;
