import React from 'react';
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
    ScrollView,
    Image,
    DeviceEventEmitter
} from 'react-native';
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { SelectList,MultipleSelectList } from 'react-native-dropdown-select-list';
import DownArrowBroad from "../../assets/images/DownArrowBroad"

interface DropDownSelectProps {
  label: string;
  placeholder: string;
  setSelected?: (value: any) => void;
  data: { key: string; value: string }[];
  save: string;
  search: boolean;
  important: boolean;
  value: any;
  multiselect: boolean;
  selectedLabel: string;
  defaultOption: any;
}
const DropDownSelect: React.FC<DropDownSelectProps> = ({ label, placeholder, setSelected, data, save, search, important = true, value, multiselect = false ,selectedLabel,defaultOption}) => {
    const { t } = useTranslation();
    const Label :any = t(label);
    const Placeholder :any  = t(placeholder);
    const Data :any = data || [];
    const Save :any = save || "value";
    const Search :any = search || false;
    const SelectedLabel:any  = selectedLabel || ""
    const DefaultOption:any = defaultOption
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{Label}{important && "*"}</Text>
            {multiselect ?
                <MultipleSelectList
                    setSelected={setSelected || (() => { })}
                    data={Data}
                    save={Save}
                    // onSelect={() => alert(selected)}
                    label={SelectedLabel}
                    placeholder={Placeholder}
                    boxStyles={styles.selectboxsaluation}
                    dropdownTextStyles={styles.optionText}
                    dropdownStyles={styles.dropDownStyle}
                    dropdownItemStyles={styles.dropdownItem}
                    inputStyles={{ color: value ? "#000" : "gray" }}
                    arrowicon={<View style={{marginTop:5}}><DownArrowBroad/></View>}
                   
                />
                : <SelectList
                    setSelected={setSelected || (() => { })}
                    data={Data}
                    save={Save}
                    search={Search}
                    placeholder={Placeholder}
                    boxStyles={styles.selectboxsaluation}
                    dropdownTextStyles={styles.optionText}
                    dropdownStyles={styles.dropDownStyle}
                    dropdownItemStyles={styles.dropdownItem}
                    inputStyles={{ color: value ? "#000" : "gray" }}
                    defaultOption ={DefaultOption}
                    arrowicon={<View style={{marginTop:5}}><DownArrowBroad/></View>}
                />}
        </View>
    )

};

export default DropDownSelect;



