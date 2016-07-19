'use strict';

angular.module('portfolioTrackerApp.auth', ['portfolioTrackerApp.constants',
    'portfolioTrackerApp.util', 'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
