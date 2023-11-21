// import IndexScreen from "../routes/index";

// import i18 from 'i18next';
// import * as RNLocalize from 'react-native-localize';
// import { initReactI18next, I18nextProvider } from "react-i18next";
// import en from '../localization/en.json';

// const resources = {
//     en: { translation: en},
//     // mr: { translation: mr}
// };

// i18
// .use(initReactI18next)
// .init({
//     resources,
//     compatibilityJSON: 'v3',
//     lng: RNLocalize.getLocales()[0].languageCode,
//     fallbackLng: 'en',
//     debug: true,
//     interpolation:{
//         escapeValue: false
//     }
// })
// ;

// const App = () => {
//   return (
//      <I18nextProvider i18={i18}>
//         <IndexScreen />
//      </I18nextProvider>
//   );
// };

// export default App;

import IndexScreen from "../routes/index";
import i18 from "i18next";
import * as RNLocalize from "react-native-localize";
import { initReactI18next, I18nextProvider } from "react-i18next";
import en from "../localization/en.json";
import React from "react";

interface Resources {
  translation: {
    [key: string]: any;
  };
}

const resources: any = {
  en: { translation: en },
  // mr: { translation: mr }
};

i18.use(initReactI18next).init({
  resources,
  compatibilityJSON: "v3",
  lng: RNLocalize.getLocales()[0].languageCode,
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18}>
      <IndexScreen />
    </I18nextProvider>
  );
};

export default App;
