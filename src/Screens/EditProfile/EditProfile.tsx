import React, { useState ,FC} from 'react'
import { View, SafeAreaView, ScrollView, Text, TextInput, Pressable } from 'react-native'
import styles from './styles'
import BlackCross from "../../assets/images/BlackCross"
import { useTranslation } from "react-i18next";
import { Language } from '../../utils/FormOtions';
import DropDownSelect from '../ContactUs/DropDownSelect';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/loader';


interface EditProfileProps {
  navigation: any; // Replace 'any' with the appropriate type for the 'navigation' prop
}

const EditProfile: FC<EditProfileProps> = ({ navigation }) => {

    const { t } = useTranslation();
  
    const loader = useSelector((state: any) => state.loader.isLoaderVisible);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('john@bottler.com');
  const [number, setNumber] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  const [isCheckEmailReminder, setIsCheckEmailReminder] = useState<boolean>(true);
  const [isCheckTextReminder, setIsCheckTextReminder] = useState<boolean>(true);
  const [mobile, setMobile] = useState<string>('(987)-654-3210');

  
  // Handle Input
  const handleFirstName = (text: string) => {
    setFirstName(text);
  };
  const handleLastName = (text: string) => {
    setLastName(text);
  };
  const handleEmail = (text: string) => {
    setEmail(text);
  };
  const handlesSelectDays = (val: any) => {
    setLanguage(val);
  };
  const handleCheckEmailReminder = (newValue: boolean) => {
    setIsCheckEmailReminder(newValue);
  };
  const handleCheckTextReminder = (newValue: boolean) => {
    setIsCheckTextReminder(newValue);
  };
  const handleMobile = (text: string) => {
    setMobile(text);
  };
  const HandleNumber = (inputValue: string) => {
    // Remove all non-digit characters
    const cleanedNumber = inputValue.replace(/\D/g, '');

    let formattedNumber = '';
    if (cleanedNumber.length > 0) {
      formattedNumber += cleanedNumber.substring(0, 3);
    }
    if (cleanedNumber.length > 3) {
      formattedNumber += '-' + cleanedNumber.substring(3, 6);
    }
    if (cleanedNumber.length > 6) {
      formattedNumber += '-' + cleanedNumber.substring(6, 10);
    }

    setNumber(formattedNumber);
  };
  const HandleClose = () => {
    navigation.navigate('MyProfile');
  };

  interface SubHeadingProps {
    text: string;
  }

  const SubHeading: React.FC<SubHeadingProps> = ({ text }) => {
    return <Text style={styles.subHeading}> {text}</Text>;
  };

  const Divider = () => {
    return <View style={styles.divider}></View>;
  };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
               
                <View style={styles.headerBox}>
                    <Text style={styles.heading}>Edit Profile</Text>
                    <TouchableOpacity onPress={HandleClose}>
                        <BlackCross />
                    </TouchableOpacity>
                </View>
                <View>
                    <SubHeading text={t("VIEW_PROFILE.basicTitle")} />
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t("VIEW_PROFILE.firstnameTitle")}</Text>
                        <TextInput
                            style={styles.input}
                            value={firstName}
                            onChangeText={handleFirstName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t("VIEW_PROFILE.lastnameTitle")}</Text>
                        <TextInput
                            style={styles.input}
                            value={lastName}
                            onChangeText={handleLastName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t("VIEW_PROFILE.contactTitle")}</Text>
                        <TextInput
                            style={[styles.input, { borderColor: '#DDDBDA', borderWidth: 1, padding: 10, backgroundColor: '#eee', color: 'black' }]}
                            value={email}
                            onChangeText={handleEmail}
                            editable={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t("VIEW_PROFILE.phone")}</Text>
                        <TextInput
                            style={styles.input}
                            value={number}
                            keyboardType="numeric"
                            onChangeText={HandleNumber}
                        />
                    </View>
                    <DropDownSelect
                        value={language}
                        data={Language}
                        setSelected={handlesSelectDays}
                        label={t("VIEW_PROFILE.languageTitle")}
                        defaultOption={{ key: '1', value: 'English' }}
                        important={false}
                        placeholder=''
                        save='value'
                        search={false}
                        multiselect={false}
                        selectedLabel=""


                        
                    />
                    <Divider />
                    <View>

                        <SubHeading text={t("VIEW_PROFILE.prefferedTitle")} />
                        <View>
                            <View style={styles.remiderBox}>
                                <View >
                                    <CheckBox
                                        disabled={false}
                                        value={isCheckEmailReminder}
                                        onValueChange={handleCheckEmailReminder}
                                        tintColors={{ true: 'black', false: 'black' }}

                                        style={styles.checkbox}
                                    />

                                </View>
                                <View style={styles.remiderTextBox}>
                                    <Text style={styles.smallHeading}>{t("VIEW_PROFILE.EmailRemider")}</Text>
                                    <Text style={styles.simpleText}>{t("VIEW_PROFILE.EmailRemiderMSG")}John@bottler.com</Text>
                                </View>
                            </View>
                            <View style={styles.remiderBox}>
                                <View>
                                    <CheckBox
                                        disabled={false}
                                        value={isCheckTextReminder}
                                        onValueChange={handleCheckTextReminder}
                                        tintColors={{ true: 'black', false: 'black' }}

                                        style={styles.checkbox}
                                    />

                                </View>
                                <View style={styles.remiderTextBox}>
                                    <Text style={styles.smallHeading}>{t("VIEW_PROFILE.Text_Reminder")}</Text>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>{t("VIEW_PROFILE.numberLabel")}</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={mobile}
                                            onChangeText={handleMobile}
                                            keyboardType="numeric"

                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                     <View style={styles.buttonBox}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                        >
                            <Text style={[styles.buttonText,{color:"#000"}]}>{t("VIEW_PROFILE.cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.updateButton}
                        >
                            <Text style={[styles.buttonText, { color: "#fff" }]}>{t("VIEW_PROFILE.update")}</Text>
                        </TouchableOpacity>

                     </View>

                </View>

            </ScrollView>
            {loader &&  <Loader message="Please wait..." />}
        </SafeAreaView>
    )
}

export default EditProfile
