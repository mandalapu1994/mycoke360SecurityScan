import moment from "moment";


export const getFormatTime = (date:any) => {
  if (date !== null) {
    const momentDate = moment(date);
    const formattedTime = momentDate.format('h:mm A');
    return formattedTime;
  } else {
    return "-- --";
  }
};



export const getFormatDate = (dateString:any) => {
    if (dateString) {
      const date = moment(dateString);
      const formattedDate = date.format('D MMM');
      return formattedDate;
    } else {
      return "     ";
    }
  };

export const getDateTimeSeperatedString = (date:any) => {
    const outputFormat = 'MM/DD/YYYY \n hh:mm A [ET]';
    let formattedDate = moment(date).format(outputFormat)
    return formattedDate
} 


