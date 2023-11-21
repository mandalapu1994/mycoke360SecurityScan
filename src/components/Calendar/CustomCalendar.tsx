import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import moment from "moment";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import DropDownArrow from "./DropDownArrow";
import SelectDropdown from "react-native-select-dropdown";
import Condition1 from "./Condition1";
import Condition2 from "./Condition2";
import Condition3 from "./Condition3";
import { FONT_FAMILY_I_REGULAR } from "../../utils/Theme";

type CustomCalendarType = {
  setSelectedDate: (selectedDate: object) => {};
  selectedDate: object[];
  disableDate: object[];
  deliveryOffDate: object[];
};



const CustomCalendar = ({
  selectedDate,
  setSelectedDate,
  disableDate,
  deliveryOffDate,
}: CustomCalendarType) => {
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));

  const getMonth = (month: string) => {
    switch (month) {
      case "01":
        return "JANUARRY";
      case "02":
        return "FEBRUARY";
      case "03":
        return "MARCH";
      case "04":
        return "APRIL";
      case "05":
        return "MAY";
      case "06":
        return "JUNE";
      case "07":
        return "JULY";
      case "08":
        return "AUGUST";
      case "09":
        return "SEPTEMBER";
      case "10":
        return "OCTOBER";
      case "11":
        return "NOVEMBER";
      case "12":
        return "DECEMBER";
    }
  };

  const handelMonthSelection = (type: string) => {
    if (type === "addMonth") {
      const nextMonth = moment(currentDate)
        .add(1, "month")
        .format("YYYY-MM-DD");
      setCurrentDate(nextMonth);
    } else {
      const prevMonth = moment(currentDate)
        .subtract(1, "month")
        .format("YYYY-MM-DD");
      setCurrentDate(prevMonth);
    }
  };

  const getCalendarYear = () => {
    let calendarYear: string[] = [];
    let maxYear: number = 2045;
    let minYear: number = 2023;
    for (let i = minYear; i <= maxYear; i++) {
      let temp = `${i}`;
      calendarYear.push(temp);
    }
    return calendarYear;
  };

  const getDateType = [...disableDate, ...deliveryOffDate, ...selectedDate];

  const getStyles = (type: string) => {
    switch (type) {
      case "DISABLED_DATE_STYLE":
        return {
          backgroundColor: "#EAEAEA",
          height: 55,
          width: 50,
        };
      case "SELECTED_DATE_STYLE":
        return {
          borderColor: "red",
          height: 55,
          width: 50,
        };
      case "DELIVERY_WITH_OFF_DAY_FEE":
        return {
          height: 55,
          width: 50,
        };
      default:
        return {
          height: 55,
          width: 50,
        };
    }
  };

  const CustomDateComponent = ({ date, marking }: any) => {
    const getStyle = () => {
      for (let i = 0; i < getDateType.length; i++) {
        if (date.dateString === getDateType[i].date) {
          // console.log("getDateType[i].type", getDateType[i].date);
          return getStyles(getDateType[i].type);
        }
      }
    };

    const checkIsDateDisabled = (date) => {
      for (let i = 0; i < disableDate.length; i++) {
        if (disableDate[i].date === date) {
          return true;
        }
      }
      return false;
    };

    return (
      <TouchableOpacity
        disabled={checkIsDateDisabled(date.dateString)}
        style={[
          {
            borderWidth: 1,
            height: 55,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderColor:
              selectedDate[0].date === date.dateString ? "red" : "#DDDBDA",
          },
          getStyle(),
        ]}
        onPress={() => {
          setSelectedDate({
            date: date.dateString,
            type: "SELECTED_DATE_STYLE",
          });
        }}
      >
        {checkIsDateDisabled(date.dateString) ? (
          <ImageBackground source={require("./DisableDateBgc.png")}>
            <View
              style={{
                borderWidth: 1,
                height: 55,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                borderColor:
                  selectedDate[0].date === date.dateString ? "red" : "#DDDBDA",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: checkIsDateDisabled(date.dateString)
                    ? "#B3B3B3"
                    : "#000",
                }}
              >
                {date.day}
              </Text>
            </View>
          </ImageBackground>
        ) : null}
        <Text
          style={{
            fontSize: 18,
            color: checkIsDateDisabled(date.dateString) ? "#B3B3B3" : "#000",
          }}
        >
          {checkIsDateDisabled(date.dateString) ? "" : date.day}
        </Text>
        {deliveryOffDate.map((value, index) => {
          return date.dateString === value.date ? (
            <Text
              style={{
                fontSize: 18,
                paddingBottom: 15,
              }}
            >
              *
            </Text>
          ) : null;
        })}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginHorizontal: 10, maxHeight: 500 }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 9,
          backgroundColor: "#ffffff",
        }}
      >
        <Calendar
          initialDate={currentDate}
          markingType={"custom"}
          allowSelectionOutOfRange={true}
          dayComponent={({ date, marking }) => {
            return <CustomDateComponent date={date} marking={marking} />;
          }}
          style={{
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
          onDayPress={(day: DateData) => {
            console.log("selected day", day);
          }}
          monthFormat="yyyy MMMM"
          disableAllTouchEventsForDisabledDays={true}
          hideArrows={true}
          renderHeader={(date) => {
            let DATE = currentDate.split("-");
            return (
              <View style={[styles.headerContainer, { paddingLeft: 10 }]}>
                {/* month */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      handelMonthSelection("substractMonth");
                    }}
                  >
                    <LeftArrow />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.monthText,
                      {
                        width: 150,
                        borderRadius: 5,
                        // paddingTop: 9,
                        // height: 40,
                        fontSize: 16,
                        lineHeight: 19,
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "400",
                        fontFamily: FONT_FAMILY_I_REGULAR,
                      },
                    ]}
                  >
                    {getMonth(DATE[1])}
                  </Text>
                  <TouchableOpacity
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    onPress={() => {
                      handelMonthSelection("addMonth");
                    }}
                  >
                    <RightArrow />
                  </TouchableOpacity>
                </View>
                {/* year dropdown */}
                <View style={{}}>
                  <SelectDropdown
                    data={getCalendarYear()}
                    defaultButtonText={"2023"}
                    renderDropdownIcon={() => null}
                    buttonStyle={{
                      backgroundColor: "#fff",
                      maxWidth: 100,
                    }}
                    onSelect={(selectedItem, index) => {
                      // console.log(selectedItem, index, currentDate);
                      let originalDate = moment(currentDate, "YYYY-MM-DD");
                      originalDate.year(selectedItem);
                      setCurrentDate(originalDate.format("YYYY-MM-DD"));
                    }}
                    defaultValueByIndex={0}
                    dropdownStyle={{}}
                    renderCustomizedButtonChild={() => {
                      return (
                        <View
                          style={{
                            maxWidth: 100,
                            borderColor: "#DDDBDA",
                            borderWidth: 1,
                            borderRadius: 5,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: 5,
                          }}
                        >
                          <Text
                            style={[
                              styles.monthText,
                              {
                                borderRadius: 5,
                                paddingTop: 7,
                                height: 40,
                                fontSize: 15,
                                lineHeight: 23,
                                alignItems: "center",
                                fontWeight: "bold",
                              },
                            ]}
                          >
                            {DATE[0]}
                          </Text>
                          <View style={{ marginHorizontal: 8 }}>
                            <DropDownArrow />
                          </View>
                        </View>
                      );
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
        <View style={{ marginVertical: 12 }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 21,
                fontWeight: "400",
                color: "#000000",
                marginVertical: 10,
              }}
            >
              Today
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 7 }}>
            <View style={{ marginHorizontal: 11 }}>
              <Condition1 />
            </View>
            <Text style={styles.footerText}>Available for delivery</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 7 }}>
            <View style={{ marginHorizontal: 11 }}>
              <Condition2 />
            </View>
            <Text style={styles.footerText}>
              Available for delivery with off day fee
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <View style={{ marginHorizontal: 11 }}>
              <Condition3 />
            </View>
            <Text style={styles.footerText}>Not available for delivery</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
  },
  arrowText: {
    backgroundColor: "#f0f0f0",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginHorizontal: 5,
  },
  footerText: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 14,
    color: "#000000",
  },
});
