import React from 'react';
import {
  View,
  ActivityIndicator, Text
} from 'react-native';
import styles from './styles';

interface LoaderProps {
    message: string;
  }
const Loader: React.FC<LoaderProps> = ({message}) => {

  return (

    <View style={styles.container} >
        <ActivityIndicator size={40} color={"#F40009"} />
        <Text style={styles.messageText}> {message}</Text>
    </View>
  );
};

export default Loader;