import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization'; // Using Expo localization
import en from './assets/locales/en.json'; // English translations
import hi from './assets/locales/hi.json'; // Hindi translations
import kn from './assets/locales/kn.json'; // Kannada translations
import ml from './assets/locales/ml.json'; // Malayalam translations
import te from './assets/locales/te.json'; // Telugu translations

const resources = {
  en,
  hi,
  kn,
  ml,
  te,
};

// Fallback language if no match is found
const fallback = { languageTag: 'en', isRTL: false };

// Get the user's preferred language using getLocales()
const locales = Localization.getLocales();
const languageTag = locales && locales[0] ? locales[0].languageTag : fallback.languageTag;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageTag, // Set initial language based on device settings
    fallbackLng: 'en', // Use English as fallback if no language is found
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
