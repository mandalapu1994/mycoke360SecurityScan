import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

import styles from './styles';
import Loader from '../../components/Loader/loader';
import { useSelector } from 'react-redux';

const labels: any = ['Order\nRecieved', 'Order\nPrepared', "Out for\nDelivery", 'Delivered'];

const customStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  // separatorStrokeLength: 100,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fff',
  stepStrokeWidth: 4,
  stepStrokeFinishedColor: '#fff',
  stepStrokeUnFinishedColor: '#fff',
  separatorFinishedColor: '#DDDBDA',
  separatorUnFinishedColor: '#DDDBDA',
  // stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#bfbfbf',
  stepIndicatorCurrentColor: '#000',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#DDDBDA',
  // stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#000000',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',

}

interface Props {
  navigation: any;
  route: any;
  orderDetails: any;
}


const StepIndicatorComponent: React.FC<Props> = ({ navigation, route }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [orderSpecificDetails, setOrderSpecificDetails] = useState<any>({})
  const focused=useIsFocused()
  const loader = useSelector((state: any) => state.loader.isLoaderVisible);
  useEffect(() => {
    if (route.params && route.params.orderDetails) {
      setOrderSpecificDetails(route.params.orderDetails)
    }
    getOrderStatus()
    console.log("PARAMS FROM ORDERDETIALS=>", route.params.orderDetails )

  }, [currentPosition,focused,orderSpecificDetails])


 
  const orderSteps = [
    {
      label: 'Order\nPending',
      image: require('../../assets/images/GreenTick.png'),
    },
    {
      label: 'Order\nReceived',
      image: require('../../assets/images/GreenTick.png'),
    },
    {
      label: 'Order\nPrepared',
      image: require('../../assets/images/GreenTick.png'),
    },
    {
      label: 'Out for\nDelivery',
      image: require('../../assets/images/GreenTick.png'),
    },
    {
      label: 'Delivered',
      image: require('../../assets/images/GreenTick.png'),
    },
  ];

  const getOrderStatus = () => {
    if (orderSpecificDetails.Status == "Draft") {
      setCurrentPosition(0)
    } else if (orderSpecificDetails.Status == "Pending") {
      setCurrentPosition(0)
    } else if (orderSpecificDetails.Status == "In Error") {
      setCurrentPosition(0)
    } else if (orderSpecificDetails.Status == "Activated") {
      console.log("FROM ACTIVATED BLOCK")
      setCurrentPosition(1)
    } else if (orderSpecificDetails.Status == "Confirmed") {
      setCurrentPosition(1)
    } else if (orderSpecificDetails.Status == "Dispatched") {
      setCurrentPosition(2)
    } else if (orderSpecificDetails.Status == "Prep for shipment") {
      setCurrentPosition(2)
    } else if (orderSpecificDetails.Status == "Dispatched") {
      setCurrentPosition(2)
    } else if (orderSpecificDetails.Status == "Out for Delivery") {
      setCurrentPosition(3)
    } else if (orderSpecificDetails.Status == "Delivered") {
      setCurrentPosition(4)
    } else if (orderSpecificDetails.Status == "In Settlement") {
      setCurrentPosition(4)
    }
   

  }

  const renderStepIndicator = ({ position, stepStatus }: { position: any, stepStatus: any }) => {
    const { label, image } = orderSteps[position];
    console.log(" image =>", image)

    if (image === undefined) {
      return (
        <View style={styles.stepIndicatorContainer}>



        </View>
      )

    } else {
      if (position < currentPosition) {
        return (
          <View style={styles.stepIndicatorContainer}>
            {image && <Image source={image} style={styles.stepIcon} />}
          </View>
        );
      } if (position == currentPosition) {
        return <View style={styles.stepIndicatorContainer}>
          {image && <Image source={require('../../assets/images/orderInProcess.png')} style={styles.stepIcon} />}
        </View>

      }
    }


  };



  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={orderSteps.map(step => step.label)}
        renderStepIndicator={renderStepIndicator}
        stepCount={orderSteps.length}

      />
      {loader &&  <Loader message="Please wait..." />}
    </View>
  );
};






export default StepIndicatorComponent;