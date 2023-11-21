import {
    View,
    TextInput,
    Pressable
} from 'react-native'
import React from 'react'
import styles from "./styles";
import Search from "../../assets/images/Search";
import BlackClose from "../../assets/images/BlackClose";
interface CustomSearchBarProps {
  searchedText: string;
  onChangeSearchedText: (text: string) => void;
  clearSearch: () => void;
  placeholder: string;
}
const CustomSearchBar: React.FC<CustomSearchBarProps> = (props)=>{

    return (

        <View
            style={styles.searchContainer}
            testID='customeSearchBarWrapper'
        >
            <View style={styles.searchIconOuter}>
                <Search />
            </View>
            <View style={styles.searchInput}>
                <TextInput
                    testID='customeSearchBarInput'
                    style={styles.inputDetails}
                    value={props.searchedText}
                    onChangeText={text => props.onChangeSearchedText(text)}
                    placeholder={props.placeholder}
                />
            </View>

            <Pressable
                testID='customeSearchBarClose'
                style={styles.closeIconOuter}
                onPress={() => props.clearSearch()}>
                {({ pressed }) =>
                    <BlackClose />
                }
            </Pressable>

        </View>
    )
};
export default CustomSearchBar;