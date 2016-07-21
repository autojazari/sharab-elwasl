/**
 * @ngdoc function
 * @name sharabelwasl.factory:LanguageSelectService
 * @description
 * # LanguageSelectService
 * Service for setting/getting current locale
 */
angular.module('sharabelwasl')
  .service('LanguageSelectService', function ($translate, LOCALES, $rootScope ) {
    'use strict';
    // VARS
    var localesObj = LOCALES.locales;

    // locales and locales display names
    var _LOCALES = Object.keys(localesObj);
    if (!_LOCALES || _LOCALES.length === 0) {
      console.error('There are no _LOCALES provided');
    }
    var _LOCALES_DISPLAY_NAMES = [];
    _LOCALES.forEach(function (locale) {
      _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
    });

    $rootScope.currentLocale = $translate.proposedLanguage();// because of async loading

    // METHODS
    var checkLocaleIsValid = function (locale) {
      return _LOCALES.indexOf(locale) !== -1;
    };

    var setLocale = function (locale) {
      if (!checkLocaleIsValid(locale)) {
        console.error('Locale name "' + locale + '" is invalid');
        return;
      }
      startLoadingAnimation();
      $rootScope.currentLocale = locale;
      $translate.use(locale);
    };

    /**
     * Stop application loading animation when translations are loaded
     */
    var $html = angular.element(document).find("html");
    var LOADING_CLASS = 'app-loading';

    function startLoadingAnimation() {
      $html.addClass(LOADING_CLASS);
    }

    function stopLoadingAnimation() {
      $html.removeClass(LOADING_CLASS);
    }

    // EVENTS
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
      document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html

      // tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));// load Angular locale
    });

    $rootScope.$on('$localeChangeSuccess', function () {
      stopLoadingAnimation();
    });

    return {
      getLocaleDisplayName: function () {
        return localesObj[$rootScope.currentLocale];
      },
      setLocaleByDisplayName: function (localeDisplayName) {
        setLocale(
          _LOCALES[
            _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
            ]
        );
      },
      getLocalesDisplayNames: function () {
        return _LOCALES_DISPLAY_NAMES;
      }
    };
  });