  
import { querySoup } from "../Salesforce/SmartStore";
import { SET_USER_DETAILS } from "../redux/Reducer/userReducer";
import { store } from "../redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';
  
  
  
   const getUserInfo = async(data: any) => {
    let  Account:any = await AsyncStorage.getItem("selectedAcc");
    let accParceData = JSON.parse(Account)[0]
    let  user = accParceData ? data.currentPageOrderedEntries.find((item:any)=>item.Id == accParceData.Id):null
     console.log("User Details ",user)
       if(user){
        store.dispatch(SET_USER_DETAILS(user)) 
       }
   };
  
   export const getUserDetails = async () => {
      querySoup('account', (success: any) => getUserInfo(success), (error: any) => console.log("querySoup----error", error), "Name");

   }