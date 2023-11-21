import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FONT_FAMILY_I_BOLD, FONT_FAMILY_I_REGULAR } from "../../utils/Theme";
import Video from "react-native-video";
// import CustomButton from "../../components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
 import PlayButton from "../../assets/images/PlayButton";
import CustomButton from "../../components/CustomButton/CustomButton";

const CallToActionSection = () => {
  const [paused, setPaused] = useState<boolean>(false);

  return (
    <View style={[styles.parent]}>
      <View
        style={{
          flex: 1,
          marginBottom: 40,
          marginTop: 68,
          marginHorizontal: 16,
        }}
      >
        <Video
          paused={paused}
          source={require("./SampleVideo.mp4")}
          style={styles.backgroundVideo}
        />
        <View style={styles.playButtonContainer}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              setPaused(!paused);
            }}
          >
            <PlayButton />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginHorizontal: 16, marginBottom: 60 }}>
        <Text style={styles.subTitle}>Lorem ipsum sin dolor</Text>
        <Text style={styles.titleDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac luctus
          turpis.
        </Text>
        <CustomButton
          label="Call to Action"
          containerStyle={styles.buttonContainer}
          labelStyle={{
            color: "#fff",
            fontSize: 14,
            lineHeight: 20,
            fontWeight: "600",
          }}
        />
      </View>
    </View>
  );
};

export default CallToActionSection;

const styles = StyleSheet.create({
  parent: { backgroundColor: "#fff" },
  titleDescription: {
    fontSize: 18,
    lineHeight: 26,
    color: "#000000",
    fontWeight: "400",
    fontFamily: FONT_FAMILY_I_REGULAR,
    marginVertical: 11,
    marginRight: 40,
    marginBottom: 32,
  },
  subTitle: {
    fontSize: 26,
    lineHeight: 32,
    color: "#000000",
    fontWeight: "700",
    fontFamily: FONT_FAMILY_I_BOLD,
    marginBottom: 20,
  },
  backgroundVideo: {
    height: 200,
    width: "100%",
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: "#000",
    alignSelf: "baseline",
    marginTop: 38,
    paddingHorizontal: 34,
    paddingVertical: 14,
  },
  playButtonContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust button size
  },
});
