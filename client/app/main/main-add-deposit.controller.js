'use strict';

(function() {

  class MainAddDepositController {

    constructor() {
      this.transaction = {
        type: 'deposit'
      };
    }

    $onInit() {

    }
  }

  angular.module('portfolioTrackerApp')
    .component('mainAddDeposit', {
      templateUrl: 'app/main/main-add-deposit.html',
      controller: MainAddDepositController
    });
})();
