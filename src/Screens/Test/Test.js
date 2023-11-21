/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    FlatList,
    Button,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { oauth, net } from 'react-native-force';
import { authorize, refresh } from 'react-native-app-auth';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { syncData } from '../../Salesforce/SmartSync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../../redux/store';

// base config
const config = {
    // issuer: 'https://login.microsoftonline.com/0bf9e740-7eec-41f3-aa71-fc01e3c9f47a',
    // clientId: '1bf45d22-069b-4563-9d93-66d73ac01fac',
    // redirectUrl: 'msauth://com.myCoke360/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
    // scopes: ['openid', 'profile', 'email', 'offline_access', 'mobileapp'],

    issuer: 'https://login.microsoftonline.com/5747a0a7-520f-4811-bbb1-b5161b00224e',
    clientId: '88c63f53-1744-4065-8a2d-f40f86ef7b91',
    redirectUrl: 'msauth://com.myCoke360/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
    scopes: ['openid', 'profile', 'email', 'offline_access', 'mobileapp'],
};

const saleforceConfig = {
    salesforceClientId: "3MVG9wt4IL4O5wvI47ccO3LKWXqKzSkOjZXXROGWvCSv4vwl1hf27.27qOxQ2d3pQkWm4iSJJXi4m3Hrqfo5K",
    salesforceClientSecret: "AFF7E71C975CFD34B02088F0A73EFB3E07D86ACA2894006A39B25704AB7BCB45",
    salesforceRedirectUri: "https://login.salesforce.com/services/oauth2/success"
}
const saleforceConfig2 = {
    salesforceClientId: "88c63f53-1744-4065-8a2d-f40f86ef7b91",
    salesforceClientSecret: "1c0d5b3d-df7e-4c6c-a829-2cb7039ceb73",
    salesforceRedirectUri: "https://login.salesforce.com/services/oauth2/success"
}



