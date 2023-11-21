import { StyleSheet } from "react-native";
import { FONT_FAMILY_I_REGULAR } from "../../utils/Theme";
 const styles :any= StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: "white",
    backgroundColor: "blue",
    padding: 10,
  },
  modalbox: {
    backgroundColor: "#fff",
    width: 250,
    borderRadius: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    //   marginVertical: 15,
    marginBottom: 17,
  },
  roundButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
  message: {
    fontFamily: FONT_FAMILY_I_REGULAR,
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  messageBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 15,
  },
});
export default styles