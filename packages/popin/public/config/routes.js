'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('popin example page', {
        url: '/popin/example',
        templateUrl: 'popin/views/index.html'
      })
  }
])