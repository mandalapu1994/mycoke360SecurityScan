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
     FlatList,
     Button,
     TouchableOpacity,
     ScrollView, 
      TextInput
 } from 'react-native';
 import styles  from './styles';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import {oauth, net} from 'react-native-force';
import { ListenerPredicateGuardedActionType } from '@reduxjs/toolkit/dist/listenerMiddleware/types';
import { createUpdateSoup } from '../../Salesforce/SmartStore';

interface ContactDetailsState {
  contact_details: any;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  id:any;
  Name:any;
  ExternalId__c:any;

}

class ContactDetails extends React.Component<any, ContactDetailsState> {
  constructor(props: any) {

         super(props);
         this.state = { 
          contact_details: this.props.route.params.contactDetails || {},
          firstName: this.props.route.params.contactDetails.FirstName || '',
          lastName: this.props.route.params.contactDetails.LastName || '',
          phone: this.props.route.params.contactDetails.Phone || '',
          email: this.props.route.params.contactDetails.Email || '',
          id: this.props.route.params.contactDetails.Id ,
          Name: this.props.route.params.contactDetails.Name || "",
          ExternalId__c: this.props.route.params.contactDetails.ExternalId__c || ""
          };
          console.log('Params=', this.props.route.params.contactDetails)
     }
     
     
     updateDetails() {
      const contactId = this.state.contact_details.Id;
      const updatedDetails = {
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        Email: this.state.email,
        Phone: this.state.phone,
        Id: this.state.id,
        ExternalId__c:this.state.ExternalId__c,
        BottlerId__c:this.state.contact_details.BottlerId__c,
        _soupEntryId: this.state.contact_details._soupEntryId,
        LastModifiedDate:this.state.contact_details.LastModifieLastModifiedDatedDate,
        __local__: true,     
        __locally_created__: false, 
        __locally_updated__: true,
        __locally_deleted__: false, 
        attributes:this.state.contact_details.attributes,
      } 
      createUpdateSoup(
        updatedDetails,
        (updatedContact:any) => {
          console.log('Contact updated successfully:', updatedContact);
       
          setTimeout(()=>{
            this.props.navigation.pop();
          },1000)
          // ... do something with the updated contact data
        },
        (error:any) => {
          console.log('Error updating contact:', error);
          // ... handle the error case, if needed
        }
      );
    }

    
    //  updateDetails() {
    //      const contactId = this.state.contact_details.Id;
    //      const updatedDetails = {
    //       firstName: this.state.firstName,
    //       lastName: this.state.lastName,
    //       email: this.state.email,
    //       phone: this.state.phone
    //      };
    //      net.update('Contact', contactId, updatedDetails, response => {
    //          console.log('Contact updated successfully:', response);
    //          this.props.navigation.pop();
    //        }, error => {
    //          console.error('Error updating contact:', JSON.stringify(error));
    //        });
    //  }
 
 
     render() {
         return (
             <View style={styles.container}>
               <ScrollView>
                  <Text style={styles.header}>First Name</Text>
                  <TextInput
                    style={styles.textinput}
                    onChangeText={newText => this.setState({firstName: newText})}
                    defaultValue={this.state.firstName}
                  />
                  

                  <Text style={styles.header}>Last Name</Text>
                  <TextInput
                    style={styles.textinput}
                    onChangeText={newText => this.setState({lastName: newText})}
                    defaultValue={this.state.lastName}
                  />

                <Text style={styles.header}>Email</Text>
                  <TextInput
                    style={styles.textinput}
                    onChangeText={newText => this.setState({email: newText})}
                    defaultValue={this.state.email}
                  />

                <Text style={styles.header}>Phone</Text>
                  <TextInput
                    style={styles.textinput}
                    onChangeText={newText => this.setState({phone: newText})}
                    defaultValue={this.state.phone}
                  />
                  <View style={styles.buttonContainer}>
                    <Button title="Update Details" onPress={() => this.updateDetails()} />
                  </View>
                </ScrollView>
            </View>
         );
     }
 }

 
 export default ContactDetails;
 