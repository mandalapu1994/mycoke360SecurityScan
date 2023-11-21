import {
    View,
    TextInput,
    Pressable
} from 'react-native'
import React from 'react'
import styles from "./styles";
import Search from "../../assets/images/Search";
import Close from "../../assets/images/Close";

interface SearchBarProps {
    searchedText: string;
    onChangeSearchedText: (text: string) => void;
    clearSearch: () => void;
    placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {

    return (
        <View
            style={styles.searchContainer}
            testID='inputSearchBarWrapper'
        >
            <View style={styles.searchIconOuter}>
                <Search />
            </View>
            <View style={styles.searchInput}>
                <TextInput
                    testID='inputSearchBarInput'
                    style={styles.inputDetails}
                    value={props.searchedText}
                    onChangeText={text => props.onChangeSearchedText(text)}
                    placeholder={props.placeholder}
                />
            </View>
            {props.searchedText !== "" &&
                <Pressable
                    testID='inputSearchBarClearTextButton'
                    style={styles.closeIconOuter}
                    onPress={() => props.clearSearch()}>
                    {({ pressed }) =>
                        <Close />
                    }
                </Pressable>
            }
        </View>
    )
};

export default SearchBar