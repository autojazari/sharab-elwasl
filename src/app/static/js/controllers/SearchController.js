/**
 * @ngdoc function
 * @name sharabelwasl.controller:QueryController
 * @description
 * # QueryController
 * Common application controller
 */
// var sharabelwasl = angular.module('sharabelwasl');
// sharabelwasl.requests = sharabelwasl.requests || {};

angular.module('sharabelwasl')
  .controller('SearchController', function($rootScope, $scope, $state, $http, $translateLocalStorage) {
    
    var $_ = $rootScope;
    $_.qasidas = [];

    vm.query = {"term" : "", "template_url" : "/partial/search-section"};
    vm.cached_verses = []; vm.warning = false;

    vm.get_current_lang = function() {
      var lang = $translateLocalStorage.get();
      
      if (typeof(lang) == "undefined" || lang == "undefined" || lang == null) {
          var lang = window.navigator.userLanguage || window.navigator.language;
          lang = lang.split('-')[0];
      }

      return lang;
    };

    vm.execute_search = function(term) {
      angular.element(document).find("html").removeClass("full");
      var path = '/search/'+vm.get_current_lang()+'/'+term;
      $_.ajax(path, vm.search_callback);
    }

    
    vm.user_search = function() {
      if (vm.query.term.length == 0) {
        vm.warning = true; return;
      }
      vm.execute_search(encodeURI(vm.query.term));
    };

    vm.popular_search = function(obj) {
      vm.execute_search(encodeURI(obj.target.attributes.search.value));
    };

    vm.search = function(obj) {
      vm.lang_first = vm.get_current_lang()+"_first";
      vm.lang_second = vm.get_current_lang()+"_second";
      vm.lang_title = vm.get_current_lang()+"_title";
      
      if (typeof obj == 'undefined') {
        vm.user_search();
      } else {
        vm.popular_search(obj);
      }
    };
    
    vm.search_callback = function(data) {

      vm.qasidas = [];
      for (var i=0; i < data.length; i++) {
        qasidas.push(new Qasida(i, vm.lang, data[i][0], data.length));
      };
      
      $state.go("search", {qasidas : vm.qasidas});

    };

});
