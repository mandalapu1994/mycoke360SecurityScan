/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Modal
} from 'react-native';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { oauth, net } from 'react-native-force';
import { querySoup } from '../../Salesforce/SmartStore';
import { syncData } from '../../Salesforce/SmartSync';
import CreateContact from './CreateContact';


interface ContactListState {
  data: any[],
  loggedIn:boolean,
  isVisible: boolean
}

class ContactList extends Component<any, ContactListState> {
    constructor(props:any) {
        super(props);
        this.state = {
            data: [],
            loggedIn:false,
            isVisible:false
        };
    }

    componentDidMount() {
        console.log("componentDidMount called");
        // this.fetchData();
        this.getDataFromStore()
    }


     saveData = (data:any) =>{

        console.log("querySoup----success CONTACTS",data.currentPageOrderedEntries)
        this.setState({data:[]})
        this.setState({data:data.currentPageOrderedEntries})
       
    
        // this.setState({loggedIn: true, data: data.currentPageOrderedEntries})
    
      }
    
       getDataFromStore(){
        // let checkSelectedAcc = await AsyncStorage.getItem("selectedAcc") ? await JSON.parse(AsyncStorage.getItem("selectedAcc")) : ""
    
        // setSelectedAccount(checkSelectedAcc)
        syncData();
        querySoup('contact',(success:any) => (this.saveData(success)),(error:any) => console.log("querySoup----error",error),"Name")
    
    
    
      }



    fetchData() {
        console.log("fetchData called");
        net.query('SELECT FIELDS(ALL) FROM Contact LIMIT 100',
            (response:any) => {
                console.log("soql query completed CONTACTS",response);
                this.setState({ loggedIn: true, data: response.records })
            },
            (error) => {
                console.log("error:--- ", JSON.stringify(error));
                this.setState({ loggedIn: false, data: [] });
            });
    }

    getContactDetails(contact:any) {
        console.log('Contact=', contact);
        this.props.navigation.navigate('ContactDetails', { contactDetails: contact });
    }


    render() {
        return (
            <View style={styles.container}>
                 <Button title="Create contact"  onPress={() =>this.setState({isVisible:true})} />
                 <View style={{marginBottom:20}}></View>
                <Button title="Refresh" onPress={() => this.getDataFromStore()} />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }:{ item:any }) =>
                        <TouchableOpacity onPress={() => this.getContactDetails(item)} >
                            <Text style={styles.item}>{item.Name ? item.Name: item.FirstName + " " + item.LastName}</Text>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => 'key_' + index}
                />
                 <Modal
                 visible={this.state.isVisible}
                 animationType="slide"
                 onRequestClose={()=>this.setState({isVisible:false})}

                >
                    <CreateContact/>

                </Modal>
            </View>
        );
    }
}


export default ContactList;
