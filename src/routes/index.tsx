/*
 * Copyright (c) 2020-present, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";

// import ProductsList from '../Screens/ProductsList';
import ViewAddToCart from "../Screens/ViewAddToCart";
import ProductDetails from "../Screens/ProductDetails";
import ContactUs from "../Screens/ContactUs/ContactUs";
import CheckOut from "../Screens/CheckOut/CheckOut";
import OrderConfirmation from "../Screens/OrderConfirmation";
import OrderDetails from "../Screens/OrderDetails/OrderDetails";
import TermsAndConditions from "../Screens/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../Screens/PrivacyPolicy/PrivacyPolicy";
import Test from "../Screens/Test/Test";
import ContactDetails from "../Screens/ContactDetails";
import ContactList from "../Screens/ContactList";
import CustomerList from "../Screens/CustomerList";
import MenuCompo from "../Screens/MenuCompo";
import { store } from "../redux/store";
import SortCompo from "../components/SortCompo";
import FilterCompo from "../components/FilterCompo";
import Header from "../components/Header";
import SupportHistory from "../Screens/SupportHistory";
import OrderHistory from "../Screens/OrderHistory/OrderHistory";
import MyProfile from "../Screens/MyProfile/MyProfile";
import EditProfile from "../Screens/EditProfile/EditProfile";
import SupportHistoryFilter from "../Screens/SupportHistory/SupportHistoryFilter";
import CustomDrawer from "../Screens/CustomDrawer";
import { ProductsList } from "../Screens/ProductsList/ProductsList";
import CustomerDetails from "../Screens/CustomerDetails";
import OrderHistorySort from "../Screens/OrderHistory/OrderHistorySort";
import Dashboard from "../Screens/Dashboard/Dashboard";
import { SheetProvider, SheetManager } from 'react-native-actions-sheet';
import "../components/ActionSheetManager/sheets";
import StepIndicatorComponent from "../Screens/OrderDetails/StepIndicatorComponent";
// import Dashboard from "../Screens/Dashboard/Dashboard";
// import DashBoardHeader from "../components/Header/DashBoardHeader";
// import CustomDrawer from '../Screens/CustomDrawer';

interface AppScreenState {}

class AppScreen extends React.Component<any, AppScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={styles.container}></View>;
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

const Stack = createStackNavigator();
const Main = createStackNavigator();

const App: React.FC = () => {
  const Drawer = createDrawerNavigator();

  function DrawerScreens() {
    return (
      <Drawer.Navigator
        // drawerType="slide"
        screenOptions={{
          header: ({ navigation }) => <Header navigation={navigation} />,
          drawerStyle: {
            backgroundColor: "#F7F5F9",
            width: "100%",
          },
        }}
        initialRouteName="ProductsList"
        drawerContent={(props) => (
          <CustomDrawer props={props} navigation={props.navigation} />
        )}
      >
        <Drawer.Screen name="ProductsListing" component={ProductsList} />
        <Drawer.Screen name="ViewAddToCart" component={ViewAddToCart} />
        <Drawer.Screen name="ProductDetails" component={ProductDetails} />
        <Drawer.Screen name="ContactUs" component={ContactUs} />
        <Drawer.Screen name="CheckOut" component={CheckOut} />
        <Drawer.Screen name="OrderConfirm" component={OrderConfirmation} />
        <Drawer.Screen name="OrderDetails" component={OrderDetails} />
        <Drawer.Screen name="TermsAndConditions" component={TermsAndConditions}/>
        <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
        <Drawer.Screen name="SupportHistory" component={SupportHistory} />
        <Drawer.Screen name="OrderHistory" component={OrderHistory} />
        <Drawer.Screen name="MyProfile" component={MyProfile} />
        <Drawer.Screen name="Test" component={Test} />
      </Drawer.Navigator>
    );
  }

  function AllScreen() {
    return (
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="ProductsList" component={DrawerScreens} />
        <Stack.Screen name="AppScreen" component={AppScreen} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="ContactList" component={ContactList} />
        <Stack.Screen name="CustomerList" component={CustomerList} />
        {/* <Stack.Screen name="CustomerDetails" component={CustomerDetails} /> */}
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="SortCompo" component={SortCompo} />
        {/* <Stack.Screen name="OrderHistorySort" component={OrderHistorySort} /> */}
        <Stack.Screen name="FilterCompo" component={FilterCompo} />
        <Stack.Screen name="ViewAddToCart" component={ViewAddToCart} />
        <Stack.Screen name="MenuCompo" component={MenuCompo} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
          name="SupportHistoryFilter"
          component={SupportHistoryFilter}
        />
        <Stack.Screen name="OrderConfirm" component={OrderConfirmation} />
        <Stack.Screen name="StepIndicatorComponent" component={StepIndicatorComponent} />

      </Stack.Navigator>
    );
  }
  
  return (
    <Provider store={store}>
    <SheetProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Main.Navigator
            screenOptions={({ navigation }) => ({
              headerShown: false,
              //    header: ({ navigation }) => <DashBoardHeader navigation={navigation} />
            })}
          >
            <Main.Screen name="DashBoard" component={Dashboard} />
            <Main.Screen name="Allscreen" component={AllScreen} />
          </Main.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SheetProvider>
    </Provider>
  );
};
export default App;