class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            responseHtml: "",
            isLoaderVisible: false,
            isOpenWebView: false

        };
    }

    componentDidMount() {
        console.log("componentDidMount called");
        // this.updateLoginLogout()
        this.onSalesforceLogin();
    }

    componentDidUpdate() {
        this.updateLoginLogout()
        DeviceEventEmitter.addListener("sync_success", async e => {
            if (e) {
                console.log("sync_success======", e);
                 store.dispatch(SET_LOADER(false))
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'ProductsListing' }],
                })
                DeviceEventEmitter.removeAllListeners();
            }
        });
    }

    updateLoginLogout() {
        // this.props.navigation.setOptions({
        //     headerRight: () => this.state.loggedIn 
        //         ? (<Button onPress={() => this.onLogout()} title="Logout"/>)
        //         : (<Button onPress={() => this.onLogin()} title="Login"/>)
        // }); 
    }

    async onSalesforceLogin() {
        console.log("ON LOGIN OUTSIDEE =>", new Date())
        this.setState({ isLoaderVisible: true });
        
        userIdentity = {
            bottlerId: 4200,
            userId: "0058M000001knNVQAY",
            // contactId: "0038M00000NsIv7QAF",
            // accountId:'0018M00000LJTNuQAP',
            // 0038M00000NsIv7QAF
            // plantCode: "a2S8M000000BpvYUAS"
        }

        console.log("ON LOGIN OUTSIDEE =>", userIdentity)

        await AsyncStorage.setItem('userIdentity', JSON.stringify(userIdentity))
            .then(() => {
                console.log("It was saved successfully")
            })
            .catch(() => {
                console.log("There was an error saving the product")
            })

        // await AsyncStorage.setItem("bottlerId",'4200') //Edit for contactID

        oauth.getAuthCredentials(
            (resp) => {
                console.log('getAuthCredentials success=', resp)
                AsyncStorage.setItem("userToken",JSON.stringify(resp.accessToken));
                syncData()
                // setTimeout(() => {
                //     this.setState({isLoaderVisible: false});
                //     // this.props.navigation.navigate('ProductsListing');
                //     this.props.navigation.reset({
                //         index: 0,
                //         routes: [{ name: 'ProductsListing' }],
                //       })
                // }, 3000);
            }, // you should get here if login succeeds or if already login
            (error) => {
                oauth.authenticate(
                    (response) => {
                        console.log("login completed", response);
                        // syncData();
                        // this.setState({ loggedIn: true })
                        // setTimeout(() => {
                        //     this.setState({isLoaderVisible: false});
                        //     this.props.navigation.reset({
                        //         index: 0,
                        //         routes: [{ name: 'ProductsListing' }],
                        //       })
                        //     // this.props.navigation.navigate('ProductsListing');
                        // }, 3000);
                    },
                    (error) => console.log('login failed:' + error)
                );
            });


        // oauth.authenticate(
        //     (response) => {
        //         console.log("login completed", response);

        //         syncData();
        //         // this.setState({ loggedIn: true })
        //         this.setState({isLoaderVisible: false});
        //         this.props.navigation.navigate('ProductsListing');
        //     },
        //     (error) => console.log('login failed:' + error)
        // );

    }
    async onLogin() {
        console.log("onLogin called");
        // use the client to make the auth request and receive the authState
        try {
            const result = await authorize(config);
            // result includes accessToken, accessTokenExpirationDate and refreshToken
            console.log('result=', result);
            // Refresh token
            const refreshedState = await refresh(config, {
                refreshToken: result.refreshToken,
            });

            if (result && result.refreshToken && result.accessToken) {
                this.setState({ loggedIn: true })
                Alert.alert("", "You are logged in successfully")
                const azureAccessToken = result.accessToken ? result.accessToken : "";
                this.getSalesforceAccessToken(azureAccessToken);
            } else {
                this.setState({ loggedIn: false })
                Alert.alert("", "Something went wrong..!!")
            }

            console.log('-----------');
            // console.log('refreshedState=', refreshedState);
        } catch (error) {
            console.log("error=", error);
        }

    }
    /**
     * Send Azure Access token to Salesforce using API
     * @param {*} azureAccessToken 
     */
    async getSalesforceAccessToken(azureAccessToken) {
        try {

            const salesforceConfig = {
                clientId: "3MVG9wt4IL4O5wvI47ccO3LKWXqKzSkOjZXXROGWvCSv4vwl1hf27.27qOxQ2d3pQkWm4iSJJXi4m3Hrqfo5K", //YOUR_SALESFORCE_CLIENT_ID
                clientSecret: "AFF7E71C975CFD34B02088F0A73EFB3E07D86ACA2894006A39B25704AB7BCB45", //YOUR_SALESFORCE_CLIENT_SECRET
                redirectUri: 'https://login.salesforce.com/', //YOUR_SALESFORCE_REDIRECT_URI
                authorizationEndpoint: 'https://login.salesforce.com/',
                tokenEndpoint: 'https://login.salesforce.com/',
                scope: 'api',
                accessTokenEndpoint: 'https://test.salesforce.com//services/oauth2/token',
                additionalParameters: {
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    assertion: azureAccessToken
                }
            };
            1

            const salesforceTokenResponse = await axios.post(salesforceConfig.tokenEndpoint, salesforceConfig).then((res) => {
                if (res) {
                    this.setState({ responseHtml: res.data })
                    this.setState({ isOpenWebView: true })

                }
                console.log("RES salesforceTokenResponse", res)
            }).catch((err) => {
                console.log("ERORROROROROROROR", err)
            });
            console.log("salesforceTokenResponse", salesforceTokenResponse)
            //   const salesforceAccessToken = salesforceTokenResponse.data.access_token;
            //   console.log('Salesforce access token:', salesforceAccessToken);
            //   this.setAccessToken(salesforceAccessToken);
            // this.onSalesforceLoginWithToken(salesforceAccessToken);
        } catch (error) {
            console.log('Error authenticating with Azure and Salesforce:', error);
        }
    }

    /**
     * SetAccessToken to salesforce
     * @param {*} accessToken 
     */
    setAccessToken(accessToken) {
        oauth.token = {
            access_token: accessToken
        };
        oauth._authHeader = `Bearer ${accessToken}`;
        oauth.setSessionToken(accessToken);
        oauth.setAuthHeader(`Bearer ${accessToken}`);
    };

    //   /**
    //    * Salesforce Login with Azure Access Token
    //    * @param {*} accessToken 
    //    */
    //   async onSalesforceLoginWithToken(accessToken) {
    //     oauth.authenticate(
    //         (accessToken) => {
    //             console.log("login completed");
    //             this.setState({loggedIn: true})
    //             if (authResponse && authResponse.access_token) {
    //                 oauth.setRefreshToken(authResponse.refresh_token);
    //                 oauth.setAccessToken(authResponse.access_token);
    //               }

    //         },
    //         (error) => console.log('login failed:' + error)
    //     );    

    // }




    onLogout() {
        console.log("onLogout called");
        oauth.logout(() => {
            console.log("logout completed");
            this.setState({ loggedIn: false });
        });
    }

    onAzureLogin() {
        console.log("onAzureLogin called");
    }

    render() {
        return (
            <View style={styles.container}>



                <Modal
                    visible={this.state.isOpenWebView}
                    onRequestClose={() => this.setState({ isOpenWebView: false })}>

                    <WebView source={{ html: this.state.responseHtml }} style={{ flex: 1 }} />
                </Modal>







                {/* <Button title="Salesforce Login" onPress={() => this.onSalesforceLogin()} /> */}
                {/* {!this.state.loggedIn ?
                    <Button title="Azure AD Login" onPress={() => this.onLogin()} />
                    :
                    <Button title="Logout" onPress={() => this.onLogin()} />
                }
                <Button title="Contact List" onPress={() => this.props.navigation.navigate('ContactList')} />
                <Button title="Customer List" onPress={() => this.props.navigation.navigate('CustomerList')} />

                <Button title="Product Listings" onPress={() => {
                    this.props.navigation.navigate('ProductsList');
                }} /> */}


                {this.state.isLoaderVisible &&
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#ff0000" />

                        <TouchableOpacity
                            activeOpacity={1}
                        // onPress={()=> this.onSalesforceLogin()}
                        >
                            <Text>{"Logging In and Syncing data...please wait!"}</Text>
                        </TouchableOpacity>
                    </View>
                }


                {/* <Button title="Sync" onPress={() => {
                    syncData()
                }} /> */}
            </View>
        );
    };
}
export default Test;


