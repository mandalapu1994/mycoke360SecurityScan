import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  FONT_FAMILY_I_BOLD,
  FONT_FAMILY_I_REGULAR,
  ThemeColors,
} from "../../utils/Theme";

const List = [
  {
    profile: require("../../assets/images/CustomerStoriesBanner.png"),
    title: "Lorem ipsum sin dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac luctus turpis.",
  },
  {
    profile: require("../../assets/images/GirlsWithCoke.png"),
    title: "Get Live Support",
    description:
      "Give us a call toll-free or chat online with a myCoke representative during business hours",
  },
  {
    profile: require("../../assets/images/ManWithRopes.png"),
    title: "Keep Track of Invoices",
    description:
      "See your invoices at a glances, whether you're in the office or on the go",
  },
];

const CustomerStoriesSection = () => {
  const screenWidth = Dimensions.get("screen").width;
  const [scrollIndex, setScrollIndex] = useState<number>(0);

  const onChange = (nativeEvent: any) => {
    const index = Math.round(nativeEvent.contentOffset.x / screenWidth);
    setScrollIndex(index);
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.CustomerStories}>Customer Storiess</Text>
      <FlatList
        pagingEnabled
        horizontal
        style={{ marginBottom: 10 }}
        onScroll={({ nativeEvent }) => {
          onChange(nativeEvent);
        }}
        data={List}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width: screenWidth - 32 }}>
              <View style={{}}>
                <View style={styles.banner}>
                  <Image source={item.profile} style={styles.image} />
                </View>
                <Text style={styles.subTitle}>{item.title}</Text>
                <Text style={styles.titleDescription}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <View style={[styles.customerStoriesScrollDot]}>
        {List.map((item, index) => {
          return (
            <View
              style={[
                styles.scrollRectangle,
                {
                  backgroundColor: scrollIndex == index ? "#808285" : "#F7F7F7",
                  borderColor: scrollIndex == index ? "#808285" : "#F7F7F7",
                },
              ]}
              key={index}
            />
          );
        })}
      </View>
      <TouchableOpacity style={styles.learnMoreButton}>
        <Text style={styles.learnMore}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerStoriesSection;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 60,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  banner: {
    width: 350,
    height: 350,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 40,
  },
  CustomerStories: {
    fontSize: 28,
    lineHeight: 34,
    color: "#000000",
    fontWeight: "700",
    fontFamily: FONT_FAMILY_I_BOLD,
    marginBottom: 38,
  },
  titleDescription: {
    fontSize: 18,
    lineHeight: 26,
    color: "#000000",
    fontWeight: "400",
    fontFamily: FONT_FAMILY_I_REGULAR,
    marginVertical: 11,
    marginRight: 40,
  },
  subTitle: {
    fontSize: 26,
    lineHeight: 32,
    color: "#000000",
    fontWeight: "700",
    fontFamily: FONT_FAMILY_I_BOLD,
  },
  learnMore: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: FONT_FAMILY_I_BOLD,
    color: "#000000",
  },
  learnMoreButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    alignSelf: "baseline",
    paddingBottom: 4,
    paddingHorizontal: 2,
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
  scrollRectangle: {
    borderWidth: 1,
    marginRight: 10,
    flexDirection: "row",
    borderRadius: 10,
    width: 113,
    height: 8,
  },
  customerStoriesScrollDot: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
