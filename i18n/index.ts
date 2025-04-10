'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import zh from './locales/zh.json';
import th from './locales/th.json';

// Only initialize if it hasn't been initialized yet
if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        de: { translation: de },
        fr: { translation: fr },
        it: { translation: it },
        zh: { translation: zh },
        th: { translation: th }
      },
      fallbackLng: 'en',
      ns: ['translation', 'common', 'booking', 'flights', 'auth'],
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });
}

export default i18n;