import React, { useState } from 'react'
import { ScrollView, View, TextInput, Text, Button } from 'react-native'
import { createUpdateSoup } from '../../Salesforce/SmartStore'
import styles from '../ContactDetails/styles'





const  CreateContact:React.FC<{props:any}> = () =>{

  const [contactDetails, setContactDetails] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [Name, setName] = useState<string>('');
  const [ExternalId__c, setExternalId] = useState<string>('');

  const updateDetails = () => {
    const updatedDetails = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phone,
      __local__: true,
      __locally_created__: true,
      __locally_updated__: false,
      __locally_deleted__: false,
      attributes: { type: "contact" }

    }
    createUpdateSoup(
      updatedDetails,
      (updatedContact: any) => {
        console.log('Contact Created successfully:', updatedContact);

        // setTimeout(()=>{
        //   this.props.navigation.pop();
        // },1000)
        // ... do something with the updated contact data
      },
      (error: any) => {
        console.log('Error updating contact:', error);
        // ... handle the error case, if needed
      }
    );
  }


  return (
     <View style={styles.container}>
    <ScrollView>
      <Text style={styles.header}>First Name</Text>
      <TextInput
        style={styles.textinput}
        onChangeText={newText =>setFirstName(newText)}
        defaultValue={firstName}
      />


      <Text style={styles.header}>Last Name</Text>
      <TextInput
        style={styles.textinput}
        onChangeText={newText => setLastName( newText )}
        defaultValue={lastName}
      />

      <Text style={styles.header}>Email</Text>
      <TextInput
        style={styles.textinput}
        onChangeText={newText => setEmail( newText )}
        defaultValue={email}
      />

      <Text style={styles.header}>Phone</Text>
      <TextInput
        style={styles.textinput}
        onChangeText={newText => setPhone( newText )}
        defaultValue={phone}
      />
      <View style={styles.buttonContainer}>
        <Button title="Update Details" onPress={() => updateDetails()} />
      </View>
    </ScrollView>
  </View>

  )
}

export default CreateContact
