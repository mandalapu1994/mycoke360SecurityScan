import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  ModalProps
} from "react-native";

import styles from "./styles"
interface ConformationModelProps extends ModalProps {
  modalVisible: boolean;
  setmodalVisible: (visible: boolean) => void;
  ConformAction?: () => void;
  confomText?: string;
  cancelText?: string;
  message?: string;
  transparent?: boolean ;
}



const ConformationModel :React.FC<ConformationModelProps>= ({ modalVisible, setmodalVisible, ConformAction, confomText, cancelText, message, transparent = true }) => {
  const Cancel = cancelText ? cancelText : "Cancel"
  const Conform = confomText ? confomText : "Confirm"
  const Message = message ? message : "Are you sure you want to confirm the deletion?";


  const ConformPress = () => {
    ConformAction ? ConformAction() : null;
    setmodalVisible(false)
  }
  return (
    <Modal
      visible={modalVisible}
      transparent={transparent}
      onRequestClose={() => setmodalVisible(false)}
      testID="confirmationModalWrapper"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalbox}>
          <View style={styles.messageBox}>
            <Text style={styles.message}>{Message}</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableHighlight
              testID="confirmationModalCancelButton"
              onPress={() => setmodalVisible(false)}
              // color={"#FFFFFF"}
              underlayColor={"#F40000"}
              style={[styles.roundButton, { backgroundColor: "red" }]}
            >
              <Text style={styles.buttonText}>{Cancel}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              testID="confirmationModalApplyButton"
              onPress={ConformPress}
              // color={"#FFFFFF"}
              underlayColor={"#F40000"}
              style={[styles.roundButton, { backgroundColor: "#000" }]}
            >
              <Text style={styles.buttonText}>{Conform}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConformationModel;

