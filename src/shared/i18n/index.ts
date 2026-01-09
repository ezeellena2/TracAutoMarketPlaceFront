import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from './locales/es.json';

/**
 * Configuración de i18n para el Marketplace
 * Soporta español por defecto, extensible a otros idiomas
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
    },
    fallbackLng: 'es',
    lng: 'es', // Español por defecto
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
