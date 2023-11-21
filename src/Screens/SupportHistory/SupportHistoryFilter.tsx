import React, { useState } from 'react';
import {
  TouchableHighlight,
  View,
  ScrollView,
  Pressable,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from "./styles";


const SupportHistoryFilter: React.FC<{ navigation: any }> = ({ navigation }) => {

  // const { t }:any = useTranslation();
const [isCaseStatusOpen, setIsCaseStatusOpen] = useState<boolean>(true);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState<boolean>(false);

  const toggleCaseStatusAccordion = () => {
    setIsCaseStatusOpen(!isCaseStatusOpen);
  };

  const toggleDateRangeAccordion = () => {
    setIsDateRangeOpen(!isDateRangeOpen);
  };

  const handleStartDateSelectorClick = () => {
    setShowStartDatePicker(true)
  }
  const handleEndDateSelectorClick = () => {
    setShowEndDatePicker(true)
  }

  const handleStartDateChange = (event: any, selectedDate: any | undefined) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      console.log("selectedDate",selectedDate)
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate: any | undefined) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleReset = () => {
    setOpen(false)
    setCancelled(false)
    setClosed(false)
    setStartDate(new Date())
    setEndDate(new Date())
  }

  return (

    <View style={styles.bodyFlexStyle}>
      <ScrollView>
        {/* Main Header */}
        <View style={styles.filterHeader}>
          <View style={styles.filterInner}>
            <View style={styles.filterHeaderData}>
              <Pressable onPress={() => navigation.navigate('SupportHistory')}>
                {({ pressed }) => (
                  <View style={styles.gapStyle}>
                    {/* <BlackCross /> */}
                  </View>
                )}
              </Pressable>
              <View style={styles.gapStyle}>
                <Text style={styles.filterTextStyle}>Filter</Text>
              </View>
            </View>
            <TouchableHighlight
              // color={"#FFFFFF"}
              underlayColor={'#F40000'}
              style={styles.roundButton}>

              <Text style={styles.whiteText}>Apply</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.filerMain} >
          <TouchableOpacity
            onPress={toggleCaseStatusAccordion}
            style={styles.caseStatusCotainer}
          >
            <Text style={[styles.filterHeading, { color: '#F40000' }]} >Case Status</Text>
            {/* {isCaseStatusOpen ? <UpArrow /> : <DownArrow />} */}
          </TouchableOpacity>

          {isCaseStatusOpen && (
            <View
              style={styles.caseStatusWrapper}
            >

              <View style={styles.checkBoxWrapper} >
                {/* <CheckBox
                  value={open}
                  onValueChange={() => setOpen(!open)}
                  style={{ alignSelf: 'center' }}
                /> */}
                <Text style={{ color: '#000' }} >Open</Text>
              </View>

              <View style={styles.checkBoxWrapper} >
                {/* <CheckBox
                  value={closed}
                  onValueChange={() => setClosed(!closed)}
                  style={{ alignSelf: 'center' }}
                /> */}
                <Text style={{ color: '#000' }} >Closed</Text>
              </View>

              <View style={styles.checkBoxWrapper} >
                {/* <CheckBox
                  value={cancelled}
                  onValueChange={() => setCancelled(!cancelled)}
                  style={{ alignSelf: 'center' }}
                /> */}
                <Text style={{ color: '#000' }} >Cancelled</Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            onPress={toggleDateRangeAccordion}
            style={styles.dateRangeContainer}
          >
            <Text style={[styles.filterHeading, { color: '#000000' }]} >Date Range</Text>
            {/* {isDateRangeOpen ? <UpArrow /> : <DownArrow />} */}
          </TouchableOpacity>

          {isDateRangeOpen && (
            <View style={styles.dateMain} >
              <View style={{ width: '50%' }} >
                <Text style={styles.dateTopText} >Start Date</Text>
                <TouchableOpacity onPress={handleStartDateSelectorClick} >
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{startDate && startDate.toLocaleDateString()}</Text>
                    <View style={styles.calendarIcon} >
                      {/* <CalendarIcon /> */}
                    </View>
                  </View>
                </TouchableOpacity>
                {/* {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                  />
                )} */}
              </View>
              <View style={{ width: '50%' }} >
                <Text style={styles.dateTopText} >End Date</Text>
                <TouchableOpacity onPress={handleEndDateSelectorClick} >
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{endDate && endDate.toLocaleDateString()}</Text>
                    <View style={styles.calendarIcon} >
                      {/* <CalendarIcon /> */}
                    </View>
                  </View>
                </TouchableOpacity>
                {/* {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    minimumDate={startDate}
                    onChange={handleEndDateChange}
                  />
                )} */}
              </View>
            </View>
          )}
          <TouchableHighlight
            onPress={() => handleReset()}
            style={styles.resetButton}>
            <Text style={styles.blackText}>Reset</Text>
          </TouchableHighlight>
        </View>

      </ScrollView>
    </View>
  );
};

export default SupportHistoryFilter;