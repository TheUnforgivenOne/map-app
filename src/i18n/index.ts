import { createI18n } from 'vue-i18n';

export type AvailableLocalesType =
  (typeof i18n.global.availableLocales)[number];

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      header: {
        aboutTitle: 'About the task',
        mapTitle: 'Map',
      },
      about: {
        mainTitle: 'SquareGPS Test Task',
        description:
          'It is necessary to write an application using {0}. The application header should contain a menu of 2 items: {1} and {2}. The main part of the application should display the contents of the sections.',
        techStack: 'Vuejs, Vuex, VueRouter, Vuetify',
        aboutTitle: 'Section "About the Task"',
        aboutDescription:
          'The section should contain the text of this task, formatted similarly',
        mapTitle: 'Section: "Map"',
        mapDescription: {
          begin:
            'There should be a map and a list on the screen (see example):',
          list: {
            first:
              'When you click on the add button, the map should go into marker add mode: a marker should appear at the click location, and an entry with the point address should appear in the list.',
            sublist: {
              first:
                'To find an address, you can use any free geocoding API, for example: {0}',
              second:
                'If the address is not found, you should display an error and not add the marker to the list.',
            },
            second:
              'When you click on a marker, the entry in the list should be highlighted.',
            third:
              'When you click on an entry in the list, the map should be centered on the marker.',
            fouth:
              'Markers should be stored locally and not disappear after a page reload.',
            fifth:
              'The address bar should display the id of the selected marker.',
          },
          end: 'Local data storage should be organized as a service that emulates a backend. (A Backend class is needed that pseudo-asynchronously saves data to localStorage)',
        },
        additional: {
          title: 'Additionally:',
          list: {
            first: 'Consider display on mobile devices.',
            second: 'Ensure localization.',
            third:
              'It is necessary to write 1 unit test for any component using {0}.',
            jest: 'jest',
          },
          mention:
            '{0} The test task is designed to demonstrate the ability to write good modular code, as well as the ability to use the specified technologies and more. This code should be proud of.',
          mentionTitle: 'Mention:',
        },
        example: 'Example:',
      },
    },
    ru: {
      header: {
        aboutTitle: 'О задании',
        mapTitle: 'Карта',
      },
      about: {
        mainTitle: 'Тестовое задание SquareGPS',
        description:
          'Необходимо с помощью {0} написать приложение. Хэдер приложения должен содержать меню из 2-х пунктов: {1} и {2}. В основной части приложения должно отображаться содержимое разделов.',
        techStack: 'Vuejs, Vuex, VueRouter, Vuetify',
        aboutTitle: 'Раздел “О задании”',
        aboutDescription:
          'В разделе должен быть текст этого задания, сверстанный аналогично',
        mapTitle: 'Раздел “Карта”',
        mapDescription: {
          begin: 'На экране должны быть карта и список (см. пример):',
          list: {
            first:
              'При клике на кнопку добавления, карта должна перейти в режим добавления маркера: в месте клика должен появится маркер, а в списке - запись с адресом точки.',
            sublist: {
              first:
                'Для поиска адреса можно использовать любое бесплатное API для геокодирования, например: {0}',
              second:
                'В случае, если адрес не найден, необходимо вывести ошибку и не добавлять маркер в список.',
            },
            second:
              'При клике на маркер должна подсвечиваться запись в списке.',
            third:
              'При клике на запись в списке карта должна центрироваться на маркере.',
            fouth:
              'Маркеры должны храниться локально и не пропадать после перезагрузки страницы.',
            fifth:
              'В адресной строке должен отображаться id выбранного маркера.',
          },
          end: 'Локальное хранение данных должно быть организовано в виде сервиса, эмулирующего бекенд. (Необходим класс Backend, который псевдо-асинхронно сохраняет данные в localStorage)',
        },
        additional: {
          title: 'Дополнительно:',
          list: {
            first: 'Продумать отображение на мобильных устройствах.',
            second: 'Предусмотреть локализацию.',
            third:
              'Необходимо с помощью {0} написть 1 модульный тест на любой компонент.',
            jest: 'jest',
          },
          mention:
            '{0} тестовое задание призвано показать умение писать хороший модульный код, а также умение пользоваться указанными технологиями и не только. Этим кодом нужно гордиться.',
          mentionTitle: 'Напоминание:',
        },
        example: 'Пример:',
      },
    },
  },
});

export default i18n;
