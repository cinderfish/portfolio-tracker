'use strict';

angular.module('portfolioTrackerApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      template: '<main></main>',
      authenticate: 'user'
    }).state('main.add-transaction', {
      url: 'transaction/add',
      template: '<main-add-transaction></main-add-transaction>',
      authenticate: 'user'
    }).state('main.add-deposit', {
      url: 'funds/add',
      template: '<main-add-deposit></main-add-deposit>',
      authenticate: 'user'
    });
  });
