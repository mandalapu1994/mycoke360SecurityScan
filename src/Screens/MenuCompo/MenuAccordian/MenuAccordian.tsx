import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  Pressable,
} from "react-native";

import styles from "../styles";
import UpBlackArrow from "../../../assets/images/UpBlackArrow";
import DownBlackArrow from "../../../assets/images/DownBlackArrow";
import CheckBox from "@react-native-community/checkbox";

type AccordionItemPros = PropsWithChildren<{
  title: string;
  children: any;
}>;

function AccordionItem({ children, title }: AccordionItemPros): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <View style={styles.projectListOuter}>
          <View style={styles.accordianflex}>
            <View style={styles.projectListOuter}>
              <View style={styles.gapStyle}>
                <Image
                  source={require("../../../assets/images/AvatarImage.png")}
                />
              </View>
              <View style={styles.gapStyle}>
                <Text style={styles.accordTitle}>{title}</Text>
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

const MenuAccordian: React.FC<{}> = () => {
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
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            paddingLeft: 5,
            paddingRight: 8,
            backgroundColor: "#FFFFFF",
          }}
        >
          <AccordionItem title="Hi John">
            <Separator />
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.commonTextStyle}>Order History</Text>
              <Text style={styles.commonTextStyle}>Service History</Text>
              <Text style={styles.commonTextStyle}>Shopping List</Text>
              <Pressable
              //    onPress={() => props.navigation.navigate('MyProfile') }
              >
                {({ pressed }) => (
                  <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                    My Profile
                  </Text>
                )}
              </Pressable>
              <Text style={styles.commonTextStyle}>Payment Methods</Text>
              <Text style={styles.commonTextStyle}>User Management</Text>
              <Text style={styles.commonTextStyle}>Account Management</Text>
              <Text style={styles.commonTextStyle}>Logout</Text>
            </View>
          </AccordionItem>
        </View>

        <View
          style={{
            padding: 15,
            paddingRight: 8,
            marginTop: 10,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Text>Dashboard</Text>
        </View>

        <View
          style={{
            paddingLeft: 15,
            paddingRight: 8,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Text>Invoices</Text>
        </View>

        <View
          style={{ padding: 15, paddingRight: 8, backgroundColor: "#FFFFFF" }}
        >
          <Text>Orders</Text>
        </View>

        <View
          style={{
            paddingLeft: 5,
            paddingRight: 8,
            backgroundColor: "#FFFFFF",
          }}
        >
          <AccordionItem title="Help">
            <Separator />
            <View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  fontFamily: "Inter-Regular",
                  fontWeight: "600",
                  lineHeight: 20,
                  paddingLeft: 10,
                  paddingTop: 10,
                }}
              >
                Contact Us
              </Text>

              <Text
                style={{ paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}
              >
                FAQ
              </Text>
            </View>
          </AccordionItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuAccordian;
