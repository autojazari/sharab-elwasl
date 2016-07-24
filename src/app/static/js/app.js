'use strict';

/**
 * @ngdoc overview
 * @name sharabelwasl
 * @description
 * # sharabelwasl
 *
 * Main module of the application.
 */
var sharabelwasl = angular
  .module('sharabelwasl', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'pascalprecht.translate',
    'ui.bootstrap',
    'tmh.dynamicLocale',
    'xeditable'
  ])
  .constant('DEBUG_MODE', /*DEBUG_MODE*/true/*DEBUG_MODE*/)
  .constant('VERSION_TAG', /*VERSION_TAG_START*/new Date().getTime()/*VERSION_TAG_END*/)
  .constant('LOCALES', {
    'locales': {
      'en': 'EN',
      'de': 'DE',
      'fr': 'FR',
      'nl': 'NL',
      'ar': 'العربيه'
    },
    'preferredLocale': 'en'
  })
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  })
  .config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
  }])
  // Angular debug info
  .config(function ($compileProvider, DEBUG_MODE) {
    if (!DEBUG_MODE) {
      $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
    }
  })
  // Angular Translate
  .config(function ($translateProvider, DEBUG_MODE, LOCALES) {
    

    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/locale-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage(LOCALES.preferredLocale);
    $translateProvider.useLocalStorage();
  })
  // Angular Dynamic Locale
  .config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
});

//Load the Language API.
google.load("language", "1");

var onLoad = function () {
  //Call google.language.transliterate() 
google.language.transliterate(["Sameh"], "en", "ar", function(result) {
  var x = result;
  var y = "";
  if (!result.error) {
    // var container = document.getElementById("transliteration");
    if (result.transliterations && result.transliterations.length > 0 &&
        result.transliterations[0].transliteratedWords.length > 0) {
      container.innerHTML = result.transliterations[0].transliteratedWords[0];
    }
  }
});
}


google.setOnLoadCallback(onLoad);