import { createI18n } from 'vue-i18n';

export type AvailableLocalesType =
  (typeof i18n.global.availableLocales)[number];

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      header: {
        aboutTitle: 'About this task',
        mapTitle: 'Map',
      },
    },
    ru: {
      header: {
        aboutTitle: 'Об этом задании',
        mapTitle: 'Карта',
      },
    },
  },
});

export default i18n;
