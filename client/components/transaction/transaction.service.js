'use strict';

(function() {

  function TransactionResource($resource) {
    return $resource('/api/transactions/:id/:controller', {
      id: '@_id'
    });
  }

  angular.module('portfolioTrackerApp.transaction')
    .factory('Transaction', TransactionResource);
})();
