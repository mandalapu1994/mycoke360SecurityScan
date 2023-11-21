import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { FONT_FAMILY_G_REGULAR } from "../../utils/Theme";

type CustomButtonType = {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const CustomButton = ({
  label,
  containerStyle = {},
  labelStyle = {},
  onPress = () => {},
}: CustomButtonType) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, containerStyle]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#000000",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "600",
    color: "#fff",
    fontFamily: FONT_FAMILY_G_REGULAR,
  },
});

export default CustomButton;