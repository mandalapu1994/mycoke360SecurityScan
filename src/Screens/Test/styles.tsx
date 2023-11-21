import { StyleSheet } from "react-native";

const styles:any = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'white',
    justifyContent:'space-evenly',
    alignItems: 'center'
},
item: {
    padding: 10,
    fontSize: 18,
    backgroundColor: '#f0f0f0',
    color: '#000000',
    margin: 5,
    borderRadius: 10
},
horizontal: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10,
},

});

export default styles;