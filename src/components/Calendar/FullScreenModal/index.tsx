import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

const FullScreenModal = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={props.offset ? props.offset : 0}
      >
        <View style={{ flex: 1 }}>{props.children}</View>
        <></>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FullScreenModal;
