'use strict';

angular.module('portfolioTrackerApp', ['portfolioTrackerApp.auth', 'portfolioTrackerApp.admin',
    'portfolioTrackerApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngAnimate', 'btford.socket-io',
    'ui.router', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login');

    $locationProvider.html5Mode(true);
  });
