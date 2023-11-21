/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import React ,{Component}from 'react';
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
 
 import {oauth, net} from 'react-native-force';
 

// Define the type for the customer object
interface Customer {
  Id: string;
  Name: string;
  loggedIn:boolean,
  // Add other properties from your customer object if necessary
}

// Define the type for the component state
interface CustomerListState {
  data: Customer[],
  loggedIn:boolean,
}
// Define the type for the component props
interface CustomerListProps {
  navigation: any; // Replace 'any' with the actual navigation type if available
}

class CustomerList extends Component<CustomerListProps, CustomerListState> {
     constructor(props:any) {
    super(props);
    this.state = {
      data: [],
      loggedIn:false
    };
  }
 
     componentDidMount() {
      console.log("componentDidMount called"); 
      this.fetchData();
  }


     fetchData() {
      console.log("fetchData called");
      net.query('SELECT FIELDS(ALL) FROM Customer LIMIT 100',
                (response:any) => {
                    console.log("soql query completed");
                    this.setState({loggedIn: true, data: response.records})
                },
                (error) => {
                    console.log("error:--- ", JSON.stringify(error));
                    this.setState({loggedIn: false, data: []});
                });
  }

  getContactDetails(customer:any){
      console.log('CustomerDetails=', customer);
      this.props.navigation.navigate('CustomerDetails', {CustomerDetails:customer});
  }
 
 
     render() {
         return (
          <View style={styles.container}>
          <Button title="Refresh" onPress={() => this.fetchData()} />
           <FlatList
             data={this.state.data}
             renderItem={({item}:{item:any}) =>
                 <TouchableOpacity onPress={()=> this.getContactDetails(item)} >
                         <Text style={styles.item}>{item.Name}</Text>
                 </TouchableOpacity>
             }
             keyExtractor={(item:any, index:number) => 'key_' + index}
           />
         </View>
         );
     }
 }

 
 export default CustomerList;
 