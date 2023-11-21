import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  FONT_FAMILY_I_BOLD,
  FONT_FAMILY_I_REGULAR,
  FONT_FAMILY_I_SEMIBOLD,
} from "../../utils/Theme";

const List = [
  {
    style: "",
    title: "Contact Us to create an account",
    description:
      "With myCoke, simply create your account to get started",
      description2:
      " ordering your favorite products.",
  },
  {
    style: "",
    title: "Track and Pay Your Invoices",
    description: 'Relevant description here...'
  },
  {
    style: "strike",
    title: "Manage your account",
    description:
      "Manage your account and receive push notifications for order status and order updates so you always know what to expect.",
  },
];

const HowItWorksSection = () => {
  const renderList = () => {
    return List.map((item, index) => {
      return (
        <View
          style={[
            styles.row,
            index !== List.length - 1 ? { marginBottom: 20 } : {},
          ]}
          key={index}
        >
          <View style={{ marginRight: 20 }}>
            <Text
              style={[
                styles.listTitle,
                {
                  textDecorationLine:
                    item.style == "strike" ? "line-through" : "none",
                  textDecorationStyle:
                    item.style == "strike" ? "solid" : "solid",
                },
              ]}
            >
              {index + 1}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.listTitle,
                {
                  marginBottom: 12,
                  textDecorationLine:
                    item.style == "strike" ? "line-through" : "none",
                  textDecorationStyle:
                    item.style == "strike" ? "solid" : "solid",
                },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={{
                textDecorationLine:
                  item.style == "strike" ? "line-through" : "none",
                textDecorationStyle: item.style == "strike" ? "solid" : "solid",
              }}
            >
              {item.description} {item.description2 && <Text style={{textDecorationLine:'line-through'}}>{item.description2}</Text>}
            </Text>
          </View>
        </View>
      );
    });
  };
  return (
    <View style={styles.parent}>
      <View style={styles.banner}>
        <Image
          source={require("../../assets/images/group_banner.png")}
          style={styles.image}
        />
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
        <Text style={styles.howItWorks}>How it works</Text>

        <Text style={styles.titleDescription}>
          myCoke is the easiest, most convenient way for Coca-Cola customers to
          track and pay invoices online
        </Text>
        {renderList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#EAEAEA",
  },
  banner: {
    width: Dimensions.get("window").width,
    height: 600,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  howItWorks: {
    fontSize: 30,
    lineHeight: 37,
    color: "#000000",
    fontWeight: "700",
    fontFamily: FONT_FAMILY_I_BOLD,
    marginBottom: 10,
  },
  titleDescription: {
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
    fontWeight: "400",
    fontFamily: FONT_FAMILY_I_REGULAR,
    marginBottom: 25,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  listTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
    fontWeight: "700",
    fontFamily: FONT_FAMILY_I_SEMIBOLD,
  },
  listDescription: {
    fontSize: 16,
    lineHeight: 20,
    color: "#000000",
    fontWeight: "400",
    fontFamily: FONT_FAMILY_I_REGULAR,
  },
});

export default HowItWorksSection;
