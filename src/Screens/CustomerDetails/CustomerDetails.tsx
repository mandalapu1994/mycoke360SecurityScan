/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import React ,{Component} from 'react';
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
 


interface CustomerDetailsProps {
  route: {
    params: {
      CustomerDetails: {
        Id: string;
        Name: string;
        TotalLifeTimeValue: number;
        // Add other properties from your customer object if necessary
      };
    };
  };
  navigation: any,
  
}

interface CustomerDetailsState {
  customer_details: {
    Id: string;
    Name: string;
    TotalLifeTimeValue: number;
  };
  name: string;
  lifetimeValue: string;
}

class CustomerDetails extends Component<CustomerDetailsProps, CustomerDetailsState> {
     constructor(props:CustomerDetailsProps) {
         super(props);
         this.state = { 
           customer_details: this.props.route.params.CustomerDetails || {},
           name: this.props.route.params.CustomerDetails.Name || '',
           lifetimeValue: this.props.route.params.CustomerDetails.TotalLifeTimeValue + '' || '',
          };
          console.log('Params=', this.props.route.params.CustomerDetails)
     }
 
     
 
     updateDetails() {
         const CustomerId = this.state.customer_details.Id;
         const updatedDetails = {
          name: this.state.name,
          totalLifeTimeValue: parseInt(this.state.lifetimeValue)
         };
         net.update('Customer', CustomerId, updatedDetails, response => {
             console.log('Customer updated successfully:', response);
             this.props.navigation.pop();
           }, error => {
             console.error('Error updating Customer:', JSON.stringify(error));
           });
     }
 
 
     render() {
         return (
             <View style={styles.container}>
               <ScrollView>
                  <Text style={styles.header}>Name</Text>
                  <TextInput
                    style={styles.textinput}
                    onChangeText={newText => this.setState({name: newText})}
                    defaultValue={this.state.name}
                  />

                <Text style={styles.header}>Life Time Value</Text>
                  <TextInput
                    style={styles.textinput}
                    onChangeText={newText => this.setState({lifetimeValue: newText})}
                    defaultValue={this.state.lifetimeValue}
                  />
                  
                  <View style={styles.buttonContainer}>
                    <Button title="Update Details" onPress={() => this.updateDetails()} />
                  </View>
                </ScrollView>
            </View>
         );
     }
 }

 
 export default CustomerDetails;
 