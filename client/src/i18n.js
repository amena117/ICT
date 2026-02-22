import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationAM from './locales/am.json';

const resources = {
    en: {
        translation: translationEN
    },
    am: {
        translation: translationAM
    }
};

// Get saved language preference or default to English
const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
const validLanguage = savedLanguage === 'am' ? 'am' : 'en';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: validLanguage, // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('i18nextLng', lng);
});

export default i18n;
