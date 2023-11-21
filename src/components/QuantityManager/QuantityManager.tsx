import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput
} from "react-native";
import React from 'react'
import MinusIcon from "../../assets/images/MinusIcon";
import PlusIcon from "../../assets/images/PlusIcon";
type ProductItemType = {

    quantity: number;
    Id: string
    addQty?: () => void;
    minusQty?: () => void;
    inputeHandle?: (id: string, num: any) => void;
    buttonBorder: boolean
    editableInput: boolean
    isDisabled: boolean
};



const QuantityManager: React.FC<ProductItemType> = ({
    quantity = 1,
    Id,
    addQty = () => { },
    minusQty = () => { },
    inputeHandle = () => { },
    buttonBorder = false,
    editableInput = false,
    isDisabled = false
}) => {



    const handleInputChange = (Id: string, num: string) => {
        // Define a regular expression pattern to allow only numbers
        const pattern = /^[0-9]*$/;

        if (pattern.test(num)) {
            // Input is valid, update the state
            Number(num) == 0 ? inputeHandle(Id, 1) : inputeHandle(Id, num);
        } else {

            // Input is invalid, set an error message

        }
    };

    return (

        <View style={styles.incAndDecBtnWrapper}>
            <TouchableOpacity
                disabled={isDisabled}
                onPress={minusQty}
                style={[styles.padding12, { borderRightWidth: buttonBorder ? 1 : 0 }]}>
                <MinusIcon />
            </TouchableOpacity>
            <TextInput
                style={[styles.productQuantityCount, { color: editableInput ? "#000" : "#000" }]}
                // backgroundColor: isDisabled ? "#ECEBEA" : editableInput ? '#FFF' : '#ECEBEA', color:'#000'
                onChangeText={(num) => handleInputChange(Id, num)}
                value={quantity + ""}
                //  placeholder="useless placeholder"
                maxLength={4}
                keyboardType="numeric"
                editable={isDisabled ? false : editableInput}
            />

            <TouchableOpacity
                disabled={isDisabled}
                onPress={addQty}
                style={[styles.padding12, { borderLeftWidth: buttonBorder ? 1 : 0 }]}>
                <PlusIcon />
            </TouchableOpacity>
        </View>

    )
}

export default QuantityManager

const styles = StyleSheet.create({
    productQuantityCount: {
        height: 30,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        alignItems: "center",
        justifyContent: "center"
    },

    incAndDecBtnWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 120,
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 10,
    },
    padding12: {
        padding: 12,
    },


});