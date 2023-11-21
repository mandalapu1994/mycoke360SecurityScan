import { oauth, net } from 'react-native-force';
import moment, { Moment } from 'moment';


// Function to get all dates between start and end dates
const getDates = (startDate: Date, endDate: Date): Date[] => {
    console.log("getDates==startDate", startDate)
    console.log("getDates==endDate", endDate)
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    console.log("getDates==currentDate", currentDate)
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}


const getSpecificDays = (dates: Date[], daysToCheck: number[]): Date[] => {
    return dates.filter(date => daysToCheck.includes(date.getDay()));
}

const getSpecificDaysArr = (timeSlot: any[]) => {
    console.log("getSpecificDaysArr", getSpecificDaysArr)
    const dayIndices = [];

    // Define an array of day names in the correct order
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Loop through the input array
    for (const item of timeSlot) {
        const dayName = item.DayOfWeek.charAt(0).toUpperCase() + item.DayOfWeek.slice(1).toLowerCase(); // Normalize the day name
        const index = daysOfWeek.indexOf(dayName); // Find the index of the day name in the array

        if (index !== -1) {
            dayIndices.push(index); // Push the index to the result array
        }
    }

    return dayIndices;
}

const getCustomizeDateRange = (
    occuredDateRange: Moment[],
    weekRange: number
) => {
    //   to get frequency
    let finalDateRange = [];
    for (
        let i = 0, length = occuredDateRange.length;
        i < length;
        i += weekRange
    ) {
        finalDateRange.push(occuredDateRange[i]);
    }
    return finalDateRange;
};

const getDatesBySpecificDay = (
    availableDates: Date[],
    specificDays: number[],
    dateRange = 1 // frequency
) => {
    let dayOccurance = availableDates.filter((date) =>
        specificDays.includes(moment(date).day())
    );
    console.log({ dayOccurance });
    let frequencyRange = getCustomizeDateRange(dayOccurance, dateRange);
    console.log("frequencyRange", frequencyRange);
    return frequencyRange
};


/////Holiday Management
const isDateWithinRange = (HolidayDate__c: Date, ValidFrom__c: Date, ValidTo__c: Date): boolean => {
    return HolidayDate__c >= ValidFrom__c && HolidayDate__c <= ValidTo__c;
}

const removeDateFromArray = (dateArray: Date[], dateToRemove: Date): Date[] => {
    return dateArray.filter(date => date.getTime() !== dateToRemove.getTime());
}


///////Off day 

const fetchingDetailsForDayOff = () => {

    console.log("start fetching");
    var query = `SELECT Id, Name, Value FROM ExternalString WHERE Name = 'VisitPlanType'`

    var visitPlanType = "YourValueHere"; // Replace with the actual value you want to use
    var queryString = "SELECT Id, Name, Value FROM ExternalString WHERE Name = '" + visitPlanType + "'";
    try {
        net.query(query,
            (response: any) => {
                console.log("fetchingDetailsForDayOff--response", response);
                //   applyFilterAndSort(response.records);
            },
            (error: any) => {
                console.log("error:--- ", JSON.stringify(error));
                //   setProductList([]);
            }
        );
    } catch (error: any) {
        console.log("fetchingDetailsForDayOff-error", JSON.stringify(error));
    }
};



export {
    getDates, getSpecificDays, getSpecificDaysArr, isDateWithinRange,
    removeDateFromArray, getDatesBySpecificDay, fetchingDetailsForDayOff
} 