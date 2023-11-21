import {
    Text,
    View,
    Pressable,
    FlatList,
    Alert,
    Image
} from 'react-native'
import React from 'react'
import styles from "./styles";

interface TabItemProps {
    item: {
        icon: JSX.Element;
        selectedIcon: JSX.Element;
        tabName: string;
    };
    index: number;
}

interface TopTabsMultipleProps {
    data: {
        icon: JSX.Element;
        selectedIcon: JSX.Element;
        tabName: string;
    }[];
    selectedIndex: number;
    onPress: (index: number) => void;
}

const TopTabsMultiple: React.FC<TopTabsMultipleProps> = (props) => {
    /**
     * 
     *  ({pressed}) => (
                        <View style={[{flexDirection:"row",alignItems:"center",marginRight:9}, props.selectedIndex !== index
                        ? styles.buttonTextContainer 
                        : styles.selectedButtonTextContainer]}>
    
                <Text style={{width:25,height:15}}> {item.icon}</Text>
                 <Text style={{padding:0,margin:0,textAlign:"center"}}> {item.tabName}</Text>
                        </View>
                )
     */

    const TabItem = ({ item, index }:{ item:any, index:any }) => (
        <Pressable
            testID='topTabsMultipleItem'
            onPress={() => {
                props.selectedIndex = index
                props.onPress(index)
            }}
            style={({ pressed }) => [
                styles.buttonContainer,
                // index === 0 ? styles.firstBtn : {},
                // index === (props.data.length -1) ? styles.lastBtn : {},
                props.selectedIndex === index ? styles.selectedBtn : {}
            ]}
        >
            {
                <View style={[props.selectedIndex !== index
                    ? styles.buttonTextContainer
                    : styles.selectedButtonTextContainer]}>

                    <Text style={[{ width: 25, height: 15 }]}>{props.selectedIndex !== index ? item?.icon : item?.selectedIcon} </Text>

                    <Text style={[, props.selectedIndex !== index
                        ? null
                        : styles.selectedTextStyle]}> {item?.tabName}</Text>
                </View>
            }
        </Pressable>
    );

    return (
        <View
            style={styles.listContainer}
            testID='topTabsMultipleWrapper'
        >
            <FlatList
                data={props.data}
                renderItem={({ item, index }) => <TabItem item={item} index={index} />}
                keyExtractor={item => item.tabName}
                horizontal={true}
                // pagingEnabled={true}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
};

export default TopTabsMultiple;