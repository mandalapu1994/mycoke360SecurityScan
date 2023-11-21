import { Linking } from 'react-native'
import Analytics from 'appcenter-analytics';




export const dialCall = (phoneNumber: string): void => {
    Linking.openURL(`tel:${phoneNumber}`);
};

export const LogService = async (message: string, fileName: string, otherData: any): Promise<void> => {
    const createLogDate = { date: new Date().toISOString(), fileName: fileName, otherData: otherData };
    await Analytics.setEnabled(true);
    Analytics.trackEvent(message, createLogDate);
};

export const LogAPiService = async (message:any, otherData:any) => {
    console.log("FROM INSIDE LOGAPISERVIWCE", message, otherData)
    // const createLogDate = { otherData: otherData };
    await Analytics.setEnabled(true);
    console.log("ENABLEDDDDD ===>")
    await Analytics.trackEvent(message,{
      Url:otherData.url ,
      headers:JSON.stringify(otherData.headers) ,
      Payload:JSON.stringify(otherData.Payload)
    } );
    console.log("AFTER TRACKEVENT DONE")
  };