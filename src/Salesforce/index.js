import {oauth, net} from 'react-native-force';
import { saveDataLocally } from './SmartStore';



const fetchContactListData = ()=> {
    console.log("fetchData called");
    net.query('SELECT FIELDS(ALL) FROM Contact LIMIT 100',
              (response) => {
                  console.log("soql query completed",response);
                  // this.setState({loggedIn: true, data: response.records})
                  response.records.map((item)=>{
                      saveDataLocally(item,(success) => console.log("saveDataLocally----success",success),
                      (error) => console.log("saveDataLocally----error",error))
                  })
              },
              (error) => {
                  console.log("error:--- ", JSON.stringify(error));
                //   this.setState({loggedIn: false, data: []});
              });
}

const fetchCustomerListData =()=> {
    console.log("fetchCustomerData called");
    net.query('SELECT FIELDS(ALL) FROM Customer LIMIT 100',
        (response) => {
            console.log("fetchCustomerData soql query completed", response);
            // this.setState({ loggedIn: true, data: response.records })
        },
        (error) => {
            console.log("error:--- ", JSON.stringify(error));
            // this.setState({ loggedIn: false, data: [] });
        });
}

export  {fetchContactListData,fetchCustomerListData}