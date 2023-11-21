import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  FONT_FAMILY_I_BOLD,
  FONT_FAMILY_I_REGULAR,
  FONT_FAMILY_I_SEMIBOLD,
} from "../../utils/Theme";
import BannerCocaCola from "../../assets/images/BannerCocaCola";
import GirlWithLaptop from "../../assets/images/GirlWithLaptop";
import BannerRedTShirtLady from "../../assets/images/BannerRedTShirtLady";

const List = [
  {
    profile: (
      <GirlWithLaptop
        style={{
          transform: [{ scaleY: Platform.OS === "ios" ? -1 : 1 }],
        }}
      />
    ),
    title: "Multiple Payment Options",
    description:
      "With myCoke, you can pay your invoices online using your credit card or existing method of payment",
  },
  {
    profile: <BannerRedTShirtLady />,
    title: "Get Live Support",
    description:
      "Give us a call toll-free or chat online with a myCoke representative during business hours",
  },
  {
    profile: <BannerCocaCola />,
    title: "Keep Track of Invoices",
    description:
      "See your invoices at a glances, whether you're in the office or on the go",
  },
];

const PlatformBenefitsSection = () => {
  const screenWidth = Dimensions.get("screen").width;
  const [scrollIndex, setScrollIndex] = useState<number>(0);

  const onChange = (nativeEvent: any) => {
    const index = Math.round(nativeEvent.contentOffset.x / screenWidth);
    setScrollIndex(index);
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.title}>Platform Benefits</Text>
      <FlatList
        pagingEnabled
        horizontal
        style={{ marginBottom: 40, zIndex: 10 }}
        onScroll={({ nativeEvent }) => {
          onChange(nativeEvent);
        }}
        showsHorizontalScrollIndicator={false}
        data={List}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ width: screenWidth - 32 }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={styles.banner}>{item.profile}</View>
                <Text style={styles.detailsTitle}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.platformBenefitsScrollDot}>
        {List.map((item, index) => {
          return (
            <View
              style={[
                styles.scrollDot,
                {
                  backgroundColor: scrollIndex == index ? "#F40000" : "#FFF",
                  borderColor: scrollIndex == index ? "#F40000" : "#D9D9D9",
                },
              ]}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 60,
    paddingHorizontal: 16,
    flex: 1,
  },
  banner: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 150,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    color: "#000000",
    fontWeight: "700",
    fontFamily: FONT_FAMILY_I_BOLD,
    marginBottom: 38,
  },
  detailsTitle: {
    fontSize: 26,
    lineHeight: 32,
    color: "#000000",
    fontWeight: "700",
    fontFamily: FONT_FAMILY_I_BOLD,
    marginBottom: 11,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontWeight: "400",
    textAlign: "center",
  },
  scrollDot: {
    borderWidth: 1,
    marginRight: 10,
    flexDirection: "row",
    borderRadius: 10,
    width: 16,
    height: 16,
  },
  platformBenefitsScrollDot: {
    position: "absolute",
    top: 0,
    bottom: 60,
    right: 0,
    left: 0,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

export default PlatformBenefitsSection;
